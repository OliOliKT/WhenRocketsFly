"use client";

import { useEffect, useState } from "react";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

type ScrollIndicatorProps = {
  scrollPercent: number;
  decadeRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
};

export default function ScrollIndicator({
  scrollPercent,
  decadeRefs
}: ScrollIndicatorProps) {
  const [positions, setPositions] = useState<
    { id: string; label: string; top: number }[]
  >([]);

  useEffect(() => {
    const updatePositions = () => {
      const entries = Object.entries(decadeRefs.current);
      const newPositions = entries.map(([id, el]) => {
        const rect = el?.getBoundingClientRect();
        const top = rect
          ? ((window.scrollY + rect.top) / document.body.scrollHeight) * 100
          : 0;
        return {
          id,
          label: id === "now" ? "TODAY" : id.replace("decade-", "").toUpperCase(),
          top
        };
      });
      setPositions(newPositions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, { passive: true });
    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [decadeRefs]);

  const scrollTo = (id: string) => {
    const target = decadeRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div className="fixed left-4 top-20 bottom-5 z-20 hidden md:flex flex-col items-center text-gray-400 font-mono">
      <button
        onClick={scrollToTop}
        className="group flex flex-col items-center gap-1 mb-2 cursor-pointer"
        title="Scroll to top"
      >
        <HiArrowUp className="w-5 h-5 group-hover:text-blue-400 transition" />
        <span className="text-xs group-hover:text-blue-400 transition">Future</span>
      </button>

      <div className="w-px flex-1 bg-gray-600 relative">
        {positions.map(({ id, label, top }) => (
          <div
            key={id}
            className="group cursor-pointer absolute"
            style={{ top: `${top}%` }}
            onClick={() => scrollTo(id)}
          >
            <div
              className="absolute -left-1 w-2 h-2 rounded-full bg-slate-400 shadow group-hover:bg-blue-400 transition"
              title={label}
            />
            <span className="absolute left-2 -translate-y-2 text-slate-400 text-[10px] font-medium tracking-wide group-hover:text-blue-400 transition">
              {label}
            </span>
          </div>
        ))}

        {/* Scroll position indicator */}
        <div
          className="absolute -left-1 w-2 h-2 rounded-full bg-blue-500 shadow-lg transition-all duration-100"
          style={{ top: `${scrollPercent}%` }}
        />
      </div>

      <button
        onClick={scrollToBottom}
        className="group mt-2 flex flex-col items-center gap-1 cursor-pointer"
        title="Scroll to bottom"
      >
        <HiArrowDown className="w-5 h-5 group-hover:text-blue-400 transition" />
        <span className="text-xs group-hover:text-blue-400 transition">Past</span>
      </button>
    </div>
  );
}
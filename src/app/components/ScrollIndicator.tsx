"use client";

import { HiArrowUp, HiArrowDown } from "react-icons/hi";

type ScrollIndicatorProps = {
  scrollPercent: number;
};

const markers = [
  { label: "Today", top: "5%" },
  { label: "2020s", top: "16.5%" },
  { label: "2010s", top: "28%" },
  { label: "2000s", top: "37%" },
  { label: "1990s", top: "46%" },
  { label: "1980s", top: "52.5%" },
  { label: "1970s", top: "67.5%" },
  { label: "1960s", top: "97%" },
];

export default function ScrollIndicator({ scrollPercent }: ScrollIndicatorProps) {
  return (
    <div className="fixed left-4 top-20 bottom-5 z-20 hidden md:flex flex-col items-center text-gray-400 font-mono pointer-events-none select-none">
      <div className="flex flex-col items-center gap-1 mb-2">
        <HiArrowUp className="w-5 h-5" />
        <span className="text-xs">Future</span>
      </div>

      <div className="w-px flex-1 bg-gray-600 relative">
        {markers.map(({ label, top }) => (
          <div key={label}>
            <div
              className="absolute left-2 text-slate-400 text-[10px] font-medium tracking-wide"
              style={{ top: `calc(${top} - 0.5rem)` }}
            >
              {label}
            </div>
            <div
              className="absolute -left-1 w-2 h-2 rounded-full bg-slate-400 shadow"
              style={{ top }}
            />
          </div>
        ))}

        {/* Scroll position indicator */}
        <div
          className="absolute -left-1 w-2 h-2 rounded-full bg-blue-500 shadow-lg transition-all duration-100"
          style={{ top: `${scrollPercent}%` }}
        />
      </div>

      <div className="mt-2 flex flex-col items-center gap-1">
        <HiArrowDown className="w-5 h-5" />
        <span className="text-xs">Past</span>
      </div>
    </div>
  );
}
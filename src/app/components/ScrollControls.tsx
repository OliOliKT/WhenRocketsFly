"use client";

import { FaArrowUp, FaArrowDown, FaRegClock } from "react-icons/fa";

type Props = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollToNow: () => void;
};

export default function ScrollControls({ scrollToTop, scrollToBottom, scrollToNow }: Props) {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2 sm:hidden">
      <button
        onClick={scrollToTop}
        className="p-2 rounded-full bg-slate-800 text-white shadow hover:bg-slate-700 transition"
        title="Scroll to top"
      >
        <FaArrowUp />
      </button>
      <button
        onClick={scrollToNow}
        className="p-2 rounded-full bg-slate-800 text-white shadow hover:bg-slate-700 transition"
        title="Scroll to now"
      >
        <FaRegClock />
      </button>
      <button
        onClick={scrollToBottom}
        className="p-2 rounded-full bg-slate-800 text-white shadow hover:bg-slate-700 transition"
        title="Scroll to bottom"
      >
        <FaArrowDown />
      </button>
    </div>
  );
}
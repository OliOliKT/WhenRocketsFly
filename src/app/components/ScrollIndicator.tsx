"use client";

import { HiArrowUp, HiArrowDown } from "react-icons/hi";

type ScrollIndicatorProps = {
  scrollPercent: number;
};

export default function ScrollIndicator({ scrollPercent }: ScrollIndicatorProps) {
  return (
    <div className="fixed left-4 top-24 bottom-0 z-20 hidden md:flex flex-col items-center text-gray-400 font-mono pointer-events-none select-none">
      <div className="flex flex-col items-center gap-1 mb-2">
        <HiArrowUp className="w-5 h-5" />
        <span className="text-xs">Future</span>
      </div>

      <div className="w-px flex-1 bg-gray-600 relative">
        <div
          className="absolute left-2 text-green-400 text-xs font-bold tracking-wider"
          style={{ top: "2.5%" }}
        >
          Today
        </div>
        <div
          className="absolute -left-1 w-2 h-2 rounded-full bg-green-400 shadow-md"
          style={{ top: "3%" }}
        />
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
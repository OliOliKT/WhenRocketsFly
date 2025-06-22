"use client";

import { useEffect, useState } from "react";
import Timeline from "@/app/components/Timeline";
import StarfieldBackground from "@/app/components/StarFieldBackground";
import LoadingScreen from "@/app/components/LoadingScreen";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

export default function HomePage() {
  const [scrollPercent, setScrollPercent] = useState(15);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowContent(true), 50);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollPercent(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StarfieldBackground />

      {loading && <LoadingScreen />}

      {/* Vertical timeline line */}
      {!loading && (
        <div className="fixed left-4 top-0 bottom-0 z-20 hidden md:flex flex-col items-center text-gray-400 font-mono pointer-events-none select-none">
          <div className="mt-4 flex flex-col items-center gap-1">
            <HiArrowUp className="w-5 h-5" />
            <span className="text-xs">Future</span>
          </div>

          <div className="w-px flex-1 bg-gray-600 relative mt-2 mb-2">
            <div
              className="absolute left-2 text-green-400 text-xs font-bold tracking-wider"
              style={{ top: "2.5%" }}
            >
              Today
            </div>
            <div
              className="absolute -left-1 w-2 h-2 rounded-full bg-green-400 shadow-md"
              style={{ top: "3%" }}
            ></div>
            <div
              className="absolute -left-1 w-2 h-2 rounded-full bg-blue-500 shadow-lg transition-all duration-100"
              style={{ top: `${scrollPercent}%` }}
            ></div>
          </div>

          <div className="mb-4 flex flex-col items-center gap-1">
            <HiArrowDown className="w-5 h-5" />
            <span className="text-xs">Past</span>
          </div>
        </div>
      )}

      {/* Main content fade-in */}
      <main
        className={`max-w-4xl mx-auto px-4 text-white relative z-10 transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-3xl font-bold mt-10 mb-6 text-center">
          All past and future space missions
        </h1>
        <Timeline />
      </main>
    </>
  );
}
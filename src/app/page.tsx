import Timeline from "@/app/components/Timeline";
import StarfieldBackground from "@/app/components/StarFieldBackground";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

export default function HomePage() {
  return (
    <>
      <StarfieldBackground />
      <div className="fixed left-4 top-0 bottom-0 z-20 hidden md:flex flex-col items-center text-gray-400 font-mono pointer-events-none select-none">
      <div className="mt-4 flex flex-col items-center gap-1">
        <HiArrowUp className="w-5 h-5" />
        <span className="text-xs">Future</span>
      </div>

      <div className="w-px flex-1 bg-gray-600 mt-2 mb-2" />

      <div className="mb-4 flex flex-col items-center gap-1">
        <HiArrowDown className="w-5 h-5" />
        <span className="text-xs">Past</span>
      </div>
    </div>

      <main className="max-w-4xl mx-auto px-4 text-white relative z-10">
        <h1 className="text-3xl font-bold mt-10 mb-6 text-center">
          All past and future space missions
        </h1>
        <Timeline />
      </main>
    </>
  );
}
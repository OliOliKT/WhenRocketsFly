"use client";

import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

type FilterBarProps = {
  launches: Launch[];
  onFilterChange: (filters: { mission: string; destination: string }) => void;
};

export default function FilterBar({ launches, onFilterChange }: FilterBarProps) {
  const [mission, setMission] = useState("");
  const [destination, setDestination] = useState("");

  const missionTypes = Array.from(new Set(launches.map(l => l.mission_type).filter(Boolean)));
  const destinations = Array.from(new Set(launches.map(l => l.destination).filter(Boolean)));

  useEffect(() => {
    onFilterChange({ mission, destination });
  }, [mission, destination]);

  return (
    <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-black via-slate-900 to-black backdrop-blur-sm shadow-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
      <img
        src="/WhenRocketsFlyLogo.png"
        alt="When Rockets Fly logo"
        className="h-10 w-10 md:h-12 md:w-12 object-contain"
      />
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          When Rockets Fly
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-0.5 tracking-wide">
          A timeline of all future and past space missions
        </p>
      </div>
    </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Dropdown
            label="Mission Type"
            value={mission}
            onChange={setMission}
            options={missionTypes}
          />
          <Dropdown
            label="Destination"
            value={destination}
            onChange={setDestination}
            options={destinations}
          />
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  return (
    <div className="flex-1 max-w-xs">
      <label className="text-[11px] text-slate-300 mb-1 block tracking-widest uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-slate-950 text-white px-3 py-1 pr-8 rounded-md w-full border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] text-xs transition duration-150"
        >
          <option value="">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <HiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-sm" />
      </div>
    </div>
  );
}
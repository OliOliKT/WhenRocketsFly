"use client";

import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import type { Launch } from "../types";

type FilterBarProps = {
  launches: Launch[];
  onFilterChange: (filters: {
    mission: string;
    destination: string;
    organization: string;
  }) => void;
};

export default function FilterBar({ launches, onFilterChange }: FilterBarProps) {
  const [mission, setMission] = useState("");
  const [destination, setDestination] = useState("");
  const [organization, setOrganization] = useState("");

  const missionTypes = Array.from(
    new Set(
      launches.flatMap(l => Array.isArray(l.mission_type) ? l.mission_type : [l.mission_type])
        .filter(Boolean)
    )
  ).sort();

  const destinations = Array.from(
    new Set(
      launches.flatMap(l => Array.isArray(l.destination) ? l.destination : [l.destination])
        .filter(Boolean)
    )
  ).sort();

  const organizations = Array.from(
    new Set(
      launches.flatMap(l => Array.isArray(l.organization) ? l.organization : [l.organization])
        .filter(Boolean)
    )
  ).sort();

  useEffect(() => {
    onFilterChange({ mission, destination, organization });
  }, [mission, destination, organization]);

  const resetFilters = () => {
    setMission("");
    setDestination("");
    setOrganization("");
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-black via-slate-900 to-black backdrop-blur-sm shadow-md border-b border-slate-800 px-3 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            src="/WhenRocketsFlyLogo.png"
            alt="When Rockets Fly logo"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          />
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-white leading-tight">
              When Rockets Fly
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 leading-tight tracking-wide">
              A timeline of space missions
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-end gap-2 sm:gap-3">
          <Dropdown
            label="Mission"
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
          <Dropdown
            label="Organization"
            value={organization}
            onChange={setOrganization}
            options={organizations}
          />
          {(mission || destination || organization) && (
            <button
              onClick={resetFilters}
              className="text-xs text-slate-300 border border-slate-600 rounded px-2 py-1 hover:text-white hover:border-white transition"
              title="Reset filters"
            >
              Reset
            </button>
          )}
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
          className="appearance-none bg-slate-950 text-white px-3 py-1 pr-6 rounded-md w-full border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
        >
          <option value="">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <HiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
      </div>
    </div>
  );
}
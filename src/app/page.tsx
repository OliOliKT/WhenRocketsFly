"use client";

import { useEffect, useRef, useState } from "react";
import Timeline from "@/app/components/Timeline";
import StarfieldBackground from "@/app/components/StarFieldBackground";
import FilterBar from "@/app/components/FilterBar";
import LoadingScreen from "@/app/components/LoadingScreen";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import type { Launch } from "../app/types";

export default function HomePage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filtered, setFiltered] = useState<Launch[]>([]);
  const [filters, setFilters] = useState({
    mission: "",
    destination: "",
    organization: ""
  });
  const [scrollPercent, setScrollPercent] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  // Keep a ref to all decades, regardless of filters
  const decadeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetch("/launches.json")
      .then(res => res.json())
      .then(data => {
        const now = new Date().toISOString();
        const currentTimeEntry: Launch = {
          id: "now",
          name: "You are here",
          date: now,
          organization: [],
          vehicle: "",
          mission_type: [],
          launch_site: "",
          success: null,
          destination: [],
          details: "This marker represents the current moment in space exploration history.",
          info_url: ""
        };
        const combined = [...data, currentTimeEntry].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setLaunches(combined);
        setFiltered(combined);
        setTimeout(() => setIsLoading(false), 1500);
      });
  }, []);

useEffect(() => {
  const matchesFilter = (value: string | string[], selected: string) => {
    if (!selected) return true;
    if (Array.isArray(value)) return value.includes(selected);
    return value === selected;
  };

  const filteredMissions = launches.filter(
    (l) =>
      !l.id.startsWith("decade-") &&
      l.id !== "now" &&
      matchesFilter(l.mission_type, filters.mission) &&
      matchesFilter(l.destination, filters.destination) &&
      matchesFilter(l.organization, filters.organization)
  );

  const includeDecades = filteredMissions.length >= 8;

  const finalFiltered = launches.filter((l) => {
    const isNow = l.id === "now";
    const isDecade = l.id.startsWith("decade-");
    return (
      isNow ||
      (includeDecades && isDecade) ||
      (!isDecade && !isNow &&
        matchesFilter(l.mission_type, filters.mission) &&
        matchesFilter(l.destination, filters.destination) &&
        matchesFilter(l.organization, filters.organization))
    );
  });

  setFiltered(finalFiltered);
}, [filters, launches]);

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

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <StarfieldBackground />
      <FilterBar launches={launches} onFilterChange={setFilters} />
      <main className="max-w-4xl mx-auto px-4 text-white relative z-10">
        <ScrollIndicator scrollPercent={scrollPercent} decadeRefs={decadeRefs} />
        <Timeline launches={filtered} decadeRefs={decadeRefs} />
      </main>
    </>
  );
}
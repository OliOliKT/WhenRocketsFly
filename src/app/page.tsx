"use client";

import { useEffect, useState } from "react";
import Timeline from "@/app/components/Timeline";
import StarfieldBackground from "@/app/components/StarFieldBackground";
import FilterBar from "@/app/components/FilterBar";
import LoadingScreen from "@/app/components/LoadingScreen";
import ScrollIndicator from "@/app/components/ScrollIndicator";


export default function HomePage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filtered, setFiltered] = useState<Launch[]>([]);
  const [filters, setFilters] = useState({ mission: "", destination: "" });
  const [scrollPercent, setScrollPercent] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/launches.json")
      .then(res => res.json())
      .then(data => {
        const now = new Date().toISOString();
        const currentTimeEntry: Launch = {
          id: "now",
          name: "You are here",
          date: now,
          organization: "",
          vehicle: "",
          mission_type: "",
          launch_site: "",
          success: null,
          destination: "",
          details: "This marker represents the current moment in space exploration history.",
          info_url: ""
        };
        const combined = [...data, currentTimeEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLaunches(combined);
        setFiltered(combined);
        setTimeout(() => setIsLoading(false), 1500);
      });
  }, []);

  useEffect(() => {
    setFiltered(
      launches.filter(l => {
        const matchesMission = filters.mission ? l.mission_type === filters.mission : true;
        const matchesDestination = filters.destination ? l.destination === filters.destination : true;
        return matchesMission && matchesDestination;
      })
    );
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
        <ScrollIndicator scrollPercent={scrollPercent} />
        <Timeline launches={filtered} />
      </main>
    </>
  );
}
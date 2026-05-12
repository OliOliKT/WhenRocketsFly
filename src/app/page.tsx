"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Timeline from "@/app/components/Timeline";
import StarfieldBackground from "@/app/components/StarFieldBackground";
import ScrollControls from "@/app/components/ScrollControls";
import FilterBar from "@/app/components/FilterBar";
import LoadingScreen from "@/app/components/LoadingScreen";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import type { Launch } from "../app/types";

export default function HomePage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filters, setFilters] = useState({
    mission: "",
    destination: "",
    organization: "",
    status: "all" as "all" | "successful" | "failed"
  });
  const [scrollPercent, setScrollPercent] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  // Keep a ref to all decades, regardless of filters
  const decadeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  const scrollToNow = () => {
    const nowEl = decadeRefs.current["now"];
    nowEl?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch("/launches.json", { signal: controller.signal })
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
        setIsLoading(false);
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          console.error("Failed to load launches", error);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
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

    return launches.filter((l) => {
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
  }, [filters, launches]);

  const timelineMarkerKey = useMemo(
    () =>
      filtered
        .filter((launch) => launch.id === "now" || launch.id.startsWith("decade-"))
        .map((launch) => launch.id)
        .join("|"),
    [filtered]
  );

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollPercent(percentage);
        frameId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <StarfieldBackground />
      <FilterBar launches={launches} onFilterChange={setFilters} />
      <main className="max-w-4xl mx-auto px-4 text-white relative z-10">
        <ScrollIndicator
          scrollPercent={scrollPercent}
          decadeRefs={decadeRefs}
          markerKey={timelineMarkerKey}
        />
        <Timeline launches={filtered} decadeRefs={decadeRefs} statusFilter={filters.status} />
        <ScrollControls
          scrollToTop={scrollToTop}
          scrollToBottom={scrollToBottom}
          scrollToNow={scrollToNow}
        />
      </main>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { FaRocket, FaClock } from "react-icons/fa";
import { SiNasa, SiSpacex } from "react-icons/si";

type Launch = {
  id: string;
  name: string;
  date: string;
  organization: string;
  vehicle: string;
  mission_type: string;
  launch_site: string;
  success: boolean | null;
  destination: string;
  details: string;
  info_url: string;
};

const orgLogos: Record<string, string> = {
  NASA: "/logos/nasa.png",
  SpaceX: "/logos/spacex.png",
  CNSA: "/logos/cnsa.png",
  "NASA / ESA / CSA": "/logos/nasa.png"
};

export default function Timeline() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const nowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/launches.json")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date().toISOString();

        const currentTimeEntry: Launch = {
          id: "now",
          name: "You are here",
          date: now,
          organization: "",
          vehicle: "",
          mission_type: "Current Time",
          launch_site: "",
          success: null,
          destination: "",
          details:
            "This marker represents the current moment in space exploration history.",
          info_url: ""
        };

        const combined = [...data, currentTimeEntry].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setLaunches(combined);

        // Scroll to the "You Are Here" element after a short delay
        setTimeout(() => {
          nowRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 200);
      });
  }, []);

  return (
    <div className="py-10">
      <VerticalTimeline>
        {launches.map((launch) => {
          const isNow = launch.id === "now";

          const cardColor = isNow
            ? "#22c55e"
            : launch.organization === "NASA"
            ? "#0b3d91"
            : launch.organization === "SpaceX"
            ? "#005288"
            : "#3b82f6";

          return (
            <VerticalTimelineElement
              key={launch.id}
              date={new Date(launch.date).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })}
              contentStyle={{
                background: "#000",
                color: "#fff",
                border: `1px solid ${cardColor}`,
                boxShadow: `0 0 10px ${cardColor}33` // 33 = ~20% opacity
                }}
                contentArrowStyle={{ borderRight: `7px solid ${cardColor}` }}
              iconStyle={{
                background: isNow
                  ? "#22c55e"
                  : launch.organization === "NASA"
                  ? "#0b3d91"
                  : launch.organization === "SpaceX"
                  ? "#005288"
                  : "#3b82f6",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
              }}
              icon={
                isNow ? (
                  <FaClock />
                ) : launch.organization === "NASA" ? (
                  <SiNasa />
                ) : launch.organization === "SpaceX" ? (
                  <SiSpacex />
                ) : (
                  <FaRocket />
                )
              }
            >
              <div ref={isNow ? nowRef : undefined}>
                <h3 className="font-bold text-xl" style={{ color: cardColor }}>
                    {launch.name}
                </h3>
                {!isNow && (
                  <>
                    <h4 className="text-sm text-white mb-1">
                      {launch.organization}
                    </h4>
                    <p>
                      <span className="text-indigo-400">🚀 Vehicle:</span>{" "}
                      {launch.vehicle}
                    </p>
                    <p>
                      <span className="text-indigo-400">🛰 Mission:</span>{" "}
                      {launch.mission_type}
                    </p>
                    <p>
                      <span className="text-indigo-400">🌍 Destination:</span>{" "}
                      {launch.destination}
                    </p>
                    <p>
                      <span className="text-indigo-400">📍 Site:</span>{" "}
                      {launch.launch_site}
                    </p>
                  </>
                )}
                <p className="mt-2 text-gray-300">{launch.details}</p>
                {launch.info_url && (
                  <a
                    href={launch.info_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-300 hover:underline mt-2 inline-block transition"
                  >
                    Learn more
                  </a>
                )}
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
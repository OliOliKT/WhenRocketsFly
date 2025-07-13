"use client";

import { JSX, useEffect, useRef } from "react";
import type { Launch } from "../types";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { FaClock } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { SiNasa, SiSpacex } from "react-icons/si";
import { GiHammerSickle } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";

const organizationMap: Record<
  string,
  {
    color: string;
    icon?: JSX.Element;
    image?: string;
  }
> = {
  NASA: { color: "#2a5dbd", icon: <SiNasa /> },
  SpaceX: { color: "#2c8ed6", icon: <SiSpacex /> },
  CNSA: { color: "#f7f1e8", image: "/logos/CNSA.png" },
  "United States": { color: "rgb(66, 138, 204)", icon: <LiaFlagUsaSolid /> },
  "Soviet Union": { color: "#cc3333", icon: <GiHammerSickle /> },
  "Blue Origin": { color: "#fff8e6", image: "/logos/BlueOrigin.svg" },
  ISRO: { color: "#e6eaf0", image: "/logos/ISRO.png" },
  JAXA: { color: "#f5f7fa", image: "/logos/JAXA.png" },
  Roscosmos: { color: "#fff4f2", image: "/logos/ROSCOSMOS.png" },
  ESA: { color: "orange", image: "/logos/ESA.png" },
  "France (CNES)": { color: "white", image: "/logos/CNES.png" },
  Norway: { color: "grey", image: "/logos/Norway.png" },
  "Firefly Aerospace": { color: "lightgrey", image: "/logos/Firefly.png" },
  Astrobotic: { color: "#fdf6ee", image: "/logos/Astrobotic.png" },
  "Intuitive Machines": { color: "#fef3c7", image: "/logos/intuitive_machines.png" },
  ispace: { color: "#e0f2f1", image: "/logos/ispace.png" },
  KARI: { color: "#fff4f4", image: "/logos/KARI.png" },
  SpaceIL: { color: "green", image: "/logos/SPACEIL.png" },
  UAESA: { color: "#f6f1eb", image: "/logos/UAESA.png" },
  CNES: { color: "#fff3f0", image: "/logos/CNES.png" },
  ISAS: { color: "#f5f5f0", image: "/logos/ISAS.png" },
  NASDA: { color: "#f8f1eb", image: "/logos/NASDA.png" },
};

function formatList(value: string | string[]): string {
  if (Array.isArray(value)) {
    if (value.length === 1) return value[0];
    const last = value[value.length - 1];
    return value.slice(0, -1).join(", ") + " & " + last;
  }
  return value;
}

type TimelineProps = {
  launches: Launch[];
  decadeRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
};

export default function Timeline({ launches, decadeRefs }: TimelineProps) {
  const nowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      nowRef.current?.scrollIntoView({
        behavior: "auto",
        block: "center"
      });
    });
  }, []);

  if (launches.length === 0) {
    return (
      <div className="text-center text-slate-400 py-20 fade-in">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-lg font-semibold">No missions match your filter</h2>
        <p className="text-sm mt-1">Try changing the mission type, destination, or organization.</p>
      </div>
    );
  }

  return (
    <div className="py-10 fade-in">
          <VerticalTimeline>
          {launches.map((launch) => {
          const isNow = launch.id === "now";
          const isDecadeMarker = launch.id.startsWith("decade-");
          const isSpecial = isNow || isDecadeMarker;

          const firstOrg = Array.isArray(launch.organization)
            ? launch.organization[0]
            : launch.organization;

          const orgData = organizationMap[firstOrg] || {
            color: "#3b82f6",
            icon: <IoIosRocket />
          };

          const cardColor = isSpecial ? "#22c55e" : orgData.color;

          const iconNode = isSpecial ? (
            <FaClock />
          ) : orgData.image ? (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={orgData.image}
                alt={firstOrg}
                className="w-[70%] h-[70%] object-contain"
              />
            </div>
          ) : orgData.icon ? (
            orgData.icon
          ) : (
            <IoIosRocket />
          );

          const ref = (el: HTMLDivElement | null) => {
            if (isNow || isDecadeMarker) {
              decadeRefs.current[launch.id] = el;
              if (isNow) nowRef.current = el;
            }
          };

          return (
            <VerticalTimelineElement
              key={launch.id}
              visible={false}
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
                boxShadow: `0 0 10px ${cardColor}33`
              }}
              contentArrowStyle={{ borderRight: `7px solid ${cardColor}` }}
              iconStyle={{
                background: cardColor,
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)"
              }}
              icon={iconNode}
            >
              <div ref={ref}>
                <h3 className="font-bold text-xl" style={{ color: cardColor }}>
                  {launch.name}
                </h3>

                {!isSpecial && (
                  <>
                    <h4 className="text-sm text-white mb-1">
                      {formatList(launch.organization)}
                    </h4>
                    <p>
                      <span style={{ color: cardColor }}>🚀 Vehicle:</span> {launch.vehicle}
                    </p>
                    <p>
                      <span style={{ color: cardColor }}>🛰 Mission:</span>{" "}
                      {formatList(launch.mission_type)}
                    </p>
                    <p>
                      <span style={{ color: cardColor }}>🌍 Destination:</span>{" "}
                      {formatList(launch.destination)}
                    </p>
                    <p>
                      <span style={{ color: cardColor }}>📍 Site:</span> {launch.launch_site}
                    </p>
                  </>
                )}

                <p className="mt-2 text-gray-300">{launch.details}</p>
                {launch.info_url && (
                  <a
                    href={launch.info_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 hover:underline mt-2 inline-block transition"
                  >
                    <span style={{ color: cardColor }}>Learn more</span>
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
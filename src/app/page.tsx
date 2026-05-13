import HomeExperience from "@/app/components/HomeExperience";
import launches from "../../public/launches.json";
import type { Launch } from "./types";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "When Rockets Fly",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  description:
    "An interactive timeline of space missions, rocket launches, lunar landers, planetary probes, Starship flight tests, and future exploration milestones.",
  about: [
    "space exploration",
    "rocket launches",
    "lunar missions",
    "planetary science",
    "spaceflight history"
  ],
  isAccessibleForFree: true
};

export default function HomePage() {
  const launchData = launches as Launch[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeExperience initialLaunches={launchData} nowIso={new Date().toISOString()} />
    </>
  );
}

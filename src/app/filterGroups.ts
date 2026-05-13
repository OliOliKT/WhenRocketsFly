export function normalizeOrganization(value: string) {
  const groups: Record<string, string> = {
    "Soviet Union (Almaz)": "Soviet Union",
    "Soviet Union (Almaz/Salyut)": "Soviet Union",
    ISAS: "JAXA",
    NASDA: "JAXA",
    CNES: "ESA",
    UK: "United Kingdom",
    ispace: "ispace"
  };

  return groups[value] ?? value;
}

export function normalizeDestination(value: string) {
  if (value.includes("(asteroid)") || value === "Asteroid Belt" || value === "Ceres" || value === "Vesta") {
    return "Asteroids";
  }

  if (value.includes("(comet)") || value === "Comet (TBD)") {
    return "Comets";
  }

  const groups: Record<string, string> = {
    "Earth Orbit": "Earth Orbit",
    "Low Earth Orbit": "Earth Orbit",
    "Geostationary Transfer Orbit": "Earth Orbit",
    "Highly Elliptical Orbit": "Earth Orbit",
    "Sun-Synchronous Orbit": "Earth Orbit",
    "Orbital Trajectory": "Earth Orbit",
    "Moon Orbit": "Moon",
    "Earth-Moon L2": "Moon",
    "Suborbital Space": "Suborbital",
    "International Space Station": "Space Stations",
    "Salyut 1 Space Station": "Space Stations",
    Skylab: "Space Stations",
    "Tiangong Space Station": "Space Stations",
    Phobos: "Mars",
    Europa: "Jupiter System",
    Ganymede: "Jupiter System",
    Callisto: "Jupiter System",
    Jupiter: "Jupiter System",
    "Jupiter Trojans": "Asteroids",
    Didymos: "Asteroids",
    Dimorphos: "Asteroids",
    Phaethon: "Asteroids",
    "Halley's Comet": "Comets",
    Titan: "Saturn System",
    Saturn: "Saturn System",
    Pluto: "Outer Solar System",
    "Kuiper Belt": "Outer Solar System",
    "Deep Space": "Deep Space",
    "Interplanetary Space": "Deep Space",
    "Interstellar Space": "Deep Space",
    "Heliocentric Orbit": "Deep Space",
    Sun: "Sun",
    "Sun (Earth Orbit)": "Sun",
    "Sun (Heliocentric Orbit)": "Sun",
    "Sun (L1 Orbit)": "Sun",
    "Sun (Polar Orbit)": "Sun",
    "Sun-Earth L1": "Sun",
    "Sun-Earth L2": "Sun"
  };

  return groups[value] ?? value;
}

export function normalizeMissionType(value: string) {
  const groups: Record<string, string> = {
    "Test Flight": "Test & Demonstration",
    "Flight Test": "Test & Demonstration",
    "Technology Demonstration": "Test & Demonstration",
    "Reusable Launch System": "Test & Demonstration",
    Orbiter: "Orbiter",
    "Orbital Mapping": "Orbiter",
    Flyby: "Flyby / Probe",
    Probe: "Flyby / Probe",
    Impact: "Flyby / Probe",
    Lander: "Lander / Rover",
    Rover: "Lander / Rover",
    "Crewed Flight": "Crewed Mission",
    "Crewed Landing": "Crewed Mission",
    "Crewed Test Flight": "Crewed Mission",
    "Suborbital Spaceflight": "Crewed Mission",
    Observatory: "Observatory / Science",
    "Solar Observatory": "Observatory / Science",
    "Space Observatory": "Observatory / Science",
    "Earth Observation": "Observatory / Science",
    "Cosmology Satellite": "Observatory / Science",
    "Exoplanet Search": "Observatory / Science",
    "Scientific Research": "Observatory / Science",
    Satellite: "Satellite / Station",
    "Space Station": "Satellite / Station",
    "Asteroid Exploration": "Small Body Exploration",
    "Comet Exploration": "Small Body Exploration",
    "Sample Collection": "Sample Return",
    Return: "Sample Return",
    Docking: "Rendezvous & Docking",
    "Rendezvous and Docking": "Rendezvous & Docking"
  };

  return groups[value] ?? value;
}

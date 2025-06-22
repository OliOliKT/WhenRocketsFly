"use client";

import { useCallback, memo } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { Engine } from "tsparticles-engine";

function StarfieldBackgroundComponent() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        fullScreen: { enable: true, zIndex: -1 },
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 }
          }
        },
        particles: {
          number: {
            value: 100,
            density: { enable: true, area: 800 }
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: { value: 2, random: true },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            random: true,
            straight: false,
            outMode: "out",
            attract: { enable: false }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.01,
              opacity: 1
            }
          }
        },
        detectRetina: true
      }}
    />
  );
}

// 🧠 Memoized version to prevent re-renders on scroll
const StarfieldBackground = memo(StarfieldBackgroundComponent);
export default StarfieldBackground;
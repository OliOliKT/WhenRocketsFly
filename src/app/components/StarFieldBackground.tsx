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
            push: { quantity: 5 },
            repulse: {
              distance: 120,
              duration: 0.5,
              easing: "ease-out-quad"
            }
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
            value: 0.9,
            random: true,
            anim: {
              enable: true,
              speed: 0.7,
              opacity_min: 0.2,
              sync: false
            }
          },
          size: {
            value: { min: 0.5, max: 2.5 },
            random: true
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            outMode: "out",
            attract: { enable: false }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.03,
              opacity: 0.8
            }
          }
        },
        detectRetina: true
      }}
    />
  );
}

const StarfieldBackground = memo(StarfieldBackgroundComponent);
export default StarfieldBackground;
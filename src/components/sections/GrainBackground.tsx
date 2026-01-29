"use client";

import { motion } from "framer-motion";

export interface GrainBackgroundProps {
  intensity?: number;
}

const GrainBackground = ({ intensity = 0.2 }: GrainBackgroundProps) => {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      animate={{
        opacity: [intensity * 0.75, intensity * 1.25, intensity * 0.75],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4" />
      </svg>
    </motion.div>
  );
};

export default GrainBackground;

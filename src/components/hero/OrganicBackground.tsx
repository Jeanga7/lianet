"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface OrganicBackgroundProps {
  className?: string;
}

type Tilt = { x: number; y: number };

export default function OrganicBackground({ className }: OrganicBackgroundProps) {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });

  useEffect(() => {
    // Gyroscope (best-effort). Falls back to subtle idle animation if not available.
    const handler = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left-right
      const beta = e.beta ?? 0; // front-back
      // clamp + normalize
      const nx = Math.max(-18, Math.min(18, gamma)) / 18;
      const ny = Math.max(-18, Math.min(18, beta)) / 18;
      setTilt({ x: nx, y: ny });
    };

    window.addEventListener("deviceorientation", handler, true);
    return () => window.removeEventListener("deviceorientation", handler, true);
  }, []);

  const base = useMemo(
    () => ({
      background:
        "radial-gradient(800px 520px at 20% 25%, rgba(143,214,204,0.18) 0%, rgba(255,255,255,0) 60%), radial-gradient(680px 520px at 80% 70%, rgba(143,214,204,0.12) 0%, rgba(255,255,255,0) 62%), linear-gradient(180deg, #FFFFFF 0%, rgba(143,214,204,0.08) 100%)",
    }),
    []
  );

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={base}
      animate={{
        backgroundPosition: [
          "0% 0%, 100% 100%, 0% 0%",
          "12% 8%, 88% 92%, 0% 0%",
          "0% 0%, 100% 100%, 0% 0%",
        ],
        x: tilt.x * 10,
        y: tilt.y * 10,
      }}
      transition={{
        backgroundPosition: { duration: 14, ease: "easeInOut", repeat: Infinity },
        x: { type: "spring", stiffness: 60, damping: 18, mass: 0.6 },
        y: { type: "spring", stiffness: 60, damping: 18, mass: 0.6 },
      }}
    />
  );
}


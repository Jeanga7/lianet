"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SandGrainProps {
  className?: string;
  opacity?: number;
}

const SandGrain = ({ className, opacity = 0.04 }: SandGrainProps) => {
  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sandFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sandFilter)'/%3E%3C/svg%3E\")",
        backgroundSize: "150px 150px",
        mixBlendMode: "multiply",
        filter: "contrast(155%) brightness(93%)",
      }}
      animate={{
        opacity: [opacity, opacity + 0.01, opacity],
        backgroundPosition: ["0% 0%", "2% 1%", "0% 0%"],
      }}
      transition={{
        opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
      }}
    />
  );
};

export default SandGrain;

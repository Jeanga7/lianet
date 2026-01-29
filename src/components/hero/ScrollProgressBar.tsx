"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressBarProps {
  className?: string;
}

export default function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.6,
  });

  return (
    <div className={className}>
      <motion.div
        className="h-px w-full origin-left bg-[#40B4A6]"
        style={{ scaleX }}
      />
    </div>
  );
}


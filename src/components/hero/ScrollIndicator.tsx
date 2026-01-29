"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <div className={className}>
      <div className="group flex items-center gap-3">
        <span
          className="text-[10px] font-semibold tracking-[0.28em] text-foreground/40"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SCROLL
        </span>

        <div className="relative h-10 w-px bg-[#8FD6CC]/50 transition-colors group-hover:bg-secondary/80">
          <motion.span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_0_6px_rgba(143,214,204,0.18)]"
            animate={{ y: [0, 32, 0] }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </div>
  );
}


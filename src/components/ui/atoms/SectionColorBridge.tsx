"use client";

import { cn } from "@/lib/utils";

interface SectionColorBridgeProps {
  className?: string;
  heightClass?: string;
  from?: string;
  to?: string;
  opacity?: number;
}

export default function SectionColorBridge({
  className,
  heightClass = "h-28 sm:h-32 lg:h-40",
  from = "#FFFFFF",
  to = "#8FD6CC",
  opacity = 1,
}: SectionColorBridgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute bottom-0 left-0 right-0 z-20", heightClass, className)}
      style={{
        opacity,
        background: `linear-gradient(to bottom, ${from}00 0%, ${to} 100%)`,
      }}
    />
  );
}

"use client";

import { forwardRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight, Grid3x3, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroButtonSize = "hero" | "compact";

type HeroButtonBaseProps = Omit<HTMLMotionProps<"button">, "children"> & {
  label: string;
  size?: HeroButtonSize;
};

export const HeroPrimaryButton = forwardRef<HTMLButtonElement, HeroButtonBaseProps>(
  ({ label, size = "hero", className, style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const sizeClassName =
      size === "compact"
        ? "px-4 md:px-6 py-4.5 md:py-4.5 text-xs md:text-sm uppercase tracking-tighter"
        : "px-12 py-4.5 text-sm font-bold";

    return (
      <motion.button
        ref={ref}
        type="button"
        onMouseEnter={(event) => {
          setIsHovered(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setIsHovered(false);
          onMouseLeave?.(event);
        }}
        className={cn(
          "relative w-full sm:w-auto lg:inline-flex items-center justify-center rounded-full text-white bg-[#40B4A6] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
          sizeClassName,
          className
        )}
        style={{
          fontFamily: "var(--font-varela), 'Varela Round', sans-serif",
          letterSpacing: "0.1em",
          isolation: "isolate",
          zIndex: 1,
          ...style,
        }}
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 8px 24px rgba(64, 180, 166, 0.4), 0 4px 12px rgba(64, 180, 166, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
          }}
        />

        <motion.span
          className="relative z-10 flex items-center gap-2"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <motion.span
            animate={{
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0.8 : 1,
              x: isHovered ? -8 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="flex-shrink-0"
          >
            <Grid3x3 className="w-4 h-4 text-white" />
          </motion.span>

          {label}

          <motion.span
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -8,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.span>
        </motion.span>
      </motion.button>
    );
  }
);

HeroPrimaryButton.displayName = "HeroPrimaryButton";

export const HeroSecondaryButton = forwardRef<HTMLButtonElement, HeroButtonBaseProps>(
  ({ label, size = "hero", className, style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const sizeClassName =
      size === "compact"
        ? "px-4 md:px-6 py-4.5 md:py-4.5 text-xs md:text-sm uppercase tracking-tighter"
        : "px-12 py-4.5 text-sm font-bold";

    return (
      <motion.button
        ref={ref}
        type="button"
        onMouseEnter={(event) => {
          setIsHovered(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setIsHovered(false);
          onMouseLeave?.(event);
        }}
        className={cn(
          "relative w-full sm:w-auto lg:inline-flex items-center justify-center rounded-full transition-all duration-500 bg-white/5 text-[#1B365D] hover:bg-white/15 hover:text-[#40B4A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group overflow-hidden",
          sizeClassName,
          className
        )}
        style={{
          fontFamily: "var(--font-varela), 'Varela Round', sans-serif",
          letterSpacing: "0.1em",
          isolation: "isolate",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          zIndex: 1,
          ...style,
        }}
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 8px 24px rgba(27, 54, 93, 0.12), 0 4px 12px rgba(64, 180, 166, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      >
        <div
          className="absolute inset-[3px] z-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.05)",
          }}
        />

        <div className="absolute inset-[3px] z-10 rounded-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-y-0 w-1/4"
            key={isHovered ? "scan" : "idle"}
            initial={{ x: "-100%", opacity: 0 }}
            animate={
              isHovered
                ? { x: "500%", opacity: [0, 1, 1, 0] }
                : { x: "-100%", opacity: 0 }
            }
            transition={{
              duration: 0.7,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1],
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(64, 180, 166, 0.6) 50%, transparent 100%)",
              filter: "blur(1px)",
            }}
          />
        </div>

        <span
          className="absolute inset-0 z-30 rounded-full pointer-events-none mix-blend-normal transition-[border-color,box-shadow] duration-300 [--border:#1B365D] group-hover:[--border:#40B4A6]"
          style={{
            border: "2px solid var(--border)",
            boxShadow: "0 0 0 2px var(--border)",
            filter: "none",
          }}
        />

        <span className="relative z-40 flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          {label}
        </span>
      </motion.button>
    );
  }
);

HeroSecondaryButton.displayName = "HeroSecondaryButton";

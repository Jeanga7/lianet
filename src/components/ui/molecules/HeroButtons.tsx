"use client";

import { forwardRef, type ElementType, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight, Grid3x3, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroButtonSize = "hero" | "compact";

type HeroButtonBaseProps = Omit<HTMLMotionProps<"button">, "children"> & {
  label: string;
  size?: HeroButtonSize;
};

type HeroPrimaryButtonProps = HeroButtonBaseProps & {
  iconStart?: ElementType | null;
  iconEnd?: ElementType | null;
  showEndIconOnMobile?: boolean;
  iconHoverRotate?: number;
};

export const HeroPrimaryButton = forwardRef<HTMLButtonElement, HeroPrimaryButtonProps>(
  (
    {
      label,
      size = "hero",
      className,
      style,
      onMouseEnter,
      onMouseLeave,
      iconStart: StartIcon = Grid3x3,
      iconEnd: EndIcon = ArrowRight,
      showEndIconOnMobile = false,
      iconHoverRotate = 0,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const sizeClassName =
      size === "compact"
        ? "px-5 md:px-7 py-4 md:py-4.5 text-xs md:text-sm uppercase tracking-[0.15em] font-bold lg:min-w-[14rem]"
        : "px-8 sm:px-12 py-4 sm:py-4.5 text-xs sm:text-sm font-black uppercase tracking-[0.2em] lg:min-w-[18rem]";

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
          "relative w-full lg:w-auto lg:inline-flex items-center justify-center rounded-full text-white bg-[#40B4A6] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group whitespace-nowrap",
          sizeClassName,
          className
        )}
        style={{
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
          letterSpacing: "0.15em",
          isolation: "isolate",
          zIndex: 1,
          ...style,
        }}
        whileHover={{
          scale: 1.025,
          boxShadow:
            "0 12px 32px rgba(64, 180, 166, 0.45), 0 6px 16px rgba(64, 180, 166, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
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
          className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
        <div
          className="absolute inset-[1px] rounded-full pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 -1px 1px rgba(0, 0, 0, 0.1)",
          }}
        />

        <motion.span
          className="relative z-10 flex w-full items-center justify-center gap-2"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {StartIcon && (
            <motion.span
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 0.8 : 1,
                x: isHovered ? -8 : 0,
                rotate: isHovered ? iconHoverRotate : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="flex-shrink-0"
            >
              <StartIcon className="w-4 h-4 text-current" />
            </motion.span>
          )}

          <span className="inline-flex items-center justify-center">{label}</span>

          {EndIcon && (
            <motion.span
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -12,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
              }}
              className={cn("flex-shrink-0", showEndIconOnMobile ? "inline-flex" : "hidden sm:inline-flex")}
            >
              <EndIcon className="w-4 h-4 text-current" />
            </motion.span>
          )}
        </motion.span>
      </motion.button>
    );
  }
);

HeroPrimaryButton.displayName = "HeroPrimaryButton";

type HeroSecondaryButtonProps = HeroButtonBaseProps & {
  iconStart?: ElementType | null;
};

export const HeroSecondaryButton = forwardRef<HTMLButtonElement, HeroSecondaryButtonProps>(
  (
    {
      label,
      size = "hero",
      className,
      style,
      onMouseEnter,
      onMouseLeave,
      iconStart: StartIcon = Rocket,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const sizeClassName =
      size === "compact"
        ? "px-5 md:px-7 py-4 md:py-4.5 text-xs md:text-sm uppercase tracking-[0.15em] font-bold lg:min-w-[14rem]"
        : "px-8 sm:px-12 py-4 sm:py-4.5 text-xs sm:text-sm font-black uppercase tracking-[0.2em] lg:min-w-[18rem]";

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
          "relative w-full lg:w-auto lg:inline-flex items-center justify-center rounded-full transition-all duration-500 bg-[#40B4A6]/15 backdrop-blur-[14px] backdrop-saturate-[180%] text-[#1B365D] hover:bg-white/25 hover:text-[#40B4A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group overflow-hidden whitespace-nowrap shadow-sm",
          sizeClassName,
          className
        )}
        style={{
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
          letterSpacing: "0.15em",
          isolation: "isolate",
          zIndex: 1,
          ...style,
        }}
        whileHover={{
          scale: 1.025,
          boxShadow:
            "0 12px 32px rgba(27, 54, 93, 0.16), 0 6px 16px rgba(64, 180, 166, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
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
              "inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)",
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
                "linear-gradient(90deg, transparent 0%, rgba(64, 180, 166, 0.8) 50%, transparent 100%)",
              filter: "blur(0.5px)",
            }}
          />
        </div>

        <span
          className="absolute inset-0 z-30 rounded-full pointer-events-none mix-blend-normal transition-[border-color,box-shadow] duration-300 [--border:rgba(27,54,93,0.3)] group-hover:[--border:#40B4A6]"
          style={{
            border: "1px solid var(--border)",
            filter: "none",
          }}
        />

        <span className="relative z-40 flex items-center justify-center gap-2">
          {StartIcon && <StartIcon className="w-4 h-4 text-current" />}
          {label}
        </span>
      </motion.button>
    );
  }
);

HeroSecondaryButton.displayName = "HeroSecondaryButton";

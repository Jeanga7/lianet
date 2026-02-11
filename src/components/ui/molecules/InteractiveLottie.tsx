"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type DotLottieElement = HTMLElement & {
  setSpeed?: (speed: number) => void;
  speed?: number;
  play?: () => void;
  pause?: () => void;
  stop?: () => void;
  seek?: (value: number) => void;
  dotLottie?: {
    play?: () => void;
    pause?: () => void;
    setSpeed?: (speed: number) => void;
  };
};

interface InteractiveLottieProps {
  src: string;
  className?: string;
  size?: { base: string; sm?: string };
  radius?: number;
  nearSpeed?: number;
  hoverSpeed?: number;
  glowColor?: string;
}

const InteractiveLottie = ({
  src,
  className,
  size = { base: "1em", sm: "1.05em" },
  radius = 260,
  nearSpeed = 0.8,
  hoverSpeed = 1.2,
  glowColor = "rgba(64, 180, 166, 0.4)",
}: InteractiveLottieProps) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const lottieRef = useRef<DotLottieElement | null>(null);
  const [isNear, setIsNear] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const prevActiveRef = useRef(false);
  const isReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);

  const rotate = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateSpring = useSpring(rotate, { stiffness: 300, damping: 22 });
  const xSpring = useSpring(x, { stiffness: 300, damping: 22 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 22 });

  const setSpeed = useCallback((speed: number) => {
    const instance = lottieRef.current;
    if (!instance) return;
    // Try multiple ways to set speed
    if (typeof instance.setSpeed === "function") {
      instance.setSpeed(speed);
    } else if (instance.dotLottie && typeof instance.dotLottie.setSpeed === "function") {
      instance.dotLottie.setSpeed(speed);
    } else {
      // Use attribute as fallback
      instance.setAttribute("speed", speed.toString());
      instance.speed = speed;
    }
  }, []);

  const play = useCallback(() => {
    const instance = lottieRef.current;
    if (!instance) return;
    // Try multiple ways to play
    if (typeof instance.play === "function") {
      instance.play();
    } else if (instance.dotLottie && typeof instance.dotLottie.play === "function") {
      instance.dotLottie.play();
    } else {
      // Use attribute as fallback
      instance.setAttribute("autoplay", "true");
    }
  }, []);

  const pauseOnly = useCallback(() => {
    const instance = lottieRef.current;
    if (!instance || !instance.dotLottie) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dotLottie = instance.dotLottie as any;
    
    // Smooth transition: gradually decelerate speed to 0, then reset to frame 0
    // This creates a smooth deceleration effect before stopping
    
    // Get current speed (default to 1 if not available)
    const currentSpeed = dotLottie.speed || instance.speed || hoverSpeed || nearSpeed || 1;
    
    // Gradually reduce speed to create smooth deceleration
    let speed = currentSpeed;
    const decelerate = () => {
      speed = Math.max(0, speed - 0.15); // Reduce speed by 0.15 each frame for smooth deceleration
      
      if (typeof dotLottie.setSpeed === "function") {
        dotLottie.setSpeed(speed);
      } else if (typeof instance.setSpeed === "function") {
        instance.setSpeed(speed);
      } else {
        instance.setAttribute("speed", speed.toString());
      }
      
      if (speed > 0) {
        requestAnimationFrame(decelerate);
      } else {
        // Speed is now 0, wait a bit then reset to frame 0
        setTimeout(() => {
          if (typeof dotLottie.stop === "function") {
            dotLottie.stop();
          } else if (typeof instance.stop === "function") {
            instance.stop();
          }
          
          // Reset speed to normal
          if (typeof dotLottie.setSpeed === "function") {
            dotLottie.setSpeed(1);
          } else if (typeof instance.setSpeed === "function") {
            instance.setSpeed(1);
          }
          
          // Pause
          if (typeof dotLottie.pause === "function") {
            dotLottie.pause();
          } else if (typeof instance.pause === "function") {
            instance.pause();
          } else {
            instance.removeAttribute("autoplay");
          }
        }, 150);
      }
    };
    
    // Start deceleration
    requestAnimationFrame(decelerate);
  }, [hoverSpeed, nearSpeed]);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const nx = dx / rect.width;
      const ny = dy / rect.height;
      rotate.set(nx * 10);
      x.set(nx * 6);
      y.set(ny * 6);
    },
    [rotate, x, y]
  );

  const resetMotion = useCallback(() => {
    rotate.set(0);
    x.set(0);
    y.set(0);
  }, [rotate, x, y]);

  useEffect(() => {
    let rafId = 0;
    const onMove = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
        const newIsNear = distance <= radius;
        setIsNear(newIsNear);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [radius, isNear]);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance) return;
    
    // Local function to play animation (doesn't depend on useCallback)
    const playAnimation = () => {
      const inst = lottieRef.current;
      if (!inst) return;
      if (typeof inst.play === "function") {
        inst.play();
      } else if (inst.dotLottie && typeof inst.dotLottie.play === "function") {
        inst.dotLottie.play();
      } else {
        inst.setAttribute("autoplay", "true");
      }
    };
    
    // Wait for custom element to be defined
    const initComponent = async () => {
      try {
        await customElements.whenDefined("dotlottie-wc");
        
        // Check if methods are available after a short delay (component might need more time)
        const checkReady = () => {
          const hasMethods = typeof instance.play === "function" || 
                            typeof instance.pause === "function" ||
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (instance as any).dotLottie;
          
          if (hasMethods) {
            isReadyRef.current = true;
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              playAnimation();
            }
          } else {
            // Retry after a short delay
            setTimeout(checkReady, 100);
          }
        };
        
        // Start checking after a small delay
        setTimeout(checkReady, 50);
      } catch {
        // Silently handle error
      }
    };
    
    initComponent();
    
    // Also listen for events as fallback
    const markReady = () => {
      isReadyRef.current = true;
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        playAnimation();
      }
    };
    
    instance.addEventListener?.("ready", markReady);
    instance.addEventListener?.("load", markReady);
    instance.addEventListener?.("loaded", markReady);
    instance.addEventListener?.("dataReady", markReady as EventListener);
    
    return () => {
      instance.removeEventListener?.("ready", markReady);
      instance.removeEventListener?.("load", markReady);
      instance.removeEventListener?.("loaded", markReady);
      instance.removeEventListener?.("dataReady", markReady as EventListener);
    };
  }, []);

  useEffect(() => {
    const isActive = isHover || isNear;
    const wasActive = prevActiveRef.current;
    prevActiveRef.current = isActive;

    if (isActive) {
      const speed = isHover ? hoverSpeed : nearSpeed;
      setSpeed(speed);
      if (!wasActive) {
        if (isReadyRef.current) {
          requestAnimationFrame(() => play());
        } else {
          pendingPlayRef.current = true;
        }
      } else {
        play();
      }
      return;
    }

    pauseOnly();
  }, [isHover, isNear, hoverSpeed, nearSpeed, pauseOnly, play, setSpeed]);

  return (
    <motion.span
      ref={wrapperRef}
      className={`inline-block align-baseline shrink-0 ${className ?? ""}`}
      aria-hidden="true"
      whileHover={{ filter: `drop-shadow(0 0 15px ${glowColor})` }}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onPointerEnter={() => setIsNear(true)}
      onPointerLeave={() => setIsNear(false)}
      onMouseMove={handleMove}
      onMouseLeave={resetMotion}
      style={{
        width: size.base,
        height: size.base,
        ...(size.sm ? { ["--lottie-sm" as const]: size.sm } : {}),
        rotate: rotateSpring,
        x: xSpring,
        y: ySpring,
        transformOrigin: "50% 50%",
      }}
    >
      {/* @ts-expect-error - dotlottie-wc is a custom web component */}
      <dotlottie-wc
        ref={lottieRef}
        src={src}
        loop
        className="block w-full h-full sm:[width:var(--lottie-sm)] sm:[height:var(--lottie-sm)]"
        style={{ width: "100%", height: "100%" }}
      />
    </motion.span>
  );
};

export default InteractiveLottie;

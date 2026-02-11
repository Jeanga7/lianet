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
  nearSpeed = 0.6,
  hoverSpeed = 1.6,
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
    if (!instance) return;
    
    // #region agent log
    const instanceKeys = Object.keys(instance).filter(k => !k.startsWith('_'));
    const dotLottieKeys = instance.dotLottie ? Object.keys(instance.dotLottie).filter(k => !k.startsWith('_')) : [];
    const dotLottieMethods = instance.dotLottie ? dotLottieKeys.filter(k => typeof (instance.dotLottie as any)[k] === 'function') : [];
    fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:83',message:'pauseOnly called - inspecting instance and dotLottie',data:{hasSeek:typeof instance.seek==='function',hasStop:typeof instance.stop==='function',hasPause:typeof instance.pause==='function',hasDotLottie:!!instance.dotLottie,dotLottieKeys,dotLottieMethods,hasShadowRoot:!!instance.shadowRoot,segment:(instance as any).segment,mode:(instance as any).mode},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Try multiple approaches to reset to first frame
    let seeked = false;
    
    // Approach 1: Direct seek method
    if (typeof instance.seek === "function") {
      instance.seek(0);
      seeked = true;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:95',message:'seek(0) called directly',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
    // Approach 2: Via dotLottie property - try multiple methods
    else if (instance.dotLottie) {
      const dotLottie = instance.dotLottie as any;
      if (typeof dotLottie.seek === "function") {
        dotLottie.seek(0);
        seeked = true;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:100',message:'seek(0) called via dotLottie.seek',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      } else if (typeof dotLottie.goToAndStop === "function") {
        dotLottie.goToAndStop(0);
        seeked = true;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:105',message:'goToAndStop(0) called via dotLottie',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      } else if (typeof dotLottie.stop === "function") {
        dotLottie.stop();
        seeked = true;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:110',message:'stop() called via dotLottie',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      } else if (typeof dotLottie.setFrame === "function") {
        dotLottie.setFrame(0);
        seeked = true;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:115',message:'setFrame(0) called via dotLottie',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      }
    }
    // Approach 3: Stop method (usually resets to first frame)
    else if (typeof instance.stop === "function") {
      instance.stop();
      seeked = true;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:106',message:'stop() called',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
    // Approach 4: Set currentFrame property directly
    else if ('currentFrame' in instance) {
      (instance as any).currentFrame = 0;
      seeked = true;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:115',message:'currentFrame set to 0',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
    // Approach 5: Try to set segment to [0, 0] to reset to first frame
    if (!seeked && 'segment' in instance) {
      (instance as any).segment = [0, 0];
      seeked = true;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:125',message:'segment set to [0,0]',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
    // Approach 6: Try to access via shadowRoot
    if (!seeked && instance.shadowRoot) {
      const player = (instance.shadowRoot as any).querySelector?.('[data-player]') || (instance.shadowRoot as any).firstElementChild;
      if (player && typeof player.seek === "function") {
        player.seek(0);
        seeked = true;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:135',message:'seek(0) called via shadowRoot player',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      }
    }
    // Approach 7: Try setAttribute with different values
    if (!seeked) {
      instance.setAttribute("frame", "0");
      instance.setAttribute("currentframe", "0");
      instance.setAttribute("seek", "0");
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:135',message:'setAttribute frame/currentframe/seek=0 called',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
    
    // Wait a bit for seek to complete, then pause
    if (seeked) {
      requestAnimationFrame(() => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/f912a8d0-3f55-44fd-93ad-b10eddd38a8d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InteractiveLottie.tsx:142',message:'About to pause after seek',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        if (typeof instance.pause === "function") {
          instance.pause();
        } else if (instance.dotLottie && typeof instance.dotLottie.pause === "function") {
          instance.dotLottie.pause();
        } else {
          instance.removeAttribute("autoplay");
        }
      });
    } else {
      // If seek didn't work, just pause
      if (typeof instance.pause === "function") {
        instance.pause();
      } else if (instance.dotLottie && typeof instance.dotLottie.pause === "function") {
        instance.dotLottie.pause();
      } else {
        instance.removeAttribute("autoplay");
      }
    }
  }, []);

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
      } catch (error) {
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

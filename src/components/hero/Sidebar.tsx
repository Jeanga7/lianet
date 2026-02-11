"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  onMenuClick?: () => void;
}

// Sections dans l'ordre d'apparition
const sections = [
  { id: "hero", label: "Accueil" },
  { id: "expertise", label: "Expertise" },
  { id: "manifeste", label: "Manifeste" },
];

const Sidebar = ({ onMenuClick }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [expertiseHover, setExpertiseHover] = useState<"talent" | "lab" | null>(null);
  const [isExpertiseExpanded, setIsExpertiseExpanded] = useState(false);

  // Écouter les événements de hover depuis ExpertiseSection
  useEffect(() => {
    const handleExpertiseHover = (event: CustomEvent) => {
      const { poleId } = event.detail;
      if (poleId === "talent") {
        setExpertiseHover("talent");
      } else if (poleId === "lab") {
        setExpertiseHover("lab");
      } else {
        setExpertiseHover(null);
      }
    };

    window.addEventListener("expertiseHover", handleExpertiseHover as EventListener);
    return () => {
      window.removeEventListener("expertiseHover", handleExpertiseHover as EventListener);
    };
  }, []);

  // Écouter les événements d'expansion depuis ExpertiseSection
  useEffect(() => {
    const handleExpertiseExpanded = (event: CustomEvent) => {
      const { isExpanded } = event.detail;
      setIsExpertiseExpanded(isExpanded);
    };

    window.addEventListener("expertiseExpanded", handleExpertiseExpanded as EventListener);
    return () => {
      window.removeEventListener("expertiseExpanded", handleExpertiseExpanded as EventListener);
    };
  }, []);

  // Détection de la section active au scroll avec threshold: 0.6
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Section active quand 60% est visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer toutes les sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Scroll vers une section au clic (avec snap, utilise scrollIntoView)
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    const container = document.getElementById("main-scroll");
    if (!element || !container) return;

    const start = container.scrollTop;
    const target = element.offsetTop;
    const duration = 750;
    const startTime = performance.now();

    const cubicBezier = (t: number) => {
      const cx = 3 * 0.22;
      const bx = 3 * (0.36 - 0.22) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * 1;
      const by = 3 * (1 - 1) - cy;
      const ay = 1 - cy - by;

      const sampleCurveX = (tX: number) => ((ax * tX + bx) * tX + cx) * tX;
      const sampleCurveY = (tY: number) => ((ay * tY + by) * tY + cy) * tY;
      const sampleCurveDerivativeX = (tD: number) => (3 * ax * tD + 2 * bx) * tD + cx;

      let x = t;
      for (let i = 0; i < 5; i += 1) {
        const dx = sampleCurveX(x) - t;
        if (Math.abs(dx) < 1e-4) break;
        const dxd = sampleCurveDerivativeX(x);
        if (Math.abs(dxd) < 1e-6) break;
        x -= dx / dxd;
      }

      return sampleCurveY(x);
    };

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = cubicBezier(t);
      container.scrollTop = start + (target - start) * eased;
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <>
      {/* Barre de progression horizontale quand expertise expanded */}
      <AnimatePresence>
        {isExpertiseExpanded && activeSection === "expertise" && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[60]"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center bg-primary text-primary-foreground lg:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      {/* Menu hamburger en haut */}
      <motion.button
        type="button"
        onClick={onMenuClick}
        className="mt-8 flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-primary-foreground/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label="Menu"
      >
        <Menu className="h-6 w-6 text-primary-foreground" />
      </motion.button>

      {/* Indicateurs de pagination verticaux au centre */}
      <div className="mt-auto mb-auto flex flex-col items-center gap-4">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const isExpertise = section.id === "expertise";
          const shouldStretchUp = isExpertise && isActive && expertiseHover === "talent";
          const shouldStretchDown = isExpertise && isActive && expertiseHover === "lab";
          const shouldFade = isExpertise && isActive && isExpertiseExpanded;
          
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: shouldFade ? 0.2 : isActive ? 1 : 0.5,
                scale: isActive ? 1.2 : 1,
              }}
              whileHover={{ scale: isActive ? 1.2 : 1.1 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.1,
              }}
              aria-label={section.label}
              title={section.label}
            >
              {isActive && !shouldFade && (
                <motion.span
                  layoutId="sidebarActiveRing"
                  className="absolute inset-0 rounded-full border border-secondary/80 bg-secondary/10"
                  transition={{ type: "spring", stiffness: 520, damping: 34 }}
                />
              )}
              {shouldFade ? (
                <motion.div
                  className="h-full w-[1px] bg-gray-400/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.span
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-secondary"
                      : "bg-primary-foreground/30 group-hover:bg-secondary/60"
                  }`}
                  animate={{
                    scaleY: shouldStretchUp ? 1.8 : shouldStretchDown ? 1.8 : 1,
                    scaleX: shouldStretchUp || shouldStretchDown ? 1.2 : 1,
                    y: shouldStretchUp ? -4 : shouldStretchDown ? 4 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

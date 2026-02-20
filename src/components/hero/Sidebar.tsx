"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { usePathname } from "next/navigation";

interface SidebarProps {
  onMenuClick?: () => void;
}

const SECTION_IDS = ["hero", "expertise", "blueprint", "manifeste", "footer"] as const;

const Sidebar = ({ onMenuClick }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { t, locale } = useI18n();

  // On n'affiche les dots que sur la Home Page (locale "/")
  const isHomePage = pathname === `/${locale}` || pathname === "/" || pathname === `/${locale}/`;

  const sections = [
    { id: "hero", label: t("sidebar.hero") },
    { id: "expertise", label: t("sidebar.expertise") },
    { id: "blueprint", label: t("sidebar.blueprint") },
    { id: "manifeste", label: t("sidebar.manifeste") },
    { id: "footer", label: t("sidebar.footer") },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      SECTION_IDS.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

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
      <motion.aside
        className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center bg-primary text-primary-foreground lg:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#8FD6CC]/20 to-transparent" />
        <motion.button
          type="button"
          onClick={onMenuClick}
          className="mt-8 flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-primary-foreground/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-label={t("sidebar.menu")}
        >
          <Menu className="h-6 w-6 text-primary-foreground" />
        </motion.button>

        <div className="mb-auto mt-auto flex flex-col items-center gap-4">
          {isHomePage && sections.map((section, index) => {
            const isActive = activeSection === section.id;

            return (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0.56,
                  scale: isActive ? 1.16 : 1,
                }}
                whileHover={{ scale: isActive ? 1.16 : 1.06 }}
                transition={{
                  duration: 0.32,
                  delay: 0.3 + index * 0.1,
                }}
                aria-label={section.label}
                title={section.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebarActiveRing"
                    className="absolute inset-0 rounded-full border border-secondary/80 bg-secondary/10"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                          boxShadow: [
                            "0 0 0 0 rgba(143,214,204,0.18)",
                            "0 0 0 6px rgba(143,214,204,0)",
                            "0 0 0 0 rgba(143,214,204,0.18)",
                          ],
                        }
                    }
                    transition={
                      prefersReducedMotion
                        ? { type: "spring", stiffness: 520, damping: 34 }
                        : {
                          type: "spring",
                          stiffness: 520,
                          damping: 34,
                          boxShadow: {
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                    }
                  />
                )}
                <motion.span
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${isActive ? "bg-secondary" : "bg-primary-foreground/30 group-hover:bg-secondary/60"
                    }`}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                />
              </motion.button>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

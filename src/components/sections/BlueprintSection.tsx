"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Activity, ArrowUpRight, PenTool, Rocket, Search } from "lucide-react";
import { HeroPrimaryButton, HeroSecondaryButton, Magnetic, SectionColorBridge } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";
import SandGrain from "./SandGrain";

type StepIcon = typeof Search;

interface BlueprintStep {
  key: "immersion" | "architecture" | "execution" | "optimisation";
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: StepIcon;
}

const motionSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
};

export default function BlueprintSection() {
  const { locale, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredKey, setHoveredKey] = useState<BlueprintStep["key"] | null>(null);
  const [desktopNavHeight, setDesktopNavHeight] = useState(88);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const textParallaxX = useSpring(
    useTransform(pointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [18, -18]),
    motionSpring
  );
  const textParallaxY = useSpring(
    useTransform(pointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [12, -12]),
    motionSpring
  );

  const steps = useMemo<BlueprintStep[]>(
    () => [
      {
        key: "immersion",
        number: t("blueprint.steps.immersion.number"),
        title: t("blueprint.steps.immersion.title"),
        subtitle: t("blueprint.steps.immersion.subtitle"),
        description: t("blueprint.steps.immersion.description"),
        icon: Search,
      },
      {
        key: "architecture",
        number: t("blueprint.steps.architecture.number"),
        title: t("blueprint.steps.architecture.title"),
        subtitle: t("blueprint.steps.architecture.subtitle"),
        description: t("blueprint.steps.architecture.description"),
        icon: PenTool,
      },
      {
        key: "execution",
        number: t("blueprint.steps.execution.number"),
        title: t("blueprint.steps.execution.title"),
        subtitle: t("blueprint.steps.execution.subtitle"),
        description: t("blueprint.steps.execution.description"),
        icon: Rocket,
      },
      {
        key: "optimisation",
        number: t("blueprint.steps.optimisation.number"),
        title: t("blueprint.steps.optimisation.title"),
        subtitle: t("blueprint.steps.optimisation.subtitle"),
        description: t("blueprint.steps.optimisation.description"),
        icon: Activity,
      },
    ],
    [t]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 30%"],
  });

  const lineProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.75], [0, 1]),
    motionSpring
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const navElement = document.querySelector("nav") as HTMLElement | null;
    if (!navElement) return;

    const updateNavHeight = () => {
      if (mediaQuery.matches) return;
      const height = Math.max(56, Math.round(navElement.getBoundingClientRect().height));
      setDesktopNavHeight(height);
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    mediaQuery.addEventListener("change", updateNavHeight);

    const observer = new ResizeObserver(updateNavHeight);
    observer.observe(navElement);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateNavHeight);
      mediaQuery.removeEventListener("change", updateNavHeight);
    };
  }, []);

  const handleCanvasMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || shouldReduceMotion) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, x)));
    pointerY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleCanvasLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const navigateWithWipe = (href: string) => {
    window.dispatchEvent(new CustomEvent("navigateWithWipe", { detail: { href } }));
  };

  const monumentalWord = locale === "fr" ? "PROTOCOLE" : "IMPACT";

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleCanvasMove}
      onMouseLeave={handleCanvasLeave}
      className="relative isolate min-h-screen overflow-hidden bg-[#8FD6CC] px-4 py-16 text-[#1B365D] sm:px-6 lg:min-h-screen lg:px-10 lg:py-24 xl:px-14 xl:py-32"
      aria-label={t("blueprint.title")}
    >
      <SandGrain className="z-[1]" opacity={0.04} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_60%)]"
      />

      <motion.p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-1/2 z-[3] -translate-x-1/2 text-[15rem] font-black leading-none tracking-[-0.06em] text-[#1B365D]/[0.05] lg:bottom-32"
        style={{ x: textParallaxX, y: textParallaxY, fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
      >
        {monumentalWord}
      </motion.p>

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-center lg:pb-8 xl:pb-10"
        style={{
          minHeight: `calc(100dvh - ${desktopNavHeight}px - 3.5rem)`,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.7 }}
          transition={motionSpring}
          className="mb-4 text-center text-[10px] uppercase tracking-[0.3em] text-[#1B365D]/60 lg:absolute lg:left-1/2 lg:top-10 lg:mb-0 lg:-translate-x-1/2"
          style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
        >
          {t("blueprint.eyebrow")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={motionSpring}
          className="mx-auto max-w-[900px] space-y-7 pt-4 text-center lg:pt-16"
        >
          <h2
            className="text-[clamp(2.4rem,9vw,4.6rem)] font-black leading-[1.04] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("blueprint.title")}
          </h2>
          <p
            className="mx-auto max-w-[70ch] text-base font-light leading-relaxed text-[#1B365D]/90 lg:text-lg"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
          >
            {t("blueprint.subtitle")}
          </p>
        </motion.div>

        <div className="hidden lg:block lg:h-4 xl:h-6" aria-hidden="true" />

        <div className="relative mt-8 lg:mt-10 xl:mt-12 lg:flex-1 lg:content-center">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 1200 200"
            className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-[200px] w-full -translate-y-1/2 lg:block"
            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))" }}
          >
            <motion.path
              d="M40 100 C 170 30, 290 170, 420 100 C 550 30, 670 170, 800 100 C 930 30, 1050 170, 1160 100"
              fill="none"
              stroke="rgba(248,250,252,0.72)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : lineProgress }}
            />
          </motion.svg>

          <motion.svg
            aria-hidden="true"
            viewBox="0 0 100 520"
            className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full w-[100px] -translate-x-1/2 md:block lg:hidden"
            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))" }}
          >
            <motion.path
              d="M50 10 C 20 80, 80 130, 50 210 C 20 290, 80 360, 50 440 C 35 485, 60 510, 50 510"
              fill="none"
              stroke="rgba(248,250,252,0.72)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : lineProgress }}
            />
          </motion.svg>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredKey === step.key;
              const isDimmed = hoveredKey !== null && hoveredKey !== step.key;

              // Calculate scroll trigger for this specific step (simple approximation)
              // In a real refined components we might use separate refs, but this works for grid
              const stepProgress = useTransform(
                scrollYProgress,
                [index * 0.2, (index * 0.2) + 0.3], // Stagger activation based on index
                [0, 1]
              );

              const opacity = useTransform(stepProgress, [0, 0.5], [0.4, 1]);
              const scale = useTransform(stepProgress, [0, 1], [0.95, 1]);

              return (
                <motion.article
                  key={step.key}
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...motionSpring, delay: index * 0.08 }} // Slightly increased delay
                  onMouseEnter={() => setHoveredKey(step.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.02 }}
                  animate={{
                    opacity: isDimmed ? 0.4 : 1,
                    filter: isDimmed ? "blur(2px) grayscale(0.6)" : "blur(0px) grayscale(0)",
                    scale: isDimmed ? 0.98 : 1,
                  }}
                  className="group relative z-10 flex flex-col overflow-hidden rounded-[2.2rem] sm:rounded-[2.5rem] border border-white/15 bg-[#1B365D]/20 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-[#1B365D]/30 lg:text-left"
                >
                  {/* Glass Noise Texture */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                  {/* Active Highlight Gradient */}
                  <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-br from-[#40B4A6]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Sweep Effect */}
                  <AnimatePresence>
                    {isHovered && !shouldReduceMotion && (
                      <motion.span
                        key={`${step.key}-sweep`}
                        className="pointer-events-none absolute inset-0 z-[1] rotate-[20deg]"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                        }}
                        initial={{ x: "-150%", opacity: 0.5 }}
                        animate={{ x: "150%", opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-[2] flex h-full flex-col">
                    <div className="mb-6 flex items-center justify-center gap-4 lg:justify-between">
                      <span
                        className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {step.number}
                      </span>
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : step.key === "immersion"
                              ? { scale: isHovered ? [1, 1.15, 1] : 1 }
                              : step.key === "architecture"
                                ? { rotate: isHovered ? [0, -10, 10, 0] : 0 }
                                : step.key === "execution"
                                  ? { y: isHovered ? [0, -5, 0] : 0 }
                                  : { scale: isHovered ? [1, 1.15, 1] : 1 }
                        }
                        transition={
                          isHovered
                            ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                            : motionSpring
                        }
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 shadow-lg backdrop-blur-md transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/20`}
                      >
                        <Icon className="h-5 w-5 text-white/90 transition-colors duration-300 group-hover:text-white" />
                      </motion.div>
                    </div>

                    <h3
                      className="text-[1.75rem] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-white"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="mt-2 text-sm font-bold uppercase tracking-wide text-[#1B365D]"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    >
                      {step.subtitle}
                    </p>

                    <div className="mt-auto pt-6">
                      <p
                        className="text-[0.95rem] font-light leading-relaxed text-white/85"
                        style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={motionSpring}
          className="mx-auto mt-14 grid w-full max-w-[38rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:mb-8"
        >
          <Magnetic className="flex w-full" strength={24}>
            <HeroPrimaryButton
              size="compact"
              label={t("blueprint.cta.primary")}
              iconStart={Rocket}
              iconEnd={ArrowUpRight}
              showEndIconOnMobile
              onClick={() => navigateWithWipe(localizePathname(appRoutes.contact, locale))}
              className="bg-[#F8FAFC] !text-[#1B365D] shadow-[0_14px_32px_rgba(15,23,42,0.25)] hover:bg-[#ffffff]"
            />
          </Magnetic>

          <Magnetic className="flex w-full" strength={24}>
            <HeroSecondaryButton
              size="compact"
              label={t("blueprint.cta.secondary")}
              iconStart={Search}
              onClick={() => navigateWithWipe(localizePathname(appRoutes.solutions, locale))}
              className="!border-0 !bg-[#1B365D] !text-[#F8FAFC] shadow-[0_14px_32px_rgba(15,23,42,0.32)] hover:!bg-[#0F2440] hover:!text-white"
            />
          </Magnetic>
        </motion.div>
      </div>
      <SectionColorBridge to="#8FD6CC" />
    </section>
  );
}

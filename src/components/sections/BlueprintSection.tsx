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
import { HeroPrimaryButton, HeroSecondaryButton, Magnetic } from "@/components/ui";
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
      className="relative isolate min-h-screen overflow-hidden bg-[#40B4A6] px-4 py-16 text-[#F8FAFC] sm:px-6 lg:min-h-dvh lg:px-10 lg:py-24 xl:px-14"
      aria-label={t("blueprint.title")}
    >
      <SandGrain className="z-[1]" opacity={0.04} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_60%)]"
      />

      <motion.p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-1/2 z-[3] -translate-x-1/2 text-[15rem] font-black leading-none tracking-[-0.06em] text-white/[0.05] lg:bottom-32"
        style={{ x: textParallaxX, y: textParallaxY, fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
      >
        {monumentalWord}
      </motion.p>

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col lg:pb-8 xl:pb-10"
        style={{
          minHeight: `calc(100dvh - ${desktopNavHeight}px - 3.5rem)`,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.7 }}
          transition={motionSpring}
          className="text-center text-[11px] uppercase tracking-[0.24em] text-[#F8FAFC]/75 lg:absolute lg:left-1/2 lg:top-10 lg:-translate-x-1/2"
          style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
        >
          {t("blueprint.eyebrow")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={motionSpring}
          className="mx-auto max-w-[900px] space-y-5 pt-6 text-center lg:pt-20"
        >
          <h2
            className="text-[clamp(2rem,5.2vw,4.6rem)] font-black leading-[1.02] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("blueprint.title")}
          </h2>
          <p
            className="mx-auto max-w-[70ch] text-base font-light leading-relaxed text-[#F8FAFC]/90 lg:text-lg"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
          >
            {t("blueprint.subtitle")}
          </p>
        </motion.div>

        <div className="hidden lg:block lg:h-6 xl:h-10" aria-hidden="true" />

        <div className="relative mt-16 lg:mt-20 xl:mt-24 lg:flex-1 lg:content-center">
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

          <div className="grid gap-16 md:gap-16 lg:grid-cols-4 lg:gap-8 xl:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredKey === step.key;

              return (
                <motion.article
                  key={step.key}
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ ...motionSpring, delay: index * 0.06 }}
                  onMouseEnter={() => setHoveredKey(step.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="group relative z-10 overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 p-7 text-center backdrop-blur-3xl md:p-8 lg:text-left"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 z-0 rounded-[3rem] bg-[#8FD6CC]/24 blur-3xl"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={motionSpring}
                  />

                  <AnimatePresence>
                    {isHovered && !shouldReduceMotion && (
                      <motion.span
                        key={`${step.key}-sweep`}
                        className="pointer-events-none absolute inset-0 z-[1]"
                        style={{
                          background:
                            "linear-gradient(112deg, transparent 28%, rgba(255,255,255,0.58) 46%, rgba(143,214,204,0.52) 56%, transparent 74%)",
                          filter: "blur(2px)",
                        }}
                        initial={{ x: "-130%", opacity: 0.96 }}
                        animate={{ x: "130%", opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ ...motionSpring, duration: 0.28 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-[2]">
                    <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                      <span
                        className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-[#F8FAFC]/30"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {step.number}
                      </span>
                      <motion.span
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : step.key === "immersion"
                              ? { scale: isHovered ? [1, 1.08, 1] : 1 }
                              : step.key === "architecture"
                                ? { rotate: isHovered ? [0, -5, 5, 0] : 0 }
                                : step.key === "execution"
                                  ? { y: isHovered ? [0, -3, 0] : 0 }
                                  : { scale: isHovered ? [1, 1.08, 1] : 1 }
                        }
                        transition={
                          isHovered
                            ? { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
                            : motionSpring
                        }
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/12"
                      >
                        <Icon className="h-5 w-5 text-[#F8FAFC]" />
                      </motion.span>
                    </div>

                    <h3
                      className="text-[clamp(1.35rem,2.3vw,1.95rem)] font-black leading-[1.05] tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="mt-3 text-[1.04rem] font-semibold leading-snug text-[#F8FAFC]/92"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    >
                      {step.subtitle}
                    </p>

                    <p
                      className="mt-4 text-base font-light leading-[1.9] text-[#F8FAFC]/88"
                      style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                    >
                      {step.description}
                    </p>
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
          className="mx-auto mt-16 flex w-full max-w-[760px] flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-5 lg:mt-10 lg:mb-6"
        >
          <Magnetic className="w-full sm:w-auto" strength={24}>
            <HeroPrimaryButton
              size="compact"
              label={t("blueprint.cta.primary")}
              iconStart={Rocket}
              iconEnd={ArrowUpRight}
              showEndIconOnMobile
              onClick={() => navigateWithWipe(localizePathname(appRoutes.contact, locale))}
              className="w-full bg-[#F8FAFC] px-8 py-4 !text-sm !font-bold uppercase !tracking-widest !text-[#1B365D] shadow-[0_14px_30px_rgba(15,23,42,0.24)] hover:bg-[#ffffff]"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            />
          </Magnetic>

          <Magnetic className="w-full sm:w-auto" strength={24}>
            <HeroSecondaryButton
              size="compact"
              label={t("blueprint.cta.secondary")}
              iconStart={Search}
              onClick={() => navigateWithWipe(localizePathname(appRoutes.solutions, locale))}
              className="w-full !bg-[#8FD6CC]/78 px-8 py-4 !text-sm !font-bold uppercase !tracking-widest !text-[#1B365D] [--border:#8FD6CC] shadow-[0_14px_30px_rgba(15,23,42,0.2)] hover:!bg-[#8FD6CC] hover:!text-[#1B365D]"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            />
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

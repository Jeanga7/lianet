"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Activity, ArrowUpRight, PenTool, Rocket, Search } from "lucide-react";
import { HeroPrimaryButton, Magnetic } from "@/components/ui";
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

const springTransition = {
  type: "spring" as const,
  stiffness: 150,
  damping: 20,
};

export default function ManifesteSection() {
  const { locale, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredKey, setHoveredKey] = useState<BlueprintStep["key"] | null>(null);

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
    springTransition
  );

  const navigateWithWipe = (href: string) => {
    window.dispatchEvent(new CustomEvent("navigateWithWipe", { detail: { href } }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#40B4A6] px-4 py-24 text-[#F8FAFC] sm:px-6 lg:min-h-dvh lg:px-10 lg:py-32 xl:px-14"
      aria-label={t("blueprint.title")}
    >
      <SandGrain className="z-[1]" opacity={0.04} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_10%,rgba(248,250,252,0.18),transparent_58%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[900px] space-y-5 text-center"
        >
          <p
            className="text-[11px] uppercase tracking-[0.24em] text-[#F8FAFC]/75"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("blueprint.eyebrow")}
          </p>
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

        <div className="relative mt-16 lg:mt-20">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 1200 200"
            className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-[200px] w-full -translate-y-1/2 lg:block"
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

          <div className="grid gap-8 md:gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredKey === step.key;

              return (
                <motion.article
                  key={step.key}
                  initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ ...springTransition, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredKey(step.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -4,
                          boxShadow: "0 20px 44px rgba(15,23,42,0.18), 0 0 30px rgba(248,250,252,0.18)",
                        }
                  }
                  className="relative z-10 rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md md:p-8 lg:text-left"
                >
                  <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.22em] text-[#F8FAFC]/75"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
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
                          ? { rotate: isHovered ? [0, -4, 4, 0] : 0 }
                          : step.key === "execution"
                          ? { y: isHovered ? [0, -3, 0] : 0 }
                          : { scale: isHovered ? [1, 1.06, 1] : 1 }
                      }
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/12"
                    >
                      <Icon className="h-5 w-5 text-[#F8FAFC]" />
                    </motion.span>
                  </div>

                  <h3
                    className="text-[clamp(1.35rem,2.3vw,1.9rem)] font-black leading-[1.05] tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="mt-3 text-[1.02rem] font-semibold leading-snug text-[#F8FAFC]/92"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {step.subtitle}
                  </p>

                  <p
                    className="mt-4 text-base font-light leading-relaxed text-[#F8FAFC]/88"
                    style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 flex w-full max-w-[760px] flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-5"
        >
          <Magnetic className="w-full sm:w-auto" strength={20}>
            <HeroPrimaryButton
              size="compact"
              label={t("blueprint.cta.primary")}
              iconEnd={ArrowUpRight}
              showEndIconOnMobile
              onClick={() => navigateWithWipe(localizePathname(appRoutes.contact, locale))}
              className="w-full bg-[#F8FAFC] px-8 py-4 !text-sm !font-bold uppercase !tracking-widest !text-[#1B365D] shadow-[0_14px_30px_rgba(15,23,42,0.24)] hover:bg-[#ffffff]"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            />
          </Magnetic>

          <Magnetic className="w-full sm:w-auto" strength={20}>
            <HeroPrimaryButton
              size="compact"
              label={t("blueprint.cta.secondary")}
              iconEnd={ArrowUpRight}
              showEndIconOnMobile
              onClick={() => navigateWithWipe(localizePathname(appRoutes.solutions, locale))}
              className="w-full border border-white/40 bg-white/12 px-8 py-4 !text-sm !font-bold uppercase !tracking-widest text-[#F8FAFC] shadow-[0_14px_30px_rgba(15,23,42,0.2)] hover:bg-white/20"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            />
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { ArrowRight, FlaskConical, Target, Users } from "lucide-react";
import { PageWipe } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";
import BackgroundEffects from "./BackgroundEffects";
import FilmGrain from "./FilmGrain";

type PoleId = "talent" | "strategy" | "lab";

interface ExpertisePole {
  id: PoleId;
  number: string;
  navTitle: string;
  canvasTitle: string;
  slogan: string;
  description: string;
  capabilities: string[];
  icon: typeof Users;
}

const cardTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

const shimmerTransition = {
  duration: 1.1,
  ease: "easeInOut" as const,
};

const navPositions = [148, 284, 420];

const maskBorderStyle = {
  WebkitMask:
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor" as const,
  maskComposite: "exclude" as const,
};

function ExpertiseDesktopCanvas({
  pole,
}: {
  pole: ExpertisePole;
}) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.8 });

  const orbProgress = useMotionValue(0);
  const borderRotation = useTransform(orbProgress, [0, 100], [0, 360]);
  const orbX = useTransform(orbProgress, [0, 100], ["8%", "92%"]);

  useEffect(() => {
    const controls = animate(orbProgress, 100, {
      duration: 3.8,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [orbProgress]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const deltaX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const deltaY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

    mouseX.set(-deltaX * 32);
    mouseY.set(-deltaY * 24);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = pole.icon;

  return (
    <motion.article
      key={pole.id}
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      transition={cardTransition}
      className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/35 p-10 xl:p-12"
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        boxShadow:
          "0 30px 80px rgba(27,54,93,0.16), 0 0 0 1px rgba(255,255,255,0.25)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem] p-[1px]"
        style={{
          ...maskBorderStyle,
          rotate: borderRotation,
          background:
            "conic-gradient(from 120deg, rgba(64,180,166,0.05), rgba(64,180,166,0.78), rgba(143,214,204,0.55), rgba(64,180,166,0.05))",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-2 w-2 rounded-full bg-[#40B4A6]"
        style={{
          left: orbX,
          boxShadow: "0 0 18px rgba(64,180,166,0.85)",
        }}
      />

      <motion.h3
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-[13rem] font-black uppercase leading-none tracking-tighter text-[#1B365D]/10"
        style={{
          x: springX,
          y: springY,
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
        }}
      >
        {pole.canvasTitle}
      </motion.h3>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span
            data-cursor="hover"
            data-cursor-strength="strong"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#40B4A6]/30 bg-[#40B4A6]/15 text-[#1B365D]"
          >
            <Icon className="h-5 w-5" />
          </span>
          <span
            className="text-xs uppercase tracking-[0.18em] text-[#1B365D]/60"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {pole.number}
          </span>
        </div>

        <h4
          className="mt-5 text-[clamp(2.2rem,4.2vw,4rem)] font-black tracking-tighter text-[#1B365D]"
          style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
        >
          {pole.navTitle}
        </h4>

        <p className="mt-3 text-lg italic text-[#40B4A6]" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
          {pole.slogan}
        </p>

        <p className="mt-5 max-w-3xl text-[1.02rem] leading-relaxed text-[#1B365D]/82">{pole.description}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label={pole.navTitle}>
          {pole.capabilities.map((capability, index) => (
            <motion.li
              key={`${pole.id}-${capability}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + index * 0.08 }}
              className="relative overflow-hidden rounded-xl border border-[#1B365D]/12 bg-white/65 px-4 py-3 text-sm text-[#1B365D]/78"
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(143,214,204,0.55) 55%, transparent 100%)",
                }}
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "260%", opacity: [0, 1, 0] }}
                transition={{ ...shimmerTransition, delay: 0.35 + index * 0.1 }}
              />
              <span className="relative z-10">{capability}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function ExpertiseSection() {
  const { locale, dictionary, t } = useI18n();
  const [activePoleId, setActivePoleId] = useState<PoleId>("talent");
  const [hoveredPoleId, setHoveredPoleId] = useState<PoleId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  const poles = useMemo<ExpertisePole[]>(
    () => [
      {
        id: "talent",
        number: dictionary.expertise.poles.talent.number,
        navTitle: dictionary.expertise.poles.talent.navTitle,
        canvasTitle: dictionary.expertise.poles.talent.canvasTitle,
        slogan: dictionary.expertise.poles.talent.slogan,
        description: dictionary.expertise.poles.talent.description,
        capabilities: [
          dictionary.expertise.poles.talent.capability1,
          dictionary.expertise.poles.talent.capability2,
          dictionary.expertise.poles.talent.capability3,
          dictionary.expertise.poles.talent.capability4,
        ],
        icon: Users,
      },
      {
        id: "strategy",
        number: dictionary.expertise.poles.strategy.number,
        navTitle: dictionary.expertise.poles.strategy.navTitle,
        canvasTitle: dictionary.expertise.poles.strategy.canvasTitle,
        slogan: dictionary.expertise.poles.strategy.slogan,
        description: dictionary.expertise.poles.strategy.description,
        capabilities: [
          dictionary.expertise.poles.strategy.capability1,
          dictionary.expertise.poles.strategy.capability2,
          dictionary.expertise.poles.strategy.capability3,
          dictionary.expertise.poles.strategy.capability4,
        ],
        icon: Target,
      },
      {
        id: "lab",
        number: dictionary.expertise.poles.lab.number,
        navTitle: dictionary.expertise.poles.lab.navTitle,
        canvasTitle: dictionary.expertise.poles.lab.canvasTitle,
        slogan: dictionary.expertise.poles.lab.slogan,
        description: dictionary.expertise.poles.lab.description,
        capabilities: [
          dictionary.expertise.poles.lab.capability1,
          dictionary.expertise.poles.lab.capability2,
          dictionary.expertise.poles.lab.capability3,
          dictionary.expertise.poles.lab.capability4,
        ],
        icon: FlaskConical,
      },
    ],
    [dictionary]
  );

  const activePole = poles.find((pole) => pole.id === activePoleId) ?? poles[0];
  const highlightedPoleId = hoveredPoleId ?? activePoleId;
  const highlightedIndex = poles.findIndex((pole) => pole.id === highlightedPoleId);

  const lianeAnchorY = navPositions[Math.max(0, highlightedIndex)] ?? navPositions[0];

  const navigateToSolutions = useCallback(() => {
    setTargetUrl(localizePathname(appRoutes.solutions, locale));
    setIsTransitioning(true);
  }, [locale]);

  return (
    <section
      className="relative h-auto min-h-screen w-full overflow-hidden bg-white pt-24 pb-14 lg:h-dvh lg:pt-24 lg:pb-0"
      aria-label="Section Expertise Lianet"
    >
      <BackgroundEffects />
      <FilmGrain />

      <div className="relative mx-auto w-full max-w-[1540px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#1B365D]/55">{t("expertise.eyebrow")}</p>
          <h2
            className="mt-4 text-[clamp(2.1rem,4.8vw,4.35rem)] font-black leading-[1.04] tracking-tighter text-[#1B365D]"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("expertise.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-[17px] leading-relaxed text-[#1B365D]/80">{t("expertise.intro")}</p>
        </motion.header>

        <div className="relative mt-10 hidden min-h-[66dvh] lg:flex">
          <nav
            className="relative w-[40%] pr-10 xl:pr-14"
            aria-label="Navigation des pôles d'expertise"
          >
            <div className="relative h-full pl-10 pt-14">
              <motion.div
                layoutId="hero-liane-glow"
                className="pointer-events-none absolute left-1 top-0 w-[2px]"
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(64,180,166,0.08), rgba(64,180,166,0.45), rgba(64,180,166,0.12))",
                  boxShadow: "0 0 14px rgba(64,180,166,0.25)",
                }}
              />

              <svg className="pointer-events-none absolute left-0 top-0 h-full w-[160px]" viewBox="0 0 160 560" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d={`M 2 10 C 8 120, 10 ${lianeAnchorY - 56}, 78 ${lianeAnchorY} C 105 ${lianeAnchorY + 22}, 122 ${lianeAnchorY + 48}, 150 ${lianeAnchorY + 66}`}
                  fill="none"
                  stroke="url(#expertise-liane-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ pathLength: 1, opacity: 1 }}
                  initial={{ pathLength: 0.12, opacity: 0.75 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
                <defs>
                  <linearGradient id="expertise-liane-gradient" x1="0" y1="0" x2="160" y2="560" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#40B4A6" stopOpacity="0.26" />
                    <stop offset="48%" stopColor="#40B4A6" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#8FD6CC" stopOpacity="0.42" />
                  </linearGradient>
                </defs>
              </svg>

              <ul className="relative z-10 space-y-10 pt-2">
                {poles.map((pole, index) => {
                  const isActive = pole.id === activePoleId;
                  const isHighlighted = pole.id === highlightedPoleId;
                  const Icon = pole.icon;

                  return (
                    <li key={pole.id}>
                      <motion.button
                        type="button"
                        onMouseEnter={() => setHoveredPoleId(pole.id)}
                        onMouseLeave={() => setHoveredPoleId(null)}
                        onFocus={() => setHoveredPoleId(pole.id)}
                        onBlur={() => setHoveredPoleId(null)}
                        onClick={() => setActivePoleId(pole.id)}
                        className="relative w-full text-left"
                        animate={{
                          x: isHighlighted ? 8 : 0,
                          opacity: isActive ? 1 : 0.74,
                        }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                      >
                        <p
                          className="mb-1 text-xs"
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                            opacity: 0.2,
                            color: "#1B365D",
                          }}
                        >
                          {pole.number}
                        </p>

                        <div className="flex items-center gap-3">
                          <span
                            data-cursor="hover"
                            data-cursor-strength="strong"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#40B4A6]/25 bg-[#40B4A6]/10 text-[#1B365D]"
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>

                          <motion.h3
                            className="uppercase"
                            style={{
                              fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                              letterSpacing: "-0.01em",
                            }}
                            animate={{
                              fontSize: isActive ? "2.15rem" : "1.5rem",
                              fontWeight: isActive ? 900 : 800,
                              color: isActive ? "#1B365D" : "rgba(27,54,93,0.72)",
                            }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                          >
                            {pole.navTitle}
                          </motion.h3>
                        </div>
                      </motion.button>

                      {index < poles.length - 1 ? <div className="ml-[3.1rem] mt-6 h-px w-[68%] bg-[#1B365D]/10" /> : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="w-[60%] pb-2">
            <AnimatePresence mode="wait">
              <ExpertiseDesktopCanvas pole={activePole} />
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mt-9 space-y-6 lg:hidden">
          {poles.map((pole, index) => {
            const Icon = pole.icon;
            return (
              <motion.article
                key={`mobile-${pole.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/28 bg-white/28 p-6"
                style={{
                  backdropFilter: "blur(26px)",
                  WebkitBackdropFilter: "blur(26px)",
                  boxShadow: "0 18px 42px rgba(27,54,93,0.14)",
                }}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(64,180,166,0.36), rgba(64,180,166,0.02) 72%)",
                    filter: "blur(12px)",
                  }}
                  animate={{ x: [0, 8, 0], y: [0, -10, 0] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10">
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      opacity: 0.2,
                      color: "#1B365D",
                    }}
                  >
                    {pole.number}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <span
                      data-cursor="hover"
                      data-cursor-strength="strong"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#40B4A6]/25 bg-[#40B4A6]/10 text-[#1B365D]"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h3
                      className="text-[1.65rem] font-black tracking-tighter text-[#1B365D]"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    >
                      {pole.navTitle}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm italic text-[#40B4A6]" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
                    {pole.slogan}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-[#1B365D]/80">{pole.description}</p>

                  <ul className="mt-5 space-y-2" aria-label={pole.navTitle}>
                    {pole.capabilities.map((capability) => (
                      <li key={`${pole.id}-${capability}`} className="flex items-start gap-2 text-sm text-[#1B365D]/78">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#40B4A6]" aria-hidden="true" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-9 flex justify-center lg:mt-6"
        >
          <motion.button
            type="button"
            onClick={navigateToSolutions}
            disabled={isTransitioning}
            className="inline-flex items-center gap-2 rounded-full border border-[#40B4A6]/35 bg-[#40B4A6]/14 px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#1B365D] transition-colors hover:bg-[#40B4A6]/24 disabled:cursor-not-allowed disabled:opacity-60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("expertise.ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>

      <PageWipe
        isActive={isTransitioning}
        targetUrl={targetUrl}
        color="#40B4A6"
        onComplete={() => {
          setIsTransitioning(false);
          setTargetUrl(null);
        }}
      />
    </section>
  );
}

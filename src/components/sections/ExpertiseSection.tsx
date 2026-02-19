"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Compass, Users2, Zap } from "lucide-react";
import { HeroPrimaryButton, Magnetic } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";
import SandGrain from "./SandGrain";

type PoleKey = "talent" | "strategy" | "lab";

interface PoleContent {
  key: PoleKey;
  number: string;
  title: string;
  hook: string;
  subtitle: string;
  cta: string;
  ctaMeta: string;
  description: string;
  keyPoints: string[];
  valueProp: string;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 150,
  damping: 20,
};

const poleIcons = {
  talent: Users2,
  strategy: Compass,
  lab: Zap,
} as const;

export default function ExpertiseSection() {
  const { locale, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const [activePole, setActivePole] = useState<PoleKey>("talent");
  const [showSweep, setShowSweep] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [desktopNavHeight, setDesktopNavHeight] = useState(72);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const navElement = document.querySelector("nav") as HTMLElement | null;
    if (!navElement) return;

    const updateHeight = () => {
      const height = Math.max(56, Math.round(navElement.getBoundingClientRect().height));
      setDesktopNavHeight(height);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const observer = new ResizeObserver(updateHeight);
    observer.observe(navElement);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [isMobile]);

  const poles = useMemo<PoleContent[]>(
    () => [
      {
        key: "talent",
        number: "01",
        title: t("expertise.poles.talent.title"),
        hook: t("expertise.poles.talent.hook"),
        subtitle: t("expertise.poles.talent.subtitle"),
        cta: t("expertise.poles.talent.cta"),
        ctaMeta: t("expertise.poles.talent.ctaMeta"),
        description: t("expertise.poles.talent.description"),
        keyPoints: [
          t("expertise.poles.talent.keyPoint1"),
          t("expertise.poles.talent.keyPoint2"),
          t("expertise.poles.talent.keyPoint3"),
        ],
        valueProp: t("expertise.poles.talent.valueProp"),
      },
      {
        key: "strategy",
        number: "02",
        title: t("expertise.poles.strategy.title"),
        hook: t("expertise.poles.strategy.hook"),
        subtitle: t("expertise.poles.strategy.subtitle"),
        cta: t("expertise.poles.strategy.cta"),
        ctaMeta: t("expertise.poles.strategy.ctaMeta"),
        description: t("expertise.poles.strategy.description"),
        keyPoints: [
          t("expertise.poles.strategy.keyPoint1"),
          t("expertise.poles.strategy.keyPoint2"),
          t("expertise.poles.strategy.keyPoint3"),
        ],
        valueProp: t("expertise.poles.strategy.valueProp"),
      },
      {
        key: "lab",
        number: "03",
        title: t("expertise.poles.lab.title"),
        hook: t("expertise.poles.lab.hook"),
        subtitle: t("expertise.poles.lab.subtitle"),
        cta: t("expertise.poles.lab.cta"),
        ctaMeta: t("expertise.poles.lab.ctaMeta"),
        description: t("expertise.poles.lab.description"),
        keyPoints: [
          t("expertise.poles.lab.keyPoint1"),
          t("expertise.poles.lab.keyPoint2"),
          t("expertise.poles.lab.keyPoint3"),
        ],
        valueProp: t("expertise.poles.lab.valueProp"),
      },
    ],
    [t]
  );

  const activeContent = poles.find((pole) => pole.key === activePole) ?? poles[0];
  const activePoleIcon = poleIcons[activePole];
  const desktopCanvasHeight = `calc(100dvh - ${desktopNavHeight}px - 5.5rem)`;

  const handlePoleChange = (nextPole: PoleKey) => {
    if (nextPole === activePole) return;
    setActivePole(nextPole);
    setShowSweep(true);
    setSweepKey((previous) => previous + 1);
  };

  // Auto-rotation logic
  useEffect(() => {
    if (isPaused || isMobile) return;

    const interval = setInterval(() => {
      const currentIndex = poles.findIndex((p) => p.key === activePole);
      const nextIndex = (currentIndex + 1) % poles.length;
      const nextPole = poles[nextIndex].key;

      setActivePole(nextPole);
      setShowSweep(true);
      setSweepKey((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [activePole, isPaused, isMobile, poles]);

  const handleCtaClick = () => {
    const href = localizePathname(appRoutes.solutions, locale);
    window.dispatchEvent(new CustomEvent("navigateWithWipe", { detail: { href } }));
  };

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden bg-[#8FD6CC] px-4 py-16 sm:px-6 lg:min-h-dvh lg:px-10 lg:py-24 xl:px-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#8FD6CC]/75 to-transparent lg:h-20"
      />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-[40%_60%] lg:gap-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:absolute lg:left-1/2 lg:top-10 lg:z-20 lg:-translate-x-1/2 text-center text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--primary))]/60"
          style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
        >
          {t("expertise.eyebrow")}
        </motion.p>

        <aside
          className="relative z-10 flex flex-col items-center gap-8 text-center lg:items-start lg:text-left lg:pr-4"
          style={isMobile ? undefined : { minHeight: desktopCanvasHeight }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[24ch] text-[clamp(1.85rem,8vw,4rem)] font-black leading-[1.04] tracking-[-0.03em] text-[rgb(var(--primary))] lg:hidden"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("expertise.headline")}
          </motion.h2>

          <div className="hidden max-w-[500px] lg:absolute lg:inset-x-0 lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:flex-col lg:gap-10">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[24ch] text-[clamp(2.1rem,3.4vw,4rem)] font-black leading-[1.02] tracking-[-0.03em] text-[rgb(var(--primary))]"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            >
              {t("expertise.headline")}
            </motion.h2>

            <div className="max-w-[480px]">
              <div className="space-y-6">
                {poles.map((pole) => {
                  const isActive = pole.key === activePole;
                  return (
                    <motion.button
                      key={pole.key}
                      type="button"
                      onClick={() => {
                        handlePoleChange(pole.key);
                        setIsPaused(true); // Pause on manual interaction
                        // Optional: Resume after a delay? For now, let's keep it paused on hover, but if they click, it implies interest, so maybe pause until they leave the section? 
                        // The onMouseEnter on the section handles the pause, so clicking is covered by that since they are inside the section.
                      }}
                      aria-label={`${locale === "fr" ? "Sélectionner" : "Select"} ${pole.title}`}
                      aria-current={isActive ? "true" : "false"}
                      className="group relative flex w-full items-center gap-5 pl-7 pr-2 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--secondary))] focus-visible:ring-offset-4 focus-visible:ring-offset-[#8FD6CC]"
                      whileHover={{ x: 5 }}
                      transition={springTransition}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="expertise-liane"
                          className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-[rgb(var(--secondary))]"
                          transition={springTransition}
                          style={{ boxShadow: "0 0 18px rgba(64,180,166,0.65)" }}
                        />
                      )}

                      <span
                        className={`text-sm tracking-[0.2em] ${isActive ? "text-[rgb(var(--secondary))]" : "text-[rgb(var(--primary))]/42"}`}
                        style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                      >
                        {pole.number}
                      </span>
                      <span
                        className={`text-[clamp(1.05rem,1.55vw,1.2rem)] font-black ${isActive ? "text-[rgb(var(--primary))]" : "text-[rgb(var(--primary))]/40"}`}
                        style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                      >
                        {pole.hook}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <div
          className="relative hidden items-center justify-start lg:flex lg:pl-8 lg:pr-[clamp(2.5rem,6vw,7rem)]"
          style={{ minHeight: desktopCanvasHeight }}
        >
          <motion.div
            ref={canvasRef}
            role="region"
            aria-label={`${locale === "fr" ? "Contenu du pôle" : "Pole content"} ${activeContent.title}`}
            aria-live="polite"
            aria-atomic="true"
            className="relative z-10 w-full max-w-[56rem] overflow-hidden rounded-[2rem] bg-white/20 p-12 backdrop-blur-[60px] xl:p-16"
            style={{
              boxShadow: "0 34px 100px rgba(27,54,93,0.16)",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <span className="pointer-events-none absolute inset-0 rounded-[2rem] border-l border-t border-white/30" aria-hidden="true" />
            <SandGrain className="z-[1]" opacity={0.065} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activePole}
                initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(7px)" }}
                transition={springTransition}
                className="relative z-20 max-w-[640px] space-y-7"
              >
                <p
                  className="text-[12px] uppercase tracking-[0.22em] text-[rgb(var(--primary))]/64"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                  {activeContent.number} / {activeContent.title}
                </p>

                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={springTransition}
                  className="text-[clamp(2.2rem,3.5vw,3.4rem)] font-black leading-[1.03] tracking-[-0.03em] text-[rgb(var(--primary))]"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                  {activeContent.hook}
                </motion.h3>

                <p
                  className="text-[clamp(1.06rem,1.8vw,1.34rem)] font-semibold leading-snug text-[rgb(var(--secondary))]"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                  {activeContent.subtitle}
                </p>

                <p className="max-w-[56ch] text-lg font-light leading-relaxed text-[rgb(var(--primary))]/88" style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}>
                  {activeContent.description}
                </p>

                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: shouldReduceMotion ? 0 : 0.08,
                        delayChildren: shouldReduceMotion ? 0 : 0.04,
                      },
                    },
                  }}
                  className="space-y-2 text-base font-light text-[rgb(var(--primary))]/86"
                  style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                >
                  {activeContent.keyPoints.map((item) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: 8 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={springTransition}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[rgb(var(--secondary))]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <p className="max-w-[54ch] text-base font-light italic leading-relaxed text-[rgb(var(--primary))]/82" style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}>
                  {activeContent.valueProp}
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.2 }}
                  className="space-y-2"
                >
                  <p
                    className="text-[10px] font-light uppercase tracking-[0.18em] text-[rgb(var(--primary))]/50"
                    style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                  >
                    {activeContent.ctaMeta}
                  </p>
                  <Magnetic className="inline-flex" strength={20}>
                    <HeroPrimaryButton
                      size="compact"
                      label={activeContent.cta}
                      iconStart={activePoleIcon}
                      iconEnd={ArrowUpRight}
                      iconHoverRotate={5}
                      showEndIconOnMobile
                      onClick={handleCtaClick}
                      data-cursor="hover"
                      data-cursor-label="VOIR"
                      data-cursor-profile="expertise"
                      data-cursor-strength="strong"
                      className="!w-auto min-w-[16rem] bg-[rgb(var(--secondary))] px-8 py-4 !text-sm !font-bold uppercase !tracking-widest shadow-[0_14px_30px_rgba(64,180,166,0.34)] hover:bg-[#58c5b7]"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    />
                  </Magnetic>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {showSweep && (
                <motion.span
                  key={`${activePole}-sweep-${sweepKey}`}
                  className="pointer-events-none absolute inset-0 rounded-[2rem]"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 10%, rgba(255,255,255,0.44) 45%, rgba(64,180,166,0.4) 56%, transparent 86%)",
                    filter: "blur(8px)",
                  }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.68, 0, 0.32, 1] }}
                  onAnimationComplete={() => setShowSweep(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:hidden">
          {poles.map((pole, index) => (
            <div key={pole.key} className="relative py-12 sm:py-16">
              <motion.article
                className="relative z-10 mx-auto w-full max-w-[42rem] overflow-hidden rounded-3xl border border-white/28 bg-white/20 p-6 text-center backdrop-blur-md sm:p-8"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ amount: 0.35, once: false }}
                transition={{ type: "spring", stiffness: 150, damping: 20, delay: index * 0.08 }}
              >
                <SandGrain className="z-[1]" opacity={0.065} />
                <div className="relative z-10 space-y-4">
                  <p
                    className="text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--primary))]/60"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {pole.number} / {pole.title}
                  </p>
                  <h3
                    className="text-[clamp(1.9rem,8vw,2.4rem)] font-black leading-[1.04] tracking-[-0.03em] text-[rgb(var(--primary))]"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {pole.hook}
                  </h3>
                  <p
                    className="text-[clamp(1rem,4vw,1.2rem)] font-semibold leading-snug text-[rgb(var(--secondary))]"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {pole.subtitle}
                  </p>
                  <p className="mb-10 text-base font-light leading-relaxed text-[rgb(var(--primary))]/86" style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}>
                    {pole.description}
                  </p>

                  <ul className="space-y-2 text-sm font-light text-[rgb(var(--primary))]/86" style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}>
                    {pole.keyPoints.map((item) => (
                      <li key={item} className="flex items-center justify-center gap-2">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[rgb(var(--secondary))]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm font-light italic leading-relaxed text-[rgb(var(--primary))]/82" style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}>
                    {pole.valueProp}
                  </p>
                </div>

                <div className="relative z-10 mt-8 w-full px-2 text-center sm:px-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ amount: 0.5, once: false }}
                    transition={{ ...springTransition, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <p
                      className="text-[10px] font-light uppercase tracking-[0.18em] text-[rgb(var(--primary))]/50"
                      style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                    >
                      {pole.ctaMeta}
                    </p>
                    <Magnetic className="block w-full" strength={16}>
                      <HeroPrimaryButton
                        size="compact"
                        label={pole.cta}
                        iconStart={poleIcons[pole.key]}
                        iconEnd={ArrowUpRight}
                        iconHoverRotate={5}
                        showEndIconOnMobile
                        onClick={handleCtaClick}
                        data-cursor="hover"
                        data-cursor-label="VOIR"
                        data-cursor-profile="expertise"
                        className="w-full bg-[rgb(var(--secondary))] px-8 py-4 !text-sm !font-bold uppercase !tracking-widest hover:bg-[#58c5b7]"
                        style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                      />
                    </Magnetic>
                  </motion.div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

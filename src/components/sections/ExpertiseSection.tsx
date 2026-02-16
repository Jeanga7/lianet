"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, FlaskConical, TrendingUp, Users } from "lucide-react";
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
  description: string;
  keyPoints: string[];
  valueProp: string;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 150,
  damping: 20,
};

const parallaxSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  mass: 0.9,
};

const poleIcons = {
  talent: Users,
  strategy: TrendingUp,
  lab: FlaskConical,
} as const;

export default function ExpertiseSection() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const [activePole, setActivePole] = useState<PoleKey>("talent");
  const [showSweep, setShowSweep] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const textParallaxX = useSpring(
    useTransform(pointerX, [-1, 1], shouldReduceMotion || isMobile ? [0, 0] : [14, -14]),
    parallaxSpring
  );
  const textParallaxY = useSpring(
    useTransform(pointerY, [-1, 1], shouldReduceMotion || isMobile ? [0, 0] : [9, -9]),
    parallaxSpring
  );

  const poles = useMemo<PoleContent[]>(
    () => [
      {
        key: "talent",
        number: "01",
        title: t("expertise.poles.talent.title"),
        hook: t("expertise.poles.talent.hook"),
        subtitle: t("expertise.poles.talent.subtitle"),
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

  const handleCanvasMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current || shouldReduceMotion || isMobile) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, x)));
    pointerY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleCanvasLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleCtaClick = () => {
    router.push(localizePathname(appRoutes.solutions, locale));
  };

  const headline = t("expertise.headline");
  const headlineParts = headline.split(". ");
  const headlinePrimary =
    headlineParts.length > 1 ? `${headlineParts[0]}.` : headline;
  const headlineSecondary =
    headlineParts.length > 1 ? headlineParts.slice(1).join(". ") : "";

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#8FD6CC] px-4 py-16 sm:px-6 lg:min-h-dvh lg:px-10 lg:py-24 xl:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.16),transparent_58%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-12 lg:grid lg:grid-cols-[40%_60%] lg:gap-16">
        <aside
          className="relative z-10 flex flex-col gap-8 lg:pr-4"
          style={isMobile ? undefined : { minHeight: desktopCanvasHeight }}
        >
          <div className="space-y-5 lg:pt-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--primary))]/60"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            >
              {t("expertise.eyebrow")}
            </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[24ch] text-[clamp(2.1rem,3.6vw,4rem)] font-black leading-[1.02] tracking-[-0.03em] text-[rgb(var(--primary))]"
            style={{
              fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
              marginTop: isMobile ? 0 : 30,
            }}
          >
              <span className="block whitespace-nowrap">{headlinePrimary}</span>
              {headlineSecondary ? (
                <span className="mt-2 block pl-2 text-left text-[clamp(1.55rem,2.7vw,3rem)] leading-[1.06]">
                  {headlineSecondary}
                </span>
              ) : null}
            </motion.h2>
          </div>

          <div className="hidden max-w-[480px] lg:absolute lg:left-0 lg:top-1/2 lg:flex lg:w-full lg:-translate-y-1/2 lg:items-center lg:justify-start">
            <div className="space-y-6">
              {poles.map((pole) => {
                const isActive = pole.key === activePole;
                return (
                  <motion.button
                    key={pole.key}
                    type="button"
                    onClick={() => handlePoleChange(pole.key)}
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
        </aside>

        <div
          className="relative hidden items-center justify-start lg:flex lg:pl-8 lg:pr-[clamp(2.5rem,6vw,7rem)]"
          style={{ minHeight: desktopCanvasHeight }}
        >
          <motion.div
            ref={canvasRef}
            onMouseMove={handleCanvasMove}
            onMouseLeave={handleCanvasLeave}
            role="region"
            aria-label={`${locale === "fr" ? "Contenu du pôle" : "Pole content"} ${activeContent.title}`}
            aria-live="polite"
            aria-atomic="true"
            className="relative w-full max-w-[56rem] overflow-hidden rounded-[2rem] bg-white/20 p-12 backdrop-blur-[60px] xl:p-16"
            style={{
              boxShadow: "0 34px 100px rgba(27,54,93,0.16)",
            }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-[2rem] border-l border-t border-white/30" aria-hidden="true" />
            <SandGrain className="z-[1]" opacity={0.04} />

            <motion.p
              aria-hidden="true"
              className="pointer-events-none absolute left-8 top-1/2 z-10 -translate-y-1/2 text-[15rem] font-black leading-none tracking-[-0.06em]"
              style={{
                x: textParallaxX,
                y: textParallaxY,
                color: "transparent",
                WebkitTextStroke: "1px rgba(27,54,93,0.05)",
                fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
              }}
            >
              {activeContent.title}
            </motion.p>

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

                <Magnetic className="inline-flex" strength={14}>
                  <HeroPrimaryButton
                    size="compact"
                    label={t("expertise.ctaLabel")}
                    iconStart={activePoleIcon}
                    iconEnd={ArrowUpRight}
                    showEndIconOnMobile
                    onClick={handleCtaClick}
                    data-cursor="hover"
                    data-cursor-label="VOIR"
                    data-cursor-profile="expertise"
                    data-cursor-strength="strong"
                    className="!w-auto min-w-[16rem] bg-[rgb(var(--secondary))] px-8 py-4 shadow-[0_14px_30px_rgba(64,180,166,0.34)]"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  />
                </Magnetic>
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

        <div className="grid gap-0 lg:hidden">
          {poles.map((pole, index) => (
            <div key={pole.key} className="py-24">
              <motion.article
                className="relative overflow-hidden rounded-3xl border border-white/28 bg-white/20 p-8 text-center backdrop-blur-md sm:p-10"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ amount: 0.35, once: false }}
                transition={{ type: "spring", stiffness: 150, damping: 20, delay: index * 0.08 }}
              >
                <SandGrain className="z-[1]" opacity={0.04} />
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
                  <p className="text-base font-light leading-relaxed text-[rgb(var(--primary))]/86" style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}>
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

                <div className="relative z-10 mt-8 w-full px-6">
                  <Magnetic className="block" strength={10}>
                    <HeroPrimaryButton
                      size="compact"
                      label={t("expertise.ctaLabel")}
                      iconStart={poleIcons[pole.key]}
                      iconEnd={ArrowUpRight}
                      showEndIconOnMobile
                      onClick={handleCtaClick}
                      data-cursor="hover"
                      data-cursor-label="VOIR"
                      data-cursor-profile="expertise"
                      className="w-full bg-[rgb(var(--secondary))] px-8 py-4"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    />
                  </Magnetic>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

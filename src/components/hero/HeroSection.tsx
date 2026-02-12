"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroPrimaryButton, HeroSecondaryButton, PageWipe } from "@/components/ui";
import InteractiveLottie from "@/components/ui/molecules/InteractiveLottie";
import MobileBackgroundPattern from "./MobileBackgroundPattern";
import OrganicBackground from "./OrganicBackground";

const HeroSection = () => {
  const heroParagraph =
    "Lianet connects African businesses with top digital talents to build impactful, scalable solutions.";
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const haloY = useTransform(scrollY, [0, 900], [0, -70]);
  // Parallax Clipping : Le contenu Hero se translate vers le haut quand Expertise monte
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -20], { clamp: true });
  
  // Interaction de scroll sur le titre : réduction du tracking et fade-out
  const titleTracking = useTransform(scrollYProgress, [0, 0.1], [-0.015, -0.04], { clamp: true });
  // Keep title color true (#1B365D) by avoiding opacity fade on scroll.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1], { clamp: true });

  
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [isMobileLogoVisible, setIsMobileLogoVisible] = useState(true);
  const mapScale = useMotionValue(1);
  const mapScaleSpring = useSpring(mapScale, { stiffness: 140, damping: 20, mass: 0.8 });

  const handleButtonClick = useCallback(() => {
    setIsTransitioning(true);
    setTargetUrl("/solutions");
  }, []);

  const handleMobileScrollClick = useCallback(() => {
    const targetSection = document.getElementById("expertise");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const rafId = window.requestAnimationFrame(() => {
        setTypedChars(heroParagraph.length);
        setTypingDone(true);
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    let startTimeout: number | null = null;
    let typingInterval: number | null = null;

    const startTyping = () => {
      startTimeout = window.setTimeout(() => {
        typingInterval = window.setInterval(() => {
          setTypedChars((previous) => {
            if (previous >= heroParagraph.length) {
              if (typingInterval) window.clearInterval(typingInterval);
              setTypingDone(true);
              return heroParagraph.length;
            }
            return previous + 1;
          });
        }, 22);
      }, 260);
    };

    if (document.readyState === "complete") {
      startTyping();
    } else {
      window.addEventListener("load", startTyping, { once: true });
    }

    return () => {
      if (startTimeout) window.clearTimeout(startTimeout);
      if (typingInterval) window.clearInterval(typingInterval);
      window.removeEventListener("load", startTyping);
    };
  }, [heroParagraph]);

  useEffect(() => {
    const scroller = document.getElementById("main-scroll");
    if (!scroller) return;

    let lastScrollTop = scroller.scrollTop;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollTop = scroller.scrollTop;
        const delta = currentScrollTop - lastScrollTop;

        if (currentScrollTop <= 12) {
          setIsMobileLogoVisible(true);
        } else if (delta > 6) {
          setIsMobileLogoVisible(false);
        } else if (delta < -4) {
          setIsMobileLogoVisible(true);
        }

        lastScrollTop = currentScrollTop;
        ticking = false;
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const handleMapMouseEnter = useCallback(() => {
    mapScale.set(1.015);
  }, [mapScale]);

  const handleMapMouseLeave = useCallback(() => {
    mapScale.set(1);
  }, [mapScale]);

  

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white grid-pattern lg:bg-transparent lg:grid-pattern-none">
      {/* Organic background (mobile) */}
      <OrganicBackground className="pointer-events-none absolute inset-0 z-0 lg:hidden" />

      {/* Motifs illustratifs élégants (mobile) */}
      <MobileBackgroundPattern />

      {/* Logo mobile (en haut à gauche, fixe) - masque/reapparition douce selon le scroll */}
      <motion.div
        className="fixed left-4 sm:left-6 top-6 z-50 lg:hidden flex items-center h-10 sm:h-12 pointer-events-none"
        animate={{
          y: isMobileLogoVisible ? 0 : -26,
          opacity: isMobileLogoVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src="/logo-lianet-sans-bg.png"
          alt="Lianet"
          width={128}
          height={42}
          className="h-10 sm:h-12 w-auto"
          priority
          quality={90}
        />
      </motion.div>

      {/* Halo organique (mobile) + parallax léger */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] z-0 h-[400px] w-[400px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,214,204,0.22),rgba(255,255,255,0)_60%)] blur-2xl lg:hidden"
        style={{ y: haloY }}
      />

      {/* Layout principal : Sidebar à gauche + Contenu à droite */}
      <motion.div 
        className="relative z-10 ml-0 flex flex-1 flex-col pt-24 sm:pt-32 pb-36 sm:pb-20 lg:pt-24 lg:pb-0 lg:flex-row lg:items-stretch"
        style={{
          y: contentY,
        }}
      >
        {/* Zone Texte/CTA (Gauche) */}
        <div className="flex flex-1 lg:basis-[52%] xl:basis-1/2 flex-col justify-center px-4 sm:px-6 py-16 lg:py-24 lg:pl-16 lg:pr-10 xl:pr-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full max-w-[38rem] justify-center translate-y-12 sm:translate-y-0 space-y-6 relative z-10 text-center lg:text-left items-center lg:items-start flex flex-col"
          >
            {/* Eyebrow text */}
            <motion.p
              className="-mt-6 sm:mt-0 text-[9px] sm:text-[10px] tracking-[0.4em] text-[#1B365D]/40 uppercase"
              style={{ fontFamily: "var(--font-varela), 'Varela Round', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              LIANET — STRATEGIC EXCELLENCE
            </motion.p>

            {/* Titre massif avec effet reveal et interaction de scroll */}
            <motion.h1
              className="w-full mx-auto lg:mx-0 text-[clamp(3.1rem,12vw,6.2rem)] md:text-[clamp(3.6rem,8.8vw,6.8rem)] lg:text-[clamp(4rem,6.8vw,7.8rem)] font-extrabold leading-[1.06] relative z-20 text-center lg:text-left"
              style={{
                letterSpacing: titleTracking,
                opacity: titleOpacity,
                willChange: "opacity, letter-spacing",
                color: "rgb(27, 54, 93)",
                isolation: "isolate",
                position: "relative",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Connecting
              <br className="block" />
              <span className="inline-block whitespace-nowrap">the Future</span>
            </motion.h1>

            {/* Paragraphe avec effet reveal */}
            <motion.p
              className="max-w-[90%] sm:max-w-[45ch] text-[17px] md:text-[18px] lg:text-[17px] xl:text-[18px] text-foreground mx-auto lg:mx-0 pb-1 sm:pb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              aria-label={heroParagraph}
            >
              {heroParagraph.slice(0, typedChars)}
              {!typingDone && (
                <span className="ml-0.5 inline-block h-[1em] w-[1px] animate-pulse bg-[#1B365D]/60 align-[-0.1em]" />
              )}
            </motion.p>

            {/* Duo CTA avec effet reveal - Conteneur séparé pour isolation */}
            <motion.div
              className="hidden sm:flex mt-6 lg:mt-8 flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 items-center lg:items-start"
              style={{ isolation: "isolate" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* CTA Primaire - Focus avec solidité premium */}
              <HeroPrimaryButton
                onClick={handleButtonClick}
                label="Nos Solutions"
              />
              
              {/* CTA Secondaire - Glassmorphism premium avec barre de scan */}
              <HeroSecondaryButton label="Start Project" />
            </motion.div>
          </motion.div>
        </div>

        {/* Zone Visuelle - Carte Afrique à droite */}
        <div className="relative hidden flex-1 lg:basis-[48%] xl:basis-1/2 lg:flex items-center justify-center px-6 lg:px-8 xl:px-12">
          <motion.div
            className="relative h-[56vh] lg:h-[60vh] xl:h-[66vh] 2xl:h-[72vh] w-full max-w-[560px] lg:max-w-[620px] xl:max-w-[760px] 2xl:max-w-[900px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMapMouseEnter}
            onMouseLeave={handleMapMouseLeave}
            style={{
              scale: mapScaleSpring,
            }}
          >
            <Image
              src="/BlankMap-Africa.svg"
              alt="Carte de l'Afrique"
              fill
              priority
              className="object-contain opacity-95 drop-shadow-[0_22px_50px_rgba(64,180,166,0.18)] transition-transform duration-300"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* CTA mobile ancrés en bas pour ergonomie du pouce */}
      <motion.div
        className="sm:hidden absolute left-0 right-0 bottom-[calc(2.4rem+env(safe-area-inset-bottom))] z-30 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className="mx-auto w-full max-w-md flex flex-col gap-3">
          <HeroPrimaryButton
            onClick={handleButtonClick}
            label="Nos Solutions"
          />
          <HeroSecondaryButton label="Start Project" />
          <motion.button
            type="button"
            onClick={handleMobileScrollClick}
            whileTap={{ scale: 0.94 }}
            className="mt-6 inline-flex items-center justify-center self-center p-1 text-[#1B365D]/78"
            aria-label="Scroller vers la section suivante"
          >
            <span className="relative flex flex-col items-center leading-none">
              <motion.span
                className="-mb-1 block"
                animate={{ y: [-2, 1, -2], opacity: [0.35, 0.95, 0.35] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
              <motion.span
                className="-mb-1 block"
                animate={{ y: [-1, 2, -1], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.35, delay: 0.14, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
              <motion.span
                className="block"
                animate={{ y: [0, 3, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.35, delay: 0.28, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Lueur turquoise pour Shared Element Transition (Hero → Expertise) */}
      <motion.div
        layoutId="hero-liane-glow"
        className="hidden lg:block absolute left-20 bottom-0 w-2 h-32 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to top, rgba(64, 180, 166, 0.4), rgba(64, 180, 166, 0.1), transparent)",
          filter: "blur(4px)",
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        {/* Halo pulsant autour de la lueur */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, rgba(64, 180, 166, 0.3), transparent 70%)",
            filter: "blur(8px)",
            width: "40px",
            left: "-19px",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Spark effect - étincelle qui parcourt la liane */}
        <motion.div
          className="absolute w-1 h-1 bg-secondary rounded-full"
          style={{
            boxShadow: "0 0 8px rgba(64, 180, 166, 0.8)",
          }}
          animate={{
            y: [0, 128, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Lottie en bas à gauche */}
      <div className="hidden sm:block absolute sm:bottom-6 sm:left-6 z-20 lg:bottom-8 lg:left-16">
        <InteractiveLottie
          src="https://lottie.host/bbbdb663-2443-4e12-a9b1-09abd36b5768/SG4lGYFvFC.lottie"
          className=""
          size={{ base: "3.5rem", sm: "4rem", md: "4.5rem" }}
          radius={600}
          pauseWhenIdle
          hideWhenIdle
        />
      </div>

      {/* PageWipe Transition */}
      <PageWipe
        isActive={isTransitioning}
        targetUrl={targetUrl}
        color="#40B4A6"
        onComplete={() => {
          setIsTransitioning(false);
          setTargetUrl(null);
        }}
      />
    </div>
  );
};

export default HeroSection;

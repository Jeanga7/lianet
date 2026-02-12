"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroPrimaryButton, HeroSecondaryButton, PageWipe } from "@/components/ui";
import InteractiveLottie from "@/components/ui/molecules/InteractiveLottie";
import MobileBackgroundPattern from "./MobileBackgroundPattern";
import OrganicBackground from "./OrganicBackground";

const HeroSection = () => {
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

  const handleButtonClick = useCallback(() => {
    setIsTransitioning(true);
    setTargetUrl("/solutions");
  }, []);

  

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white grid-pattern lg:bg-transparent lg:grid-pattern-none">
      {/* Background image desktop */}
      <div 
        className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background-lianet-1.png')" }}
        aria-hidden="true"
      />

      {/* Organic background (mobile) */}
      <OrganicBackground className="pointer-events-none absolute inset-0 z-0 lg:hidden" />

      {/* Motifs illustratifs élégants (mobile) */}
      <MobileBackgroundPattern />

      {/* Logo mobile (en haut à gauche, absolu) - Aligné avec le bouton menu */}
      <div className="absolute left-4 sm:left-6 top-6 z-50 lg:hidden flex items-center h-10 sm:h-12">
        <Image
          src="/logo-lianet-sans-bg.png"
          alt="Lianet"
          width={128}
          height={42}
          className="h-10 sm:h-12 w-auto"
          priority
          quality={90}
        />
      </div>

      {/* Halo organique (mobile) + parallax léger */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] z-0 h-[400px] w-[400px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,214,204,0.22),rgba(255,255,255,0)_60%)] blur-2xl lg:hidden"
        style={{ y: haloY }}
      />

      {/* Layout principal : Sidebar à gauche + Contenu à droite */}
      <motion.div 
        className="relative z-10 ml-0 flex flex-1 flex-col pt-24 sm:pt-32 pb-36 sm:pb-20 lg:pt-24 lg:pb-0 lg:flex-row"
        style={{
          y: contentY,
        }}
      >
        {/* Zone Texte/CTA (Gauche) */}
        <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 py-16 lg:py-24 lg:pl-16 lg:pr-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full justify-center translate-y-12 sm:translate-y-0 space-y-6 relative z-10 text-center lg:text-left items-center lg:items-start flex flex-col"
          >
            {/* Eyebrow text */}
            <motion.p
              className="-mt-6 sm:mt-0 text-xs sm:text-[10px] tracking-[0.4em] text-[#1B365D]/40 uppercase"
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
              className="w-full mx-auto lg:mx-0 text-[11vw] sm:text-[12vw] font-extrabold leading-[1.1] sm:text-7xl md:text-8xl lg:text-9xl relative z-20 text-center lg:text-left"
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
              the Future
            </motion.h1>

            {/* Paragraphe avec effet reveal */}
            <motion.p
              className="max-w-[90%] sm:max-w-[45ch] text-[17px] sm:text-base text-foreground sm:text-lg mx-auto lg:mx-0 pb-4 sm:pb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Lianet connects African businesses with top digital talents to
              build impactful, scalable solutions.
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

        {/* Zone Visuelle - Liane Narrative à droite */}
        <div className="relative hidden flex-1 lg:block">
          {/* Liane Narrative verticale à droite */}
          <motion.div
            className="absolute right-16 top-1/2 -translate-y-1/2 w-2 h-96 pointer-events-none z-20"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(64, 180, 166, 0.4), rgba(64, 180, 166, 0.1), transparent)",
              filter: "blur(4px)",
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
          >
            {/* Halo pulsant autour de la liane */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 40px 100%, rgba(64, 180, 166, 0.3), transparent 70%)",
                filter: "blur(8px)",
                width: "40px",
                left: "-19px",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Ligne principale avec box-shadow et pulse */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(64, 180, 166, 0.8), rgba(64, 180, 166, 0.4), rgba(143, 214, 204, 0.2))",
                boxShadow: "0 0 20px rgba(64, 180, 166, 0.6), 0 0 40px rgba(64, 180, 166, 0.3)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Spark effect - étincelle qui parcourt la liane */}
            <motion.div
              className="absolute w-1 h-1 bg-secondary rounded-full left-1/2 -translate-x-1/2"
              style={{
                boxShadow: "0 0 8px rgba(64, 180, 166, 0.8), 0 0 16px rgba(64, 180, 166, 0.4)",
              }}
              animate={{
                y: [0, 384, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* CTA mobile ancrés en bas pour ergonomie du pouce */}
      <motion.div
        className="sm:hidden absolute left-0 right-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-30 px-4"
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

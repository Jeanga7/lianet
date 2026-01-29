"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import PageWipe from "@/components/ui/PageWipe";
import MobileBackgroundPattern from "./MobileBackgroundPattern";
import ScrollIndicator from "./ScrollIndicator";
import OrganicBackground from "./OrganicBackground";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const haloY = useTransform(scrollY, [0, 900], [0, -70]);
  
  // Parallax Clipping : Le contenu Hero se translate vers le haut quand Expertise monte
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -20], { clamp: true });
  
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

      {/* Logo mobile (en haut à gauche, absolu) */}
      <div className="absolute left-6 top-6 z-50 lg:hidden">
        <Image
          src="/logo-lianet-sans-bg.png"
          alt="Lianet"
          width={128}
          height={42}
          className="h-12 w-auto"
          priority
          quality={90}
        />
      </div>

      {/* Halo organique (mobile) + parallax léger */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,214,204,0.22),rgba(255,255,255,0)_60%)] blur-2xl lg:hidden"
        style={{ y: haloY }}
      />

      {/* Layout principal : Sidebar à gauche + Contenu à droite */}
      <motion.div 
        className="relative z-10 ml-0 flex flex-1 flex-col pt-32 pb-20 lg:ml-20 lg:pt-24 lg:pb-0 lg:flex-row"
        style={{
          y: contentY,
        }}
      >
        {/* Zone Texte/CTA (Gauche) */}
        <div className="flex flex-1 flex-col justify-center px-8 py-16 lg:py-24 lg:pl-16 lg:pr-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Titre massif avec effet reveal */}
            <motion.h1
              className="text-[12vw] font-extrabold leading-[0.9] tracking-tighter text-[#1B365D] sm:text-7xl md:text-8xl lg:text-9xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Connecting the Future.
            </motion.h1>

            {/* Paragraphe avec effet reveal */}
            <motion.p
              className="max-w-xl text-base text-foreground sm:text-lg"
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

            {/* Bouton CTA avec effet reveal - Intégré dans le flux */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Button 
                className="w-full sm:w-auto lg:inline-flex"
                onClick={handleButtonClick}
              >
                Explorer les Solutions
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Zone Visuelle (désactivée) */}
        <div className="relative hidden flex-1 lg:block" />
      </motion.div>

      {/* Scroll indicator (bas-centre) */}
      <ScrollIndicator className="absolute left-1/2 bottom-16 z-20 -translate-x-1/2 lg:bottom-10" />

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

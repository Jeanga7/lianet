"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import FullMenu from "./FullMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileBackgroundPattern from "./MobileBackgroundPattern";
import ScrollIndicator from "./ScrollIndicator";
import ScrollProgressBar from "./ScrollProgressBar";
import OrganicBackground from "./OrganicBackground";

const HeroSection = () => {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const haloY = useTransform(scrollY, [0, 900], [0, -70]);

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-white grid-pattern lg:bg-transparent lg:grid-pattern-none">
      {/* Background image desktop */}
      <div 
        className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background-lianet-1.png')" }}
        aria-hidden="true"
      />
      <Sidebar onMenuClick={() => setIsFullMenuOpen(true)} />
      <Navigation />
      <FullMenu isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />

      {/* Scroll progress (ultra-fin) */}
      <ScrollProgressBar className="fixed left-0 top-0 z-[90] w-full" />

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

      {/* Menu button mobile épuré */}
      <MobileMenuButton onMenuClick={() => setIsFullMenuOpen(true)} />

      {/* Halo organique (mobile) + parallax léger */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,214,204,0.22),rgba(255,255,255,0)_60%)] blur-2xl lg:hidden"
        style={{ y: haloY }}
      />

      {/* Layout principal : Sidebar à gauche + Contenu à droite */}
      <div className="relative z-10 ml-0 flex flex-1 flex-col pt-32 pb-20 lg:ml-20 lg:pt-24 lg:pb-0 lg:flex-row">
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
              className="max-w-xl text-base text-[#333333] sm:text-lg"
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
              <Button className="w-full sm:w-auto lg:inline-flex">Explorer les Solutions</Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Zone Visuelle (désactivée) */}
        <div className="relative hidden flex-1 lg:block" />
      </div>

      {/* Scroll indicator (bas-centre) */}
      <ScrollIndicator className="absolute left-1/2 bottom-16 z-20 -translate-x-1/2 lg:bottom-10" />
    </div>
  );
};

export default HeroSection;

"use client";

import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MobileMenuButtonProps {
  onMenuClick: () => void;
}

const MobileMenuButton = ({ onMenuClick }: MobileMenuButtonProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll(); // Check initial state
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <>
      {/* Bouton fixe en haut à droite (quand pas de scroll) - Aligné avec le logo */}
      <motion.button
        type="button"
        onClick={onMenuClick}
        className="fixed right-6 top-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all lg:hidden"
        aria-label="Ouvrir le menu"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: scrolled ? 0 : 1,
          scale: scrolled ? 0.8 : 1,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="h-5 w-5 text-[#1B365D]" strokeWidth={1.5} />
      </motion.button>

      {/* Bouton flottant discret (quand scroll) - Aligné avec le logo */}
      <motion.button
        type="button"
        onClick={onMenuClick}
        className="fixed right-6 top-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-[#1B365D]/90 backdrop-blur-md shadow-lg transition-all lg:hidden"
        aria-label="Ouvrir le menu"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: scrolled ? 1 : 0,
          scale: scrolled ? 1 : 0.8,
          y: scrolled ? -10 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(27, 54, 93, 1)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
      </motion.button>
    </>
  );
};

export default MobileMenuButton;

"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <motion.header
      className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-background/95 backdrop-blur-sm px-6 py-4 lg:hidden border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo à gauche */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Image
          src="/logo-lianet-sans-bg.png"
          alt="Lianet Logo"
          width={128}
          height={42}
          className="h-12 w-auto"
          priority
          quality={75}
          style={{ imageRendering: "crisp-edges" }}
        />
      </motion.div>

      {/* Menu hamburger à droite */}
      <motion.button
        onClick={onMenuClick}
        className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-6 w-6 text-foreground" />
      </motion.button>
    </motion.header>
  );
};

export default MobileHeader;

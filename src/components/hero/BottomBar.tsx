"use client";

import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface BottomBarProps {
  onMenuClick: () => void;
}

const BottomBar = ({ onMenuClick }: BottomBarProps) => {
  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-[#1B365D]/10 bg-white/95 backdrop-blur-md lg:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3 px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        {/* CTA Button */}
        <div className="flex-1">
          <Button className="w-full">Explorer les Solutions</Button>
        </div>

        {/* Menu Button */}
        <motion.button
          type="button"
          onClick={onMenuClick}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B365D] text-white shadow-lg transition-colors hover:bg-[#1B365D]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6]/60 focus-visible:ring-offset-2"
          aria-label="Ouvrir le menu"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        >
          <Menu className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BottomBar;

"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  onMenuClick?: () => void;
}

const Sidebar = ({ onMenuClick }: SidebarProps) => {
  // Indicateurs de pagination verticaux (4 points)
  const indicators = Array.from({ length: 4 }, (_, i) => i);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.aside
      className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center bg-primary text-primary-foreground border-r border-primary/20 lg:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Menu hamburger en haut */}
      <motion.button
        type="button"
        onClick={onMenuClick}
        className="mt-8 flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-primary-foreground/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label="Menu"
      >
        <Menu className="h-6 w-6 text-primary-foreground" />
      </motion.button>

      {/* Indicateurs de pagination verticaux au centre */}
      <div className="mt-auto mb-auto flex flex-col items-center gap-4">
        {indicators.map((index) => (
          <motion.button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-current={index === activeIndex ? "true" : undefined}
            className="group relative flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: index === activeIndex ? 1 : 0.5,
              scale: index === activeIndex ? 1.2 : 1,
            }}
            whileHover={{ scale: index === activeIndex ? 1.2 : 1.1 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.1,
            }}
            aria-label={`Page ${index + 1}`}
          >
            {index === activeIndex && (
              <motion.span
                layoutId="sidebarActiveRing"
                className="absolute inset-0 rounded-full border border-secondary/80 bg-secondary/10"
                transition={{ type: "spring", stiffness: 520, damping: 34 }}
              />
            )}
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === activeIndex
                  ? "bg-secondary"
                  : "bg-gray-300 group-hover:bg-secondary"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;

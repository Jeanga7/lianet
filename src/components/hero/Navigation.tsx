"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = [
    { label: "Solutions", href: "#solutions" },
    { label: "Experts", href: "#experts" },
    { label: "À Propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed left-20 right-0 top-0 z-50 hidden lg:block">
      <motion.div
        className={`flex items-center gap-8 px-8 py-4 backdrop-blur-md bg-background/80 transition-all duration-300 ${
          scrolled ? "border-b border-gray-200" : "border-b border-gray-100"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Logo à l'extrême gauche */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/" aria-label="Accueil Lianet">
            <Image
              src="/logo-lianet-sans-bg.png"
              alt="Lianet Logo"
              width={128}
              height={42}
              className="h-10 w-auto"
              priority
              quality={75}
            />
          </Link>
        </motion.div>

        {/* Liens de navigation */}
        <ul className="flex items-center gap-8 ml-auto">
          {navItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Bouton recherche */}
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          aria-label="Rechercher"
        >
          <Search className="h-5 w-5 text-foreground" />
        </motion.button>
      </motion.div>
    </nav>
  );
};

export default Navigation;

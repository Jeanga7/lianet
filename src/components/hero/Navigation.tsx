"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { Magnetic } from "@/components/ui";

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
        initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Logo à l'extrême gauche */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -10, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/" aria-label="Accueil Lianet" className="group relative inline-flex items-center">
            <span className="pointer-events-none absolute -inset-2 rounded-full bg-[#40B4A6]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src="/logo-lianet-sans-bg.png"
              alt="Lianet Logo"
              width={128}
              height={42}
              className="relative h-10 w-auto"
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
              initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Magnetic className="inline-flex">
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center text-sm font-normal uppercase tracking-[0.08em] text-foreground transition-colors duration-300 hover:text-[#40B4A6]"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#40B4A6] opacity-0 shadow-[0_0_10px_rgba(64,180,166,0.6)] transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                  </span>
                </Link>
              </Magnetic>
            </motion.li>
          ))}
        </ul>

        {/* Bouton recherche */}
        <Magnetic className="inline-flex">
          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5 text-foreground" />
          </motion.button>
        </Magnetic>
      </motion.div>
    </nav>
  );
};

export default Navigation;

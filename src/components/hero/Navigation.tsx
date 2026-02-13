"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "@/components/ui";

const Navigation = () => {
  const [isCondensed, setIsCondensed] = useState(false);
  const [hasDepth, setHasDepth] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    const container = document.getElementById("main-scroll");
    const currentY = container ? container.scrollTop : window.scrollY;
    setIsCondensed((prev) => {
      if (prev) return currentY > 12;
      return currentY > 24;
    });
    setHasDepth(currentY > 220);
  }, []);

  useEffect(() => {
    const container = document.getElementById("main-scroll");
    let rafId: number | null = null;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    rafId = window.requestAnimationFrame(() => {
      handleScroll();
    });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
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
        className={`relative flex items-center px-8 transition-all duration-300 ${
          isCondensed
            ? "gap-6 py-2.5 border-b border-[#1B365D]/18"
            : "gap-8 py-4 border-b border-[#1B365D]/10"
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{
          opacity: 1,
          y: 0,
          backdropFilter: isCondensed ? "blur(14px)" : "blur(6px)",
          WebkitBackdropFilter: isCondensed ? "blur(14px)" : "blur(6px)",
          backgroundColor: isCondensed
            ? hasDepth
              ? "rgba(255,255,255,0.86)"
              : "rgba(255,255,255,0.82)"
            : hasDepth
            ? "rgba(255,255,255,0.78)"
            : "rgba(255,255,255,0.72)",
          boxShadow: isCondensed
            ? "0 10px 24px rgba(27,54,93,0.08)"
            : hasDepth
            ? "0 8px 18px rgba(27,54,93,0.05)"
            : "0 0 0 rgba(27,54,93,0)",
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.42,
          delay: prefersReducedMotion ? 0 : 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(143,214,204,0.45) 50%, transparent 100%)",
          }}
          animate={{ opacity: isCondensed || hasDepth ? 1 : 0.65 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
        />

        {/* Logo à l'extrême gauche */}
        <motion.div
          className="relative"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: isCondensed ? 0.92 : 1,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.36,
            delay: prefersReducedMotion ? 0 : 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link href="/" aria-label="Accueil Lianet" className="group relative inline-flex items-center">
            <span className="pointer-events-none absolute -inset-2 rounded-full bg-[#40B4A6]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src="/logo-lianet-sans-bg.png"
              alt="Lianet Logo"
              width={128}
              height={42}
              className={`relative w-auto transition-all duration-300 ${isCondensed ? "h-8" : "h-10"}`}
              priority
              quality={75}
            />
          </Link>
        </motion.div>

        {/* Liens de navigation */}
        <ul className={`ml-auto flex items-center transition-all duration-300 ${isCondensed ? "gap-6" : "gap-8"}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: isCondensed ? -1 : 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.36,
                delay: prefersReducedMotion ? 0 : 0.14 + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Magnetic className="inline-flex">
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center text-sm font-normal uppercase tracking-[0.06em] text-[#1B365D] transition-colors duration-300 hover:text-[#40B4A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6]/45 focus-visible:ring-offset-2 rounded-sm"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-[#40B4A6] opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                  </span>
                </Link>
              </Magnetic>
            </motion.li>
          ))}
        </ul>

        {/* Sélecteur de langue */}
        <Magnetic className="inline-flex">
          <motion.div
            className={`inline-flex items-center rounded-full border border-[#1B365D]/12 bg-white/72 p-1 transition-all duration-200 hover:border-[#40B4A6]/45 hover:bg-white/86 ${
              isCondensed ? "h-9" : "h-10"
            }`}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.84 }}
            animate={{ opacity: 1, scale: isCondensed ? 0.92 : 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.34,
              delay: prefersReducedMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              type="button"
              className="inline-flex min-w-9 items-center justify-center rounded-full bg-[#1B365D] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6]/45 focus-visible:ring-offset-2"
              aria-label="Langue française active"
            >
              FR
            </button>
            <button
              type="button"
              className="inline-flex min-w-9 items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1B365D]/65 transition-colors hover:text-[#40B4A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6]/45 focus-visible:ring-offset-2"
              aria-label="Passer en anglais"
            >
              EN
            </button>
          </motion.div>
        </Magnetic>
      </motion.div>
    </nav>
  );
};

export default Navigation;

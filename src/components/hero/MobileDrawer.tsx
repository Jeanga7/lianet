"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Linkedin, Twitter, Instagram } from "lucide-react";
import Button from "@/components/ui/Button";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const navItems = [
    { label: "Solutions", href: "#solutions" },
    { label: "Experts", href: "#experts" },
    { label: "À Propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/lianet", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/lianet", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/lianet", label: "Instagram" },
  ];

  // Empêcher le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            className="fixed inset-0 z-[55] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-[60] h-full w-80 bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
            <div className="flex h-full flex-col">
              {/* Header avec logo et bouton fermer */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
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
                <button
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                  aria-label="Fermer le menu"
                >
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.1,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-2xl font-medium text-[#1B365D] transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button */}
              <div className="border-t border-border px-6 py-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Button className="w-full" onClick={onClose}>
                    Explorer les Solutions
                  </Button>
                </motion.div>
              </div>

              {/* Footer avec icônes sociales et slogan */}
              <div className="border-t border-border px-6 py-6">
                {/* Icônes sociales */}
                <motion.div
                  className="flex items-center justify-center gap-6 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 transition-colors hover:text-primary"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    );
                  })}
                </motion.div>

                {/* Slogan */}
                <motion.p
                  className="text-center text-sm text-[#333333] font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  Connecting the Future
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;

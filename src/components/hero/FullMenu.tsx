"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { X, Linkedin, Twitter, Instagram, Mail, MapPin, ChevronDown } from "lucide-react";
import { HeroSecondaryButton } from "@/components/ui";

interface FullMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { 
    opacity: 0, 
    pointerEvents: "none",
    transition: { duration: 0.04, ease: [0.4, 0, 1, 1] as const },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    pointerEvents: "none",
    transition: { duration: 0.04, ease: [0.4, 0, 1, 1] as const },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] as const },
  },
};

const poleTitleVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] as const },
  },
};

const poleDescriptionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] as const },
  },
};

export default function FullMenu({ isOpen, onClose }: FullMenuProps) {
  type MobileSection = "poles" | "resources" | "contact";
  const [hoveredPole, setHoveredPole] = useState<"talent" | "strategy" | "lab" | null>(null);
  const [expandedMobilePole, setExpandedMobilePole] = useState<"talent" | "strategy" | "lab" | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<MobileSection | null>(null);
  const shouldReduceMotion = useReducedMotion();

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

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const poles = [
    {
      id: "talent" as const,
      title: "Talent Solutions",
      description:
        "Nous ne nous contentons pas de trouver des profils ; nous bâtissons des équipes de choc. Accédez au top 3% des experts digitaux africains pour propulser vos développements techniques et vos designs d'interface.",
      tags: "Staff Augmentation • Recrutement Expert • Agilité",
    },
    {
      id: "strategy" as const,
      title: "Digital Strategy",
      description:
        "Le digital n'est pas une option, c'est votre moteur de croissance. Nos consultants dessinent la feuille de route de votre transformation, de l'audit initial au déploiement de solutions scalables et sécurisées.",
      tags: "Conseil • Roadmap • ROI Mesurable",
    },
    {
      id: "lab" as const,
      title: "Innovation Lab",
      description:
        "Le laboratoire où les idées deviennent des produits. Nous incubons des projets disruptifs et explorons les technologies émergentes (IA, Web3, IoT) pour maintenir votre entreprise à l'avant-garde du marché.",
      tags: "R&D • Prototypage rapide • Futurisme",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={backdropVariants}
        >
          {/* Mobile version - Light Glass aligned with desktop */}
          <div className="absolute inset-0 h-[100dvh] overflow-hidden bg-background/95 lg:hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/12 via-white/70 to-accent/10" />
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
            <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-[#40B4A6]/35" />

            <motion.div
              variants={panelVariants}
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal"
              className="relative flex h-full flex-col overflow-hidden"
            >
              <div className="flex shrink-0 items-center justify-between px-6 pt-8 pb-4">
                <p className="pl-4 text-[11px] font-semibold tracking-[0.22em] text-[#1B365D]/55 uppercase">
                  Lianet Ecosystem
                </p>
                <motion.button
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B365D]/15 bg-white/75 text-[#1B365D] backdrop-blur-md transition-colors"
                  aria-label="Fermer le menu"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide pb-[max(120px,env(safe-area-inset-bottom))]">
                <motion.div variants={panelVariants} className="px-6">
                  {/* Navigation primaire */}
                  <motion.div variants={poleTitleVariants} className="pb-5 border-b border-[#1B365D]/10">
                    <ul className="space-y-1">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-center text-[1.08rem] font-medium uppercase leading-tight tracking-[0.08em] text-[#1B365D] transition-all active:scale-[0.98] active:bg-[#1B365D]/5"
                          >
                            <span className="relative">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* CTA principal au-dessus de la ligne de flottaison */}
                  <motion.div variants={poleTitleVariants} className="pt-5 pb-7 pl-4 border-b border-[#1B365D]/10">
                    <HeroSecondaryButton
                      onClick={onClose}
                      label="Start a Project"
                      size="compact"
                      className="w-full sm:w-full bg-[#40B4A6]/12 hover:bg-[#40B4A6]/20 backdrop-blur-md border border-[#40B4A6]/30"
                    />
                  </motion.div>

                  {/* Section Pôles repliée */}
                  <motion.div variants={poleTitleVariants} className="border-b border-[#1B365D]/10">
                    <motion.button
                      onClick={() =>
                        setExpandedMobileSection(expandedMobileSection === "poles" ? null : "poles")
                      }
                      className="flex min-h-11 w-full items-center justify-between py-4 pl-4 pr-2 text-left"
                      whileTap={{ scale: 0.99 }}
                      aria-expanded={expandedMobileSection === "poles"}
                      aria-controls="mobile-menu-poles"
                    >
                      <span className="text-xs font-semibold tracking-[0.2em] text-[#1B365D]/55 uppercase">
                        Pôles
                      </span>
                      <motion.div
                        animate={{ rotate: expandedMobileSection === "poles" ? 180 : 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown className="h-5 w-5 text-[#1B365D]/60" strokeWidth={1.5} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {expandedMobileSection === "poles" && (
                        <motion.div
                          id="mobile-menu-poles"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.26,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5">
                            {poles.map((pole) => {
                              const isExpanded = expandedMobilePole === pole.id;
                              return (
                                <div key={pole.id} className="border-t border-[#1B365D]/8 first:border-t-0">
                                  <motion.button
                                    onClick={() => setExpandedMobilePole(isExpanded ? null : pole.id)}
                                    className="flex min-h-11 w-full items-center justify-between px-4 py-4 text-left"
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <h3 className="text-[1.22rem] font-semibold leading-snug tracking-[-0.01em] text-[#1B365D]">
                                      {pole.title}
                                    </h3>
                                    <motion.div
                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                      transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                                      className="ml-4 shrink-0"
                                    >
                                      <ChevronDown className="h-5 w-5 text-[#1B365D]/55" strokeWidth={1.5} />
                                    </motion.div>
                                  </motion.button>
                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-4 pb-5">
                                          <p className="text-[0.98rem] leading-relaxed text-[#1B365D]/80">
                                            {pole.description}
                                          </p>
                                          <p className="mt-3 text-sm font-medium tracking-wide text-[#40B4A6]">
                                            {pole.tags}
                                          </p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Section Ressources repliée */}
                  <motion.div variants={poleTitleVariants} className="border-b border-[#1B365D]/10">
                    <motion.button
                      onClick={() =>
                        setExpandedMobileSection(
                          expandedMobileSection === "resources" ? null : "resources"
                        )
                      }
                      className="flex min-h-11 w-full items-center justify-between py-4 pl-4 pr-2 text-left"
                      whileTap={{ scale: 0.99 }}
                      aria-expanded={expandedMobileSection === "resources"}
                      aria-controls="mobile-menu-resources"
                    >
                      <span className="text-xs font-semibold tracking-[0.2em] text-[#1B365D]/55 uppercase">
                        Ressources
                      </span>
                      <motion.div
                        animate={{ rotate: expandedMobileSection === "resources" ? 180 : 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown className="h-5 w-5 text-[#1B365D]/60" strokeWidth={1.5} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {expandedMobileSection === "resources" && (
                        <motion.div
                          id="mobile-menu-resources"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-1 px-4 pb-5">
                            <li>
                              <Link
                                href="#insights"
                                onClick={onClose}
                                className="group flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold tracking-tight text-[#1B365D] active:scale-[0.98] active:bg-[#1B365D]/5"
                              >
                                Blog &amp; Insights
                                <span className="ml-auto text-[#40B4A6] opacity-0 transition-opacity group-active:opacity-100">→</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#careers"
                                onClick={onClose}
                                className="group flex min-h-11 items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold tracking-tight text-[#1B365D] active:scale-[0.98] active:bg-[#1B365D]/5"
                              >
                                Carrières <span className="text-[#1B365D]/55 text-sm font-normal">(Join the Liane)</span>
                                <span className="ml-auto text-[#40B4A6] opacity-0 transition-opacity group-active:opacity-100">→</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#case-studies"
                                onClick={onClose}
                                className="group flex min-h-11 items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold tracking-tight text-[#1B365D] active:scale-[0.98] active:bg-[#1B365D]/5"
                              >
                                Études de cas <span className="text-[#1B365D]/55 text-sm font-normal">(Success Stories)</span>
                                <span className="ml-auto text-[#40B4A6] opacity-0 transition-opacity group-active:opacity-100">→</span>
                              </Link>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Section Contact repliée */}
                  <motion.div variants={poleTitleVariants} className="border-b border-[#1B365D]/10">
                    <motion.button
                      onClick={() =>
                        setExpandedMobileSection(expandedMobileSection === "contact" ? null : "contact")
                      }
                      className="flex min-h-11 w-full items-center justify-between py-4 pl-4 pr-2 text-left"
                      whileTap={{ scale: 0.99 }}
                      aria-expanded={expandedMobileSection === "contact"}
                      aria-controls="mobile-menu-contact"
                    >
                      <span className="text-xs font-semibold tracking-[0.2em] text-[#1B365D]/55 uppercase">
                        Contact &amp; Localisation
                      </span>
                      <motion.div
                        animate={{ rotate: expandedMobileSection === "contact" ? 180 : 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown className="h-5 w-5 text-[#1B365D]/60" strokeWidth={1.5} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {expandedMobileSection === "contact" && (
                        <motion.div
                          id="mobile-menu-contact"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 px-4 pb-5">
                            <div className="rounded-xl border border-[#1B365D]/12 bg-white/70 p-4 backdrop-blur-sm">
                              <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-[#40B4A6] shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-[#1B365D]">Dakar HQ</p>
                                  <p className="mt-1 text-sm text-[#1B365D]/70">Dakar, Sénégal</p>
                                  <a
                                    href="https://www.google.com/maps?q=Lianet+Dakar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex text-sm font-medium text-[#1B365D] underline-offset-4 hover:underline"
                                  >
                                    Voir sur la carte
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#1B365D]/12 bg-white/70 p-4 backdrop-blur-sm">
                              <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-[#40B4A6] shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-[#1B365D]">Email</p>
                                  <a
                                    href="mailto:contact@lianet.africa"
                                    className="mt-1 inline-flex text-sm font-medium text-[#1B365D]/80 underline-offset-4 hover:text-[#40B4A6] hover:underline"
                                  >
                                    contact@lianet.africa
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Social compact */}
                  <motion.div variants={poleTitleVariants} className="py-8 pl-4">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#1B365D]/55 uppercase mb-4">
                      Social
                    </p>
                    <div className="flex items-center gap-3">
                      {socialLinks.map((s) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B365D]/15 bg-white/75 text-[#1B365D]/80 transition-colors hover:border-[#40B4A6]/45 hover:text-[#40B4A6]"
                            aria-label={s.label}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.p
                    variants={poleDescriptionVariants}
                    className="mb-8 max-w-[92%] pl-4 italic text-[#1B365D]/62 pb-8"
                  >
                    Parce que l&apos;avenir de l&apos;Afrique s&apos;écrit en lignes de code et en
                    visions audacieuses, Lianet tisse la liane entre les ambitions des
                    leaders et l&apos;excellence des talents.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Desktop version */}
          <div className="hidden lg:block">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
              className="absolute inset-0 bg-foreground/10 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

            {/* Base wash (blanc) */}
            <div className="absolute inset-0 bg-background/92" />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10" />
            
            {/* Subtle grid pattern for structure */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Organic brand shape (réagit au hover Innovation Lab) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-1/2 h-[780px] w-[780px] -translate-y-1/2 bg-gradient-to-br from-secondary/70 to-accent/60 opacity-80"
            animate={{
              borderRadius: hoveredPole === "lab"
                ? "45% 55% 60% 40% / 45% 35% 65% 55%"
                : "60% 40% 30% 70% / 60% 30% 70% 40%",
              rotate: hoveredPole === "lab" ? -8 : 0,
              scale: hoveredPole === "lab" ? 1.03 : 1,
              opacity: hoveredPole === "lab" ? 0.55 : 0.45,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              filter: "blur(0px)",
            }}
          />

            {/* Content desktop */}
          <motion.div
            variants={panelVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
              className="relative mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden px-6 py-6 md:px-8 lg:px-10 lg:py-10"
          >
            {/* Top bar */}
            <div className="flex items-start justify-end shrink-0">
              <button
                onClick={onClose}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1B365D]/20 bg-white/80 text-[#333333] transition-colors hover:bg-[#1B365D]/5 hover:border-[#1B365D]/30"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable content with hidden scrollbar */}
            <div className="mt-6 flex-1 overflow-y-auto overscroll-contain pb-20 scrollbar-hide lg:mt-10 lg:pb-10">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
              {/* Col 1: Vision */}
              <motion.aside variants={itemVariants} className="col-span-12 lg:col-span-3">
                <div className="relative flex h-full flex-col">
                  <div className="hidden select-none text-[#1B365D]/80 lg:block">
                    <div
                      className="text-sm font-semibold tracking-[0.32em]"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      LIANET ECOSYSTEM
                    </div>
                  </div>

                  <div className="mt-auto">
                    <p className="text-xs font-semibold tracking-wide text-[#333333]/60">
                      Social
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      {socialLinks.map((s) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-[#333333]/80 transition-colors hover:border-[#1B365D]/30 hover:bg-muted hover:text-[#333333]"
                            aria-label={s.label}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* Col 2: Pôles */}
              <motion.section variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
                <p className="text-xs font-semibold tracking-wide text-[#333333]/60">
                  Pôles
                </p>
                <div className="mt-6 space-y-12">
                  <div
                    onMouseEnter={() => setHoveredPole("talent")}
                    onMouseLeave={() => setHoveredPole(null)}
                  >
                    <h3 className="text-3xl font-extrabold leading-none tracking-tighter text-[#1B365D]">
                      Talent Solutions
                    </h3>
                    <AnimatePresence initial={false}>
                      {hoveredPole === "talent" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-4 rounded-xl bg-[#1B365D]/80 p-4 shadow-sm"
                        >
                          <p className="text-lg font-light text-[#8FD6CC]">
                            Nous ne nous contentons pas de trouver des profils ; nous
                            bâtissons des équipes de choc. Accédez au top 3% des
                            experts digitaux africains pour propulser vos
                            développements techniques et vos designs d&apos;interface.
                          </p>
                          <p className="mt-3 text-sm font-medium tracking-wide text-[#8FD6CC]/90">
                            Staff Augmentation • Recrutement Expert • Agilité
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    onMouseEnter={() => setHoveredPole("strategy")}
                    onMouseLeave={() => setHoveredPole(null)}
                  >
                    <h3 className="text-3xl font-extrabold leading-none tracking-tighter text-[#1B365D]">
                      Digital Strategy
                    </h3>
                    <AnimatePresence initial={false}>
                      {hoveredPole === "strategy" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-4 rounded-xl bg-[#1B365D]/80 p-4 shadow-sm"
                        >
                          <p className="text-lg font-light text-[#8FD6CC]">
                            Le digital n&apos;est pas une option, c&apos;est votre moteur
                            de croissance. Nos consultants dessinent la feuille de
                            route de votre transformation, de l&apos;audit initial au
                            déploiement de solutions scalables et sécurisées.
                          </p>
                          <p className="mt-3 text-sm font-medium tracking-wide text-[#8FD6CC]/90">
                            Conseil • Roadmap • ROI Mesurable
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    onMouseEnter={() => setHoveredPole("lab")}
                    onMouseLeave={() => setHoveredPole(null)}
                  >
                    <h3 className="text-3xl font-extrabold leading-none tracking-tighter text-[#1B365D] transition-colors hover:text-[#40B4A6]">
                      Innovation Lab
                    </h3>
                    <AnimatePresence initial={false}>
                      {hoveredPole === "lab" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-4 rounded-xl bg-[#1B365D]/80 p-4 shadow-sm"
                        >
                          <p className="text-lg font-light text-[#8FD6CC]">
                            Le laboratoire où les idées deviennent des produits. Nous
                            incubons des projets disruptifs et explorons les
                            technologies émergentes (IA, Web3, IoT) pour maintenir
                            votre entreprise à l&apos;avant-garde du marché.
                          </p>
                          <p className="mt-3 text-sm font-medium tracking-wide text-[#8FD6CC]/90">
                            R&amp;D • Prototypage rapide • Futurisme
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.section>

              {/* Col 3: Ressources */}
              <motion.section variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-3">
                <p className="text-xs font-semibold tracking-wide text-[#333333]/60">
                  Ressources
                </p>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#insights"
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-[#333333] transition-colors hover:text-[#40B4A6]"
                    >
                      Blog &amp; Insights
                      <span className="translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#careers"
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-[#333333] transition-colors hover:text-[#40B4A6]"
                    >
                      Carrières <span className="text-[#333333]/60">(Join the Liane)</span>
                      <span className="translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                        →
                          </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#case-studies"
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-[#333333] transition-colors hover:text-[#40B4A6]"
                    >
                      Études de cas <span className="text-[#333333]/60">(Success Stories)</span>
                      <span className="translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                  </li>
                  </ul>
              </motion.section>

              {/* Col 4: Contact & localisation */}
              <motion.aside variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-3">
                <p className="text-xs font-semibold tracking-wide text-[#333333]/60">
                  Contact &amp; Localisation
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-border bg-background/70 p-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-[#40B4A6]" />
                      <div>
                        <p className="text-sm font-semibold text-[#333333]">Dakar HQ</p>
                        <p className="mt-1 text-sm text-[#333333]/70">
                          Dakar, Sénégal
                        </p>
                        <a
                          href="https://www.google.com/maps?q=Lianet+Dakar"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex text-sm font-medium text-[#1B365D] underline-offset-4 hover:underline"
                        >
                          Voir sur la carte
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/70 p-5">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-[#40B4A6]" />
                      <div>
                        <p className="text-sm font-semibold text-[#333333]">Email</p>
                        <a
                          href="mailto:contact@lianet.africa"
                          className="mt-1 inline-flex text-sm font-medium text-[#333333]/80 underline-offset-4 hover:text-[#40B4A6] hover:underline"
                        >
                          contact@lianet.africa
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <HeroSecondaryButton
                      onClick={onClose}
                      label="Start a Project"
                      size="compact"
                      className="w-full sm:w-full bg-[#40B4A6]/15 hover:bg-[#40B4A6]/25 backdrop-blur-md border border-[#40B4A6]/25"
                    />
                  </div>
                </div>
              </motion.aside>
              </div>
            </div>

            {/* Bottom tagline */}
            <motion.div variants={itemVariants} className="mt-10">
              <p className="text-sm font-medium tracking-wide text-foreground/70">
                Propelling African Ambitions into the Digital Era.
              </p>
            </motion.div>

            {/* Manifeste */}
            <motion.p
              className="mt-6 max-w-5xl italic text-[#8FD6CC] opacity-80"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
            >
              Parce que l&apos;avenir de l&apos;Afrique s&apos;écrit en lignes de code et en
              visions audacieuses, Lianet tisse la liane entre les ambitions des
              leaders et l&apos;excellence des talents. Nous ne construisons pas
              seulement des solutions ; nous connectons les bâtisseurs du monde
              de demain.
            </motion.p>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

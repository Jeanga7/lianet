"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Linkedin, Twitter, Instagram, Mail, MapPin, ChevronDown } from "lucide-react";
import { HeroSecondaryButton } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { useI18n } from "@/lib/useI18n";

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
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: t("navigation.solutions"), href: "#solutions" },
    { label: t("navigation.experts"), href: "#experts" },
    { label: t("navigation.about"), href: "#about" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/lianet", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/lianet", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/lianet", label: "Instagram" },
  ];

  const switchLocale = (targetLocale: "fr" | "en") => {
    if (!pathname || locale === targetLocale) return;
    const targetPath = localizePathname(pathname, targetLocale);
    const query =
      typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
    const hash =
      typeof window !== "undefined" && window.location.hash ? window.location.hash : "";
    router.push(`${targetPath}${query ? `?${query}` : ""}${hash}`);
  };

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
      title: t("fullMenu.poles.talent.title"),
      description: t("fullMenu.poles.talent.description"),
      tags: t("fullMenu.poles.talent.tags"),
    },
    {
      id: "strategy" as const,
      title: t("fullMenu.poles.strategy.title"),
      description: t("fullMenu.poles.strategy.description"),
      tags: t("fullMenu.poles.strategy.tags"),
    },
    {
      id: "lab" as const,
      title: t("fullMenu.poles.lab.title"),
      description: t("fullMenu.poles.lab.description"),
      tags: t("fullMenu.poles.lab.tags"),
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
                  {t("fullMenu.ecosystem")}
                </p>
                <motion.button
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B365D]/15 bg-white/75 text-[#1B365D] backdrop-blur-md transition-colors"
                  aria-label={t("fullMenu.close")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Sélecteur langue mobile (dans le menu, pour éviter d'encombrer le header fixe) */}
              <motion.div variants={poleTitleVariants} className="px-6 pb-4">
                <div className="flex justify-end">
                  <div className="inline-flex items-center rounded-full border border-[#1B365D]/15 bg-white/78 p-1 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => switchLocale("fr")}
                      className={`inline-flex min-w-9 items-center justify-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] transition-colors ${
                        locale === "fr" ? "bg-[#1B365D] font-semibold text-white" : "font-medium text-[#1B365D]/65 hover:text-[#40B4A6]"
                      }`}
                      aria-label={locale === "fr" ? t("fullMenu.langActiveFr") : t("fullMenu.langSwitchFr")}
                      aria-pressed={locale === "fr"}
                    >
                      FR
                    </button>
                    <button
                      type="button"
                      onClick={() => switchLocale("en")}
                      className={`inline-flex min-w-9 items-center justify-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors ${
                        locale === "en" ? "bg-[#1B365D] text-white" : "text-[#1B365D]/65 hover:text-[#40B4A6]"
                      }`}
                      aria-label={locale === "en" ? t("fullMenu.langActiveEn") : t("fullMenu.langSwitchEn")}
                      aria-pressed={locale === "en"}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </motion.div>

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
                      label={t("fullMenu.startProject")}
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
                        {t("fullMenu.sections.poles")}
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
                        {t("fullMenu.sections.resources")}
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
                                {t("fullMenu.resources.insights")}
                                <span className="ml-auto text-[#40B4A6] opacity-0 transition-opacity group-active:opacity-100">→</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#careers"
                                onClick={onClose}
                                className="group flex min-h-11 items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold tracking-tight text-[#1B365D] active:scale-[0.98] active:bg-[#1B365D]/5"
                              >
                                {t("fullMenu.resources.careers")} <span className="text-[#1B365D]/55 text-sm font-normal">{t("fullMenu.resources.careersSuffix")}</span>
                                <span className="ml-auto text-[#40B4A6] opacity-0 transition-opacity group-active:opacity-100">→</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#case-studies"
                                onClick={onClose}
                                className="group flex min-h-11 items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold tracking-tight text-[#1B365D] active:scale-[0.98] active:bg-[#1B365D]/5"
                              >
                                {t("fullMenu.resources.caseStudies")} <span className="text-[#1B365D]/55 text-sm font-normal">{t("fullMenu.resources.caseStudiesSuffix")}</span>
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
                        {t("fullMenu.sections.contact")}
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
                                  <p className="text-sm font-semibold text-[#1B365D]">{t("fullMenu.contact.dakar")}</p>
                                  <p className="mt-1 text-sm text-[#1B365D]/70">{t("fullMenu.contact.city")}</p>
                                  <a
                                    href="https://www.google.com/maps?q=Lianet+Dakar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex text-sm font-medium text-[#1B365D] underline-offset-4 hover:underline"
                                  >
                                    {t("fullMenu.contact.map")}
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#1B365D]/12 bg-white/70 p-4 backdrop-blur-sm">
                              <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-[#40B4A6] shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-[#1B365D]">{t("fullMenu.contact.email")}</p>
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
                      {t("fullMenu.sections.social")}
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
                    {t("fullMenu.manifesto")}
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
              className="absolute inset-0 bg-[#1B365D]/10 backdrop-blur-md"
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1B365D]/18 bg-white/80 text-[#1B365D] transition-all duration-200 hover:bg-[#1B365D]/6 hover:border-[#40B4A6]/45 hover:text-[#40B4A6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40B4A6]/45 focus-visible:ring-offset-2"
                aria-label={t("fullMenu.close")}
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

                  <div className="mt-auto pt-44">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1B365D]/60">
                  {t("fullMenu.sections.social")}
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
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B365D]/12 bg-white/72 text-[#1B365D]/80 transition-all duration-200 hover:border-[#40B4A6]/45 hover:bg-white/86 hover:text-[#40B4A6] hover:shadow-[0_8px_20px_rgba(64,180,166,0.16)]"
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
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1B365D]/60">
                  {t("fullMenu.sections.poles")}
                </p>
                <div className="mt-6 space-y-12">
                  <div
                    onMouseEnter={() => setHoveredPole("talent")}
                    onMouseLeave={() => setHoveredPole(null)}
                  >
                    <h3 className="text-3xl font-bold leading-none tracking-tight text-[#1B365D]">
                      {t("fullMenu.poles.talent.title")}
                    </h3>
                    <AnimatePresence initial={false}>
                      {hoveredPole === "talent" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-4 rounded-xl border border-[#40B4A6]/28 bg-white/88 p-4 shadow-[0_12px_28px_rgba(64,180,166,0.14)] backdrop-blur-sm"
                        >
                          <p className="text-lg font-normal leading-relaxed text-[#1B365D]/90">
                            {t("fullMenu.poles.talent.description")}
                          </p>
                          <p className="mt-3 text-sm font-semibold tracking-wide text-[#40B4A6]">
                            {t("fullMenu.poles.talent.tags")}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    onMouseEnter={() => setHoveredPole("strategy")}
                    onMouseLeave={() => setHoveredPole(null)}
                  >
                    <h3 className="text-3xl font-bold leading-none tracking-tight text-[#1B365D]">
                      {t("fullMenu.poles.strategy.title")}
                    </h3>
                    <AnimatePresence initial={false}>
                      {hoveredPole === "strategy" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-4 rounded-xl border border-[#40B4A6]/28 bg-white/88 p-4 shadow-[0_12px_28px_rgba(64,180,166,0.14)] backdrop-blur-sm"
                        >
                          <p className="text-lg font-normal leading-relaxed text-[#1B365D]/90">
                            {t("fullMenu.poles.strategy.description")}
                          </p>
                          <p className="mt-3 text-sm font-semibold tracking-wide text-[#40B4A6]">
                            {t("fullMenu.poles.strategy.tags")}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    onMouseEnter={() => setHoveredPole("lab")}
                    onMouseLeave={() => setHoveredPole(null)}
                  >
                    <h3 className="text-3xl font-bold leading-none tracking-tight text-[#1B365D] transition-colors hover:text-[#40B4A6]">
                      {t("fullMenu.poles.lab.title")}
                    </h3>
                    <AnimatePresence initial={false}>
                      {hoveredPole === "lab" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-4 rounded-xl border border-[#40B4A6]/28 bg-white/88 p-4 shadow-[0_12px_28px_rgba(64,180,166,0.14)] backdrop-blur-sm"
                        >
                          <p className="text-lg font-normal leading-relaxed text-[#1B365D]/90">
                            {t("fullMenu.poles.lab.description")}
                          </p>
                          <p className="mt-3 text-sm font-semibold tracking-wide text-[#40B4A6]">
                            {t("fullMenu.poles.lab.tags")}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.section>

              {/* Col 3: Ressources */}
              <motion.section variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1B365D]/60">
                  {t("fullMenu.sections.resources")}
                </p>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#insights"
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg font-medium uppercase tracking-[0.06em] text-[#1B365D] transition-all duration-200 hover:text-[#40B4A6]"
                    >
                      {t("fullMenu.resources.insights")}
                      <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#careers"
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg font-medium uppercase tracking-[0.06em] text-[#1B365D] transition-all duration-200 hover:text-[#40B4A6]"
                    >
                      {t("fullMenu.resources.careers")} <span className="text-[#1B365D]/60 normal-case tracking-normal">{t("fullMenu.resources.careersSuffix")}</span>
                      <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                          </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#case-studies"
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg font-medium uppercase tracking-[0.06em] text-[#1B365D] transition-all duration-200 hover:text-[#40B4A6]"
                    >
                      {t("fullMenu.resources.caseStudies")} <span className="text-[#1B365D]/60 normal-case tracking-normal">{t("fullMenu.resources.caseStudiesSuffix")}</span>
                      <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                  </li>
                  </ul>
              </motion.section>

              {/* Col 4: Contact & localisation */}
              <motion.aside variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1B365D]/60">
                  {t("fullMenu.sections.contact")}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-[#1B365D]/12 bg-white/72 p-5 transition-all duration-200 hover:border-[#40B4A6]/35 hover:bg-white/84">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-[#40B4A6]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1B365D]">{t("fullMenu.contact.dakar")}</p>
                        <p className="mt-1 text-sm text-[#1B365D]/70">
                          {t("fullMenu.contact.city")}
                        </p>
                        <a
                          href="https://www.google.com/maps?q=Lianet+Dakar"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex text-sm font-medium text-[#1B365D] underline-offset-4 hover:underline"
                        >
                          {t("fullMenu.contact.map")}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#1B365D]/12 bg-white/72 p-5 transition-all duration-200 hover:border-[#40B4A6]/35 hover:bg-white/84">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-[#40B4A6]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1B365D]">{t("fullMenu.contact.email")}</p>
                        <a
                          href="mailto:contact@lianet.africa"
                          className="mt-1 inline-flex text-sm font-medium text-[#1B365D]/80 underline-offset-4 hover:text-[#40B4A6] hover:underline"
                        >
                          contact@lianet.africa
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <HeroSecondaryButton
                      onClick={onClose}
                      label={t("fullMenu.startProject")}
                      size="compact"
                      className="w-full sm:w-full bg-[#40B4A6]/15 hover:bg-[#40B4A6]/25 backdrop-blur-md border border-[#40B4A6]/25"
                    />
                  </div>
                </div>
              </motion.aside>
              </div>
            </div>

            {/* Bottom tagline */}
            <motion.div variants={itemVariants} className="mt-24">
              <p className="text-lg font-medium uppercase tracking-[0.06em] text-[#1B365D]">
                {t("fullMenu.tagline")}
              </p>
            </motion.div>

            {/* Manifeste */}
            <motion.p
              className="mt-12 max-w-5xl italic text-[#1B365D]/88"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
            >
              {t("fullMenu.manifesto")}
            </motion.p>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

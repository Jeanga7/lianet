"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com", label: "X (Twitter)" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function FooterSection() {
  const { locale, t } = useI18n();
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const logoX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const logoY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  // Parallax for the watermark (inverse or different scale for depth)
  const watermarkX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const watermarkY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={localizePathname(href, locale)}
      className="group relative inline-block text-base font-light text-[#F8FAFC]/70 transition-colors duration-300 hover:text-white"
      style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#40B4A6] transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  const AccordionColumn = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Always open on desktop, toggleable on mobile
    const showContent = !isMobile || isOpen;

    return (
      <div className="flex flex-col border-b border-white/5 pb-6 lg:border-none lg:pb-0">
        <button
          onClick={() => isMobile && setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-2 text-left lg:pointer-events-none lg:mb-8 lg:block lg:p-0"
          aria-expanded={isOpen}
        >
          <h3
            className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {title}
          </h3>
          {isMobile && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#40B4A6]"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          )}
        </button>

        <AnimatePresence initial={false}>
          {showContent && (
            <motion.nav
              initial={isMobile ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              exit={isMobile ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-4 overflow-hidden pt-4 lg:pt-0"
            >
              {children}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <footer
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 flex lg:min-h-screen flex-col lg:justify-between overflow-hidden bg-[#1B365D] pb-12 pt-16 text-[#F8FAFC] lg:pt-24 xl:pt-32"
      aria-label={t("footer.title")}
    >
      {/* Watermark Logo Background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ x: watermarkX, y: watermarkY }}
      >
        <span className="text-[25vw] font-black leading-none tracking-tighter text-white/[0.025] lg:text-[22vw]">
          LIANET
        </span>
      </motion.div>

      {/* Background Decor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(64,180,166,0.1),transparent_40%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] grow flex-col justify-between px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* TOP: Footer Hero Heading */}
        <div className="mb-12 pt-6 lg:mb-32 lg:pt-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[15ch] text-[clamp(2.6rem,11vw,6.5rem)] font-black leading-[1.04] tracking-tight text-[#F8FAFC] text-center lg:text-left mx-auto lg:mx-0"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("footer.heroLine1")} <br />
            <span className="text-[#40B4A6]">{t("footer.heroLine2")}</span>
          </motion.h2>
        </div>

        {/* CENTER: Main Grid */}
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8 xl:gap-16">

          {/* Column 1: Identity (Spans 2) */}
          <div className="flex flex-col items-center lg:items-start gap-8 lg:col-span-2 lg:pr-12 text-center lg:text-left">
            {/* Logo Parallax */}
            <Link href={localizePathname(appRoutes.home, locale)} className="relative block">
              <motion.div style={{ x: logoX, y: logoY }}>
                <span
                  className="text-4xl font-black tracking-tighter text-[#F8FAFC] lg:text-5xl"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                  LIANET<span className="text-[#40B4A6]">.</span>
                </span>
              </motion.div>
            </Link>

            <p
              className="max-w-[42ch] text-base font-light leading-relaxed text-[#F8FAFC]/80 lg:text-lg"
              style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
            >
              {t("footer.brandStatement")}
            </p>

            <div className="flex gap-4 mt-2 justify-center lg:justify-start">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:border-[#40B4A6] hover:bg-[#40B4A6] hover:text-white"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Expertise */}
          <AccordionColumn title={t("footer.columns.expertise") || "EXPERTISE"}>
            <FooterLink href={appRoutes.solutionsTalent}>
              {t("footer.links.talent")}
            </FooterLink>
            <FooterLink href={appRoutes.solutionsStrategy}>
              {t("footer.links.strategy")}
            </FooterLink>
            <FooterLink href={appRoutes.solutionsLab}>
              {t("footer.links.lab")}
            </FooterLink>
            <FooterLink href={appRoutes.caseStudies}>
              {t("footer.links.stories")}
            </FooterLink>
          </AccordionColumn>

          {/* Column 3: Société & Légal */}
          <AccordionColumn title={t("footer.columns.company") || "SOCIÉTÉ"}>
            <FooterLink href={appRoutes.about}>
              {t("footer.links.about")}
            </FooterLink>
            <FooterLink href={appRoutes.careers}>
              {t("footer.links.careers")}
            </FooterLink>
            <FooterLink href={appRoutes.contact}>
              {t("footer.links.contact")}
            </FooterLink>
            <div className="pt-2">
              <a href="mailto:contact@lianet.com" className="text-sm font-medium text-[#F8FAFC] hover:text-[#40B4A6] transition-colors">
                contact@lianet.com
              </a>
            </div>
          </AccordionColumn>

        </div>

        {/* BOTTOM: Bottom Bar */}
        <div className="mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-white/60">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 md:justify-start">
            <span>&copy; {currentYear} Lianet. {t("footer.rights")}</span>
            <div className="hidden md:block w-[1px] h-3 bg-white/20 self-center" />
            <Link href={localizePathname("/legal", locale)} className="hover:text-white transition-colors">
              {t("footer.links.legalNotices")}
            </Link>
            <Link href={localizePathname("/privacy", locale)} className="hover:text-white transition-colors">
              {t("footer.links.privacy")}
            </Link>
            <Link href={localizePathname("/cgu", locale)} className="hover:text-white transition-colors">
              {t("footer.links.terms")}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#40B4A6]" />
            <span className="uppercase tracking-widest font-bold text-[10px] text-[#F8FAFC]">{t("footer.qualityBadge")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

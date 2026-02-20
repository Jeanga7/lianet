"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";
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
      className="group relative inline-block text-base font-light text-[#1B365D]/70 transition-colors duration-300 hover:text-[#1B365D]"
      style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#40B4A6] transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
    <h3
      className="mb-8 text-xs font-bold uppercase tracking-widest text-[#1B365D]"
      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
    >
      {children}
    </h3>
  );

  return (
    <footer
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 overflow-hidden bg-[#F8FAFC] pb-8 pt-20 text-[#1B365D] lg:pt-32"
      aria-label={t("footer.title")}
    >
      {/* Background Decor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(64,180,166,0.03),transparent_40%)]"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8 xl:gap-16">

          {/* Column 1: Identity (Spans 2) */}
          <div className="flex flex-col items-start gap-8 lg:col-span-2 lg:pr-12">
            {/* Logo Parallax */}
            <Link href={localizePathname(appRoutes.home, locale)} className="relative block">
              <motion.div style={{ x: logoX, y: logoY }}>
                <span
                  className="text-4xl font-black tracking-tighter text-[#1B365D] lg:text-5xl"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                  LIANET<span className="text-[#40B4A6]">.</span>
                </span>
              </motion.div>
            </Link>

            <p
              className="max-w-[42ch] text-lg font-light leading-relaxed text-[#1B365D]/80"
              style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
            >
              Lianet — L'alliance de l'audace africaine et de la précision internationale.
            </p>

            <div className="flex gap-4 mt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B365D]/10 bg-white text-[#1B365D] transition-colors duration-300 hover:border-[#40B4A6] hover:bg-[#40B4A6] hover:text-white"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Expertise */}
          <div className="flex flex-col items-start">
            <ColumnHeader>{t("footer.columns.expertise") || "EXPERTISE"}</ColumnHeader>
            <nav className="flex flex-col gap-4">
              <FooterLink href={appRoutes.solutionsTalent}>
                Talent Solutions
              </FooterLink>
              <FooterLink href={appRoutes.solutionsStrategy}>
                Digital Strategy
              </FooterLink>
              <FooterLink href={appRoutes.solutionsLab}>
                Innovation Lab
              </FooterLink>
              <FooterLink href={appRoutes.caseStudies}>
                Success Stories
              </FooterLink>
            </nav>
          </div>

          {/* Column 3: Société & Légal */}
          <div className="flex flex-col items-start bg-[#F8FAFC]">
            {/* Combined for cleaner layout on mobile, distinct sections visually if needed */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">

              {/* Société Blocks */}
              <div>
                <ColumnHeader>{t("footer.columns.company") || "SOCIÉTÉ"}</ColumnHeader>
                <nav className="flex flex-col gap-4">
                  <FooterLink href={appRoutes.about}>
                    Notre ADN (À Propos)
                  </FooterLink>
                  <FooterLink href={appRoutes.careers}>
                    Carrières
                  </FooterLink>
                  <FooterLink href={appRoutes.contact}>
                    Contact
                  </FooterLink>
                  <div className="pt-2">
                    <a href="mailto:contact@lianet.com" className="text-sm font-medium text-[#1B365D] hover:text-[#40B4A6] transition-colors">
                      contact@lianet.com
                    </a>
                  </div>
                </nav>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-[#1B365D]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-[#1B365D]/60 mb-20">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 md:justify-start">
            <span>&copy; {currentYear} Lianet. Tous droits réservés.</span>
            <div className="hidden md:block w-[1px] h-3 bg-[#1B365D]/20 self-center" />
            <Link href={localizePathname("/legal", locale)} className="hover:text-[#1B365D] transition-colors">
              Mentions Légales
            </Link>
            <Link href={localizePathname("/privacy", locale)} className="hover:text-[#1B365D] transition-colors">
              Confidentialité
            </Link>
            <Link href={localizePathname("/cgu", locale)} className="hover:text-[#1B365D] transition-colors">
              CGU
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#40B4A6]" />
            <span className="uppercase tracking-widest font-bold text-[10px] text-[#1B365D]">Built for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

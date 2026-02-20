"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { FilmGrain, FooterSection } from "@/components/sections";
import { EliteButton } from "@/components/ui/atoms";

interface PageScaffoldProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  modules: ReadonlyArray<{
    title: string;
    description: string;
  }>;
}

export default function PageScaffold({
  locale,
  eyebrow,
  title,
  description,
  modules,
}: PageScaffoldProps) {
  return (
    <main
      id="main-scroll"
      className="relative h-screen overflow-y-auto overflow-x-hidden lg:overflow-y-scroll scrollbar-hide bg-[#F8FAFC]"
    >
      <FilmGrain opacity={0.3} />
      <section className="relative w-full px-6 pb-20 pt-32 sm:px-8 lg:px-14 lg:pt-48">
        <div className="mx-auto max-w-5xl">
          <p className="font-nunito text-[11px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/55">{eyebrow}</p>
          <h1 className="mt-8 font-nunito text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-[-0.03em] text-[#1B365D]">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl font-lato text-[18px] leading-relaxed text-[#1B365D]/75 lg:text-[21px]">
            {description}
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-3xl border border-[#1B365D]/8 bg-white/60 p-8 backdrop-blur-md transition-all hover:border-[#40B4A6]/30 hover:shadow-xl"
              >
                <h2 className="font-nunito text-xl font-bold text-[#1B365D]">{module.title}</h2>
                <p className="mt-3 font-lato text-[15px] leading-relaxed text-[#1B365D]/70">
                  {module.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <EliteButton
              onClick={() => {/* navigate or action handled by global link pattern if desired, or here */ }}
              arrow="right"
            >
              {locale === "fr" ? "Démarrer un projet" : "Start a project"}
            </EliteButton>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

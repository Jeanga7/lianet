import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";

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
      className="min-h-screen overflow-y-auto lg:overflow-y-scroll scrollbar-hide"
    >
      <section className="relative w-full px-6 pb-20 pt-28 sm:px-8 lg:ml-20 lg:w-[calc(100%-5rem)] lg:px-14 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#1B365D]/55">{eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-bold tracking-[-0.02em] text-[#1B365D]">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#1B365D]/80">
            {description}
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-2xl border border-[#1B365D]/12 bg-white/80 p-6 backdrop-blur-sm"
              >
                <h2 className="text-lg font-semibold text-[#1B365D]">{module.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#1B365D]/75">
                  {module.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={localizePathname(appRoutes.contact, locale)}
              className="inline-flex items-center gap-2 rounded-full border border-[#40B4A6]/35 bg-[#40B4A6]/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#1B365D] transition-colors hover:bg-[#40B4A6]/20"
            >
              {locale === "fr" ? "Démarrer un projet" : "Start a project"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

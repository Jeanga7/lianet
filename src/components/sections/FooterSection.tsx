"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { HeroPrimaryButton, Magnetic } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";

export default function FooterSection() {
  const { locale, t } = useI18n();

  const navigateWithWipe = (href: string) => {
    window.dispatchEvent(new CustomEvent("navigateWithWipe", { detail: { href } }));
  };

  const scrollToTop = () => {
    const mainScroll = document.getElementById("main-scroll");
    if (mainScroll) {
      mainScroll.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative isolate min-h-[70vh] overflow-hidden bg-[#1B365D] px-4 py-20 text-[#F8FAFC] sm:px-6 lg:min-h-[75vh] lg:px-10 lg:py-24 xl:px-14"
      aria-label={t("footer.title")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(64,180,166,0.25),transparent_55%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1300px] flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[680px] space-y-6">
          <p
            className="text-[11px] uppercase tracking-[0.24em] text-[#F8FAFC]/68"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("footer.eyebrow")}
          </p>
          <h2
            className="text-[clamp(2rem,5vw,4rem)] font-black leading-[1.02] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            {t("footer.title")}
          </h2>
          <p
            className="max-w-[62ch] text-base font-light leading-relaxed text-[#F8FAFC]/86 lg:text-lg"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
          >
            {t("footer.subtitle")}
          </p>
        </div>

        <div className="w-full max-w-[420px] space-y-4">
          <Magnetic className="w-full" strength={20}>
            <HeroPrimaryButton
              size="compact"
              label={t("footer.cta.primary")}
              iconEnd={ArrowUpRight}
              showEndIconOnMobile
              onClick={() => navigateWithWipe(localizePathname(appRoutes.contact, locale))}
              className="w-full bg-[rgb(var(--secondary))] px-8 py-4 !text-sm !font-bold uppercase !tracking-widest"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            />
          </Magnetic>

          <Magnetic className="w-full" strength={20}>
            <HeroPrimaryButton
              size="compact"
              label={t("footer.cta.secondary")}
              iconEnd={ArrowUpRight}
              showEndIconOnMobile
              onClick={() => navigateWithWipe(localizePathname(appRoutes.solutions, locale))}
              className="w-full border border-white/35 bg-white/10 px-8 py-4 !text-sm !font-bold uppercase !tracking-widest text-[#F8FAFC] hover:bg-white/18"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            />
          </Magnetic>
        </div>
      </div>


      <div className="absolute bottom-6 right-6 z-20 lg:bottom-8 lg:right-8">
        <Magnetic strength={20}>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#F8FAFC] backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-110"
            aria-label={t("footer.backToTop") || "Back to Top"}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </Magnetic>
      </div>
    </section >
  );
}

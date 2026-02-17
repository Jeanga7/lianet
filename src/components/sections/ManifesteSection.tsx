"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { HeroPrimaryButton, HeroSecondaryButton, Magnetic } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";

type FocusField = "ambition" | "email" | "cta" | null;

const springTransition = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
};

const revealVariants = {
  hidden: { opacity: 0.2, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function ManifesteSection() {
  const { locale, t } = useI18n();
  const [focusField, setFocusField] = useState<FocusField>(null);
  const [ambition, setAmbition] = useState("");
  const [email, setEmail] = useState("");

  const navigateWithWipe = (href: string) => {
    window.dispatchEvent(new CustomEvent("navigateWithWipe", { detail: { href } }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateWithWipe(localizePathname(appRoutes.contact, locale));
  };

  return (
    <section
      className="relative h-auto min-h-screen w-full overflow-hidden bg-[#40B4A6] px-4 py-14 sm:px-6 lg:h-dvh lg:px-10 lg:py-16 xl:px-14"
      aria-label={t("manifeste.title")}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center gap-12 lg:gap-16">
        <div className="mx-auto w-full max-w-[980px] text-center">
          <motion.h2
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...springTransition, delay: 0 }}
            className="text-[clamp(2.1rem,4.6vw,3.45rem)] font-black leading-[1.04] tracking-tighter text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
          >
            <span className="block">{t("manifeste.titleLine1")}</span>
            <span className="mt-1 block">{t("manifeste.titleLine2")}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:mt-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 text-center lg:text-left"
          >
            <p
              className="text-base font-light leading-relaxed text-[#F8FAFC]/94 lg:text-[1.15rem]"
              style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
            >
              {t("manifeste.body")}
            </p>
            <p
              className="text-lg font-bold italic leading-relaxed text-[#8FD6CC] lg:text-[1.35rem]"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            >
              {t("manifeste.mantra")}
            </p>
            <p
              className="text-base font-normal leading-relaxed text-[#F8FAFC]/92 lg:text-[1.1rem]"
              style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
            >
              {t("manifeste.aboutText")}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Magnetic className="inline-flex" strength={16}>
                <HeroSecondaryButton
                  size="compact"
                  label={t("manifeste.aboutCta")}
                  iconStart={null}
                  onClick={() => navigateWithWipe(localizePathname(appRoutes.about, locale))}
                  className="!w-auto !bg-transparent !text-[#F8FAFC] [--border:#F8FAFC] hover:!bg-white/10 hover:!text-[#F8FAFC]"
                  style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                />
              </Magnetic>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...springTransition, delay: 0.24 }}
            className="relative w-full rounded-[2rem] border border-white/18 bg-black/20 p-6 shadow-[0_22px_56px_rgba(8,32,45,0.32)] sm:p-8 lg:p-10"
            style={{
              backdropFilter: "blur(34px) saturate(120%) brightness(0.58)",
              WebkitBackdropFilter: "blur(34px) saturate(120%) brightness(0.58)",
            }}
          >
            <div className="relative z-10">
              <h3
                className="text-center text-[clamp(1.2rem,2.2vw,1.6rem)] font-bold leading-tight text-[#F8FAFC]"
                style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
              >
                {t("manifeste.formTitle")}
              </h3>

              <div className="mt-9 space-y-8">
                <div>
                  <label
                    htmlFor="manifeste-ambition"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#F8FAFC]/75"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {t("manifeste.ambitionLabel")}
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      id="manifeste-ambition"
                      rows={1}
                      value={ambition}
                      onFocus={() => setFocusField("ambition")}
                      onChange={(event) => setAmbition(event.target.value)}
                      placeholder={t("manifeste.ambitionPlaceholder")}
                      className="min-h-[48px] max-h-[144px] w-full resize-y overflow-y-auto border-none border-b border-white/35 bg-transparent pb-3 pt-2 text-base font-light leading-normal text-[#F8FAFC] placeholder:text-[#F8FAFC]/55 focus:outline-none"
                      style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                    />
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#8FD6CC]"
                      animate={{ scaleX: focusField === "ambition" ? 1 : 0 }}
                      style={{ transformOrigin: "left center" }}
                      transition={springTransition}
                    />
                    {focusField === "ambition" && (
                      <motion.span
                        layoutId="manifeste-focus-anchor"
                        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#8FD6CC]"
                        transition={springTransition}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="manifeste-email"
                    className="block text-[11px] uppercase tracking-[0.22em] text-[#F8FAFC]/75"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                  >
                    {t("manifeste.emailLabel")}
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="manifeste-email"
                      type="email"
                      value={email}
                      onFocus={() => setFocusField("email")}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={t("manifeste.emailPlaceholder")}
                      className="w-full border-none border-b border-white/35 bg-transparent pb-3 pt-1 text-base font-light text-[#F8FAFC] placeholder:text-[#F8FAFC]/55 focus:outline-none"
                      style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                    />
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#8FD6CC]"
                      animate={{ scaleX: focusField === "email" ? 1 : 0 }}
                      style={{ transformOrigin: "left center" }}
                      transition={springTransition}
                    />
                    {focusField === "email" && (
                      <motion.span
                        layoutId="manifeste-focus-anchor"
                        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#8FD6CC]"
                        transition={springTransition}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="relative">
                  {focusField === "cta" && (
                    <motion.span
                      layoutId="manifeste-focus-anchor"
                      className="pointer-events-none absolute -inset-[2px] rounded-full border border-[#8FD6CC]/85"
                      transition={springTransition}
                    />
                  )}
                  <Magnetic className="block w-full" strength={22}>
                    <HeroPrimaryButton
                      type="submit"
                      size="compact"
                      label={t("manifeste.primaryCta")}
                      showEndIconOnMobile
                      onMouseEnter={() => setFocusField("cta")}
                      onMouseLeave={() => setFocusField(null)}
                      onFocus={() => setFocusField("cta")}
                      onBlur={() => setFocusField(null)}
                      className="!w-full px-6 py-4 !text-sm !font-bold uppercase !tracking-widest"
                      style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                    />
                  </Magnetic>
                </div>
                <p
                  className="mt-4 text-center text-xs font-light leading-relaxed text-[#F8FAFC]/80"
                  style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                >
                  {t("manifeste.notePrefix")}{" "}
                  <button
                    type="button"
                    onClick={() => navigateWithWipe(localizePathname(appRoutes.contact, locale))}
                    className="underline decoration-[#F8FAFC]/60 underline-offset-4 hover:text-[#F8FAFC]"
                  >
                    {t("manifeste.contactLink")}
                  </button>
                  .
                </p>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

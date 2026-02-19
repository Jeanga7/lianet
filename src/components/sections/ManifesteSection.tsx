"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Dna, Send } from "lucide-react";
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
      className="relative h-auto min-h-screen w-full overflow-hidden bg-cover bg-center px-4 py-20 sm:px-6 lg:h-dvh lg:px-10 lg:py-20 xl:px-14"
      style={{ backgroundImage: "url('/bg-dechirer.svg')" }}
      aria-label={t("manifeste.title")}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(27,54,93,0.15),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center gap-14 lg:gap-16">
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
            className="flex flex-col justify-center space-y-8 text-center lg:text-left"
          >
            <p
              className="text-base font-light leading-relaxed text-white/90 lg:text-[1.15rem]"
              style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
            >
              {t("manifeste.body")}
            </p>
            <p
              className="text-xl font-black italic leading-relaxed text-[#1B365D] lg:text-[1.5rem]"
              style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
            >
              {t("manifeste.mantra")}
            </p>
            <p
              className="text-base font-normal leading-relaxed text-white/75 lg:text-[1.1rem]"
              style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
            >
              {t("manifeste.aboutText")}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Magnetic className="inline-flex" strength={16}>
                <HeroSecondaryButton
                  size="compact"
                  label={t("manifeste.aboutCta")}
                  iconStart={Dna}
                  onClick={() => navigateWithWipe(localizePathname(appRoutes.about, locale))}
                  className="!w-auto !border-0 !bg-[#1B365D] !text-[#F8FAFC] shadow-md hover:!bg-[#0F2440] hover:!text-white"
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
            className="relative w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[#1B365D]/30 p-6 shadow-[0_22px_56px_rgba(8,32,45,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-8 lg:p-10"
            style={{
              backdropFilter: "blur(40px) saturate(130%) brightness(0.55)",
              WebkitBackdropFilter: "blur(40px) saturate(130%) brightness(0.55)",
            }}
          >
            {/* Noise texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            {/* Inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(143,214,204,0.12),transparent_60%)]" />

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
                      className="min-h-[48px] max-h-[144px] w-full resize-y overflow-y-auto border-0 border-b-[1px] border-white/30 bg-transparent pb-3 pt-2 text-base font-light leading-normal text-white placeholder:text-white/45 focus:outline-none"
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
                      className="w-full border-0 border-b-[1px] border-white/30 bg-transparent pb-3 pt-1 text-base font-light text-white placeholder:text-white/45 focus:outline-none"
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
                      iconStart={Send}
                      iconEnd={ArrowUpRight}
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

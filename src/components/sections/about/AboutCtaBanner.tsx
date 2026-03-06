"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPrimaryButton, HeroSecondaryButton, Magnetic } from "@/components/ui";
import { localizePathname } from "@/lib/locale";
import { appRoutes } from "@/lib/routes";
import { useI18n } from "@/lib/useI18n";
import type { Locale } from "@/i18n/config";

interface Props {
    locale: Locale;
}

export default function AboutCtaBanner({ locale }: Props) {
    const { t } = useI18n();

    const navigate = (href: string) => {
        window.dispatchEvent(new CustomEvent("navigateWithWipe", { detail: { href } }));
    };

    return (
        <section className="relative overflow-hidden bg-[#1B365D] px-6 py-20 text-white sm:px-10 lg:px-14 lg:py-28">
            {/* Radial glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(64,180,166,0.12),transparent_65%)]"
            />

            <div className="relative mx-auto max-w-[900px] text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#40B4A6]"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                    {t("about.cta.eyebrow")}
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="text-[clamp(2.2rem,7vw,4rem)] font-black leading-[1.04] tracking-[-0.03em] text-white"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                    {t("about.cta.title")}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.6, delay: 0.16 }}
                    className="mx-auto mt-5 max-w-[56ch] text-lg font-light leading-relaxed text-white/70"
                    style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
                >
                    {t("about.cta.subtitle")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.26 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                    <Magnetic strength={20}>
                        <HeroPrimaryButton
                            size="compact"
                            label={t("about.cta.primary")}
                            iconEnd={ArrowUpRight}
                            showEndIconOnMobile
                            onClick={() => navigate(localizePathname(appRoutes.contact, locale))}
                            className="bg-[#40B4A6] shadow-[0_14px_32px_rgba(64,180,166,0.35)] hover:bg-[#58c5b7]"
                        />
                    </Magnetic>
                    <Magnetic strength={20}>
                        <HeroSecondaryButton
                            size="compact"
                            label={t("about.cta.secondary")}
                            onClick={() => navigate(localizePathname(appRoutes.solutions, locale))}
                            className="!border !border-white/20 !bg-transparent !text-white hover:!bg-white/10"
                        />
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}

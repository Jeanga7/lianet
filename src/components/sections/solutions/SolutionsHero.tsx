"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";

export default function SolutionsHero() {
    const { t } = useI18n();

    return (
        <section className="relative w-full px-6 pt-32 pb-16 sm:px-8 lg:px-14 lg:pt-48">
            <div className="mx-auto max-w-[1600px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.p
                        className="font-nunito text-[11px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/60 lg:text-[12px]"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t("solutions.hero.eyebrow")}
                    </motion.p>

                    <h1 className="mt-8 max-w-4xl font-nunito text-[clamp(2.8rem,9vw,5.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#1B365D]">
                        {t("solutions.hero.title")}
                    </h1>

                    <p className="mt-8 max-w-2xl font-lato text-[18px] leading-relaxed text-[#1B365D]/75 lg:text-[22px] lg:leading-relaxed">
                        {t("solutions.hero.description")}
                    </p>
                </motion.div>
            </div>

            {/* Decorative Blur Element */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#40B4A6]/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-[#1B365D]/5 blur-[100px] pointer-events-none" />
        </section>
    );
}

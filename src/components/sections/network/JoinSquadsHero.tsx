"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/useI18n";

export default function JoinSquadsHero() {
    const { t } = useI18n();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="relative h-[120vh] w-full px-6 pt-32 pb-16 sm:px-8 lg:px-14 lg:pt-48 overflow-hidden bg-[#F8FAFC]"
        >
            <motion.div
                style={{ y, opacity, scale }}
                className="mx-auto max-w-[1600px] text-center lg:text-left"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.p
                        className="font-nunito text-[11px] font-bold uppercase tracking-[0.4em] text-[#40B4A6] lg:text-[13px]"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t("network.hero.eyebrow")}
                    </motion.p>

                    <h1 className="mt-8 max-w-5xl font-nunito text-[clamp(2.8rem,10vw,6.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#1B365D] mx-auto lg:mx-0">
                        {t("network.hero.title")}
                    </h1>

                    <p className="mt-10 max-w-2xl font-lato text-[19px] leading-relaxed text-[#1B365D]/80 lg:text-[24px] lg:leading-relaxed mx-auto lg:mx-0">
                        {t("network.hero.description")}
                    </p>
                </motion.div>
            </motion.div>

            {/* Narrative Reveal Scroll Prompt */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/40">
                    Scroll to discover the vision
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-[#40B4A6] to-transparent"
                />
            </motion.div>

            {/* Decorative Ambient Elements */}
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#40B4A6]/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-[#1B365D]/5 blur-[100px] pointer-events-none" />
        </section>
    );
}

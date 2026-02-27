"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useRef } from "react";
import Image from "next/image";
import { ScrollZone } from "@/components/ui";

export default function AboutHero() {
    const { t } = useI18n();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Parallax speeds for background keywords
    const wordY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const wordY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const wordY3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

    const parallaxWords = [
        { word: t("about.hero.parallaxWords.0"), y: wordY1, top: "18%", left: "65%" },
        { word: t("about.hero.parallaxWords.1"), y: wordY2, top: "55%", left: "72%" },
        { word: t("about.hero.parallaxWords.2"), y: wordY3, top: "75%", left: "58%" },
    ];

    return (
        <section
            ref={ref}
            className="relative min-h-[100svh] flex flex-col justify-center px-6 pt-32 pb-24 sm:px-8 lg:px-14 lg:pt-48 overflow-hidden bg-[#F8FAFC]"
        >
            {/* Background Architectural Image - System Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
                    scale: 1.05
                }}
            >
                <Image
                    src="/about_hero_v2.png"
                    alt="Lianet Infrastructure"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/60 via-transparent to-[#F8FAFC]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/90 via-[#F8FAFC]/10 to-transparent lg:block hidden" />
            </motion.div>

            {/* Architectural Grid Lines — Industrial Luxury */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden hidden lg:block">
                {[20, 40, 60, 80].map((pct) => (
                    <div
                        key={`v-${pct}`}
                        className="absolute top-0 bottom-0 w-px bg-[#1B365D]/[0.03]"
                        style={{ left: `${pct}%` }}
                    />
                ))}
                {[25, 50, 75].map((pct) => (
                    <div
                        key={`h-${pct}`}
                        className="absolute left-0 right-0 h-px bg-[#1B365D]/[0.03]"
                        style={{ top: `${pct}%` }}
                    />
                ))}
            </div>

            {/* Parallax Background Keywords */}
            <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden hidden lg:block">
                {parallaxWords.map((item, i) => (
                    <motion.span
                        key={i}
                        style={{ y: item.y, top: item.top, left: item.left }}
                        className="absolute font-nunito text-[clamp(4rem,10vw,8rem)] font-black text-[#1B365D]/[0.03] select-none tracking-[-0.04em] whitespace-nowrap"
                    >
                        {item.word}
                    </motion.span>
                ))}
            </div>

            {/* Subtle Accent Orb */}
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="hidden lg:block absolute -top-56 -right-56 w-[700px] h-[700px] rounded-full bg-[#40B4A6]/5 pointer-events-none blur-[150px]" />

            <div className="relative z-10 mx-auto max-w-[1600px] w-full">
                <motion.div style={{ y, opacity }}>
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-nunito text-[11px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/60 lg:text-[12px]"
                    >
                        {t("about.hero.eyebrow")}
                    </motion.p>

                    <h1 className="mt-8 max-w-4xl font-nunito text-[clamp(2.8rem,9vw,5.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#1B365D]">
                        {t("about.hero.titleLine1")}
                        <br className="hidden md:block" />
                        <span className="inline-block">{t("about.hero.titleLine2")}</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="mt-8 text-lg md:text-xl lg:text-2xl text-[#1B365D]/75 font-lato leading-relaxed max-w-2xl lg:ml-2"
                    >
                        {t("about.hero.subtitle")}
                    </motion.p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <ScrollZone targetSectionId="story" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/30 mb-2">
                    SCROLL
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-[#40B4A6] to-transparent"
                />
            </motion.div>
        </section>
    );
}

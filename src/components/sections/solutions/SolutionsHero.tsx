import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useRef } from "react";
import { ScrollZone } from "@/components/ui";

export default function SolutionsHero() {
    const { t } = useI18n();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-[100svh] flex flex-col justify-center px-6 pt-32 pb-24 sm:px-8 lg:px-14 lg:pt-48 overflow-hidden bg-[#F8FAFC]"
        >
            {/* Background Image with Parallax & Light Overlay */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
                    scale: 1.05
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: "url('/images/hero-bg-solutions-light.png')" }}
                />
                {/* Soft Light Overlays for Depth and Cleanliness */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/60 via-transparent to-[#F8FAFC]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/90 via-[#F8FAFC]/10 to-transparent lg:block hidden" />
            </motion.div>

            {/* Subtle Accent Orbs for Light Theme */}
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="hidden lg:block absolute -top-56 -right-56 w-[700px] h-[700px] rounded-full bg-[#40B4A6]/5 pointer-events-none blur-[150px]" />

            <div className="relative z-10 mx-auto max-w-[1600px] w-full">
                <motion.div style={{ y, opacity }}>
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

            {/* Scroll indicator - Bottom Center */}
            <ScrollZone targetSectionId="grid" />

            {/* Desktop Scroll Indicator (Subtle animated line) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/30 mb-2">{t("network.hero.scrollLabel")}</span>
                <motion.div
                    animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-[#40B4A6] to-transparent"
                />
            </motion.div>

            {/* Mobile Scroll Indicator (Three animated chevrons) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1 opacity-40"
                >
                    <svg className="w-4 h-4 text-[#1B365D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    <svg className="w-4 h-4 text-[#1B365D] -mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </motion.div>
            </motion.div>
        </section>
    );
}

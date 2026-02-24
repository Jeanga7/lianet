"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { FilmGrain, FooterSection } from "@/components/sections";
import { Magnetic, ScrollZone } from "@/components/ui/atoms";
import EliteSideDrawer from "@/components/ui/molecules/EliteSideDrawer";

// ─── ICON MAP ───────────────────────────────────────────────────────────────
const PoleIcon = ({ id }: { id: string }) => {
    const icons: Record<string, React.ReactNode> = {
        software: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        ),
        creative: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        ),
        growth: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
        ),
        intelligence: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    };
    return <>{icons[id] ?? null}</>;
};

// ─── HERO ───────────────────────────────────────────────────────────────────
function SquadsHero({ onSelectTrack }: { onSelectTrack: (track: "expert" | "team") => void }) {
    const { t } = useI18n();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-[100svh] flex flex-col justify-center px-6 pt-32 pb-24 sm:px-10 lg:px-14 lg:pt-48 overflow-hidden"
        >
            {/* Gradient Orbs — desktop only for mobile cleanliness */}
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 8, repeat: Infinity }} className="hidden lg:block absolute -top-56 -right-56 w-[700px] h-[700px] rounded-full bg-[#40B4A6] pointer-events-none blur-[120px]" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 10, delay: 2, repeat: Infinity }} className="hidden lg:block absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-[#1B365D] pointer-events-none blur-[100px]" />

            <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-[1600px] w-full">
                <motion.p
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-nunito text-[11px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/60 lg:text-[12px]"
                >
                    {t("network.hero.eyebrow")}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 max-w-4xl font-nunito text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#1B365D] text-left"
                >
                    {t("network.hero.title")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-4 font-nunito text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-[#1B365D]/60 text-left"
                >
                    {t("network.hero.subtitle")}
                </motion.p>

                <div className="mt-10 lg:mt-12 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <p className="max-w-2xl font-lato text-[18px] leading-relaxed text-[#1B365D]/75 lg:text-[22px] lg:leading-relaxed text-left">
                            {t("network.hero.pitch")}
                        </p>
                        <p className="font-nunito font-bold text-sm uppercase tracking-widest text-[#40B4A6] text-left">
                            → {t("network.hero.subpitch")}
                        </p>
                    </motion.div>

                    {/* Curation Trust Card — replaces unverifiable stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                        className="rounded-3xl bg-white/70 border border-[#1B365D]/8 shadow-sm p-8 space-y-4 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#40B4A6]/15 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-[#40B4A6]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            </div>
                            <p className="font-nunito font-black text-xs uppercase tracking-widest text-[#40B4A6]">{t("network.hero.curation.title")}</p>
                        </div>
                        <p className="font-lato font-light text-[15px] text-[#1B365D]/75 leading-relaxed">
                            {t("network.hero.curation.desc")}
                        </p>
                        <div className="pt-2 border-t border-[#1B365D]/5">
                            <p className="font-nunito font-black text-xs uppercase tracking-widest text-[#1B365D]/40">{t("network.hero.curation.signature")}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Dual CTA Below */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    className="mt-16 flex flex-col items-center gap-4 justify-center lg:items-start"
                >
                    <Magnetic strength={30}>
                        <button
                            onClick={() => onSelectTrack("expert")}
                            className="group relative w-full sm:w-auto flex items-center justify-center gap-4 rounded-full bg-[#1B365D] px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#1B365D]/20 hover:bg-[#0F2440] transition-all duration-500 overflow-hidden"
                        >
                            <span className="relative z-10">{t("network.tracks.expert.cta")}</span>
                            <span className="relative z-10 text-[#40B4A6] text-lg">→</span>
                            {/* Shine */}
                            <motion.div
                                animate={{ x: ["-150%", "150%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                            />
                        </button>
                    </Magnetic>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#40B4A6]/70 text-center lg:text-left">
                        ✦ {t("network.tracks.expert.ctaSub")}
                    </p>
                </motion.div>
            </motion.div>

            {/* Scroll indicator - Bottom Center */}
            <ScrollZone targetSectionId="poles" />

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

            {/* Mobile Scroll Indicator (Three animated chevrons like Hero) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.button
                    type="button"
                    onClick={() => document.getElementById("poles")?.scrollIntoView({ behavior: "smooth" })}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex flex-col items-center justify-center p-1 text-[#1B365D]/40"
                    aria-label="Scroll to discover"
                >
                    <span className="relative flex flex-col items-center leading-none">
                        <motion.span
                            className="-mb-1 block"
                            animate={{ y: [-2, 1, -2], opacity: [0.35, 0.95, 0.35] }}
                            transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronDown className="h-5 w-5" />
                        </motion.span>
                        <motion.span
                            className="-mb-1 block"
                            animate={{ y: [-1, 2, -1], opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 1.35, delay: 0.14, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronDown className="h-5 w-5" />
                        </motion.span>
                        <motion.span
                            className="block"
                            animate={{ y: [0, 3, 0], opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 1.35, delay: 0.28, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronDown className="h-5 w-5" />
                        </motion.span>
                    </span>
                </motion.button>
            </motion.div>
        </section>
    );
}

// ─── PÔLES DE FORCE ──────────────────────────────────────────────────────────
const polesData = [
    { id: "software", tagColor: "bg-[#1B365D]/10 text-[#1B365D]" },
    { id: "creative", tagColor: "bg-[#40B4A6]/10 text-[#40B4A6]" },
    { id: "growth", tagColor: "bg-amber-50 text-amber-600" },
    { id: "intelligence", tagColor: "bg-violet-50 text-violet-600" },
];

function PolesDeForce() {
    const { t, tArray } = useI18n();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const items = tArray("network.poles.items");

    return (
        <section id="poles" ref={ref} className="relative px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
            <div className="mx-auto max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <p className="font-nunito text-[12px] font-bold uppercase tracking-[0.2em] text-[#40B4A6] mb-6">
                        {t("network.poles.title")}
                    </p>
                    <h2 className="font-nunito font-black text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-[#1B365D]">
                        {t("network.poles.description")}
                    </h2>
                    <p className="mt-6 font-lato font-light text-lg text-[#1B365D]/60 max-w-2xl mx-auto leading-relaxed">
                        {t("network.poles.subtitle")}
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {items.map((pole: any, i: number) => {
                        const meta = polesData[i];
                        return (
                            <motion.div
                                key={pole.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: i * 0.12 }}
                                className="group relative rounded-3xl p-8 border border-[#1B365D]/5 bg-white hover:shadow-2xl hover:shadow-[#1B365D]/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                            >
                                {/* Light Sweep on Hover */}
                                <motion.div
                                    initial={{ x: "-120%", opacity: 0 }}
                                    whileHover={{ x: "120%", opacity: 1 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 pointer-events-none"
                                />

                                {/* Ambient top gradient */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#40B4A6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl" />

                                <div className="mb-8 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#1B365D]/5 group-hover:bg-[#40B4A6]/10 text-[#1B365D]/40 group-hover:text-[#40B4A6] transition-all duration-500">
                                    <div className="w-7 h-7">
                                        <PoleIcon id={pole.id} />
                                    </div>
                                </div>

                                <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4", meta.tagColor)}>
                                    {pole.tag}
                                </span>

                                <h3 className="font-nunito font-black text-lg text-[#1B365D] mb-3 group-hover:text-[#1B365D] leading-tight">
                                    {pole.label}
                                </h3>
                                <p className="font-lato font-light text-sm text-[#1B365D]/60 leading-relaxed">
                                    {pole.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── PROTOCOL D'EXCELLENCE ───────────────────────────────────────────────────
function ExcellenceProtocol() {
    const { t, tArray } = useI18n();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const steps = tArray("network.protocol.steps");

    return (
        <section className="relative bg-[#8FD6CC] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(27,54,93,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-white pointer-events-none blur-[140px]" />

            <div ref={ref} className="relative z-10 mx-auto max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <p className="font-nunito text-[12px] font-bold uppercase tracking-[0.2em] text-[#1B365D]/70 mb-6">
                        {t("network.protocol.eyebrow")}
                    </p>
                    <h2 className="font-nunito font-black text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-[#1B365D]">
                        {t("network.protocol.title")}
                    </h2>
                    <p className="mt-6 font-lato font-light text-lg text-[#1B365D]/70 max-w-2xl mx-auto leading-relaxed">
                        {t("network.protocol.description")}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {steps.map((step: any, i: number) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="relative p-8 lg:p-10 rounded-3xl bg-white/70 border border-white backdrop-blur-xl hover:bg-white/90 hover:shadow-xl hover:shadow-[#1B365D]/8 transition-all duration-500 group"
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#1B365D]/15 to-transparent" />

                            <span className="font-nunito font-black text-[4rem] leading-none tracking-[-0.05em] text-[#1B365D]/25 group-hover:text-[#40B4A6]/50 transition-colors duration-500 block mb-4">
                                {step.num}
                            </span>

                            <h3 className="font-nunito font-black text-xl text-[#1B365D] mb-4">{step.title}</h3>
                            <p className="font-lato font-light text-[#1B365D]/65 leading-relaxed text-[15px]">{step.desc}</p>

                            {/* Connector line (not for last) */}
                            {i < 2 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] rounded-full bg-[#1B365D]/25" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── TRACK SWITCHER + CONTENT ─────────────────────────────────────────────────
function TrackSection({ onApply }: { onApply: (track: "expert" | "team") => void }) {
    const { t } = useI18n();
    const [active, setActive] = useState<"expert" | "team">("expert");
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const data = {
        expert: {
            title: t("network.tracks.expert.title"),
            description: t("network.tracks.expert.description"),
            benefits: [
                { title: t("network.tracks.expert.benefits.0.title"), desc: t("network.tracks.expert.benefits.0.desc") },
                { title: t("network.tracks.expert.benefits.1.title"), desc: t("network.tracks.expert.benefits.1.desc") },
                { title: t("network.tracks.expert.benefits.2.title"), desc: t("network.tracks.expert.benefits.2.desc") },
            ],
            cta: t("network.tracks.expert.cta"),
            ctaSub: t("network.tracks.expert.ctaSub"),
        },
        team: {
            title: t("network.tracks.team.title"),
            description: t("network.tracks.team.description"),
            benefits: [
                { title: t("network.tracks.team.benefits.0.title"), desc: t("network.tracks.team.benefits.0.desc") },
                { title: t("network.tracks.team.benefits.1.title"), desc: t("network.tracks.team.benefits.1.desc") },
                { title: t("network.tracks.team.benefits.2.title"), desc: t("network.tracks.team.benefits.2.desc") },
            ],
            cta: t("network.tracks.team.cta"),
            ctaSub: t("network.tracks.team.ctaSub"),
        },
    };
    const current = data[active];

    return (
        <section ref={ref} className="relative px-6 py-24 sm:px-10 lg:px-16 lg:py-32 bg-[#F8FAFC]">
            <div className="mx-auto max-w-[1400px]">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="font-nunito font-bold text-[12px] uppercase tracking-[0.2em] text-[#40B4A6] mb-4">{t("network.selector.eyebrow")}</p>
                    <h2 className="font-nunito font-black text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-[#1B365D]">
                        {t("network.selector.title")}
                    </h2>
                </motion.div>

                {/* Binary Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="mx-auto max-w-md mb-16"
                >
                    <div className="relative flex p-2 rounded-full bg-white border border-[#1B365D]/8 shadow-xl shadow-[#1B365D]/5">
                        {(["expert", "team"] as const).map((track) => (
                            <button
                                key={track}
                                onClick={() => setActive(track)}
                                className={cn("relative flex-1 py-4 px-6 rounded-full transition-colors duration-300 outline-none", active === track ? "text-white" : "text-[#1B365D]/50 hover:text-[#1B365D]")}
                            >
                                {active === track && (
                                    <motion.div layoutId="track-bg" className="absolute inset-0 bg-[#1B365D] rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                                )}
                                <span className="relative z-10 font-nunito font-bold text-sm">
                                    {track === "expert" ? t("network.selector.expert.label") : t("network.selector.team.label")}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Morphing Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <h3 className="font-nunito font-black text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] text-[#1B365D] leading-tight">
                                    {current.title}
                                </h3>
                                {/* Teal accent line under active track title */}
                                <motion.div layoutId="track-accent" className="w-12 h-1 rounded-full bg-[#40B4A6]" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
                            </div>
                            <p className="font-lato font-light text-[17px] lg:text-[20px] text-[#1B365D]/70 leading-relaxed">
                                {current.description}
                            </p>
                            <div className="pt-4">
                                <Magnetic strength={25}>
                                    <button
                                        onClick={() => onApply(active)}
                                        className="group relative w-full sm:w-auto flex flex-col items-center justify-center gap-1 rounded-full bg-[#1B365D] px-10 py-4 text-white overflow-hidden hover:bg-[#0F2440] transition-colors duration-500 shadow-xl shadow-[#1B365D]/20"
                                    >
                                        <span className="font-nunito font-bold text-[13px] uppercase tracking-[0.2em] relative z-10">{current.cta}</span>
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#40B4A6] relative z-10">{current.ctaSub}</span>
                                        {/* shine */}
                                        <motion.div animate={{ x: ["-150%", "150%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
                                    </button>
                                </Magnetic>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {current.benefits.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="group flex gap-6 p-6 rounded-2xl bg-white border border-[#1B365D]/5 hover:border-[#40B4A6]/30 hover:shadow-lg hover:shadow-[#40B4A6]/5 transition-all duration-500"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#1B365D]/10 flex items-center justify-center group-hover:bg-[#40B4A6] group-hover:border-[#40B4A6] transition-all duration-500">
                                        <svg className="w-4 h-4 text-[#1B365D]/30 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 16 16" strokeWidth={2.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-nunito font-black text-sm uppercase tracking-widest text-[#1B365D] mb-1">{b.title}</h4>
                                        <p className="font-lato font-light text-sm text-[#1B365D]/55 leading-relaxed">{b.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

// ─── PAGE SHELL ──────────────────────────────────────────────────────────────
export default function JoinSquadsPage() {
    const { t } = useI18n();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTrack, setActiveTrack] = useState<"expert" | "team">("expert");

    const handleApply = (track: "expert" | "team") => {
        setActiveTrack(track);
        setIsDrawerOpen(true);
    };

    return (
        <main
            id="main-scroll"
            className="relative h-screen overflow-y-auto overflow-x-hidden scrollbar-hide bg-[#F8FAFC]"
        >
            <FilmGrain opacity={0.02} />

            <SquadsHero onSelectTrack={(t) => handleApply(t)} />
            <PolesDeForce />
            <ExcellenceProtocol />
            <TrackSection onApply={handleApply} />

            <EliteSideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title={activeTrack === "expert" ? t("network.tracks.expert.cta") : t("network.tracks.team.cta")}
            />

            <FooterSection />
        </main>
    );
}

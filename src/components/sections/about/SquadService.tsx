"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { Users, Zap, Maximize2, Target, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const pillarConfig = [
    { icon: Users, isTeal: false },
    { icon: Zap, isTeal: true },
    { icon: Maximize2, isTeal: false },
    { icon: Target, isTeal: true },
];

export default function SquadService() {
    const { t } = useI18n();
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
            {/* Construction Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(#1B365D 1px, transparent 1px),
                            linear-gradient(90deg, #1B365D 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
            </div>

            <div className="container px-6 mx-auto relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold tracking-[0.3em] text-[#40B4A6] uppercase font-nunito mb-4 block"
                    >
                        {t("about.squad.eyebrow")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-[#1B365D] mb-6 font-nunito tracking-tight leading-[1.1]"
                    >
                        {t("about.squad.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#1B365D]/60 font-lato leading-relaxed"
                    >
                        {t("about.squad.subtitle")}
                    </motion.p>
                </div>

                {/* Bento Grid — Asymmetric Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                    {pillarConfig.map((config, index) => {
                        const Icon = config.icon;
                        const isLarge = index === 0 || index === 3;
                        const isTeal = config.isTeal;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                whileHover={{ y: -6 }}
                                className={cn(
                                    "group relative rounded-3xl overflow-hidden transition-all duration-500",
                                    isLarge && "md:col-span-2"
                                )}
                            >
                                <div className={cn(
                                    "relative p-8 lg:p-10 h-full border rounded-3xl transition-all duration-500",
                                    "bg-white/70 backdrop-blur-2xl",
                                    "border-[#1B365D]/[0.06]",
                                    "shadow-[0_8px_40px_rgba(27,54,93,0.04)]",
                                    "hover:shadow-[0_30px_80px_rgba(27,54,93,0.08)]",
                                    "hover:border-[#1B365D]/[0.1]",
                                    isLarge && "lg:flex lg:items-start lg:gap-12"
                                )}>
                                    {/* Background grid pattern on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden">
                                        <div className="absolute inset-0 opacity-[0.02]"
                                            style={{
                                                backgroundImage: `
                                                    linear-gradient(${isTeal ? "#40B4A6" : "#1B365D"} 1px, transparent 1px),
                                                    linear-gradient(90deg, ${isTeal ? "#40B4A6" : "#1B365D"} 1px, transparent 1px)
                                                `,
                                                backgroundSize: "30px 30px",
                                            }}
                                        />
                                    </div>

                                    <div className={cn("relative z-10", isLarge && "lg:flex-1")}>
                                        {/* Header row */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                                "group-hover:scale-110 group-hover:rotate-3",
                                                isTeal
                                                    ? "bg-[#40B4A6]/10 text-[#40B4A6]"
                                                    : "bg-[#1B365D]/5 text-[#1B365D]"
                                            )}>
                                                <Icon className="w-7 h-7" strokeWidth={1.5} />
                                            </div>
                                            <span className={cn(
                                                "text-[11px] font-black tracking-[0.15em] font-nunito",
                                                isTeal ? "text-[#40B4A6]" : "text-[#1B365D]/30"
                                            )}>
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl lg:text-2xl font-black text-[#1B365D] mb-3 font-nunito leading-tight">
                                            {t(`about.squad.pillars.${index}.title`)}
                                        </h3>
                                        <p className="text-[#1B365D]/60 font-lato leading-relaxed text-[15px]">
                                            {t(`about.squad.pillars.${index}.desc`)}
                                        </p>
                                    </div>

                                    {/* Large card: decorative visual */}
                                    {isLarge && (
                                        <div className="hidden lg:flex items-center justify-center lg:w-64 lg:h-48">
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                                    className="absolute w-40 h-40 rounded-full border border-dashed border-[#40B4A6]/20"
                                                />
                                                <motion.div
                                                    animate={{ rotate: -360 }}
                                                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                                    className="absolute w-28 h-28 rounded-full border border-dashed border-[#1B365D]/10"
                                                />
                                                {[0, 72, 144, 216, 288].map((angle, i) => {
                                                    const rad = (angle * Math.PI) / 180;
                                                    const x = Math.round((50 + 35 * Math.cos(rad)) * 100) / 100;
                                                    const y = Math.round((50 + 35 * Math.sin(rad)) * 100) / 100;
                                                    return (
                                                        <motion.div
                                                            key={i}
                                                            animate={{ scale: [1, 1.4, 1] }}
                                                            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                                            className="absolute w-3 h-3 rounded-full bg-[#40B4A6]/40"
                                                            style={{ left: `${x}%`, top: `${y}%` }}
                                                        />
                                                    );
                                                })}
                                                <div className="relative w-16 h-16 rounded-2xl bg-[#1B365D]/5 flex items-center justify-center">
                                                    <Users className="w-8 h-8 text-[#1B365D]/40" strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Performance Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-24"
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-6 py-3 rounded-full border border-[#40B4A6]/20 bg-[#40B4A6]/[0.04] backdrop-blur-sm"
                        >
                            <span className="text-[12px] font-bold tracking-[0.12em] text-[#40B4A6] uppercase font-nunito">
                                {t(`about.squad.badges.${index}`)}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Cycle Infographic */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden lg:block absolute top-[42px] left-[12%] right-[12%] h-px z-0">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                                className="w-full h-full origin-left"
                                style={{
                                    background: "linear-gradient(90deg, #1B365D20, #40B4A6, #1B365D20)",
                                }}
                            />
                        </div>

                        {[0, 1, 2, 3].map((index) => {
                            const isLast = index === 3;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.15 }}
                                    className="relative flex flex-col items-center text-center py-6 group"
                                >
                                    {/* Pulsing dot */}
                                    <div className="relative z-10 mb-5">
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                                            transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full bg-[#40B4A6]/20"
                                            style={{ margin: "-12px" }}
                                        />
                                        <div className={cn(
                                            "w-[64px] h-[64px] rounded-full flex items-center justify-center",
                                            "bg-white border-2 transition-all duration-500",
                                            "group-hover:scale-110 shadow-lg shadow-[#1B365D]/5",
                                            index === 0 || index === 2
                                                ? "border-[#1B365D]/10 group-hover:border-[#1B365D]/30"
                                                : "border-[#40B4A6]/20 group-hover:border-[#40B4A6]/50"
                                        )}>
                                            <span className="text-[14px] font-black font-nunito text-[#1B365D]">
                                                {t(`about.squad.cycle.${index}.label`)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step label */}
                                    <p className="text-[14px] font-black text-[#1B365D] font-nunito tracking-wide">
                                        {t(`about.squad.cycle.${index}.step`)}
                                    </p>

                                    {/* Arrow connector (not on last item) */}
                                    {!isLast && (
                                        <div className="hidden lg:flex absolute right-0 top-[42px] translate-x-1/2 z-10">
                                            <ArrowRight className="w-4 h-4 text-[#40B4A6]/50" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useRef } from "react";
import { Search, Users, Shield } from "lucide-react";
import LianetStamp from "@/components/ui/LianetStamp";


export default function SystemOS() {
    const { t } = useI18n();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const icons = [Search, Users, Shield];
    const accentColors = ["#1B365D", "#40B4A6", "#1B365D"];

    return (
        <section ref={ref} className="relative py-24 bg-white overflow-hidden" id="system-os">
            {/* Circuit Grid Background — reveals on scroll */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Vertical circuit lines */}
                {[15, 30, 50, 70, 85].map((pct, i) => (
                    <motion.div
                        key={`cv-${i}`}
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
                        className="absolute top-0 bottom-0 w-px origin-top"
                        style={{
                            left: `${pct}%`,
                            background: `linear-gradient(to bottom, transparent, rgba(27,54,93,0.04) 30%, rgba(27,54,93,0.04) 70%, transparent)`,
                        }}
                    />
                ))}
                {/* Horizontal circuit lines */}
                {[25, 50, 75].map((pct, i) => (
                    <motion.div
                        key={`ch-${i}`}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        className="absolute left-0 right-0 h-px origin-left"
                        style={{
                            top: `${pct}%`,
                            background: `linear-gradient(to right, transparent, rgba(64,180,166,0.06) 30%, rgba(64,180,166,0.06) 70%, transparent)`,
                        }}
                    />
                ))}
                {/* Junction dots */}
                {[
                    { top: "25%", left: "30%" },
                    { top: "50%", left: "50%" },
                    { top: "75%", left: "70%" },
                    { top: "25%", left: "70%" },
                    { top: "50%", left: "15%" },
                ].map((pos, i) => (
                    <motion.div
                        key={`dot-${i}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#40B4A6]/20"
                        style={pos}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <span className="text-[11px] font-black tracking-[0.2em] text-[#40B4A6] font-nunito">
                        {t("about.system.eyebrow")}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1B365D] font-nunito mt-4 tracking-[-0.03em]">
                        {t("about.system.title")}
                    </h2>
                    <p className="text-lg lg:text-xl text-[#1B365D]/60 font-lato font-light max-w-3xl mt-6 leading-relaxed">
                        {t("about.system.description")}
                    </p>
                </motion.div>

                {/* Capability Cards + Pictogram */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Cards Column */}
                    <div className="lg:col-span-7 space-y-6">
                        {[0, 1, 2].map((i) => {
                            const Icon = icons[i];
                            const capId = t(`about.system.capabilities.${i}.id`);
                            const capTitle = t(`about.system.capabilities.${i}.title`);
                            const capDesc = t(`about.system.capabilities.${i}.desc`);
                            return (
                                <motion.div
                                    key={capId}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.15 }}
                                    className="group relative p-8 border border-[#1B365D]/5 rounded-2xl bg-white hover:bg-[#F8FAFC] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(27,54,93,0.06)]"
                                >
                                    {/* Grid reveal on hover */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <pattern id={`grid-${capId}`} width="24" height="24" patternUnits="userSpaceOnUse">
                                                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(64,180,166,0.06)" strokeWidth="0.5" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill={`url(#grid-${capId})`} />
                                        </svg>
                                    </div>

                                    <div className="relative z-10 flex items-start gap-6">
                                        <div
                                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${accentColors[i]}08` }}
                                        >
                                            <Icon size={22} style={{ color: accentColors[i] }} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-[#1B365D] font-nunito mb-2">
                                                {capTitle}
                                            </h3>
                                            <p className="text-[#1B365D]/55 font-lato font-light leading-relaxed">
                                                {capDesc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Circular Stamp */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                            animate={isInView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
                            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                            className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px]"
                        >
                            <LianetStamp id="system-stamp" className="w-full h-full" />
                            {/* Slow rotating dashed border */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-dashed border-[#1B365D]/5"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

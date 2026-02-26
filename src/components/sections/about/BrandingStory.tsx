"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function BrandingStory() {
    const { t } = useI18n();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    return (
        <section id="story" className="relative py-24 lg:py-32 bg-white overflow-hidden" ref={containerRef}>
            {/* Background elements to add texture */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#40B4A6]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B365D]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Title & Eyebrow */}
                        <div className="lg:col-span-12 mb-8">
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="text-[10px] tracking-[0.3em] text-[#40B4A6] uppercase font-nunito mb-4"
                            >
                                {t("about.story.eyebrow")}
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1B365D] font-nunito leading-tight max-w-4xl"
                            >
                                {t("about.story.title")}
                            </motion.h2>
                        </div>

                        {/* Story Content Card */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="rounded-[40px] bg-white border border-[#1B365D]/5 p-10 lg:p-14 shadow-2xl shadow-[#1B365D]/5 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#40B4A6]/10 rounded-full blur-3xl group-hover:bg-[#40B4A6]/20 transition-colors duration-700" />

                                <p className="text-xl md:text-2xl text-[#1B365D]/70 font-lato leading-relaxed relative z-10">
                                    {t("about.story.content")}
                                </p>

                                <div className="mt-12 h-px w-full bg-gradient-to-r from-[#1B365D]/10 via-[#1B365D]/20 to-transparent" />

                                <blockquote className="mt-12">
                                    <p className="text-2xl md:text-3xl font-nunito font-bold text-[#1B365D] leading-tight italic">
                                        "{t("about.story.quote")}"
                                    </p>
                                </blockquote>
                            </motion.div>
                        </div>

                        {/* Abstract Visual / Branding Mark */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative w-full aspect-square max-w-md">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border border-dashed border-[#1B365D]/10"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-8 rounded-full border border-dashed border-[#40B4A6]/20"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-1/3 h-1/3 bg-[#1B365D] rounded-full blur-3xl opacity-10 animate-pulse" />
                                    <div className="text-8xl font-black text-[#1B365D]/5 select-none font-nunito">
                                        LN
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

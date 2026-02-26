"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function FoundersNote() {
    const { t } = useI18n();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const founders = [
        {
            id: "jg",
            name: t("about.founders.jean.name"),
            role: t("about.founders.jean.role"),
            bio: t("about.founders.jean.bio"),
            image: "/founder_jean.png"
        },
        {
            id: "bld",
            name: t("about.founders.barthelemy.name"),
            role: t("about.founders.barthelemy.role"),
            bio: t("about.founders.barthelemy.bio"),
            image: "/founder_barthelemy.png"
        }
    ];

    return (
        <section className="py-24 lg:py-32 bg-white" ref={containerRef}>
            <div className="container px-6 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-black text-[#1B365D] font-nunito mb-24 text-center"
                    >
                        {t("about.founders.title")}
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {founders.map((founder, idx) => (
                            <motion.div
                                key={founder.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: idx * 0.3, duration: 0.8 }}
                                className="flex flex-col md:flex-row gap-8 items-center md:items-start"
                            >
                                {/* Portrait Container */}
                                <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 group">
                                    <div className="absolute inset-0 rounded-2xl border border-[#1B365D]/10 overflow-hidden">
                                        <Image
                                            src={founder.image}
                                            alt={founder.name}
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute -inset-2 rounded-[24px] border border-[#40B4A6]/0 group-hover:border-[#40B4A6]/20 transition-all duration-500" />
                                </div>

                                {/* Text Content */}
                                <div className="text-center md:text-left pt-4">
                                    <h3 className="text-2xl font-bold text-[#1B365D] font-nunito mb-1">
                                        {founder.name}
                                    </h3>
                                    <p className="text-[10px] tracking-[0.2em] text-[#40B4A6] uppercase font-nunito mb-6">
                                        {founder.role}
                                    </p>
                                    <p className="text-[#1B365D]/70 font-lato leading-relaxed text-[15px] max-w-sm">
                                        {founder.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

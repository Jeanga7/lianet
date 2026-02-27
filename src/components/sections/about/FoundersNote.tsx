"use client";

import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useRef, useState } from "react";
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
            specialties: [
                t("about.founders.jean.specialties.0"),
                t("about.founders.jean.specialties.1"),
                t("about.founders.jean.specialties.2"),
            ],
            image: "/founder_jean.png"
        },
        {
            id: "bld",
            name: t("about.founders.barthelemy.name"),
            role: t("about.founders.barthelemy.role"),
            bio: t("about.founders.barthelemy.bio"),
            specialties: [
                t("about.founders.barthelemy.specialties.0"),
                t("about.founders.barthelemy.specialties.1"),
                t("about.founders.barthelemy.specialties.2"),
            ],
            image: "/founder_barthelemy.png"
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-[#1B365D]/5" ref={containerRef}>
            <div className="container px-6 mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Minimal header — system origin, not hero spotlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="text-center mb-16 md:text-left"
                    >
                        <span className="text-[10px] font-bold tracking-[0.3em] text-[#40B4A6] uppercase font-nunito mb-4 block">
                            {t("about.founders.eyebrow")}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1B365D] font-nunito tracking-tight">
                            {t("about.founders.title")}
                        </h2>
                    </motion.div>

                    {/* Two cards side by side — compact, cold */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {founders.map((founder, idx) => (
                            <FounderCard
                                key={founder.id}
                                founder={founder}
                                idx={idx}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface FounderCardProps {
    founder: {
        id: string;
        name: string;
        role: string;
        bio: string;
        specialties: string[];
        image: string;
    };
    idx: number;
    isInView: boolean;
}

function FounderCard({ founder, idx, isInView }: FounderCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="group p-8 border border-[#1B365D]/5 rounded-3xl bg-[#F8FAFC] hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#1B365D]/5"
        >
            <div className="flex items-center gap-6 mb-6">
                {/* Small portrait */}
                <div
                    className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden shadow-inner"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                    />
                    {/* Hover specialties */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[#1B365D]/90 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1.5 p-1"
                    >
                        {founder.specialties.map((spec, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 5 }}
                                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-[7px] tracking-[0.2em] text-white font-bold uppercase font-nunito"
                            >
                                {spec}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {/* Name & Role */}
                <div>
                    <h3 className="text-xl font-black text-[#1B365D] font-nunito mb-1">
                        {founder.name}
                    </h3>
                    <p className="text-[10px] tracking-[0.25em] text-[#40B4A6] font-bold uppercase font-nunito">
                        {founder.role}
                    </p>
                </div>
            </div>

            <p className="text-[#1B365D]/60 font-lato leading-relaxed text-[15px]">
                {founder.bio}
            </p>
        </motion.div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useI18n } from "@/lib/useI18n";
import Image from "next/image";
import { useEffect } from "react";
import { FilmGrain } from "@/components/sections";
import { Magnetic, EliteButton } from "@/components/ui/atoms";

interface PillarDeepDiveProps {
    activeId: string | null;
    onClose: () => void;
}

export default function PillarDeepDive({ activeId, onClose }: PillarDeepDiveProps) {
    const { t, tArray } = useI18n();

    // Bloquer le scroll du fond quand ouvert
    useEffect(() => {
        if (activeId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeId]);

    if (!activeId) return null;

    const content = {
        talent: {
            title: t("solutions.talent.title"),
            subtitle: t("solutions.talent.subtitle"),
            description: t("solutions.talent.description"),
            features: tArray("solutions.talent.features"),
            image: "/images/solutions/talent.png",
            detail: t("solutions.talent.detail")
        },
        strategy: {
            title: t("solutions.strategy.title"),
            subtitle: t("solutions.strategy.subtitle"),
            description: t("solutions.strategy.description"),
            features: tArray("solutions.strategy.features"),
            image: "/images/solutions/strategy.png",
            detail: t("solutions.strategy.detail")
        },
        lab: {
            title: t("solutions.lab.title"),
            subtitle: t("solutions.lab.subtitle"),
            description: t("solutions.lab.description"),
            features: tArray("solutions.lab.features"),
            image: "/images/solutions/lab.png",
            detail: t("solutions.lab.detail")
        }
    }[activeId as "talent" | "strategy" | "lab"];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-12"
                style={{
                    paddingTop: "max(1rem, env(safe-area-inset-top))",
                    paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
                    paddingLeft: "max(1rem, env(safe-area-inset-left))",
                    paddingRight: "max(1rem, env(safe-area-inset-right))"
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: "20%", opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: "20%", opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative flex h-full max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl sm:max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FilmGrain opacity={0.3} />

                    {/* Persistent Close Button */}
                    <div className="absolute right-6 top-6 z-50 lg:right-10 lg:top-10">
                        <Magnetic strength={15}>
                            <button
                                onClick={onClose}
                                className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-md transition-all hover:bg-black/20 lg:h-12 lg:w-12 lg:bg-[#1B365D]/5 lg:text-[#1B365D] lg:hover:bg-[#1B365D]/10"
                            >
                                <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 lg:h-6 lg:w-6" />
                            </button>
                        </Magnetic>
                    </div>

                    <div className="flex h-full flex-col lg:flex-row">
                        {/* Visual Part */}
                        <div className="relative h-[30%] w-full lg:h-full lg:w-2/5 overflow-hidden bg-[#1B365D]">
                            <Image
                                src={content.image}
                                alt={content.title}
                                fill
                                className="object-cover opacity-60 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D] lg:from-transparent lg:bg-gradient-to-r lg:to-transparent" />

                            <div className="absolute bottom-6 left-8 right-8 lg:bottom-12 lg:left-12">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#40B4A6] lg:text-[11px]">
                                    {content.subtitle}
                                </p>
                                <h3 className="mt-3 text-[2rem] font-extrabold leading-none text-white lg:mt-4 lg:text-[4rem]">
                                    {content.title.split(" ")[0]}<br />
                                    <span className="text-[#40B4A6]">{content.title.split(" ")[1]}</span>
                                </h3>
                            </div>
                        </div>

                        {/* Content Part */}
                        <div className="flex h-[70%] w-full flex-col overflow-y-auto lg:h-full lg:w-3/5 p-8 lg:p-16 scrollbar-hide text-center lg:text-left items-center lg:items-start">

                            <div className="mt-8 lg:mt-4">
                                <p className="text-lg font-medium leading-relaxed text-[#1B365D]/80 lg:text-xl">
                                    {content.description}
                                </p>

                                <p className="mt-8 font-lato text-[16px] leading-relaxed text-[#1B365D]/60 lg:text-[18px]">
                                    {content.detail}
                                </p>

                                <div className="mt-12 space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1B365D]">
                                        Points Clés du Protocole
                                    </h4>
                                    <div className="mx-auto lg:mx-0 w-fit">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
                                            {content.features.map((feature, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                    className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-[#1B365D]/5"
                                                >
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#40B4A6]/20 text-[#40B4A6]">
                                                        <Check className="h-3 w-3" strokeWidth={4} />
                                                    </div>
                                                    <span className="text-[14px] font-semibold text-[#1B365D]/70">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 border-t border-[#1B365D]/10 pt-12">
                                    <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                                        <div>
                                            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#1B365D]/40">
                                                Prêt à passer à l&apos;action ?
                                            </p>
                                            <p className="mt-1 text-lg font-bold text-[#1B365D]">Consultez notre expert dédié.</p>
                                        </div>
                                        <EliteButton
                                            onClick={() => {/* potential contact action */ }}
                                            arrow="right"
                                            className="h-14 px-6 py-0 text-[12px] tracking-[0.14em] whitespace-nowrap sm:h-auto sm:px-8 sm:py-4 sm:text-[13px] sm:tracking-[0.2em]"
                                        >
                                            {activeId === 'talent' ? 'Mobiliser une Squad' : activeId === 'strategy' ? 'Tracer la Vision' : 'Explorer le Futur'}
                                        </EliteButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

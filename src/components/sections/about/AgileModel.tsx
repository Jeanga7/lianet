"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { Search, Users, Crosshair, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgileModel() {
    const { t } = useI18n();

    const steps = [
        { icon: Search, accent: "#1B365D" },
        { icon: Users, accent: "#40B4A6" },
        { icon: Crosshair, accent: "#1B365D" },
        { icon: ShieldCheck, accent: "#40B4A6" },
    ];

    return (
        <section className="py-24 bg-[#F8FAFC] overflow-hidden" id="agile">
            <div className="container px-6 mx-auto">
                {/* Header */}
                <div className="max-w-3xl mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold tracking-[0.3em] text-[#40B4A6] uppercase font-nunito mb-4 block"
                    >
                        {t("about.model.eyebrow")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-[#1B365D] mb-8 font-nunito tracking-tight leading-[1.1]"
                    >
                        {t("about.model.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#1B365D]/60 font-lato leading-relaxed"
                    >
                        {t("about.model.description")}
                    </motion.p>
                </div>

                {/* 4-Step Protocol Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Horizontal Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[90px] left-[12%] right-[12%] h-px z-0">
                        <div className="w-full h-full bg-gradient-to-r from-[#1B365D]/15 via-[#40B4A6]/25 to-[#1B365D]/15" />
                    </div>

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isAccent = step.accent === "#40B4A6";
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="relative z-10 group"
                            >
                                <div className="p-8 lg:p-10 h-full bg-white border border-[#1B365D]/5 rounded-3xl shadow-[0_20px_50px_rgba(27,54,93,0.04)] transition-all duration-700 hover:shadow-[0_45px_100px_rgba(27,54,93,0.12)] group-hover:border-[#40B4A6]/20 group-hover:-translate-y-1">
                                    {/* Step Number Badge */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={cn(
                                            "text-[11px] font-black tracking-[0.15em] font-nunito",
                                            isAccent ? "text-[#40B4A6]" : "text-[#1B365D]/40"
                                        )}>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <div className={cn(
                                            "w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150",
                                            isAccent ? "bg-[#40B4A6]" : "bg-[#1B365D]/20"
                                        )} />
                                    </div>

                                    {/* Icon */}
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                                        isAccent ? "bg-[#40B4A6]/10 text-[#40B4A6]" : "bg-[#1B365D]/5 text-[#1B365D]"
                                    )}>
                                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl lg:text-2xl font-black text-[#1B365D] mb-4 font-nunito leading-tight">
                                        {t(`about.model.pillars.${index}.title`)}
                                    </h3>
                                    <p className="text-[#1B365D]/60 font-lato leading-relaxed text-[15px]">
                                        {t(`about.model.pillars.${index}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

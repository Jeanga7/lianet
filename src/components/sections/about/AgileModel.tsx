"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { ShieldCheck, Users, Zap, Search, Layers, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgileModel() {
    const { t } = useI18n();

    const pillars = [
        {
            id: "core",
            icon: ShieldCheck,
            processIcon: Search,
            processLabel: "SOURCING",
            color: "#1B365D"
        },
        {
            id: "squads",
            icon: Users,
            processIcon: Layers,
            processLabel: "ASSEMBLAGE",
            color: "#40B4A6"
        },
        {
            id: "impact",
            icon: Zap,
            processIcon: Rocket,
            processLabel: "LIVRAISON",
            color: "#1B365D"
        }
    ];

    return (
        <section className="py-32 bg-[#F8FAFC]">
            <div className="container px-6 mx-auto">
                <div className="max-w-3xl mb-24">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold tracking-[0.3em] text-[#1B365D]/40 uppercase font-nunito mb-4 block"
                    >
                        {t("about.model.eyebrow")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-[#1B365D] mb-8 font-nunito tracking-tight"
                    >
                        {t("about.model.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#1B365D]/60 font-lato"
                    >
                        {t("about.model.description")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection Lines (Desktop) */}
                    <div className="hidden md:block absolute top-[40%] left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-[#1B365D]/20 to-transparent z-0" />

                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        const ProcessIcon = pillar.processIcon;
                        return (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -5 }}
                                className="relative z-10 group"
                            >
                                <div className="p-8 h-full bg-white border border-[#1B365D]/5 rounded-3xl shadow-[0_20px_50px_rgba(27,54,93,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(27,54,93,0.08)]">
                                    {/* Process Tag */}
                                    <div className="flex items-center gap-2 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <ProcessIcon className="w-3.5 h-3.5 text-[#1B365D]" />
                                        <span className="text-[9px] font-bold tracking-[0.2em] text-[#1B365D] font-nunito">{pillar.processLabel}</span>
                                    </div>

                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                                        index === 1 ? "bg-[#40B4A6]/10 text-[#40B4A6]" : "bg-[#1B365D]/5 text-[#1B365D]"
                                    )}>
                                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-2xl font-black text-[#1B365D] mb-4 font-nunito">
                                        {t(`about.model.pillars.${index}.title`)}
                                    </h3>
                                    <p className="text-[#1B365D]/70 font-lato leading-relaxed">
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

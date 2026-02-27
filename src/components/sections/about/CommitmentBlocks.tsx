"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { CheckCircle2, Users } from "lucide-react";
import { EliteButton } from "@/components/ui/atoms";
import { useParams } from "next/navigation";

export default function CommitmentBlocks() {
    const { t } = useI18n();
    const params = useParams();
    const locale = params.locale as string;

    return (
        <section className="py-24 bg-white" id="engagements">
            <div className="container px-6 mx-auto">
                {/* Section Header */}
                <div className="max-w-3xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold tracking-[0.3em] text-[#40B4A6] uppercase font-nunito mb-4 block"
                    >
                        {t("about.commitments.eyebrow")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-[#1B365D] font-nunito tracking-tight"
                    >
                        {t("about.commitments.mainTitle")}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Client Commitment */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative p-12 lg:p-16 bg-[#1B365D] rounded-[40px] text-white overflow-hidden border border-white/10"
                    >
                        {/* Grid Pattern — reveals on hover */}
                        <div className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid-client" width="28" height="28" patternUnits="userSpaceOnUse">
                                        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(64,180,166,0.08)" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-client)" />
                            </svg>
                        </div>

                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle2 className="w-24 h-24" />
                        </div>

                        <div className="relative z-10">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase font-nunito mb-2 block">
                                CÔTÉ CLIENT
                            </span>
                            <p className="text-[13px] tracking-[0.1em] text-[#40B4A6]/80 uppercase font-nunito mb-8">
                                {t("about.commitments.client.subtitle")}
                            </p>
                            <h3 className="text-3xl lg:text-4xl font-black mb-8 font-nunito leading-tight">
                                {t("about.commitments.client.title")}
                            </h3>

                            <ul className="space-y-4 mb-12">
                                {[0, 1, 2].map((idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-base lg:text-lg text-white/80 font-lato">
                                        <CheckCircle2 className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                                        {t(`about.commitments.client.bullets.${idx}`)}
                                    </li>
                                ))}
                            </ul>

                            <EliteButton
                                variant="secondary"
                                className="bg-white text-[#1B365D] hover:bg-white/90 border-none shadow-xl shadow-black/10 min-w-[240px]"
                                onClick={() => window.location.href = `/${locale}/solutions`}
                            >
                                EXPLORER LES SOLUTIONS
                            </EliteButton>
                        </div>
                    </motion.div>

                    {/* Freelance Commitment */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative p-12 lg:p-16 bg-[#F8FAFC] border border-[#1B365D]/5 rounded-[40px] text-[#1B365D] overflow-hidden"
                    >
                        {/* Grid Pattern — reveals on hover */}
                        <div className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid-freelance" width="28" height="28" patternUnits="userSpaceOnUse">
                                        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(27,54,93,0.04)" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-freelance)" />
                            </svg>
                        </div>

                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users className="w-24 h-24" />
                        </div>

                        <div className="relative z-10">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-[#1B365D]/30 uppercase font-nunito mb-2 block">
                                CÔTÉ FREELANCE
                            </span>
                            <p className="text-[13px] tracking-[0.1em] text-[#40B4A6] uppercase font-nunito mb-8">
                                {t("about.commitments.freelance.subtitle")}
                            </p>
                            <h3 className="text-3xl lg:text-4xl font-black mb-8 font-nunito leading-tight">
                                {t("about.commitments.freelance.title")}
                            </h3>

                            <ul className="space-y-4 mb-12">
                                {[0, 1, 2].map((idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-base lg:text-lg text-[#1B365D]/70 font-lato">
                                        <CheckCircle2 className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                                        {t(`about.commitments.freelance.bullets.${idx}`)}
                                    </li>
                                ))}
                            </ul>

                            <EliteButton
                                variant="primary"
                                className="min-w-[240px]"
                                onClick={() => window.location.href = `/${locale}/network`}
                            >
                                REJOINDRE LE RÉSEAU
                            </EliteButton>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

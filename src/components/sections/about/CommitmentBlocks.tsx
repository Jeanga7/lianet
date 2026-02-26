"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CommitmentBlocks() {
    const { t } = useI18n();
    const params = useParams();
    const locale = params.locale as string;

    return (
        <section className="py-20 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container px-6 mx-auto">
                {/* Client Commitment */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group relative p-12 md:p-20 bg-[#1B365D] rounded-[40px] text-white overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckCircle2 className="w-32 h-32" />
                    </div>

                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase font-nunito mb-6 block">
                        CÔTÉ CLIENT
                    </span>
                    <h3 className="text-4xl md:text-5xl font-black mb-8 font-nunito leading-tight">
                        {t("about.commitments.client.title")}
                    </h3>

                    <ul className="space-y-6 mb-12">
                        {[0, 1, 2].map((idx) => (
                            <li key={idx} className="flex items-center gap-4 text-lg text-white/80 font-lato">
                                <CheckCircle2 className="w-6 h-6 text-[#40B4A6]" />
                                {t(`about.commitments.client.bullets.${idx}`)}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href={`/${locale}/solutions`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1B365D] font-bold rounded-full transition-transform hover:scale-105 active:scale-95 font-nunito"
                    >
                        EXPLORER LES SOLUTIONS
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Freelance Commitment */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group relative p-12 md:p-20 bg-[#F8FAFC] border border-[#1B365D]/5 rounded-[40px] text-[#1B365D] overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Users className="w-32 h-32" />
                    </div>

                    <span className="text-[10px] font-bold tracking-[0.3em] text-[#1B365D]/30 uppercase font-nunito mb-6 block">
                        CÔTÉ FREELANCE
                    </span>
                    <h3 className="text-4xl md:text-5xl font-black mb-8 font-nunito leading-tight">
                        {t("about.commitments.freelance.title")}
                    </h3>

                    <ul className="space-y-6 mb-12">
                        {[0, 1, 2].map((idx) => (
                            <li key={idx} className="flex items-center gap-4 text-lg text-[#1B365D]/70 font-lato">
                                <CheckCircle2 className="w-6 h-6 text-[#40B4A6]" />
                                {t(`about.commitments.freelance.bullets.${idx}`)}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href={`/${locale}/network`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1B365D] text-white font-bold rounded-full transition-transform hover:scale-105 active:scale-95 font-nunito hover:bg-[#1B365D]/90"
                    >
                        REJOINDRE LE RÉSEAU
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

// Add Users icon to import since it was missing in my thought but I used it in JSX
import { Users } from "lucide-react";

"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { EliteButton } from "@/components/ui";
import { appRoutes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { localizePathname } from "@/lib/locale";

export default function JoinNetwork() {
    const { t, locale } = useI18n();
    const router = useRouter();

    const methodology = [
        { step: t("network.join.methodology.0.step"), desc: t("network.join.methodology.0.desc") },
        { step: t("network.join.methodology.1.step"), desc: t("network.join.methodology.1.desc") },
        { step: t("network.join.methodology.2.step"), desc: t("network.join.methodology.2.desc") },
    ];

    return (
        <section className="relative w-full px-6 py-24 sm:px-8 lg:px-14 bg-[#1B365D] text-[#F8FAFC] overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-repeat" />

            <div className="relative z-10 mx-auto max-w-[1600px] grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="font-nunito text-4xl font-extrabold lg:text-5xl leading-tight">
                        {t("network.join.title")}
                    </h2>
                    <p className="mt-6 text-xl text-[#F8FAFC]/80 font-lato leading-relaxed">
                        {t("network.join.description")}
                    </p>

                    <div className="mt-12 space-y-8">
                        {methodology.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="flex gap-6"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-bold text-[#40B4A6]">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="font-nunito font-bold text-lg">{item.step}</h4>
                                    <p className="text-[#F8FAFC]/60 text-sm mt-1">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-[#40B4A6]/10 blur-3xl rounded-full" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative p-8 lg:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl text-center"
                    >
                        <h3 className="font-nunito text-2xl font-bold mb-4">
                            {t("manifeste.formTitle")}
                        </h3>
                        <p className="text-white/60 mb-10 text-sm">
                            Notre processus de sélection est rigoureux pour maintenir l'excellence de notre collectif.
                        </p>

                        <EliteButton
                            variant="primary"
                            className="w-full"
                            onClick={() => router.push(localizePathname(appRoutes.contact, locale))}
                        >
                            {t("network.join.cta")}
                        </EliteButton>

                        <p className="mt-8 text-[10px] uppercase tracking-widest text-white/30">
                            Elite Access Only • Responses within 48h
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

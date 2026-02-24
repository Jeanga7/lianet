"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { cn } from "@/lib/utils";

export default function ExpertShowcase() {
    const { t, locale } = useI18n();

    // We use a simplified mapping for the showcase profiles from messages.ts
    // In a real app, this would come from a CMS or structured data
    const profiles = [
        { role: t("network.showcase.profiles.0.role"), expertise: t("network.showcase.profiles.0.expertise"), index: 0 },
        { role: t("network.showcase.profiles.1.role"), expertise: t("network.showcase.profiles.1.expertise"), index: 1 },
        { role: t("network.showcase.profiles.2.role"), expertise: t("network.showcase.profiles.2.expertise"), index: 2 },
    ];

    return (
        <section className="relative w-full px-6 py-24 sm:px-8 lg:px-14">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-16">
                    <h2 className="font-nunito text-3xl font-bold text-[#1B365D] lg:text-4xl">
                        {t("network.showcase.title")}
                    </h2>
                    <p className="mt-4 max-w-2xl font-lato text-lg text-[#1B365D]/70">
                        {t("network.showcase.description")}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {profiles.map((profile, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group relative overflow-hidden rounded-3xl border border-[#1B365D]/10 bg-white p-8 transition-all hover:border-[#40B4A6]/30 hover:shadow-xl hover:shadow-[#40B4A6]/5"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
                                <span className="text-6xl font-black text-[#1B365D]">0{idx + 1}</span>
                            </div>

                            <h3 className="relative z-10 font-nunito text-xl font-bold text-[#1B365D]">
                                {profile.role}
                            </h3>
                            <p className="relative z-10 mt-2 font-lato text-sm font-medium uppercase tracking-wider text-[#40B4A6]">
                                {profile.expertise}
                            </p>

                            <div className="mt-8 h-1 w-12 bg-[#40B4A6]/20 transition-all group-hover:w-full group-hover:bg-[#40B4A6]/40" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { Check } from "lucide-react";
import { EliteButton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TrackContentProps {
    track: "expert" | "team";
    onApply: () => void;
}

export default function TrackContent({ track, onApply }: TrackContentProps) {
    const { t } = useI18n();

    const data = track === "expert" ? {
        title: t("network.tracks.expert.title"),
        description: t("network.tracks.expert.description"),
        benefits: [
            { title: t("network.tracks.expert.benefits.0.title"), desc: t("network.tracks.expert.benefits.0.desc") },
            { title: t("network.tracks.expert.benefits.1.title"), desc: t("network.tracks.expert.benefits.1.desc") },
            { title: t("network.tracks.expert.benefits.2.title"), desc: t("network.tracks.expert.benefits.2.desc") },
        ],
        cta: t("network.tracks.expert.cta"),
    } : {
        title: t("network.tracks.team.title"),
        description: t("network.tracks.team.description"),
        benefits: [
            { title: t("network.tracks.team.benefits.0.title"), desc: t("network.tracks.team.benefits.0.desc") },
            { title: t("network.tracks.team.benefits.1.title"), desc: t("network.tracks.team.benefits.1.desc") },
            { title: t("network.tracks.team.benefits.2.title"), desc: t("network.tracks.team.benefits.2.desc") },
        ],
        cta: t("network.tracks.team.cta"),
    };

    return (
        <motion.div
            key={track}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl mx-auto px-6 py-20"
        >
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <motion.h2
                        layoutId="track-title"
                        className="font-nunito text-4xl lg:text-5xl font-extrabold text-[#1B365D] tracking-tight"
                    >
                        {data.title}
                    </motion.h2>
                    <p className="font-lato text-xl text-[#1B365D]/70 leading-relaxed">
                        {data.description}
                    </p>

                    <div className="pt-6">
                        <EliteButton
                            variant="primary"
                            className="bg-[#1B365D] text-white overflow-hidden group"
                            onClick={onApply}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {data.cta}
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                        </EliteButton>
                    </div>
                </div>

                <div className="grid gap-6">
                    {data.benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl bg-white border border-[#1B365D]/5 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#40B4A6]/10 flex items-center justify-center text-[#40B4A6] group-hover:bg-[#40B4A6] group-hover:text-white transition-colors duration-500">
                                    <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-nunito font-bold text-[#1B365D] uppercase text-xs tracking-widest mb-1">
                                        {benefit.title}
                                    </h4>
                                    <p className="font-lato text-[#1B365D]/60 text-sm leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Ambient Background Glow matching the track */}
            <div className={cn(
                "absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-[120px] pointer-events-none transition-colors duration-1000",
                track === "expert" ? "bg-[#40B4A6]/10" : "bg-[#1B365D]/10"
            )} />
        </motion.div>
    );
}

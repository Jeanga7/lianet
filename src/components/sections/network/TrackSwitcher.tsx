"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { cn } from "@/lib/utils";

interface TrackSwitcherProps {
    activeTrack: "expert" | "team";
    onTrackChange: (track: "expert" | "team") => void;
}

export default function TrackSwitcher({ activeTrack, onTrackChange }: TrackSwitcherProps) {
    const { t } = useI18n();

    const tracks = [
        { id: "expert" as const, label: t("network.selector.expert.label"), tagline: t("network.selector.expert.tagline") },
        { id: "team" as const, label: t("network.selector.team.label"), tagline: t("network.selector.team.tagline") },
    ];

    return (
        <div className="sticky top-24 z-40 mx-auto max-w-2xl px-6 py-8">
            <div className="relative flex p-1.5 rounded-full bg-white/40 border border-[#1B365D]/5 backdrop-blur-xl shadow-2xl shadow-[#1B365D]/5">
                {tracks.map((track) => {
                    const isActive = activeTrack === track.id;
                    return (
                        <button
                            key={track.id}
                            onClick={() => onTrackChange(track.id)}
                            className={cn(
                                "relative flex-1 py-4 px-6 rounded-full transition-all duration-500 outline-none",
                                isActive ? "text-white" : "text-[#1B365D]/60 hover:text-[#1B365D]"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-track-pill"
                                    className="absolute inset-0 bg-[#1B365D] rounded-full"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                />
                            )}
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-sm font-bold tracking-tight font-nunito">
                                    {track.label}
                                </span>
                                <span className={cn(
                                    "text-[10px] uppercase tracking-widest font-bold mt-0.5 transition-opacity",
                                    isActive ? "opacity-40" : "opacity-0"
                                )}>
                                    {track.tagline}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Visual Indicator of the morphing power */}
            <motion.div
                animate={{
                    x: activeTrack === "expert" ? "-25%" : "25%",
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#40B4A6]/30 blur-sm rounded-full pointer-events-none"
            />
        </div>
    );
}

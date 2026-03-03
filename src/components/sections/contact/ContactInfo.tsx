"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Clock } from "lucide-react";

interface ContactInfoProps {
    dictionary: any;
}

export function ContactInfo({ dictionary }: ContactInfoProps) {
    const items = [
        {
            icon: MapPin,
            label: dictionary.info.location,
            desc: dictionary.info.hub
        },
        {
            icon: Mail,
            label: "EMAIL",
            desc: dictionary.info.email
        },
        {
            icon: Globe,
            label: "COVERAGE",
            desc: "Dakar & Remote International"
        }
    ];

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
                {items.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B365D]/5 text-[#1B365D]/40 group-hover:bg-[#40B4A6]/10 group-hover:text-[#40B4A6] transition-colors">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-nunito text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B365D]/40">
                                    {item.label}
                                </p>
                                <p className="mt-1 font-lato text-[16px] font-medium text-[#1B365D]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-3xl bg-[#1B365D] p-8 text-white shadow-xl shadow-[#1B365D]/20 overflow-hidden relative"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Clock className="h-24 w-24 -rotate-12" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative h-2 w-2">
                            <div className="absolute inset-0 rounded-full bg-[#40B4A6] animate-ping" />
                            <div className="relative h-2 w-2 rounded-full bg-[#40B4A6]" />
                        </div>
                        <span className="font-nunito text-[11px] font-bold uppercase tracking-widest text-[#40B4A6]">
                            {dictionary.info.status}
                        </span>
                    </div>
                    <p className="mt-6 font-nunito text-2xl font-extrabold leading-tight">
                        {dictionary.info.responseTime}
                    </p>
                    <p className="mt-3 font-lato text-[14px] text-white/60">
                        Standard d'Elite : Transmission & Diagnostic sous 24h.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FilmGrain, FooterSection } from "@/components/sections";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

interface ContactPortalProps {
    dictionary: any;
    locale: string;
}

export function ContactPortal({ dictionary, locale }: ContactPortalProps) {
    const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");

    const handleSuccess = () => {
        setStatus("success");
    };

    return (
        <main
            id="main-scroll"
            className="relative h-screen overflow-y-auto overflow-x-hidden lg:overflow-y-scroll scrollbar-hide bg-[#F8FAFC]"
        >
            <FilmGrain opacity={0.04} />

            {/* Background Grid Pattern */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: "radial-gradient(#1B365D 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            <section className="relative z-10 w-full px-6 pb-20 pt-32 sm:px-8 lg:px-14 lg:pt-40">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 lg:mb-20">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-nunito text-[11px] font-bold uppercase tracking-[0.3em] text-[#1B365D]/55"
                        >
                            {dictionary.hero.eyebrow}
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-6 font-nunito text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em] text-[#1B365D] leading-[1.1]"
                        >
                            {dictionary.hero.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 max-w-2xl font-lato text-[18px] leading-relaxed text-[#1B365D]/75 lg:text-[21px]"
                        >
                            {dictionary.hero.subtitle}
                        </motion.p>
                    </div>

                    <div className="grid gap-16 lg:grid-cols-[1fr_350px] lg:gap-24">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {status !== "success" ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <ContactForm
                                            dictionary={dictionary}
                                            onSuccess={handleSuccess}
                                            isTransmitting={status === "transmitting"}
                                            setIsTransmitting={(val: boolean) => setStatus(val ? "transmitting" : "idle")}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-start rounded-[2.5rem] border border-[#1B365D]/10 bg-white/60 p-10 backdrop-blur-xl lg:p-16 shadow-2xl shadow-[#1B365D]/5"
                                    >
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#40B4A6]/10 text-[#40B4A6] mb-8">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                            >
                                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <h2 className="font-nunito text-4xl font-extrabold text-[#1B365D]">
                                            {dictionary.form.success.title}
                                        </h2>
                                        <p className="mt-6 font-lato text-xl text-[#1B365D]/70 max-w-md">
                                            {dictionary.form.success.message}
                                        </p>
                                        <button
                                            onClick={() => window.location.href = `/${locale}`}
                                            className="mt-12 group flex items-center gap-3 font-nunito text-sm font-bold uppercase tracking-widest text-[#1B365D] hover:text-[#40B4A6] transition-colors"
                                        >
                                            {dictionary.form.success.cta}
                                            <div className="h-px w-8 bg-[#1B365D]/20 group-hover:w-12 group-hover:bg-[#40B4A6]/50 transition-all" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <aside className="lg:pt-4">
                            <ContactInfo dictionary={dictionary} />
                        </aside>
                    </div>
                </div>
            </section>

            <FooterSection />
        </main>
    );
}

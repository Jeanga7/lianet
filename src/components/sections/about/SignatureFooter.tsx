"use client";

import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/useI18n";
import { useRef } from "react";
import Image from "next/image";

export default function SignatureFooter() {
    const { t } = useI18n();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <section ref={ref} className="relative py-20 lg:py-28 bg-white">
            {/* Top Separator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#1B365D]/20 to-transparent" />

            <div className="container px-6 mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-2xl md:text-3xl lg:text-4xl font-nunito font-bold text-[#1B365D]/80 leading-[1.3] italic">
                            &laquo; {t("about.signature.quote")} &raquo;
                        </p>
                        <footer className="mt-8">
                            <cite className="text-[11px] tracking-[0.3em] text-[#1B365D]/40 uppercase font-nunito not-italic">
                                — {t("about.signature.author")}
                            </cite>
                        </footer>
                    </motion.blockquote>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-10 text-[10px] tracking-[0.4em] text-[#40B4A6]/60 uppercase font-nunito"
                    >
                        {t("about.signature.tagline")}
                    </motion.p>

                    {/* Pictogram replaces LN */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-8 flex justify-center"
                    >
                        <div className="relative w-14 h-14 opacity-10">
                            <Image
                                src="/pictogram-lianet.png"
                                alt="Lianet"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

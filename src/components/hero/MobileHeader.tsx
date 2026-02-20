"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/useI18n";
import { localizePathname } from "@/lib/locale";

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    const { locale } = useI18n();
    const [isVisible, setIsVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const getScroller = () => document.getElementById("main-scroll");
        let lastY = getScroller() ? (getScroller() as HTMLElement).scrollTop : window.scrollY;
        let ticking = false;
        let rafId: number | null = null;

        const readY = () => {
            const scroller = getScroller() as HTMLElement | null;
            return scroller ? scroller.scrollTop : window.scrollY;
        };
        const onScroll = () => {
            const currentY = readY();

            if (ticking) return;
            ticking = true;

            rafId = window.requestAnimationFrame(() => {
                const delta = currentY - lastY;

                // On évite les variations infimes
                if (Math.abs(delta) > 1 || currentY <= 8) {
                    setScrolled(currentY > 20);

                    if (currentY <= 8) {
                        setIsVisible(true);
                    } else if (delta > 3) { // Scroll vers le bas -> Cacher
                        setIsVisible(false);
                    } else if (delta < -1) { // Scroll vers le haut -> Montrer (Instagram Style)
                        setIsVisible(true);
                    }
                }

                lastY = currentY;
                ticking = false;
            });
        };

        const scroller = getScroller() as HTMLElement | null;
        if (scroller) {
            scroller.addEventListener("scroll", onScroll, { passive: true });
        }
        // Fallback robuste: capte aussi les scroll events même si le conteneur change/monte après
        window.addEventListener("scroll", onScroll, { capture: true, passive: true });

        const initialRafId = window.requestAnimationFrame(onScroll);

        return () => {
            window.cancelAnimationFrame(initialRafId);
            if (rafId) window.cancelAnimationFrame(rafId);
            if (scroller) {
                scroller.removeEventListener("scroll", onScroll);
            }
            window.removeEventListener("scroll", onScroll, { capture: true });
        };
    }, []);

    return (
        <div className="fixed inset-x-0 top-0 z-[70] lg:hidden pointer-events-none">
            <motion.div
                className="flex items-center justify-between px-6 pt-6"
                initial={false}
                animate={{
                    y: isVisible ? 0 : -32,
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.95,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Logo - Totalement transparent avec un Blur puissant (24px) et coins arrondis (16px) */}
                <motion.div
                    className="pointer-events-auto flex items-center justify-center p-2"
                    style={{
                        backdropFilter: isVisible ? "blur(24px)" : "blur(0px)",
                        WebkitBackdropFilter: isVisible ? "blur(24px)" : "blur(0px)",
                        backgroundColor: "rgba(255, 255, 255, 0)", // 100% Transparent
                        borderRadius: "16px",
                        border: scrolled ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                >
                    <Link href={localizePathname("/", locale)} className="relative block h-9 w-auto">
                        <Image
                            src="/logo-lianet-ori.svg"
                            alt="Lianet"
                            width={128}
                            height={42}
                            className="h-full w-auto"
                            priority
                        />
                    </Link>
                </motion.div>

                {/* Menu Button - Floating Glass avec fond adaptatif */}
                <motion.button
                    onClick={onMenuClick}
                    className={cn(
                        "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                        scrolled
                            ? "bg-[#1B365D]/90 text-white shadow-lg shadow-[#1B365D]/20 backdrop-blur-md"
                            : "bg-white/10 text-[#1B365D] backdrop-blur-md border border-[#1B365D]/10"
                    )}
                    whileTap={{ scale: 0.92 }}
                >
                    <Menu className="h-5 w-5" strokeWidth={1.5} />
                </motion.button>
            </motion.div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

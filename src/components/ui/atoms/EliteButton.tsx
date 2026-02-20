"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, LucideIcon } from "lucide-react";
import { Magnetic } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";

interface EliteButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary";
    icon?: LucideIcon;
    arrow?: "up-right" | "right" | "none";
    strength?: number;
}

export default function EliteButton({
    children,
    onClick,
    className,
    variant = "primary",
    icon: Icon,
    arrow = "up-right",
    strength = 20,
}: EliteButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <Magnetic strength={strength}>
            <button
                onClick={onClick}
                className={cn(
                    "group relative inline-flex items-center justify-center gap-4 rounded-full px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] transition-all w-full lg:w-auto",
                    isPrimary
                        ? "bg-[#1B365D] text-white shadow-xl shadow-[#1B365D]/20 hover:bg-[#0F2440] hover:shadow-2xl"
                        : "bg-white/10 text-[#1B365D] backdrop-blur-md border border-[#1B365D]/10 hover:bg-white/20",
                    className
                )}
            >
                <span className="relative z-10">{children}</span>
                {arrow !== "none" && (
                    <div className={cn(
                        "relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
                        isPrimary ? "bg-[#40B4A6] text-[#1B365D]" : "bg-[#1B365D] text-white"
                    )}>
                        {arrow === "up-right" ? (
                            <ArrowUpRight className="h-4 w-4" />
                        ) : (
                            <ArrowRight className="h-4 w-4" />
                        )}
                    </div>
                )}
                {Icon && !arrow && (
                    <Icon className="relative z-10 h-4 w-4" />
                )}
            </button>
        </Magnetic>
    );
}

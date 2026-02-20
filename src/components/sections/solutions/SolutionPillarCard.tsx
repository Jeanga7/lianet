"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { EliteButton } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";

interface SolutionPillarCardProps {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    cta: string;
    index: number;
    reverse?: boolean;
    onOpenDetail?: () => void;
}

export default function SolutionPillarCard({
    image,
    title,
    subtitle,
    description,
    features,
    cta,
    index,
    reverse,
    onOpenDetail,
}: SolutionPillarCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
            className={cn(
                "flex flex-col gap-16 lg:gap-24",
                reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            )}
        >
            {/* Visual Content */}
            <div className="relative aspect-[4/3] w-full lg:w-1/2 overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-[#1B365D]/5 group">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    className="h-full w-full"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>

                {/* Glass Overlay on Hover */}
                <div className="absolute inset-0 bg-[#1B365D]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Elite Scan Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#40B4A6]/20 to-transparent -translate-y-[100%] group-hover:translate-y-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
            </div>

            {/* Text Content */}
            <div className="flex w-full flex-col justify-center text-center lg:text-left lg:w-1/2">
                <h2 className="font-nunito text-[32px] font-extrabold tracking-tight text-[#1B365D] sm:text-[42px] lg:text-[48px] leading-[1.1]">
                    {title}
                </h2>

                <p className="mt-4 font-nunito text-[14px] font-bold uppercase tracking-[0.2em] text-[#40B4A6]">
                    {subtitle}
                </p>

                <p className="mt-8 font-lato text-[17px] leading-relaxed text-[#1B365D]/70 lg:text-[19px]">
                    {description}
                </p>

                {/* Feature List */}
                <div className="mt-10 mx-auto lg:mx-0 w-fit">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#40B4A6]/10 text-[#40B4A6]">
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                </div>
                                <span className="font-lato text-[15px] font-medium text-[#1B365D]/80">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action */}
                <div className="mt-12 flex justify-center lg:justify-start">
                    <EliteButton
                        onClick={onOpenDetail}
                        className="h-14 px-6 py-0 text-[12px] tracking-[0.14em] whitespace-nowrap sm:h-auto sm:px-8 sm:py-4 sm:text-[13px] sm:tracking-[0.2em]"
                    >
                        {cta}
                    </EliteButton>
                </div>
            </div>
        </motion.div>
    );
}

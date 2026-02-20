"use client";

import { useI18n } from "@/lib/useI18n";
import SolutionPillarCard from "@/components/sections/solutions/SolutionPillarCard";

export default function SolutionPolesGrid({
    onOpenDetail,
}: {
    onOpenDetail: (id: string) => void;
}) {
    const { t, tArray } = useI18n();

    const pillars = [
        {
            id: "talent",
            image: "/images/solutions/talent.png",
            href: "/solutions/talent",
            title: t("solutions.talent.title"),
            subtitle: t("solutions.talent.subtitle"),
            description: t("solutions.talent.description"),
            features: tArray("solutions.talent.features"),
            cta: t("solutions.talent.cta"),
        },
        {
            id: "strategy",
            image: "/images/solutions/strategy.png",
            href: "/solutions/strategy",
            title: t("solutions.strategy.title"),
            subtitle: t("solutions.strategy.subtitle"),
            description: t("solutions.strategy.description"),
            features: tArray("solutions.strategy.features"),
            cta: t("solutions.strategy.cta"),
            reverse: true,
        },
        {
            id: "lab",
            image: "/images/solutions/lab.png",
            href: "/solutions/lab",
            title: t("solutions.lab.title"),
            subtitle: t("solutions.lab.subtitle"),
            description: t("solutions.lab.description"),
            features: tArray("solutions.lab.features"),
            cta: t("solutions.lab.cta"),
        },
    ];

    return (
        <section className="relative w-full px-6 py-20 sm:px-8 lg:px-14">
            <div className="mx-auto max-w-[1600px] space-y-40 lg:space-y-48">
                {pillars.map((pillar, index) => (
                    <SolutionPillarCard
                        key={pillar.id}
                        {...pillar}
                        index={index}
                        onOpenDetail={() => onOpenDetail(pillar.id)}
                    />
                ))}
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { useI18n } from "@/lib/useI18n";
import { FilmGrain, FooterSection } from "@/components/sections";
import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionPolesGrid from "@/components/sections/solutions/SolutionPolesGrid";
import PillarDeepDive from "@/components/sections/solutions/PillarDeepDive";

export default function SolutionsHub() {
    const { t } = useI18n();
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

    const handleOpenDetail = (id: string) => {
        setSelectedPillar(id);
    };

    const handleClose = () => {
        setSelectedPillar(null);
    };

    return (
        <main
            id="main-scroll"
            className="relative h-screen overflow-y-auto overflow-x-hidden lg:overflow-y-scroll scrollbar-hide bg-[#F8FAFC]"
        >
            <FilmGrain opacity={0.4} />

            {/* Hero Section */}
            <SolutionsHero />

            {/* Pillars Grid */}
            <SolutionPolesGrid onOpenDetail={handleOpenDetail} />

            {/* Deep Dive Overlay */}
            <PillarDeepDive activeId={selectedPillar} onClose={handleClose} />

            {/* Footer Section */}
            <FooterSection />
        </main>
    );
}

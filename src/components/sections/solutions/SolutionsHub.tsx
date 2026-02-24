"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useI18n } from "@/lib/useI18n";
import { FilmGrain, FooterSection } from "@/components/sections";
import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionPolesGrid from "@/components/sections/solutions/SolutionPolesGrid";
import PillarDeepDive from "@/components/sections/solutions/PillarDeepDive";

function SolutionsHubContent() {
    const { t } = useI18n();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

    // Initial check for deep link
    useEffect(() => {
        const p = searchParams.get("p");
        if (p && ["talent", "strategy", "lab"].includes(p)) {
            setSelectedPillar(p);
        }
    }, [searchParams]);

    const handleOpenDetail = (id: string) => {
        setSelectedPillar(id);
        const params = new URLSearchParams(searchParams.toString());
        params.set("p", id);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleClose = () => {
        setSelectedPillar(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("p");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <main
            id="main-scroll"
            className="relative h-screen overflow-y-auto overflow-x-hidden lg:overflow-y-scroll scrollbar-hide bg-[#F8FAFC]"
        >
            <FilmGrain opacity={0.02} />

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

export default function SolutionsHub() {
    return (
        <Suspense fallback={null}>
            <SolutionsHubContent />
        </Suspense>
    );
}

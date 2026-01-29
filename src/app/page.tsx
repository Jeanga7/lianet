import HeroSection from "@/components/hero/HeroSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import ManifesteSection from "@/components/sections/ManifesteSection";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto lg:overflow-y-scroll snap-none lg:snap-y lg:snap-mandatory scroll-smooth scrollbar-hide">
      <section id="hero" className="h-screen w-full lg:w-[calc(100%-5rem)] lg:ml-20 lg:snap-start lg:snap-always flex-shrink-0">
        <HeroSection />
      </section>
      {/* Transition de couleur douce */}
      <div className="lg:hidden h-8 bg-gradient-to-b from-white to-[#1B365D]/5" />
      <section id="expertise" className="h-auto min-h-screen w-full lg:w-[calc(100%-5rem)] lg:ml-20 lg:h-dvh lg:snap-start lg:snap-always flex-shrink-0">
        <ExpertiseSection />
      </section>
      {/* Transition de couleur douce */}
      <div className="lg:hidden h-8 bg-gradient-to-b from-[#1B365D]/5 to-white" />

      {/* Section Manifeste */}
      <ManifesteSection />
    </main>
  );
}

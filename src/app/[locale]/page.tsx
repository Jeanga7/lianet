import { HeroSection } from "@/components/hero";
import { ExpertiseSection, ManifesteSection } from "@/components/sections";
import { ScrollZone, SectionColorBridge } from "@/components/ui";

export default function LocalizedHomePage() {
  return (
    <main id="main-scroll" className="h-screen overflow-y-auto lg:overflow-y-scroll snap-none lg:snap-y lg:snap-mandatory scroll-smooth scrollbar-hide">
      <section id="hero" className="relative h-screen w-full overflow-hidden lg:w-[calc(100%-5rem)] lg:ml-20 lg:snap-start lg:snap-always flex-shrink-0">
        <HeroSection />
        <SectionColorBridge />
        <ScrollZone targetSectionId="expertise" />
      </section>
      <section
        id="expertise"
        className="relative h-auto min-h-screen w-full flex-shrink-0 lg:h-dvh lg:w-[calc(100%-5rem)] lg:ml-20 lg:snap-start lg:snap-always"
      >
        <ExpertiseSection />
        <ScrollZone targetSectionId="blueprint" />
      </section>
      <section id="blueprint" className="relative">
        <ManifesteSection />
      </section>
    </main>
  );
}

import { isLocale, type Locale } from "@/i18n/config";
import { AboutHero, AgileModel, CommitmentBlocks, FoundersNote, BrandingStory } from "@/components/sections/about";
import { BackgroundEffects, FilmGrain, FooterSection } from "@/components/sections";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale: Locale = isLocale(locale) ? locale : "fr";

  return (
    <main id="main-scroll" className="relative h-screen w-full overflow-y-auto overflow-x-hidden lg:overflow-y-scroll bg-white scroll-smooth scrollbar-hide">
      <BackgroundEffects />
      <FilmGrain opacity={0.2} />

      <div className="relative z-10">
        <AboutHero />
        <BrandingStory />
        <AgileModel />
        <CommitmentBlocks />
        <FoundersNote />
        <section id="footer" className="relative h-auto lg:min-h-screen w-full flex-shrink-0 bg-[#1B365D] lg:snap-start lg:snap-always">
          <FooterSection />
        </section>
      </div>
    </main>
  );
}

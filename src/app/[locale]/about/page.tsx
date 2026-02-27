import { isLocale, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/getI18n";
import { AboutHero, AgileModel, BrandingStory, CommitmentBlocks, FoundersNote, SystemOS, SignatureFooter, SquadService } from "@/components/sections/about";
import { BackgroundEffects, FilmGrain, FooterSection } from "@/components/sections";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : "fr";
  const t = await getI18n(currentLocale);

  return {
    title: String(t(`metadata.about.title`)),
    description: String(t(`metadata.about.description`)),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale: Locale = isLocale(locale) ? locale : "fr";

  return (
    <main id="main-scroll" className="relative h-screen w-full overflow-y-auto overflow-x-hidden lg:overflow-y-scroll bg-white scroll-smooth scrollbar-hide">
      <BackgroundEffects />
      <FilmGrain opacity={0.2} />

      <div className="relative z-10">
        <section id="hero"><AboutHero /></section>
        <section id="manifeste"><BrandingStory /></section>
        <section id="system-os"><SystemOS /></section>
        <section id="squad"><SquadService /></section>
        <section id="agile-model"><AgileModel /></section>
        <section id="commitments"><CommitmentBlocks /></section>
        <section id="founders"><FoundersNote /></section>
        <section id="signature"><SignatureFooter /></section>
        <footer id="footer" className="relative h-auto lg:min-h-screen w-full flex-shrink-0 bg-[#1B365D] lg:snap-start lg:snap-always">
          <FooterSection />
        </footer>
      </div>
    </main>
  );
}

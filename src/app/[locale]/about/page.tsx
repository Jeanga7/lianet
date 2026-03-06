import { isLocale, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/getI18n";
import { AboutHero, AgileModel, BrandingStory, CommitmentBlocks, FoundersNote, SystemOS, SignatureFooter, SquadService } from "@/components/sections/about";
import AboutCtaBanner from "@/components/sections/about/AboutCtaBanner";
import { BackgroundEffects, FilmGrain, FooterSection } from "@/components/sections";
import { messages } from "@/i18n/messages";
import StructuredData from "@/components/seo/StructuredData";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : "fr";
  const t = await getI18n(currentLocale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lianet.sn';

  return {
    title: String(t(`metadata.about.title`)),
    description: String(t(`metadata.about.description`)),
    alternates: {
      canonical: `${baseUrl}/${currentLocale}/about`,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale: Locale = isLocale(locale) ? locale : "fr";
  const dictionary = messages[currentLocale];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lianet.sn';

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": currentLocale === 'fr' ? "Accueil" : "Home",
        "item": `${baseUrl}/${currentLocale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": dictionary.metadata.about.title,
        "item": `${baseUrl}/${currentLocale}/about`
      }
    ]
  };

  return (
    <>
      <StructuredData data={breadcrumbLd} />
      <main id="main-scroll" className="relative h-screen w-full overflow-y-auto overflow-x-hidden lg:overflow-y-scroll bg-white scroll-smooth scrollbar-hide">
        <BackgroundEffects />
        <FilmGrain opacity={0.04} />

        <div className="relative z-10">
          <section id="hero"><AboutHero /></section>
          <section id="manifeste"><BrandingStory /></section>
          <section id="system-os"><SystemOS /></section>
          <section id="squad"><SquadService /></section>
          <section id="agile-model"><AgileModel /></section>
          <section id="commitments"><CommitmentBlocks /></section>
          <section id="founders"><FoundersNote /></section>
          <section id="signature"><SignatureFooter /></section>
          <AboutCtaBanner locale={currentLocale} />
          <footer id="footer" className="relative h-auto lg:min-h-screen w-full flex-shrink-0 bg-[#1B365D] lg:snap-start lg:snap-always">
            <FooterSection />
          </footer>
        </div>
      </main>
    </>
  );
}

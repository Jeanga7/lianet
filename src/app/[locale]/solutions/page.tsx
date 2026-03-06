import { isLocale, type Locale } from "@/i18n/config";
import { SolutionsHub } from "@/components/sections";
import { getI18n } from "@/i18n/getI18n";
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
    title: String(t("metadata.solutions.title")),
    description: String(t("metadata.solutions.description")),
    alternates: {
      canonical: `${baseUrl}/${currentLocale}/solutions`,
    },
  };
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null; // The layout handles the notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lianet.sn';
  const dictionary = messages[locale as Locale];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'fr' ? "Accueil" : "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": dictionary.metadata.solutions.title,
        "item": `${baseUrl}/${locale}/solutions`
      }
    ]
  };

  return (
    <>
      <StructuredData data={breadcrumbLd} />
      <SolutionsHub />
    </>
  );
}


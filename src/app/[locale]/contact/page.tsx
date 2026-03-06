import { isLocale, type Locale } from "@/i18n/config";
import { PageScaffold } from "@/components/pages";
import { getPageCopy } from "@/app/[locale]/_pageCopy";
import { getI18n } from "@/i18n/getI18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : "fr";
  const t = await getI18n(currentLocale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lianet.sn';

  return {
    title: String(t("contact.title")),
    description: String(t("contact.description")),
    alternates: {
      canonical: `${baseUrl}/${currentLocale}/contact`,
    },
  };
}

import { ContactPortal } from "@/components/sections/contact";
import { messages } from "@/i18n/messages";

import StructuredData from "@/components/seo/StructuredData";

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : "fr";
  const dictionary = messages[currentLocale as Locale];
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
        "name": dictionary.metadata.contact.title,
        "item": `${baseUrl}/${currentLocale}/contact`
      }
    ]
  };

  return (
    <>
      <StructuredData data={breadcrumbLd} />
      <ContactPortal dictionary={dictionary.contact} locale={currentLocale} />
    </>
  );
}

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

  return {
    title: String(t("contact.title")),
    description: String(t("contact.description")),
  };
}

import { ContactPortal } from "@/components/sections/contact";
import { messages } from "@/i18n/messages";

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : "fr";
  const dictionary = messages[currentLocale].contact;

  return <ContactPortal dictionary={dictionary} locale={currentLocale} />;
}

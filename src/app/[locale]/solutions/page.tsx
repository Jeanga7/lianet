import { isLocale } from "@/i18n/config";
import { SolutionsHub } from "@/components/sections";
import { getI18n } from "@/i18n/getI18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : "fr";
  const t = await getI18n(currentLocale);

  return {
    title: String(t("metadata.solutions.title")),
    description: String(t("metadata.solutions.description")),
  };
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null; // The layout handles the notFound()
  }

  return <SolutionsHub />;
}


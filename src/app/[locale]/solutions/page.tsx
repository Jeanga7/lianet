import { isLocale, type Locale } from "@/i18n/config";
import { SolutionsHub } from "@/components/sections";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale: Locale = isLocale(locale) ? locale : "fr";

  return <SolutionsHub />;
}


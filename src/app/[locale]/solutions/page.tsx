import { isLocale, type Locale } from "@/i18n/config";
import { SolutionsHub } from "@/components/sections";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null; // The layout handles the notFound()
  }

  return <SolutionsHub />;
}


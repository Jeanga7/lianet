import { isLocale, type Locale } from "@/i18n/config";
import { PageScaffold } from "@/components/pages";
import { getPageCopy } from "@/app/[locale]/_pageCopy";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale: Locale = isLocale(locale) ? locale : "fr";
  return <PageScaffold locale={currentLocale} {...getPageCopy("caseStudies", currentLocale)} />;
}

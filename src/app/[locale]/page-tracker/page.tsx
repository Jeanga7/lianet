import { isLocale, type Locale } from "@/i18n/config";
import { PageTrackerBoard } from "@/components/pages";
import { getPageTracker } from "@/app/[locale]/_pageTracker";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PageTrackerPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale: Locale = isLocale(locale) ? locale : "fr";

  return (
    <PageTrackerBoard
      key={currentLocale}
      locale={currentLocale}
      rows={getPageTracker(currentLocale)}
    />
  );
}

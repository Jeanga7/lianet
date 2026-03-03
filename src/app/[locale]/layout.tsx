import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale: Locale = isLocale(locale) ? locale : "fr";
  const dictionary = messages[normalizedLocale];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lianet.sn';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dictionary.metadata.home.title,
      template: `%s | Lianet`,
    },
    description: dictionary.metadata.home.description,
    alternates: {
      canonical: `${baseUrl}/${normalizedLocale}`,
      languages: {
        'fr-FR': `${baseUrl}/fr`,
        'en-US': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dictionary.metadata.home.title,
      description: dictionary.metadata.home.description,
      url: `${baseUrl}/${normalizedLocale}`,
      siteName: 'Lianet',
      locale: normalizedLocale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.home.title,
      description: dictionary.metadata.home.description,
    },
    icons: {
      icon: [
        { url: '/pictogram-lianet.png', type: 'image/png', sizes: '256x256' },
      ],
      apple: [
        { url: '/pictogram-lianet.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/pictogram-lianet.png',
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <>{children}</>;
}

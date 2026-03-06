import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import StructuredData from "@/components/seo/StructuredData";

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
    keywords: ["Lianet Sénégal", "Squad-as-a-Service Africa", "Elite Tech Hub Dakar", "Software Engineering Senegal", "Digital Transformation Africa", "SaaS Squads Senegal", "Agence Digitale Sénégal"],
    authors: [{ name: "Lianet", url: baseUrl }],
    creator: "Lianet",
    publisher: "Lianet",
    verification: {
      google: "dzsjL8sQsWZah_C2c5tSGDYJPyCkvS9m4sx8w--ADtU",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${baseUrl}/${normalizedLocale}`,
      languages: {
        'fr': `${baseUrl}/fr`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title: dictionary.metadata.home.title,
      description: dictionary.metadata.home.description,
      url: `${baseUrl}/${normalizedLocale}`,
      siteName: 'Lianet',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Lianet — Connecting the Future',
        },
      ],
      locale: normalizedLocale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.home.title,
      description: dictionary.metadata.home.description,
      images: ['/og-image.png'],
      creator: '@lianet_sn',
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = isLocale(locale) ? locale : "fr";
  if (!isLocale(locale)) notFound();

  const dictionary = messages[normalizedLocale];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lianet.sn';

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lianet",
    "url": baseUrl,
    "logo": `${baseUrl}/pictogram-lianet.png`,
    "sameAs": [
      "https://linkedin.com/company/lianet-sn",
      "https://twitter.com/lianet_sn"
    ],
    "description": dictionary.metadata.home.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@lianet.sn",
      "contactType": "sales",
      "areaServed": "Africa",
      "availableLanguage": ["French", "English"]
    }
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Lianet Sénégal",
    "image": `${baseUrl}/og-image.png`,
    "url": baseUrl,
    "telephone": "+221778756631",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dakar",
      "addressCountry": "SN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.7167",
      "longitude": "-17.4677"
    },
    "serviceType": ["Squad-as-a-Service", "Software Engineering", "Digital Strategy"],
    "description": dictionary.metadata.home.description,
    "priceRange": "$$$"
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lianet",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${normalizedLocale}?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <StructuredData data={organizationLd} />
      <StructuredData data={serviceLd} />
      <StructuredData data={websiteLd} />
      {children}
    </>
  );
}

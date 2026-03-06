import { isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import StructuredData from "@/components/seo/StructuredData";
import NetworkClient from "./NetworkClient";
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
        title: String(t("metadata.network.title")),
        description: String(t("metadata.network.description")),
        alternates: {
            canonical: `${baseUrl}/${currentLocale}/network`,
        },
    };
}

export default async function NetworkPage({ params }: PageProps) {
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
                "name": dictionary.metadata.network.title,
                "item": `${baseUrl}/${currentLocale}/network`
            }
        ]
    };

    return (
        <>
            <StructuredData data={breadcrumbLd} />
            <NetworkClient />
        </>
    );
}

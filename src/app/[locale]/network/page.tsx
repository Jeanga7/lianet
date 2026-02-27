import { isLocale } from "@/i18n/config";
import { getI18n } from "@/i18n/getI18n";
import NetworkClient from "./NetworkClient";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const currentLocale = isLocale(locale) ? locale : "fr";
    const t = await getI18n(currentLocale);

    return {
        title: String(t("metadata.network.title")),
        description: String(t("metadata.network.description")),
    };
}

export default async function NetworkPage() {
    return <NetworkClient />;
}

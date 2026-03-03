import { isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const currentLocale = isLocale(locale) ? locale : "fr";
    const dictionary = messages[currentLocale].legal.terms;

    return {
        title: dictionary.title,
        description: dictionary.eyebrow,
    };
}

export default async function TermsPage({ params }: PageProps) {
    const { locale } = await params;
    const currentLocale = isLocale(locale) ? locale : "fr";
    const dictionary = messages[currentLocale].legal.terms;

    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#40B4A6]/30">
            <div className="max-w-4xl mx-auto px-6 py-32 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="space-y-12">
                    <header className="space-y-4">
                        <span className="font-nunito-black text-[#40B4A6] text-[12px] tracking-[0.3em] uppercase">
                            {dictionary.eyebrow}
                        </span>
                        <h1 className="text-5xl font-nunito-black text-[#1B365D]">
                            {dictionary.title}
                        </h1>
                        <p className="text-[#1B365D]/50 font-lato text-sm">
                            {dictionary.lastUpdated}
                        </p>
                    </header>

                    <div className="grid gap-12">
                        {dictionary.sections.map((section: any, idx: number) => (
                            <section key={idx} className="space-y-4 group">
                                <h3 className="text-xl font-nunito-black text-[#1B365D] group-hover:text-[#40B4A6] transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-[#1B365D]/70 font-lato leading-relaxed text-lg">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    <footer className="pt-12 border-t border-[#1B365D]/10">
                        <p className="text-[#1B365D]/40 text-sm font-lato italic">
                            Lianet Protocol v1.0 — Architecture de Leadership.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

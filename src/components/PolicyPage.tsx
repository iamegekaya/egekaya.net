import { useTranslations } from 'next-intl';

type PolicyNamespace = 'PrivacyPolicy' | 'CookiePolicy' | 'TermsOfUse';
type PolicySection = {
    h: string;
    p: string;
};

export function PolicyPage({ namespace }: { namespace: PolicyNamespace }) {
    const t = useTranslations(namespace);
    const sections = t.raw('content') as PolicySection[];

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-8">{t('title')}</h1>
            <article className="prose prose-invert prose-zinc max-w-none">
                {sections.map((section, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">{section.h}</h2>
                        <p className="text-zinc-300 leading-relaxed">{section.p}</p>
                    </div>
                ))}
            </article>
        </div>
    );
}

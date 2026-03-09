import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
    const t = useTranslations('PrivacyPolicy');

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-8">{t('title')}</h1>
            <article className="prose prose-invert prose-zinc max-w-none">
                {t.raw('content').map((section: { h: string, p: string }, i: number) => (
                    <div key={i} className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">{section.h}</h2>
                        <p className="text-zinc-300 leading-relaxed">{section.p}</p>
                    </div>
                ))}
            </article>
        </div>
    );
}

import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
            <div>
                <h1 className="text-4xl font-bold text-white mb-8">{t('title')}</h1>
                <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
                    <p>{t('intro')}</p>
                </div>
            </div>

            <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
                <ul className="space-y-4 text-zinc-300 list-none">
                    {t.raw('education').map((edu: string, index: number) => (
                        <li key={index} className="flex gap-2">
                            <span className="text-white/60">•</span>
                            <span>{edu}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-zinc-400 italic">{t('educationSuffix')}</p>
            </div>

            <div className="space-y-6">
                <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
                    <p>{t('hobbies')}</p>
                </div>

                <div className="p-4 border-l-4 border-white bg-zinc-900/50">
                    <p className="text-xl font-medium text-white">{t('summary')}</p>
                </div>
            </div>
        </div>
    );
}

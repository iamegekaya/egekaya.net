import { useTranslations } from 'next-intl';

type TechItem = {
    title: string;
    desc?: string;
    list?: string[];
};

export default function CyberPage() {
    const t = useTranslations('CyberPage');
    const techItems = t.raw('techItems') as TechItem[];

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16 text-zinc-300">

            {/* Intro */}
            <section className="space-y-4">
                <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
                <h2 className="text-2xl font-semibold text-white">{t('introTitle')}</h2>
                <p className="text-lg leading-relaxed">{t('introContent')}</p>
            </section>

            {/* OS Section */}
            <section className="space-y-8">
                {/* Active OS */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('osCurrentTitle')}</h3>
                    <div className="flex flex-col gap-2 items-start">
                        {t.raw('osCurrent').map((os: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded text-sm text-white font-medium">
                                {os}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Past OS */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('osPastTitle')}</h3>
                    <div className="flex flex-col gap-2 items-start mb-4">
                        {t.raw('osPast').map((os: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded text-sm text-white font-medium">
                                {os}
                            </span>
                        ))}
                    </div>
                    <p className="text-zinc-400">{t('osIntro')}</p>
                </div>
            </section>

            {/* Technical Infrastructure Section */}
            <section className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">{t('techTitle')}</h2>
                    <p className="text-zinc-400">{t('techIntro')}</p>
                </div>

                <div className="grid gap-8">
                    {techItems.map((item, i: number) => (
                        <div key={i} className="space-y-4 p-6 rounded-xl bg-zinc-900/50 border border-white/5">
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            {item.desc && <p className="text-zinc-400 leading-relaxed">{item.desc}</p>}
                            {item.list && item.list.length > 0 && (
                                <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                                    {item.list.map((li: string, k: number) => (
                                        <li key={k}>{li}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">{t('experienceTitle')}</h2>
                <div className="space-y-6">
                    {t.raw('experienceList').map((exp: { company: string, role: string, date: string }, i: number) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                            <div>
                                <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                                <p className="text-blue-400">{exp.role}</p>
                            </div>
                            <span className="text-sm text-zinc-500 mt-2 sm:mt-0 font-mono bg-black/50 px-3 py-1 rounded">
                                {exp.date}
                            </span>
                        </div>
                    ))}
                </div>
                <p className="text-zinc-400 italic">
                    {t('experienceSummary')}
                </p>
            </section>

            {/* Closing */}
            <section className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-2xl border border-white/5 space-y-6">
                <p className="text-lg italic text-zinc-400">
                    {t('philosophy')}
                </p>
            </section>

        </div>
    );
}

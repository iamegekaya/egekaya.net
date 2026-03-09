import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PhotoGallery } from '@/components/PhotoGallery';

export default function PhotographyPage() {
    const t = useTranslations('PhotographyPage');

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white mb-8">{t('title')}</h1>
                <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
                    <p>
                        {t.rich('intro', {
                            link: (chunks) => <Link href="/about" className="text-white underline hover:text-zinc-300">{chunks}</Link>
                        })}
                    </p>
                </div>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">{t('meaningTitle')}</h2>
                <p className="text-lg text-zinc-300 leading-relaxed">{t('meaningContent')}</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">{t('startTitle')}</h2>
                <p className="text-lg text-zinc-300 leading-relaxed">{t('startContent')}</p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">{t('equipmentTitle')}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {t.raw('equipment').map((item: { name: string, link: string }, index: number) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                        >
                            <span className="font-medium text-white">{item.name}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">{t('galleryTitle')}</h2>
                <PhotoGallery />
            </section>
        </div>
    );
}

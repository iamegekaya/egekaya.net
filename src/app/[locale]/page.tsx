import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-12 py-10">

            {/* AI Section (Top) */}
            <div className="space-y-2">
                <p className="text-xl md:text-2xl text-white font-medium">
                    {t('aiTitle')}
                </p>
                <div className="text-2xl md:text-3xl font-bold text-white block">
                    {t.rich('aiLink', {
                        link: (chunks) => <a href="https://ai.egekaya.net" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">{chunks}</a>
                    })}
                </div>
            </div>

            {/* Who Am I Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl mx-auto w-full">
                <div className="shrink-0">
                    <div className="h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-full border-2 border-white/20 shadow-2xl">
                        <Image
                            src="/pp.jpg"
                            alt="Ege Kaya"
                            width={192}
                            height={192}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </div>
                <div className="text-left space-y-4">
                    <h2 className="text-3xl font-bold text-white">
                        {t('whoAmI')}
                    </h2>
                    <p className="text-lg text-zinc-300 leading-relaxed max-w-xl">
                        {t('bio')}
                    </p>
                </div>
            </div>

            {/* Footer / Navigation Hint */}
            <div className="pt-8 space-y-6">
                <a
                    href="https://cv.egekaya.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl font-medium text-blue-400 hover:text-blue-300 transition-colors block"
                >
                    {t('cvLink')}
                </a>
                <p className="text-zinc-500 text-sm md:text-base">
                    {t('checkMenu')}
                </p>
            </div>

        </div>
    );
}

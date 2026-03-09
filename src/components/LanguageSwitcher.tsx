'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === 'tr' ? 'en' : 'tr';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="rounded-md border border-white/20 bg-black/50 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
        >
            {locale === 'tr' ? 'EN' : 'TR'}
        </button>
    );
}

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    localePrefix: 'always',
    pathnames: {
        '/': '/',
        '/about': {
            en: '/about',
            tr: '/hakkimda'
        },
        '/photography': {
            en: '/photography',
            tr: '/fotografcilik'
        },
        '/cybersecurity': {
            en: '/cybersecurity',
            tr: '/siber-guvenlik'
        },
        '/contact': {
            en: '/contact',
            tr: '/iletisim'
        },
        '/privacy-policy': {
            en: '/privacy-policy',
            tr: '/gizlilik-politikasi'
        },
        '/cookie-policy': {
            en: '/cookie-policy',
            tr: '/cerez-politikasi'
        },
        '/terms-of-use': {
            en: '/terms-of-use',
            tr: '/kullanim-kosullari'
        }
    }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);

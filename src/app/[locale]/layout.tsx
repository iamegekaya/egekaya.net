import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";

const openGraphLocaleMap = {
    en: 'en_US',
    tr: 'tr_TR',
} as const;

function isSupportedLocale(locale: string): locale is keyof typeof siteConfig.description {
    return locale in siteConfig.description;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale: requestedLocale } = await params;
    const locale = isSupportedLocale(requestedLocale) ? requestedLocale : 'tr';
    const description = siteConfig.description[locale];
    const openGraphLocale = openGraphLocaleMap[locale];

    return {
        metadataBase: new URL(siteConfig.url),
        title: {
            template: `%s | ${siteConfig.name}`,
            default: siteConfig.name,
        },
        description,
        openGraph: {
            title: siteConfig.name,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: '/pp.jpg',
                    alt: siteConfig.name,
                },
            ],
            locale: openGraphLocale,
            alternateLocale: Object.values(openGraphLocaleMap).filter(
                (alternateLocale) => alternateLocale !== openGraphLocale
            ),
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: siteConfig.name,
            description,
            creator: '@egekaya',
            images: ['/pp.jpg'],
        },
        icons: {
            icon: '/favicon.ico',
        },
    };
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'tr'].includes(locale as string)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className="dark">
            <body className="min-h-screen bg-black text-zinc-100 antialiased font-sans selection:bg-white/20">
                <NextIntlClientProvider messages={messages}>
                    <div className="flex min-h-screen flex-col">
                        <Header locale={locale} />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer locale={locale} />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: {
        template: '%s | Ege Kaya',
        default: 'Ege Kaya',
    },
    description: "Cybersecurity Specialist & Photographer",
    openGraph: {
        title: 'Ege Kaya',
        description: 'Cybersecurity Specialist & Photographer',
        url: 'https://egekaya.net',
        siteName: 'Ege Kaya',
        images: [
            {
                url: 'https://egekaya.net/og-image.jpg', // Placeholder
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ege Kaya',
        description: 'Cybersecurity Specialist & Photographer',
        creator: '@egekaya',
    },
    icons: {
        icon: '/favicon.ico',
    },
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
            <body className={`${inter.variable} min-h-screen bg-black text-zinc-100 antialiased font-sans selection:bg-white/20`}>
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

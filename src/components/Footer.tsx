import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { Linkedin, Instagram } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export function Footer({ locale }: { locale: string }) {
    const t = useTranslations('Footer');
    const footerLinks = siteConfig.footer[locale as 'tr' | 'en'];

    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 mb-8">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                            {siteConfig.name}
                        </Link>
                        <p className="max-w-xs text-sm text-zinc-400">
                            {t('slogan')}
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                                <XIcon className="w-5 h-5" />
                            </a>
                            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href as any}
                                className="text-sm text-zinc-400 transition-colors hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Copyright - Centered and at bottom */}
                <div className="flex justify-center pt-8 border-t border-white/5">
                    <p className="text-sm text-zinc-500 text-center">
                        © 2026 Ege Kaya – egekaya.net. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}

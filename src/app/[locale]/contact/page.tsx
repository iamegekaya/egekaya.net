import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';
import { siteConfig } from '@/config/site';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

// Simple X icon component since lucide might not have it or it's named differently in newer versions, 
// but user asked to change Twitter icon to X icon. 
// Lucide's Twitter icon is usually the bird. Let's use a custom SVG for X or just check if Lucide has X.
// For safety/speed, I'll use a text X or SVG.
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function ContactPage() {
    const t = useTranslations('ContactPage');

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-12">{useTranslations('Navigation')('contact')}</h1>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-lg font-semibold text-white mb-4">{t('getInTouch')}</h2>
                        <p className="text-zinc-400 mb-6">
                            {t('reachOut')}
                        </p>
                        <div className="flex items-center gap-3 text-zinc-300">
                            <Mail className="w-5 h-5" />
                            <a href={`mailto:${siteConfig.links.email}`} className="hover:text-white transition-colors">{siteConfig.links.email}</a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-4">{t('socials')}</h2>
                        <div className="flex gap-4">
                            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                <XIcon className="w-5 h-5" />
                            </a>
                            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}

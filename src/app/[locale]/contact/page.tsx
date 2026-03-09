import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';
import { siteConfig } from '@/config/site';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { XIcon } from '@/components/icons/XIcon';

export default function ContactPage() {
    const t = useTranslations('ContactPage');
    const navigationT = useTranslations('Navigation');

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-12">{navigationT('contact')}</h1>

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

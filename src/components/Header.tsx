import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

export function Header({ locale }: { locale: string }) {
    const navItems = siteConfig.nav[locale as 'tr' | 'en'];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                        {siteConfig.name}
                    </Link>
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20">
                        <Image src="/pp.jpg" alt="Ege Kaya" width={32} height={32} className="object-cover" />
                    </div>
                </div>
                <nav className="hidden gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href as any}
                            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>
                    <div className="flex md:hidden">
                        <MobileNav navItems={navItems} />
                    </div>
                </div>
            </div>
        </header>
    );
}

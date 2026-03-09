'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
    navItems: { name: string; href: string }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleMenu}
                className="rounded-md border border-white/20 bg-black/50 p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute left-0 right-0 top-16 z-40 border-b border-white/10 bg-black/95 px-4 py-6 backdrop-blur-xl md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href as any}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-zinc-400 transition-colors hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
                                <span className="text-sm text-zinc-500">Language / Dil:</span>
                                <LanguageSwitcher />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

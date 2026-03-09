'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ContactForm() {
    const t = useTranslations('ContactPage.form');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [submittedAt, setSubmittedAt] = useState(() => Date.now());

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const form = e.target as HTMLFormElement;
        const formData = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
            website: (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '',
            submittedAt,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setStatus('success');
            form.reset();
            setSubmittedAt(Date.now());
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
                    {t('name')}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                    {t('email')}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
                    {t('message')}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
            </div>
            <div aria-hidden="true" className="hidden">
                <label htmlFor="website">Website</label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>
            <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? t('sending') : status === 'success' ? t('sent') : status === 'error' ? 'Error. Try again.' : t('send')}
            </button>
        </form>
    );
}

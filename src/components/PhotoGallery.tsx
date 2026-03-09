'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Generate array [1, 2, ..., 13]
const PHOTOS = Array.from({ length: 13 }, (_, i) => i + 1);

export function PhotoGallery() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {PHOTOS.map((id) => (
                    <GalleryItem
                        key={id}
                        id={id}
                        onClick={() => setSelectedId(id)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
                    >
                        <motion.div
                            layoutId={`image-${selectedId}`}
                            className="relative aspect-auto max-h-[90vh] max-w-[90vw]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={`/images/portfolio/${selectedId}.JPG`}
                                alt={`Portfolio Photo ${selectedId}`}
                                width={0}
                                height={0}
                                sizes="90vw"
                                style={{ width: 'auto', height: 'auto', maxHeight: '90vh', maxWidth: '90vw' }}
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function GalleryItem({ id, onClick }: { id: number; onClick: () => void }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div
            layoutId={`image-${id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: id * 0.05 }}
            className="group relative mb-6 break-inside-avoid overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 cursor-zoom-in"
        >
            <Image
                src={`/images/portfolio/${id}.JPG`}
                alt={`Portfolio Photo ${id}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
                className={`transition-all duration-500 group-hover:scale-105 ${isLoading ? 'blur-lg' : 'blur-0'
                    }`}
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'h-64');
                    if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerText = `${id}.JPG`;
                        e.currentTarget.parentElement.style.color = '#52525b';
                    }
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </motion.div>
    );
}

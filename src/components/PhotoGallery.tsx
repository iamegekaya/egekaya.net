'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PHOTOS = [
    { id: 1, width: 2827, height: 4445 },
    { id: 2, width: 2827, height: 4445 },
    { id: 3, width: 3181, height: 3489 },
    { id: 4, width: 4241, height: 3308 },
    { id: 5, width: 2827, height: 4445 },
    { id: 6, width: 4241, height: 3308 },
    { id: 7, width: 4241, height: 3308 },
    { id: 8, width: 4241, height: 3308 },
    { id: 9, width: 2827, height: 4445 },
    { id: 10, width: 4241, height: 3308 },
    { id: 11, width: 4241, height: 3308 },
    { id: 12, width: 4241, height: 3308 },
    { id: 13, width: 4241, height: 3308 },
] as const;

export function PhotoGallery() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedPhoto = PHOTOS.find((photo) => photo.id === selectedId) ?? null;

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
                {PHOTOS.map((photo) => (
                    <GalleryItem
                        key={photo.id}
                        photo={photo}
                        onClick={() => setSelectedId(photo.id)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedPhoto && (
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
                                width={selectedPhoto.width}
                                height={selectedPhoto.height}
                                sizes="(max-width: 768px) 90vw, 80vw"
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

function GalleryItem({
    photo,
    onClick,
}: {
    photo: (typeof PHOTOS)[number];
    onClick: () => void;
}) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div
            layoutId={`image-${photo.id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: photo.id * 0.05 }}
            className="group relative mb-6 break-inside-avoid overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 cursor-zoom-in"
        >
            <Image
                src={`/images/portfolio/${photo.id}.JPG`}
                alt={`Portfolio Photo ${photo.id}`}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
                className={`transition-all duration-500 group-hover:scale-105 ${isLoading ? 'blur-lg' : 'blur-0'
                    }`}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'h-64');
                    if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerText = `${photo.id}.JPG`;
                        e.currentTarget.parentElement.style.color = '#52525b';
                    }
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </motion.div>
    );
}

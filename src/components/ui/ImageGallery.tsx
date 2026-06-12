'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectImage } from '@/types/project';

interface ImageGalleryProps {
  images: ProjectImage[];
  gridCols?: string;
}

export default function ImageGallery({ images, gridCols = 'grid-cols-2 sm:grid-cols-3' }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () => setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  const next = () => setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
      else if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <>
      <div className={`grid ${gridCols} gap-3`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="aspect-video relative rounded overflow-hidden hover:opacity-90 transition-opacity"
            aria-label={`View ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[lightboxIndex].alt}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                quality={85}
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="text-white text-center text-sm mt-2">{images[lightboxIndex].alt}</p>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white p-2 hover:text-gray-300"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white p-2 hover:text-gray-300"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-0 right-0 -translate-y-8 text-white hover:text-gray-300"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

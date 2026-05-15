'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProjectImage } from '@/types/project';

interface ImageGalleryProps {
  images: ProjectImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () => setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  const next = () => setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="aspect-video relative rounded overflow-hidden hover:opacity-90 transition-opacity"
            aria-label={`View ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
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

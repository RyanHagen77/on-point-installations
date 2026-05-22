import Image from 'next/image';
import Link from 'next/link';
import { ProjectImage } from '@/types/project';

interface ProjectCardProps {
  title: string;
  slug: string;
  location?: string;
  serviceType?: string;
  thumbnail?: ProjectImage;
}

export default function ProjectCard({ title, slug, location, serviceType, thumbnail }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${slug}/`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="aspect-video bg-gray-100 relative">
        {thumbnail ? (
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Project Photo
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#800000] group-hover:underline text-sm leading-snug">{title}</h3>
        {(location || serviceType) && (
          <p className="text-xs text-gray-500 mt-1">{[serviceType, location].filter(Boolean).join(' · ')}</p>
        )}
      </div>
    </Link>
  );
}

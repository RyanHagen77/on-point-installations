import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity-image';
import { portableTextComponents } from '@/lib/portable-text';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ImageGallery from '@/components/ui/ImageGallery';
import CTABlock from '@/components/ui/CTABlock';
import type { ProjectImage } from '@/types/project';

interface FeaturedImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt: string | null;
  assetDimensions: { width: number; height: number } | null;
}

interface ProjectData {
  title: string;
  h1: string | null;
  slug: string;
  location: string | null;
  completedDate: string | null;
  serviceType: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  featuredImage: FeaturedImage | null;
}

interface ProjectLayoutHeroProps {
  post: ProjectData;
  slug: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function ProjectLayoutHero({ post, slug }: ProjectLayoutHeroProps) {
  const pageHeading = post.h1 ?? post.title;

  const allBodyBlocks = post.body ?? [];

  // All body image blocks go to the stages grid (all 9, no featured-image filter)
  const gridImages: ProjectImage[] = allBodyBlocks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b._type === 'image')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b: any) => ({
      src: urlFor(b).width(1024).height(768).fit('crop').url(),
      alt: b.alt ?? '',
      width: b.assetDimensions?.width ?? 1024,
      height: b.assetDimensions?.height ?? 768,
      caption: b.caption ?? b.alt ?? '',
    }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allTextBlocks = allBodyBlocks.filter((b: any) => b._type === 'block');

  // First normal paragraph goes in the left intro column
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const introBlock = allTextBlocks.find((b: any) => b.style === 'normal') ?? null;

  // Everything else renders full-width below the top row
  const detailBlocks = introBlock
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? allTextBlocks.filter((b: any) => b._key !== introBlock._key)
    : allTextBlocks;

  const metaBadge = [
    post.location,
    post.completedDate ? formatDate(post.completedDate) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const imgW = post.featuredImage?.assetDimensions?.width ?? 1024;
  const imgH = post.featuredImage?.assetDimensions?.height ?? 768;

  return (
    <main>
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Project Gallery', url: '/project-gallery/' },
            { name: pageHeading, url: `/project/${slug}/` },
          ]}
        />
      </div>

      {/* Top row: intro left / featured image right */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: location/date badge, H1, first intro paragraph */}
          <div className="flex flex-col justify-start">
            {metaBadge && (
              <p className="text-sm font-medium text-[#535353] mb-3 tracking-wide">
                {metaBadge}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] leading-tight mb-4">
              {pageHeading}
            </h1>
            {introBlock && (
              <div className="prose prose-lg max-w-none prose-headings:text-[#800000] prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline">
                <PortableText value={[introBlock]} components={portableTextComponents} />
              </div>
            )}
          </div>

          {/* Right column: featured image at natural 4:3 aspect ratio */}
          {post.featuredImage && (
            <div>
              <Image
                src={urlFor(post.featuredImage).width(1024).url()}
                alt={post.featuredImage.alt ?? pageHeading}
                width={imgW}
                height={imgH}
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="w-full h-auto rounded-[3px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Full-width detail prose: all remaining text blocks */}
      {detailBlocks.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="prose prose-lg max-w-none prose-headings:text-[#800000] prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline">
            <PortableText value={detailBlocks} components={portableTextComponents} />
          </div>
        </div>
      )}

      {/* Stages grid: all 9 body images with captions */}
      {gridImages.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-[#800000] mb-6">The stages of installation.</h2>
          <ImageGallery
            images={gridImages}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        </section>
      )}

      {/* CTA banner */}
      <CTABlock variant="banner" heading="Have a similar project?" />
    </main>
  );
}

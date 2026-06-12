import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity-image';
import { portableTextComponents } from '@/lib/portable-text';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ImageGallery from '@/components/ui/ImageGallery';
import CTABlock from '@/components/ui/CTABlock';
import { SITE } from '@/lib/constants';
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

  const featuredRef = post.featuredImage?.asset?._ref;

  // Text-only body blocks for the prose column
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textBlocks = (post.body ?? []).filter((b: any) => b._type !== 'image');

  // Body images excluding the featured image for the photo grid
  const gridImages: ProjectImage[] = (post.body ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b._type === 'image' && b.asset?._ref !== featuredRef)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b: any) => ({
      src: urlFor(b).width(1024).height(768).fit('crop').url(),
      alt: b.alt ?? '',
      width: b.assetDimensions?.width ?? 1024,
      height: b.assetDimensions?.height ?? 768,
      caption: b.caption ?? b.alt ?? '',
    }));

  const metaBadge = [
    post.location,
    post.completedDate ? formatDate(post.completedDate) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <main>
      {/* Hero -- contained to match content column, displays at or below native 1024px */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="relative w-full overflow-hidden rounded-[3px] bg-[#1a1a1a] h-56 sm:h-64 md:h-80 lg:h-[400px]">
            <Image
              src={urlFor(post.featuredImage).width(1024).url()}
              alt={post.featuredImage.alt ?? pageHeading}
              fill
              priority
              sizes="(min-width: 1024px) 960px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              className="object-cover"
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            {/* Title overlay */}
            <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 pb-4 sm:pb-6">
              {metaBadge && (
                <p className="text-white/80 text-sm font-medium mb-1 tracking-wide">{metaBadge}</p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {pageHeading}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Project Gallery', url: '/project-gallery/' },
            { name: pageHeading, url: `/project/${slug}/` },
          ]}
        />
      </div>

      {/* Two-column body + sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Prose column */}
          <div className="flex-1 min-w-0">
            {textBlocks.length > 0 && (
              <div className="prose prose-lg max-w-none prose-headings:text-[#800000] prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline">
                <PortableText value={textBlocks} components={portableTextComponents} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-[#F3F3F3] rounded-[3px] p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-bold text-[#800000] uppercase tracking-wide mb-4">
                Project at a glance
              </h2>
              <dl className="space-y-3 text-sm text-[#333]">
                {post.location && (
                  <div>
                    <dt className="font-semibold text-[#535353]">Location</dt>
                    <dd className="mt-0.5">{post.location}</dd>
                  </div>
                )}
                {post.completedDate && (
                  <div>
                    <dt className="font-semibold text-[#535353]">Completed</dt>
                    <dd className="mt-0.5">{formatDate(post.completedDate)}</dd>
                  </div>
                )}
                {post.serviceType && (
                  <div>
                    <dt className="font-semibold text-[#535353]">Service type</dt>
                    <dd className="mt-0.5">{post.serviceType}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-5 pt-5 border-t border-[#DEDEDE]">
                <Link
                  href="/contact/"
                  className="block w-full bg-[#800000] text-white font-semibold uppercase tracking-wide px-4 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors text-center text-sm"
                >
                  Request a Quote
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="block w-full mt-2 border-2 border-[#800000] text-[#800000] font-semibold uppercase tracking-wide px-4 py-3 rounded-[3px] hover:bg-[#800000] hover:text-white transition-colors text-center text-sm"
                >
                  {SITE.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Photo grid */}
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

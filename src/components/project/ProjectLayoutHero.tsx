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
  variant?: 'acoustic-ceiling' | 'senior-living';
}

// Per-slug split H2 marker for the senior-living variant.
// Each project's gallery section starts with a different h2 heading.
const SPLIT_MARKERS: Record<string, string> = {
  'furniture-assembly-for-a-design-studio-senior-living-community-oak-brook-il': 'See the Finished',
  'haworth-intuity-modular-installation-chicago-il': 'Results of',
  'ki-unite-corporate-office-installation-warrenville-il': 'See the Finished Workspaces of the KI Unite',
  'ais-divi-office-furniture-installation-addison-il': 'Project Results',
  'complete-office-system-installation-downers-grove-il': 'See the Results',
  'knoll-office-system-installations-northfield-il': 'Project Results',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blockText(block: any): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (block.children ?? []).map((c: any) => c.text ?? '').join('');
}

function parseSeniorLivingBody(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allBodyBlocks: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  introBlock: any | null,
  splitMarker: string
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  narrativeBlocks: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  splitH2: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  galleryPairs: Array<{ image: any; captionText: string }>;
} {
  // The h2 that separates the narrative from the gallery section
  const splitH2 = allBodyBlocks.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (b: any) =>
      b._type === 'block' &&
      b.style === 'h2' &&
      blockText(b).includes(splitMarker)
  ) ?? null;

  const introIdx = introBlock ? allBodyBlocks.indexOf(introBlock) : -1;
  const splitH2Idx = splitH2 ? allBodyBlocks.indexOf(splitH2) : allBodyBlocks.length;

  // Narrative: text blocks between the intro and the split H2. Images are excluded
  // because the three narrative images all reappear in the gallery, avoiding orphan floats.
  const narrativeBlocks = allBodyBlocks
    .slice(introIdx + 1, splitH2Idx)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b._type === 'block');

  // Gallery: [image, adjacent-text-caption] pairs after the split H2.
  // Stops when it encounters an h3/h2 block (the "Talk to a Human" CTA tail).
  // b.caption is null for all images in this document; captions come from the
  // immediately-following normal block.
  const afterSplit = allBodyBlocks.slice(splitH2Idx + 1);
  const galleryPairs: Array<{ image: any; captionText: string }> = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  let i = 0;
  while (i < afterSplit.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const block: any = afterSplit[i];
    if (block._type === 'image') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next: any = afterSplit[i + 1];
      const captionText =
        next && next._type === 'block' && next.style === 'normal'
          ? blockText(next)
          : '';
      galleryPairs.push({ image: block, captionText });
      i += captionText ? 2 : 1;
    } else if (block._type === 'block' && (block.style === 'h3' || block.style === 'h2')) {
      // CTA tail begins: stop collecting pairs
      break;
    } else {
      i++;
    }
  }

  return { narrativeBlocks, splitH2, galleryPairs };
}

export default function ProjectLayoutHero({ post, slug, variant = 'acoustic-ceiling' }: ProjectLayoutHeroProps) {
  const pageHeading = post.h1 ?? post.title;
  const allBodyBlocks = post.body ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allTextBlocks = allBodyBlocks.filter((b: any) => b._type === 'block');

  // Shared: first normal prose block goes into the hero left column for both variants.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const introBlock = allTextBlocks.find((b: any) => b.style === 'normal') ?? null;

  // Variant-specific body parsing
  let sectionHeading: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let proseBlocks: any[];
  let gridImages: ProjectImage[];

  if (variant === 'senior-living') {
    const splitMarker = SPLIT_MARKERS[slug] ?? 'See the Finished';
    const { narrativeBlocks, splitH2, galleryPairs } = parseSeniorLivingBody(allBodyBlocks, introBlock, splitMarker);
    proseBlocks = narrativeBlocks;
    sectionHeading = splitH2 ? blockText(splitH2) : 'Finished Rooms';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gridImages = galleryPairs.map(({ image, captionText }: { image: any; captionText: string }) => ({
      src: urlFor(image).width(1024).height(768).fit('crop').url(),
      alt: image.alt ?? '',
      width: image.assetDimensions?.width ?? 1024,
      height: image.assetDimensions?.height ?? 768,
      caption: captionText || image.alt || '',
    }));
  } else {
    // acoustic-ceiling: all text blocks except the intro go to prose, all body images to the grid
    proseBlocks = introBlock
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? allTextBlocks.filter((b: any) => b._key !== introBlock._key)
      : allTextBlocks;
    sectionHeading = 'The stages of installation.';
    gridImages = allBodyBlocks
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
  }

  const metaBadge = post.location ?? '';
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

      {/* Split-top hero: location badge + H1 + intro prose left, featured image right */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: location badge (no date), H1, first intro paragraph */}
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

          {/* Right column: featured image at natural aspect ratio */}
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

      {/* Prose section: narrative (senior-living) or detail text (acoustic-ceiling) */}
      {proseBlocks.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="prose prose-lg max-w-none prose-headings:text-[#800000] prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline">
            <PortableText value={proseBlocks} components={portableTextComponents} />
          </div>
        </div>
      )}

      {/* Captioned image grid with lightbox */}
      {gridImages.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-[#800000] mb-6">{sectionHeading}</h2>
          <ImageGallery
            images={gridImages}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        </section>
      )}

      <CTABlock variant="banner" heading="Have a similar project?" />
    </main>
  );
}

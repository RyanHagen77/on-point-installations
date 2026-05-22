import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import { client } from '@/lib/sanity';
import { groupImageBlocks, portableTextComponents } from '@/lib/portable-text';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

interface Project {
  title: string;
  h1: string | null;
  slug: string;
  metaDescription: string | null;
  excerpt: string | null;
  completedDate: string | null;
  serviceType: string | null;
  location: string | null;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  featuredImage: {
    _type: 'image';
    asset: { _ref: string; _type: 'reference' };
    alt: string | null;
  } | null;
  imageGallery: Array<{
    _key: string;
    alt: string | null;
    assetDimensions: { width: number; height: number } | null;
    asset: { _id: string; url: string } | null;
  }> | null;
  relatedBlogPosts: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: {
      alt: string | null;
      asset: { _id: string; url: string } | null;
    } | null;
  }> | null;
}

// relatedBlogPosts projection is wired for future render lanes.
// Field is empty across all 9 documents as of Lane 2A. Render deferred to Phase 6.
const projectQuery = `*[_type == "project" && slug.current == $slug && status == "published"][0] {
  title,
  h1,
  "slug": slug.current,
  metaDescription,
  excerpt,
  completedDate,
  serviceType,
  location,
  status,
  body[]{
    ...,
    "assetDimensions": asset->metadata.dimensions
  },
  featuredImage { _type, asset, alt },
  imageGallery[]{
    _key,
    alt,
    "assetDimensions": asset->metadata.dimensions,
    asset->{_id, url}
  },
  relatedBlogPosts[]->{
    title,
    "slug": slug.current,
    excerpt,
    featuredImage{
      alt,
      asset->{_id, url}
    }
  }
}`;

const allProjectSlugsQuery = `*[_type == "project" && status == "published"]{ "slug": slug.current }`;

export const revalidate = 86400;

export async function generateStaticParams() {
  const projects = await client.fetch<Array<{ slug: string }>>(allProjectSlugsQuery);
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Project | null>(projectQuery, { slug });
  if (!post) {
    return {
      title: 'Project Not Found',
      alternates: { canonical: `${SITE.domain}/project/${slug}/` },
    };
  }
  return generatePageMetadata({
    title: `${post.title} | On Point Installations`,
    description: post.metaDescription ?? post.excerpt ?? '',
    canonical: `${SITE.domain}/project/${slug}/`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Project | null>(
    projectQuery,
    { slug },
    { next: { tags: ['project'], revalidate: 86400 } }
  );

  if (!post) notFound();

  const pageHeading = post.h1 ?? post.title;

  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Project Gallery', url: '/project-gallery/' },
            { name: pageHeading, url: `/project/${slug}/` },
          ]}
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-2">
          {pageHeading}
        </h1>
        {(post.location || post.completedDate) && (
          <p className="text-sm text-gray-500 mb-6">
            {post.location}
            {post.location && post.completedDate && ' · '}
            {post.completedDate &&
              new Date(post.completedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
          </p>
        )}
        {post.body && post.body.length > 0 && (
          <div className="prose prose-lg max-w-none prose-headings:text-[#800000] prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline mt-2">
            <PortableText
              value={groupImageBlocks(post.body)}
              components={portableTextComponents}
            />
          </div>
        )}
        {post.imageGallery && post.imageGallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#800000] mb-4">Project Photos</h2>
            {/* TODO Lane 2B: implement gallery grid render when Studio data is populated */}
          </section>
        )}
        {/* relatedBlogPosts render deferred to Phase 6. Data projected and available above. */}
      </div>
      <CTABlock variant="banner" heading="Have a Similar Project?" />
    </main>
  );
}

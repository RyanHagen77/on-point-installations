import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import { groupImageBlocks, portableTextComponents } from '@/lib/portable-text';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ArticleSchema from '@/components/schema/ArticleSchema';
import FAQSchema from '@/components/schema/FAQSchema';

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  title: string;
  h1: string | null;
  slug: string;
  metaDescription: string | null;
  excerpt: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  publishedAt: string | null;
  _createdAt: string;
  _updatedAt: string;
  category: string | null;
  faqs: FAQ[] | null;
  featuredImage: {
    _type: 'image';
    asset: { _ref: string; _type: 'reference' };
    alt: string | null;
  } | null;
}

const postQuery = `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
  title,
  h1,
  "slug": slug.current,
  metaDescription,
  excerpt,
  body[]{
    ...,
    "assetDimensions": asset->metadata.dimensions
  },
  publishedAt,
  _createdAt,
  _updatedAt,
  category,
  faqs,
  featuredImage { _type, asset, alt }
}`;

const allSlugsQuery = `*[_type == "blogPost" && status == "published"]{ "slug": slug.current }`;

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await client.fetch<Array<{ slug: string }>>(allSlugsQuery);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(postQuery, { slug });
  if (!post) {
    return {
      title: 'Post Not Found',
      alternates: { canonical: `${SITE.domain}/blog/${slug}/` },
    };
  }
  return generatePageMetadata({
    title: post.title,
    description:
      post.metaDescription ??
      post.excerpt ??
      'Commercial furniture installation insights from On Point Installations.',
    canonical: `${SITE.domain}/blog/${slug}/`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(
    postQuery,
    { slug },
    { next: { tags: ['blog'], revalidate: 86400 } }
  );

  if (!post) notFound();

  const pageHeading = post.h1 ?? post.title;
  const displayDate = post.publishedAt ?? post._createdAt;
  const heroImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : null;
  const postUrl = `${SITE.domain}/blog/${slug}/`;
  const articleDescription =
    post.metaDescription ?? post.excerpt ?? 'Commercial furniture installation insights from On Point Installations.';

  return (
    <main>
      <ArticleSchema
        title={post.title}
        description={articleDescription}
        url={postUrl}
        datePublished={displayDate}
        dateModified={post._updatedAt}
        {...(heroImageUrl && { image: heroImageUrl })}
        {...(post.featuredImage?.alt && { imageAlt: post.featuredImage.alt })}
      />
      {post.faqs && post.faqs.length > 0 && (
        <FAQSchema items={post.faqs} />
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog/' },
            { name: pageHeading, url: `/blog/${slug}/` },
          ]}
        />
        {post.category && (
          <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#800000] bg-red-50 px-2 py-0.5 rounded">
              {post.category}
            </span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mb-6">
          {pageHeading}
        </h1>
        {heroImageUrl && (
          <div className="mb-8">
            <Image
              src={heroImageUrl}
              alt={post.featuredImage?.alt || post.title}
              width={1200}
              height={630}
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="rounded-lg w-full h-auto"
            />
          </div>
        )}
        {post.body && post.body.length > 0 && (
          <div className="prose prose-lg max-w-none prose-headings:text-[#800000] prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline mt-2">
            <PortableText value={groupImageBlocks(post.body)} components={portableTextComponents} />
          </div>
        )}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-12">
            <FAQAccordion items={post.faqs} />
          </div>
        )}
      </div>
      <CTABlock variant="banner" heading="Ready to Start Your Project?" />
    </main>
  );
}

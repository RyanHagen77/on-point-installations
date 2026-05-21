import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { PortableTextReactComponents } from '@portabletext/react';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupImageBlocks(blocks: any[]): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i]._type === 'image') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const group: any[] = [];
      while (i < blocks.length && blocks[i]._type === 'image') {
        group.push(blocks[i]);
        i++;
      }
      if (group.length === 1) {
        result.push(group[0]);
      } else {
        result.push({ _type: 'imageGroup', _key: `group-${group[0]._key}`, images: group });
      }
    } else {
      result.push(blocks[i]);
      i++;
    }
  }
  return result;
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      const nativeW: number = value.assetDimensions?.width  ?? 1200;
      const nativeH: number = value.assetDimensions?.height ?? 800;
      return (
        <div className="not-prose my-8">
          <Image
            src={urlFor(value).width(1536).url()}
            alt={value.alt ?? ''}
            width={nativeW}
            height={nativeH}
            sizes="(min-width: 768px) 768px, 100vw"
            priority={false}
            className="w-full h-auto rounded-lg"
          />
        </div>
      );
    },
    imageGroup: ({ value }) => {
      const count: number = value.images.length;
      const cols =
        count === 2 ? 'md:grid-cols-2' :
        count === 3 ? 'md:grid-cols-3' :
                      'md:grid-cols-2';
      return (
        <div className={`not-prose my-8 grid grid-cols-1 ${cols} gap-4`}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {value.images.map((img: any) => (
            <Image
              key={img._key}
              src={urlFor(img).width(1024).height(768).fit('crop').url()}
              alt={img.alt ?? ''}
              width={1024}
              height={768}
              sizes="(min-width: 768px) 384px, 100vw"
              className="rounded-lg w-full h-auto"
            />
          ))}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? '';
      if (href.startsWith('/')) {
        return <Link href={href}>{children}</Link>;
      }
      return (
        <a href={href} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      );
    },
  },
};

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

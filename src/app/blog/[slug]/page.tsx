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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  featuredImage: any | null;
}

const postQuery = `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
  title,
  h1,
  "slug": slug.current,
  metaDescription,
  excerpt,
  body,
  publishedAt,
  _createdAt,
  _updatedAt,
  category,
  faqs,
  featuredImage
}`;

const allSlugsQuery = `*[_type == "blogPost" && status == "published"]{ "slug": slug.current }`;

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

const portableTextComponents: Partial<PortableTextReactComponents> = {
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

  return (
    <main>
      {/* ArticleSchema - wired in Lane 2 */}
      {/* FAQSchema (conditional on post.faqs?.length > 0) - wired in Lane 2 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog/' },
            { name: pageHeading, url: `/blog/${slug}/` },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
          {post.category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-[#800000] bg-red-50 px-2 py-0.5 rounded">
              {post.category}
            </span>
          )}
          <time dateTime={displayDate} className="text-sm text-gray-500">
            {new Date(displayDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mb-6">
          {pageHeading}
        </h1>
        {heroImageUrl && (
          <div className="mb-8">
            <Image
              src={heroImageUrl}
              alt={post.title}
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
            <PortableText value={post.body} components={portableTextComponents} />
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

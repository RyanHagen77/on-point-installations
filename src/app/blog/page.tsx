import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Blog | On Point Installations, Inc.',
  description: 'Commercial furniture installation tips, project spotlights, and industry insights from On Point Installations in Wauconda, IL. Serving Chicagoland since 2010.',
  canonical: `${SITE.domain}/blog/`,
});

interface BlogPostCard {
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  _createdAt: string;
  category: string | null;
  featuredImage: {
    _type: 'image';
    asset: { _ref: string; _type: 'reference' };
    alt: string | null;
  } | null;
}

const indexQuery = `*[_type == "blogPost" && status == "published"] | order(coalesce(publishedAt, _createdAt) desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _createdAt,
  category,
  featuredImage { _type, asset, alt }
}`;

export default async function BlogIndexPage() {
  const posts = await client.fetch<BlogPostCard[]>(
    indexQuery,
    {},
    { next: { tags: ['blog'], revalidate: 3600 } }
  );

  return (
    <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-8">
        Blog
      </h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts published yet. Check back soon.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const thumbnailUrl = post.featuredImage
              ? urlFor(post.featuredImage).width(800).height(450).url()
              : null;
            return (
              <li key={post.slug} className="border border-gray-200 rounded-lg overflow-hidden">
                <Link href={`/blog/${post.slug}/`} className="group flex flex-col h-full">
                  {thumbnailUrl && (
                    <div className="overflow-hidden">
                      <Image
                        src={thumbnailUrl}
                        alt={post.featuredImage?.alt || post.title}
                        width={800}
                        height={450}
                        sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
                        priority={index === 0}
                        className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-5">
                    {post.category && (
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#800000] bg-red-50 px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#800000] transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    )}
                    <span className="mt-auto pt-3 inline-block text-sm font-semibold text-[#800000] group-hover:underline">
                      Read more
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

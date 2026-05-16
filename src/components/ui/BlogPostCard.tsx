import Image from 'next/image';
import Link from 'next/link';

interface BlogPostCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  featuredImage?: string;
  variant?: 'featured' | 'standard';
}

export default function BlogPostCard({
  title,
  slug,
  excerpt,
  publishedAt,
  featuredImage,
  variant = 'standard',
}: BlogPostCardProps) {
  const href = `/blog/${slug}/`;
  const date = new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        {featuredImage && (
          <div className="aspect-video relative">
            <Image src={featuredImage} alt={title} fill quality={85} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-2">{date}</p>
          <h2 className="text-xl font-bold text-[#800000] group-hover:underline mb-3 leading-snug">{title}</h2>
          {excerpt && <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>}
          <span className="text-[#800000] font-semibold text-sm mt-4 block">Read more →</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {featuredImage && (
        <div className="w-24 h-16 relative flex-shrink-0 rounded overflow-hidden">
          <Image src={featuredImage} alt={title} fill quality={85} sizes="96px" className="object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-1">{date}</p>
        <h3 className="font-semibold text-[#800000] group-hover:underline text-sm leading-snug line-clamp-2">{title}</h3>
      </div>
    </Link>
  );
}

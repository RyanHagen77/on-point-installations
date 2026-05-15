import { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

// Sanity-powered blog post route — fully implemented in Phase 4
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, ' '),
    description: 'Commercial furniture installation insights from On Point Installations.',
    alternates: { canonical: `${SITE.domain}/blog/${slug}/` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog/' },
          { name: slug, url: `/blog/${slug}/` },
        ]} />
        <h1 className="text-3xl font-bold text-[#1a3a5c] mt-6 mb-4">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600">Full blog post content powered by Sanity CMS coming in Phase 4.</p>
      </div>
      <CTABlock variant="banner" heading="Ready to Start Your Project?" />
    </main>
  );
}

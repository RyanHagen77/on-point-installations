import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Blog | On Point Installations, Inc.',
  description: 'Commercial furniture installation tips, project spotlights, and industry insights from On Point Installations in Wauconda, IL. Serving Chicagoland since 2010.',
  canonical: `${SITE.domain}/blog/`,
});

export default function BlogIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
        Blog
      </h1>
      <p className="text-gray-600">Blog index with Sanity-powered posts coming in Phase 4.</p>
    </main>
  );
}

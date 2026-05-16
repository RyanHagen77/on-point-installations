import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Reviews | On Point Installations | Chicago Commercial Furniture Installers',
  description: 'See what clients say about On Point Installations. 5.0★ Google rating. Expert commercial furniture installation across Chicagoland since 2010.',
  canonical: `${SITE.domain}/reviews/`,
});

export default function ReviewsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Reviews', url: '/reviews/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
        Client Reviews &amp; Testimonials
      </h1>
      <p className="text-gray-600">Full reviews page content coming in Phase 2.</p>
    </main>
  );
}

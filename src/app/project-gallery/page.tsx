import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Installation Project Gallery | Chicago Metro | On Point Installations',
  description: 'Browse completed commercial furniture installation projects by On Point Installations across the Chicago metro area. Cubicles, office systems, modular furniture, and more.',
  canonical: `${SITE.domain}/project-gallery/`,
});

export default function ProjectGalleryPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Project Gallery', url: '/project-gallery/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
        Project Gallery
      </h1>
      <p className="text-gray-600">Full project gallery coming in Phase 2.</p>
    </main>
  );
}

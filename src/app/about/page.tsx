import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PersonSchema from '@/components/schema/PersonSchema';

export const metadata = generatePageMetadata({
  title: 'About On Point Installations | Commercial Furniture Installers | Wauconda, IL',
  description: 'Brian Vetter founded On Point Installations in 2010. Learn about our team, our non-union advantage, and why Chicago businesses trust us for commercial furniture installation.',
  canonical: `${SITE.domain}/about/`,
});

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
          About On Point Installations
        </h1>
        <p className="text-gray-600">Full about page content coming in Phase 2.</p>
      </main>
    </>
  );
}

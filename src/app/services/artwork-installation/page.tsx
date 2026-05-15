import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Artwork Installation Chicago | On Point Installations',
  description: 'Professional commercial artwork installation in Chicago, IL. Commercial art, signage, and display mounting for offices and businesses. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/artwork-installation/`,
});

export default function ArtworkInstallationPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Artwork Installation', url: '/services/artwork-installation/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Artwork Installation in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Artwork Installation" />
    </main>
  );
}

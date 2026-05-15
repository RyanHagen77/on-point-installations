import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installer Chicago, IL | On Point Installations',
  description: 'Professional commercial furniture installation in Chicago, IL. On Point Installations serves Chicago and surrounding areas. Non-union team. Call (847) 550-4042.',
  canonical: `${SITE.domain}/service-area/chicago-il/`,
});

export default function ChicagoServiceAreaPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Service Area', url: '/service-area/chicagoland-commercial-furniture-installation/' },
          { name: 'Chicago, IL', url: '/service-area/chicago-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Commercial Furniture Installation in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service area page content coming in Phase 3.</p>
      </div>
      <CTABlock variant="banner" heading="Serving the City of Chicago" />
    </main>
  );
}

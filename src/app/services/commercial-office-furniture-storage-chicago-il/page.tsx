import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Commercial Office Furniture Storage Chicago | On Point Installations',
  description: 'Secure commercial office furniture warehousing and storage in Chicago, IL. Short and long-term storage for cubicles, systems furniture & more. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/commercial-office-furniture-storage-chicago-il/`,
});

export default function CommercialOfficeFurnitureStorageChicagoPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Office Furniture Storage Chicago', url: '/services/commercial-office-furniture-storage-chicago-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
          Commercial Office Furniture Storage in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Furniture Storage" />
    </main>
  );
}

import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Chicagoland Commercial Furniture Installation | On Point Installations',
  description: 'On Point Installations provides professional commercial furniture installation throughout Chicagoland. Serving Chicago, Schaumburg, Naperville, Waukegan, Wauconda & surrounding areas. Call (847) 550-4042.',
  canonical: `${SITE.domain}/service-area/chicagoland-commercial-furniture-installation/`,
});

export default function ChicagolandServiceAreaPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Service Area', url: '/service-area/chicagoland-commercial-furniture-installation/' },
          { name: 'Chicagoland', url: '/service-area/chicagoland-commercial-furniture-installation/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Commercial Furniture Installation Throughout Chicagoland
        </h1>
        <p className="text-gray-600">Full service area hub content coming in Phase 3.</p>
      </div>
      <CTABlock variant="banner" heading="Serving All of Chicagoland" />
    </main>
  );
}

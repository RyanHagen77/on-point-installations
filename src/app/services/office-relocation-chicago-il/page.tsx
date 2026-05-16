import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Office Relocation Services Chicago | On Point Installations',
  description: 'Commercial office relocation in Chicago, IL. Teardown, transport, reinstallation, electrical disconnect/reconnect. Trusted since 2010. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/office-relocation-chicago-il/`,
});

export default function OfficeRelocationChicagoPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Office Relocation Chicago', url: '/services/office-relocation-chicago-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
          Office Relocation Services in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Office Relocation" />
    </main>
  );
}

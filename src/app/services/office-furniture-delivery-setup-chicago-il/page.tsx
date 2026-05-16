import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Office Furniture Delivery & Setup Chicago | On Point Installations',
  description: 'Professional office furniture delivery and setup in Chicago, IL. White-glove delivery, assembly, and installation. Non-union. Serving Chicagoland since 2010. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/office-furniture-delivery-setup-chicago-il/`,
});

export default function OfficeFurnitureDeliverySetupChicagoPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Office Furniture Delivery & Setup Chicago', url: '/services/office-furniture-delivery-setup-chicago-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
          Office Furniture Delivery &amp; Setup in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Furniture Delivery & Setup" />
    </main>
  );
}

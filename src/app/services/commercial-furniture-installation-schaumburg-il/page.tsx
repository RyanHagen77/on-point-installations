import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Schaumburg IL | On Point Installations',
  description: 'Professional commercial furniture installation in Schaumburg, IL. On Point Installations serves Schaumburg and surrounding areas. Non-union team. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/commercial-furniture-installation-schaumburg-il/`,
});

export default function CommercialFurnitureInstallationSchaumburgPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Commercial Furniture Installation Schaumburg', url: '/services/commercial-furniture-installation-schaumburg-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
          Commercial Furniture Installation in Schaumburg, IL
        </h1>
        <p className="text-gray-600">Full city service page content coming in Phase 3.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Your Schaumburg Project" />
    </main>
  );
}

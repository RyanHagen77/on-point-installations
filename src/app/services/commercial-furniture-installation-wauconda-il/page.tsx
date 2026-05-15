import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Wauconda IL | On Point Installations',
  description: 'Professional commercial furniture installation in Wauconda, IL. On Point Installations serves Wauconda and surrounding areas. Non-union team. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/commercial-furniture-installation-wauconda-il/`,
});

export default function CommercialFurnitureInstallationWaucondaPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Commercial Furniture Installation Wauconda', url: '/services/commercial-furniture-installation-wauconda-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Commercial Furniture Installation in Wauconda, IL
        </h1>
        <p className="text-gray-600">Full city service page content coming in Phase 3.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Your Wauconda Project" />
    </main>
  );
}

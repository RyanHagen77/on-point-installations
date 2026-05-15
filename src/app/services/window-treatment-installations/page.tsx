import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Window Treatment Installation Chicago | On Point Installations',
  description: 'Professional office window treatment installation in Chicago, IL. Blinds, shades, and drapery for commercial spaces. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/window-treatment-installations/`,
});

export default function WindowTreatmentInstallationsPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Window Treatment Installations', url: '/services/window-treatment-installations/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Window Treatment Installation in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Window Treatment Installation" />
    </main>
  );
}

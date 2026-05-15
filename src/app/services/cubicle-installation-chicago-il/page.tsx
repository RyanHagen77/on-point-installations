import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Cubicle Installation Chicago | On Point Installations',
  description: 'Expert cubicle installation in Chicago, IL. New installs, reconfigurations, and teardowns for offices of all sizes. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/cubicle-installation-chicago-il/`,
});

export default function CubicleInstallationChicagoPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Cubicle Installation Chicago', url: '/services/cubicle-installation-chicago-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Cubicle Installation in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Cubicle Installation" />
    </main>
  );
}

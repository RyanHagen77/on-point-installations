import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Cubicle Wall & Upholstery Cleaning Chicago | On Point Installations',
  description: 'Professional cubicle wall and upholstery cleaning in Chicago, IL. Deep cleaning for panel systems and office furniture. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/cubicle-wall-upholstery-cleaning-chicago-il/`,
});

export default function CubicleWallUpholsteryCleaningPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Cubicle Wall & Upholstery Cleaning', url: '/services/cubicle-wall-upholstery-cleaning-chicago-il/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
          Cubicle Wall &amp; Upholstery Cleaning in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Cubicle Cleaning" />
    </main>
  );
}

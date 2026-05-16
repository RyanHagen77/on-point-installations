import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Disclaimer | On Point Installations, Inc.',
  description: 'Disclaimer for On Point Installations, Inc. | Wauconda, IL.',
  canonical: `${SITE.domain}/disclaimer/`,
});

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Disclaimer', url: '/disclaimer/' }]} />
      <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-4">Disclaimer</h1>
      <p className="text-gray-600">Disclaimer content migrated from WordPress coming in Phase 5.</p>
    </main>
  );
}

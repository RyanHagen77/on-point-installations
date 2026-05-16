import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Cookie Policy | On Point Installations, Inc.',
  description: 'Cookie Policy for On Point Installations, Inc. | Wauconda, IL.',
  canonical: `${SITE.domain}/cookie-policy/`,
});

export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Cookie Policy', url: '/cookie-policy/' }]} />
      <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-4">Cookie Policy</h1>
      <p className="text-gray-600">Cookie policy content migrated from WordPress coming in Phase 5.</p>
    </main>
  );
}

import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy | On Point Installations, Inc.',
  description: 'Privacy Policy for On Point Installations, Inc. | Wauconda, IL.',
  canonical: `${SITE.domain}/privacy-policy/`,
});

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy/' }]} />
      <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-4">Privacy Policy</h1>
      <p className="text-gray-600">Privacy policy content migrated from WordPress coming in Phase 5.</p>
    </main>
  );
}

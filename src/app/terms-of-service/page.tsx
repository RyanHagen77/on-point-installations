import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Terms of Service | On Point Installations, Inc.',
  description: 'Terms of Service for On Point Installations, Inc. — Wauconda, IL.',
  canonical: `${SITE.domain}/terms-of-service/`,
});

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Terms of Service', url: '/terms-of-service/' }]} />
      <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-4">Terms of Service</h1>
      <p className="text-gray-600">Terms of service content migrated from WordPress coming in Phase 5.</p>
    </main>
  );
}

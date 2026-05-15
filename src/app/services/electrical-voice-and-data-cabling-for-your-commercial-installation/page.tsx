import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Electrical, Voice & Data Cabling Chicago | On Point Installations',
  description: 'Commercial electrical, voice, and data cabling installation in Chicago, IL. High and low voltage for office furniture systems. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/electrical-voice-and-data-cabling-for-your-commercial-installation/`,
});

export default function ElectricalVoiceDataCablingPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Electrical, Voice & Data Cabling', url: '/services/electrical-voice-and-data-cabling-for-your-commercial-installation/' },
        ]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] mt-6 mb-4">
          Electrical, Voice &amp; Data Cabling in Chicago, IL
        </h1>
        <p className="text-gray-600">Full service page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Get a Quote for Electrical & Cabling Services" />
    </main>
  );
}

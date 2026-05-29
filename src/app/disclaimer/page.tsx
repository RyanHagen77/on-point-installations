import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Disclaimer | On Point Installations, Inc.',
  description: 'Disclaimer for On Point Installations, Inc., covering general information, project examples, and external links on onpointinstallations.com.',
  canonical: `${SITE.domain}/disclaimer/`,
});

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Disclaimer', url: '/disclaimer/' }]} />
      {/* Disclaimer - Lane 15 (May 2026). Hardcoded JSX for launch.
          Consider migration to Sanity-driven legalPage schema post-launch
          if content updates become frequent. */}
      <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-2">Disclaimer</h1>
      <p className="text-sm text-[#535353] italic mb-6">Last updated: May 29, 2026</p>
      <p className="text-[#292929] leading-relaxed mb-4">
        The information on this website is provided for general information about On Point Installations, Inc. and our commercial furniture installation services. While we work to keep the content current and accurate, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or availability of the information presented.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Project examples and testimonials</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        Project case studies and client testimonials shown on this site describe the specific work we performed for individual clients. Project scope, timeline, and results vary based on each client&apos;s site conditions, furniture specifications, building access, and project requirements. Past project outcomes are not a guarantee or representation of future results on any other project.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">External links</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        This site may contain links to other websites that are not operated by us. We have no control over the content, policies, or practices of those websites and assume no responsibility for them.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Contact</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        Questions? Contact On Point Installations, Inc. at info@onpointinstall.com or (847) 550-4042.
      </p>
    </main>
  );
}

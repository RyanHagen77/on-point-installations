import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy | On Point Installations, Inc.',
  description: 'Privacy Policy for On Point Installations, Inc., describing how we handle contact form data and analytics on onpointinstallations.com.',
  canonical: `${SITE.domain}/privacy-policy/`,
});

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy/' }]} />
      {/* Privacy Policy - Lane 15 (May 2026). Hardcoded JSX for launch.
          Consider migration to Sanity-driven legalPage schema post-launch
          if content updates become frequent. */}
      <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-2">Privacy Policy</h1>
      <p className="text-sm text-[#535353] italic mb-6">Last updated: May 29, 2026</p>
      <p className="text-[#292929] leading-relaxed mb-4">
        On Point Installations, Inc. ("we", "us", "our") operates this website at onpointinstallations.com. This policy describes what information we collect when you use the site and how we handle it.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">What we collect</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        The only personal information we collect is what you provide when you submit our contact form. The form asks for your name, company, phone number, email address, project type, project location, and any project details you choose to share.
      </p>
      <p className="text-[#292929] leading-relaxed mb-4">
        We use this information to respond to your inquiry. We do not sell, share, or otherwise distribute it. The submission is delivered directly to our business email and is not stored in any third-party database, marketing system, or CRM.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Analytics</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        We use Google Analytics 4 to understand how visitors find and use the site. Google Analytics collects standard web traffic information, including pages viewed, time on site, approximate location based on IP address, browser type, and device type. This information is aggregated and is not tied to your contact form submission. You can opt out of Google Analytics by installing Google&apos;s opt-out browser add-on at tools.google.com/dlpage/gaoptout.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Cookies</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        Google Analytics sets cookies in your browser to track visit information across sessions. We do not set any other cookies. You can disable or clear cookies through your browser settings; doing so will not affect your ability to use this site.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Children</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        This site is not directed to children under 13, and we do not knowingly collect information from them.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Changes</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        If we update this policy, we will revise the "Last updated" date above.
      </p>

      <h2 className="text-xl font-bold text-[#800000] mt-8 mb-3">Contact</h2>
      <p className="text-[#292929] leading-relaxed mb-4">
        Questions about this policy? Contact On Point Installations, Inc. at 1220 Karl Court, Wauconda, IL 60084, or call (847) 550-4042.
      </p>
    </main>
  );
}

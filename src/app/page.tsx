import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import LocalBusinessSchema from '@/components/schema/LocalBusinessSchema';
import OrganizationSchema from '@/components/schema/OrganizationSchema';
import WebSiteSchema from '@/components/schema/WebSiteSchema';
import CTABlock from '@/components/ui/CTABlock';

export const metadata = generatePageMetadata({
  title: 'Office Furniture Installer Chicago IL | On Point Installations',
  description: "On Point Installations is Chicago's trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.",
  canonical: `${SITE.domain}/`,
});

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <main>
        <section className="bg-white py-16 px-4 border-b border-[#E9E9E9]">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#800000] mb-4">
              Commercial Office Furniture Installer in Chicago, IL
            </h1>
            <p className="text-lg text-[#535353] mb-8 max-w-2xl mx-auto">
              On Point Installations provides expert commercial furniture installation across Chicagoland and the Tri-State area. Non-union. Trusted since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SITE.phoneHref}
                className="bg-[#800000] text-white font-semibold uppercase tracking-wide px-8 py-3 rounded-[3px] text-lg hover:bg-[#5A0000] transition-colors"
              >
                Call {SITE.phone}
              </a>
              <a
                href="/contact/"
                className="border-2 border-[#800000] text-[#800000] font-semibold uppercase tracking-wide px-8 py-3 rounded-[3px] text-lg hover:bg-[#800000] hover:text-white transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 max-w-7xl mx-auto">
          <p className="text-center text-gray-500 text-sm">
            Full homepage content coming in Phase 2.
          </p>
        </section>

        <CTABlock variant="banner" heading="Ready to Start Your Project?" />
      </main>
    </>
  );
}

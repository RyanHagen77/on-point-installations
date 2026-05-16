import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata({
  title: 'Window Treatment Installation Chicago | On Point Installations',
  description: 'Professional office window treatment installation in Chicago, IL. Blinds, shades, and drapery for commercial spaces. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/window-treatment-installation-chicago-il/`,
});

// SEO-driven FAQ content: drafted per Voice Rules. See docs/known-issues.md
const FAQS = [
  {
    question: 'What window treatments do you install for commercial offices?',
    answer: "Blinds, shades, and drapery. For offices, that often means roller shades or cellular shades, manual or automated, depending on what the space calls for. We also install curtains, drapes, and rods for hospitality and senior living settings.",
  },
  {
    question: 'Do you install automated or motorized shades?',
    answer: "Yes. We install automated shades in corporate buildings, banks, and other commercial spaces. If the project calls for motorized shades, we handle the installation.",
  },
  {
    question: 'Do you handle receiving and delivery, or just installation?',
    answer: "Both. We handle receiving, delivery, and installation. You don't need a separate crew for the receiving end.",
  },
  {
    question: 'Do you install window treatments at the same time as the furniture?',
    answer: "Yes, and it's usually easier that way. When we're already on-site for a furniture install, adding window treatments to the same scope keeps the project on one schedule and one invoice. Contact us when you scope the furniture job and we'll quote both.",
  },
  {
    question: 'Who supplies the window treatments (us, the dealer, or the customer)?',
    answer: "The customer or dealer supplies the product. We provide the installation. If you're working through a dealer who doesn't have an install crew, we work directly with them.",
  },
];

export default function WindowTreatmentInstallationPage() {
  return (
    <>
      <ServiceSchema
        name="Window Treatment Installation in Chicago, IL"
        description="Professional window treatment installation for commercial buildings, offices, and hospitality environments throughout the Chicago metro. On Point Installations handles blinds, shades, drapery, curtains, and automated shades, with door-to-door receiving, delivery, and installation."
        url={`${SITE.domain}/services/window-treatment-installation-chicago-il/`}
        areaServed="Chicago"
      />
      <FAQSchema items={FAQS} />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Window Treatment Installation Chicago', url: '/services/window-treatment-installation-chicago-il/' },
          ]}
          h1="Window Treatment Installation in Chicago, IL"
          imageSrc="/images/on-point-installations-window-treatment-installations.jpg"
          imageAlt="Professional window treatment installation for a commercial office in the Chicago, IL metro area by On Point Installations"
          imageWidth={1920}
          imageHeight={1280}
        >
          {/* Near-verbatim from onpointinstallations.com/window-treatment-installations/, Wayback Machine snapshot 2025-11-11; tricolon removed and closing sentence recast per Voice Rules */}
          <p className="text-[#292929] leading-relaxed mb-4">
            Having a view is a great way to improve productivity and wellbeing. While everyone loves the scenery, large, open windows can present a few problems throughout the year. One of the biggest issues businesses face is the effect of the sun on comfort levels and energy costs. When you don't use the correct treatments, your windows can increase your energy costs by up to 25%. The right window treatment handles the glare and keeps costs down.
          </p>
          <p className="text-[#535353] leading-relaxed mb-6">
            For the right window treatments in your commercial building or hospitality space,{' '}
            <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
              get a free quote
            </Link>{' '}
            or call{' '}
            <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
              {SITE.phone}
            </a>.
          </p>
        </ServiceHero>

        {/* ── H2: WINDOW TREATMENT INSTALLATION SERVICES ──────────────── */}
        {/* Near-verbatim from live site; "optimize the window treatments" recast per Voice Rules */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Window Treatment Installation Services
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              On Point Installations offers professional window treatment installations to help ensure that your building stays cool, comfortable, and stylish. We offer comprehensive services that include receiving, delivery, and installation of your window treatments. This includes both manual and automated shades, depending on your preferences.
            </p>
            <p className="text-[#292929] leading-relaxed">
              Our team provides experienced installers for all types of window treatments, from shades and blinds to curtains or drapes. For the right window treatments in your commercial building or hospitality space,{' '}
              <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
                contact On Point Installations
              </Link>.
            </p>
          </div>
        </section>

        {/* ── H2: WHERE WE WORK ───────────────────────────────────────── */}
        {/* Near-verbatim from live site; "When you partner..." and "single-source installation solution" recast per Voice Rules; "always aim...exceeding expectations" omitted per Voice Rules */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Where We Work
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              We handle it door to door: receiving, delivery, and installation of your window treatments.
            </p>
            <p className="text-[#292929] leading-relaxed mb-4">
              For dealers and end-users who need window treatments as part of a larger project, we're one call.
            </p>
            <p className="text-[#292929] leading-relaxed">
              On Point Installations installs automated shades in corporate buildings and banks, drapes and curtains on the windows, and shower curtains in bathrooms at senior living facilities. We work in a variety of settings across the Chicagoland and Midwest region.
            </p>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={FAQS} />
          </div>
        </section>

        <CTABlock
          variant="banner"
          heading="Get a Quote for Window Treatment Installation"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

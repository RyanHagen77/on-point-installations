import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata({
  title: 'Cubicle Wall & Upholstery Cleaning Chicago | On Point Installations',
  description: 'Professional cubicle wall and upholstery cleaning in Chicago, IL. Deep cleaning for panel systems and office furniture. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/cubicle-wall-upholstery-cleaning-chicago-il/`,
});

// SEO-driven FAQ content: drafted per Voice Rules. See docs/known-issues.md
const FAQS = [
  {
    question: 'What surfaces do you clean?',
    answer: "Fabric cubicle wall panels, upholstered panel surfaces, chair and seating upholstery, panel track and trim, and reception or lounge furniture. We focus on cubicle systems and office furniture, not general commercial cleaning.",
  },
  {
    question: 'What condition can you get the fabric back to?',
    answer: "For light soiling, general grime, dust buildup, and most spot stains, cleaning brings the fabric back to presentable condition. What it won't fix: set-in stains, sun fade, permanent discoloration, or fabric that's worn through. If the panels are past cleaning, we can advise on replacement.",
  },
  {
    question: 'Do you do standalone cleaning, or only as part of a furniture project?',
    answer: "Both. Most of our cleaning work comes through furniture installs and relocations where we're already on-site. But we also take standalone cleaning jobs. Call us and we'll assess the scope.",
  },
  {
    question: 'Can you clean panels before a client takes delivery of used furniture?',
    answer: "Yes. We can clean remanufactured or pre-owned panels at our warehouse before delivery, or on-site before installation begins. Either way, the furniture arrives looking ready to use.",
  },
  {
    question: 'How disruptive is cleaning to the office?',
    answer: "Minimal for most jobs. We can work in sections so not every workstation is out of commission at once. If the project size or timeline requires it, we can schedule after hours or on weekends.",
  },
];

export default function CubicleWallUpholsteryCleaningPage() {
  return (
    <>
      <ServiceSchema
        name="Cubicle Wall & Upholstery Cleaning in Chicago, IL"
        description="Professional cubicle wall and upholstery cleaning for commercial offices throughout the Chicago metro. On Point Installations cleans fabric panel systems, office furniture upholstery, and remanufactured panels as part of furniture installations, relocations, and standalone projects."
        url={`${SITE.domain}/services/cubicle-wall-upholstery-cleaning-chicago-il/`}
        areaServed="Chicago"
        serviceType="Cubicle Wall and Upholstery Cleaning"
      />
      <FAQSchema items={FAQS} />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Cubicle Wall & Upholstery Cleaning Chicago', url: '/services/cubicle-wall-upholstery-cleaning-chicago-il/' },
          ]}
          h1="Cubicle Wall & Upholstery Cleaning in Chicago, IL"
          imageSrc="/images/on-point-installations-cubicle-wall-upholstery-cleaning.jpg"
          imageAlt="Professional cubicle wall and upholstery cleaning for commercial office panel systems in the Chicago, IL metro area by On Point Installations"
          imageWidth={1920}
          imageHeight={1280}
        >
          {/* Near-verbatim from onpointinstallations.com/services/cubicle-wall-and-upholstery-cleaning/, fetched 2026-05-16 */}
          <p className="text-[#292929] leading-relaxed mb-4">
            On Point Installations offers cubicle wall and upholstery cleaning for commercial clients across the Chicago metro. We added this service at the request of the dealers and facility managers we work with, who needed one crew for installation, relocation, and cleaning.
          </p>
          <p className="text-[#535353] leading-relaxed mb-6">
            Our crews have logged over 2,000 hours of cubicle cleaning work. To add cleaning to a furniture project or schedule a standalone job,{' '}
            <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
              get a free quote
            </Link>{' '}
            or call{' '}
            <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
              {SITE.phone}
            </a>.
          </p>
        </ServiceHero>

        {/* ── H2: WHAT WE CLEAN ───────────────────────────────────────── */}
        {/* Near-verbatim from live site; em dashes recast as colons per Voice Rules */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What We Clean
            </h2>
            <ul className="space-y-3">
              {([
                ['Fabric cubicle wall panels', 'removes dust, grime, and light staining from regular office use'],
                ['Upholstered panel surfaces', 'keeps panel surfaces presentable between installations and reconfigurations'],
                ['Chair and seating upholstery', 'cleans fabric on task chairs, guest chairs, and lounge seating'],
                ['Panel track and trim', 'wipes down the hard surfaces that frame the fabric panels'],
                ['Reception and lounge furniture', 'cleans upholstered pieces in waiting areas and common spaces'],
                ['Remanufactured and used panels', 'preps pre-owned inventory before delivery to the client'],
                ['Post-relocation cleanup', 'we handle final cleaning after a furniture teardown and reinstall'],
              ] as [string, string][]).map(([label, detail]) => (
                <li key={label} className="flex items-start gap-3 text-[#292929]">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                  <span><strong>{label}:</strong> {detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── H2: WHEN TO SCHEDULE CLEANING ───────────────────────────── */}
        {/* Near-verbatim from live site; productivity statistics omitted pending source verification (see docs/known-issues.md) */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              When to Schedule Cleaning
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                'Before a client takes delivery of used or remanufactured furniture',
                'After an office relocation, when panels and chairs have been moved and reinstalled',
                'During a reconfiguration, when sections of a cubicle system are being reorganized',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#292929]">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#535353] leading-relaxed">
              A cleaning pass keeps a project looking finished. For dealers delivering pre-owned inventory, it's the difference between furniture that looks ready to use and furniture that came from another office.
            </p>
          </div>
        </section>

        {/* ── H2: CLEANING AS PART OF AN INSTALLATION ─────────────────── */}
        {/* Near-verbatim from live site; condensed per outline approval; "Swinging Pendulum" section omitted (see docs/spec-additions.md) */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Cleaning as Part of an Installation
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              Most of our cleaning work comes through furniture projects. When we're already on-site for an installation or relocation, adding a cleaning scope is one call. You don't need to coordinate a separate crew or schedule a second visit.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We work with furniture dealers and facility managers on projects that include installation, storage, and cleaning. If you need panels and upholstery cleaned as part of a larger project,{' '}
              <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
                contact us
              </Link>{' '}
              to add it to the scope.
            </p>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={FAQS} />
          </div>
        </section>

        <CTABlock
          variant="banner"
          heading="Get a Quote for Cubicle Cleaning"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

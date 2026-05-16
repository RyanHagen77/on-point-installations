import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';

export const metadata = generatePageMetadata({
  title: 'Commercial Space Planning Chicago | On Point Installations',
  description: 'Commercial space planning services in Chicago, IL. On-site measurement, floor plan verification, code compliance guidance. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/commercial-space-planning-chicago-il/`,
});

// SEO-driven FAQ content — drafted per Voice Rules. See docs/known-issues.md and docs/spec-additions.md
const FAQS = [
  {
    question: 'What does commercial space planning include?',
    answer: "Our space planning service covers on-site space measurement and verification, floor core chalking, and code compliance guidance for all installations we perform. We confirm that critical dimensions and code requirements are satisfied before furniture installation begins, so the install stays on schedule and on budget.",
  },
  {
    question: 'What is floor core chalking and why does it matter?',
    answer: "Floor core chalking marks out the locations for electrical and data cores in the floor before furniture is positioned. Getting this right before installation means the furniture lines up with the power and data connections it needs. If the cores are in the wrong place, furniture has to be moved or reconfigured after installation, which costs time and money.",
  },
  {
    question: 'Why plan the space before ordering furniture?',
    answer: "Furniture ordered to a floor plan that hasn't been field-verified often doesn't fit the way it's supposed to. Column locations, exit paths, HVAC placements, and door swings all affect what will actually work in a space. A field measurement before the order is placed catches problems that are cheap to fix on paper and expensive to fix after the furniture arrives.",
  },
  {
    question: 'Do you provide CAD drawings or digital floor plans?',
    answer: "We offer design support services to verify and refine floor plans for your installation. If you have drawings from a dealer or designer, we can verify them against the actual space on-site. Contact us to discuss the specific scope of your project.",
  },
  {
    question: 'Can you do space planning for a space that is still under construction or being built out?',
    answer: "Yes. Working with a space before it's complete is often the best time to verify dimensions and flag potential issues. We can walk the space with your dealer or project manager, take field measurements, and note anything that needs to be addressed before furniture installation begins.",
  },
];

export default function CommercialSpacePlanningChicagoPage() {
  return (
    <>
      <ServiceSchema
        name="Commercial Space Planning in Chicago, IL"
        description="Commercial space planning services in Chicago and the greater Chicagoland area. On Point Installations provides on-site space measurement, floor plan verification, floor core chalking, and code compliance guidance to ensure furniture installations stay on schedule and on budget."
        url={`${SITE.domain}/services/commercial-space-planning-chicago-il/`}
        areaServed="Chicago"
      />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Commercial Space Planning Chicago', url: '/services/commercial-space-planning-chicago-il/' },
          ]}
          h1="Commercial Space Planning in Chicago, IL"
          imageSrc="/images/on-point-installations-space-planning.jpg"
          imageAlt="Commercial office space planning and floor plan verification by On Point Installations in Chicago, IL"
          imageWidth={1920}
          imageHeight={1304}
        >
          {/* Verbatim from onpointinstallations.com/services/space-planning/, fetched 2026-05-15 */}
          <p className="text-[#292929] leading-relaxed mb-4">
            On Point Installations, Inc. provides design support services to create flexible, responsive and supportive work environments. We offer on-site space measurement and verification services, floor core chalking, and code compliance guidance for all installations we perform.
          </p>
          <p className="text-[#535353] leading-relaxed mb-6">
            Space planning before the furniture order saves time and money at installation. If you're planning a buildout in the Chicago area,{' '}
            <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
              get a free quote
            </Link>{' '}
            or call{' '}
            <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
              {SITE.phone}
            </a>.
          </p>
        </ServiceHero>

        {/* ── H2: WHAT SPACE PLANNING INCLUDES ────────────────────────── */}
        {/* Opening based on live site paragraph. Details drafted per Voice Rules — needs Brian review. See docs/known-issues.md */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What Our Space Planning Service Includes
            </h2>
            {/* Verbatim from onpointinstallations.com/services/space-planning/, fetched 2026-05-15 */}
            <p className="text-[#292929] leading-relaxed mb-6">
              These services confirm that all critical dimensions and code requirements are satisfied prior to furniture installation. By doing so, many potential issues are avoided to keep the installation on schedule and on budget.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'On-Site Measurement and Verification',
                  body: "We measure the actual space and compare it against the floor plan before furniture is ordered or installed. Column locations, exit requirements, and HVAC placements all affect what fits, and field measurements catch problems that drawings miss.",
                },
                {
                  title: 'Floor Core Chalking',
                  body: "We mark the floor core locations — the electrical and data connections built into the floor — before furniture is positioned. Getting this right before installation means furniture lines up with the connections it needs.",
                },
                {
                  title: 'Code Compliance Guidance',
                  body: "We flag code requirements that affect the installation: clearances, exit path widths, ADA compliance for workstation placement. Catching these before the furniture arrives prevents costly adjustments after the fact.",
                },
                {
                  title: 'Floor Plan Verification',
                  body: "If you have drawings from a dealer or designer, we verify them against the actual space. We note any discrepancies and work with your team to resolve them before installation day.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                  <h3 className="font-bold text-[#292929] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#535353] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── H2: WHY IT MATTERS ──────────────────────────────────────── */}
        {/* Drafted per Voice Rules — needs Brian review. See docs/known-issues.md */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Why Space Planning Matters Before Installation
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              Furniture ordered to a floor plan that hasn't been field-verified often doesn't fit the way it's supposed to. This isn't a rare edge case. Column locations shift in construction. Exit path requirements narrow the usable footprint. Floor cores end up in the wrong place for the furniture configuration.
            </p>
            <p className="text-[#292929] leading-relaxed mb-4">
              These problems are cheap to fix on paper. On installation day, with a crew on-site and furniture on a truck, they're expensive. Reconfiguring after the fact means rescheduling the crew, potentially reordering components, and explaining to the client why the project is behind.
            </p>
            <p className="text-[#292929] leading-relaxed">
              Space planning before the order is placed is the simplest way to keep{' '}
              <Link href="/services/commercial-furniture-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                commercial furniture installation Chicago
              </Link>{' '}
              projects on schedule. We've been doing both — planning and installation — since 2010.
            </p>
          </div>
        </section>

        {/* ── H2: FOR DEALERS AND FACILITY MANAGERS ───────────────────── */}
        {/* Drafted per Voice Rules — needs Brian review. See docs/known-issues.md */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Space Planning for Chicago Dealers and Facility Managers
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              Furniture dealers use our space planning service to verify their designs against the actual space before the order goes in. It's a straightforward step that protects the project and the client relationship.
            </p>
            <p className="text-[#292929] leading-relaxed mb-4">
              Facility managers and corporate project leads use it to confirm that a planned reconfiguration will actually work in their space before committing to a purchase order. We walk the space, take measurements, and give you a clear read on what fits and what doesn't.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We're based in Wauconda and work throughout Chicagoland and the Tri-State Area. If you're planning a buildout and want a field verification before the order drops,{' '}
              <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
                get a free quote
              </Link>{' '}
              or call{' '}
              <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
                {SITE.phone}
              </a>.
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
          heading="Get a Quote for Commercial Space Planning"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

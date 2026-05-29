import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE, NAP_SCHEMA, STATS_CALLOUT } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Chicago │ On Point Installations',
  description: "Chicago's trusted commercial furniture installers. On Point Installations deploys cubicles, systems furniture & office builds citywide. Same-day quote.",
  canonical: `${SITE.domain}/services/commercial-furniture-installation-chicago-il/`,
});

// Verbatim from onpointinstallations.com homepage, fetched 2026-05-15
const BRANDS = [
  'AIS', 'Allsteel', 'Bernhardt', 'Friant', 'Haworth', 'Herman Miller',
  'Hon', 'KI', 'Kimball', 'Knoll', 'OFS', 'Steelcase', 'Teknion', 'Three H', 'Trendway',
];

// SEO-driven FAQ content : no live-site source required (per content-source-map.md)
const FAQS = [
  {
    question: 'What types of commercial furniture does On Point Installations install?',
    answer: 'We install the full scope of commercial office furniture: cubicle and panel systems, systems furniture from all major manufacturers, workstations, case goods, conference room furniture, reception areas, and healthcare furniture. We also handle artwork installation, window treatments, and electrical and voice/data cabling as part of a complete office buildout.',
  },
  {
    question: 'Do you handle cubicle reconfigurations, or just new installs?',
    answer: 'Both. We handle new installs, teardowns, partial reconfigurations, and moves, adds, and changes (MAC) for all major cubicle and panel system brands. If you have an existing cluster that needs to be reconfigured for a new floor plan, we can do that without replacing the whole system.',
  },
  {
    question: 'Are you union or non-union?',
    answer: "We're non-union, which keeps your costs lower. We also have access to union labor when a project requires it, for example in jurisdictions where union-only rules apply. You get the flexibility of non-union pricing with the coverage when you need it.",
  },
  {
    question: 'How accurate are your installation quotes?',
    answer: "Our initial quote accurately reflects the final cost 98% of the time. We've invested in quoting software specifically to eliminate change orders. Change orders blow budgets, and we don't work that way.",
  },
  {
    question: 'What areas of Chicago and the suburbs do you serve?',
    answer: 'We serve the full Chicagoland metro area and Tri-State region, including the city of Chicago, its suburbs, Northwest Indiana, and Southeastern Wisconsin. We work regularly in Schaumburg, Naperville, Waukegan, and Wauconda, as well as throughout Cook, Lake, DuPage, and Will counties.',
  },
];

export default function CommercialFurnitureInstallationChicagoPage() {
  return (
    <>
      <ServiceSchema
        name="Commercial Furniture Installation in Chicago, IL"
        description="Professional, fully insured commercial office furniture installation services throughout Chicago and the greater Chicagoland area. Non-union installation crews handle cubicle systems, panel systems, workstations, executive furniture, conference room furniture, and complete office setups."
        url={`${SITE.domain}/services/commercial-furniture-installation-chicago-il/`}
        areaServed={["Chicago", "Schaumburg", "Naperville", "Waukegan", "Wauconda"]}
        serviceType="Commercial Furniture Installation"
      />
      <FAQSchema items={FAQS} />
      {/* LocalBusiness schema for Chicago service focus.
          @id "#chicago-localbusiness" distinguishes from homepage "#business" canonical entity.
          Per Prompt 11 mandate (docs/seo-audit/prompt-11-service-city-page-builder.md). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": `${SITE.domain}/#chicago-localbusiness`,
            name: SITE.name,
            url: `${SITE.domain}/services/commercial-furniture-installation-chicago-il/`,
            telephone: SITE.phoneHref.replace('tel:', ''),
            address: NAP_SCHEMA,
            description: "Commercial furniture installation in Chicago, IL. Non-union crew serving the Chicagoland metro area since 2010.",
            areaServed: {
              "@type": "City",
              name: "Chicago",
              containedInPlace: { "@type": "State", name: "Illinois" },
            },
          }),
        }}
      />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Commercial Furniture Installation Chicago', url: '/services/commercial-furniture-installation-chicago-il/' },
          ]}
          h1="Commercial Furniture Installation in Chicago, IL"
          imageSrc="/images/on-point-installations-office-installations.jpg"
          imageAlt="Commercial office furniture installation completed by On Point Installations in Chicago, IL"
          imageWidth={1920}
          imageHeight={1280}
        >
          {/* Verbatim from Prompt 11 Chicago CFI opening paragraph (docs/seo-audit/prompt-11-service-city-page-builder.md).
              Voice edits: both em dashes to commas; AI-tell opener replaced with "On a..."; 12-15 hyphen per hook. */}
          <p className="text-[#292929] leading-relaxed mb-4">
            When a Chicago business needs commercial furniture installation done right, on deadline, on budget, and without crew problems on the floor, On Point Installations is the team facilities directors and project managers call. We&apos;ve completed approximately 11,000 commercial furniture installation projects since 2010, and Chicago is at the center of our service territory. On a new Loop high-rise buildout, a River North reconfiguration, or a full furniture rollout across a Chicago campus, our 12-15 person crew handles it. We&apos;re on-site when we say we&apos;ll be, and we don&apos;t leave until the job is done right.
          </p>
          <p className="text-[#535353] leading-relaxed mb-6">
            From{' '}
            <a href="#cubicle-installation" className="text-[#800000] underline hover:text-[#5A0000]">
              cubicle installation in Chicago
            </a>{' '}
            to full systems furniture buildouts, we handle every scope. Need help with the layout first? We offer{' '}
            <Link href="/services/commercial-space-planning-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
              commercial space planning Chicago
            </Link>{' '}
            businesses rely on before a build. To see past work,{' '}
            <Link href="/project-gallery/" className="text-[#800000] underline hover:text-[#5A0000]">
              see our completed Chicago projects
            </Link>.
          </p>
        </ServiceHero>

        {/* ── H2 #1: WHAT WE INSTALL ──────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-installation-chicago-il/, fetched 2026-05-15 */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What Our Chicago Office Furniture Installation Includes
            </h2>
            <p className="text-[#292929] mb-6 leading-relaxed">
              We routinely install workstations, office spaces, office systems, and conference rooms for dealers, facility managers, and corporate clients across Chicagoland.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-bold text-[#292929] mb-3">Case Goods</h3>
                <ul className="space-y-2">
                  {[
                    'Floor and Wall-Mounted Millwork Cabinets',
                    'Private Offices',
                    'Storage Cases',
                    'Media Product',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#292929] mb-3">Complementary Services</h3>
                <ul className="space-y-2">
                  {[
                    'Restaurant booths and hospitality furniture',
                    'Acoustic ceiling panels',
                    'Window treatments: curtains, drapes, blinds',
                    'Light millwork: surface cutting, basic carpentry',
                    'Artwork installations',
                    'Furniture repair: on-site and off-site',
                    'Electrical and voice/data cabling',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-[#535353] leading-relaxed">
              We also handle space reconfigurations. If you need to better utilize your current space, add furniture to an existing layout, or remove unnecessary pieces, we use a systematic teardown and reassembly process that keeps your project on time and on budget.
            </p>
          </div>
        </section>

        {/* ── H2 #2: WHAT'S INCLUDED IN EVERY INSTALLATION ─────────────── */}
        {/* Verbatim from Prompt 11 SERVICE DETAILS block (docs/seo-audit/prompt-11-service-city-page-builder.md).
            Em-dash substitution on para 2: manufacturers [em-dash] list [em-dash] -> colon + period split. */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What&apos;s Included in Every Installation
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              On Point Installations provides end-to-end commercial furniture installation for Chicago businesses. Our core service covers the full scope of what a typical office build or reconfiguration requires: systems furniture and panel system installation, cubicle assembly and configuration, workstation and benching setup, private office furniture placement, conference room builds, and punch-list walk-throughs before we call the job complete. We work from dealer-provided installation drawings and coordinate directly with project managers, general contractors, and building management to hit your floor date without surprises.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We&apos;re experienced with all major commercial furniture manufacturers: Knoll, Haworth, Herman Miller, Steelcase, AIS, KI, Allsteel, National Office Furniture, and Teknion. We can work from CAD-generated installation plans or adapt in the field when conditions change. Our team is non-union, which gives Chicago clients the flexibility to schedule installations without the overtime and crew-size constraints that come with union-only jobs. We also provide commercial furniture delivery and setup, asset tracking, and furniture storage if your Chicago project requires staged deliveries or phased installation schedules.
            </p>
            {/* Audit-locked anchor links per Prompt 11 Internal Linking Opportunities */}
            <p className="text-[#292929] leading-relaxed mt-4">
              On Point serves the I-90 corridor through Schaumburg and the DuPage County market in Naperville. We handle{' '}
              <Link href="/services/commercial-furniture-installation-schaumburg-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                commercial furniture installation in Schaumburg
              </Link>{' '}
              and{' '}
              <Link href="/services/commercial-furniture-installation-naperville-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                commercial furniture installation in Naperville
              </Link>{' '}
              regularly, with same-day quotes and crews on-site within the week.
            </p>
          </div>
        </section>

        {/* ── H2 #3: CUBICLE INSTALLATION ─────────────────────────────── */}
        <section id="cubicle-installation" className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Cubicle Installation in Chicago
            </h2>
            <p className="text-[#292929] leading-relaxed">
              Dedicated cubicle installation work in Chicago is handled on its own service page, with full details on the panel systems and manufacturers we install. See{' '}
              <Link href="/services/cubicle-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                our cubicle installation page
              </Link>{' '}
              for project specs, FAQs, and scheduling.
            </p>
          </div>
        </section>

        {/* ── H2 #3: SYSTEMS FURNITURE ────────────────────────────────── */}
        {/* Drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
        <section id="systems-furniture" className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Systems Furniture Installation
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              Systems furniture from Herman Miller, Steelcase, Haworth, Knoll, or Teknion is designed to configure dozens of ways. It installs in one right way. Getting it wrong means the electrical doesn't stack, the panels don't connect, and you're redoing it the day before the client moves in.
            </p>
            <p className="text-[#292929] leading-relaxed mb-4">
              On Point Installations has been installing systems furniture since 2010. Our crew knows these product lines. We work from your design documents, coordinate with your dealer and project manager, and deliver a clean punch list at the end.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We also handle{' '}
              <Link href="/services/office-relocation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                office relocation services
              </Link>{' '}
              for systems furniture moves, including teardown, transport, and reinstallation at the new location.
            </p>
          </div>
        </section>

        {/* ── H2 #4: DELIVERY AND SETUP ───────────────────────────────── */}
        {/* Ported from live site RDI section; framing drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
        <section id="office-furniture-delivery-setup" className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Office Furniture Delivery and Setup
            </h2>
            <p className="text-[#292929] leading-relaxed mb-6">
              Every project is different. We offer two delivery approaches depending on your timeline and site situation.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-installation-chicago-il/, fetched 2026-05-15 */}
              <div className="bg-[#F8F8F8] border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-2">RDI (Receive, Deliver, Install)</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  We receive your materials at our Wauconda warehouse, coordinate delivery when all components are accounted for, and install at a single scheduled time. Better when supply chain delays are a factor or your site doesn't have room to stage materials.
                </p>
              </div>
              <div className="bg-[#F8F8F8] border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-2">Direct Delivery</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  If you have room on-site and materials are arriving on schedule, we can unload the cargo and install at the same time. Simpler for straightforward projects with a reliable delivery window.
                </p>
              </div>
            </div>
            {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-installation-chicago-il/, fetched 2026-05-15 */}
            <p className="text-[#292929] leading-relaxed">
              With today's supply chain issues, it's often helpful to order products in advance, but delivery times can be unpredictable. We can warehouse your products until all components arrive. If a delivery delay holds up your job, we'll drive to the Chicago-area transfer station and get your materials ourselves. We don't wait on problems.
            </p>
          </div>
        </section>

        {/* ── H2 #5: WHY CHOOSE ON POINT ──────────────────────────────── */}
        {/* Ported from onpointinstallations.com/about/ "Why Our Clients Choose Us", fetched 2026-05-15. Some differentiator framing drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-8">
              Why Chicago Businesses Choose On Point Installations
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Quotes that hold',
                  body: "Our initial quote accurately reflects the final cost 98% of the time. We've invested in software that eliminates change orders. Change orders blow budgets, and we don't work that way.",
                },
                {
                  title: 'Non-union, fully insured',
                  body: "We're non-union, which keeps your costs lower without cutting corners. We have access to union labor when a project requires it, so you're covered in any jurisdiction.",
                },
                {
                  title: 'Engineering mindset',
                  body: "We like our right angles at 90 degrees, not 89 or 91. Our crew carries 130+ years of combined industry experience. That's not a marketing number. It's why your installation comes in clean.",
                },
                {
                  title: 'Communication throughout',
                  body: "You'll know who your installers are the day before we start. You'll get real-time notifications when materials arrive, and visual email progress reports at the end of each workday.",
                },
                {
                  title: 'One point of contact',
                  body: 'We install furniture, handle electrical and voice/data cabling, install artwork and window treatments, and warehouse your materials. No juggling multiple vendors on the same project.',
                },
                {
                  title: '11,000+ completed projects',
                  body: "We've been doing this since 2010. Furniture dealers, facilities directors, and property managers come back to us because we show up, communicate, and finish the job.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border-l-4 border-[#800000] pl-5 py-4 pr-4">
                  <h3 className="font-bold text-[#292929] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#535353] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS CALLOUT ───────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-2xl mb-3 text-[#F5A623]" aria-label="5 stars">
                {STATS_CALLOUT.stars}
              </p>
              <p className="text-[#292929] text-lg leading-relaxed font-bold mb-2">
                {STATS_CALLOUT.headline}
              </p>
              <p className="text-[#535353]">{STATS_CALLOUT.subline}</p>
            </div>
          </div>
        </section>

        {/* ── H2 #6: FURNITURE BRANDS ─────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com homepage, fetched 2026-05-15 */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-4">
              Furniture Brands We Install
            </h2>
            <p className="text-[#535353] mb-8 max-w-3xl leading-relaxed">
              We work with all major commercial furniture manufacturers. If your dealer sells it, we can install it.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {BRANDS.map((brand) => (
                <div
                  key={brand}
                  className="border border-[#E9E9E9] px-4 py-3 text-sm font-medium text-[#292929] rounded-[3px] text-center"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── H2 #7: FAQ ──────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={FAQS} />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <CTABlock
          variant="banner"
          heading="Get a Quote for Your Chicago Commercial Furniture Installation"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

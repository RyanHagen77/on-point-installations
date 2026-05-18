import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata({
  title: 'Office Relocation Services Chicago | On Point Installations',
  description: 'Commercial office relocation in Chicago, IL. Teardown, transport, reinstallation, electrical disconnect/reconnect. Trusted since 2010. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/office-relocation-chicago-il/`,
});

// SEO-driven FAQ content : drafted per Voice Rules. See docs/known-issues.md
const FAQS = [
  {
    question: 'What does commercial office relocation in Chicago include?',
    answer: "We handle the full scope of an office move: electrical disconnect, personal storage crating, teardown of existing furniture, transport, reinstallation at the new location, and electrical reconnect. We can also warehouse your furniture if the new space isn't ready when the old lease ends.",
  },
  {
    question: 'Do you handle electrical disconnect and reconnect for office furniture systems?',
    answer: "Yes. Our electricians handle both high- and low-voltage connections for office furniture systems, including the disconnect at the old location and the reconnect at the new one. No need to bring in a separate electrical contractor for the furniture systems.",
  },
  {
    question: "Can you store furniture during a relocation if the new space isn't ready?",
    answer: "Yes. We have a 15,000-square-foot primary warehouse in Wauconda, IL, and access to an additional 40,000 square feet at a secondary facility near O'Hare. If your move has a gap between old lease end and new space availability, we'll warehouse your furniture and redeliver when you're ready.",
  },
  {
    question: 'Do you work with furniture dealers on office relocations?',
    answer: "Yes. A significant part of our business is supporting furniture dealers whose clients are relocating. We work directly with the dealer and the end client, handle the physical scope of the move, and report back at each stage so the dealer doesn't have to manage the installation crew separately.",
  },
  {
    question: 'How far in advance should I contact On Point for a relocation project?',
    answer: "As early as possible. Office relocations involve coordinating multiple trades, lease timelines, and furniture lead times. The more lead time we have, the better we can schedule and stage the work. Call us when you know the move date, even if the full scope is still being worked out.",
  },
];

export default function OfficeRelocationChicagoPage() {
  return (
    <>
      <ServiceSchema
        name="Office Relocation Services in Chicago, IL"
        description="Commercial office relocation services throughout Chicago and the greater Chicagoland area. Non-union crews handle electrical disconnect, furniture teardown, transport, reinstallation, and electrical reconnect for office moves of any size."
        url={`${SITE.domain}/services/office-relocation-chicago-il/`}
        areaServed="Chicago"
        serviceType="Office Relocation"
      />
      <FAQSchema items={FAQS} />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Office Relocation Chicago', url: '/services/office-relocation-chicago-il/' },
          ]}
          h1="Office Relocation Services in Chicago, IL"
          imageSrc="/images/on-point-installations-office-relocation.jpg"
          imageAlt="On Point Installations crew managing a commercial office relocation in the Chicago area"
          imageWidth={1920}
          imageHeight={1280}
        >
          {/* Verbatim from onpointinstallations.com/services/company-office-relocation-chicago-il/, fetched 2026-05-15 */}
          <p className="text-[#292929] leading-relaxed mb-4">
            If you're a commercial furniture dealer working with a company that is relocating within the Chicago Tristate Area, we can help. From small office moves to large corporate office relocations, On Point Installations has the resources to handle your project.
          </p>
          <p className="text-[#535353] leading-relaxed mb-6">
            We handle teardown, transport, reinstallation, electrical disconnect and reconnect, and furniture storage when timing gaps require it. One crew, one call.{' '}
            <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
              Get a free quote
            </Link>{' '}
            or call{' '}
            <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
              {SITE.phone}
            </a>.
          </p>
        </ServiceHero>

        {/* ── H2: WHAT WE HANDLE ──────────────────────────────────────── */}
        {/* Bullets verbatim from live site. Surrounding copy drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What We Handle During Your Office Relocation
            </h2>
            <p className="text-[#292929] leading-relaxed mb-6">
              A commercial office move has more moving parts than most people plan for. We handle the full physical scope so you can focus on the transition itself.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                {/* Verbatim from onpointinstallations.com/services/company-office-relocation-chicago-il/, fetched 2026-05-15 */}
                <h3 className="font-bold text-[#292929] mb-3">Relocation Scope</h3>
                <ul className="space-y-2">
                  {[
                    'Electrical disconnect at the old location',
                    'Personal storage crating of office contents',
                    'Furniture teardown, as needed',
                    'Furniture transport and relocation',
                    'Electrical wiring and reconnect at the new location',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {/* Drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
                <h3 className="font-bold text-[#292929] mb-3">Also Available</h3>
                <ul className="space-y-2">
                  {[
                    'Furniture warehousing when the new space isn\'t ready',
                    'Phased moves to keep operations running during the transition',
                    'Furniture reconfiguration at the new location',
                    'Punch list walk-through and close-out',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-[#535353] leading-relaxed mt-6">
              Need furniture delivered and set up at the new space as well? We handle{' '}
              <Link href="/services/commercial-furniture-installation-chicago-il/#office-furniture-delivery-setup" className="text-[#800000] underline hover:text-[#5A0000]">
                office furniture delivery and setup
              </Link>{' '}
              as part of the same project.
            </p>
          </div>
        </section>

        {/* ── H2: MINIMIZING DOWNTIME ─────────────────────────────────── */}
        {/* Opening sentence verbatim from live site. Remainder drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Reducing Downtime During Your Chicago Office Move
            </h2>
            {/* Verbatim from onpointinstallations.com/services/company-office-relocation-chicago-il/, fetched 2026-05-15 */}
            <p className="text-[#292929] leading-relaxed mb-4">
              Our goal is to make your office relocation and transition as seamless as possible while minimizing downtime to ensure you are back up and running your operation as soon as possible.
            </p>
            {/* Drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
            <p className="text-[#292929] leading-relaxed mb-4">
              We plan the move in day-by-day stages so every person involved knows what happens when. The day before we start, you'll know who's on site and what gets done. At the end of each workday, you'll get a photo update showing the current state of the project so you can spot anything that needs attention before the next day begins.
            </p>
            <p className="text-[#292929] leading-relaxed">
              If a delivery or logistics issue comes up, we don't stop and wait. We've driven to transfer stations to recover delayed shipments, tracked down missing components, and worked around problems that would have pushed back an installation crew that expected everything to be perfect on arrival. We handle it.
            </p>
          </div>
        </section>

        {/* ── H2: FOR FURNITURE DEALERS ───────────────────────────────── */}
        {/* Intro sentence verbatim from live site. Remainder drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Office Relocation Services for Chicago Furniture Dealers
            </h2>
            {/* Verbatim from onpointinstallations.com/services/company-office-relocation-chicago-il/, fetched 2026-05-15 */}
            <p className="text-[#292929] leading-relaxed mb-4">
              If you're a commercial furniture dealer working with a company that is relocating within the Chicago Tristate Area, we can help.
            </p>
            {/* Drafted per Voice Rules : needs Brian review. See docs/known-issues.md */}
            <p className="text-[#292929] leading-relaxed mb-4">
              We work directly with your dealer team and the end client at the same time. You give us the scope and schedule, we handle the physical move, and you get progress updates at each stage. You don't have to manage the installation crew separately from your own work with the client.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We've been doing{' '}
              <Link href="/services/commercial-furniture-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                commercial furniture installation
              </Link>{' '}
              for Chicago-area dealers since 2010. If you need a crew that shows up, communicates, and finishes the job, call us or{' '}
              <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
                get a free quote
              </Link>.
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
          heading="Get a Quote for Your Chicago Office Relocation"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

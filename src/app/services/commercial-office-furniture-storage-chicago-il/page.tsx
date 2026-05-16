import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';

export const metadata = generatePageMetadata({
  title: 'Commercial Office Furniture Storage Chicago | On Point Installations',
  description: 'Commercial office furniture storage in Wauconda, IL near Chicago. 15,000 sq ft primary + 40,000 sq ft secondary warehouse. Receive, store, and redeliver. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/commercial-office-furniture-storage-chicago-il/`,
});

// SEO-driven FAQ content : drafted per Voice Rules
const FAQS = [
  {
    question: 'What types of commercial furniture storage do you offer?',
    answer: "We receive, store, and redeliver commercial office furniture for projects of any size. This includes short-term storage when installation timing doesn't line up with delivery, long-term warehousing between projects, and decommission storage when a space is being cleared out. Both climate-controlled warehouse locations are staffed by experienced warehouse personnel.",
  },
  {
    question: 'Where are your warehouse facilities located?',
    answer: "Our primary warehouse is in Wauconda, IL, northwest of Chicago. We also have a secondary warehouse near Chicago O'Hare International Airport with 14 dock-height doors, a drive-up ramp, and racking capacity for up to 350 skids. Both facilities are climate controlled.",
  },
  {
    question: 'How do you handle furniture when it arrives at your warehouse?',
    answer: "We inspect each piece of furniture and component as it arrives, then cross-check the bill of lading against your purchase order. If anything is missing or damaged, we report it to you or the vendor immediately so there's time to reorder and redeliver before your installation date. Nothing goes to the job site until we've confirmed it's complete and undamaged.",
  },
  {
    question: 'Can you warehouse furniture during an office relocation?',
    answer: "Yes. If your move has a gap between when the old space needs to be cleared and when the new space is ready, we can receive your furniture at our warehouse and redeliver it when you're ready to install. We'll let you know when everything is in and confirmed, so you're not moving into an incomplete installation.",
  },
  {
    question: 'What is MAC and how do you support it?',
    answer: "MAC stands for moves, adds, and changes. It's the ongoing process of reconfiguring office space as a company grows or changes. We assist with on-site planning, work order management, and the physical reconfiguration and installation involved in MAC projects. We can also store components between phases if the project runs in stages.",
  },
];

export default function CommercialOfficeFurnitureStorageChicagoPage() {
  return (
    <>
      <ServiceSchema
        name="Commercial Office Furniture Storage in Chicago, IL"
        description="Commercial office furniture warehousing and storage near Chicago, IL. On Point Installations receives, inspects, stores, and redelivers commercial furniture at two climate-controlled facilities: 15,000 sq ft primary in Wauconda and 40,000 sq ft secondary near O'Hare."
        url={`${SITE.domain}/services/commercial-office-furniture-storage-chicago-il/`}
        areaServed="Chicago"
      />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Office Furniture Storage Chicago', url: '/services/commercial-office-furniture-storage-chicago-il/' },
          ]}
          h1="Commercial Office Furniture Storage in Chicago, IL"
          imageSrc="/images/on-point-installations-warehousing-chicago.jpg"
          imageAlt="On Point Installations warehouse facility in Wauconda, IL used for commercial office furniture storage"
          imageWidth={2560}
          imageHeight={1828}
        >
          {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-storage-chicago-il/, fetched 2026-05-15 */}
          <p className="text-[#292929] leading-relaxed mb-4">
            On Point Installations provides commercial office furniture storage in our 15,000-square-foot facility and has an additional 40,000 square feet available in a secondary warehouse. Both locations are climate controlled and staffed by experienced warehouse personnel.
          </p>
          <p className="text-[#535353] leading-relaxed mb-6">
            We receive, inspect, store, and redeliver your furniture when you're ready. Whether you need short-term staging between phases or long-term warehousing, we've got the space and the crew.
          </p>
        </ServiceHero>

        {/* ── H2: WHEN YOU NEED STORAGE ───────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-storage-chicago-il/, fetched 2026-05-15 */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              When Commercial Furniture Storage Makes Sense
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-3">Logistics Require It</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  If furniture modules or components arrive separately, or if you don't have storage capacity on-site, we receive and hold them until everything is in and ready for installation. No partial installs, no components sitting in a hallway.
                </p>
              </div>
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-3">Moves, Adds, Changes (MAC)</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  We assist with on-site planning, work order management, and physical reconfiguration for your furniture MAC projects. We can store components between phases if the project runs in stages.
                </p>
              </div>
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-3">Decommissions and Teardowns</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  When a space is being cleared, we can dispose of or store your furniture. Whether you need it held for reuse at another location or need the space fully vacated, we handle the teardown and storage.
                </p>
              </div>
            </div>
            <p className="text-[#535353] leading-relaxed mt-6">
              Common projects we support:{' '}
              office or facility expansions and downsizing, commercial space reconfigurations and office remodels, and new commercial office spaces, healthcare facilities, and restaurants or bars.
            </p>
          </div>
        </section>

        {/* ── H2: HOW WE HANDLE YOUR FURNITURE ────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-storage-chicago-il/, fetched 2026-05-15 */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              How We Handle Your Furniture
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              We will receive, store, and redeliver commercial office furniture for any size project.
            </p>
            <p className="text-[#292929] leading-relaxed mb-4">
              We inspect each piece of furniture, component, or material as it arrives. Then we cross-check the bill of lading with your order. This way we can confirm your product arrives undamaged and that it matches the original purchase order.
            </p>
            <p className="text-[#292929] leading-relaxed mb-6">
              If items are missing or damaged, we report them to you or the vendor for immediate correction. This allows time for reorder and delivery before your{' '}
              <Link href="/services/commercial-furniture-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                commercial furniture installation
              </Link>.
            </p>
            <div className="bg-[#F8F8F8] border-l-4 border-[#800000] pl-6 py-4 pr-4">
              <p className="text-[#292929] font-semibold mb-1">Nothing goes to the job site until it's confirmed complete.</p>
              <p className="text-sm text-[#535353]">We cross-check every delivery against the purchase order before it leaves our dock. If something is missing or wrong, we catch it here, not at the install.</p>
            </div>
          </div>
        </section>

        {/* ── H2: WAREHOUSE LOCATIONS ─────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/services/commercial-office-furniture-storage-chicago-il/, fetched 2026-05-15 */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Our Warehouse Locations Near Chicago
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-2">Primary Warehouse (Wauconda, IL)</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  Our primary office furniture warehouse is in Wauconda, IL, northwest of Chicago. 15,000+ square feet of climate-controlled storage space operated by experienced warehouse staff.
                </p>
              </div>
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-2">Secondary Warehouse (Near O'Hare)</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  Our secondary warehouse near Chicago O'Hare International Airport has 14 dock-height doors, a drive-up ramp to expedite traffic flow, and racking capacity for up to 350 skids. Climate controlled.
                </p>
              </div>
            </div>
            <p className="text-[#535353] leading-relaxed mt-6">
              Between both locations, we have over 55,000 square feet of warehouse space available. If you need{' '}
              <Link href="/services/office-relocation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                office relocation services
              </Link>{' '}
              alongside storage, we handle both.
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
          heading="Get a Quote for Commercial Furniture Storage"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

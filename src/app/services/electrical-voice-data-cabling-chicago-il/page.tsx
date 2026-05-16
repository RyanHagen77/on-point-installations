import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata({
  title: 'Electrical, Voice & Data Cabling Chicago | On Point Installations',
  description: 'Commercial electrical, voice, and data cabling installation in Chicago, IL. High and low voltage for office furniture systems. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/electrical-voice-data-cabling-chicago-il/`,
});

// SEO-driven FAQ content: drafted per Voice Rules. See docs/known-issues.md
const FAQS = [
  {
    question: 'What electrical work do you do for office furniture?',
    answer: "We handle high voltage electrical for cubicle and panel systems: base feeds, power poles, and the connections that run power through the system. We also add and repair outlets, install high-efficiency lighting, and handle electrical disconnects and reconnects for office furniture during relocations.",
  },
  {
    question: 'What voice and data cabling do you run?',
    answer: "We run Cat 6, Cat 7, and fiber optic cabling. We install overhead paging systems and television mounts for conference rooms. If you need structured cabling for a new office buildout or an upgrade to an existing system, we handle it.",
  },
  {
    question: 'Can you handle electrical disconnect and reconnect during an office move?',
    answer: "Yes. When you relocate an office, the furniture systems need to be disconnected before teardown and reconnected at the new location. We handle both: disconnect at the old address, reconnect at the new one. No need to bring in a separate electrical contractor for the furniture systems.",
  },
  {
    question: 'Who pulls the permits?',
    answer: "We pull the electrical permits. When a building's general contractor or property manager is involved, we coordinate with them directly. If you're not sure what permits your project needs, call us and we'll sort it out before work starts.",
  },
  {
    question: 'Are you licensed and insured for electrical work in Illinois?',
    answer: "Yes. On Point Installations is fully licensed and insured. We carry general liability and workers' compensation coverage on every job.",
  },
];

export default function ElectricalVoiceDataCablingPage() {
  return (
    <>
      <ServiceSchema
        name="Electrical, Voice & Data Cabling in Chicago, IL"
        description="Commercial electrical, voice, and data cabling installation in Chicago and the greater Chicagoland area. On Point Installations handles high voltage electrical for cubicle and panel systems, Cat 6, Cat 7, and fiber optic cabling, overhead paging, and conference room AV for offices of any size."
        url={`${SITE.domain}/services/electrical-voice-data-cabling-chicago-il/`}
        areaServed="Chicago"
      />
      <FAQSchema items={FAQS} />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Electrical, Voice & Data Cabling Chicago', url: '/services/electrical-voice-data-cabling-chicago-il/' },
          ]}
          h1="Electrical, Voice & Data Cabling in Chicago, IL"
          imageSrc="/images/on-point-installations-electrical-voice-data.jpg"
          imageAlt="Commercial electrical and data cabling installation for office furniture systems by On Point Installations in Chicago, IL"
          imageWidth={2000}
          imageHeight={1295}
        >
          {/* Near-verbatim from onpointinstallations.com/services/electrical-voice-and-data-cabling-for-your-commercial-installation/, fetched 2026-05-15 */}
          <p className="text-[#292929] leading-relaxed mb-4">
            Having new furniture installed is exciting. Dealing with multiple companies to finish the job isn't. On Point Installations handles both: delivery, assembly, and installation of your furniture, plus the power and low voltage cabling your employees need to get back to work.
          </p>
          {/* "optimize your office setting" from live site recast: "optimize" is a prohibited verb per CLAUDE.md Voice Rules */}
          <p className="text-[#535353] leading-relaxed mb-6">
            Including electrical in your office transition keeps your people connected from day one. If you skip it, you could spend weeks waiting to reconnect your team to their data centers and networks. When we handle the furniture and the electrical together, you're back at work with everything in place.{' '}
            <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
              Get a free quote
            </Link>{' '}
            or call{' '}
            <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
              {SITE.phone}
            </a>.
          </p>
        </ServiceHero>

        {/* ── H2: SERVICES OVERVIEW ───────────────────────────────────── */}
        {/* Intro cards drafted per Voice Rules; bullet details verbatim from live site */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What Our Electrical &amp; Cabling Services Cover
            </h2>
            <p className="text-[#292929] leading-relaxed mb-8">
              Our electrical work covers two areas: high voltage for power and low voltage for voice and data. Both are available as part of a furniture installation, a relocation, or as standalone scopes.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-2">High Voltage Electrical</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  Base feeds and power poles for cubicle and modular office systems, outlets, high-efficiency lighting, motion controls, and building rewires when the project calls for it.
                </p>
              </div>
              <div className="bg-white border border-[#E9E9E9] rounded-[3px] p-6">
                <h3 className="font-bold text-[#292929] mb-2">Voice &amp; Data Cabling</h3>
                <p className="text-sm text-[#535353] leading-relaxed">
                  Cat 6, Cat 7, and fiber optic runs for cubicles, private offices, and conference rooms. Overhead paging systems and television mounts for video calls. All cabling is tested and certified on completion.
                </p>
              </div>
            </div>
            <div className="relative rounded-sm overflow-hidden shadow-md mt-8">
              <Image
                src="/images/on-point-installations-electrical-power-strip.jpg"
                alt="Commercial electrical power strip and outlet installation for office furniture systems in Chicago, IL"
                width={1920}
                height={1280}
                className="w-full h-auto object-cover"
                quality={85}
                sizes="(min-width: 1320px) 1256px, (min-width: 640px) calc(100vw - 48px), 100vw"
              />
            </div>
          </div>
        </section>

        {/* ── H2: HIGH VOLTAGE ────────────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/services/electrical-voice-and-data-cabling-for-your-commercial-installation/, fetched 2026-05-15 */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              High Voltage Electrical for Chicago Office Furniture
            </h2>
            <p className="text-[#292929] leading-relaxed mb-6">
              On Point Installations offers high voltage electrical installations to supply the main power sources to cubicles and modular furniture systems. Our experienced staff can handle any electrical project your office requires.
            </p>
            {/* Verbatim from onpointinstallations.com/services/electrical-voice-and-data-cabling-for-your-commercial-installation/, fetched 2026-05-16 */}
            <div className="relative rounded-sm overflow-hidden shadow-md mb-8">
              <Image
                src="/images/on-point-installations-high-voltage-electrical-install.jpg"
                alt="High voltage electrical installation for modular office cubicle systems by On Point Installations in Chicago, IL"
                width={800}
                height={700}
                className="w-full h-auto object-cover"
                quality={85}
                sizes="(min-width: 1320px) 1256px, (min-width: 640px) calc(100vw - 48px), 100vw"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-[#292929] mb-3">Scope of Work</h3>
                <ul className="space-y-2">
                  {[
                    'Install or disconnect base feeds and power poles for modular office furniture',
                    'Add or repair outlets',
                    'Install high-efficiency lighting and eco-friendly motion controls',
                    'Rewire entire buildings when the project scope calls for it',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {/* Drafted per Voice Rules: needs Brian review. See docs/known-issues.md */}
                <h3 className="font-bold text-[#292929] mb-3">Why Electrical and Furniture Go Together</h3>
                <p className="text-sm text-[#535353] leading-relaxed mb-3">
                  Office furniture systems need power connected at the right points in the right sequence. If the electrical isn't planned with the furniture install in mind, you end up with panels that don't line up with the feeds, or a crew waiting on an electrician who isn't on-site.
                </p>
                <p className="text-sm text-[#535353] leading-relaxed">
                  We do both. One call covers the furniture installation and the electrical work.
                </p>
              </div>
            </div>
            <p className="text-[#535353] leading-relaxed mt-6">
              Need{' '}
              <Link href="/services/commercial-furniture-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                commercial furniture installation
              </Link>{' '}
              alongside the electrical work? We scope and schedule both together.
            </p>
          </div>
        </section>

        {/* ── H2: VOICE & DATA ────────────────────────────────────────── */}
        {/* Near-verbatim from live site; opening AI tell construction removed per Voice Rules */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Voice &amp; Data Cabling for Chicago Offices
            </h2>
            <p className="text-[#292929] leading-relaxed mb-6">
              We install voice and data cabling for new and existing cubicles, private offices, and conference rooms. That includes overhead paging systems and televisions for video calls.
            </p>
            {/* Verbatim from onpointinstallations.com/services/electrical-voice-and-data-cabling-for-your-commercial-installation/, fetched 2026-05-16 */}
            <div className="relative rounded-sm overflow-hidden shadow-md mb-8">
              <Image
                src="/images/on-point-installations-fiber-optic-data-cabling.jpg"
                alt="Fiber optic data cabling installation for commercial office network infrastructure in Chicago, IL"
                width={800}
                height={700}
                className="w-full h-auto object-cover"
                quality={85}
                sizes="(min-width: 1320px) 1256px, (min-width: 640px) calc(100vw - 48px), 100vw"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-[#292929] mb-3">Cabling We Run</h3>
                <ul className="space-y-2">
                  {[
                    'Cat 6 and Cat 7 structured cabling',
                    'Fiber optic cabling',
                    'Unshielded and shielded twisted pair copper cabling',
                    'Overhead paging systems',
                    'Conference room television installations',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {/* Verbatim from live site */}
                <h3 className="font-bold text-[#292929] mb-3">Testing and Certification</h3>
                <p className="text-sm text-[#535353] leading-relaxed mb-3">
                  We install, test, and certify all cabling runs. Your network and data lines are confirmed working before we leave the site.
                </p>
                <p className="text-sm text-[#535353] leading-relaxed">
                  If your project includes an office relocation with electrical disconnect and reconnect, see our{' '}
                  <Link href="/services/office-relocation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">
                    office relocation services
                  </Link>{' '}
                  page for full scope.
                </p>
              </div>
            </div>
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
          heading="Get a Quote for Electrical & Cabling Services"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

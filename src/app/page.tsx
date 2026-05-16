import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE, PRIMARY_SERVICES } from '@/lib/constants';
import LocalBusinessSchema from '@/components/schema/LocalBusinessSchema';
import OrganizationSchema from '@/components/schema/OrganizationSchema';
import WebSiteSchema from '@/components/schema/WebSiteSchema';

export const metadata = generatePageMetadata({
  title: 'Office Furniture Installer Chicago IL | On Point Installations',
  description:
    "On Point Installations is Chicago's trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.",
  canonical: `${SITE.domain}/`,
});

// Service card descriptions — verbatim from onpointinstallations.com service pages (fetched 2026-05-15)
const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'commercial-furniture-installation-chicago-il':
    'When you need experienced, highly skilled office furniture installers in the Greater Chicago Metropolitan Area, look no further than On Point Installations.',
  'office-relocation-chicago-il':
    'If you\'re a commercial furniture dealer working with a company that is relocating within the Chicago Tristate Area, we can help.',
  'commercial-office-furniture-storage-chicago-il':
    'On Point Installations provides commercial office furniture storage in our 15,000-square-foot facility and has an additional 40,000 square feet available in a secondary warehouse.',
  'commercial-space-planning-chicago-il':
    'On Point Installations, Inc. provides design support services to create flexible, responsive and supportive work environments.',
  'electrical-voice-data-cabling-chicago-il':
    'That\'s why On Point Installations takes care of everything for you, from delivery, assembly, and installation of your furniture, to installing the required power and low voltage cabling.',
  'artwork-installation-chicago-il':
    'Art can transform any space, which is why many residential, commercial, and even industrial buildings display pictures, paintings, mirrors, and sculptures.',
  'window-treatment-installation-chicago-il':
    'Having a view is a great way to improve productivity, wellbeing, and overall morale. On Point Installations offers professional window treatment installations to keep your building cool, comfortable, and stylish.',
  'cubicle-wall-upholstery-cleaning-chicago-il':
    'At On Point Installations, we offer commercial specialty deep cleaning services for our installation customers in the Chicago Tristate Area.',
};

// Who We Serve — verbatim from live site (onpointinstallations.com, fetched 2026-05-15)
const WHO_WE_SERVE = [
  'Office Furniture Dealerships and Sales Staff',
  'Corporate Facilities Managers and Procurement Teams',
  'Commercial Property Managers (move-ins and move-outs)',
  'Commercial Office Furniture Manufacturers',
  'Restaurants, Bars, and the Hospitality Industry',
  'Healthcare Facilities, including medical offices and long-term care facilities',
];

// Projects We Handle — verbatim from live site (onpointinstallations.com, fetched 2026-05-15)
const FURNITURE_SERVICES = [
  'Office or facility moves, adds, changes (MAC)',
  'Commercial office relocations',
  'Office decommissions, teardowns and removals',
  'Office or facility expansions or downsizing',
  'Commercial space reconfigurations or office remodels',
  'New commercial office spaces, healthcare facilities, or restaurants/bars',
];

// Furniture brands — verbatim from live site
const BRANDS = [
  'AIS', 'Allsteel', 'Bernhardt', 'Friant', 'Haworth', 'Herman Miller',
  'Hon', 'KI', 'Kimball', 'Knoll', 'OFS', 'Steelcase', 'Teknion', 'Three H', 'Trendway',
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <main>

        {/* ── 1. HERO ───────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-14 lg:py-20">
              <div>
                <h1 className="text-[32px] leading-[1.15] sm:text-[42px] sm:leading-tight lg:text-5xl font-bold text-[#800000] mb-4">
                  Commercial Office Furniture Installer in Chicago, IL
                </h1>
                <p className="text-lg text-[#535353] mb-6 font-medium">
                  Non-union. Fully insured. 11,000+ projects since 2010.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={SITE.phoneHref}
                    className="bg-[#800000] text-white font-semibold uppercase tracking-wide px-7 py-3.5 rounded-[3px] hover:bg-[#5A0000] transition-colors text-center"
                  >
                    Call {SITE.phone}
                  </a>
                  <Link
                    href="/contact/"
                    className="border-2 border-[#800000] text-[#800000] font-semibold uppercase tracking-wide px-7 py-3.5 rounded-[3px] hover:bg-[#800000] hover:text-white transition-colors text-center"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </div>
              <div className="relative rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/images/chicago-office-furniture-installation.jpg"
                  alt="Commercial office furniture installation project completed by On Point Installations in Chicago, IL"
                  width={1920}
                  height={1280}
                  className="w-full h-auto object-cover"
                  priority
                  quality={85}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST BAR ──────────────────────────────────────────── */}
        {/* Source: Phase 2 spec — see docs/spec-additions.md */}
        <section className="bg-[#800000] py-8 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-2xl sm:text-3xl font-bold">5.0★</div>
                <div className="text-sm text-white/80 mt-1">25 Google Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">15+</div>
                <div className="text-sm text-white/80 mt-1">Years in Business</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">11,000+</div>
                <div className="text-sm text-white/80 mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">12–15</div>
                <div className="text-sm text-white/80 mt-1">Person Crew</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. MISSION ────────────────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com, fetched 2026-05-15 */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#800000] mb-4">Our Mission</h2>
            <p className="text-[#292929] leading-relaxed mb-5">
              At On Point Installations, our mission is to provide exceptional, customer-focused
              furniture installation services. We are committed to delivering quality workmanship,
              ensuring client satisfaction, and fostering long-term relationships with our partners
              through professionalism, precision, and integrity.
            </p>
            <p className="text-[#292929] leading-relaxed mb-8">
              From our Wauconda, IL, headquarters, On Point Installations provides fully insured,
              non-union commercial furniture services throughout Chicagoland and the Tri-State Area,
              including the city of Chicago, its suburbs, Northwest Indiana, and Southeastern Wisconsin.
            </p>
            <Link
              href="/about/"
              className="inline-block bg-[#800000] text-white font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors"
            >
              Read About Us
            </Link>
          </div>
        </section>

        {/* ── 4. SERVICES GRID ──────────────────────────────────────── */}
        <section className="bg-white py-16 px-4 border-b border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#800000] mb-3">
                Commercial Furniture Installation Services in Chicago
              </h2>
              <p className="text-[#535353] max-w-2xl mx-auto">
                From{' '}
                <Link href="/services/commercial-furniture-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">commercial furniture installation Chicago</Link>{' '}
                businesses rely on, to{' '}
                <Link href="/services/office-relocation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">office relocation services</Link>{' '}
                and{' '}
                <Link href="/services/commercial-space-planning-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">commercial space planning</Link>,
                On Point Installations handles the full scope of commercial furniture services.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRIMARY_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group block bg-white border border-[#E9E9E9] overflow-hidden hover:border-[#800000] hover:shadow-md transition-all rounded-[3px]"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={`/images/${service.image}`}
                      alt={service.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#292929] group-hover:text-[#800000] transition-colors mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#535353] leading-relaxed mb-4">
                      {SERVICE_DESCRIPTIONS[service.slug]}
                    </p>
                    <span className="text-sm font-semibold text-[#800000] uppercase tracking-wide">
                      Learn more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. WHO WE SERVE ───────────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com, fetched 2026-05-15 */}
        <section className="bg-[#F8F8F8] py-16 px-4 border-b border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-[#800000] mb-5">Who We Serve</h2>
                <p className="text-[#292929] mb-5 leading-relaxed">
                  Since 2010, our team has provided exceptional commercial furniture installation services
                  throughout the Chicago Metropolitan Area. Although we're capable of installing all
                  commercial furniture, our focus has been on serving:
                </p>
                <ul className="space-y-2 mb-8">
                  {WHO_WE_SERVE.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about/"
                  className="inline-block bg-[#800000] text-white font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors"
                >
                  Read About Us
                </Link>
              </div>

              {/* ── 6. PROJECTS WE HANDLE (right column) ── */}
              {/* Verbatim from onpointinstallations.com, fetched 2026-05-15 */}
              <div>
                <h2 className="text-3xl font-bold text-[#800000] mb-5">Projects We Handle</h2>
                <ul className="space-y-2">
                  {FURNITURE_SERVICES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#292929]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. FURNITURE BRANDS WE INSTALL ────────────────────────── */}
        {/* Verbatim from onpointinstallations.com, fetched 2026-05-15 */}
        <section className="bg-white py-16 px-4 border-b border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#800000] mb-4">Furniture Brands We Install</h2>
            <p className="text-[#292929] mb-8 max-w-3xl leading-relaxed">
              On Point Installations offers a broad array of tailored office furniture installation in Chicago
              designed to deliver the most cost effective solution for your commercial furniture requirements.
              Contact us today to learn more about our service offering.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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

        {/* ── 8. CTA BLOCK ──────────────────────────────────────────── */}
        {/* Verbatim heading and description from onpointinstallations.com, fetched 2026-05-15 */}
        <section className="bg-[#800000] py-14 px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Get an On Point Quote or Consultation
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Looking for expert office furniture installation in Chicago? On Point Installations delivers
              tailored, cost-effective solutions for your commercial furniture needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact/"
                className="bg-white text-[#800000] font-semibold uppercase tracking-wide px-8 py-3.5 rounded-[3px] hover:bg-[#F8F8F8] transition-colors text-lg"
              >
                Contact Us
              </Link>
              <a
                href={SITE.phoneHref}
                className="border-2 border-white text-white font-semibold uppercase tracking-wide px-8 py-3.5 rounded-[3px] hover:bg-white hover:text-[#800000] transition-colors text-lg"
              >
                Call {SITE.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60 space-x-3">
              <Link href="/reviews/" className="underline text-white/80 hover:text-white">
                See what our clients say
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/project-gallery/" className="underline text-white/80 hover:text-white">
                View our completed projects
              </Link>
            </p>
          </div>
        </section>

      </main>
    </>
  );
}

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

// Service card descriptions — contractor voice, no em dashes
const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'commercial-furniture-installation-chicago-il':
    'New office buildouts, reconfigurations, and complete furniture installs for businesses across Chicagoland.',
  'cubicle-installation-chicago-il':
    'Panel systems, cubicle assembly, and workstation configurations for offices of any size.',
  'office-relocation-chicago-il':
    'Teardown, transport, and reinstallation. On schedule, without surprises.',
  'systems-furniture-installation-chicago-il':
    'Certified installers for Herman Miller, Steelcase, Haworth, Knoll, Teknion, and more.',
  'office-furniture-delivery-setup-chicago-il':
    'White-glove delivery, assembly, and placement for commercial furniture orders of any size.',
  'commercial-space-planning-chicago-il':
    'Floor plan verification, on-site measurement, and pre-install coordination before the truck arrives.',
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

// Commercial Furniture Services — verbatim from live site (onpointinstallations.com, fetched 2026-05-15)
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
                <h1 className="text-4xl sm:text-5xl font-bold text-[#800000] leading-tight mb-4">
                  Commercial Office Furniture Installer in Chicago, IL
                </h1>
                <p className="text-lg text-[#535353] mb-2 font-medium">
                  Non-union. Fully insured. 11,000+ projects since 2010.
                </p>
                <p className="text-[#5A5A5A] mb-8 leading-relaxed">
                  When your Chicago office needs furniture installed right, on time, on budget, and without
                  the need to babysit the crew,{' '}
                  <strong>On Point Installations</strong> is the team dealers and facility managers call
                  first. We handle{' '}
                  <Link
                    href="/services/commercial-furniture-installation-chicago-il/"
                    className="text-[#800000] underline hover:text-[#5A0000] font-medium"
                  >
                    commercial furniture installation Chicago
                  </Link>{' '}
                  businesses trust for complete office buildouts, cubicle systems, and systems furniture.
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
                  src="/images/hero-home.jpg"
                  alt="Commercial office furniture installation project completed by On Point Installations in Chicago, IL"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. MISSION / INTRO ────────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com, fetched 2026-05-15 */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8 max-w-3xl">
            <p className="text-[#292929] leading-relaxed mb-5">
              At On Point Installations, our mission is to provide exceptional, customer-focused furniture
              installation services. We are committed to delivering quality workmanship, ensuring client
              satisfaction, and fostering long-term relationships with our partners through professionalism,
              precision, and integrity.
            </p>
            <p className="text-[#292929] leading-relaxed mb-8">
              From our Wauconda, IL, headquarters, On Point Installations provides fully insured, non-union
              commercial furniture services throughout Chicagoland and the Tri-State Area, including the city
              of Chicago, its suburbs, Northwest Indiana, and Southeastern Wisconsin.
            </p>
            <Link
              href="/about/"
              className="inline-block bg-[#800000] text-white font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* ── 3. SERVICES GRID ──────────────────────────────────────── */}
        <section className="bg-white py-16 px-4 border-b border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#800000] mb-3">
                Commercial Furniture Installation Services in Chicago
              </h2>
              <p className="text-[#535353] max-w-2xl mx-auto">
                Whether you need{' '}
                <Link href="/services/cubicle-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">cubicle installation</Link>,{' '}
                <Link href="/services/office-relocation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">office relocation services</Link>, or{' '}
                <Link href="/services/commercial-space-planning-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">commercial space planning</Link>,
                we cover it all under one roof.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRIMARY_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group block bg-white border border-[#E9E9E9] p-6 hover:border-[#800000] hover:shadow-md transition-all rounded-[3px]"
                >
                  <div className="w-8 h-0.5 bg-[#800000] mb-4" />
                  <h3 className="font-bold text-[#292929] group-hover:text-[#800000] transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#535353] leading-relaxed mb-4">
                    {SERVICE_DESCRIPTIONS[service.slug]}
                  </p>
                  <span className="text-sm font-semibold text-[#800000] uppercase tracking-wide">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. WHO WE SERVE ───────────────────────────────────────── */}
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

              {/* ── 5. COMMERCIAL FURNITURE SERVICES (right column) ── */}
              {/* Verbatim from onpointinstallations.com, fetched 2026-05-15 */}
              <div>
                <h2 className="text-3xl font-bold text-[#800000] mb-5">Commercial Furniture Services</h2>
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

        {/* ── 6. FURNITURE BRANDS WE INSTALL ────────────────────────── */}
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

        {/* ── 7. CTA BLOCK ──────────────────────────────────────────── */}
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

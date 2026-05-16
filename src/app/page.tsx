import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE, PRIMARY_SERVICES, SERVICE_CITIES } from '@/lib/constants';
import LocalBusinessSchema from '@/components/schema/LocalBusinessSchema';
import OrganizationSchema from '@/components/schema/OrganizationSchema';
import WebSiteSchema from '@/components/schema/WebSiteSchema';
import ReviewCard from '@/components/ui/ReviewCard';

export const metadata = generatePageMetadata({
  title: 'Office Furniture Installer Chicago IL | On Point Installations',
  description:
    "On Point Installations is Chicago's trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.",
  canonical: `${SITE.domain}/`,
});

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'commercial-furniture-installation-chicago-il':
    'New office buildouts, reconfigurations, and complete furniture installs for businesses across Chicagoland.',
  'cubicle-installation-chicago-il':
    'Panel systems, cubicle assembly, and workstation configurations for offices of any size.',
  'office-relocation-chicago-il':
    'Coordinated teardown, transport, and reinstallation — delivered on schedule, without surprises.',
  'systems-furniture-installation-chicago-il':
    'Certified installers for Herman Miller, Steelcase, Haworth, Knoll, Teknion, and more.',
  'office-furniture-delivery-setup-chicago-il':
    'White-glove delivery, assembly, and placement for commercial furniture orders of any size.',
  'commercial-space-planning-chicago-il':
    'Floor plan verification, on-site measurement, and pre-install coordination before the truck arrives.',
};

const REVIEWS = [
  {
    author: 'David M.',
    text: "I'll be honest — I selfishly don't want to recommend On Point Installations to anyone. They're that good, and I don't want my competitors to find them. Brian's crew shows up on time, works clean, and the job comes in at the quoted price every single time.",
    rating: 5 as const,
    company: 'Facilities Director',
  },
  {
    author: 'Jennifer K.',
    text: "We've used On Point for three office builds now. End-of-day photo updates, 90-degree corners, not a single panel out of level. When a shipment got delayed at the transfer station, Brian personally drove out to retrieve it. That's the kind of crew you fight to keep.",
    rating: 5 as const,
    company: 'Office Manager',
  },
  {
    author: 'Tom R.',
    text: "As a furniture dealer, I need an installation partner I can stake my reputation on. On Point has never let me down. They know every major system — Herman Miller, Steelcase, Haworth, all of them — and they don't need to be babysat.",
    rating: 5 as const,
    company: 'Commercial Furniture Dealer',
  },
];

const DIFFERENTIATORS = [
  {
    headline: 'Non-Union Flexibility',
    body: 'Our non-union crew means no jurisdictional restrictions, no inflated labor rates, and the same experienced team from start to finish. The same people who quoted your project are the ones installing it.',
  },
  {
    headline: 'No Subcontracting',
    body: "When you hire On Point, you get On Point — full stop. We never farm out your project to a sub. Every install is handled by our own 12–15 person crew with 130+ years of combined experience.",
  },
  {
    headline: 'Quoted Price Is the Final Price',
    body: "Clients consistently note that 98% of jobs come in at the quoted price. We measure carefully, plan thoroughly, and don't hit you with change orders after the fact.",
  },
  {
    headline: 'Same-Day Communication',
    body: "End-of-day photo updates. Direct access to Brian. Immediate response when an issue comes up on site. You'll never wonder what's happening with your project.",
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <main>

        {/* ─── 1. HERO ──────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-14 lg:py-20">
              {/* Copy */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-[#800000] leading-tight mb-4">
                  Commercial Office Furniture Installer in Chicago, IL
                </h1>
                <p className="text-lg text-[#535353] mb-2 font-medium">
                  Non-union. Fully insured. 11,000+ projects since 2010.
                </p>
                <p className="text-[#5A5A5A] mb-8 leading-relaxed">
                  When your Chicago office needs furniture installed right — on time, on budget, and without
                  the need to babysit the crew —{' '}
                  <strong>On Point Installations</strong> is the team dealers and facility managers call first.
                  We handle{' '}
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
              {/* Hero image */}
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

        {/* ─── 2. TRUST BAR ─────────────────────────────────────────── */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-8" aria-label="Company credentials">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#800000]">5.0★</p>
                <p className="text-sm text-[#535353] mt-1">25 Google Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#800000]">15+</p>
                <p className="text-sm text-[#535353] mt-1">Years in Business</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#800000]">11,000+</p>
                <p className="text-sm text-[#535353] mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#800000]">12–15</p>
                <p className="text-sm text-[#535353] mt-1">Person Crew</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. SERVICES GRID ─────────────────────────────────────── */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#800000] mb-3">
                Commercial Furniture Installation Services in Chicago
              </h2>
              <p className="text-[#535353] max-w-2xl mx-auto">
                From single-office installs to multi-floor buildouts, On Point handles every phase of the project.
                Whether you need{' '}
                <Link href="/services/cubicle-installation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">cubicle installation</Link>,{' '}
                <Link href="/services/office-relocation-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">office relocation services</Link>, or{' '}
                <Link href="/services/commercial-space-planning-chicago-il/" className="text-[#800000] underline hover:text-[#5A0000]">commercial space planning</Link> — we cover it all under one roof.
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

        {/* ─── 4. WHY ON POINT ──────────────────────────────────────── */}
        <section className="bg-[#F8F8F8] py-16 px-4 border-t border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: image + pull quote */}
              <div>
                <div className="relative rounded-sm overflow-hidden shadow-md mb-6">
                  <Image
                    src="/images/office-installation.jpg"
                    alt="On Point Installations crew completing a commercial office furniture installation in the Chicago area"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <blockquote className="border-l-4 border-[#800000] pl-5 italic text-[#535353]">
                  <p className="text-base leading-relaxed">
                    &ldquo;I&rsquo;ll be honest — I selfishly don&rsquo;t want to recommend On Point Installations.
                    They&rsquo;re that good, and I don&rsquo;t want my competitors to find them.&rdquo;
                  </p>
                  <footer className="mt-2 text-sm font-semibold text-[#800000] not-italic">
                    — Facilities Director, Chicago
                  </footer>
                </blockquote>
              </div>
              {/* Right: differentiators */}
              <div>
                <h2 className="text-3xl font-bold text-[#800000] mb-2">
                  Why Dealers and Facilities Teams Choose On Point Installations
                </h2>
                <p className="text-[#535353] mb-8">
                  On Point has been handling{' '}
                  <Link
                    href="/services/commercial-furniture-installation-chicago-il/"
                    className="text-[#800000] underline hover:text-[#5A0000]"
                  >
                    commercial furniture installation Chicago
                  </Link>{' '}
                  businesses depend on since 2010. Here&rsquo;s what makes the difference.
                </p>
                <div className="space-y-7">
                  {DIFFERENTIATORS.map((d) => (
                    <div key={d.headline} className="flex gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#800000] flex-shrink-0 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#292929] mb-1">{d.headline}</h3>
                        <p className="text-sm text-[#535353] leading-relaxed">{d.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact/"
                    className="bg-[#800000] text-white font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors text-center"
                  >
                    Get a Free Quote
                  </Link>
                  <Link
                    href="/about/"
                    className="border-2 border-[#800000] text-[#800000] font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#800000] hover:text-white transition-colors text-center"
                  >
                    About Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. SERVICE AREA ──────────────────────────────────────── */}
        <section className="bg-white py-14 px-4 border-t border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-[#800000] mb-3">
                  Serving the Greater Chicagoland Area
                </h2>
                <p className="text-[#535353] text-sm leading-relaxed mb-5">
                  Based in Wauconda, IL, On Point Installations serves businesses across the full Chicago metro
                  and Tri-State region. We routinely install in downtown Chicago high-rises, suburban office
                  parks, healthcare facilities, and government buildings — wherever your project is.
                </p>
                <Link
                  href="/service-area/chicagoland-commercial-furniture-installation/"
                  className="text-sm font-semibold text-[#800000] uppercase tracking-wide hover:underline"
                >
                  View all service areas →
                </Link>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICE_CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-area/${city.slug}/`}
                    className="block border border-[#E9E9E9] px-4 py-3 rounded-[3px] text-sm font-medium text-[#292929] hover:border-[#800000] hover:text-[#800000] transition-colors"
                  >
                    {city.name}, {city.state}
                  </Link>
                ))}
                {[
                  { name: 'Elgin, IL', href: '/service-area/chicagoland-commercial-furniture-installation/' },
                  { name: 'Aurora, IL', href: '/service-area/chicagoland-commercial-furniture-installation/' },
                  { name: 'Joliet, IL', href: '/service-area/chicagoland-commercial-furniture-installation/' },
                  { name: 'Rockford, IL', href: '/service-area/chicagoland-commercial-furniture-installation/' },
                  { name: 'Kenosha, WI', href: '/service-area/chicagoland-commercial-furniture-installation/' },
                  { name: 'Gary, IN', href: '/service-area/chicagoland-commercial-furniture-installation/' },
                ].map((city) => (
                  <Link
                    key={city.name}
                    href={city.href}
                    className="block border border-[#E9E9E9] px-4 py-3 rounded-[3px] text-sm font-medium text-[#292929] hover:border-[#800000] hover:text-[#800000] transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. REVIEW SNIPPETS ───────────────────────────────────── */}
        <section className="bg-[#F3F3F3] py-16 px-4 border-t border-[#E9E9E9]">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#800000] mb-1">
                  5.0★ on Google — 25 Reviews
                </p>
                <h2 className="text-3xl font-bold text-[#292929]">
                  What Our Clients Say
                </h2>
              </div>
              <Link
                href="/reviews/"
                className="text-sm font-semibold text-[#800000] uppercase tracking-wide hover:underline whitespace-nowrap"
              >
                See what our clients say →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((review) => (
                <ReviewCard key={review.author} {...review} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. CTA BLOCK ─────────────────────────────────────────── */}
        <section className="bg-[#800000] py-14 px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Call us directly or fill out our quick quote form. We respond the same day — often within the hour.
              Serving Chicago, Schaumburg, Naperville, Waukegan, Wauconda, and all of Chicagoland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SITE.phoneHref}
                className="bg-white text-[#800000] font-semibold uppercase tracking-wide px-8 py-3.5 rounded-[3px] hover:bg-[#F8F8F8] transition-colors text-lg"
              >
                Call {SITE.phone}
              </a>
              <Link
                href="/contact/"
                className="border-2 border-white text-white font-semibold uppercase tracking-wide px-8 py-3.5 rounded-[3px] hover:bg-white hover:text-[#800000] transition-colors text-lg"
              >
                Get a Free Quote
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Or{' '}
              <Link href="/project-gallery/" className="underline text-white/80 hover:text-white">
                view our completed projects
              </Link>{' '}
              to see the quality of our work.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}

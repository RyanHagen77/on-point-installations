import Link from 'next/link';
import { SITE, NAP_SCHEMA, STATS_CALLOUT } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';
import type { CityServicePageProps } from '@/types/cityPage';

const DEFAULT_HERO_SRC = '/images/on-point-installations-office-installations.jpg';
// Alt text is intentionally generic. All city pages share this photo until Brian provides
// city-specific job-site photography. See docs/known-issues.md.
const DEFAULT_HERO_ALT = 'On Point Installations crew on a commercial office furniture installation';
const DEFAULT_HERO_WIDTH = 1920;
const DEFAULT_HERO_HEIGHT = 1280;

export default function CityServicePage({
  city,
  cityState,
  citySlug,
  slug,
  openingParagraph,
  whyChooseUs,
  serviceDetailsPara1,
  serviceDetailsPara2,
  serviceDetailsPara3,
  socialProof,
  faqs,
  localBusinessId,
  serviceDescription,
  serviceType,
  chicagoAnchor,
  serviceAreaAnchor,
  heroImageSrc = DEFAULT_HERO_SRC,
  heroImageAlt = DEFAULT_HERO_ALT,
  heroImageWidth = DEFAULT_HERO_WIDTH,
  heroImageHeight = DEFAULT_HERO_HEIGHT,
}: CityServicePageProps) {
  const canonicalUrl = `${SITE.domain}/services/${slug}/`;

  return (
    <>
      {/* ServiceSchema + FAQSchema rendered outside <main> so they precede the DOM.
          BreadcrumbList is emitted by ServiceHero > Breadcrumb. No explicit BreadcrumbSchema
          here; that would produce a duplicate BreadcrumbList block. */}
      <ServiceSchema
        name={`Commercial Furniture Installation in ${cityState}`}
        description={serviceDescription}
        url={canonicalUrl}
        areaServed={city}
        serviceType={serviceType}
      />
      <FAQSchema items={faqs} />
      {/* LocalBusiness schema for city-specific service focus.
          @id "#${localBusinessId}" distinguishes from homepage "#business" canonical entity
          and Chicago "#chicago-localbusiness". Dual @type per Prompt 11 mandate. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'ProfessionalService'],
            '@id': `${SITE.domain}/#${localBusinessId}`,
            name: SITE.name,
            url: canonicalUrl,
            telephone: SITE.phoneHref.replace('tel:', ''),
            address: NAP_SCHEMA,
            description: serviceDescription,
            areaServed: {
              '@type': 'City',
              name: city,
              containedInPlace: { '@type': 'State', name: 'Illinois' },
            },
          }),
        }}
      />

      <main>
        {/* ── HERO + OPENING ────────────────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: `Commercial Furniture Installation ${city}`, url: `/services/${slug}/` },
          ]}
          h1={`Commercial Furniture Installation in ${cityState}`}
          imageSrc={heroImageSrc}
          imageAlt={heroImageAlt}
          imageWidth={heroImageWidth}
          imageHeight={heroImageHeight}
        >
          <p className="text-[#292929] leading-relaxed mb-4">{openingParagraph}</p>
          <p className="text-[#535353] leading-relaxed mb-6">
            For projects that extend across the metro,{' '}
            <Link
              href="/services/commercial-furniture-installation-chicago-il/"
              className="text-[#800000] underline hover:text-[#5A0000]"
            >
              {chicagoAnchor}
            </Link>{' '}
            is our primary service page. See{' '}
            <Link
              href={`/service-area/${citySlug}/`}
              className="text-[#800000] underline hover:text-[#5A0000]"
            >
              {serviceAreaAnchor}
            </Link>{' '}
            for full coverage details in your area.
          </p>
        </ServiceHero>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Why {city} Businesses Choose On Point Installations
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">{whyChooseUs}</p>
            <p className="text-[#292929] leading-relaxed">
              Call {SITE.phone} or{' '}
              <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
                get a free quote for your {city} project
              </Link>{' '}
              online.
            </p>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ───────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What&apos;s Included in Every {city} Installation
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">{serviceDetailsPara1}</p>
            <p className="text-[#292929] leading-relaxed">{serviceDetailsPara2}</p>
            {serviceDetailsPara3 && (
              <p className="text-[#292929] leading-relaxed mt-4">{serviceDetailsPara3}</p>
            )}
          </div>
        </section>

        {/* ── SOCIAL PROOF ──────────────────────────────────────────────── */}
        {socialProof.kind === 'review' &&
          !socialProof.quote.startsWith('[REVIEW PLACEHOLDER') &&
          !socialProof.attribution.includes('[Customer First Name]') && (
            <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
              <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <p className="text-2xl mb-3 text-[#F5A623]" aria-label="5 stars">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                  <blockquote className="text-[#292929] text-lg leading-relaxed italic mb-3">
                    &ldquo;{socialProof.quote}&rdquo;
                  </blockquote>
                  <p className="text-[#535353] font-medium">{socialProof.attribution}</p>
                </div>
              </div>
            </section>
          )}
        {socialProof.kind === 'stats' && (
          <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
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
        )}

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <CTABlock
          variant="banner"
          heading={`Get a Quote for Your ${city} Commercial Furniture Installation`}
        />
      </main>
    </>
  );
}

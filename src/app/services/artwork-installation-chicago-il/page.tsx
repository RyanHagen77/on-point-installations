import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTABlock from '@/components/ui/CTABlock';
import ServiceSchema from '@/components/schema/ServiceSchema';
import FAQSchema from '@/components/schema/FAQSchema';

export const metadata = generatePageMetadata({
  title: 'Artwork Installation Chicago | On Point Installations',
  description: 'Professional commercial artwork installation in Chicago, IL. Commercial art, signage, and display mounting for offices and businesses. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/artwork-installation-chicago-il/`,
});

// SEO-driven FAQ content: drafted per Voice Rules. See docs/known-issues.md
const FAQS = [
  {
    question: 'What kinds of pieces have you installed?',
    answer: "Framed prints, large-format canvases, mirrors, wall-mounted sculptures, ceiling-suspended pieces, and art that needs on-site assembly or rigging. We've installed in commercial spaces, assisted living facilities, apartment common areas, and furniture showrooms.",
  },
  {
    question: 'Can you handle oversized or heavy work?',
    answer: "Yes. Oversized formats and heavy pieces are a regular part of what we do. We bring the right hardware, anchors, and padding for the piece and the wall type, and we plan the approach before the crew shows up.",
  },
  {
    question: 'Do you handle delivery and unpacking, or just installation?',
    answer: "Both. We handle it door to door: delivery to the site, unpacking, placement, installation, and cleanup. You don't need to coordinate a separate delivery crew.",
  },
  {
    question: 'How do you handle different wall types?',
    answer: "Drywall, brick, and glass partitions each need different hardware. We assess the wall before drilling and use the right mount for the surface. If a wall type presents a complication, we communicate before proceeding.",
  },
  {
    question: 'Are you insured for damage to valuable or oversized pieces?',
    answer: "Yes. On Point Installations carries general liability and workers' compensation on every job. If you have a specific question about coverage for a high-value piece, call us before the job starts.",
  },
];

export default function ArtworkInstallationPage() {
  return (
    <>
      <ServiceSchema
        name="Artwork Installation in Chicago, IL"
        description="Professional artwork installation for commercial and residential spaces throughout the Chicago metro. On Point Installations handles large prints, framed pieces, mirrors, wall-mounted and ceiling-suspended sculptures, and pieces requiring on-site construction."
        url={`${SITE.domain}/services/artwork-installation-chicago-il/`}
        areaServed="Chicago"
      />
      <FAQSchema items={FAQS} />
      <main>

        {/* ── BREADCRUMB + H1 + HERO ───────────────────────────────────── */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/' },
            { name: 'Artwork Installation Chicago', url: '/services/artwork-installation-chicago-il/' },
          ]}
          h1="Artwork Installation in Chicago, IL"
          imageSrc="/images/on-point-installations-artwork-installation.jpg"
          imageAlt="Commercial artwork installation completed by On Point Installations for a client in the Chicago, IL metro area"
          imageWidth={2000}
          imageHeight={1333}
        >
          {/* Verbatim from onpointinstallations.com/artwork-installation/, Wayback Machine snapshot 2025-10-07 */}
          <p className="text-[#292929] leading-relaxed mb-4">
            Art can transform any space, which is why many residential, commercial, and even industrial buildings display pictures, paintings, mirrors, and sculptures. While some small projects can be handled in-house, everyone can benefit from professional artwork installation.
          </p>
          {/* "If you're looking to..." recast: removed AI-tell construction per Voice Rules */}
          <p className="text-[#535353] leading-relaxed mb-6">
            If the project involves large pictures or heavy sculptures, call On Point Installations.{' '}
            <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
              Get a free quote
            </Link>{' '}
            or call{' '}
            <a href={SITE.phoneHref} className="text-[#800000] underline hover:text-[#5A0000]">
              {SITE.phone}
            </a>.
          </p>
        </ServiceHero>

        {/* ── H2: ARTWORK INSTALLATION IN CHICAGO ─────────────────────── */}
        {/* Near-verbatim from live site; "Whether it's...unparalleled attention to detail" recast per Voice Rules */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Artwork Installation in Chicago
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              On Point Installations provides skillful artwork installation that's professionally positioned to bring out the aesthetics in the room. Our team of professional technicians is experienced in installing and mounting pieces that may be difficult to manipulate and always prioritize safety and care when handling valuable artwork.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We handle oversized art, heavy sculptures, and pieces that require on-site construction. Padding, anchors, and the right hardware for the wall.
            </p>
          </div>
        </section>

        {/* ── H2: WHAT ON POINT INSTALLATIONS HANDLES ─────────────────── */}
        {/* Near-verbatim from live site; "By partnering...optimizing the layout" recast per Voice Rules */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              What On Point Installations Handles
            </h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              We handle it door to door: delivery, unpacking at the site, placement, installation, and cleanup.
            </p>
            <p className="text-[#292929] leading-relaxed">
              We have experience with small and large pictures, paintings, mirrors, vanities, wall mounted sculptures, ceiling suspended art, and many other mediums.
            </p>
          </div>
        </section>

        {/* ── H2: WHERE WE INSTALL ─────────────────────────────────────── */}
        {/* Near-verbatim from live site; "Our mission...quality expectations" omitted per Voice Rules */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
              Where We Install
            </h2>
            <p className="text-[#292929] leading-relaxed">
              On Point Installations installs artwork in both residential and commercial settings throughout the Chicagoland and Midwest region, including assisted living facilities, furniture dealerships, common areas in apartments and condos, individual units, throughout different types of rental properties, and more.
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
          heading="Get a Quote for Artwork Installation"
          subtext="Call us or submit the form. We'll get back to you the same day."
        />

      </main>
    </>
  );
}

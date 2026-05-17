import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ServiceHero from '@/components/ui/ServiceHero';
import CTABlock from '@/components/ui/CTABlock';
import PersonSchema from '@/components/schema/PersonSchema';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generatePageMetadata({
  title: 'About On Point Installations | Commercial Furniture Installers | Wauconda, IL',
  description: 'Brian Vetter founded On Point Installations in 2010. Learn about our team, our non-union advantage, and why Chicago businesses trust us for commercial furniture installation.',
  canonical: `${SITE.domain}/about/`,
});

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }]} />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        {/* Verbatim intro from onpointinstallations.com/about/, fetched 2026-05-16 */}
        <ServiceHero
          breadcrumbItems={[
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about/' },
          ]}
          h1="About On Point Installations"
          imageSrc="/images/on-point-installations-team-warehouse.jpg"
          imageAlt="On Point Installations non-union crew at the Wauconda, IL warehouse and office facility"
          imageWidth={2338}
          imageHeight={1122}
        >
          <p className="text-[#292929] leading-relaxed mb-6">
            On Point Installations, Inc. is a non-union commercial furniture installation company serving the Chicagoland Area.
          </p>
        </ServiceHero>

        {/* ── STATS BAR ────────────────────────────────────────────────── */}
        <section className="bg-[#800000] py-10 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
              <div>
                <dt className="text-3xl sm:text-4xl font-bold">{SITE.stats.projectsCompleted}</dt>
                <dd className="mt-1 text-sm sm:text-base text-white/80">Completed Projects</dd>
              </div>
              <div>
                <dt className="text-3xl sm:text-4xl font-bold">130+</dt>
                <dd className="mt-1 text-sm sm:text-base text-white/80">Years Combined Experience</dd>
              </div>
              <div>
                <dt className="text-3xl sm:text-4xl font-bold">{SITE.stats.employees}</dt>
                <dd className="mt-1 text-sm sm:text-base text-white/80">Person Crew</dd>
              </div>
              <div>
                <dt className="text-3xl sm:text-4xl font-bold">{SITE.reviews.rating}&#9733;</dt>
                <dd className="mt-1 text-sm sm:text-base text-white/80">{SITE.reviews.count} Google Reviews</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── OUR BEGINNINGS ───────────────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/about/, fetched 2026-05-16; "nearly 11,000" updated to "11,000+" per CLAUDE.md */}
        {/* Portrait: scoped exception to Phase 2 content-image rule -- 2-col section-anchor layout matching live site.
            See docs/design-decisions.md */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start">

              {/* Left column: portrait */}
              <div>
                <Image
                  src="/images/on-point-installations-brian-vetter.jpg"
                  alt="Brian Vetter, founder and owner of On Point Installations, Inc."
                  width={1200}
                  height={1200}
                  className="w-full h-auto rounded-sm shadow-md"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  quality={85}
                />
              </div>

              {/* Right column: heading + body + list */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">Our Beginnings</h2>
                <p className="text-[#292929] leading-relaxed mb-4">
                  After serving as a union installer for many years, Brian Vetter packed up his toolbox and ventured out on his own. That was in 2010. Since then, On Point Installations has grown to include a 15,000+ square foot office complex and commercial furniture storage warehouse. Brian and his team have completed 11,000+ projects.
                </p>
                <p className="text-[#292929] leading-relaxed mb-4">
                  These projects involve an array of{' '}
                  <Link href="/services/" className="text-[#800000] underline hover:text-[#5A0000]">
                    our services
                  </Link>
                  {' '}centering around the installation of commercial office furniture. The company also installs furniture in other locations, including:
                </p>
                <ul className="list-disc list-inside text-[#292929] space-y-1 ml-2">
                  <li>Corporate common areas</li>
                  <li>Office complexes</li>
                  <li>Restaurants, bars, and the hospitality industry</li>
                  <li>Senior living facilities</li>
                  <li>School offices and classrooms</li>
                  <li>Hospitals and healthcare facilities</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── THE ON POINT ADVANTAGE ───────────────────────────────────── */}
        {/* Near-verbatim from live site; heading simplified from "The On Point A++++++ Advantage"
            per docs/spec-additions.md. Six A-principles ported verbatim. */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-8">The On Point Advantage</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { term: 'Accuracy', def: "We're focused on getting it right. We are on point." },
                { term: 'Accountability', def: "We'll go that extra mile for our clients and each other. We follow through at every step." },
                { term: 'Accessibility', def: "We communicate throughout your project; you can find us when you need us." },
                { term: 'Attention', def: "We pay attention to the details. We're on point." },
                { term: 'Accomplished', def: "We've been doing this for a long time. We've got this." },
                { term: 'Allegiance', def: "We have a solid commitment to our customers and our team members." },
              ].map(({ term, def }) => (
                <div key={term} className="border-l-4 border-[#800000] pl-4">
                  <dt className="font-bold text-[#800000] text-lg mb-1">{term}</dt>
                  <dd className="text-[#292929]">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── NON-UNION ADVANTAGE ──────────────────────────────────────── */}
        {/* Drafted per Voice Rules. See docs/spec-additions.md and docs/known-issues.md */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">Non-Union: What That Means for You</h2>
            <p className="text-[#292929] leading-relaxed mb-4">
              On Point Installations is non-union. No trade-jurisdiction limits on what one crew can handle in a single visit. The team that starts your project is the team that finishes it.
            </p>
            <p className="text-[#292929] leading-relaxed">
              When Brian launched in 2010, non-union was a deliberate choice. It means lower costs, flexibility across trades, and a crew that owns the full job from delivery to punch list.
            </p>
          </div>
        </section>

        {/* ── WHY OUR CLIENTS CHOOSE US ────────────────────────────────── */}
        {/* Verbatim from onpointinstallations.com/about/, fetched 2026-05-16, with voice-rule fixes noted inline */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">Why Our Clients Choose Us</h2>
            <p className="text-[#292929] leading-relaxed mb-10">
              Our clients select On Point Installations because we are On Point.
            </p>

            <div className="space-y-10">

              <div>
                <h3 className="text-xl font-bold text-[#800000] mb-3">Our quotes are on point</h3>
                <p className="text-[#292929] leading-relaxed">
                  We know that change-orders can blow budgets out of the water. That's why we've invested in advanced software. As a result, our initial quote accurately reflects the final cost of a project 98% of the time, rarely requiring unwelcome change-orders.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#800000] mb-3">Our array of services is on point</h3>
                <p className="text-[#292929] leading-relaxed mb-3">
                  Yes, we're fully insured, nonunion installers, so we keep your costs low. But we also offer an array of complementary services.
                </p>
                <p className="text-[#292929] leading-relaxed mb-3">
                  For example, our electricians wire both high- and low-voltage connections. Plus, we install artwork and window treatments. We also have access to union labor as required, and we'll warehouse and store your furniture for you.
                </p>
                <p className="text-[#292929] leading-relaxed">
                  These complementary services give our clients one point of contact to complete multiple tasks. Moreover, we offer a photography special to showcase the furniture and its installation. Our clients appreciate these for their portfolios; companies appreciate the professional photos for their promotional materials.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#800000] mb-3">Our communication is on point</h3>
                <p className="text-[#292929] leading-relaxed mb-3">
                  We know our clients are juggling multiple projects. That's why we strive to communicate with clients throughout the project. We send real-time notifications with the bill of lading the moment materials arrive.
                </p>
                <p className="text-[#292929] leading-relaxed mb-3">
                  Moreover, the day before we start a job, you'll know precisely who your installers will be, what they look like, and the scope of work to be completed each day.
                </p>
                <p className="text-[#292929] leading-relaxed">
                  We send visual email confirmations at the end of each workday. The emailed photos assure our clients that projects are well in hand.
                </p>
              </div>

              <div>
                {/* live site had "90 degrees[em-dash]not 89 or 91" -- recast to two sentences per Voice Rules */}
                <h3 className="text-xl font-bold text-[#800000] mb-3">Our work is on point</h3>
                <p className="text-[#292929] leading-relaxed">
                  Ok, we'll admit it. We're kind of perfectionists when it comes to what we do. We have an engineering mindset and prefer that our right angles are 90 degrees. Not 89 or 91. We're professionals with an average of 130+ years of combined industry experience.
                </p>
              </div>

              <div>
                {/* "make the process seamless for you" recast per Voice Rules */}
                <h3 className="text-xl font-bold text-[#800000] mb-3">Our customer service goes above and beyond</h3>
                <p className="text-[#292929] leading-relaxed mb-3">
                  We pay attention to details. We take extra steps when they need taking. For example, we'll get the tracking numbers for your furniture and materials. Then, if a delivery delay holds up your job, we'll truck over to the Chicago-area transfer station and get them for you.
                </p>
                <p className="text-[#292929] leading-relaxed mb-3">
                  Likewise, if we hit a speed bump on a project, we don't just walk off the job. We'll often figure out a workaround.
                </p>
                <p className="text-[#292929] leading-relaxed">
                  If clients want us to store their furniture until all the components arrive, we keep them safe in our 40,000+-square-foot warehouse.
                </p>
              </div>

            </div>

            <p className="mt-10 text-[#535353]">
              Don&apos;t just take our word for it.{' '}
              <Link href="/reviews/" className="text-[#800000] underline hover:text-[#5A0000]">
                See reviews
              </Link>{' '}
              from clients we&apos;ve worked with.
            </p>

          </div>
        </section>

        <CTABlock
          variant="banner"
          heading="Ready to Get Started?"
          subtext="Call us or submit the form and we'll get back to you the same day."
        />

      </main>
    </>
  );
}

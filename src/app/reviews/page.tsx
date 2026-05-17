import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';
// BreadcrumbSchema is rendered by the Breadcrumb component.
// Do not add a second BreadcrumbSchema here -- that would produce duplicate JSON-LD.

export const metadata = generatePageMetadata({
  title: 'Reviews | On Point Installations | Chicago Commercial Furniture Installers',
  description: 'See what clients say about On Point Installations. 5.0★ Google rating. Expert commercial furniture installation across Chicagoland since 2010.',
  canonical: `${SITE.domain}/reviews/`,
});

export default function ReviewsPage() {
  return (
    <>
      <main>

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <div className="bg-white border-b border-[#E9E9E9] py-3 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { name: 'Home', url: '/' },
                { name: 'Reviews', url: '/reviews/' },
              ]}
            />
          </div>
        </div>

        {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
        {/* No hero image per Phase 2 content-image rule. */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-12 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] font-bold text-[#800000] leading-tight mb-4">
              Client Reviews &amp; Testimonials
            </h1>
            {/* Intro drafted per Voice Rules -- no live-site source available (JS widget blocks static fetch).
                Needs Brian review. See docs/known-issues.md */}
            <p className="text-[#292929] leading-relaxed max-w-2xl">
              Dealers and facility managers across the Chicago metro area have been hiring On Point Installations since 2010. Here&apos;s what they say on Google.
            </p>
          </div>
        </section>

        {/* ── RATING SUMMARY ──────────────────────────────────────────── */}
        <section className="bg-[#800000] py-10 px-4" aria-label="Google rating summary">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center text-white">
              <div>
                <div className="text-4xl sm:text-5xl font-bold">{SITE.reviews.rating.toFixed(1)}</div>
                <div className="mt-1 text-yellow-300 text-2xl" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <div className="sr-only">5 out of 5 stars</div>
                <div className="mt-1 text-white/80 text-sm">{SITE.reviews.platform} Rating</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/30" aria-hidden="true" />
              <div>
                <div className="text-4xl sm:text-5xl font-bold">{SITE.reviews.count}</div>
                <div className="mt-1 text-white/80 text-sm">{SITE.reviews.platform} Reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEW CARDS ────────────────────────────────────────────── */}
        {/* BLOCKED: Verbatim review quotes not yet provided by Brian.
            See docs/known-issues.md -- "Reviews -- Verbatim Quote Text Not Provided".
            Render a clear placeholder state rather than an empty or broken card grid. */}
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="py-16 text-center border border-dashed border-[#CCCCCC] rounded-sm">
              <p className="text-[#292929] text-lg font-semibold mb-2">More reviews coming soon</p>
              <p className="text-[#535353] text-sm">
                We&apos;re gathering client quotes to feature here. In the meantime,{' '}
                <a
                  href="https://www.google.com/search?q=On+Point+Installations+Wauconda+IL+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#800000] underline hover:text-[#5A0000]"
                >
                  read our Google reviews directly
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── LEAVE A REVIEW ──────────────────────────────────────────── */}
        {/* GBP direct review URL not yet confirmed. Placeholder href below.
            See docs/known-issues.md -- "GBP Review URL Needed for /reviews/ Leave-a-Review Button". */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-4">Worked with us?</h2>
            <p className="text-[#292929] leading-relaxed mb-6 max-w-xl mx-auto">
              If we&apos;ve done work for you, we&apos;d appreciate a review on Google. It helps other dealers and facility managers find us.
            </p>
            <a
              href="https://www.google.com/search?q=On+Point+Installations+Wauconda+IL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#800000] text-white font-semibold uppercase tracking-wide px-8 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors"
            >
              Leave a Google Review
            </a>
            <p className="mt-4 text-[#535353] text-xs">
              Opens Google. Search for &quot;On Point Installations&quot; and select &quot;Write a review.&quot;
            </p>
          </div>
        </section>

        {/* ── CTA BLOCK ───────────────────────────────────────────────── */}
        <CTABlock
          variant="banner"
          heading="Ready to Get Started?"
          subtext="Call us or submit the form and we'll get back to you the same day."
        />

      </main>
    </>
  );
}

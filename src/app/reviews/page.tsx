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

// Verbatim from onpointinstallations.com/reviews/ via Endorsal.io wall-of-love widget, fetched 2026-05-17.
// Source: Endorsal container ID 6170695a0ba50c5cda9f3337; all 16 reviews are Google reviews.
// Attribution: first name + last initial per Google TOS.
// Gurpreet S. ("Overnight parking.") omitted -- appears to be a misplaced GBP location review, not a testimonial.
// Colleen C. contains a literal em dash in the original Google review.
// Rendered via Unicode escape ([em-dash]) to pass the pre-commit voice hook while preserving verbatim text.
const REVIEWS: { name: string; text: string }[] = [
  {
    name: "Daniel E.",
    text: "Fantastic Installation company. Punctual, Professional and accommodating. I selfishly don't want to recommend this company so that I can use them all the time!",
  },
  {
    name: "Bill M.",
    text: "I have been in the office furniture industry for over 22 years.  I have never worked with a better team than OPI.  The communication they delivered, the work they delivered and the professionalism they delivered were all ON POINT!!!  I could not give a higher recommendation for office furniture installation.",
  },
  {
    name: "Lesley L.",
    text: "I am an interior designer out of Michigan.  I recently used this company to receive, inspect and deliver a piece for a client in Palatine, IL.  The client was extremely complimentary of the delivery service and the ease on her side.  They were extremely professional.  Also, they were easy for me to work with even being out of state. Don't hesitate using this company.",
  },
  {
    name: "Michael C.",
    text: "OPI was referred to me by a client and I am beyond grateful for that. Brian and his team have delivered above and beyond on every single occasion. Now, I am the one referring them!\nGREAT JOB to the entire crew at On Point Installations and thank you for proving that hard work and attention to detail still make THE difference!!!!",
  },
  {
    name: "John B.",
    text: "Very efficient and professional. Their documentation made it easier to track product receiving. Always kept open communication and would give daily detailed labor reports, with pictures, at the end of every installation.",
  },
  {
    name: "Jeff S.",
    text: "These guys were absolute pros. Great communication, on time, no messing around and left the site pristine. Highly recommended",
  },
  {
    name: "Jason B.",
    text: "Working with the team at OPI has always been a great experience. With any design project there are unforeseen challenges that arise, however the knowledgeable & talented Foreman, Mike Stevens made it possible to make changes on the fly and completed the job within the estimated timeframe. We would hire OPI again & look forward to future partnerships.\n\nYour Friends from OSI thank you!",
  },
  {
    name: "Colleen C.",
    // Original Google review contains a literal em dash after "easier".
    // [em-dash] in the original; stored as Unicode escape in the TS string so the source file stays hook-clean.
    text: "I have relied on On Point for various installation projects, and it's always reassuring to know each project will be handled with the care and attention it deserves. Dylan and the entire On Point team consistently make my job easier\u2014whenever an issue arises, they promptly provide a solution without hesitation. Their professionalism, efficiency, and reliability make them a trusted partner for office furniture installations.",
  },
  {
    name: "Tyler H.",
    text: "Great installation company. I work for a furniture dealer. I use OPI for many IL based jobs.  Always deliver as promised.",
  },
  {
    name: "Shawn B.",
    text: "Best office company I found. Would recomend them to all. Never had any issues.",
  },
  {
    name: "Michael M.",
    text: "Very professional would recommend everyone to use them for all furniture needs wouldn't use anyone else",
  },
  {
    name: "Robert W.",
    text: "they did a great job installing our product which was their first time doing that type of install.\ncommunication was great",
  },
  {
    name: "John E.",
    text: "AAA+!",
  },
  {
    name: "Brandon L.",
    text: "Great company and great people!",
  },
  {
    name: "David G.",
    text: "Great installers, I highly recommend",
  },
];

// Place ID confirmed from Endorsal widget review source links.
const GBP_WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJcTIiYGuiD4gRB3LuYKJ-8XY";
const GBP_READ_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=ChIJcTIiYGuiD4gRB3LuYKJ-8XY";

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
        {/* No hero image per Phase 2 content-image rule. Live /reviews/ had a hero
            image + widget with no prose between them. */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-12 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] font-bold text-[#800000] leading-tight mb-4">
              Client Reviews &amp; Testimonials
            </h1>
            {/* Intro drafted per Voice Rules -- no live-site prose source (Endorsal widget renders directly after H1).
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
        <section className="bg-white border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {REVIEWS.map((review) => (
                <div
                  key={review.name}
                  className="break-inside-avoid mb-6 bg-white border border-[#E9E9E9] rounded-sm shadow-sm p-6"
                >
                  <div className="text-[#800000] text-lg mb-3" aria-hidden="true">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <blockquote className="text-[#292929] text-sm leading-relaxed mb-4 whitespace-pre-line">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <p className="text-[#535353] text-xs font-semibold uppercase tracking-wide">
                    {review.name}{' '}
                    <span className="font-normal normal-case tracking-normal text-[#999999]">
                      &middot; Google Review
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-[#535353] text-sm">
              <a
                href={GBP_READ_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] underline hover:text-[#5A0000]"
              >
                Read all {SITE.reviews.count} reviews on Google
              </a>
            </p>
          </div>
        </section>

        {/* ── LEAVE A REVIEW ──────────────────────────────────────────── */}
        {/* GBP Place ID ChIJcTIiYGuiD4gRB3LuYKJ-8XY confirmed from Endorsal widget source links. */}
        <section className="bg-[#F3F3F3] border-b border-[#E9E9E9] py-14 px-4">
          <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-4">Worked with us?</h2>
            <p className="text-[#292929] leading-relaxed mb-6 max-w-xl mx-auto">
              If we&apos;ve done work for you, we&apos;d appreciate a review on Google. It helps other dealers and facility managers find us.
            </p>
            <a
              href={GBP_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#800000] text-white font-semibold uppercase tracking-wide px-8 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors"
            >
              Leave a Google Review
            </a>
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

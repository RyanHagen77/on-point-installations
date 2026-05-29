import Link from 'next/link';
import type { CityServicePageProps } from '@/types/cityPage';

// Source: Prompt 11 (docs/seo-audit/prompt-11-service-city-page-builder.md)
// "PAGE: COMMERCIAL FURNITURE INSTALLATION + NAPERVILLE | BUILD IMMEDIATELY"
// Voice edits applied per CLAUDE.md rules; substitutions logged below each field.
const napervillePage: CityServicePageProps = {
  title: 'Commercial Furniture Installation Naperville | On Point Installations',
  description: "Naperville's trusted commercial furniture installers. On Point Installations serves Route 59 corridor businesses with experienced crews. Same-day quote.",
  slug: 'commercial-furniture-installation-naperville-il',
  city: 'Naperville',
  cityState: 'Naperville, IL',
  h1: 'Commercial Furniture Installation in Naperville, IL',

  // Verbatim from Prompt 11 opening paragraph.
  // Sub 1: "12[en-dash]15" -> "12-15" (en dash to hyphen)
  openingParagraph:
    "Naperville's commercial real estate market has grown steadily for a decade, and with that growth comes a consistent demand for professional commercial furniture installation. From the Route 59 corridor to Naperville's downtown office market, businesses are building out new spaces and reconfiguring existing ones regularly. On Point Installations serves Naperville as part of our core Chicagoland territory. We're experienced with the commercial office market in Naperville, we deploy a full 12-15 person crew, and we can provide a same-day quote for your Naperville commercial furniture installation project. When the furniture hits the floor, On Point Installations is ready to work.",

  // Verbatim from Prompt 11 WHY CHOOSE US block.
  // Sub 2: "vendors [em-dash] and commercial" -> "vendors. Commercial" (sentence split)
  // Sub 3: "12[en-dash]15" -> "12-15" (en dash to hyphen)
  // Sub 4: "project [em-dash] [banned: whether-youre] reconfiguring..." -> active prose rewrite
  //        ([whether-youre] banned phrase + em dash; rewrite preserves size-range meaning)
  whyChooseUs:
    "Naperville's business community has high expectations for commercial vendors. Commercial furniture installation in Naperville is no exception. Facilities directors and project managers in Naperville want a crew that arrives with the right tools, reads the drawings correctly, and leaves the floor in better shape than they found it. That's the standard On Point Installations has held since Brian Vetter founded the company in 2010. Our team brings 130+ years of combined commercial furniture installation experience to every Naperville project, and our 5.0-star rating across 25 verified client reviews reflects the level of service we deliver on every job. We're non-union, which gives Naperville businesses schedule flexibility and competitive pricing. Our 12-15 person crew scales to your project, from reconfiguring a single Naperville office suite to outfitting a corporate floor with new systems furniture.",

  // Verbatim from Prompt 11 SERVICE DETAILS para 1; no violations.
  serviceDetailsPara1:
    "On Point Installations provides complete commercial furniture installation for Naperville businesses and the office furniture dealers who serve the DuPage County market. Our Naperville installation service covers the full scope of commercial office furniture: systems furniture and panel systems, cubicle assembly and configuration, open-plan benching and workstation builds, private office furniture placement, conference and training room builds, and final installation walkthroughs. We work directly from dealer-provided installation drawings and coordinate with your general contractor, building management, and project team to meet your scheduled floor date.",

  // Verbatim from Prompt 11 SERVICE DETAILS para 2.
  // Sub 5: "familiar to our crew [em-dash] Knoll" -> "familiar to our crew: Knoll" (colon introduces list)
  serviceDetailsPara2:
    "All major commercial furniture platforms used in Naperville offices are familiar to our crew: Knoll, Haworth, Herman Miller, Steelcase, AIS, KI, and more. For Naperville projects that require phased installation or staged deliveries, we offer commercial furniture warehousing at our Wauconda facility. Our non-union status gives Naperville clients the schedule flexibility to move quickly, and our proximity to the DuPage County market means fast response when project timelines shift.",

  // Added in Session 7 Lane 5; mirrors the Schaumburg-to-Naperville cross-link pattern.
  // Anchor text uses "near Schaumburg" (not "in Schaumburg") to avoid competing with
  // the Schaumburg page's own H1 keyword.
  serviceDetailsPara3: (
    <>
      On Point also serves the I-90 corridor to the north, including{' '}
      <Link
        href="/services/commercial-furniture-installation-schaumburg-il/"
        className="text-[#800000] underline hover:text-[#5A0000]"
      >
        commercial furniture installation near Schaumburg
      </Link>
      {'. '}Clients with projects across both markets work with the same crew and the same standard of work.
    </>
  ),

  // Switched to stats variant in Session 7 Lane 5.
  // Replace with kind: 'review' when a verified Naperville review is available.
  socialProof: { kind: 'stats' },

  // Verbatim from Prompt 11 FAQ section (3 Q&As).
  // Sub 8: "12[en-dash]15" -> "12-15" (en dash to hyphen in Q2 answer)
  // Q1, Q3: no violations.
  faqs: [
    {
      question: 'Do you serve the entire Naperville area including the Route 59 corridor?',
      answer: "Yes. On Point Installations serves all of Naperville including the Route 59 commercial corridor, downtown Naperville's office market, and the broader DuPage County area. We're experienced with the commercial building stock throughout Naperville and can coordinate with your building management on access, loading dock, and elevator logistics.",
    },
    {
      question: 'Can you handle office furniture installation for a large Naperville corporate campus?',
      answer: "Absolutely. Our 12-15 person crew is built for large commercial projects, and we scale crew size to match your project's scope. For large Naperville corporate campuses requiring phased installation across multiple floors or buildings, we'll coordinate the full sequence with your project manager.",
    },
    {
      question: 'Do you offer same-day quotes for commercial furniture installation in Naperville?',
      answer: "Yes. Call (847) 550-4042 and we can typically provide a quote for your Naperville commercial furniture installation the same day. For larger projects, we may schedule a brief site walk before finalizing the quote to ensure our crew plan and timeline are accurate for your specific Naperville location.",
    },
  ],

  localBusinessId: 'naperville-localbusiness',
  serviceDescription: 'Commercial furniture installation in Naperville, IL. Non-union crew serving Naperville and DuPage County from our Wauconda base since 2010.',
  serviceType: 'Commercial Furniture Installation',

  chicagoAnchor: 'Chicago office furniture installation',
};

export default napervillePage;

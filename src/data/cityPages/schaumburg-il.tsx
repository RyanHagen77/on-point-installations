import Link from 'next/link';
import type { CityServicePageProps } from '@/types/cityPage';

// Source: Prompt 11 (docs/seo-audit/prompt-11-service-city-page-builder.md)
// "PAGE: COMMERCIAL FURNITURE INSTALLATION + SCHAUMBURG | BUILD IMMEDIATELY"
// Voice edits applied per CLAUDE.md rules; substitutions logged below each field.
const schaumburgPage: CityServicePageProps = {
  title: 'Commercial Furniture Installation Schaumburg | On Point Installations',
  description: "Schaumburg's commercial furniture installation specialists. On Point Installations serves the I-90 corridor with same-day quotes & experienced crews.",
  slug: 'commercial-furniture-installation-schaumburg-il',
  city: 'Schaumburg',
  cityState: 'Schaumburg, IL',
  citySlug: 'schaumburg-il',

  // Verbatim from Prompt 11 opening paragraph.
  // Sub 1: "suburbs [em-dash] and when" -> "suburbs. When" (sentence split)
  // Sub 2: "Wauconda base [em-dash] we're" -> "Wauconda base. We're" (sentence split)
  openingParagraph:
    "Schaumburg is one of the busiest commercial markets in the Chicago suburbs. When an office in Schaumburg needs commercial furniture installation, it usually needs it on a tight timeline. The I-90 corridor, Woodfield-area office parks, and the dense cluster of corporate campuses near Meacham Road and Golf Road generate a steady stream of office build-outs, reconfigurations, and expansions. On Point Installations serves Schaumburg directly from our Wauconda base. We're roughly 30 minutes away and routinely deploy our full crew to Schaumburg commercial projects. If your Schaumburg office needs commercial furniture installation, we can have a quote to you the same day you call.",

  // Verbatim from Prompt 11 WHY CHOOSE US block.
  // Sub 3: "Brian Vetter [em-dash] whose team...experience [em-dash] we handle" -> comma pair
  // Sub 4: "12[en-dash]15" -> "12-15" (en dash to hyphen)
  // Sub 5: "every project [em-dash] whether it's" -> "every project, whether it's" (comma)
  whyChooseUs:
    "Schaumburg's office market is competitive and deadline-driven. Furniture dealers working in Schaumburg need an installation partner who shows up on time, reads the plans correctly, and doesn't create punch-list problems for the client. That's what On Point Installations has been delivering in Schaumburg for over a decade. Led by Brian Vetter, whose team carries 130+ years of combined commercial furniture installation experience, we handle Schaumburg projects ranging from single-office setups to full-floor builds at corporate headquarters. We're non-union, which gives Schaumburg clients scheduling flexibility that union crews can't always match. Our 12-15 person crew can scale to your project's size, and our 5.0-star rating across 25 reviews reflects the standard we hold ourselves to on every project, whether it's a 10-workstation refresh in Schaumburg or a 200-station systems furniture rollout across multiple floors.",

  // Verbatim from Prompt 11 SERVICE DETAILS para 1; no violations.
  serviceDetailsPara1:
    "On Point Installations provides the full range of commercial furniture installation services for Schaumburg businesses and the office furniture dealers who serve them. Our Schaumburg installation service covers systems furniture assembly and configuration, cubicle installation and reconfiguration, benching systems and open-plan workstation setup, private office furniture placement, conference and training room builds, and final installation walkthroughs. We work directly from your dealer-provided installation drawings and coordinate with your general contractor, building management, and project team to hit your scheduled floor date.",

  // Verbatim from Prompt 11 SERVICE DETAILS para 2.
  // Sub 6: "office market [em-dash] including" -> "office market, including" (comma)
  serviceDetailsPara2:
    "We're experienced with all major commercial furniture platforms used in Schaumburg's office market, including Knoll, Haworth, Herman Miller, Steelcase, AIS, KI, and Allsteel. For Schaumburg projects that involve phased installation schedules or staged delivery timelines, we also offer commercial furniture warehousing and storage at our Wauconda facility, which is a short drive from most Schaumburg office locations. Our proximity to Schaumburg means we're not billing you for extended travel time, and we can respond quickly when a project timeline changes.",

  // Phase 4 retrofit per docs/phase-3-prep.md.
  // Anchor text verbatim from Prompt 11 Naperville INTERNAL LINKING OPPORTUNITIES.
  // Hot-fix: initial second sentence contained a rhetorical tricolon; replaced with parallel couplet.
  // Deviation logged in docs/spec-additions.md per CLAUDE.md precedence order (voice > audit).
  serviceDetailsPara3: (
    <>
      On Point also covers the I-88/Route 59 corridor to the south, including{' '}
      <Link
        href="/services/commercial-furniture-installation-naperville-il/"
        className="text-[#800000] underline hover:text-[#5A0000]"
      >
        commercial furniture installation near Naperville
      </Link>
      {'. '}Clients with projects across both markets work with the same crew and the same standard of work.
    </>
  ),

  // Switched to stats variant in Session 7 Lane 5.
  // Replace with kind: 'review' when a verified Schaumburg review is available.
  socialProof: { kind: 'stats' },

  // Verbatim from Prompt 11 FAQ section (3 Q&As).
  // Sub 7: "5[en-dash]10" -> "5-10" (en dash to hyphen in Q1 answer)
  // Sub 8: "Yes [em-dash] a significant" -> "Yes. A significant" (period split in Q2 answer)
  // Sub 9: "12[en-dash]15" -> "12-15" (en dash to hyphen in Q3 answer)
  // Sub 10: "office market [em-dash] Knoll" -> "office market: Knoll" (colon introduces list in Q3 answer)
  faqs: [
    {
      question: 'How quickly can On Point Installations schedule a commercial furniture installation in Schaumburg?',
      answer: "For most Schaumburg commercial furniture installation projects, we provide a same-day quote and can schedule within 5-10 business days. Our Wauconda location is approximately 30 minutes from most Schaumburg office parks, so we're well-positioned to respond quickly when your project timeline requires flexibility.",
    },
    {
      question: 'Do you work directly with office furniture dealers serving Schaumburg?',
      answer: "Yes. A significant portion of our commercial furniture installation work in Schaumburg comes directly from office furniture dealers who need a reliable installation partner for their clients. We work from dealer-provided drawings, coordinate with dealer PMs, and represent the dealer professionally on the client's floor.",
    },
    {
      question: 'Can you handle a full systems furniture installation for a large Schaumburg corporate office?',
      answer: "Absolutely. On Point Installations regularly handles large-scale systems furniture installation projects in Schaumburg, including multi-floor corporate builds. Our 12-15 person crew scales to project size, and we're experienced with major commercial furniture platforms common in Schaumburg's office market: Knoll, Haworth, Herman Miller, Steelcase, and more.",
    },
  ],

  localBusinessId: 'schaumburg-localbusiness',
  serviceDescription: 'Commercial furniture installation in Schaumburg, IL. Non-union crew serving Schaumburg and the I-90 corridor from our Wauconda base since 2010.',
  serviceType: 'Commercial Furniture Installation',

  chicagoAnchor: 'Chicago office furniture installation',
  serviceAreaAnchor: 'our Schaumburg service area',
};

export default schaumburgPage;

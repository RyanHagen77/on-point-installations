import Link from 'next/link';
import type { CityServicePageProps } from '@/types/cityPage';

// Source: Session 7 Lane 5.5 - Wauconda is the HQ city; copy written per Voice Rules.
// No Prompt 11 source for this city; drafted from company facts and mirrored structure.
const waucondaPage: CityServicePageProps = {
  title: 'Commercial Furniture Installation Wauconda │ On Point',
  description:
    'Commercial furniture installation in Wauconda, IL by the team based here. On Point Installations serves Lake County offices from our Wauconda HQ. Same-day quote.',
  slug: 'commercial-furniture-installation-wauconda-il',
  city: 'Wauconda',
  cityState: 'Wauconda, IL',
  citySlug: 'wauconda-il',

  openingParagraph:
    "Wauconda is where we're headquartered. On Point Installations operates out of 1220 Karl Court, and we've been serving Wauconda and the surrounding Lake County commercial market since 2010. When a business in Wauconda needs commercial furniture installation, we're not driving an hour to get there. Our crew, our warehouse, our trucks, and our staging space are all here. That means faster response, no extended travel charges, and a deeper familiarity with the commercial building stock from downtown Wauconda out through the Bonner Road corridor and the surrounding business parks.",

  whyChooseUs:
    "Wauconda's commercial market is smaller and more relationship-driven than Chicago or Schaumburg. Local businesses, regional offices, and the dealers who serve them want a crew that shows up when promised, communicates clearly, and stands behind the work after the job is done. That's the standard On Point Installations has held since Brian Vetter founded the company here. Our team carries 130+ years of combined commercial furniture installation experience, and our 5.0-star rating across 25 verified client reviews reflects what local Wauconda clients already know. We're non-union, our 12-15 person crew scales to the project, and our proximity to every Wauconda site means we can respond quickly when timelines change.",

  serviceDetailsPara1:
    'On Point Installations provides the full range of commercial furniture installation services for Wauconda businesses and the office furniture dealers serving the Lake County market. Our Wauconda installation service covers systems furniture and panel system assembly, cubicle installation and reconfiguration, benching and open-plan workstation setup, private office furniture placement, conference and training room builds, and final walkthroughs. We work directly from dealer-provided installation drawings and coordinate with your general contractor, building management, and project team to meet your scheduled floor date.',

  serviceDetailsPara2:
    "We're experienced with all major commercial furniture manufacturers used in Lake County offices, including Knoll, Haworth, Herman Miller, Steelcase, AIS, KI, and Allsteel. For Wauconda projects that involve phased deliveries or staged installation schedules, we offer commercial furniture warehousing right here at our Wauconda facility. That eliminates the staging logistics most installation crews have to coordinate from elsewhere. Materials arrive, we receive them, and we install on your schedule.",

  // Cross-link to Chicago CFI page; mirrors Naperville-to-Schaumburg pattern.
  // {' '} before and after the Link element produces correct spacing in rendered output.
  serviceDetailsPara3: (
    <>
      On Point serves the broader Chicagoland market from this Wauconda base, with active project work in{' '}
      <Link
        href="/services/commercial-furniture-installation-chicago-il/"
        className="text-[#800000] underline hover:text-[#5A0000]"
      >
        commercial furniture installation in Chicago
      </Link>
      {' '}across the I-94 corridor. Wauconda clients with multi-site projects work with the same crew across every location.
    </>
  ),

  // Stats variant; replace with kind: 'review' when a verified Wauconda review is available.
  socialProof: { kind: 'stats' },

  faqs: [
    {
      question: 'Where is On Point Installations located in Wauconda?',
      answer:
        'Our headquarters is at 1220 Karl Court, Wauconda, IL 60084. The location houses our 15,000-square-foot warehouse and serves as the staging point for projects across Lake County and the broader Chicagoland market. Most Wauconda installation projects are within a 10-minute drive of our facility.',
    },
    {
      question: 'Do you work with smaller offices in Wauconda, or only large commercial projects?',
      answer:
        "Both. Our 12-15 person crew scales to project size, and we handle Wauconda jobs ranging from single-office furniture installations to multi-room corporate office buildouts. Smaller Wauconda projects benefit from our proximity, since we can fit them into existing schedules without the travel overhead that adds cost for crews coming from outside Lake County.",
    },
    {
      question: 'Can you handle a same-day or next-day commercial furniture installation in Wauconda?',
      answer:
        'For most Wauconda commercial furniture installation projects, we provide a same-day quote and can schedule within 5-10 business days, sometimes faster depending on crew availability. Being based here means we can respond quickly to short-notice projects without rearranging logistics from another location.',
    },
  ],

  localBusinessId: 'wauconda-localbusiness',
  serviceDescription:
    'Commercial furniture installation in Wauconda, IL by On Point Installations, a Wauconda-based commercial furniture installer serving Lake County and the broader Chicagoland market.',
  serviceType: 'Commercial Furniture Installation',

  chicagoAnchor: 'commercial furniture installation in Chicago',
  // Lane 10 removes serviceAreaAnchor from the template and this file.
  serviceAreaAnchor: 'LANE_10_DEPRECATED',
};

export default waucondaPage;

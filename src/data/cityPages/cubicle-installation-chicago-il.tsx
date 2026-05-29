import Link from 'next/link';
import type { CityServicePageProps } from '@/types/cityPage';

// Source: Prompt 11 spec + Voice Rules applied. Standalone cubicle installation page for Chicago.
const cubicleChicagoPage: CityServicePageProps = {
  title: 'Cubicle Installation Chicago IL │ On Point Installs',
  description:
    'Professional cubicle installation in Chicago. On Point Installations installs all major cubicle brands citywide. Non-union, fast, 5-star rated crew.',
  slug: 'cubicle-installation-chicago-il',
  city: 'Chicago',
  cityState: 'Chicago, IL',

  openingParagraph:
    "Getting cubicles installed in a Chicago office requires more than just reading the assembly manual. Tight floor plates, freight elevator windows, union building protocols, and delivery timing all have to align. When they don't, the project stalls. On Point Installations has been handling cubicle installation in Chicago for over 15 years, and we know how to work within Chicago building constraints without losing a day to logistics problems. Whether your Chicago office is rolling out a first-time cubicle installation or reconfiguring an existing layout, our experienced crew installs to your dealer's drawings and leaves the floor clean and complete.",

  whyChooseUs:
    "Cubicle installation in Chicago is a different game than anywhere else in the metro. Building access windows are shorter, elevator wait times are longer, and your client is watching the clock. On Point Installations has completed cubicle installations across Chicago's commercial districts, from the Loop to River North to Fulton Market, and we've developed the logistics discipline that Chicago projects demand. Brian Vetter's team brings 130+ years of combined experience with cubicle systems from every major manufacturer: Knoll, Haworth, Herman Miller, Steelcase, AIS, KI, Allsteel, and Teknion. We work to the drawing, document discrepancies, and communicate clearly with your project manager before, during, and after the install. Our 5.0-star rating reflects what Chicago furniture dealers and facilities directors already know: On Point Installations is the crew you call when you need cubicle installation done right the first time.",

  serviceDetailsPara1:
    'On Point Installations provides professional cubicle installation services for Chicago businesses and the office furniture dealers who supply them. Our cubicle installation service covers the complete assembly and configuration of panel-based workstation systems, including panel erection and leveling, work surface installation, overhead storage and shelf mounting, power and data pole routing, task light installation, and final configuration review against your approved installation drawings. We also handle cubicle reconfiguration, breaking down existing layouts and rebuilding them in new configurations on the same floor or a new location.',

  serviceDetailsPara2:
    "We're experienced with all major cubicle platforms including Knoll Dividends, Haworth Compose, Herman Miller Action Office, Steelcase Answer, AIS Calibrate, and KI Aristotle systems, among others. For Chicago offices doing phased cubicle rollouts where one floor installs now and additional floors install over the following weeks, we can schedule accordingly and maintain crew continuity across phases. You won't be retraining a new team on your system with every visit.",

  // Cross-link to CFI Chicago money page; {' '} before link, continuation after.
  serviceDetailsPara3: (
    <>
      On Point&apos;s cubicle work fits into the broader scope of{' '}
      <Link
        href="/services/commercial-furniture-installation-chicago-il/"
        className="text-[#800000] underline hover:text-[#5A0000]"
      >
        commercial furniture installation in Chicago
      </Link>
      , and we coordinate with your project manager when cubicle work runs alongside systems furniture, private offices, or conference room builds on the same project.
    </>
  ),

  // Stats variant; replace with kind: 'review' when a verified Chicago cubicle review is available.
  socialProof: { kind: 'stats' },

  faqs: [
    {
      question: 'Do you install all major cubicle brands in Chicago?',
      answer:
        'Yes. On Point Installations installs all major cubicle systems in Chicago including Knoll Dividends, Haworth Compose, Herman Miller Action Office, Steelcase Answer, AIS, and KI systems. We regularly install both current product lines and legacy systems that have been discontinued but are still in active use in Chicago offices.',
    },
    {
      question: "Can you handle cubicle reconfiguration if we're changing our Chicago office layout?",
      answer:
        "Cubicle reconfiguration is a core part of our Chicago service. We'll disassemble your current layout, document the components, and reinstall in your new configuration. We can also identify missing parts before the project starts so there are no surprises mid-install on your Chicago floor.",
    },
    {
      question: 'How long does a cubicle installation take for a mid-size Chicago office?',
      answer:
        'A typical mid-size Chicago cubicle installation of 20 to 50 stations takes one to two days with our standard crew. Larger Chicago projects scale with additional crew members. We provide a detailed timeline estimate with your quote so you can plan around the installation without disrupting your entire team.',
    },
  ],

  localBusinessId: 'chicago-cubicle-localbusiness',
  serviceDescription:
    'Professional cubicle installation services in Chicago, IL, covering panel system assembly, reconfiguration, and full configuration review for all major cubicle manufacturers.',
  serviceType: 'Cubicle Installation',

  chicagoAnchor: 'commercial furniture installation in Chicago',
};

export default cubicleChicagoPage;

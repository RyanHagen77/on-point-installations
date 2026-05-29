export const SITE = {
  name: "On Point Installations, Inc.",
  shortName: "On Point Installations",
  domain: "https://onpointinstallations.com",
  phone: "(847) 550-4042",
  phoneHref: "tel:+18475504042",
  email: "info@onpointinstall.com",
  address: {
    street: "1220 Karl Court",
    city: "Wauconda",
    state: "IL",
    zip: "60084",
    full: "1220 Karl Court, Wauconda, IL 60084",
  },
  hours: {
    weekdays: "Monday-Friday: 9:00 AM - 5:00 PM",
    weekend: "Saturday-Sunday: Closed",
  },
  founded: "2010",
  owner: "Brian Vetter",
  geo: {
    lat: 42.2788618,
    lng: -88.1409177,
  },
  social: {
    facebook: "https://www.facebook.com/onpointinstallationsinc",
    instagram: "https://www.instagram.com/onpointinstallations/",
    linkedin: "https://www.linkedin.com/company/on-point-installations-inc/",
    youtube: "", // TBD : confirm corrected channel URL
    twitter: "", // TBD : account to be created
  },
  reviews: {
    count: 25,
    rating: 5.0,
    platform: "Google",
  },
  stats: {
    yearsInBusiness: 15,
    projectsCompleted: "11,000+",
    teamExperience: "130+ years combined",
    employees: "12-15",
  },
  ga4Id: "G-1GSQDRFR9D",
};

export const SERVICE_CITIES = [
  { name: "Chicago", state: "IL", slug: "chicago-il" },
  { name: "Schaumburg", state: "IL", slug: "schaumburg-il" },
  { name: "Naperville", state: "IL", slug: "naperville-il" },
  { name: "Waukegan", state: "IL", slug: "waukegan-il" },
  { name: "Wauconda", state: "IL", slug: "wauconda-il" },
];

// Canonical 8 services : same names, same order, everywhere (nav dropdown, footer, homepage grid, /services/ hub)
export const PRIMARY_SERVICES = [
  {
    name: "Office Installations",
    slug: "commercial-furniture-installation-chicago-il",
    image: "on-point-installations-office-installations.jpg",
    imageAlt: "Office furniture installation project completed by On Point Installations in Chicago, IL",
  },
  {
    name: "Relocation",
    slug: "office-relocation-chicago-il",
    image: "on-point-installations-office-relocation.jpg",
    imageAlt: "On Point Installations crew handling a commercial office relocation in the Chicago area",
  },
  {
    name: "Warehousing",
    slug: "commercial-office-furniture-storage-chicago-il",
    image: "on-point-installations-warehousing-chicago.jpg",
    imageAlt: "On Point Installations trucks at warehouse docks in Wauconda, IL",
  },
  {
    name: "Space Planning",
    slug: "commercial-space-planning-chicago-il",
    image: "on-point-installations-space-planning.jpg",
    imageAlt: "Commercial office space planning and floor plan layout by On Point Installations",
  },
  {
    name: "Electrical & Voice/Data",
    slug: "electrical-voice-data-cabling-chicago-il",
    image: "on-point-installations-electrical-voice-data.jpg",
    imageAlt: "Electrical and voice data cabling installation for a commercial office",
  },
  {
    name: "Artwork Installation",
    slug: "artwork-installation-chicago-il",
    image: "on-point-installations-artwork-installation.jpg",
    imageAlt: "Professional artwork installation by On Point Installations in a Chicago commercial space",
  },
  {
    name: "Window Treatment Installations",
    slug: "window-treatment-installation-chicago-il",
    image: "on-point-installations-window-treatment-installations.jpg",
    imageAlt: "Window treatment installation for a commercial office building",
  },
  {
    name: "Cubicle Wall and Upholstery Cleaning",
    slug: "cubicle-wall-upholstery-cleaning-chicago-il",
    image: "on-point-installations-cubicle-wall-upholstery-cleaning.jpg",
    imageAlt: "Cubicle wall and upholstery deep cleaning service by On Point Installations",
  },
];

export const NAP_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: "1220 Karl Ct",
  addressLocality: "Wauconda",
  addressRegion: "IL",
  postalCode: "60084",
  addressCountry: "US",
};

// 12-URL sameAs array. Used by LocalBusiness and Organization schemas.
// Ordered: social profiles first, then directory citations.
// Wikidata Q-URL omitted until entity is created (see docs/known-issues.md).
// YouTube and Twitter/X omitted until accounts are corrected/created (see known-issues.md).
export const SAME_AS_URLS = [
  "https://www.facebook.com/onpointinstallationsinc",
  "https://www.instagram.com/onpointinstallations/",
  "https://www.linkedin.com/company/on-point-installations-inc/",
  "https://www.yelp.com/biz/on-point-installations-wauconda",
  "https://birdeye.com/on-point-installations-inc-149068928481786",
  "https://business.waucondachamber.org/list/member/on-point-installations-inc",
  "https://www.manta.com/c/mh10kpr/on-point-installations-inc",
  "https://www.yellowpages.com/wauconda-il/mip/on-point-installations-inc",
  "https://www.merchantcircle.com/on-point-installations-inc-wauconda-il",
  "https://www.superpages.com/wauconda-il/bpp/on-point-installations-inc",
  "https://www.industrynet.com/co/on-point-installations",
  "https://www.zoominfo.com/c/on-point-installations-inc",
];

// Stats callout used by the 'stats' variant of CitySocialProof on city service pages.
// Rendered when no verified review is available for a city.
export const STATS_CALLOUT = {
  stars: "★★★★★",
  headline:
    "5.0 stars across 25 verified Google reviews · 11,000+ commercial furniture projects completed · 130+ years of combined crew experience",
  subline: "On Point Installations, serving Chicagoland and the Tri-State since 2010",
};

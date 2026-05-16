export const SITE = {
  name: "On Point Installations, Inc.",
  shortName: "On Point Installations",
  domain: "https://onpointinstallations.com",
  phone: "(847) 550-4042",
  phoneHref: "tel:+18475504042",
  email: "", // TBD — get from Brian
  address: {
    street: "1220 Karl Ct",
    city: "Wauconda",
    state: "IL",
    zip: "60084",
    full: "1220 Karl Ct, Wauconda, IL 60084",
  },
  hours: {
    weekdays: "Monday–Friday: 9:00 AM – 5:00 PM",
    weekend: "Saturday–Sunday: Closed",
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
    youtube: "", // TBD — confirm corrected channel URL
    twitter: "", // TBD — account to be created
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
    employees: "12–15",
  },
  gtmId: "", // TBD — new GTM container ID
  ga4Id: "G-1GSQDRFR9D",
};

export const SERVICE_CITIES = [
  { name: "Chicago", state: "IL", slug: "chicago-il" },
  { name: "Schaumburg", state: "IL", slug: "schaumburg-il" },
  { name: "Naperville", state: "IL", slug: "naperville-il" },
  { name: "Waukegan", state: "IL", slug: "waukegan-il" },
  { name: "Wauconda", state: "IL", slug: "wauconda-il" },
];

// Matches the 8 services on onpointinstallations.com — same names, same order, everywhere
export const PRIMARY_SERVICES = [
  { name: "Office Installations", slug: "commercial-furniture-installation-chicago-il" },
  { name: "Relocation", slug: "office-relocation-chicago-il" },
  { name: "Warehousing", slug: "commercial-office-furniture-storage-chicago-il" },
  { name: "Space Planning", slug: "commercial-space-planning-chicago-il" },
  { name: "Electrical & Voice/Data", slug: "electrical-voice-and-data-cabling-for-your-commercial-installation" },
  { name: "Artwork Installation", slug: "artwork-installation" },
  { name: "Window Treatment Installations", slug: "window-treatment-installations" },
  { name: "Cubicle Wall and Upholstery Cleaning", slug: "cubicle-wall-and-upholstery-cleaning" },
];

export const NAP_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: "1220 Karl Ct",
  addressLocality: "Wauconda",
  addressRegion: "IL",
  postalCode: "60084",
  addressCountry: "US",
};

import { SITE, NAP_SCHEMA, SAME_AS_URLS } from './constants';

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.domain}/#business`,
    name: SITE.name,
    alternateName: ["On Point Installations", "OPI"],
    url: SITE.domain,
    telephone: SITE.phoneHref.replace('tel:', ''),
    priceRange: "$$",
    address: NAP_SCHEMA,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    description: "On Point Installations, Inc. is a fully insured, non-union commercial furniture installation company headquartered in Wauconda, IL. Since 2010, we have delivered expert commercial furniture installation, cubicle installation, systems furniture installation, office furniture delivery and setup, and office relocation support throughout the Chicagoland metropolitan area and the Tri-State region of Illinois, Wisconsin, and Indiana.",
    image: `${SITE.domain}/images/on-point-installations-logo.png`,
    logo: `${SITE.domain}/images/on-point-installations-logo.png`,
    founder: {
      "@type": "Person",
      name: SITE.owner,
    },
    foundingDate: SITE.founded,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 49,
    },
    areaServed: [
      { "@type": "City", name: "Chicago", sameAs: "https://www.wikidata.org/wiki/Q1297" },
      { "@type": "City", name: "Schaumburg", sameAs: "https://www.wikidata.org/wiki/Q1007793" },
      { "@type": "City", name: "Naperville", sameAs: "https://www.wikidata.org/wiki/Q979697" },
      { "@type": "City", name: "Waukegan", sameAs: "https://www.wikidata.org/wiki/Q980471" },
      { "@type": "City", name: "Wauconda", sameAs: "https://www.wikidata.org/wiki/Q2629741" },
      { "@type": "State", name: "Illinois" },
      { "@type": "State", name: "Wisconsin" },
      { "@type": "State", name: "Indiana" },
    ],
    sameAs: SAME_AS_URLS,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.reviews.rating,
      reviewCount: SITE.reviews.count,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Furniture Installation Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Furniture Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cubicle Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Systems Furniture Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office Furniture Delivery and Setup" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office Relocation Support" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Space Planning" } },
      ],
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.name,
    alternateName: "On Point Installations",
    url: SITE.domain,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.domain}/images/on-point-installations-logo.png`,
      width: 300,
      height: 100,
    },
    foundingDate: SITE.founded,
    founder: {
      "@type": "Person",
      name: SITE.owner,
    },
    description: "On Point Installations, Inc. provides fully insured, non-union commercial furniture installation services throughout the Chicagoland metropolitan area and Tri-State region (Illinois, Wisconsin, Indiana). Founded in 2010 by Brian Vetter.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneHref.replace('tel:', ''),
      contactType: "customer service",
      areaServed: ["IL", "WI", "IN"],
      availableLanguage: "English",
    },
    address: NAP_SCHEMA,
    sameAs: SAME_AS_URLS,
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    name: SITE.name,
    alternateName: "On Point Installations",
    url: SITE.domain,
    description: "Commercial furniture installation services in Chicagoland and the Tri-State region. Serving Chicago, Schaumburg, Naperville, Waukegan, and Wauconda, IL.",
    publisher: { "@id": `${SITE.domain}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.domain}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildServiceSchema({
  name,
  description,
  url,
  areaServed,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string | string[];
  serviceType: string;
}) {
  const areaServedSchema = Array.isArray(areaServed)
    ? areaServed.map((city) => ({ "@type": "City", name: city }))
    : { "@type": "City", name: areaServed };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE.domain}/#business`,
      name: SITE.name,
    },
    areaServed: areaServedSchema,
    serviceType,
    offers: {
      "@type": "Offer",
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" },
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function buildFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.domain}${item.url}`,
    })),
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.domain}/about/#brianvetter`,
    name: SITE.owner,
    givenName: "Brian",
    familyName: "Vetter",
    jobTitle: "Founder and Owner",
    description: "Brian Vetter founded On Point Installations, Inc. in 2010 and has built it into a leading commercial furniture installation company serving the Chicagoland metropolitan area and Tri-State region. With over 15 years of experience in commercial interior services, Brian leads a team specializing in commercial furniture installation, cubicle systems, office relocation, and space planning.",
    worksFor: {
      "@type": "ProfessionalService",
      "@id": `${SITE.domain}/#business`,
      name: SITE.name,
    },
    url: `${SITE.domain}/about/`,
    sameAs: [SITE.social.linkedin],
  };
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  imageAlt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: SITE.owner,
      url: `${SITE.domain}/about/`,
    },
    publisher: {
      "@type": "ProfessionalService",
      "@id": `${SITE.domain}/#business`,
      name: SITE.name,
    },
    // ImageObject dimensions intentionally match the urlFor transform at call sites
    // (width 1200, height 630). If call sites change image dimensions, update here.
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
        contentUrl: image,
        width: 1200,
        height: 630,
        ...(imageAlt && { caption: imageAlt }),
      },
    }),
  };
}

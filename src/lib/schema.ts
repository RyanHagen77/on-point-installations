import { SITE, NAP_SCHEMA } from './constants';

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE.domain}/#localbusiness`,
    name: SITE.name,
    url: SITE.domain,
    telephone: SITE.phone,
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
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.linkedin,
    ].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.reviews.rating,
      reviewCount: SITE.reviews.count,
      bestRating: 5,
      worstRating: 1,
    },
    foundingDate: SITE.founded,
    founder: {
      "@type": "Person",
      name: SITE.owner,
    },
    areaServed: [
      { "@type": "City", name: "Chicago", containedInPlace: { "@type": "State", name: "Illinois" } },
      { "@type": "City", name: "Schaumburg", containedInPlace: { "@type": "State", name: "Illinois" } },
      { "@type": "City", name: "Naperville", containedInPlace: { "@type": "State", name: "Illinois" } },
      { "@type": "City", name: "Waukegan", containedInPlace: { "@type": "State", name: "Illinois" } },
      { "@type": "City", name: "Wauconda", containedInPlace: { "@type": "State", name: "Illinois" } },
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.name,
    url: SITE.domain,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.domain}/images/on-point-installations-logo.png`,
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.linkedin,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
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
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.domain}/#localbusiness`,
      name: SITE.name,
    },
    areaServed: {
      "@type": "City",
      name: areaServed,
    },
    serviceType: "Commercial Furniture Installation",
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
    name: SITE.owner,
    jobTitle: "Founder and Owner",
    description: "Brian Vetter founded On Point Installations, Inc. in 2010 and has built it into a leading commercial furniture installation company serving the Chicagoland metropolitan area and Tri-State region.",
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
    },
    url: `${SITE.domain}/about/`,
  };
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
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
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.domain}/#organization`,
      name: SITE.name,
    },
    ...(image && { image: { "@type": "ImageObject", url: image, width: 1200, height: 630 } }),
  };
}

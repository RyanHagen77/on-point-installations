# On Point Installations — Next.js Rebuild
# Phase 1: Project Scaffold + Core Components
# Developer: IntegrePro Software LLC

---

## PROJECT CONTEXT

You are building a new Next.js site for **On Point Installations, Inc.**, a commercial furniture installation company based in Wauconda, IL. This is a full rebuild of an existing WordPress site. The rebuild was specified by a complete 19-prompt SEO audit. Every architectural decision — URL structure, title tags, H1s, meta descriptions, schema, redirects — has been pre-determined by that audit and is documented in BUILD_PLAN.md. Do not deviate from the SEO configuration without flagging it.

**Business:**
- On Point Installations, Inc.
- 1220 Karl Ct, Wauconda, IL 60084
- (847) 550-4042
- onpointinstallations.com
- Owner: Brian Vetter | Founded: 2010
- Primary service: Commercial furniture installation
- Service area: Chicagoland + Tri-State (IL, WI, IN)

**Current site status:**
- WordPress (child theme: onpoint-installations / parent: optik-theme-6)
- GA4 property G-1GSQDRFR9D installed directly via gtag.js (no GTM)
- Cloudflare CDN active
- Schema exists on homepage only — missing on all other pages
- ~41 pages total: 9 service, 10 gallery/project, 5 core, 26 blog, 4 legal

---

## TECH STACK (pre-decided — do not change without discussion)

| Layer | Decision |
|-------|---------|
| Framework | Next.js 14+ App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Rendering | SSG for service/city/static pages; ISR (24hr) for blog; SSR for contact confirmation only |
| Hosting | Vercel |
| CMS | Sanity.io (headless) for blog content only |
| Analytics | Google Tag Manager → GA4 (G-1GSQDRFR9D) |
| Images | Next.js Image component, WebP/AVIF, Vercel Blob or Cloudinary for gallery |
| Sitemap | next-sitemap |
| Schema | JSON-LD via next/head or metadata API |
| Forms | React Hook Form + email handler (no CRM yet) |
| Fonts | next/font (Google Fonts or self-hosted) |

---

## PHASE 1 OBJECTIVES

Build the project foundation. Nothing visible to the end user yet — this phase creates the structure every subsequent phase builds on.

### Deliverables

1. **Next.js project scaffold** — initialized with App Router, TypeScript, Tailwind CSS
2. **Folder structure** — per the architecture below
3. **Core layout components** — Navigation, Footer, NAP, CTABlock (all variants)
4. **Global configuration** — SEO defaults, site metadata, NAP constants
5. **next.config.js** — image domains, redirect map (all 15 redirects), headers
6. **Design tokens** — colors, typography, spacing — matched to On Point brand
7. **Placeholder pages** — every route stubbed with correct metadata so the sitemap is complete from day one

---

## FOLDER STRUCTURE

```
/
├── app/
│   ├── layout.tsx                    # Root layout — GTM snippet, font loading, global metadata
│   ├── page.tsx                      # Homepage
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── reviews/page.tsx
│   ├── project-gallery/page.tsx
│   ├── services/
│   │   ├── page.tsx                  # Services hub
│   │   ├── commercial-furniture-installation-chicago-il/page.tsx
│   │   ├── cubicle-installation-chicago-il/page.tsx
│   │   ├── office-relocation-chicago-il/page.tsx
│   │   ├── systems-furniture-installation-chicago-il/page.tsx
│   │   ├── office-furniture-delivery-setup-chicago-il/page.tsx
│   │   ├── commercial-space-planning-chicago-il/page.tsx
│   │   ├── commercial-office-furniture-storage-chicago-il/page.tsx
│   │   ├── artwork-installation/page.tsx
│   │   ├── window-treatment-installations/page.tsx
│   │   ├── cubicle-wall-and-upholstery-cleaning/page.tsx
│   │   ├── electrical-voice-and-data-cabling-for-your-commercial-installation/page.tsx
│   │   ├── commercial-furniture-installation-schaumburg-il/page.tsx
│   │   ├── cubicle-installation-schaumburg-il/page.tsx
│   │   ├── commercial-furniture-installation-naperville-il/page.tsx
│   │   ├── commercial-furniture-installation-waukegan-il/page.tsx
│   │   └── commercial-furniture-installation-wauconda-il/page.tsx
│   ├── service-area/
│   │   ├── chicagoland-commercial-furniture-installation/page.tsx
│   │   ├── chicago-il/page.tsx
│   │   ├── schaumburg-il/page.tsx
│   │   ├── naperville-il/page.tsx
│   │   ├── waukegan-il/page.tsx
│   │   └── wauconda-il/page.tsx
│   ├── blog/
│   │   ├── page.tsx                  # Blog index
│   │   └── [slug]/page.tsx           # Dynamic blog post route
│   ├── project/
│   │   └── [slug]/page.tsx           # Dynamic project route
│   ├── privacy-policy/page.tsx
│   ├── terms-of-service/page.tsx
│   ├── disclaimer/page.tsx
│   └── cookie-policy/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── NAP.tsx
│   ├── ui/
│   │   ├── CTABlock.tsx              # Primary / Secondary / Banner variants
│   │   ├── ServiceCard.tsx
│   │   ├── CityServiceCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── BlogPostCard.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── FAQAccordion.tsx          # With FAQPage schema injection
│   │   ├── Breadcrumb.tsx            # With BreadcrumbList schema injection
│   │   └── ImageGallery.tsx
│   ├── schema/
│   │   ├── LocalBusinessSchema.tsx   # Homepage — from audit Prompt 17 Schema 1
│   │   ├── OrganizationSchema.tsx    # Homepage — Prompt 17 Schema 2
│   │   ├── WebSiteSchema.tsx         # Homepage — Prompt 17 Schema 3
│   │   ├── ServiceSchema.tsx         # All service pages — Prompt 17 Schema 4
│   │   ├── FAQSchema.tsx             # Service + blog pages — Prompt 17 Schema 5
│   │   ├── BreadcrumbSchema.tsx      # All non-homepage — Prompt 17 Schema 6
│   │   ├── PersonSchema.tsx          # /about/ — Prompt 17 Schema 7
│   │   └── ArticleSchema.tsx         # All blog posts
│   └── forms/
│       └── ContactForm.tsx
├── lib/
│   ├── constants.ts                  # NAP, phone, hours, social URLs, service cities
│   ├── metadata.ts                   # generateMetadata helpers
│   ├── schema.ts                     # Schema builder functions
│   └── sanity.ts                     # Sanity client (Phase 4)
├── types/
│   ├── service.ts
│   ├── blog.ts
│   └── project.ts
├── public/
│   ├── images/
│   └── favicon/
├── next.config.js                    # Redirects, image domains, headers
├── next-sitemap.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## GLOBAL CONSTANTS — lib/constants.ts

Build this file first. Every component pulls from here — no hardcoded strings anywhere in the codebase.

```typescript
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

export const PRIMARY_SERVICES = [
  { name: "Commercial Furniture Installation", slug: "commercial-furniture-installation-chicago-il" },
  { name: "Cubicle Installation", slug: "cubicle-installation-chicago-il" },
  { name: "Office Relocation", slug: "office-relocation-chicago-il" },
  { name: "Systems Furniture Installation", slug: "systems-furniture-installation-chicago-il" },
  { name: "Office Furniture Delivery & Setup", slug: "office-furniture-delivery-setup-chicago-il" },
  { name: "Commercial Space Planning", slug: "commercial-space-planning-chicago-il" },
];

export const NAP_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: "1220 Karl Ct",
  addressLocality: "Wauconda",
  addressRegion: "IL",
  postalCode: "60084",
  addressCountry: "US",
};
```

---

## REDIRECT MAP — next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/commercial-office-furniture-installation-chicago-il/', destination: '/services/commercial-furniture-installation-chicago-il/', permanent: true },
      { source: '/services/commercial-office-furniture-installation-chicago-il/', destination: '/services/commercial-furniture-installation-chicago-il/', permanent: true },
      { source: '/artwork-installation/', destination: '/services/artwork-installation/', permanent: true },
      { source: '/window-treatment-installations/', destination: '/services/window-treatment-installations/', permanent: true },
      { source: '/company-office-relocation-chicago-il/', destination: '/services/office-relocation-chicago-il/', permanent: true },
      { source: '/services/company-office-relocation-chicago-il/', destination: '/services/office-relocation-chicago-il/', permanent: true },
      { source: '/commercial-office-furniture-storage-chicago-il/', destination: '/services/commercial-office-furniture-storage-chicago-il/', permanent: true },
      { source: '/about-us-chicago-il/', destination: '/about/', permanent: true },
      { source: '/contact-us/', destination: '/contact/', permanent: true },
      { source: '/modular-furniture-designs/', destination: '/blog/modular-furniture-designs/', permanent: true },
      { source: '/space-planning/', destination: '/services/commercial-space-planning-chicago-il/', permanent: true },
      { source: '/services/space-planning/', destination: '/services/commercial-space-planning-chicago-il/', permanent: true },
      { source: '/the-differences-between-high-and-low-voltage-electricity/', destination: '/blog/the-differences-between-high-and-low-voltage-electricity/', permanent: true },
      { source: '/how-to-find-the-right-team-for-your-office-furniture-installation-project/', destination: '/blog/how-to-find-the-right-team-for-your-office-furniture-installation-project/', permanent: true },
      { source: '/site-credits/', destination: '/about/', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io'], // add Cloudinary domain if used for gallery
  },
};

module.exports = nextConfig;
```

---

## METADATA DEFAULTS — lib/metadata.ts

```typescript
import { Metadata } from 'next';
import { SITE } from './constants';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'Office Furniture Installer Chicago IL | On Point Installations',
    template: '%s | On Point Installations',
  },
  description: 'On Point Installations is Chicago\'s trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add GSC verification token after DNS cutover
  },
};

// Helper: generate page-level metadata
export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}
```

---

## SEO RULES (enforce throughout the build)

These are derived from the audit and must be respected in every file:

1. **Never hardcode NAP.** Always pull from `lib/constants.ts` SITE object.
2. **Every page has a unique title tag and meta description.** No duplicates. No "test" placeholders.
3. **Every non-homepage page has a BreadcrumbList schema component.**
4. **Every service page has a ServiceSchema and FAQSchema component.**
5. **The homepage has LocalBusiness, Organization, and WebSite schema — all three.**
6. **The /about/ page has PersonSchema for Brian Vetter.**
7. **All blog posts have ArticleSchema.**
8. **The redirect map in next.config.js is the source of truth.** Do not create new URLs without adding redirects for old ones.
9. **Image alt text is required on every `<Image>` component.** No empty alt attributes.
10. **The phone number link always uses `href="tel:+18475504042"`.** Consistent across all components.
11. **Internal links use exact anchor text from the audit.** Do not paraphrase link text on SEO-critical pages.
12. **Never link to /site-credits/.** It redirects to /about/ but should not be linked from anywhere.

---

## DESIGN DIRECTION

**Tone:** Professional, direct, plain-spoken. Not corporate. Not salesy. Speaks to B2B buyers — facilities directors, office managers, furniture dealers.

**Visual direction:**
- Clean, fast, mobile-first
- Real project photography is the primary visual asset — not stock
- Navy / white / gray palette (match existing brand — get exact hex from Brian)
- Strong CTAs — phone number always in the header on mobile
- Reviews/social proof near the top on every service page

**Typography:** TBD pending brand style guide from Brian. Use `next/font` with a system fallback stack until confirmed.

---

## PHASE 1 COMPLETION CRITERIA

Phase 1 is complete when:
- [ ] `npx create-next-app` scaffold initialized with TypeScript + Tailwind + App Router
- [ ] All routes stubbed (every page in the folder structure exists with correct metadata)
- [ ] `lib/constants.ts` complete with all SITE values
- [ ] `next.config.js` complete with all 15 redirects and image config
- [ ] Navigation component built (desktop + mobile)
- [ ] Footer component built with NAP, social links, service cities
- [ ] CTABlock component built (Primary / Secondary / Banner variants)
- [ ] All 8 schema components stubbed and wired to accept props
- [ ] `generatePageMetadata` helper working and used on at least 3 pages
- [ ] Vercel project created and connected to repo — staging URL live
- [ ] Core Web Vitals baseline run on staging (Lighthouse)

---

## NEXT PHASE PREVIEW

**Phase 2** builds the homepage and all primary service pages with full content, schema, and internal linking. Have the Prompt 10 (Money Page Audit) and Prompt 11 (City Page Builder) reports available — they contain the exact copy for the hero sections, service descriptions, FAQ Q&As, and CTAs.

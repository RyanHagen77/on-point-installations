# On Point Installations — Next.js Rebuild
# Phase 3: City Service Pages + Service Area Hub
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phases 1 and 2 are complete. The scaffold, core components, homepage, primary Chicago service pages, and supporting core pages (/about/, /contact/, /reviews/) are live on staging.

Phase 3 builds the geographic expansion layer — the city+service pages and service area hub that establish Chicagoland-wide topical authority. These pages are the primary mechanism for capturing "commercial furniture installation [city]" searches in the non-Chicago suburbs.

**Refer to:** BUILD_PLAN.md Section 4 for SEO config. Prompt 11 (Service + City Page Builder) for full page copy — 6 complete pages with exact body copy, FAQs, and CTAs were written in that prompt. Use them directly.

**Priority order:** Build Schaumburg first (KD 20, lowest competition among target cities), then Wauconda (KD 12, hometown advantage, easiest to rank #1), then Naperville, Waukegan, and the hub pages.

---

## PHASE 3 OBJECTIVES

1. City + service pages (5 cities × primary service = 5 pages minimum, plus 2 city-specific sub-service pages)
2. Service area hub pages (Chicagoland hub + 5 city hub pages)
3. Template-driven architecture so future cities can be added by an agent without developer involvement

---

## CITY PAGE TEMPLATE ARCHITECTURE

Build a reusable template component that accepts city-specific props. This enables agent-driven page creation in the future.

```typescript
// types/cityPage.ts
export interface CityPageProps {
  city: string;                    // "Schaumburg"
  state: string;                   // "IL"
  slug: string;                    // "schaumburg-il"
  service: string;                 // "Commercial Furniture Installation"
  serviceSlug: string;             // "commercial-furniture-installation"
  targetKeyword: string;           // "commercial furniture installation Schaumburg IL"
  keywordDifficulty: number;       // 20
  titleTag: string;
  metaDescription: string;
  h1: string;
  intro: string;                   // City-specific opening paragraph
  cityContext: string;             // Local landmarks, business districts, corridors
  faqs: FAQ[];
  nearbyPages: InternalLink[];     // Links to other city pages and Chicago page
}
```

```tsx
// components/templates/CityServicePage.tsx
// Accepts CityPageProps and renders the full page
// All schema, breadcrumb, and internal linking is handled by the template
// Agent can create a new city page by passing a new props object
```

---

## CITY SERVICE PAGES TO BUILD

### 1. `/services/commercial-furniture-installation-schaumburg-il/`

**Priority: BUILD FIRST — KD 20, no competition, fastest path to page 1 for a non-Chicago city**

```typescript
export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Schaumburg IL | On Point Installations',
  description: 'Commercial furniture installation in Schaumburg, IL. Non-union crew, same-day quotes, 11,000+ completed projects. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/commercial-furniture-installation-schaumburg-il/',
});
```

**H1:** `Commercial Office Furniture Installation in Schaumburg, IL`

**Schema:**
```tsx
<BreadcrumbSchema items={[
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services/' },
  { name: 'Commercial Furniture Installation Schaumburg', url: '/services/commercial-furniture-installation-schaumburg-il/' },
]} />
<ServiceSchema
  name="Commercial Furniture Installation in Schaumburg, IL"
  serviceType="Commercial Furniture Installation"
  areaServed={["Schaumburg", "Illinois"]}
/>
<FAQSchema faqs={schaumburgFAQs} />
```

**City context paragraph (use in body copy):**
"On Point Installations serves the Schaumburg corridor regularly — the I-290/I-90 interchange, Woodfield Corporate Center, Schaumburg Township district offices, and corporate campuses along Golf Road and Meacham Road. If your project is in Schaumburg, Hoffman Estates, Elk Grove Village, or anywhere in the northwest Cook County corridor, we can have a crew on-site the same week."

**Internal links (required):**
- → /services/commercial-furniture-installation-chicago-il/ (anchor: "Chicago office furniture installation")
- → /services/cubicle-installation-schaumburg-il/ (anchor: "cubicle installation in Schaumburg")
- → /contact/ (anchor: "get a free quote for your Schaumburg project")
- → /service-area/schaumburg-il/ (anchor: "our Schaumburg service area")

**FAQ Q&As (5 minimum — use Prompt 11 FAQ section for Schaumburg):**
1. Do you install office furniture in Schaumburg, IL?
2. How quickly can you schedule a Schaumburg installation?
3. Do you work with furniture dealers delivering to Schaumburg addresses?
4. What types of commercial furniture do you install in Schaumburg?
5. Are you a union or non-union installation company serving Schaumburg?

---

### 2. `/services/commercial-furniture-installation-wauconda-il/`

**Priority: BUILD SECOND — KD 12, hometown advantage, already at position ~15 with no dedicated page**

```typescript
export const metadata = generatePageMetadata({
  title: 'Office Furniture Installer Wauconda IL | On Point Installations',
  description: 'Wauconda\'s local commercial furniture installation company. On Point Installations — based in Wauconda, serving all of Chicagoland. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/commercial-furniture-installation-wauconda-il/',
});
```

**H1:** `Office Furniture Installation in Wauconda, IL`

**City context paragraph:**
"Based at 1220 Karl Ct in Wauconda, On Point Installations has been Lake County's go-to commercial furniture installation crew since 2010. If you're a local business in Wauconda, Volo, Round Lake, Island Lake, or the surrounding Lake County area, we're your neighbors — and we can be on-site faster than any other installer in the region."

**Internal links (required):**
- → /services/commercial-furniture-installation-chicago-il/ (anchor: "Chicago office furniture installation")
- → /about/ (anchor: "about On Point Installations — based in Wauconda since 2010")
- → /contact/ (anchor: "get a quote from your local Wauconda installer")

---

### 3. `/services/commercial-furniture-installation-naperville-il/`

```typescript
export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Naperville IL | On Point Installations',
  description: 'Professional commercial furniture installation in Naperville, IL. On Point Installations serves DuPage County and surrounding areas. Non-union team. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/commercial-furniture-installation-naperville-il/',
});
```

**H1:** `Commercial Furniture Installation in Naperville, IL`

**City context paragraph:**
"On Point Installations serves Naperville and the broader DuPage County corridor regularly — including Lisle, Warrenville, Aurora, and Wheaton. Corporate campuses and office parks along I-88 in the East-West Tollway corridor are a regular part of our service footprint."

---

### 4. `/services/commercial-furniture-installation-waukegan-il/`

```typescript
export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Waukegan IL | On Point Installations',
  description: 'Commercial furniture installation in Waukegan, IL. On Point Installations serves Lake County and the North Shore. Non-union. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/commercial-furniture-installation-waukegan-il/',
});
```

**H1:** `Commercial Furniture Installation in Waukegan, IL`

**City context paragraph:**
"On Point Installations serves Waukegan and the broader Lake County corridor — including North Chicago, Gurnee, Libertyville, Vernon Hills, and Mundelein. Our Wauconda headquarters puts us less than 20 minutes from Waukegan, making us one of the fastest-response commercial furniture installers in Lake County."

---

### 5. `/services/cubicle-installation-schaumburg-il/`

```typescript
export const metadata = generatePageMetadata({
  title: 'Cubicle Installation Schaumburg IL | On Point Installations',
  description: 'Professional cubicle installation in Schaumburg, IL. New installs, reconfigurations, and teardowns. Non-union crew. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/cubicle-installation-schaumburg-il/',
});
```

**H1:** `Cubicle Installation in Schaumburg, IL`

**Internal links:**
- → /services/commercial-furniture-installation-schaumburg-il/ (anchor: "commercial furniture installation in Schaumburg")
- → /services/cubicle-installation-chicago-il/ (anchor: "cubicle installation in Chicago")
- → /contact/

---

## SERVICE AREA HUB PAGES

### `/service-area/chicagoland-commercial-furniture-installation/`

```typescript
export const metadata = generatePageMetadata({
  title: 'Chicagoland Commercial Furniture Installation | On Point Installations',
  description: 'On Point Installations serves the entire Chicagoland metro area for commercial furniture installation. Chicago, Schaumburg, Naperville, Waukegan & beyond.',
  canonical: 'https://onpointinstallations.com/service-area/chicagoland-commercial-furniture-installation/',
});
```

**H1:** `Commercial Furniture Installation Across Chicagoland`

**Purpose:** This is the regional hub page that links to all city service pages and the primary Chicago page. It targets "Chicagoland commercial furniture installation" and "office furniture installer Chicagoland" — regional terms that span multiple cities.

**Sections:**
1. Intro — On Point Installations serves the full Chicagoland metropolitan area
2. City grid — cards linking to each city service page with the city name and primary service
3. Service area map description — Cook County, Lake County, DuPage County, McHenry County
4. Tri-State coverage — IL, WI, IN
5. CTA → /contact/

**Internal links (required — links to every city page):**
- → /services/commercial-furniture-installation-chicago-il/
- → /services/commercial-furniture-installation-schaumburg-il/
- → /services/commercial-furniture-installation-naperville-il/
- → /services/commercial-furniture-installation-waukegan-il/
- → /services/commercial-furniture-installation-wauconda-il/
- → /contact/

### City Hub Pages (5 pages — `/service-area/[city-slug]/`)

Build all 5 using a template. Each city hub page is a thin but unique page that:
- Confirms On Point Installations serves this city
- Links to the primary service page for this city
- Links back to the Chicagoland hub
- Targets "[city] furniture installation" and "[city] office furniture" searches

| City | Slug | Title Tag |
|------|------|-----------|
| Chicago | chicago-il | `Chicago Commercial Furniture Installation | On Point Installations` |
| Schaumburg | schaumburg-il | `Schaumburg Commercial Furniture Installation | On Point Installations` |
| Naperville | naperville-il | `Naperville Commercial Furniture Installation | On Point Installations` |
| Waukegan | waukegan-il | `Waukegan Commercial Furniture Installation | On Point Installations` |
| Wauconda | wauconda-il | `Wauconda Commercial Furniture Installation | On Point Installations` |

---

## REMAINING SECONDARY SERVICE PAGES

These existing services from the WordPress site need to be migrated with rewritten metadata:

### `/services/commercial-office-furniture-storage-chicago-il/`
- Title: `Commercial Furniture Storage Chicago | On Point Installations`
- H1: `Commercial Office Furniture Storage in Chicago, IL`
- Meta: `Commercial office furniture storage and warehousing in Chicago, IL. Secure storage for your installation components. Call (847) 550-4042.`

### `/services/artwork-installation/`
- Title: `Professional Artwork Installation Chicago | On Point Installations`
- H1: `Commercial Artwork Installation in Chicago, IL`
- Meta: `Commercial artwork installation in Chicago and the Tri-State area. Paintings, mirrors, displays, and signage for offices, healthcare, and hospitality. Call (847) 550-4042.`

### `/services/window-treatment-installations/`
- Title: `Commercial Window Treatment Installation Chicago | On Point Installations`
- H1: `Commercial Window Treatment Installation`
- Meta: `Office window treatment installation in Chicago, IL. Blinds, shades, and coverings for commercial spaces. Call (847) 550-4042.`

### `/services/cubicle-wall-and-upholstery-cleaning/`
- Title: `Cubicle Cleaning Service Chicago | On Point Installations`
- H1: `Cubicle Wall & Upholstery Cleaning`
- Meta: `Professional cubicle wall and upholstery cleaning in the Chicago area. Deep cleaning for office panels, fabric surfaces, and workstation components. Call (847) 550-4042.`

### `/services/electrical-voice-and-data-cabling-for-your-commercial-installation/`
- Keep existing URL
- Title: `Electrical & Voice/Data Cabling | Commercial Installation | On Point Installations`
- H1: `Electrical, Voice & Data Cabling for Commercial Installations`
- Note: Confirm with Brian whether to keep, expand, or remove this service.

---

## AGENT-READY CITY PAGE SCAFFOLD

Once the template component is built, a new city page should be addable by an agent with a single data file. Structure the data layer so future expansion requires no component changes:

```typescript
// data/cityPages/buffalo-grove-il.ts
export const buffaloGroveIL: CityPageProps = {
  city: "Buffalo Grove",
  state: "IL",
  slug: "buffalo-grove-il",
  service: "Commercial Furniture Installation",
  serviceSlug: "commercial-furniture-installation",
  targetKeyword: "commercial furniture installation Buffalo Grove IL",
  keywordDifficulty: 12,
  titleTag: "Commercial Furniture Installation Buffalo Grove IL | On Point Installations",
  metaDescription: "Professional commercial furniture installation in Buffalo Grove, IL. On Point Installations serves Lake County and surrounding areas. Non-union. Call (847) 550-4042.",
  h1: "Commercial Furniture Installation in Buffalo Grove, IL",
  intro: "...",
  cityContext: "...",
  faqs: [...],
  nearbyPages: [...],
};
```

---

## PHASE 3 COMPLETION CRITERIA

- [ ] All 5 city service pages built with correct metadata, H1, schema, body copy, FAQ, and CTAs
- [ ] Chicagoland service area hub page built and linking to all 5 city pages
- [ ] All 5 city hub pages built from template
- [ ] All secondary service pages migrated with rewritten metadata
- [ ] CityServicePage template component built and reusable (accepts props, no hardcoded city strings)
- [ ] All city pages internally linked back to the primary Chicago service page
- [ ] All city pages internally linked to /service-area/chicagoland-commercial-furniture-installation/
- [ ] All BreadcrumbSchema, ServiceSchema, and FAQSchema components rendering correctly on all new pages
- [ ] Rich Results Test passing on at least one city page (validate Schaumburg first)
- [ ] No orphaned pages — every new page is linked from at least one other page

---

## NEXT PHASE PREVIEW

**Phase 4** sets up Sanity.io headless CMS, migrates existing blog posts, and scaffolds the 20 new blog posts from the Prompt 16 content briefs. Have the full Prompt 16 report available — every brief has a complete URL slug, title tag, meta description, H1, recommended structure, word count, internal links, schema requirements, and CTA copy.

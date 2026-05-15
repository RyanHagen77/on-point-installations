# On Point Installations — Next.js Rebuild
# Phase 2: Homepage + Primary Service Pages
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phase 1 is complete. The project scaffold, folder structure, constants, redirects, and core layout components are in place. Phase 2 builds the visible pages — starting with the homepage and the primary Chicago service pages that drive the most commercial traffic.

**Refer to:** BUILD_PLAN.md Section 4 for all SEO configuration. Prompt 10 (Money Page Audit) for title tags, H1s, and meta descriptions. Prompt 11 (City Page Builder) for full page copy, FAQ Q&As, and CTAs.

**SEO constraint:** Every title tag, H1, meta description, and canonical URL in this phase is pre-specified in the audit. Do not rewrite, paraphrase, or "improve" them without flagging it — they were written against live GSC data.

---

## PHASE 2 OBJECTIVES

Build fully content-complete, schema-complete, internally-linked pages for:
1. Homepage (`/`)
2. Primary Chicago service pages (the core commercial keyword targets)
3. Supporting core pages (/about/, /contact/, /reviews/)

---

## PAGE BUILD ORDER

Build in this exact sequence — each page provides internal link targets for the next:

1. `/` — Homepage (establishes the internal linking hub)
2. `/services/commercial-furniture-installation-chicago-il/` — Primary money page
3. `/services/cubicle-installation-chicago-il/`
4. `/services/office-relocation-chicago-il/`
5. `/services/systems-furniture-installation-chicago-il/`
6. `/services/office-furniture-delivery-setup-chicago-il/`
7. `/services/commercial-space-planning-chicago-il/`
8. `/about/`
9. `/contact/`
10. `/reviews/`

---

## HOMEPAGE — `/`

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Office Furniture Installer Chicago IL | On Point Installations',
  description: 'On Point Installations is Chicago\'s trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/',
});
```

### Schema (all three — homepage only)
```tsx
<LocalBusinessSchema />
<OrganizationSchema />
<WebSiteSchema />
```

### Page Sections (in order)
1. **Hero** — H1: `Commercial Office Furniture Installer in Chicago, IL` | Subheading: "Non-union. Fully insured. 11,000+ projects since 2010." | CTA: Call (847) 550-4042 + Get a Free Quote → /contact/ | Background: real project photo
2. **Trust bar** — 5.0★ / 25 Google Reviews | 15 Years in Business | 11,000+ Projects | 12–15 Person Crew
3. **Services grid** — 6 service cards linking to primary Chicago service pages
4. **Why On Point** — 3–4 differentiators pulled from Prompt 12 review language: "I selfishly don't want to recommend this company" quote angle, non-union advantage, no subcontracting, same-day quotes
5. **Service area** — city list with links to city service pages (Chicago, Schaumburg, Naperville, Waukegan, Wauconda)
6. **Review snippet** — 2–3 review quotes from GBP (pull from Prompt 12 analysis)
7. **CTA block** — "Ready to get started? Call (847) 550-4042 or request a quote online."

### Internal Links (required — these are the audit-specified anchor texts)
- → /services/commercial-furniture-installation-chicago-il/ anchor: "commercial furniture installation Chicago"
- → /services/cubicle-installation-chicago-il/ anchor: "cubicle installation"
- → /services/office-relocation-chicago-il/ anchor: "office relocation services"
- → /services/commercial-space-planning-chicago-il/ anchor: "commercial space planning"
- → /project-gallery/ anchor: "view our completed projects"
- → /reviews/ anchor: "see what our clients say"
- → /contact/ anchor: "get a free quote"

---

## PRIMARY MONEY PAGE — `/services/commercial-furniture-installation-chicago-il/`

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Chicago | On Point Installations',
  description: 'Professional commercial furniture installation in Chicago, IL. Office systems, cubicles, systems furniture & more. Non-union. Serving Chicagoland since 2010. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/commercial-furniture-installation-chicago-il/',
});
```

### Schema
```tsx
<BreadcrumbSchema items={[
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services/' },
  { name: 'Commercial Furniture Installation Chicago', url: '/services/commercial-furniture-installation-chicago-il/' },
]} />
<ServiceSchema
  name="Commercial Office Furniture Installation in Chicago, IL"
  description="Professional, fully insured commercial office furniture installation services throughout Chicago and the greater Chicagoland area. Non-union installation crews handle cubicle systems, panel systems, workstations, executive furniture, conference room furniture, and complete office setups."
  serviceType="Commercial Furniture Installation"
  areaServed={["Chicago", "Schaumburg", "Naperville", "Waukegan", "Wauconda"]}
/>
<FAQSchema faqs={chicagoServiceFAQs} />
```

### H1
`Commercial Furniture Installation in Chicago, IL`

### Page Sections (in order)
1. **Breadcrumb** — Home > Services > Commercial Furniture Installation Chicago
2. **Intro paragraph** — Lead with the outcome, not the service. "When your Chicago office needs furniture installed right — on time, on budget, and without the need to babysit the crew — On Point Installations is the team dealers and facility managers call first." Include primary keyword in first 80 words.
3. **What We Install** — H2: "What Our Chicago Office Furniture Installation Includes" — bulleted scope list: cubicle and panel systems, systems furniture (Herman Miller, Steelcase, Haworth, Knoll, Teknion, Hon, Allsteel), workstations, executive furniture, conference room, reception, healthcare, modular
4. **Why Choose On Point** — H2: "Why Chicago Businesses Choose On Point Installations" — use review language from Prompt 12: non-union flexibility, no subcontracting, fully insured, 130+ years combined experience, 11,000+ completed projects
5. **Service scope** — H2: "What's Included in Every Installation" — receiving and inspection, assembly, configuration, leveling, cleanup, punch list walk-through
6. **Brands** — H2: "Furniture Brands We Install" — Herman Miller, Steelcase, Haworth, Knoll, Teknion, Hon, Allsteel, Kimball, Trendway, DIRTT, Groupe Lacasse
7. **FAQ section** — H2: "Frequently Asked Questions" — use FAQAccordion component with FAQSchema. Minimum 5 Q&As from Prompt 17 Schema 5 FAQ block.
8. **CTA** — "Get a quote for your Chicago commercial furniture installation. Call (847) 550-4042 or request a free estimate online."

### Internal Links (required)
- → /services/cubicle-installation-chicago-il/ anchor: "cubicle installation in Chicago"
- → /services/office-relocation-chicago-il/ anchor: "office relocation services"
- → /services/commercial-space-planning-chicago-il/ anchor: "commercial space planning Chicago"
- → /project-gallery/ anchor: "see our completed Chicago projects"
- → /contact/ anchor: "get a free quote"
- → /services/commercial-furniture-installation-schaumburg-il/ anchor: "Schaumburg furniture installation"
- → /services/commercial-furniture-installation-naperville-il/ anchor: "Naperville furniture installation"

### Word count target: 800–1,000 words

---

## SERVICE PAGE PATTERN (apply to all remaining service pages)

Each service page follows the same structure. Fill in the specifics per service:

```
Breadcrumb
H1: [Service] in Chicago, IL
Intro paragraph (primary keyword in first 80 words)
H2: What [Service] Includes
H2: Why Choose On Point Installations
H2: [Service] for Chicago Businesses (city-specific paragraph)
H2: Frequently Asked Questions (FAQAccordion + FAQSchema — 5 Q&As minimum)
CTA block
```

### `/services/cubicle-installation-chicago-il/`
- Title: `Cubicle Installation Chicago | On Point Installations`
- H1: `Cubicle Installation in Chicago, IL`
- Meta: `Expert cubicle installation in Chicago, IL. New installs, reconfigurations, and teardowns for offices of all sizes. Non-union. Call (847) 550-4042.`
- Target keyword: cubicle installation Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /blog/what-is-cubicle-installation/ | → /contact/

### `/services/office-relocation-chicago-il/`
- Title: `Office Relocation Services Chicago | On Point Installations`
- H1: `Office Relocation Services in Chicago, IL`
- Meta: `Commercial office relocation in Chicago, IL. Teardown, transport, reinstallation, electrical disconnect/reconnect. Trusted since 2010. Call (847) 550-4042.`
- Target keyword: office relocation Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /services/office-furniture-delivery-setup-chicago-il/ | → /contact/

### `/services/systems-furniture-installation-chicago-il/`
- Title: `Systems Furniture Installation Chicago | On Point Installations`
- H1: `Systems Furniture Installation in Chicago, IL`
- Meta: `Commercial systems furniture installation in Chicago, IL. Haworth, Knoll, Steelcase, Herman Miller & more. Non-union team. Call (847) 550-4042.`
- Target keyword: systems furniture installation Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /blog/what-is-systems-furniture/ | → /contact/

### `/services/office-furniture-delivery-setup-chicago-il/`
- Title: `Office Furniture Delivery & Setup Chicago | On Point Installations`
- H1: `Office Furniture Delivery & Setup in Chicago, IL`
- Meta: `Office furniture delivery and setup services in Chicago, IL. White-glove delivery, assembly, and placement for commercial spaces. Call (847) 550-4042.`
- Target keyword: office furniture delivery setup Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /services/office-relocation-chicago-il/ | → /contact/

### `/services/commercial-space-planning-chicago-il/`
- Title: `Commercial Space Planning Chicago | On Point Installations`
- H1: `Commercial Space Planning in Chicago, IL`
- Meta: `Commercial space planning services in Chicago, IL. On-site measurement, floor plan verification, code compliance guidance. Call (847) 550-4042.`
- Target keyword: commercial space planning Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /blog/what-to-do-when-office-furniture-doesnt-fit/ | → /contact/

---

## /about/ PAGE

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'About On Point Installations | Commercial Furniture Installers | Wauconda, IL',
  description: 'Brian Vetter founded On Point Installations in 2010. Learn about our team, our non-union advantage, and why Chicago businesses trust us for commercial furniture installation.',
  canonical: 'https://onpointinstallations.com/about/',
});
```

### Schema
```tsx
<BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }]} />
<PersonSchema
  name="Brian Vetter"
  jobTitle="Founder and Owner"
  description="Brian Vetter founded On Point Installations, Inc. in 2010 and has built it into a leading commercial furniture installation company serving the Chicagoland metropolitan area and Tri-State region."
/>
```

### H1: `About On Point Installations`

### Sections
1. Brian's story — founded 2010, 15+ years, built on repeat business from dealers and corporate clients
2. By the numbers — 11,000+ projects, 130+ years combined team experience, 12–15 person crew, 5.0★ rating
3. Non-union advantage — flexibility, no jurisdiction restrictions, same crew from start to finish
4. Who we serve — furniture dealers, facilities directors, office managers, corporate project leads, healthcare, education, government
5. CTA → /contact/

---

## /contact/ PAGE

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Contact On Point Installations | Chicago Commercial Furniture Installer',
  description: 'Get a quote for commercial furniture installation in the Chicago metro area. Call (847) 550-4042 or fill out our contact form. On Point Installations — Wauconda, IL.',
  canonical: 'https://onpointinstallations.com/contact/',
});
```

### H1: `Contact On Point Installations`

### Sections
1. ContactForm component — fields: Name, Company, Phone, Email, Project type (dropdown), City, Project details (textarea)
2. Direct contact — phone number (large, tappable on mobile), email, address
3. Hours — Monday–Friday 9AM–5PM
4. NAP component (schema-eligible)

---

## /reviews/ PAGE

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Reviews | On Point Installations | Chicago Commercial Furniture Installers',
  description: 'See what clients say about On Point Installations. 5.0★ Google rating. Expert commercial furniture installation across Chicagoland since 2010.',
  canonical: 'https://onpointinstallations.com/reviews/',
});
```

### H1: `Client Reviews & Testimonials`

### Sections
1. Rating summary — 5.0★ / 25 Google Reviews (update count dynamically or hard-code with note to update)
2. Review cards — pull top quotes from Prompt 12 review analysis including the "I selfishly don't want to recommend this company" angle
3. CTA → /contact/

---

## INTERNAL LINKING MAP (Phase 2 pages only)

Every arrow below must be a live `<Link>` with the specified anchor text:

```
Homepage → /services/commercial-furniture-installation-chicago-il/ (anchor: "commercial furniture installation Chicago")
Homepage → /services/cubicle-installation-chicago-il/ (anchor: "cubicle installation")
Homepage → /services/office-relocation-chicago-il/ (anchor: "office relocation services")
Homepage → /reviews/ (anchor: "see what our clients say")
Homepage → /contact/ (anchor: "get a free quote")

/services/commercial-furniture-installation-chicago-il/ → /services/cubicle-installation-chicago-il/ (anchor: "cubicle installation in Chicago")
/services/commercial-furniture-installation-chicago-il/ → /services/office-relocation-chicago-il/ (anchor: "office relocation services")
/services/commercial-furniture-installation-chicago-il/ → /contact/ (anchor: "get a free quote")

/about/ → /services/ (anchor: "our services")
/about/ → /contact/ (anchor: "request a quote")
/about/ → /reviews/ (anchor: "see reviews")
```

---

## PHASE 2 COMPLETION CRITERIA

- [ ] Homepage fully built — all 7 sections, all schema, all internal links live
- [ ] Primary money page (/services/commercial-furniture-installation-chicago-il/) fully built — 800+ words, FAQ with 5 Q&As, all schema, all internal links
- [ ] All 5 additional Chicago service pages built per pattern — correct metadata, H1, schema, internal links
- [ ] /about/, /contact/, /reviews/ built and internally linked
- [ ] All BreadcrumbSchema components rendering correctly (validate via Rich Results Test on staging)
- [ ] All ServiceSchema and FAQSchema components rendering correctly
- [ ] PersonSchema rendering on /about/
- [ ] All three homepage schemas rendering correctly (LocalBusiness, Organization, WebSite)
- [ ] No duplicate title tags across any two pages
- [ ] All internal links from the mapping above are live and pointing to correct URLs
- [ ] Lighthouse score on homepage: Performance > 85, Accessibility > 95, Best Practices > 95, SEO 100

---

## NEXT PHASE PREVIEW

**Phase 3** builds all city service pages using a template-driven approach — Schaumburg, Naperville, Waukegan, Wauconda — plus the service area hub pages. Have the Prompt 11 (City Page Builder) full page copy available — 6 complete pages were written with exact body copy, FAQs, and CTAs.

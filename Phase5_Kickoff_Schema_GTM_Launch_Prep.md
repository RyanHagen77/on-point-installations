# On Point Installations — Next.js Rebuild
# Phase 5: Schema Implementation + GA4/GTM + Redirect Verification
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phases 1–4 are complete. All pages are built, blog is live on Sanity with ISR, and the full content structure is in place. Phase 5 hardens the technical SEO layer — verifying and completing schema across every page type, confirming all redirects are working correctly, and migrating GA4 from a direct gtag install to Google Tag Manager with proper conversion tracking.

**Refer to:** Prompt 17 (Entity Optimization) — complete JSON-LD schema blocks for all 7 schema types. BUILD_PLAN.md Section 7 (Schema Implementation Plan) and Section 5 (Redirect Map).

**This phase has no visible user-facing changes** — it's all technical infrastructure. The result is a site that validates cleanly in the Rich Results Test, has proper analytics configured, and has every redirect working correctly.

---

## PHASE 5 OBJECTIVES

1. Complete schema audit across all page types — verify every schema component is rendering with correct data
2. Validate all 15 redirects are in place and working (no chains, no loops)
3. Migrate GA4 from direct gtag.js to Google Tag Manager
4. Configure GA4 conversion events (form submit, phone click, CTA click)
5. Add Wikidata Q-URL to sameAs arrays once entity is created
6. Validate Core Web Vitals on staging

---

## SCHEMA AUDIT CHECKLIST

Run the Rich Results Test (search.google.com/test/rich-results) on each page type. Every page below must pass with zero errors.

### Homepage — `/`

Expected schema: LocalBusiness + Organization + WebSite (all three, all in `<head>`)

Validate the complete LocalBusiness block from Prompt 17 Schema 1 is rendering with:
- [ ] `@type`: "ProfessionalService"
- [ ] `name`: "On Point Installations, Inc." (with the 's' — confirm typo is fixed)
- [ ] `telephone`: "+18475504042"
- [ ] `address` (PostalAddress): 1220 Karl Ct, Wauconda, IL 60084
- [ ] `geo` (GeoCoordinates): lat 42.2788618, lng -88.1409177
- [ ] `openingHoursSpecification`: Mon–Fri 09:00–17:00
- [ ] `foundingDate`: "2010"
- [ ] `founder`: Brian Vetter
- [ ] `aggregateRating`: 5.0 / 25 reviews
- [ ] `areaServed`: array of 5 cities + 3 states
- [ ] `sameAs`: array of 12+ directories and social profiles
- [ ] `hasOfferCatalog`: 6 services listed
- [ ] `priceRange`: "$$"

If Wikidata entity has been created by this point:
- [ ] Add `"https://www.wikidata.org/wiki/Q[NUMBER]"` to sameAs array in LocalBusiness and Organization schemas

### Service Pages

Every service page at `/services/[slug]/` must have:
- [ ] BreadcrumbList (3 levels: Home > Services > [Page Name])
- [ ] Service schema with `name`, `description`, `serviceType`, `provider` (references LocalBusiness @id), `areaServed`
- [ ] FAQPage schema with minimum 5 Q&A pairs

### City Service Pages

Every city page at `/services/[service]-[city]-il/` must have:
- [ ] BreadcrumbList (3 levels)
- [ ] Service schema with city-specific `areaServed`
- [ ] FAQPage schema with city-specific Q&As

### /about/ Page

- [ ] BreadcrumbList (2 levels: Home > About)
- [ ] Person schema for Brian Vetter with `name`, `jobTitle`, `worksFor` (references LocalBusiness @id), `url`, `sameAs`

### Blog Posts

Every blog post must have:
- [ ] BreadcrumbList (3 levels: Home > Blog > [Post Title])
- [ ] Article schema with `headline`, `author`, `publisher`, `datePublished`, `dateModified`, `image`
- [ ] FAQPage schema if the post has FAQ items in Sanity (check `faqs` field length > 0)

### All Other Pages (/contact/, /reviews/, /project-gallery/, /project/[slug]/)

- [ ] BreadcrumbList only (2–3 levels depending on depth)

---

## SCHEMA COMPONENT FINAL IMPLEMENTATIONS

### LocalBusinessSchema.tsx (homepage only)

Pull all values from `lib/constants.ts` SITE object. The sameAs array should be defined in constants.ts so it can be updated in one place when new citations are added.

```typescript
// Add to lib/constants.ts
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
  // Add Wikidata Q-URL here once entity is created:
  // "https://www.wikidata.org/wiki/Q[NUMBER]",
  // Add YouTube once channel name is corrected:
  // "https://www.youtube.com/@OnPointInstallations",
  // Add Twitter/X once account is created:
  // "https://twitter.com/onpointinstalls",
];
```

### ArticleSchema.tsx (blog posts)

```typescript
interface ArticleSchemaProps {
  headline: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

// Schema output:
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": headline,
  "author": {
    "@type": "Organization",
    "@id": "https://onpointinstallations.com/#organization",
    "name": "On Point Installations, Inc."
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://onpointinstallations.com/#organization",
    "name": "On Point Installations, Inc.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://onpointinstallations.com/images/logo.png"
    }
  },
  "datePublished": datePublished,
  "dateModified": dateModified || datePublished,
  "image": image || "https://onpointinstallations.com/images/og-default.jpg",
  "url": url,
  "mainEntityOfPage": url,
}
```

---

## REDIRECT VERIFICATION

Test every redirect from the BUILD_PLAN.md Section 5. For each, verify:
- Returns HTTP 301 (not 302, not 200)
- No redirect chains (A → B → C — fix to A → C directly)
- No redirect loops
- Destination URL returns HTTP 200

```bash
# Test redirects with curl
curl -I https://onpointinstallations.com/space-planning/
# Expected: HTTP/2 301 + Location: /services/commercial-space-planning-chicago-il/

curl -I https://onpointinstallations.com/site-credits/
# Expected: HTTP/2 301 + Location: /about/

curl -I https://onpointinstallations.com/about-us-chicago-il/
# Expected: HTTP/2 301 + Location: /about/
```

**All 15 redirects to verify:**
1. /commercial-office-furniture-installation-chicago-il/ → /services/commercial-furniture-installation-chicago-il/
2. /services/commercial-office-furniture-installation-chicago-il/ → /services/commercial-furniture-installation-chicago-il/
3. /artwork-installation/ → /services/artwork-installation/
4. /window-treatment-installations/ → /services/window-treatment-installations/
5. /company-office-relocation-chicago-il/ → /services/office-relocation-chicago-il/
6. /services/company-office-relocation-chicago-il/ → /services/office-relocation-chicago-il/
7. /commercial-office-furniture-storage-chicago-il/ → /services/commercial-office-furniture-storage-chicago-il/
8. /about-us-chicago-il/ → /about/
9. /contact-us/ → /contact/
10. /modular-furniture-designs/ → /blog/modular-furniture-designs/
11. /space-planning/ → /services/commercial-space-planning-chicago-il/
12. /services/space-planning/ → /services/commercial-space-planning-chicago-il/
13. /the-differences-between-high-and-low-voltage-electricity/ → /blog/the-differences-between-high-and-low-voltage-electricity/
14. /how-to-find-the-right-team-for-your-office-furniture-installation-project/ → /blog/how-to-find-the-right-team-for-your-office-furniture-installation-project/
15. /site-credits/ → /about/

---

## GA4 MIGRATION — DIRECT GTAG → GOOGLE TAG MANAGER

### Current state
GA4 property G-1GSQDRFR9D is installed directly via gtag.js without GTM. This works but limits flexibility — adding new tracking requires code deployments.

### Target state
GA4 fires through a GTM container. All tracking configuration lives in GTM, not in code.

### Steps

**Step 1 — Create GTM container**
- Go to tagmanager.google.com
- Create new account: "On Point Installations"
- Create container: "onpointinstallations.com" (Web)
- Note the GTM container ID (format: GTM-XXXXXXX)
- Update `SITE.gtmId` in `lib/constants.ts`

**Step 2 — Install GTM in Next.js**
```typescript
// app/layout.tsx
import Script from 'next/script';

// In <head>:
<Script
  id="gtm-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${SITE.gtmId}');
    `,
  }}
/>

// Immediately after <body> opening tag:
<noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
    height="0"
    width="0"
    style={{ display: 'none', visibility: 'hidden' }}
  />
</noscript>
```

**Step 3 — Configure GA4 in GTM**
In GTM:
1. Create a GA4 Configuration tag → Measurement ID: G-1GSQDRFR9D → Trigger: All Pages
2. Remove the direct gtag.js script from the site (it was in the WordPress theme — won't carry over to Next.js if not explicitly added)

**Step 4 — Configure conversion events in GTM**

Create the following GA4 Event tags in GTM:

**Contact form submission:**
- Tag type: GA4 Event
- Event name: `form_submit`
- Parameters: `form_type: "contact"`, `page_location: {{Page URL}}`
- Trigger: Custom event "contact_form_submit" (fire from React form onSuccess callback)

```typescript
// In ContactForm.tsx — fire on successful submission:
const handleSuccess = () => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'contact_form_submit',
      form_type: 'contact',
    });
  }
};
```

**Phone number click:**
- Tag type: GA4 Event
- Event name: `phone_click`
- Trigger: Click — just links — link URL contains "tel:"

**CTA button click:**
- Tag type: GA4 Event
- Event name: `cta_click`
- Parameters: `cta_text: {{Click Text}}`, `cta_location: {{Page URL}}`
- Trigger: Click — all elements — CSS class contains "cta-button" (add this class to all CTABlock components)

**Step 5 — Verify in GA4 DebugView**
- Enable GTM Preview mode
- Navigate the staging site
- Confirm events fire in GA4 DebugView (Realtime → DebugView)
- Confirm page_view fires on every route change (including client-side navigation)
- Confirm form_submit fires on contact form submission
- Confirm phone_click fires on mobile tap of phone number

---

## SITEMAP CONFIGURATION

```javascript
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://onpointinstallations.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/studio/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/studio/' },
    ],
  },
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === '/') return { loc: path, changefreq: 'daily', priority: 1.0 };
    // Primary service page gets high priority
    if (path.includes('commercial-furniture-installation-chicago-il')) return { loc: path, changefreq: 'weekly', priority: 0.9 };
    // Other service pages
    if (path.startsWith('/services/')) return { loc: path, changefreq: 'weekly', priority: 0.8 };
    // City and service area pages
    if (path.startsWith('/service-area/')) return { loc: path, changefreq: 'monthly', priority: 0.7 };
    // Blog posts
    if (path.startsWith('/blog/')) return { loc: path, changefreq: 'monthly', priority: 0.6 };
    // Project pages
    if (path.startsWith('/project/')) return { loc: path, changefreq: 'monthly', priority: 0.5 };
    // Legal pages
    return { loc: path, changefreq: 'yearly', priority: 0.3 };
  },
};
```

---

## CORE WEB VITALS VALIDATION

Run Lighthouse on the staging URL for these pages:
- Homepage
- Primary service page (/services/commercial-furniture-installation-chicago-il/)
- One blog post
- One city page

**Targets (all must pass before launch):**

| Metric | Target | How to achieve |
|--------|--------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | `priority` prop on hero image, `next/font` for fonts, minimal above-fold JS |
| INP (Interaction to Next Paint) | < 200ms | Minimize client components, defer non-critical JS |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit width/height on all images, stable font loading |
| Performance Score | > 85 | |
| Accessibility Score | > 95 | Alt text on all images, semantic HTML, ARIA labels on nav |
| SEO Score | 100 | All meta tags, canonical, robots, sitemap |

---

## PHASE 5 COMPLETION CRITERIA

- [ ] All schema types validated via Rich Results Test — zero errors on homepage, one service page, one blog post, /about/
- [ ] All 15 redirects returning HTTP 301 — verified with curl
- [ ] No redirect chains — each old URL goes directly to new URL in a single hop
- [ ] GTM container created and installed in Next.js layout
- [ ] GA4 G-1GSQDRFR9D firing through GTM — confirmed in DebugView
- [ ] form_submit conversion event firing on contact form success
- [ ] phone_click event firing on phone number tap/click
- [ ] Sitemap generated at /sitemap.xml — all pages included with correct priorities
- [ ] robots.txt generated correctly — no important pages blocked
- [ ] Wikidata Q-URL added to sameAs arrays if entity has been created
- [ ] Lighthouse scores passing on homepage (Performance > 85, SEO = 100)
- [ ] OG tags verified on homepage and primary service page (use opengraph.xyz to test)

---

## NEXT PHASE PREVIEW

**Phase 6** is the launch phase — DNS cutover, GSC verification, sitemap submission, GBP URL update, post-launch monitoring, and handoff documentation. Have the Prompt 19 (Monthly SEO Report) prompt ready — the first monthly report should run 30 days post-launch to capture the initial ranking changes from the new site going live.

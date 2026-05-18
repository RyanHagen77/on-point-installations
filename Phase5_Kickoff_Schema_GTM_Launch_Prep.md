# On Point Installations — Next.js Rebuild
# Phase 5: Schema Implementation + GA4/GTM + Redirect Verification
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phases 1–4 are complete. All pages are built, blog infrastructure is live on Sanity with ISR, and the full content structure is in place. Phase 5 completes the technical SEO layer, wires the contact form email handler, runs the full 25-post WordPress-to-Sanity blog migration, and migrates GA4 from a direct gtag install to Google Tag Manager with proper conversion tracking.

**Refer to:** Prompt 17 (Entity Optimization) — complete JSON-LD schema blocks for all 7 schema types. BUILD_PLAN.md Section 7 (Schema Implementation Plan) and Section 5 (Redirect Map).

**Phase 4 completed (2026-05-18):** Blog infrastructure built, Sanity schema defined, migration pipeline proven in the IntegrePro SEO Lab sandbox. Three Wave 1 retrofits shipped (commits 065bee5, 6a88731, dda741f, 52b4630). Phase 4 housekeeping closed with this kickoff update. Sandbox details: repo `https://github.com/RyanHagen77/integrepro-seo-lab`, deployed at `https://project-wdufc.vercel.app`, Sanity project `hwyx6cco`. See `docs/phase-4-close.md` for full Phase 4 commit list, 25-post inventory, and substitution table.

---

## PHASE 4 HANDOFF — CARRY-FORWARD ITEMS

These items surfaced during Phase 4 and must be resolved before or during Phase 5 execution. Full detail in `docs/known-issues.md` — Phase 4 Close Note section.

### Critical Blockers for Blog Migration (resolve before running 25-post production import)

**1. publishedAt extraction**
The WordPress theme at onpointinstallations.com does not emit `article:published_time` meta or `<time datetime>` in rendered HTML. All sandbox posts imported with `publishedAt: null`, which breaks Article schema `datePublished`. Fix: add a `--published-at` flag to the migration script, or prefetch dates via WP REST API (`/wp-json/wp/v2/posts?slug=[slug]` → `date_gmt` field) before each post run.

**2. Category extraction selector**
Current selector `.cat-links a` returns null — category links are outside `.entry-content`. Likely correct selector: `.entry-header .cat-links a`. Verify on a live WP post HTML before the production run, then update `extractPost()` in `scripts/migrate-wp-post.ts`.

**3. WordPress image resize variants**
The migration script strips `<img>` tags from post bodies (by design). When images are added to Sanity, always pull from `-scaled.jpg` or the unsuffixed original — never from WordPress thumbnail variants (`-1200x800`, `-600x400`, etc.). Sandbox migration logs (`logs/*.err`) list all skipped image `src` values for audit.

### Non-Blocking Carry-Forwards

**4. On-demand Sanity revalidation (production requirement)**
Time-based ISR (`revalidate = 3600` / `86400`) worked for the sandbox but is insufficient for a production publishing workflow. Configure a Sanity webhook to call a Next.js `revalidatePath` or `revalidateTag` API route on blog post publish/update events. This gives near-instant cache invalidation instead of waiting up to 24 hours.

**5. 25-post scope confirmed**
The production WordPress blog has 25 posts (not 26 — an earlier estimate was overcounted). The sandbox migration script is the proven pattern; the 25-post production run uses the same script against the On Point Sanity project.

**6. Dead-link substitution for /project/ and /category/ URLs**
Migrated blog post bodies contain internal links to `/project/[slug]/` and `/category/[name]/` WordPress paths. These have no equivalent in the new build. During production migration, apply the substitution table:
- `/project/[slug]/` → no equivalent; replace link with plain text or strip entirely
- `/category/[name]/` → no equivalent; strip link
- All other on-point service page links → apply the 8-slug substitution table (old WP slugs → new build slugs) from the migration planning notes.
The sandbox migration intentionally left these as external `onpointinstallations.com` URLs. Production must resolve them.

**7. Author schema / byline**
The migration script strips bylines (`By Brian Vetter`) from post bodies. If the On Point build eventually renders author bylines on blog posts, a Sanity `author` reference field needs to be added to the `blogPost` schema and populated during migration. Not currently in scope — flag if Brian wants bylines.

**8. Voice review gap for Sanity-authored content**
The pre-commit hook in this repo checks staged files for em dashes, banned phrases, and other voice violations. It cannot inspect content flowing through Sanity at render time. Blog posts authored directly in Sanity Studio bypass the hook. For the 25-post migration from WordPress, the migration script dry-run output should be checked against voice rules before each production import. For future Brian-authored posts, this review happens manually before publishing.

**9. Brian Sanity account spinup**
Brian needs his own Sanity account to author and publish blog posts without dev involvement. Steps: invite Brian's email to the `hwyx6cco` Sanity project with Editor role. Walk him through Studio UI at the `/studio` route on the staging URL before DNS cutover.

---

## PHASE 5 OBJECTIVES

1. Complete schema audit across all page types — verify every schema component is rendering with correct data
2. Validate all 15 redirects are in place and working (no chains, no loops)
3. Migrate GA4 from direct gtag.js to Google Tag Manager
4. Configure GA4 conversion events (form submit, phone click, CTA click)
5. Add Wikidata Q-URL to sameAs arrays once entity is created
6. Validate Core Web Vitals on staging
7. Wire Postmark for contact form email (after confirming destination address with Brian)
8. Run full 25-post WordPress-to-Sanity blog migration (resolve carry-forward blockers first)
9. Configure Sanity webhook for on-demand blog cache revalidation
10. Set up Brian's Sanity Studio account

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

## BLOG MIGRATION — 25-POST WORDPRESS-TO-SANITY

The full blog migration runs in Phase 5 using the pattern proven in the `integrepro-seo-lab` sandbox. Three posts were imported and verified in Phase 4. The remaining 22 follow the same script.

### Pre-migration checklist (resolve carry-forward items 1–3 above first)

- [ ] `publishedAt` extraction solved — WP REST API prefetch or `--published-at` flag added to script
- [ ] Category selector corrected in `extractPost()` — confirmed against live WP HTML
- [ ] Dead-link substitution table finalized — all `/project/`, `/category/`, and old-slug service URLs mapped

### Migration script location

`integrepro-seo-lab/scripts/migrate-wp-post.ts`

The script targets the On Point Sanity project when `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_WRITE_TOKEN` are set to the On Point project values (not the sandbox). Use `--dry-run` first on each post before writing.

### Post-migration verification (per post)

1. Document appears in Sanity Studio with correct title, slug, category, publishedAt, excerpt, and body
2. `/blog/[slug]/` renders on staging — full body, correct H1, no byline in excerpt
3. Article JSON-LD present with populated `datePublished` (not undefined/null)
4. FAQPage JSON-LD present if post has FAQs in Sanity
5. BreadcrumbList JSON-LD present
6. `/blog/` index shows post card

### Post-migration: configure Sanity webhook

After all 25 posts are in, configure on-demand revalidation (carry-forward item 4):
1. In Sanity Management → API → Webhooks — create a webhook for `blogPost` create/update events
2. Webhook target: `https://onpointinstallations.com/api/revalidate` (POST with secret header)
3. Create `src/app/api/revalidate/route.ts` — validates secret, calls `revalidateTag('blog')` and `revalidatePath('/blog/')`
4. Tag the blog GROQ fetches with `{ next: { tags: ['blog'] } }` in the Sanity client calls

---

## CONTACT FORM — POSTMARK INTEGRATION

The contact API route stub (`src/app/api/contact/route.ts`) validates fields and returns `{ ok: true }` but does not send email. Wire Postmark in Phase 5.

### Steps

**Step 1 — Verify destination email**
Before any code: confirm `info@onpointinstall.com` vs. `info@onpointinstallations.com` with Brian. Wrong address = silently dropped leads. See `docs/known-issues.md` — "Contact Form Email — Address Needs Verification."

**Step 2 — Install Postmark SDK**
```bash
npm install postmark
```
Add `POSTMARK_API_TOKEN` to `.env.local` and to Vercel environment variables.

**Step 3 — Wire the send in route.ts**
```typescript
import { ServerClient } from 'postmark';

const postmarkClient = new ServerClient(process.env.POSTMARK_API_TOKEN!);

// In the POST handler, after validation passes:
await postmarkClient.sendEmail({
  From: 'noreply@onpointinstallations.com',   // verified sender in Postmark
  To: process.env.CONTACT_FORM_TO_EMAIL!,      // info@onpointinstall[ations].com
  Subject: `New quote request from ${body.name} — ${body.company}`,
  TextBody: [
    `Name: ${body.name}`,
    `Company: ${body.company}`,
    `Phone: ${body.phone}`,
    `Email: ${body.email}`,
    `Project Type: ${body.projectType}`,
    `City: ${body.city}`,
    `Details: ${body.projectDetails || '(none)'}`,
  ].join('\n'),
});
```

**Step 4 — Verify in Postmark Activity**
Submit the contact form on staging. Confirm delivery in the Postmark Activity feed before DNS cutover.

---

## BRIAN-PENDING QUEUE (unchanged from Phase 3 close)

All items below require Brian's input before Phase 5 or Phase 6 launch prep. None are blocked by developer work — they are waiting on Brian.

| Item | Blocks |
|---|---|
| Verify `info@onpointinstall.com` vs. `info@onpointinstallations.com` | Contact form Postmark wiring |
| Review + approve drafted FAQ sections (6 service pages) | Phase 5 content freeze |
| Confirm "no subcontracting" claim — money page differentiator section | Phase 5 content freeze |
| Review 3 drafted H2 sections on money page (cubicle, systems, delivery) | Phase 5 content freeze |
| Provide city-specific review quotes for Schaumburg + Naperville | Phase 6 launch |
| Provide real job-site photos for inline content images (service pages) | Phase 6 launch |
| Provide city-specific hero photos (all 4 city CFI pages) | Phase 6 launch |
| Confirm Depositphotos license for electrical/voice/data hero image | Phase 6 launch |
| Confirm Gurpreet S. review exclusion on /reviews/ | Phase 5 polish |
| Commission SVG logo file | Phase 5 polish |
| Confirm GBP full ownership transfer | Phase 6 DNS cutover |
| Create GTM container (or confirm if one exists) | Phase 5 GA4 migration |
| Confirm Brian's Sanity Studio access (invite to project) | Blog migration |
| Confirm Wauconda CFI page framing — HQ-city angle vs. standard service-area template | Wauconda CFI build |

---

## DEFERRED FROM PHASE 3 — NO PHASE HOME

These items were deferred in Phase 3, Phase 4 closed without addressing them, and they have no current phase assignment. Scoping required before any can move forward. See `docs/phase-3-prep.md` (Deferred/Carryover Queue section) and `docs/known-issues.md` (Phase 3 Close Note section) for full detail.

- **Waukegan CFI page** (`/services/commercial-furniture-installation-waukegan-il/`) — blocked on audit source gap. Prompt 11 has no body copy spec for Waukegan — table entry only (slug, keyword, volume). Needs Brian interview or supplementary audit deliverable to unblock.
- **Wauconda CFI page** (`/services/commercial-furniture-installation-wauconda-il/`) — blocked on audit source gap AND framing decision (HQ-city home-base positioning vs. standard service-area template). Needs Ryan + Brian conversation before drafting. The framing choice affects title tag, H1, and body angle and cannot be reversed cheaply after indexing.
- **`/service-area/[city]-il/` stubs** — five stubs (chicago-il, schaumburg-il, naperville-il, waukegan-il, wauconda-il) exist from Phase 1 scaffolding with no content. Every city CFI page links to its corresponding stub. Largest remaining structural gap in the site. Needs a scoping conversation to determine phase assignment.

---

## PHASE 5 COMPLETION CRITERIA

**Schema and redirects:**
- [ ] All schema types validated via Rich Results Test — zero errors on homepage, one service page, one blog post, /about/
- [ ] All 15 redirects returning HTTP 301 — verified with curl
- [ ] No redirect chains — each old URL goes directly to new URL in a single hop

**Analytics:**
- [ ] GTM container created and installed in Next.js layout
- [ ] GA4 G-1GSQDRFR9D firing through GTM — confirmed in DebugView
- [ ] form_submit conversion event firing on contact form success
- [ ] phone_click event firing on phone number tap/click

**Contact form:**
- [ ] Destination email confirmed with Brian (`info@onpointinstall.com` vs. `info@onpointinstallations.com`)
- [ ] Postmark account set up, sender domain verified
- [ ] Contact form POST sends email — verified in Postmark Activity feed on staging

**Blog migration:**
- [ ] publishedAt carry-forward resolved (WP REST API or --published-at flag)
- [ ] Category selector fix confirmed and deployed to migration script
- [ ] Dead-link substitution table finalized for production run
- [ ] All 25 posts migrated to On Point Sanity project with correct data
- [ ] Each post verified: slug renders, Article JSON-LD datePublished populated, FAQPage conditional correct
- [ ] Sanity webhook configured → on-demand revalidation working on staging

**Sanity / Brian:**
- [ ] Brian invited to On Point Sanity project with Editor role
- [ ] Brian can publish a test post in Studio without dev involvement

**Technical:**
- [ ] Sitemap generated at /sitemap.xml — all pages included with correct priorities
- [ ] robots.txt generated correctly — no important pages blocked
- [ ] Wikidata Q-URL added to sameAs arrays if entity has been created
- [ ] Lighthouse scores passing on homepage (Performance > 85, SEO = 100)
- [ ] OG tags verified on homepage and primary service page (use opengraph.xyz to test)

---

## NEXT PHASE PREVIEW

**Phase 6** is the launch phase — DNS cutover, GSC verification, sitemap submission, GBP URL update, post-launch monitoring, and handoff documentation. Have the Prompt 19 (Monthly SEO Report) prompt ready — the first monthly report should run 30 days post-launch to capture the initial ranking changes from the new site going live.

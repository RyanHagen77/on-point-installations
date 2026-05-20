# BUILD_PLAN.md
# On Point Installations, Inc. — React / Next.js Rebuild Master Specification
# Generated: 2026-05-14 | Crawl Source: https://onpointinstallations.com
# SEO Audit: IntegrePro Software LLC | Prompts 9–19 completed

---

## PHASE STATUS

| Phase | Description | Status | Final Commit | Date |
|-------|-------------|--------|--------------|------|
| Phase 1 | Project scaffold, routing stubs, constants, redirects, Vercel deploy | **COMPLETE** | — | 2026-05-14 |
| Phase 2 | Homepage, 8 Chicago service pages, /about/, /contact/, /reviews/ | **COMPLETE** | — | 2026-05-16 |
| Phase 3 | City CFI pages (Schaumburg, Naperville), money page retrofit | **COMPLETE** | `93d3712` | 2026-05-17 |
| Phase 4 | Blog infrastructure (Sanity CMS + ISR), sandbox proof-of-concept, Wave 1 page retrofits | **COMPLETE** | `8657f88` | 2026-05-18 |
| Phase 5 | Schema audit, Postmark, GA4/GTM, Core Web Vitals, 25-post blog migration, launch prep | In progress | `c3a5270` (Session 4) | 2026-05-20 |

**Phase 3 delivered (6 commits, 2026-05-17):**
- `5d5f464` — Restored background alternation on Chicago money page (regression from What's Included section insertion)
- `88eac8c` — Schaumburg CFI page: CityServicePage template scaffold + Schaumburg data file
- `80055cb` — Schaumburg ServiceSchema fix: `areaServed` typed as City not State
- `8197d65` — Template fix: inline `/contact/` anchor added to Why Choose Us section (spec anchor for all city pages)
- `fc4d575` — Naperville CFI page: data file + page route (template reuse validated)
- `93d3712` — Money page retrofit: Schaumburg + Naperville audit-locked anchor links in "What's Included" section

**Phase 3 deferred (carry to Phase 4 or later):**
- Waukegan and Wauconda CFI pages — Prompt 11 has no body copy spec for these cities (table entries only). Deferred pending audit gap resolution. See `docs/phase-3-prep.md`.
- /service-area/[city]-il/ stubs — never in Phase 3 scope; largest remaining structural gap. Scoping required.

**Phase 4 delivered (9 commits, 2026-05-18):**
- `065bee5` — /about/ retrofit: Schaumburg + Naperville city page anchor links
- `6a88731` — /project-gallery/ retrofit: Schaumburg anchor link in gallery intro
- `dda741f` — Schaumburg CFI retrofit: Naperville anchor link in service details
- `52b4630` — Schaumburg CFI retrofit: closing paragraph voice-rules revision
- `10da426` — Docs/Fix: replace Resend with Postmark (CLAUDE.md + contact route)
- `1b6c773` — Docs: BUILD_PLAN.md contact form provider question closed
- `35dbe1c` — Docs: phase-3-prep.md Wave 1 retrofits marked shipped
- `def22d2` — Docs: known-issues.md Phase 4 close note + blog migration carry-forwards
- `8657f88` — Docs: Phase5_Kickoff Phase 4 handoff, blog migration, Postmark scope

**Phase 4 deferred (no phase home — scoping required):**
- Waukegan and Wauconda CFI pages — remain blocked on audit source gap
- /service-area/[city]-il/ stubs — no content built; scoping required before Phase 5 or later

**Phase 5 Session 1 delivered (5 code commits + 2 verification passes, 2026-05-18):**
- `1d6c612` — LocalBusiness schema: @id rename to /#business, SAME_AS_URLS constant (12 URLs), description/image/logo/alternateName/numberOfEmployees/hasOfferCatalog added, NAP streetAddress to "Karl Ct"
- `e9065c5` — Organization schema: alternateName/foundingDate/founder/description/address added, logo dimensions, sameAs expanded to 12 URLs, contactPoint.areaServed fixed
- `85dd4db` — WebSite schema: description/alternateName/publisher reference added
- BreadcrumbList — verification only, all non-homepage pages confirmed clean (including /contact/ via ContactPageClient.tsx)
- `f235a2f` — Service schema: serviceType as required prop, provider @type to ProfessionalService, offers block, all 8 Chicago pages + city template + Schaumburg/Naperville data files updated
- FAQPage — verification only, all 8 service pages + CityServicePage render FAQSchema at page level
- `1252c9f` — Person schema: @id, givenName, familyName, sameAs, worksFor to ProfessionalService with /#business @id

**Phase 5 Session 1 deferred (gated on Brian's Sanity production project):**
- ArticleSchema fix (publisher @id to /#business)
- Blog template build (Sanity client, GROQ fetch, ArticleSchema render, conditional FAQPage)
- 25-post WordPress migration (with publishedAt/category/dead-link script hardening in same wave)
- Sanity webhook + on-demand revalidation route
- Asset audit of sandbox image references

**Phase 5 Session 2 delivered (4 commits, 2026-05-19):**
- `ebb7605` — Feat: consolidate Sanity Studio and migration tooling from lab repo (sanity.config.ts, schemas/, /studio route, src/lib/sanity.ts stub replaced, scripts/migrate-wp-post.ts, logs/, package.json deps, .env.example)
- `df7f906` — Fix: publishedAt extraction via WP REST API (fetchPublishedAt() pre-fetches /wp-json/wp/v2/posts?slug={slug}, reads date_gmt; verified 2024-08-25T15:12:47Z on modular-furniture-designs)
- `02b4413` — Fix: category extraction selector (article:section OG meta; .cat-links a absent from this WP theme)
- `01795e8` — Fix: dead-link substitution per phase-4-close table (SERVICE_SUBSTITUTIONS 14 entries, AUDIT_SUBSTITUTIONS 3 entries, dead-link strip for /project/ and /category/)

**Phase 5 Session 2 Ryan-side steps (after Session 2 ships):**
- Add production Vercel staging URL to Sanity CORS at sanity.io/manage -> Project hwyx6cco -> API -> CORS Origins
- Log in to Studio at [staging-url]/studio; confirm header reads "On Point Installations", 3 existing posts visible, no console errors
- Archive integrepro-seo-lab repo on GitHub (repo is now source-of-truth-free)
- Delete or deactivate sandbox Vercel project (project-wdufc.vercel.app)

**Phase 5 Session 2 deferred (Session 3):**
- Blog template build (Sanity client, GROQ fetch, ArticleSchema render, conditional FAQPage render) -- migration script is hardened and ready; template must exist before 22-post run
- 25-post production migration run (22 remaining after 3 Phase 4 samples; hardened script ready)
- Sanity webhook + on-demand revalidation route (replaces time-based ISR)
- Asset audit of sandbox image references (logs/*.err files)
- ArticleSchema fix (publisher @id to /#business; lands with template build for proper render testing)

**Phase 5 Session 3 delivered (3 code commits + 1 secret rotation, 2026-05-19):**
- `200991b` -- Feat: blog index and post template with Sanity GROQ fetch (src/lib/sanity-image.ts helper; /blog/ index with 1h ISR; /blog/[slug]/ with generateStaticParams, generateMetadata, PortableText body, conditional FAQAccordion, 24h ISR; all tagged 'blog' for on-demand invalidation; all 3 Phase 4 slugs pre-rendered)
- `dca728c` -- Feat: ArticleSchema author/publisher chain and blog post schema wiring (buildArticleSchema publisher @type Organization->ProfessionalService, @id /#organization->/#business; ArticleSchema + conditional FAQSchema wired into blog post template)
- `5639984` -- Feat: on-demand revalidation API route for Sanity webhook (POST /api/revalidate; HMAC-SHA256 signature validation via Node crypto; revalidateTag('blog','default') + revalidatePath on blogPost events; 401/400/500 error handling)
- SANITY_REVALIDATE_SECRET rotated (prior value was visible in chat history; new value in .env.local; Vercel env var update is Ryan-side step)

**Phase 5 Session 3 findings:**
- All 3 Phase 4 posts confirmed status:published before template build
- publishedAt is null on all 3 existing posts (pre-hardening migration; not re-migrated). Template falls back to _createdAt for display date and schema datePublished. Session 4 migration run will populate publishedAt on new posts
- featuredImage is null on all 3 existing posts. Hero image section renders conditionally; no gap. Images populate when Brian adds them via Studio or Session 4 migration supplies them
- Next.js 16 changed revalidateTag to require a second profile argument; using 'default'
- Breadcrumb UI component already embeds BreadcrumbSchema -- blog post template does not separately render BreadcrumbSchema

**Phase 5 Session 3 Ryan-side steps (before Session 4):**
- Update Vercel env var SANITY_REVALIDATE_SECRET with new value from .env.local (old value rotated)
- Configure Sanity webhook at sanity.io/manage -> project hwyx6cco -> API -> Webhooks (details below)
- Verify Vercel deploy of Session 3 commits before Session 4 migration run

**Sanity webhook configuration (Ryan-side, post-deploy):**
1. sanity.io/manage -> project hwyx6cco -> API -> Webhooks -> Create webhook
2. URL: https://on-point-installations.vercel.app/api/revalidate
3. Trigger on: Create, Update, Delete
4. Filter: _type == "blogPost"
5. Secret: value of SANITY_REVALIDATE_SECRET from .env.local (same value you added to Vercel)
6. HTTP method: POST
7. Save
Verification: after deploy, edit a post title in Studio, publish, wait ~10s, refresh /blog/ -- new title should appear immediately.

**Phase 5 Session 3 deferred (Session 4):**
- 22-post production migration run (hardened script ready; template and revalidation route now in place; asset audit of logs/*.err before run)
- Asset audit of Phase 4 sandbox log files (logs/*.err -- image src inventory before migration)
- Lightweight post-migration audit (spot-check 5-6 posts in Studio and on /blog/)
- Rich Results Test validation: run on /blog/how-to-find-a-chicago-corporate-installation-expert (3 FAQs -- tests Article + FAQPage + BreadcrumbList); run on homepage, primary service page, /about/
- Core Web Vitals pass (Lighthouse on homepage and primary money page)
- Redirect verification pass (key old WordPress URLs -> new routes)
- featuredImage alt text schema gap: blogPost schema needs an alt field when Brian's photo set ships; all posts get alt text retrofitted at that time (flagged in known-issues.md)

**Phase 5 Session 4 -- 2026-05-20 -- Final commit c3a5270**

**Lanes completed:**
- Lane 1: Removed visible dates from blog UI per live-site parity (commit 952aafd)
- Lane 2: Blog asset audit -- 25 posts inventoried, 9 Pexels CC0, 2 with resize variants, 0 fetch errors (commit 0737491)
- Lane 3: 22-post migration completed (initial 22 beyond Phase 4's 3); 3 Phase 4 posts re-migrated for consistency; 25 posts total in Sanity with publishedAt, category, and internal links substituted
- Lane 4: Migration script hardening -- User-Agent header on WP fetch resolved 403 bot protection (commit bfe632c); /review/ -> /reviews/ substitution added (commit c3a5270)

**Validations completed:**
- Lighthouse on /blog/ and post page (mobile, incognito): 100 Performance / 96 Accessibility / 100 Best Practices / 100 SEO
- Redirect verification: 24 entries in next.config.ts, all rendering as 308 (Next.js `permanent: true` default; functionally equivalent to 301 for SEO; spec said 301, on-wire is 308, no spec-additions entry needed)
- Webhook revalidation: confirmed in Session 3, no Session 4 regression

**Validations pending (Ryan-side):**
- Rich Results Test on FAQ post and non-FAQ post
- Vercel env var: SANITY_API_WRITE_TOKEN sync from local

**Carry-forward to Session 5:**
- metaDescription overruns: 6 posts exceed 155 chars (manual Studio edits)
- Featured image migration: 9 Pexels posts pending; alt field schema addition is a prerequisite; resize variant parser extension needed for 2 posts
- Alt text retrofit per CLAUDE.md image rules
- Add alt field to blogPost Sanity schema (confirmed missing -- featuredImage has only hotspot configured)
- FAQ content strategy: 24 of 25 migrated posts have no FAQs in WP source; 3 Studio-authored FAQs were cleared during re-migration of how-to-find-a-chicago-corporate-installation-expert; schema works but renders nothing -- content decision deferred to Session 5

**Phase 5 Session 5 -- 2026-05-20 -- Final commit 330c426**

**Lanes completed:**
- Lane 1: Added featuredImage.alt sub-field to blogPost Sanity schema; .warning() validation (non-blocking during migration window) (commit 15c7c17)
- Lane 2: Skipped -- content-only; Ryan handles in Sanity Studio directly
- Lane 3: Extended migration script with featured image pipeline -- fetchFeaturedImageMeta (two WP REST calls), deriveOriginalUrl (resize variant parser), isQualityAlt (tier-1 quality gate), deriveAlt (three-tier fallback with tier-2 cleanup pass), uploadFeaturedImage (Sanity CDN asset upload, idempotent via SHA-1 dedup) (commits d0fff53, 0844178)
- Template: Blog post template updated -- GROQ projects featuredImage { asset, alt }, interface typed with _type: 'reference' literal, Image alt prop consumes featuredImage.alt with post.title fallback (commit 330c426)

**Full 25-post re-migration:** 25 passed, 0 failed. All posts have featuredImage and alt set in Sanity.

**Alt-tier distribution:**
- tier=wp (WP alt_text accepted by quality gate): 5 posts
- tier=filename (wp rejected, filename derivation used): 9 posts
- tier=title (wp rejected, post title used): 11 posts

**Validations completed:**
- Dry-run on 2 posts before full run (modular-furniture-designs, different-types-of-window-treatments)
- Quality gate verified: tier-1 rejected on both test posts; tier-2 used
- Full 25-post run: 25 passed, 0 failed

**Carry-forward:**
- FAQ strategy unchanged: FAQPage schema infrastructure dormant; Brian authors in Studio post-launch
- Alt text Brian review: 7 posts have meaningless alt values (filter gaps + Pexels photographer names + hash filenames); listed in known-issues.md
- Two isQualityAlt filter gaps identified: "img 5074 resized" and "onpointinstallations1" passed tier 1 incorrectly; both listed in known-issues.md for Brian's manual Studio fix

---

## CRAWL TECHNICAL SUMMARY (Site-Wide Signals)

| Signal | Finding |
|--------|---------|
| WordPress Theme | `onpoint-installations` (child theme) / `optik-theme-6` (parent) |
| Active Plugins (visible) | icon-block, gallery-block-lightbox, honeypot, optik-posts, termageddon-usercentrics, wp-armour-extended |
| Hosting / CDN | Cloudflare (confirmed via beacon script + HTML signals) |
| SSL Certificate | ACTIVE — HTTPS confirmed on all pages |
| robots.txt | Disallow: /wp-admin/ / Allow: /wp-admin/admin-ajax.php / Sitemap: https://onpointinstallations.com/sitemaps.xml |
| Sitemap URL | https://onpointinstallations.com/sitemaps.xml (index with 7 child sitemaps) |
| Google Analytics | GA4 — Property ID: G-1GSQDRFR9D (gtag.js firing via GTM-less direct install) |
| Google Tag Manager | NOT PRESENT — GA4 installed directly via gtag.js |
| Third-Party Scripts | Usercentrics (cookie consent / GDPR), Cloudflare Insights beacon |
| Chat Widget | NONE |
| Review Widget | NONE |
| Facebook Pixel | NOT PRESENT |
| Schema on Homepage | WebSite, Organization, LocalBusiness (all present — name typo corrected per audit) |
| Schema on Service Pages | NONE — missing across all service, project, and blog pages |
| OG / Social Tags | Present (via theme) |
| Mobile Rendering | GOOD (responsive theme confirmed) |
| Page Speed Impression | MODERATE (Cloudflare CDN helps; WordPress/plugin overhead noted) |

---

## 1. SITE INVENTORY

> **Action Legend:** KEEP-AS-IS | REWRITE | REDIRECT-AND-DELETE | MERGE | NEW-BUILD

### Core Pages

| URL | Page Type | Current Title | Current H1 | Meta Desc? | Word Count | Schema? | Action |
|-----|-----------|--------------|------------|-----------|-----------|---------|--------|
| `/` | Homepage | Non-Union Commercial Installations \| Chicago & Tri-State Area \| On Point Installations, Inc. | On Point Installations | YES | ~419 | YES (WebSite, Org, LocalBusiness) | REWRITE |
| `/about/` | About | About Us \| Brian Vetter \| Chicago, IL \| On Point Installations, Inc. | About Us | YES | ~755 | NONE | REWRITE |
| `/contact/` | Contact | Contact Us \| Chicagoland & Midwest \| On Point Installations, Inc. | How to Find Us | YES | ~117 | NONE | REWRITE |
| `/reviews/` | Reviews | See Our Reviews & Testimonials \| On Point Installations, Inc. | Reviews | YES | ~92 | NONE | REWRITE |
| `/project-gallery/` | Gallery | Installation Project Gallery \| Chicago Metro \| On Point Installations, Inc. | Project Gallery | YES | ~156 | NONE | REWRITE |
| `/services/` | Services Hub | Services \| On Point Installations, Inc. | Services | ⚠️ "test" — PLACEHOLDER | ~258 | NONE | REWRITE |
| `/blog/` | Blog Index | Read Blogs & See Our Projects \| On Point Installations, Inc. | Blog | YES | ~456 | NONE | REWRITE |
| `/site-credits/` | Other | Web Design Site Credits - CyberOptik | Site Credits | YES | ~121 | NONE | REDIRECT-AND-DELETE → /about/ |
| `/privacy-policy/` | Legal | Privacy Policy \| Wauconda; IL \| On Point Installations, Inc. | Privacy Policy | YES | ~85 | NONE | KEEP-AS-IS |
| `/terms-of-service/` | Legal | Terms of Service \| On Point Installations, Inc. | Terms of Service | YES (placeholder text) | ~84 | NONE | KEEP-AS-IS |
| `/disclaimer/` | Legal | Disclaimer \| On Point Installations, Inc. | Disclaimer | YES (placeholder text) | ~82 | NONE | KEEP-AS-IS |
| `/cookie-policy/` | Legal | Cookie Policy \| On Point Installations, Inc. | Cookie Policy | MISSING | ~83 | NONE | KEEP-AS-IS |

### Existing Service Pages

| URL | Page Type | Current Title | Current H1 | Meta Desc? | Word Count | Action |
|-----|-----------|--------------|------------|-----------|-----------|--------|
| `/services/commercial-office-furniture-installation-chicago-il/` | Service | Commercial Office Furniture Installation \| Chicago, IL \| On Point Installations, Inc. | Office Installations | YES | ~885 | REWRITE — new slug: /services/commercial-furniture-installation-chicago-il/ |
| `/services/company-office-relocation-chicago-il/` | Service | Company Office Relocations \| Chicago Tristate Area \| On Point Installations, Inc. | Office Relocation Services | YES | ~224 | REWRITE — THIN, needs 800+ words, new slug: /services/office-relocation-chicago-il/ |
| `/services/commercial-office-furniture-storage-chicago-il/` | Service | Commercial Office Furniture Warehousing Services \| Chicago Area \| On Point Installations, Inc. | Warehousing Services | YES | ~385 | REWRITE |
| `/services/space-planning/` | Service | Office Space Planning \| Chicago, IL \| On Point Installations, Inc. | Space Planning | YES | ~148 | REWRITE — THIN, needs 800+ words, new slug: /services/commercial-space-planning-chicago-il/ |
| `/services/artwork-installation/` | Service | Artwork Installations \| Chicago, IL \| On Point Installations, Inc. | Artwork Installation | YES | ~324 | REWRITE |
| `/services/window-treatment-installations/` | Service | Office Window Treatment Installation \| On Point Installations, Inc. | Window Treatment Installations | YES | ~374 | REWRITE |
| `/services/cubicle-wall-and-upholstery-cleaning/` | Service | Cubicle Wall and Upholstery Cleaning Service \| On Point Installations, Inc. | On Point Deep Cleaning | YES | ~734 | REWRITE |
| `/services/electrical-voice-and-data-cabling-for-your-commercial-installation/` | Service | High- and Low-Voltage Installs \| On Point Installations, Inc. | Electrical & Voice/Data Cabling | YES | ~572 | KEEP-AS-IS — migrate to new URL structure |

### Existing Project Pages

| URL | Current Title | Word Count | Action |
|-----|--------------|-----------|--------|
| `/project/complete-office-system-installation-downers-grove-il/` | Complete Office System Installation - Downers Grove, IL | ~880 | KEEP-AS-IS — rewrite meta |
| `/project/ais-divi-office-furniture-installation-addison-il/` | AIS Divi Office Furniture Installation - Addison, IL | ~245 | THIN — expand |
| `/project/haworth-intuity-modular-installation-chicago-il/` | Haworth Intuity Modular Installation - Chicago, IL | ~608 | KEEP-AS-IS |
| `/project/acoustic-ceiling-panels-design-installation-chicago-il/` | Acoustic Ceiling Panels & Design Installation – Chicago, IL | ~580 | KEEP-AS-IS |
| `/project/ki-unite-corporate-office-installation-warrenville-il/` | KI Unite Corporate Office Installation - Warrenville, IL | ~657 | KEEP-AS-IS |
| `/project/knoll-office-system-installations-northfield-il/` | Knoll Dividend Office System Installations | ~474 | KEEP-AS-IS |
| `/project/furniture-assembly-for-a-design-studio-senior-living-community-oak-brook-il/` | Furniture Assembly for a Design Studio – Senior Living Community, Oak Brook, IL | ~967 | KEEP-AS-IS |
| `/project/modular-installation-services-park-ridge-il/` | Modular Installation Services - Park Ridge, IL | ~577 | KEEP-AS-IS |
| `/project/the-benefits-of-a-professional-restaurant-furniture-installation/` | Professional Restaurant Furniture Installation - Chicago Suburbs | ~881 | KEEP-AS-IS |

### Existing Blog Posts (25 total)

Migrate all at existing slugs. Apply FAQPage + Article schema to each. Add internal links to relevant service pages on each post.

### Pages to Create (New Build)

**Service Pages:**
- `/services/commercial-furniture-installation-chicago-il/` — replaces old /commercial-office-furniture-installation-chicago-il/
- `/services/cubicle-installation-chicago-il/`
- `/services/office-relocation-chicago-il/` — replaces old /company-office-relocation-chicago-il/
- `/services/systems-furniture-installation-chicago-il/`
- `/services/office-furniture-delivery-setup-chicago-il/`
- `/services/commercial-space-planning-chicago-il/` — replaces old /space-planning/

**City + Service Pages:**
- `/services/commercial-furniture-installation-schaumburg-il/`
- `/services/cubicle-installation-schaumburg-il/`
- `/services/commercial-furniture-installation-naperville-il/`
- `/services/commercial-furniture-installation-waukegan-il/`
- `/services/commercial-furniture-installation-wauconda-il/`

**Service Area Hub Pages:**
- `/service-area/chicagoland-commercial-furniture-installation/`
- `/service-area/chicago-il/`
- `/service-area/schaumburg-il/`
- `/service-area/naperville-il/`
- `/service-area/waukegan-il/`
- `/service-area/wauconda-il/`

**New Blog Posts (20 — full briefs in Prompt 16 report):**
- `/blog/office-furniture-installation-cost-chicago/`
- `/blog/what-does-commercial-furniture-installation-include/`
- `/blog/how-long-does-office-furniture-installation-take/`
- `/blog/what-to-look-for-chicagoland-furniture-installer/`
- `/blog/find-office-furniture-installers-near-me/`
- `/blog/large-commercial-furniture-installation-projects/`
- `/blog/hire-furniture-installer-vs-diy/`
- `/blog/union-vs-non-union-furniture-installation/`
- `/blog/how-to-choose-office-furniture-installation-company/`
- `/blog/questions-to-ask-office-furniture-installer/`
- `/blog/is-it-worth-hiring-commercial-furniture-installer/`
- `/blog/furniture-dealer-vs-installer-difference/`
- `/blog/how-do-furniture-installation-companies-charge/`
- `/blog/what-is-systems-furniture/`
- `/blog/why-open-office-feels-chaotic/`
- `/blog/what-causes-poor-office-acoustics/`
- `/blog/why-is-office-furniture-hard-to-reconfigure/`
- `/blog/what-to-do-when-office-furniture-doesnt-fit/`
- `/blog/what-is-cubicle-installation/`
- `/blog/why-hire-professional-furniture-installer/`

---

## 2. TECHNICAL REQUIREMENTS

**Framework:** React with Next.js (v14+ App Router)

**Rendering Strategy:**
- SSG via `generateStaticParams` for all service pages, city pages, and static content
- ISR with 24-hour revalidation for blog index and individual blog posts
- SSR reserved for contact form confirmation page only

**Hosting:** Vercel (primary) — native Next.js optimization, automatic CDN, zero-config SSL, preview deployments per branch, built-in Core Web Vitals monitoring. Netlify is an acceptable alternative.

**CMS:** Sanity.io (headless) for all blog content. Sanity provides a hosted Studio UI Brian or an agent can access without touching code. Blog posts authored in Sanity, fetched at build time via GROQ queries with ISR revalidation. Service pages and static content managed in code/MDX.

**Analytics:**
- Migrate existing GA4 property **G-1GSQDRFR9D** to Google Tag Manager container
- Install GTM snippet via `next/script` with `afterInteractive` strategy
- Configure GA4 conversion events: form_submit, phone_click, CTA_click
- Note: current site has GA4 without GTM — new build standardizes on GTM for flexibility

**Search Console:** Verify new site with existing GSC property. Submit new sitemap at `/sitemap.xml` after DNS cutover.

**Sitemap:** Auto-generated via `next-sitemap`. Configure `changefreq` and `priority` per page type. XML index with child sitemaps for pages, services, blog, and projects.

**Robots.txt:**
```
User-agent: *
Disallow: /api/
Allow: /
Sitemap: https://onpointinstallations.com/sitemap.xml
```

**SSL:** Handled automatically by Vercel/Netlify.

**Image Optimization:** Next.js `<Image>` component throughout. Configure `formats: ['image/webp', 'image/avif']` in next.config.js. Use `priority` prop on above-the-fold hero images only. Project gallery images to be migrated to Vercel Blob Storage or Cloudinary.

**Cookie Consent:** Replace Usercentrics with lightweight Next.js-compatible solution (CookieYes or `next-cookie-consent`). Retain GDPR/CCPA compliance.

**Core Web Vitals Targets:**
- LCP < 2.5s
- INP < 100ms
- CLS < 0.1

---

## 3. PAGE ARCHITECTURE

```
/ (Homepage)
/about/
/contact/
/reviews/
/project-gallery/
/services/
  /commercial-furniture-installation-chicago-il/
  /cubicle-installation-chicago-il/
  /office-relocation-chicago-il/
  /systems-furniture-installation-chicago-il/
  /office-furniture-delivery-setup-chicago-il/
  /commercial-space-planning-chicago-il/
  /commercial-office-furniture-storage-chicago-il/
  /artwork-installation/
  /window-treatment-installations/
  /cubicle-wall-and-upholstery-cleaning/
  /electrical-voice-and-data-cabling-for-your-commercial-installation/
/service-area/
  /chicagoland-commercial-furniture-installation/
  /chicago-il/
  /schaumburg-il/
  /naperville-il/
  /waukegan-il/
  /wauconda-il/
/blog/
  [20 new briefs — see Prompt 16 report]
  [26 existing posts — migrated at existing slugs]
/project/
  [9 existing project pages — existing slugs preserved]
/privacy-policy/
/terms-of-service/
/disclaimer/
/cookie-policy/
```

---

## 4. SEO CONFIGURATION

### Homepage — `/`

| Field | Value |
|-------|-------|
| Title Tag | `Office Furniture Installer Chicago IL \| On Point Installations` |
| Meta Description | `On Point Installations is Chicago's trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.` |
| H1 | `Commercial Office Furniture Installer in Chicago, IL` |
| Canonical | `https://onpointinstallations.com/` |
| Schema | LocalBusiness (ProfessionalService), Organization, WebSite + SearchAction |
| Target Keywords | office furniture installer Chicago IL, commercial furniture installation Chicago |
| Internal Links | → /services/ → /services/commercial-furniture-installation-chicago-il/ → /services/cubicle-installation-chicago-il/ → /project-gallery/ → /reviews/ → /contact/ |

### `/about/`

| Field | Value |
|-------|-------|
| Title Tag | `About On Point Installations \| Commercial Furniture Installers \| Wauconda, IL` |
| Meta Description | `Brian Vetter founded On Point Installations in 2010. Learn about our team, our non-union advantage, and why Chicago businesses trust us for commercial furniture installation.` |
| H1 | `About On Point Installations` |
| Schema | Person (Brian Vetter), BreadcrumbList |

### `/contact/`

| Field | Value |
|-------|-------|
| Title Tag | `Contact On Point Installations \| Chicago Commercial Furniture Installer` |
| Meta Description | `Get a quote for commercial furniture installation in the Chicago metro area. Call (847) 550-4042 or fill out our contact form. On Point Installations — Wauconda, IL.` |
| H1 | `Contact On Point Installations` |
| Schema | BreadcrumbList |

### `/reviews/`

| Field | Value |
|-------|-------|
| Title Tag | `Reviews \| On Point Installations \| Chicago Commercial Furniture Installers` |
| Meta Description | `See what clients say about On Point Installations. 5.0★ Google rating. Expert commercial furniture installation across Chicagoland since 2010.` |
| H1 | `Client Reviews & Testimonials` |
| Schema | BreadcrumbList |

### `/services/commercial-furniture-installation-chicago-il/`

| Field | Value |
|-------|-------|
| Title Tag | `Commercial Furniture Installation Chicago \| On Point Installations` |
| Meta Description | `Professional commercial furniture installation in Chicago, IL. Office systems, cubicles, systems furniture & more. Non-union. Serving Chicagoland since 2010. Call (847) 550-4042.` |
| H1 | `Commercial Furniture Installation in Chicago, IL` |
| Schema | Service, FAQPage, BreadcrumbList |
| Target Keywords | commercial furniture installation Chicago, office furniture installation Chicago IL |

### `/services/office-relocation-chicago-il/`

| Field | Value |
|-------|-------|
| Title Tag | `Office Relocation Services Chicago \| On Point Installations` |
| Meta Description | `Commercial office relocation in Chicago, IL. Teardown, transport, reinstallation, electrical disconnect/reconnect. Trusted since 2010. Call (847) 550-4042.` |
| H1 | `Office Relocation Services in Chicago, IL` |
| Schema | Service, FAQPage, BreadcrumbList |

### `/services/cubicle-installation-chicago-il/`

| Field | Value |
|-------|-------|
| Title Tag | `Cubicle Installation Chicago \| On Point Installations` |
| Meta Description | `Expert cubicle installation in Chicago, IL. New installs, reconfigurations, and teardowns for offices of all sizes. Non-union. Call (847) 550-4042.` |
| H1 | `Cubicle Installation in Chicago, IL` |
| Schema | Service, FAQPage, BreadcrumbList |

### City Service Pages — Pattern

| Page | Title Tag | H1 | Target Keyword |
|------|-----------|-----|---------------|
| `/services/commercial-furniture-installation-schaumburg-il/` | `Commercial Furniture Installation Schaumburg IL \| On Point Installations` | `Commercial Furniture Installation in Schaumburg, IL` | commercial furniture installation Schaumburg IL |
| `/services/cubicle-installation-schaumburg-il/` | `Cubicle Installation Schaumburg IL \| On Point Installations` | `Cubicle Installation in Schaumburg, IL` | cubicle installation Schaumburg |
| `/services/commercial-furniture-installation-naperville-il/` | `Commercial Furniture Installation Naperville IL \| On Point Installations` | `Commercial Furniture Installation in Naperville, IL` | commercial furniture installation Naperville IL |
| `/services/commercial-furniture-installation-waukegan-il/` | `Commercial Furniture Installation Waukegan IL \| On Point Installations` | `Commercial Furniture Installation in Waukegan, IL` | commercial furniture installation Waukegan IL |
| `/services/commercial-furniture-installation-wauconda-il/` | `Commercial Furniture Installation Wauconda IL \| On Point Installations` | `Commercial Furniture Installation in Wauconda, IL` | commercial furniture installation Wauconda IL |

All city pages: Schema = Service + BreadcrumbList
Meta description pattern: `Professional commercial furniture installation in [City], IL. On Point Installations serves [City] and surrounding areas. Non-union team. Call (847) 550-4042.`

### Blog Posts

All 20 new blog posts implement:
- Title tag, meta description, and H1 per Prompt 16 briefs
- Schema: Article + FAQPage + BreadcrumbList
- 2–3 internal links per post to relevant service pages
- OG image: featured image (1200×630 WebP)

---

## 5. REDIRECT MAP

Configure all as 301 Permanent in `next.config.js` `redirects()` array.

| Old URL | New URL | Reason |
|---------|---------|--------|
| `/commercial-office-furniture-installation-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/` | Namespace + slug update |
| `/services/commercial-office-furniture-installation-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/` | Slug cleanup |
| `/artwork-installation/` | `/services/artwork-installation/` | Move to /services/ namespace |
| `/window-treatment-installations/` | `/services/window-treatment-installations/` | Move to /services/ namespace |
| `/company-office-relocation-chicago-il/` | `/services/office-relocation-chicago-il/` | Namespace + slug update |
| `/services/company-office-relocation-chicago-il/` | `/services/office-relocation-chicago-il/` | Slug update |
| `/commercial-office-furniture-storage-chicago-il/` | `/services/commercial-office-furniture-storage-chicago-il/` | Move to /services/ namespace |
| `/about-us-chicago-il/` | `/about/` | Consolidate |
| `/contact-us/` | `/contact/` | Consolidate |
| `/modular-furniture-designs/` | `/blog/modular-furniture-designs/` | Move to /blog/ namespace |
| `/space-planning/` | `/services/commercial-space-planning-chicago-il/` | Namespace + slug update |
| `/services/space-planning/` | `/services/commercial-space-planning-chicago-il/` | Slug update |
| `/the-differences-between-high-and-low-voltage-electricity/` | `/blog/the-differences-between-high-and-low-voltage-electricity/` | Move to /blog/ namespace |
| `/how-to-find-the-right-team-for-your-office-furniture-installation-project/` | `/blog/how-to-find-the-right-team-for-your-office-furniture-installation-project/` | Move to /blog/ namespace |
| `/site-credits/` | `/about/` | Remove CyberOptik SEO credit |

---

## 6. CONTENT REQUIREMENTS

| Page | Status | Word Count Target | Key Sections | CTA Placement |
|------|--------|------------------|-------------|---------------|
| Homepage | REWRITE | 600–800 | Hero, Services overview, Why OPI, Reviews snippet, Service cities, CTA | Hero + mid-page + footer |
| /about/ | REWRITE | 600–800 | Brian's story, Team, Non-union advantage, By the numbers (15yr / 11K projects / 5.0★) | Bottom |
| /contact/ | REWRITE | 200–300 | Contact form, Phone, Address, Hours, Map embed | Form is the CTA |
| /reviews/ | REWRITE | 300–500 | 5-star header, Embedded Google reviews or manual quotes, Star rating display | Bottom → /contact/ |
| Primary service pages | REWRITE | 700–1,000 | Intro, What we do, Service scope, Why OPI, City coverage, FAQ (5 Q&As), CTA | Mid-page + bottom |
| City service pages | NEW-BUILD | 600–800 | City-specific intro, Service scope, Why OPI in this city, FAQ, CTA | Mid-page + bottom |
| New blog posts | NEW-BUILD | Per Prompt 16 brief | Per Prompt 16 brief | Per Prompt 16 brief |
| Existing blog posts | MIGRATE | Existing | Add internal links, add FAQ schema | Add CTA to each |
| Project pages | MIGRATE | Existing (expand thin ones) | Project details, before/after photos, service type, city | Add → /contact/ CTA |

---

## 7. SCHEMA IMPLEMENTATION PLAN

All schema implemented via Next.js `<Script>` component with `type="application/ld+json"` in page `<head>`. Use the complete JSON-LD blocks from Prompt 17 Section 3 for the homepage schemas. Service page schemas follow the Service + FAQPage pattern from Prompt 17.

| Schema Type | Pages | Source |
|------------|-------|--------|
| LocalBusiness (ProfessionalService) | Homepage | Prompt 17 — Schema 1 (complete block) |
| Organization | Homepage | Prompt 17 — Schema 2 |
| WebSite + SearchAction | Homepage | Prompt 17 — Schema 3 |
| Service | All service and city pages | Prompt 17 — Schema 4 pattern |
| FAQPage | All service pages + new blog posts | Prompt 17 — Schema 5 pattern |
| BreadcrumbList | All non-homepage pages | Prompt 17 — Schema 6 pattern |
| Person (Brian Vetter) | /about/ | Prompt 17 — Schema 7 |
| Article | All blog posts | Standard Article schema |

**After Wikidata entity is created:** Add Q-URL to sameAs arrays in Schemas 1 and 2.

---

## 8. COMPONENT REQUIREMENTS

| Component | Variants | Notes |
|-----------|---------|-------|
| Navigation | Desktop + Mobile hamburger | Sticky on scroll; phone number always visible |
| Hero | Homepage / Service page / City page | Homepage hero has review count + star rating |
| ServiceCard | Grid card + List item | Used on homepage + /services/ hub |
| CityServiceCard | Grid card | Used on service area hub page |
| ProjectCard | Gallery card with lightbox | Used on /project-gallery/ |
| BlogPostCard | Featured + Standard | Featured = large image; Standard = compact |
| ReviewCard | Quote format | Pull from GBP or manual entry |
| FAQAccordion | With FAQPage schema | Used on all service pages |
| Breadcrumb | With BreadcrumbList schema | Used on all non-homepage pages |
| ContactForm | Standard | Fields: Name, Company, Phone, Email, Project details, City; handler: email or CRM |
| CTABlock | Primary / Secondary / Banner | Primary = call button + form link; Banner = full-width strip |
| Footer | Single variant | NAP, service cities, social links, legal links |
| NAP | Inline + Footer | Consistent format: Name, Address, Phone, Hours |
| SchemaInjector | Per-page utility component | Accepts schema object, renders JSON-LD in head |
| ImageGallery | Project gallery | Lightbox with keyboard navigation |

---

## 9. AGENT INTEGRATION POINTS

The new site architecture enables the following AI-assisted workflows:

| Workflow | Trigger | Agent Action | Output |
|---------|---------|-------------|--------|
| Monthly GSC Analysis | 1st of each month | Pull GSC data → compare to targets → flag pages with impression growth but low CTR | Updated meta description recommendations |
| GBP Post Generation | Completed project logged | Agent reads project details → generates Tuesday/Thursday GBP post copy per Prompt 18 calendar | Ready-to-publish GBP post text |
| New City Page Scaffolding | New city added to service area | Agent reads city name + service type → generates page from template with correct schema, title tag, H1, meta | New .mdx file ready for review |
| Blog Content Generation | Brief approved | Agent reads Prompt 16 brief → generates full blog post draft | Draft markdown for human review |
| Schema Validation | Post-deploy or monthly | Agent fetches page → validates schema via Rich Results Test API → flags errors | Schema audit report |
| Citation Monitor | Quarterly | Agent searches key directories → checks NAP consistency → flags mismatches | Citation health report |
| Review Request Trigger | Project marked complete in CRM | Agent generates personalized review request email per Prompt 13 scripts → sends via email handler | Review request sent to client |

**Sanity CMS enables:** Brian or an agent can create/edit blog posts, update project descriptions, and add new reviews without touching code. All content changes trigger ISR revalidation within 24 hours.

---

## 10. MIGRATION CHECKLIST

- [ ] New site built and QA'd on staging URL (e.g., staging.onpointinstallations.com)
- [ ] All 301 redirects configured in next.config.js and tested (verify no chains, no loops)
- [ ] All schema blocks validated via search.google.com/test/rich-results
- [ ] GA4 property G-1GSQDRFR9D migrated to GTM container — confirm events firing in GA4 DebugView
- [ ] Contact form submission conversion event confirmed in GA4
- [ ] GSC verified on new domain/URL structure — confirm ownership
- [ ] New sitemap submitted to GSC at /sitemap.xml
- [ ] GBP website URL confirmed (update only if domain changes)
- [ ] All 14 citation listings audited — confirm they point to new URLs if any slugs changed
- [ ] Core Web Vitals passing on mobile (run PageSpeed Insights)
- [ ] OG tags confirmed on all pages (check with Facebook Sharing Debugger)
- [ ] Wikidata entity created and Q-URL added to LocalBusiness sameAs array
- [ ] CyberOptik /site-credits/ redirect confirmed live → /about/
- [ ] DNS cutover executed — confirm HTTPS active on new host
- [ ] Old WordPress site preserved as backup for minimum 90 days
- [ ] Post-launch GSC monitoring begins — watch for crawl errors, coverage drops, redirect issues
- [ ] First Prompt 19 monthly report scheduled for 30 days post-launch

---

## 11. OPEN QUESTIONS FOR BRIAN

- [ ] Does he want to keep existing project gallery photos? Where are they currently hosted?
- [ ] Is there a brand style guide (exact hex colors, typography, logo files in SVG/PNG)?
- [ ] The CyberOptik site credits link — confirmed to redirect to /about/ (no barter agreement in place)?
- [ ] Are there any pages or services not listed here that he wants to add?
- [x] Preferred contact form handler — **Postmark** (confirmed Phase 4). Email-only for now; CRM integration deferred to a later phase if Brian decides to pursue it.
- [ ] Does he want a Gravatar profile created for Brian Vetter for WordPress authorship? (Can port to Sanity author profile in new build)
- [ ] Confirm: the electrical/voice/data cabling service page — keep or remove from new site?
- [ ] Does Brian own the GBP or is it still under another account? (Confirm full ownership transfer before DNS cutover)
- [ ] GTM — create new container or was one ever created previously?
- [ ] Timeline preference — phased launch (core pages first) or full site launch?

---

## BUSINESS CONTEXT (Reference)

```
Business Name:    On Point Installations, Inc.
Address:          1220 Karl Ct, Wauconda, IL 60084
Phone:            (847) 550-4042
Website:          https://onpointinstallations.com
Owner:            Brian Vetter
Founded:          2010
Primary Service:  Commercial furniture installation
Service Area:     Chicagoland + Tri-State (IL, WI, IN)
GBP:              5.0★ / 25 reviews / claimed / Knowledge Panel confirmed
Domain Rating:    3.6 (Ahrefs)
Map Pack:         #2 for "commercial furniture installation Chicago" (Apr 2026)
GA4 Property:     G-1GSQDRFR9D (direct gtag install — migrate to GTM)
GSC Baseline:     174 clicks / 18,400 impressions / 0.9% CTR / pos. 22.9 (Jan–Apr 2026)
```

---

*This document is the master specification for the React rebuild. All SEO configuration in Sections 4–7 is derived from the IntegrePro Software LLC SEO engagement (Prompts 9–19). Do not modify title tags, meta descriptions, H1s, schema, or redirect targets without referencing the source audit reports.*

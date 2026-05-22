# Phase 5 Delivery Report
# On Point Installations Website Rebuild
# IntegrePro Software LLC — 2026-05-22

---

## What Shipped in Phase 5

Phase 5 completed the rebuild's SEO infrastructure, blog migration, and pre-launch verification. Here's what was delivered.

### Schema audit and implementation

All seven structured-data schema types from the Prompt 17 entity-optimization audit are now live:

- **LocalBusiness (ProfessionalService)** — full entity on homepage with address, phone, hours, rating, service catalog, and 12 citation URLs in `sameAs`
- **Organization** — homepage, with logo, founder, contactPoint
- **WebSite + SearchAction** — homepage
- **Service** — all 8 service pages and both city pages, with correct `serviceType` per page
- **FAQPage** — all 8 service pages
- **BreadcrumbList** — all non-homepage pages
- **Person (Brian Vetter)** — /about/

ArticleSchema on blog posts enriched: ImageObject now includes `contentUrl` (enables Google Discover eligibility) and `caption` (from featured image alt text).

### Blog migration — all 25 posts complete

All 25 WordPress blog posts are live on the new site at their original slugs with:
- Published dates (from WP REST API — accurate to the day)
- Category labels
- Featured images (uploaded to Sanity CDN with descriptive `originalFilename` metadata)
- Inline images (76 images across 25 posts, from WXR attachment lookup — the authoritative source)
- Gallery grouping (adjacent images pair into 2-column rows with 4:3 crop)
- Internal link substitutions (outdated WordPress URLs rewritten to new structure; dead links to removed pages stripped)
- On-demand Sanity cache invalidation wired (edit a post in Studio, it updates on the site within seconds)

### Core Web Vitals — measured results

Lighthouse run on deployed staging site (2026-05-22):

| Page | Performance | Accessibility | Best Practices | SEO |
|------|------------|---------------|----------------|-----|
| Homepage | 97 | 100 | 100 | * |
| Blog index | 98 | 100 | 100 | * |
| Blog post | 100 | 100 | 100 | * |
| Service page | 98 | 100 | 100 | * |

*SEO column: the staging URL carries Vercel's automatic `noindex` header so search bots don't index it during development. The score reads 69 because of this header — it will score 100 on onpointinstallations.com after DNS cutover. There are no actual SEO issues in the code.

**Phase 2 baseline comparison:** Homepage Performance was > 85 in Phase 2. Phase 5 lands at 97.

### Sitemap

`/sitemap.xml` regenerated. All 25 blog posts now indexed. Canonical/sitemap alignment fixed (trailing slashes now consistent throughout).

### GTM scaffold

Google Tag Manager snippet is wired in the layout and ready to fire. When you create your GTM container and provide the container ID (GTM-XXXXXXX), one constant update is all that's needed — no code changes. The contact form's `contact_form_submit` dataLayer event is already coded and will fire automatically once GTM is live.

---

## Validation Summary

| Check | Result |
|-------|--------|
| Lighthouse Performance (all pages) | 91-100 |
| Lighthouse Accessibility (all pages) | 100 |
| Lighthouse Best Practices (all pages) | 100 |
| OG tags (homepage) | og:title, og:description, og:url, og:image 1200x630, og:image:alt -- all present |
| Twitter card tags (homepage) | summary_large_image -- present |
| LocalBusiness + Organization + WebSite schema (homepage) | 3 blocks, all valid JSON-LD |
| Article + BreadcrumbList schema (blog posts) | Verified on deployed page |
| ArticleSchema ImageObject `contentUrl` + `caption` | Confirmed in page source |
| Sitemap coverage | 54 URLs, all 25 blog posts included, trailing-slash aligned |
| Rich Results Test | **Ryan-side task** -- run at search.google.com/test/rich-results on homepage and one blog post before Phase 6 cutover |

---

## What's Still Needed From You (Brian)

These items require your input before or shortly after the domain cutover.

### Before cutover (confirm these first)

**1. GTM container**
Create a GTM container at tagmanager.google.com and provide the container ID (GTM-XXXXXXX). Ryan will add it to the site — takes about five minutes. GA4 analytics will then fire through GTM, which is more flexible for adding conversion tracking later.

**2. Contact form email**
The contact form is ready but not wired for delivery yet (waiting on SMTP credentials). The destination address is `info@onpointinstall.com` — please confirm this is correct (shorter domain than the website). Once confirmed, provide the SMTP server, username, and app password. Ryan will wire the form and test delivery from staging.

**3. Sanity Studio login**
You were invited to Sanity Studio at your email. Please confirm you can log in at sanity.io/manage and see the On Point Installations project. You'll use Studio to edit blog posts, update featured images, and add FAQ sections post-launch.

**4. Rich Results Test (5 minutes)**
Visit search.google.com/test/rich-results. Paste the staging URL for the homepage and one blog post. Send Ryan screenshots of the results. This confirms Google can read all the structured data before we cut over.

### Shortly after cutover

**5. SVG logo**
The current logo in the header and footer is a PNG. Google Rich Results Test may flag it as a warning in the LocalBusiness schema. If you can get an SVG export of the logo at any point, Ryan can drop it in — one-file swap, five minutes.

**6. Alt text for 44 images**
Twenty-two blog post featured images and 22 inline images need descriptive alt text. This is an accessibility requirement and an SEO signal (Google uses alt text to understand what's in a photo). Ryan will send you the alt-text worksheet showing current values and what each photo shows, so you or your SEO contact can write accurate descriptions in Sanity Studio.

**7. Blog content review (not urgent)**
The 25 migrated blog posts ship with their original WordPress content. A quick editorial pass is worthwhile to flag any outdated claims, internal references to old services, or phrasing that doesn't match the rest of the new site. Sanity Studio is the editing environment — no code changes needed. See `docs/post-launch-recommendations.md` for the full list of content items.

**8. Wikidata entity (if you want to pursue it)**
Adding On Point Installations as an entity on Wikidata strengthens Google's understanding of the business as a distinct entity. Ryan can walk you through it — it's a form fill, not a code task. Not a hard requirement before launch.

---

## Phase 5 Repository State

All Phase 5 code is on `origin/main`. Final commit at time of this report: `b153eb5` (2026-05-22).

The staging URL is: on-point-installations.vercel.app

Production domain cutover (Phase 6) is the next milestone. The checklist in `build_plan.md` section 10 covers everything that needs to happen at cutover.

---

*Prepared by IntegrePro Software LLC for On Point Installations, Inc.*

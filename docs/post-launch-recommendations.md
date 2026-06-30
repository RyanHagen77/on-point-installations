# Post-Launch Recommendations — On Point Installations Rebuild

This document captures content and configuration work that is outside the scope of the Phase 5 rebuild but should be addressed after Phase 6 domain cutover. Items here are content and editorial tasks (alt text, link audits, copy refinements) and asset replacements that require Brian's input. The rebuild itself ships complete on its technical scope.

Items should be handled by an SEO consultant or content editor working in Sanity Studio. None requires developer time.

## Content tasks for SEO consultant or content editor

### Alt text for 44 images

A worksheet at `tmp/alt-text-worksheet.xlsx` (delivered separately, gitignored from the repo) contains 44 rows organized in two sections.

Section A — 30 inline images with empty or placeholder alt attributes. These are images embedded inside blog post bodies where the original WordPress source had blank, single-character, or filename-derived alts. Each row includes the post slug, image position, source URL (clickable for visual reference), surrounding paragraph context from the source, and the Sanity Studio location where the alt is edited.

Section B — 22 featured images with filename-derived or title-derived alt fallbacks from the original migration. These are the large hero images at the top of each blog post. Each row shows the current alt value, the source URL, and the Sanity Studio location.

Recommended priority: Section B first (featured images are visible on blog index cards, OG social shares, and structured data), then Section A. Total work: roughly two to three hours for someone familiar with the business writing concise descriptive alts.

### Internal link insertion opportunities

Several blog posts have zero internal links to service pages or related posts. Examples include `how-to-survive-office-downsizing`. Internal cross-linking is an SEO signal (topical authority, crawl path, anchor-text relevance) and a user-experience signal (helps readers find related content).

The migration script preserved existing internal links and rewrote outdated URLs to the new structure. It did not invent new links — link insertion is content-aware editorial work that depends on understanding what each post is about and which service page or other blog post is the most relevant target.

Recommended: review each blog post, identify two to three relevant internal link targets per post, add links in Sanity Studio. The annotation type is `link` on text spans within Portable Text body content.

### External link editorial audit

Body content in several blog posts contains links to third-party sites (e.g., commercialcafe.com and others). Some are legitimate citations to industry sources. Others may be holdover from prior link-building strategies that no longer fit the current site's positioning, or may point to sites that are no longer authoritative.

The migration preserved external links exactly as authored. Editorial review is recommended: for each external link, decide whether to keep (real citation, useful to user), remove (former partner, dead site, competitor, or weak destination), or replace (link to internal page instead). Sanity Studio edits the link annotation on the relevant text span.

### Blog content audit across all 25 migrated posts

After the Phase 5 image migration completed, the 25 blog posts ship with their original WordPress body content preserved (with byline strip, retired-URL link substitutions, dead-link removal, and internal cross-link insertion where text patterns matched). The body copy itself was not re-edited for current voice rules, factual currency, brand-name consistency, or topical relevance to the present service set.

Recommended: review each migrated post against current site positioning and Voice Rules. Items to surface during review include outdated phrasing, claims that no longer apply, internal references to retired services, and any copy that reads as inconsistent with the rest of the rebuilt site. Edits happen in Sanity Studio on the Portable Text body field. Sanity webhook will automatically revalidate ISR on save.

Scope: 25 posts. Estimated effort: roughly four to six hours for someone familiar with the business and the site's positioning.

### Meta description overruns on 6 posts

Six blog posts have meta descriptions exceeding 155 characters. Sanity Studio surfaces this as a warning on the field. Search engines truncate descriptions at roughly this length, so the trailing portion is invisible. Recommended: rewrite to fit, leading with the key message in the first 120 characters.

## Asset replacements requiring Brian's input

### Phone-photo featured images on 10 posts

Ten featured images are at 640px on the longest edge or lower — phone photos taken on job sites. They render acceptably but lack resolution for retina displays and high-quality social sharing. Recommended: Brian provides higher-resolution replacements where available. Specific slugs listed in `docs/seo-audit/blog-asset-audit.md`.

### modular-furniture-designs featured image

The original WordPress source file (`mid-century-modern-modular-office-furniture-hero.jpg` and its variants) was deleted from the WordPress server and cannot be recovered. The rebuild currently uses the existing Sanity featured image from an earlier migration pass.

Recommended: Brian provides a replacement image relevant to the modular furniture content. Any reasonable office-modular-furniture photo at 1600px or higher on the longest edge will work.

### SVG logo

The current logo at `public/images/logo.png` is raster. The Rich Results Test flags this as a LocalBusiness schema image warning — Google prefers SVG for organizational logos. Recommended: Brian provides an SVG export of the On Point Installations logo. One-time replacement.

## Configuration tasks after Phase 6 cutover

### FAQ infrastructure

The Sanity schema and page template support FAQ sections on blog posts via a structured FAQ field. No posts currently populate it. When populated, FAQPage schema renders automatically on the page, which can earn rich snippets in search results.

Recommended: Brian and his SEO consultant identify which posts benefit from FAQ sections (typically informational posts where users have follow-up questions), then author three to five Q&A pairs per chosen post in Sanity Studio.

### Sanity webhook URL update

After the domain cuts over from on-point-installations.vercel.app to onpointinstallations.com, the Sanity webhook URL needs updating. In sanity.io/manage → On Point Installations project → API → Webhooks, edit the existing webhook and change the URL to https://onpointinstallations.com/api/revalidate. One field change. The secret and filter remain unchanged.

## Platform characteristics — document if audited

### Image filenames in page source are content-hashed

Sanity is content-addressed asset storage. Public CDN URLs use the asset's content hash, not the upload filename — a standard architecture across modern headless CMS platforms (Sanity, Contentful, Strapi, Cloudinary). This is consistent industry practice and is not a missed optimization.

The rebuild captures descriptive filename metadata at the Sanity asset document level (the `originalFilename` field, which is visible in Sanity Studio and surfaceable via Sanity API). Image-related SEO signals are carried by alt text, structured data (`ImageObject` schema), surrounding content, image dimensions, and format optimization (WebP/AVIF). Per Google's published guidance, image filenames themselves are a lightweight ranking signal — image search benefits slightly from descriptive filenames, but main web search ranking depends far more on alt text and surrounding context.

If an external SEO audit flags content-hashed image URLs as a deficiency, the response is the above explanation. The architecture is correct for the chosen platform.

## Suggested priority order

1. SEO consultant: 22 featured image alts (highest visibility — appears in blog index cards, social shares, search results)
2. SEO consultant: external link editorial audit (defensive — avoid leaking authority to inappropriate destinations)
3. SEO consultant: 30 inline image alts
4. SEO consultant: blog content audit across all 25 migrated posts
5. SEO consultant: internal link insertion across the 25 blog posts
6. Brian: SVG logo (resolves Google Rich Results Test warning)
7. Brian: modular-furniture-designs replacement image
8. SEO consultant: meta description rewrites on 6 posts
9. Brian and SEO consultant: FAQ section planning and authoring
10. Brian: phone-photo featured image replacements where available

---

## Project gallery content tasks

These items emerged from the Phase 5.5 project gallery migration and apply to the 9 migrated project pages. Most are editorial work in Sanity Studio; a few require Brian to provide replacement assets.

### Restaurant project -- featured image replacement

The current featured image is a stock photo (`pexels-photo-374016.jpeg`, alt "Person Using Laptop Computer") that is unrelated to restaurant furniture installation. Recommended: replace in Sanity Studio with a real restaurant interior or furniture installation photo. Update `featuredImage.alt` to describe the replacement image. The featured image is visible on the gallery index card and as body content block 0 on the detail page.

### Restaurant project -- body voice violations

Two phrases in the restaurant project body copy do not meet voice rules. The H3 heading "Streamlined Installation" uses a banned consultant verb. The phrase "seamlessly help advance your project needs" in the CTA paragraph uses a second banned term. Recommended: rewrite both in Sanity Studio to plain-spoken language per the voice guidelines in CLAUDE.md.

### Restaurant project -- 7 body images with identical alt text

Seven body images on the restaurant project page share the alt text "Professional Restaurant Furniture Installation - Chicago Suburbs". Each image needs a distinct alt that describes its specific content. Recommended: SEO consultant reviews each image using the Sanity Studio deep link in the alt-text worksheet and writes a unique descriptive alt for each.

### Restaurant project -- low-resolution body image thumbnails

Four body images are WordPress 300x225px crop variants at 10-14KB each (`img_1076-300x225-2.jpeg`, `img_1075-300x225-2.jpeg`, `img_1079-300x225-2.jpeg`, `img_1084-300x225-2.jpeg`). No higher-resolution originals were available in the WXR export. Recommended: Brian provides higher-resolution originals from job-site storage if available and replaces them in Sanity Studio.

### Complete-Office-System-Downers-Grove -- featured image alt error

The featured image alt reads "Complete Office System Installation Downers - Grove, IL". The space-hyphen-space between "Downers" and "Grove" is a formatting error carried from migration. The correct place name is "Downers Grove". Recommended: fix in Sanity Studio to "Complete Office System Installation in Downers Grove, IL" or a fully descriptive alt.

### Senior-Living-Oak-Brook -- featured image source quality

The featured image was sourced from a WordPress camera-default filename crop (`img_7998-1024x768-1.jpg`). If Brian has a higher-resolution original from job-site storage, replace in Sanity Studio with an asset at 1600px or larger on the longest edge. Update alt text to describe the replacement.

### Senior-Living-Oak-Brook -- featured and body image reuse

The same image (`img_7998-1024x768-1.jpg`) appears as both the featured image and as a body content image on this project page. Review whether the duplication is intentional. If the body instance is redundant, remove it in Sanity Studio using the body Portable Text editor.

### Modular-Installation-Park-Ridge -- duplicate-asset body blocks

Two body image blocks on this page reference the same Sanity asset. `modular-installation-services-27-workstations-1.jpg` (WP ID 18189) and `modular-installation-services-27-workstations-1-1.jpg` (WP ID 18205) were two distinct WordPress attachments at identical file sizes (58,006 bytes). Sanity content-hash deduplication merged them to one asset referenced from two body blocks. Both blocks render the same image. Recommended: review in Sanity Studio and remove the redundant body block if it does not contribute distinct visual information.

### All 9 projects -- excerpt editorial review before publishing

Current excerpts were derived from the first body paragraph during migration and read variably in quality. The restaurant project excerpt in particular reads as a generic preamble rather than a project summary. Recommended: review and rewrite all 9 excerpts in Sanity Studio before flipping project status from "draft" to "published". Excerpts appear on the gallery index card and in search result snippets.

### All 9 projects -- post-launch content and visual review

After the gallery goes live, a full review pass is recommended covering: image quality and visual relevance on each page, alt text quality (the alt-text worksheet covers this), and whether the detail page visual opening meets Brian's expectations. The current implementation has no hero image on project detail pages (removed in Session 4 per supervisor decision). If Brian wants a visual opening, this is Phase 6 enhancement work -- options are documented in `docs/design-decisions.md`.

### Project and blog H1 styling parity check

Project detail pages use `text-3xl sm:text-4xl font-bold text-[#800000]` for the H1. Confirm this matches the blog post H1 styling. If a delta exists, resolve in a single CSS pass across both templates. Consistent heading sizing across content types reads as a more cohesive site.

---

## Session 7 - Post-Launch Backlog

Items deferred to post-launch per Session 7 decisions.

### City service page tier (build this month per Prompt 11)

Twelve pages remain to build, matching the Schaumburg/Naperville/Wauconda CFI plus Cubicle Chicago plus Cubicle Schaumburg pattern. Use the CityServicePage template with `h1`, `serviceType`, and other required props per Session 7's Lane 8.6 refactor.

- Commercial Furniture Installation: Waukegan
- Cubicle Installation: Naperville, Waukegan
- Systems Furniture Installation: Chicago, Schaumburg, Naperville
- Office Furniture Delivery and Setup: Chicago, Schaumburg, Naperville
- Office Relocation: Schaumburg, Naperville

When each Systems Chicago, Office Furniture Delivery Chicago, etc. standalone page is built, the corresponding consolidation redirect in next.config.ts must be removed, and the corresponding section on CFI Chicago must be trimmed to a one-paragraph teaser (same pattern as Session 7 Lane 8 Cubicle Chicago work).

### City service page tier (build in 90 days per Prompt 11)

Seven additional lower-volume pages. Follow the same template pattern.

### Brian-side tasks (no engineering required)

- GA4 conversion event configuration. The contact form fires `dataLayer.push({ event: 'contact_form_submit' })` on success. To capture this in GA4, configure a Custom Event in GA4 Admin > Events with `contact_form_submit` as the event name.
- Google Search Console verification once DNS access is available. Add a TXT record to the domain DNS per GSC's verification flow, then verify in GSC and submit the sitemap.
- Termageddon subscription cancellation, if applicable, since Session 7 replaced the four Termageddon legal pages with hardcoded Privacy Policy and Disclaimer.
- Voice review of city pages per docs/known-issues.md "Session 7" section.

### Content review items (parked from Session 7)

- Park Ridge case study (modular-installation-services-park-ridge-il) mentions Corporate Concepts twice in body prose. External links to corpconc.com were removed in Lane 12 per the manufacturer-and-dealer rule; the prose mentions stayed per the decision to leave content untouched. May warrant a follow-up content edit if Brian wants the dealer credit removed from the narrative.
- Project-image-at-top request (parked from original handoff): Ryan wants the first image higher on project detail pages. Partially reverses the Lane 2A.4 hero-image removal from an earlier session. Needs its own recon plus write lane.
- Restaurant slug-collision project: the project document `the-benefits-of-a-professional-restaurant-furniture-installation` has no case-study content (duplicates the blog post of the same slug) and shares the identical slug. Needs real content or removal from the gallery.

### Stat values: refactor to single source

`src/lib/constants.ts` exports `SITE.stats.yearsInBusiness` and `SITE.stats.projectsCompleted`. The about page stat block already reads from these. However, several other pages hardcode the same values in body copy and schema: the homepage stat band, `schema.ts` PersonSchema description, office-relocation and commercial-furniture-installation body paragraphs, and the cubicle city page. This means stat updates require touching multiple files across the codebase rather than one constant. Post-launch: refactor all hardcoded stat references to read from `SITE.stats` so future updates are a single change.

### Code and data cleanup (parked, low priority)

- serviceType is null on all 9 project documents in Sanity. Only matters if frontend or GROQ filters or displays by it.
- tel: href normalization: 6 tel: links carry dashes (tel:847-550-4042). Functional (dialers strip non-digits), cosmetic only. Schema permits the scheme.

### Session 6 follow-ups

- 14 blog-to-project cross-links inserted via Sanity mutation in Session 6. Eyeball review of anchor text and placement in context is recommended.

### Old route 404s

Terms of Service (/terms-of-service/) and Cookie Policy (/cookie-policy/) were removed in Lane 15. Old bookmarks or cached search results may briefly serve 404s until search engines re-crawl. No redirects added per the launch decision; intentional.

### External link removal decision log (Session 7 Lane 12)

Decision: Remove external links from project case studies. Keep booksbythefoot.com as the only exception.

Rationale: Outbound links to manufacturer sites (Steelcase, Knoll, Haworth, etc.) and dealer sites (Corporate Concepts, Wehrli Furniture) create a path where readers leave for sites that can refer them to a competitor installer. On Point Installations sits upstream of dealer choice. Removing these links keeps readers on pages controlled by On Point.

Items affected: 19 link annotations removed across 6 project case studies. Anchor text preserved as plain prose. Books by the Foot link preserved (book staging service, no furniture industry overlap).

Reversibility: Stored as Sanity mutations to markDefs arrays. Anchor text intact. Restoring any specific link requires restoring the markDef and re-marking the relevant spans in Sanity Studio. No text rewriting needed.

Related open: Park Ridge case study mentions Corporate Concepts twice in body prose. Text mentions stayed per Ryan's decision. May warrant separate content review.

---

End of file.

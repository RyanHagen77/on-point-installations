# Design Decisions

Decisions made during the build where multiple valid options existed. Documented here so future sessions know which path was chosen and why.

---

## Service Architecture — 8 Pages, Live-Site Set, Audit URLs Where They Map

**Decision (locked 2026-05-16):** The new site has 8 service pages matching the live site's 8 services exactly. Audit-specified SEO slugs are used where they map cleanly; new Chicago-suffixed slugs are used for the other 4. Three audit-only URLs fold into the Office Installations money page as H2 sections.

**Canonical 8 services and slugs:**
1. Office Installations → `commercial-furniture-installation-chicago-il` (audit URL, money page)
2. Relocation → `office-relocation-chicago-il` (audit URL)
3. Warehousing → `commercial-office-furniture-storage-chicago-il` (audit URL)
4. Space Planning → `commercial-space-planning-chicago-il` (audit URL)
5. Electrical & Voice/Data → `electrical-voice-data-cabling-chicago-il` (new slug)
6. Artwork Installation → `artwork-installation-chicago-il` (new slug)
7. Window Treatment Installations → `window-treatment-installation-chicago-il` (new slug)
8. Cubicle Wall and Upholstery Cleaning → `cubicle-wall-upholstery-cleaning-chicago-il` (new slug)

**Three audit URLs absorbed into Office Installations:**
- `cubicle-installation-chicago-il` → H2: "Cubicle Installation in Chicago"
- `systems-furniture-installation-chicago-il` → H2: "Systems Furniture Installation in Chicago"
- `office-furniture-delivery-setup-chicago-il` → H2: "Office Furniture Delivery & Setup"

Their audit-specified keywords and FAQ content are preserved inside the Office Installations page rather than discarded. 301 redirects from all three slugs are in `next.config.ts`.

**Why:** The live site has 8 services — users and Brian's clients know this service set. The audit targeted a narrower 6-page Chicago SEO structure, but forcing 6 audit-only pages would break the brand's existing navigation muscle memory and leave 4 live services without pages. The umbrella approach retains all keyword targeting inside the money page.

---

## Mobile Header — Phone Number Treatment

**Decision:** Phone icon (Option A) — not a styled text number (Option B)

**Context:** On mobile, the header shows `[Logo] … [phone] [hamburger]`. The phone was rendering as plain dark text (`text-sm font-semibold text-[#292929]`), which looked like accidental content rather than an interactive element.

**Options considered:**
- **Option A:** Replace phone text with a phone SVG icon on mobile. Icon is a `tel:` link in maroon (`text-[#800000]`). Full phone number text continues to display on desktop (`lg:` breakpoint and above).
- **Option B:** Style the phone number as a small maroon button on mobile.

**Chosen:** Option A (phone icon)

**Reason:** The phone icon takes minimal horizontal space in a tight mobile header, is universally recognizable as a call action, and the maroon color clearly signals it is interactive without requiring a button container. Option B would add visual weight to an already compact header and crowd the logo/hamburger.

**Implementation:** `src/components/layout/Navigation.tsx` — mobile phone link renders an SVG phone path icon at `w-5 h-5` in `text-[#800000]`. Desktop (`lg:flex`) continues to render the full `{SITE.phone}` string.

---

## Primary Brand Color — Maroon (#800000)

**Decision:** `#800000` is the confirmed primary brand color used throughout the new build.

**Context:** The live site CSS was extracted during Phase 2 kickoff. The dominant accent hex across all interactive elements, borders, headings, and CTAs on the current site is `#800000` (maroon/dark red). All button backgrounds, active nav states, header borders, and H2 headings in the new build use this value. Hover states use `#5A0000`.

**Extracted from:** `https://onpointinstallations.com` CSS — most-used dark hex by frequency.

**Implementation:** Used as a literal value throughout the codebase (`bg-[#800000]`, `text-[#800000]`, `border-[#800000]`) rather than as a Tailwind design token, because Tailwind v4 uses CSS-first config via `@theme {}` in `globals.css` — not `tailwind.config.ts`.

---

## Brand Font — Wix Madefor Text

**Decision:** Wix Madefor Text is the confirmed brand typeface used in the new build.

**Context:** The live site loads Wix Madefor Text from Google Fonts. Extracted from the `fonts.googleapis.com` link tag in the live site's HTML during Phase 2 kickoff. Carried forward into the new build using `next/font/google`.

**Implementation:** `src/app/layout.tsx` — loaded with `variable: '--font-wix-madefor-text'` and applied to `<body>` via `font-[family-name:var(--font-wix-madefor-text)]`. Weights: 400, 500, 600, 700.

---

## Phase 2 Content Images — Hero Only, Inline Deferred

**Decision (locked 2026-05-16):** All Phase 2 service pages and supporting pages ship with a hero image only. No inline content images inside body sections.

**Context:** During the Electrical page build, three candidate content images were evaluated across four iterations. Every image failed on at least one of: composition, source quality, or relevance to the adjacent copy. Rather than ship low-quality decorative stock images, the decision was made to defer all inline content images until Brian provides a vetted set of real job-site photos.

**Scope:** Applies to all 8 service pages and all 3 supporting pages (/about/, /contact/, /reviews/).

**Why not piecemeal:** Adding content images one page at a time creates inconsistent page quality and forces repeated evaluation cycles. A single batch update — when Brian delivers photos — is cleaner and easier to audit.

**Resuming in Phase 5:** When Brian provides high-resolution job-site photos (1600px+ longest edge, real On Point work), inline images can be added across all service pages in one focused pass. See `docs/known-issues.md` — "All Service Pages — Real Job-Site Photos Needed."

**CLAUDE.md cross-reference:** "CONTENT IMAGES — PHASE 2 RULE" section. Image sizing and `sizes` attribute rules for when content images are added: IMAGE SEO RULES rule 9.

---

## H1 Size Scale — Responsive Typography

**Decision:** Three-step responsive H1 scale: `text-[32px]` mobile → `text-[42px]` tablet (sm) → `text-5xl` desktop (lg)

**Context:** The original H1 was set to a fixed large size that overflowed on mobile — text ran too wide and required two lines at a font size that looked disproportionate on small screens. The three-step scale keeps the H1 impactful on desktop while fitting cleanly on a standard phone viewport.

**Chosen values:**
- Mobile: `text-[32px] leading-[1.15]` — tight leading to prevent the two-line wrap from adding too much height
- Tablet (≥640px): `sm:text-[42px] sm:leading-tight`
- Desktop (≥1024px): `lg:text-5xl` (48px)

**Implementation:** `src/app/page.tsx` — H1 className: `text-[32px] leading-[1.15] sm:text-[42px] sm:leading-tight lg:text-5xl font-bold text-[#800000] mb-4`

---

## Phase 2 Content-Image Rule — Brian Vetter Portrait Exception

**Decision (locked 2026-05-16):** Brian Vetter's portrait (`public/images/on-point-installations-brian-vetter.jpg`) is rendered inline in the "Our Beginnings" section of `/about/`, despite the Phase 2 content-image rule that restricts inline images on supporting pages.

**Rationale:** The Phase 2 content-image rule guards against a specific failure mode: job-site and installation photos that fail on composition, source quality, or relevance when real On Point job-site photography is not yet available. That failure mode does not apply to a portrait Brian himself provides. Person photos in person-context sections are not what the rule was written to block.

**Scope of exception:** Brian Vetter portrait on `/about/` only. The rule remains in force for all job-site and installation photos across all service and supporting pages until Brian delivers the vetted photo set.

**Implementation:** 2-column responsive grid (`grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start`) matching the live-site layout. Portrait fills the left column; "Our Beginnings" heading + body + list occupy the right column. Columns stack on mobile (image above text). `sizes="(min-width: 768px) 40vw, 100vw"`, no `priority` prop (below the fold), native 1200x1200 dimensions declared, `quality={85}`. Note: an initial implementation used `max-w-sm mx-auto` centered-inline placement (the inline content-image pattern), which was incorrect for this use case. Corrected to 2-column section-anchor layout to match the live site.

---

## Image Filename Strategy — Metadata-Layer Signal, Platform Constraint Accepted

**Decision (locked 2026-05-21):** Image filename SEO signals operate at the metadata layer (Sanity asset `originalFilename` field, `ImageObject` schema, alt text, surrounding content). The rendered `<img src>` URL is content-hashed by Sanity's CDN and not modified by renaming `originalFilename`. We accepted this as a platform constraint rather than building a proxy layer to inject slug-derived strings into URLs.

**Context:** The Phase 5 supervisor onboarding doc framed filename rename as an audit-defense lever -- re-uploading featured images with slug-derived `originalFilename` (e.g., `how-to-survive-office-downsizing-featured.jpg`) was intended to put descriptive strings in page source. The migration script Pass 1 ran successfully, GROQ confirmed the renames, and the rendered page's `<img src>` URL was unchanged. Sanity's CDN URL format is `cdn.sanity.io/images/{projectId}/{dataset}/{assetId}-{dimensions}.{ext}`, where `assetId` is content-addressed.

**Options considered:**
- **Option A:** Build a Next.js route like `/blog/images/[slug]/[filename]` that proxies to Sanity. Image tags reference the friendly URL; the route fetches from Sanity behind the scenes. Effort: ~half a day. Adds an ongoing maintenance surface and a per-request hop.
- **Option B:** Use `?dl=filename.jpg` query parameter on Sanity URLs. Affects download-filename forcing but does not change the URL path. Limited audit-defense value.
- **Option C:** Accept Sanity's content-hashed URLs as platform characteristic and shift audit-defense weight to other signals (alt text, schema, dimensions, format, sizing, layout).

**Chosen:** Option C.

**Reason:** Per Google's published guidance (John Mueller, multiple statements), image filenames are a "very lightweight" SEO signal -- they help with image search ranking but are not a major page-ranking factor when alt text and surrounding context are descriptive. Building a proxy layer to capture this signal is disproportionate engineering investment for the SEO upside. The metadata-layer signals (`originalFilename` surfaced in `ImageObject` schema, alt text, surrounding paragraphs) cover the relevant audit surface. If audited as a deficiency, the response is "Sanity is content-addressed asset storage -- standard pattern across headless CMS stacks, not a missed optimization." This is a defensible architectural explanation, not a weakness.

**Implementation:** `scripts/migrate-inline-images.ts` Pass 1 updates `originalFilename` to slug-derived names (visible in Sanity Studio, surfaceable in schema) but rendered `<img src>` continues to show content-hashed URLs. Documented as platform characteristic in `docs/post-launch-recommendations.md`. CLAUDE.md IMAGE SEO RULE 7 enforces the assumption going forward.

---

## Blog Inline Image Width — Option B, Match Article Column

**Decision (locked 2026-05-21):** Inline body images in blog posts render at `max-w-3xl` (768px), matching the article text column width. Diverges from CLAUDE.md IMAGE SEO RULE 13 (formerly rule 9), which specifies `max-w-2xl` (672px) for service page content images.

**Context:** The Phase 5 inline image migration required deciding how to render images embedded in blog post bodies. The CLAUDE.md content-image rule (`max-w-2xl mx-auto`) was written for service page content images, where the narrower cap creates visual breathing room relative to the surrounding column. The live WP site renders blog inline images at full body-column width (~1200px source dimensions intentionally), and visual parity vs live WP is a working principle ranked above SEO audit findings.

**Options considered:**
- **Option A:** Keep `max-w-2xl` (672px). Rebuild is intentionally tighter than WP. Editorial reading-column aesthetic.
- **Option B:** Widen to `max-w-3xl` (768px). Match the article column width. Closer to live WP visual emphasis.

**Chosen:** Option B.

**Reason:** Visual parity is concrete (Brian sees the rebuild and the live site, notices a difference, asks why his images look smaller). CLAUDE.md's content-image rule was written without explicit consideration of blog inline images at this scale; the rule still applies to service page content images where it originated. Blog inline images are an exception captured here.

**Implementation:** `src/app/blog/[slug]/page.tsx` `portableTextComponents.types.image` handler renders single inline images at `max-w-3xl` (implicit from the article column wrapper, no additional max-width on the image wrapper itself). `sizes="(min-width: 768px) 768px, 100vw"`. CLAUDE.md content-image rule 13 remains in force for service pages.

---

## Gallery Layout — Adjacent Image Detection at Render Time

**Decision (locked 2026-05-21):** When Portable Text body content contains consecutive image blocks (from Gutenberg `wp:gallery` blocks in WP source), render them as a multi-column grid at the render layer. No new Sanity schema type. Detection happens in a preprocessor before `<PortableText>` runs.

**Context:** The migration script flattens `wp:gallery` blocks into individual image blocks during WXR-to-Portable-Text conversion. Sanity has no gallery primitive in the current schema. The rendered rebuild initially showed gallery images stacked vertically (one image per row) while the live WP site renders them as horizontal pairs. Content parity required handling adjacency in the render path.

**Options considered:**
- **Option 1:** Render-layer detection. A preprocessor walks the body array, groups consecutive image blocks into a synthetic `imageGroup` container, and renders the group as a 2-column (or N-column for larger galleries) grid. No data changes. CSS-only solution.
- **Option 2:** Migrate galleries as gallery blocks. Introduce a new Portable Text type `gallery` containing an array of images. Update schema, update migration script, update template handler. Semantically correct (gallery is content, layout is presentation) but more architectural work and requires re-migrating any posts already migrated as flat image blocks.

**Chosen:** Option 1.

**Reason:** Step A-live migration had already written 6 image blocks to one post. Switching to Option 2 would require another debug loop on the migration script and re-running on the already-migrated post. Option 1 is a single template change that solves the visual problem without touching data. Generalizes to 2, 3, or 4 images per row with grid layout. Brian's SEO content work (alt text in worksheet) is unaffected.

**Implementation:** `src/app/blog/[slug]/page.tsx` includes a `groupImageBlocks()` helper that preprocesses `post.body` before passing to `<PortableText>`. Consecutive `_type: 'image'` blocks are wrapped in a synthetic `_type: 'imageGroup'` block containing an `images` array. `portableTextComponents.types.imageGroup` renders the group as a responsive grid (`grid grid-cols-1 md:grid-cols-2`). Single inline images continue to use the `types.image` handler unchanged.

---

## Blog Post Body Migration — WXR-Driven, Not Live-HTML-Driven

**Decision (locked 2026-05-21):** The Phase 5 inline image migration consumes WordPress's WXR export file as primary data source. Live HTTP fetches of WP page content are not used. Binary image fetches from `/wp-content/uploads/` are the only network operations.

**Context:** Pre-flight diagnostics in this Phase 5 arc revealed that the WP site's CyberOptik WAF returns 403 to HTML page fetches from the migration IP but passes static asset requests (`/wp-content/uploads/*.jpg`) under the same User-Agent. Live HTML fetching is unreliable for content parsing. WXR export, by contrast, contains the authored block HTML (Gutenberg comments, attachment items with canonical URLs, full alt text and class attributes) directly accessible from the WP admin interface.

**Options considered:**
- **WXR-driven:** Parse WXR XML once, build per-post data structures including authored body HTML, attachment ID -> URL mappings, and alt attributes. Migration script becomes a local-first operation; only image binaries fetched over network.
- **Live-HTML-driven:** Fetch each post's rendered HTML, parse for `<img>` tags, derive URLs from `src` attributes (subject to resize-strip bugs documented in spec-gaps.md), then fetch binaries. Requires WAF-bypassed access to HTML pages, which the migration IP does not have.
- **WP REST API-driven:** Use `/wp-json/wp/v2/posts/<id>` and `/wp-json/wp/v2/media/<id>` for authoritative data. WAF also blocks REST API from the migration IP.

**Chosen:** WXR-driven.

**Reason:** WXR is the authoritative source for authored content (block HTML, alt text, attachment IDs). Bypasses the WAF entirely. Eliminates URL derivation bugs by using `wp:attachment_url` directly. Reproducible (the WXR file is a static input, not a live fetch). Aligns with CLAUDE.md BODY CONTENT MIGRATION RULE 1.

**Implementation:** `scripts/migrate-inline-images.ts` accepts the WXR file path as input. Pass 1 (featured images) resolves attachment ID via `_thumbnail_id` post-meta -> `wp:attachment_url`. Pass 2 (inline images) parses `<content:encoded>` for `<img>` tags, extracts `wp-image-NNNN` class for attachment ID lookup, fetches binary from `wp:attachment_url`. The WXR file is gitignored in `tmp/`.

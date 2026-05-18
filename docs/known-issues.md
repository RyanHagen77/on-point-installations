# Known Issues — Pre-Launch Backlog

Items that require action before Phase 5 launch prep or before specific Phase 4/5 tasks. Grouped by category. Each entry states what needs doing, who does it, and which pages it affects.

---

## Image Assets

### Electrical & Voice/Data — Hero Image Stock Photo License
**Action needed:** Confirm the Depositphotos license is still active and covers use on the new domain.
**Detail:** The hero image (`on-point-installations-electrical-voice-data.jpg`) originated on the live site as `depositphotos_32139119_xl-scaled-1...` — a Depositphotos stock image. If the license has lapsed or is seat-limited to the old domain, replace with a job-site photo or a licensed alternative before launch.
**Owner:** Brian Vetter
**Affects:** `/services/electrical-voice-data-cabling-chicago-il/`
**Phase:** Resolve before Phase 5 launch prep

---

### All Service Pages — Real Job-Site Photos Needed for Inline Content Images
**Action needed:** Brian to provide high-resolution job-site photos for each service.
**Detail:** Phase 2 ships hero images only. Every content image evaluated during Phase 2 failed on composition, source quality, or relevance. Inline images are deferred until a vetted photo set is available. When photos arrive, inline images are added in a single pass across all service pages — not piecemeal.
**Required photos:** electrical work in progress, cabling installation, furniture installs, storage warehouse interior, artwork hanging, window treatment installation, office/cubicle cleaning.
**Minimum spec:** 1600px on longest edge, real On Point job-site work (not stock).
**Owner:** Brian Vetter
**Affects:** All service pages
**Phase:** Phase 5, after Brian delivers photos

---

### City Service Pages — Hero Photos Pending Brian

**Action needed:** Brian to provide city-specific job-site photos for each city service page.
**Detail:** All four city CFI pages (Schaumburg, Naperville, Waukegan, Wauconda) currently share the same generic installation photo (`on-point-installations-office-installations.jpg`). This photo is not from a Schaumburg, Naperville, Waukegan, or Wauconda job site. Alt text is intentionally generic across all four pages until city-specific photos exist — geographic relevance is carried by H1, title, body copy, and schema, not the hero alt text.
**Owner:** Brian Vetter
**Affects:** `/services/commercial-furniture-installation-schaumburg-il/`, `/services/commercial-furniture-installation-naperville-il/`, `/services/commercial-furniture-installation-waukegan-il/`, `/services/commercial-furniture-installation-wauconda-il/`
**Phase:** Phase 5, after Brian delivers photos

---

### SVG Logo — Phase 5 Deliverable
**Action needed:** Brian to commission and provide SVG logo file.
**Detail:** Current build uses `public/images/logo.png` — a PNG downloaded from the live WordPress site. SVG is needed for crisp rendering at large display sizes and for favicon derivation.
**Owner:** Brian Vetter
**Affects:** Navigation, Footer, Favicon (all pages)
**Phase:** Phase 5

---

### Favicon — Placeholder Until SVG Logo Provided
**Action needed:** Replace placeholder favicon with one derived from the SVG logo.
**Detail:** `src/app/icon.tsx` generates a 32x32 maroon "OPI" monogram via Next.js ImageResponse. This is a placeholder. When Brian provides the SVG logo, replace `icon.tsx` with a proper favicon generated from the brand mark.
**Owner:** Brian Vetter (provides SVG); developer (implements)
**Affects:** All pages (browser tab)
**Phase:** Phase 5 (depends on SVG logo delivery)

---

## FAQ Content Needing Brian Review

All FAQ sections on service pages without a live-site FAQ equivalent were drafted per Voice Rules. Brian must review and approve or revise before Phase 5 launch prep.

| Page | FAQ Topics Covered | Live-Site Source? |
|---|---|---|
| `/services/electrical-voice-data-cabling-chicago-il/` | High voltage scope, cabling types, disconnect/reconnect, permits, licensing | No live-site FAQ; drafted |
| `/services/office-relocation-chicago-il/` | Relocation scope, disconnect/reconnect, timeline, minimizing downtime, coordination | No live-site FAQ; drafted |
| `/services/commercial-space-planning-chicago-il/` | What space planning includes, who provides it, when it happens, what it prevents, cost | No live-site FAQ; drafted |
| `/services/artwork-installation-chicago-il/` | Piece types, oversized/heavy work, delivery and unpacking, wall types, insurance | No live-site FAQ; drafted |
| `/services/window-treatment-installation-chicago-il/` | Product types, automated shades, receiving/delivery, co-install with furniture, who supplies product | No live-site FAQ; drafted |
| `/services/cubicle-wall-upholstery-cleaning-chicago-il/` | Surfaces cleaned, fabric condition results, standalone vs. bundled, pre-delivery cleaning, disruption | No live-site FAQ; drafted |

**Resolution needed from Brian:** Review each FAQ set and approve or revise the questions and answers. The FAQ text on each page is the source of truth — no separate document needed.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## Unverified Stats and Claims

### "No Subcontracting" — Differentiator Claim
**Action needed:** Brian to confirm the claim and provide preferred phrasing.
**Detail:** Phase 2 spec lists "No subcontracting" as a key differentiator. The live About page does not state this explicitly. The claim is referenced in the H2 "Why Chicago Businesses Choose On Point Installations" on the money page but body copy was drafted, not sourced. If Brian confirms this is accurate, revise the copy using his words.
**Owner:** Brian Vetter
**Affects:** `/services/commercial-furniture-installation-chicago-il/` (differentiator section)
**Phase:** Resolve before Phase 5 launch prep

---

### Cubicle Cleaning — Productivity Statistics
**Action needed:** Brian to provide source documentation, or confirm stats stay omitted.
**Detail:** The live Cubicle Cleaning page references productivity statistics (percentage improvement in workspace productivity from clean panels). These were omitted from the Phase 2 build because no verifiable source was available. If Brian wants the stats reinstated, provide the original study or citation so they can be quoted accurately.
**Owner:** Brian Vetter
**Affects:** `/services/cubicle-wall-upholstery-cleaning-chicago-il/`
**Phase:** Resolve before Phase 5 launch prep

---

### Money Page — Differentiator Claims Needing Brian Confirmation
**Action needed:** Brian to review the "Why Chicago Businesses Choose On Point" section for accuracy.
**Detail:** The H2 "Why Chicago Businesses Choose On Point Installations" on the money page was partially ported from the live About page and partially drafted to fill gaps. Claims about non-union pricing, same-crew commitment, and quote accuracy need Brian to confirm they accurately reflect how he describes the business.
**Owner:** Brian Vetter
**Affects:** `/services/commercial-furniture-installation-chicago-il/`
**Phase:** Review before Phase 5 launch prep

---

### Money Page — Dual Brand Lists

**Action needed:** Pending Brian review on whether to consolidate.
**Detail:** Chicago money page has two brand lists: an inline 9-brand list in the "What's Included in Every Installation" section (Knoll, Haworth, Herman Miller, Steelcase, AIS, KI, Allsteel, National Office Furniture, Teknion — sourced from Prompt 11 SERVICE DETAILS) and a comprehensive 15-brand grid in the "Furniture Brands We Install" H2 (verbatim from live site). The inline list reads as contextual prose; the grid is a brand-wall trust signal. They serve different purposes but both lists live on the same page.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## Money Page — 3 Absorbed H2 Sections (Drafted)
**Action needed:** Brian to review and approve or revise three drafted content sections.
**Detail:** The Office Installations page absorbs three audit-only URLs as H2 sections. No direct live-site equivalent exists for any of the three — the live Office Installations page does not break these out as separate sections. All three were drafted in Brian's contractor voice.
**Sections:**
- H2: "Cubicle Installation in Chicago"
- H2: "Systems Furniture Installation"
- H2: "Office Furniture Delivery and Setup"
**Owner:** Brian Vetter
**Affects:** `/services/commercial-furniture-installation-chicago-il/`
**Phase:** Review before Phase 5 launch prep

---

## Missing Content (Blocking)

### Reviews — Verbatim Quote Text
**Status: RESOLVED (2026-05-17)**
**Detail:** All 16 Google reviews were retrieved from the live site via the Endorsal.io wall-of-love widget public API endpoint (`https://api.endorsal.io/wall-of-love/testimonials/6170695a0ba50c5cda9f3337/0/100`). The live /reviews/ page uses an Endorsal.io "wall-of-love" embed (container ID `ndrsl-wol-6170695a0ba50c5cda9f3337`, init ID `6170692d0ba50c5cda9f3335`). All reviews are Google reviews pulled via the widget's GBP integration.
**15 of 16 reviews are live on the page.** Gurpreet S. ("Overnight parking.") was omitted -- appears to be a misplaced GBP location review, not an installation testimonial. Brian should confirm whether this review should be excluded.
**Attribution:** First name + last initial per Google TOS.
**Note on Colleen C.:** Her review contains a literal em dash in the original Google review ("make my job easier[em-dash]whenever"). Stored as `—` Unicode escape in the TypeScript source to pass the pre-commit hook. Renders correctly at runtime.
**Remaining open:** Homepage review snippet section (not yet built).

---

### Reviews Page — Intro Paragraph Drafted (No Live-Site Source)
**Action needed:** Brian to review and approve or revise the intro paragraph on /reviews/.
**Detail:** The live /reviews/ page renders review content via a JavaScript widget -- a static fetch returns no surrounding prose. The intro paragraph on the new `/reviews/` page was drafted per Voice Rules: "Dealers and facility managers across the Chicago metro area have been hiring On Point Installations since 2010. Here's what they say on Google."
**Owner:** Brian Vetter
**Affects:** `/reviews/` page -- intro paragraph
**Phase:** Review before Phase 5 launch prep

---

### GBP Review URL
**Status: RESOLVED (2026-05-17)**
**Detail:** Google Place ID `ChIJcTIiYGuiD4gRB3LuYKJ-8XY` confirmed from the Endorsal.io widget review source links (each review links to `https://search.google.com/local/reviews?placeid=ChIJcTIiYGuiD4gRB3LuYKJ-8XY`).
- Read reviews URL: `https://search.google.com/local/reviews?placeid=ChIJcTIiYGuiD4gRB3LuYKJ-8XY`
- Write a review URL: `https://search.google.com/local/writereview?placeid=ChIJcTIiYGuiD4gRB3LuYKJ-8XY`
Both URLs are wired into `/reviews/` page. Brian should verify that the Place ID matches the GBP dashboard.

---

### Naperville CFI Page — City-Specific Review Quote Needed

**Action needed:** Brian to provide a real Google review from a Naperville, IL customer.
**Detail:** The Naperville CFI page (`/services/commercial-furniture-installation-naperville-il/`) ships with a placeholder in the social proof block: `"[REVIEW PLACEHOLDER: replace with real review from a Naperville, IL customer when available]"`. Attribution stored as Unicode em dash escape (`—`), renders correctly at runtime. Placeholder must be replaced before Phase 5 launch.
**Owner:** Brian Vetter
**Affects:** `/services/commercial-furniture-installation-naperville-il/` — social proof block
**Phase:** Resolve before Phase 5 launch prep

---

### Schaumburg CFI Page — City-Specific Review Quote Needed

**Action needed:** Brian to provide a real Google review from a Schaumburg, IL customer.
**Detail:** The Schaumburg CFI page (`/services/commercial-furniture-installation-schaumburg-il/`) ships with a placeholder in the social proof block: `"[REVIEW PLACEHOLDER: replace with real review from a Schaumburg, IL customer when available]"`. Attribution is stored as a Unicode em dash (`—`) so it renders correctly at runtime and passes the pre-commit hook. The placeholder must be replaced before Phase 5 launch.
**Owner:** Brian Vetter
**Affects:** `/services/commercial-furniture-installation-schaumburg-il/` — social proof block
**Phase:** Resolve before Phase 5 launch prep

---

### Space Planning — Drafted Sections Needing Brian Review
**Action needed:** Brian to review expanded content drafted beyond the live-site ~80 words.
**Detail:** The live space planning page has approximately 80 words. The new build is a full service page. All content beyond the single ported paragraph was drafted per Voice Rules. See `docs/spec-additions.md` — "Space Planning Service Page — Net-New Content."
**Affects:** `/services/commercial-space-planning-chicago-il/`
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

### Office Relocation — Expanded Sections Needing Brian Review
**Action needed:** Brian to review sections drafted beyond the live-site ~150 words.
**Detail:** The live Relocation page has approximately 150 words. The new build expands with a dealer workflow description, downtime communication details, and FAQ Q&As — all drafted per Voice Rules. See `docs/spec-additions.md` — "Office Relocation Service Page — Expanded Beyond Live-Site Content."
**Affects:** `/services/office-relocation-chicago-il/`
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## About Page — Drafted Sections Needing Brian Review

### Non-Union Advantage Section
**Action needed:** Brian to review and approve or revise the non-union advantage section on /about/.
**Detail:** The Phase 2 spec calls for a non-union advantage section. No live-site source exists to port from. The section was drafted per Voice Rules covering: no trade-jurisdiction limits, same crew from start to finish, deliberate non-union choice at founding. The "same crew start to finish" claim in particular needs Brian to confirm it accurately reflects how jobs are staffed.
**Owner:** Brian Vetter
**Affects:** `/about/` — H2 "Non-Union: What That Means for You"
**Phase:** Review before Phase 5 launch prep

---

## Contact Info Verification

### Contact Form Email — Address Needs Verification
**Action needed:** Verify the correct destination email address before wiring the contact form.
**Detail:** Brian confirmed the contact form should send to `info@onpointinstall.com` — a shorter domain than the website (`onpointinstall.com` vs `onpointinstallations.com`). If this is a typo, form submissions go nowhere — silently dropped leads.
**Owner:** Brian Vetter
**Affects:** Contact form (Phase 4/5 implementation)
**Phase:** Verify before contact form is wired in Phase 4/5

---

## Visual Polish — Phase 5 Batch

### Navigation — Logo Display Size
**Issue:** Logo is currently `h-14` (56px display height). Live site shows the logo at closer to 80–90px. Increase to `h-16` or `h-20` and verify it doesn't crowd nav links on mid-width viewports.
**Phase:** Phase 5 polish pass

---

## Phase 3 Close Note (2026-05-17)

**Phase 3 closed at commit `93d3712`.** Four city-service page deliverables shipped across 6 commits. Carryover items below.

### City Pages — City-Specific Photos Pending Brian

All four shipped city CFI pages (Schaumburg, Naperville, and the two that will be built when unblocked — Waukegan, Wauconda) will share the generic installation hero photo until Brian provides city-specific job-site photos. Tracked separately under "City Service Pages — Hero Photos Pending Brian" in the Image Assets section above.

### City Pages — City-Specific Review Quotes Pending Brian

Schaumburg and Naperville both ship with `[REVIEW PLACEHOLDER]` in the social proof block. Tracked under the Missing Content section above. Waukegan and Wauconda are deferred entirely; their placeholders will be addressed when those pages are built.

### Waukegan and Wauconda CFI Pages — Deferred (Audit Source Gap)

**Action needed:** Resolve the audit source gap before building these pages.
**Detail:** Prompt 11 (the authoritative source for all Phase 3 city page body copy) does not include full spec blocks for Waukegan or Wauconda — only summary table entries (URL slug, target keyword, volume). Building from the table entry only would require drafting full body copy outside the Prompt 11 source, which sets a precedent inconsistent with how Schaumburg and Naperville were built. Two paths to unblock: (a) Brian interview yields Lake County / Wauconda market context, project examples, and voice-checked copy; (b) supplementary audit deliverable from IntegrePro fills in the missing city spec blocks.
**Owner:** IntegrePro Software LLC (path selection); Brian Vetter (if path a)
**Phase:** Phase 5 or later, after source gap is resolved

### Wauconda Framing Decision — Deferred

**Action needed:** Ryan + Brian conversation before Wauconda CFI is drafted.
**Detail:** Phase3_Kickoff frames Wauconda as the HQ city ("Office Furniture Installer Wauconda IL" — home base angle). Prompt 11 treats it as a standard service-area page like Schaumburg and Naperville. These framings produce different title tags, H1s, target keywords, and body copy angles. The decision affects the page's SEO positioning and cannot be reversed cheaply after the page is indexed.
**Owner:** Ryan Hagen + Brian Vetter
**Phase:** Phase 5 or later, before Wauconda CFI is drafted

### /service-area/ Stubs — Scoping Required

**Action needed:** Scope into a specific phase.
**Detail:** All `/service-area/[city]-il/` routes exist as stubs from Phase 1 scaffolding. They are the largest remaining structural gap in the site — every city page links to its service-area hub page, but those pages contain no content. This was never in Phase 3 scope. Needs a scoping conversation to determine whether it belongs in Phase 4 or a dedicated later phase.
**Owner:** IntegrePro Software LLC
**Phase:** Phase 5 or later, scoping required

---

## Phase 4 Close Note (2026-05-18)

**Phase 4 closed after Wave 5 housekeeping.** Blog infrastructure is live on Sanity with ISR. Migration pipeline proven in sandbox (integrepro-seo-lab). Three Wave 1 retrofits shipped (commits 065bee5, 6a88731, dda741f, 52b4630). Items below are Phase 5 technical carry-forwards from Phase 4 work.

---

### Blog — On-Demand Sanity Revalidation via Webhook (Phase 5 Required)

**Action needed:** Configure Sanity webhook to trigger Next.js on-demand revalidation when blog posts are created or updated.
**Detail:** The sandbox used time-based ISR (blog index: `revalidate = 3600`, detail pages: `revalidate = 86400`). During Wave 3 migration verification, the time-based window caused a real delay between Sanity writes and the deployed page reflecting new content. Production blog should not rely on time-based ISR for content that Brian will actively publish. Sanity's webhook integration can call a Next.js `revalidatePath` or `revalidateTag` API route on publish events, giving near-instant cache invalidation.
**Owner:** Developer
**Affects:** `/blog/` index, `/blog/[slug]/` detail pages
**Phase:** Phase 5 — before production blog migration begins

---

### Blog Migration — publishedAt Extraction (Phase 5 Blocker)

**Action needed:** Solve publishedAt extraction before running the 25-post production migration.
**Detail:** The WordPress theme at onpointinstallations.com does not emit `article:published_time` meta or `<time datetime>` in rendered HTML. All sandbox-migrated posts have `publishedAt: null`. This breaks Article schema `datePublished` in Google Rich Results and sorts posts incorrectly once the GROQ `coalesce(publishedAt, _createdAt)` fallback is no longer sufficient. Proposed fix: use WP REST API (`/wp-json/wp/v2/posts`) to fetch `date_gmt` field for each post before migration. The migration script (`scripts/migrate-wp-post.ts`) needs a `--published-at` flag or a REST pre-fetch step added before the 25-post run.
**Owner:** Developer
**Affects:** All 25 migrated blog posts — Article schema datePublished
**Phase:** Phase 5 — resolve before production migration

---

### Blog Migration — Category Extraction Selector (Phase 5 Fix)

**Action needed:** Update category extraction before the 25-post production migration.
**Detail:** The sandbox migration script uses `.cat-links a` to extract category. This selector returns null because the category links live outside `.entry-content` — likely in `.entry-header .cat-links`. Test on a live WP post HTML to confirm correct selector, then update `extractPost()` in the migration script.
**Owner:** Developer
**Affects:** All 25 migrated blog posts — `category` field
**Phase:** Phase 5 — resolve before production migration

---

### Blog Migration — WordPress Image Resize Variants (Phase 5 Asset Audit)

**Action needed:** Audit all image references in migrated post bodies before production migration.
**Detail:** The sandbox migration script strips `<img>` tags from post bodies (by design). When post images are eventually added to Sanity, the source URLs should be WordPress originals or `-scaled.jpg` variants — never `-1200x800`, `-600x400`, or other WordPress resize suffixes. The sandbox migration logged all skipped image `src` values in per-post `.err` files under `logs/`. Review these before the production migration to identify which posts have images worth restoring to Sanity as native assets.
**Owner:** Developer
**Affects:** Migrated blog posts — image assets
**Phase:** Phase 5 — asset audit before or during production migration

---

## Phase 5 Launch Prep — SEO

### Secondary Service Page Titles — Verify Against GSC Before Launch
**Issue:** Five service page titles were worker-authored following the correct naming pattern but were not derived from the SEO audit (no explicit spec existed for these pages in BUILD_PLAN.md or the Phase 2 kickoff). The titles follow the pattern correctly and are likely sound, but GSC impression and click data for these service areas may surface keyword opportunities the current titles miss.
**Pages affected:**
- `/services/commercial-office-furniture-storage-chicago-il/`
- `/services/electrical-voice-data-cabling-chicago-il/`
- `/services/artwork-installation-chicago-il/`
- `/services/window-treatment-installation-chicago-il/`
- `/services/cubicle-wall-upholstery-cleaning-chicago-il/`
**Action:** During Phase 5 launch prep, pull top-impression queries for each of these five service pages from Google Search Console. Compare against the current title tags. Adjust if GSC reveals a high-impression keyword the title is missing.
**Owner:** IntegrePro Software LLC
**Phase:** Phase 5 launch prep (before production domain flip)

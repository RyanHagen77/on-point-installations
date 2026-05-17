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

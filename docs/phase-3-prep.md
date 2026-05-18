# Phase 3 Prep — Retrofit Items for Existing Pages

Items that cannot be completed in Phase 2 because they depend on Phase 3 pages that don't exist yet. Each entry specifies what to add, where to add it, and the exact anchor text (which is audit-locked and must not be paraphrased).

---

## Phase 3 Retrofit Required on Money Page

**Page:** `/services/commercial-furniture-installation-chicago-il/`
**Status: COMPLETE (2026-05-17)**
**Action:** Added two internal links to the "What's Included in Every Installation" section as a closing paragraph.

**Links added:**
- Anchor: `commercial furniture installation in Schaumburg` → `/services/commercial-furniture-installation-schaumburg-il/`
- Anchor: `commercial furniture installation in Naperville` → `/services/commercial-furniture-installation-naperville-il/`

**Anchor text correction note:** Earlier entries in this file (and the Phase 3 kickoff doc it derived from) recorded the anchor texts as `Schaumburg furniture installation` and `Naperville furniture installation`. Corrected to Prompt 11 verbatim per precedence rule. See `docs/spec-additions.md`.

---

## Phase 3 Retrofit Required on /about/

**Page:** `/about/`
**Status: COMPLETE (Phase 4 Wave 1, 2026-05-18) — commit `065bee5`**
**Action:** Added two internal links to the service territory paragraph

**Links to add:**
- Anchor: `Schaumburg office furniture installation` → `/services/commercial-furniture-installation-schaumburg-il/` (Prompt 11 Schaumburg INTERNAL LINKING)
- Anchor: `Naperville office furniture installation` → `/services/commercial-furniture-installation-naperville-il/` (Prompt 11 Naperville INTERNAL LINKING)

**Anchor text is audit-locked. Do not paraphrase.**

**Suggested placement:** In the paragraph on /about/ that covers On Point's geographic reach — where the page describes the team's service territory. Both can land in the same sentence or consecutive sentences.

---

## Phase 3 Retrofit Required on /project-gallery/

**Page:** `/project-gallery/`
**Status: COMPLETE (Phase 4 Wave 1, 2026-05-18) — commit `6a88731`**
**Action:** Added one internal link to the gallery intro copy

**Link to add:**
- Anchor: `Schaumburg commercial furniture installation` → `/services/commercial-furniture-installation-schaumburg-il/`

**Anchor text is audit-locked (Prompt 11 INTERNAL LINKING OPPORTUNITIES). Do not paraphrase.**

**Suggested placement:** In the gallery intro copy — note that On Point's project portfolio includes suburban Chicagoland markets including Schaumburg.

---

## Phase 3 Retrofit Required on Schaumburg CFI Page

**Page:** `/services/commercial-furniture-installation-schaumburg-il/`
**Status: COMPLETE (Phase 4 Wave 1, 2026-05-18) — commits `dda741f` (initial), `52b4630` (voice-rules revision)**
**Action:** Added one internal link to the service area paragraph; closing paragraph revised to resolve tricolon voice violation

**Link to add:**
- Anchor: `commercial furniture installation near Naperville` → `/services/commercial-furniture-installation-naperville-il/`

**Anchor text is audit-locked (Prompt 11 Naperville INTERNAL LINKING OPPORTUNITIES). Do not paraphrase.**

**Suggested placement:** In the service details section — where the Schaumburg page mentions serving the broader Chicagoland area, add a sentence noting On Point serves the full I-88/Route 59 corridor and link to the Naperville page.

---

## Phase 3 Retrofit Required on Space Planning Page

**Page:** `/services/commercial-space-planning-chicago-il/`
**When:** After the blog post is built in a future phase
**Action:** Add one internal link to the space planning page body copy

**Link to add:**
- Anchor: `what to do when office furniture doesn't fit` → `/blog/what-to-do-when-office-furniture-doesnt-fit/`

This blog post is specified in the Phase 2 audit as an internal link target from the space planning page. It does not exist as a stub or built page yet. Do not link to it until the blog post is live.

**Suggested placement:** In the intro paragraph or the H2 section on why space planning matters — a natural place to mention the common problem of furniture not fitting and link out to the post for more detail.

---

## Blog Post Topics Surfaced During Phase 2 Service Page Builds

These topics emerged naturally from the Phase 2 service page copy. None are Phase 3 items (Phase 3 is city pages). They are candidates for a blog phase after city pages are live. Captured here so they don't get lost.

| Topic | Source page | Why it surfaced |
|---|---|---|
| How to choose window treatments for a commercial office (manual vs. motorized, product types) | `/services/window-treatment-installation-chicago-il/` | FAQ about automated shades is a natural top-of-funnel keyword target |
| How long does cubicle wall fabric last and when should you clean vs. replace | `/services/cubicle-wall-upholstery-cleaning-chicago-il/` | FAQ about fabric condition naturally leads to a lifespan/replacement guide |
| What to expect from a commercial artwork installation (rigging, wall types, oversized pieces) | `/services/artwork-installation-chicago-il/` | FAQ answers about heavy work and wall types could support a longer-form post |

None of these require Phase 3 action. Add to blog planning when that phase is scoped.

---

## Phantom Blog Links — Retrofit When Blog Content Is Built

These are internal links specified in the Phase 2 audit that point to blog posts not yet written or published. **Do not add any of these as live anchors** until the corresponding blog post is live. Retrofit each link after the blog post is built and deployed.

| Page that should contain the link | Audit anchor text | Destination URL |
|---|---|---|
| `/services/commercial-furniture-installation-chicago-il/` (Cubicle Installation H2) | `what is cubicle installation` | `/blog/what-is-cubicle-installation/` |
| `/services/commercial-furniture-installation-chicago-il/` (Systems Furniture H2) | `what is systems furniture` | `/blog/what-is-systems-furniture/` |
| `/services/commercial-space-planning-chicago-il/` | `what to do when office furniture doesn't fit` | `/blog/what-to-do-when-office-furniture-doesnt-fit/` |

**Note on placement for the money page blog links:** The cubicle and systems furniture blog links are specified in the retired audit URLs for those service pages. Their natural home is in the corresponding H2 intro paragraph on the money page — a single sentence like "Learn more about [what is cubicle installation](/blog/what-is-cubicle-installation/)." Add both after the H2 intro copy, before the feature cards.

---

## Deferred / Carryover Queue (Phase 3 Close — 2026-05-17)

Phase 3 closed at commit `93d3712`. Items below were deferred from Phase 3 scope. Carry into Phase 4 or a dedicated later phase.

---

### Waukegan CFI Page — Deferred (Audit Source Gap)

**Page:** `/services/commercial-furniture-installation-waukegan-il/`
**Why deferred:** Prompt 11 contains no full spec block for Waukegan — only a summary table entry (URL slug, target keyword, volume/competition/timeline). Building without a Prompt 11 source block would require drafting full body copy (opening paragraph, WHY CHOOSE US, SERVICE DETAILS, 3 FAQs) outside the audit, inconsistent with how Schaumburg and Naperville were built.
**Prompt 11 table data (only what exists):**
- Slug: `/services/commercial-furniture-installation-waukegan-il/`
- Target keyword: `commercial furniture installation Waukegan IL`
- Volume: 70–140, Low competition, 45–60 days to results
- Priority: 🔴 in table / 🟢 in Prompt 11 narrative (contradiction within Prompt 11)
**To unblock:** (a) Brian interview yields Lake County / North Shore market context and voice-checked copy; or (b) supplementary audit deliverable from IntegrePro fills in the missing spec block.
**When ready:** Use `CityServicePage` template + new data file at `src/data/cityPages/waukegan-il.ts`. Same pattern as Schaumburg and Naperville.

---

### Wauconda CFI Page — Deferred (Audit Source Gap + Framing Decision)

**Page:** `/services/commercial-furniture-installation-wauconda-il/`
**Why deferred:** Same audit source gap as Waukegan (Prompt 11 table entry only, no body copy). Additionally, a framing decision must be made before drafting:
- **Phase3_Kickoff framing:** Wauconda as HQ city — "Office Furniture Installer Wauconda IL" home-base positioning. Different title, H1, target keyword, and body angle than the standard service-area template.
- **Prompt 11 framing:** Standard service-area page matching Schaumburg/Naperville pattern.
These produce different SEO positioning and cannot be reversed cheaply after the page is indexed.
**To unblock:** Ryan + Brian conversation on framing, then resolve audit source gap via same two paths as Waukegan.

---

### /service-area/[city]-il/ Stubs — Scoping Required

**Pages:** `/service-area/chicago-il/`, `/service-area/schaumburg-il/`, `/service-area/naperville-il/`, `/service-area/waukegan-il/`, `/service-area/wauconda-il/`
**Why deferred:** These route stubs exist from Phase 1 scaffolding. Every city CFI page links to its service-area hub (e.g., "our Naperville service area" links to `/service-area/naperville-il/`). All five stubs are currently empty. This is the largest remaining structural gap in the site.
**Note:** The stubs were never in Phase 3 scope and were not built. The city CFI pages link to them correctly — the stubs just need content.
**To unblock:** Scope into Phase 4 or a dedicated service-area phase. Content for each stub likely overlaps with the city CFI pages; this may be a thin-content pass rather than a full build.

---

### Remaining Phase 3 Retrofit Items — Not Yet Executed

These items from the Phase 3 retrofit queue above were not executed in Phase 3 (either deferred pending blog posts, or pending Phase 4 work):

| Item | Status | Blocking on |
|---|---|---|
| /about/ retrofit — Schaumburg + Naperville anchor links | **SHIPPED** `065bee5` | — |
| /project-gallery/ retrofit — Schaumburg anchor link | **SHIPPED** `6a88731` | — |
| Schaumburg CFI retrofit — Naperville anchor link | **SHIPPED** `dda741f`, `52b4630` | — |
| Space Planning retrofit — `what to do when office furniture doesn't fit` | Blocked | Blog post not yet built |
| Money page blog links (cubicle + systems furniture) | Blocked | Blog posts not yet built |

These three retrofits were executed as Phase 4 Wave 1 (see commit hashes above).

# Spec Additions — Intentional Departures from Live-Site Parity

Items in this file are features or content present in the new build that do NOT exist on the current live site (onpointinstallations.com). Each item is documented with its source authorization so it does not get flagged as invented content during content audits.

---

## Primary SEO Audit Prompts — Now in Repo

**Added:** 2026-05-17
**Location:** `docs/seo-audit/`

Prompts 10, 11, 12, 16, and 17 from the IntegrePro Software LLC SEO engagement are now committed to the repo as authoritative reference documents. The kickoff docs (`Phase2_Kickoff_*.md`, `Phase3_Kickoff_*.md`, etc.) are routing and orientation documents that summarize and sometimes paraphrase the audit outputs. When they conflict, the audit prompt in `docs/seo-audit/` wins. See `docs/seo-audit/README.md` for the full index and usage notes.

---

## Office Installations Money Page — Absorbed-URL H2 Sections

**Added:** 2026-05-16
**Status:** Drafted per Voice Rules. Needs Brian review before launch.
**Location:** `src/app/services/commercial-furniture-installation-chicago-il/`
**Present on live site:** No. The live Office Installations page does not break out cubicle installation, systems furniture, or delivery & setup as distinct sections.
**Rationale:** Three audit-only slugs (`cubicle-installation-chicago-il`, `systems-furniture-installation-chicago-il`, `office-furniture-delivery-setup-chicago-il`) are not built as standalone pages. Their SEO target keywords are preserved as H2 sections on the money page. 301 redirects from all three slugs point to the money page with jump anchors. See `docs/design-decisions.md` — "Service Architecture" for the full rationale.

**Drafted sections:**
- H2: "Cubicle Installation in Chicago" — body copy drafted per Voice Rules
- H2: "Systems Furniture Installation" — body copy drafted per Voice Rules
- H2: "Office Furniture Delivery and Setup" — body copy drafted per Voice Rules

**Resolution needed from Brian:** Review and approve or revise these three sections. See `docs/known-issues.md`.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## Electrical & Voice/Data — Services Overview Card Grid

**Added:** 2026-05-15
**Status:** Drafted per Voice Rules; intro cards added as structural addition
**Location:** `src/app/services/electrical-voice-data-cabling-chicago-il/`
**Present on live site:** No. The live page goes directly from intro paragraph to the High Voltage section, then the Voice & Data section. The new build adds a "What Our Electrical & Cabling Services Cover" H2 with two summary cards before the detailed H2 sections.
**Rationale:** The two-card overview gives users an immediate visual summary of High Voltage vs. Voice & Data scope before reading the detailed sections. The cards were drafted per Voice Rules; bullet details within each card are verbatim from the live site.
**Source authorization:** Outline approved in session 2026-05-15 before drafting.

---

## Cubicle Wall & Upholstery Cleaning — Productivity Statistics Omitted

**Added:** 2026-05-16
**Status:** Omitted pending source verification; Brian action required
**Location:** `src/app/services/cubicle-wall-upholstery-cleaning-chicago-il/`
**Present on live site:** Yes. The live page references productivity statistics (percentage improvement in workspace productivity from clean panels).
**Rationale:** No verifiable source was available for these statistics during Phase 2 build. Including unverified statistics violates the Sourcing Rule in CLAUDE.md. Statistics were omitted rather than cited without a source.
**Resolution needed from Brian:** Provide the original study or citation. If no source is available, statistics stay omitted permanently. See `docs/known-issues.md`.
**Owner:** Brian Vetter
**Phase:** Resolve before Phase 5 launch prep

---

## Trust Bar (Homepage)

**Added:** 2026-05-15
**Status:** Approved by spec; no action needed from Brian
**Location:** `src/app/page.tsx`, section 2 — `bg-[#800000]` bar with 4 stat blocks
**Present on live site:** No
**Rationale:** Above-the-fold credibility signal specified in Phase 2 brief. Consolidates stats that appear in scattered paragraph form on the live site into a scannable trust bar.

**Source authorization:** `Phase2_Kickoff_Homepage_ServicePages.md`, Section "HOMEPAGE", Page Sections item 2: "Trust bar — 5.0★ / 25 Google Reviews | 15 Years in Business | 11,000+ Projects | 12–15 Person Crew"

**Stats sources:**
- 5.0★ / 25 Google Reviews — `SITE.reviews` in `lib/constants.ts`, from live Google Business Profile
- 15+ Years in Business — `SITE.stats.yearsInBusiness`, founded 2010 per live About page
- 11,000+ Projects — `SITE.stats.projectsCompleted`, live About page says "nearly 11,000 projects"; new build rounds to 11,000+
- 12–15 Person Crew — `SITE.stats.employees`, from live site context

---

## Space Planning Service Page — Net-New Content

**Added:** 2026-05-16
**Status:** Drafted per Voice Rules. Needs Brian review before launch.
**Location:** `src/app/services/commercial-space-planning-chicago-il/`
**Present on live site:** Partially. The live site has a `/services/space-planning/` page with approximately 80 words of body copy. No page exists at the new slug `/services/commercial-space-planning-chicago-il/`.
**Rationale:** The Phase 2 audit specifies this page as a build target. The live-site equivalent has only one paragraph, insufficient to build a full service page. All content beyond that paragraph was drafted per Voice Rules.

**Ported content (~80 words):** The single paragraph from `onpointinstallations.com/services/space-planning/` covering on-site space measurement, floor core chalking, code compliance guidance, and the mission of keeping installation on schedule and on budget.

**Drafted content (remainder):** H2 sections on what space planning includes, why it matters before installation, and service use cases for dealers and facility managers. All flagged in `docs/known-issues.md`.

**Resolution needed from Brian:** Review and approve or revise drafted sections before Phase 5 launch prep.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## Artwork Installation — Section Split: Paragraphs 3 and 4 into Separate H2s

**Added:** 2026-05-16
**Status:** Approved by outline review; structural addition only, no new copy
**Location:** `src/app/services/artwork-installation-chicago-il/`
**Present on live site:** No. The live page presents paragraphs 3 and 4 as continuous prose under a single H2 ("Artwork Installation Chicago"). The new build splits them into two H2 sections: "What On Point Installations Handles" (door-to-door service scope + media types) and "Where We Install" (settings: commercial, residential, facilities).
**Rationale:** Improved scannability and distinct SEO signal for each topic. Live-site copy for both sections is ported near-verbatim; only the sectioning is new.
**Source authorization:** Outline approved in session 2026-05-16 before drafting.

---

## Window Treatment — Section Split: Paragraphs 2 and 3 into Separate H2s

**Added:** 2026-05-16
**Status:** Approved by outline review; structural addition only, no new copy
**Location:** `src/app/services/window-treatment-installation-chicago-il/`
**Present on live site:** No. The live page presents all body copy as continuous prose under one H2 ("Window Treatment Installation Chicago"). The new build splits paras 2 and 3 into two H2 sections: "Window Treatment Installation Services" (service scope, product types) and "Where We Work" (door-to-door, dealer/end-user angle, settings).
**Rationale:** Improved scannability and distinct SEO signals for service scope vs. coverage area. Live-site copy for both sections is ported near-verbatim; only the sectioning is new.
**Source authorization:** Outline approved in session 2026-05-16 before drafting.

---

## Cubicle Wall & Upholstery Cleaning — "Swinging Pendulum" Section Omitted

**Added:** 2026-05-16
**Status:** Approved by outline review; structural omission only
**Location:** `src/app/services/cubicle-wall-upholstery-cleaning-chicago-il/`
**Present on live site:** Yes. The live page includes a section framing the service around the "swinging pendulum" of office design trends (open plan vs. cubicles). The new build omits this section.
**Rationale:** The swinging-pendulum framing reads as think-piece content rather than service description. It doesn't serve the contractor voice or the B2B buyer (dealer, facility manager). The section omission was approved in the outline review session 2026-05-16.
**Source authorization:** Outline approved in session 2026-05-16 before drafting.

---

## Office Relocation Service Page — Expanded Beyond Live-Site Content

**Added:** 2026-05-16
**Status:** Live-site bullets ported; additional sections drafted. Needs Brian review.
**Location:** `src/app/services/office-relocation-chicago-il/`
**Present on live site:** Yes, at `onpointinstallations.com/services/company-office-relocation-chicago-il/`. The live page has approximately 150 words.
**Rationale:** The live-site relocation page is too thin (~150 words, 5 bullets) to meet the 700-word Phase 2 target. Content was expanded with drafted sections flagged for Brian's review.

**Ported content:** Intro paragraph, 5-bullet service scope, mission statement on minimizing downtime.
**Drafted content:** Dealer workflow description, downtime communication details, FAQ Q&As. All flagged in `docs/known-issues.md`.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## About Page — Team Warehouse Hero (Restored After Initial Removal)

**Added:** 2026-05-16
**Status:** Restored; no action needed from Brian.
**Location:** `src/app/about/page.tsx`
**Present on live site:** The live /about/ page has no hero photo. The page opens with the stats block and then Our Beginnings with the Brian portrait as a section anchor.
**What changed:** Team warehouse hero on /about/ restored after initial removal. Live site renders no hero on /about/, but team warehouse photo is a vetted Brian-provided asset that does brand work for an About page. Rebuilt as full-bleed hero with H1 overlay (vs. the original constrained 2-column treatment). Stats bar reduced from 4 to 3 stats to avoid duplicating the team-size proof point now shown in the hero photo.

---

## About Page — Non-Union Advantage Section

**Added:** 2026-05-16
**Status:** Drafted per Voice Rules. Needs Brian review before launch.
**Location:** `src/app/about/page.tsx`, H2: "Non-Union: What That Means for You"
**Present on live site:** No. The live About page mentions Brian's union background in "Our Beginnings" and calls the company "non-union" in the intro, but there is no dedicated section explaining the non-union advantage to clients.
**Rationale:** Phase 2 spec (`Phase2_Kickoff_Homepage_ServicePages.md`) explicitly calls for a non-union advantage section on /about/. Three points specified: flexibility, no jurisdiction restrictions, same crew start to finish. No live-site source exists to port from, so the section was drafted per Voice Rules.

**Drafted content:** Two paragraphs covering no trade-jurisdiction limits, same-crew commitment, and Brian's deliberate non-union choice at founding.
**Resolution needed from Brian:** Review and approve or revise. Particularly confirm whether the "same crew start to finish" claim accurately reflects how jobs are staffed.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

---

## ContactForm Project Type Dropdown — Supersedes CLAUDE.md Spec

**Added:** 2026-05-16
**Status:** Approved; CLAUDE.md updated to match.
**Location:** `src/app/contact/page.tsx` — ContactForm component
**Present on live site:** Live site has a plain CF7 form with no project type dropdown.
**Rationale:** ContactForm project type dropdown supersedes the stale list in CLAUDE.md /contact/ spec. Three options from the original spec (Cubicle Installation, Systems Furniture, Delivery & Setup) were absorbed into money page H2s during Phase 2 and no longer exist as standalone services. Dropdown reflects shipped information architecture.

**Correct options (8 services + Other):**
Commercial Furniture Installation / Office Relocation / Warehousing / Space Planning / Electrical & Voice/Data / Artwork Installation / Window Treatment / Cubicle Cleaning / Other

---

## About Page — "The On Point Advantage" Heading Simplified

**Added:** 2026-05-16
**Status:** Approved in outline review; structural change only, copy unchanged.
**Location:** `src/app/about/page.tsx`, H2 heading
**Present on live site:** The live site uses "The On Point A++++++ Advantage" as the heading.
**Rationale:** The "A++++++++" suffix is a WordPress-era marketing affectation that renders poorly in a clean typographic context. The six A-principles and their descriptions are ported verbatim; only the heading string changed.
**Source authorization:** Approved in outline review session 2026-05-16.

---

## Money Page Retrofit — Anchor Text Corrected to Prompt 11 Verbatim

**Added:** 2026-05-17
Money page retrofit anchor text corrected to Prompt 11 verbatim (`commercial furniture installation in Schaumburg` / `commercial furniture installation in Naperville`) from earlier `phase-3-prep.md` draft values (`Schaumburg furniture installation` / `Naperville furniture installation`). The draft values originated in the Phase 3 kickoff doc, which was a non-authoritative derivative of the audit prompts. Prompt 11 wins per precedence rule.

---

## Naperville CFI Page — Opening Paragraph Word Order Smoothing

**Added:** 2026-05-17
**Status:** Shipped; one-off smoothing, not a general permission.
**Location:** `src/data/cityPages/naperville-il.ts` — `openingParagraph` field
**Source:** Prompt 11, "PAGE: COMMERCIAL FURNITURE INSTALLATION + NAPERVILLE" opening paragraph
**Change:** Prompt 11 reads "downtown Naperville's office market." The data file reads "Naperville's downtown office market." Semantically equivalent; the data file phrasing reads more naturally.
**Rationale:** Minor word-order smoothing that doesn't alter meaning or keyword coverage. The substitution was flagged in session review and approved.
**Constraint — going forward:** This substitution does not authorize general voice-preference departures from Prompt 11 verbatim copy on Waukegan, Wauconda, or future city pages. Prompt 11 is verbatim source for city page copy. Substitutions on future pages require an explicit hook violation or voice-rule violation (em dash, banned phrase, etc.) as justification — not smoothing preference. Any non-rule-required departure must be flagged for review before the outline is approved.

---

## Schaumburg CFI — Service Details Closing Paragraph (Phase 4 Wave 1 Hot-Fix)

**Added:** 2026-05-18
**Status:** Shipped — initial draft `dda741f`, final shipped commit `52b4630`.
**Location:** `src/data/cityPages/schaumburg-il.tsx` — `serviceDetailsPara3` field
**Source:** `docs/phase-3-prep.md` — Schaumburg CFI retrofit spec; anchor text from Prompt 11 Naperville INTERNAL LINKING OPPORTUNITIES

**Change:** The initial Wave 1 retrofit draft (commit `dda741f`) used a single sentence: "On Point also handles [commercial furniture installation near Naperville] for clients with projects across the I-88/Route 59 corridor." Supervisor review expanded this to a two-sentence closing paragraph. The second sentence in the proposed two-sentence version contained a rhetorical tricolon ("one crew, one contact, one standard of work") that conflicts with CLAUDE.md voice rules. Resolved to a parallel couplet: "the same crew and the same standard of work."

**Final shipped copy:** "On Point also covers the I-88/Route 59 corridor to the south, including [commercial furniture installation near Naperville]. Clients with projects across both markets work with the same crew and the same standard of work."

**Anchor text:** `commercial furniture installation near Naperville` — verbatim per Prompt 11, unchanged through both revisions.

**Precedence:** Voice rules outrank SEO audit per CLAUDE.md precedence order (voice > live-site parity > audit > drafted copy). The tricolon deviation was a voice-rule violation, not a semantic or keyword deviation.

# Spec Additions — Intentional Departures from Live-Site Parity

Items in this file are features or content present in the new build that do NOT exist on the current live site (onpointinstallations.com). Each item is documented with its source authorization so it does not get flagged as invented content during content audits.

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

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

# Spec Additions — Intentional Departures from Live-Site Parity

Items in this file are features or content present in the new build that do NOT exist on the current live site (onpointinstallations.com). Each item is documented with its source authorization so it does not get flagged as invented content during content audits.

---

## Trust Bar (Homepage)

**Location:** `src/app/page.tsx`, section 2
**Present on live site:** No
**Source authorization:** Phase 2 spec — `Phase2_Kickoff_Homepage_ServicePages.md`, Section "HOMEPAGE — `/`", Page Sections item 2: "Trust bar — 5.0★ / 25 Google Reviews | 15 Years in Business | 11,000+ Projects | 12–15 Person Crew"

**Stats sources:**
- 5.0★ / 25 Google Reviews: `SITE.reviews` in `lib/constants.ts` — from live Google Business Profile
- 15+ Years in Business: `SITE.stats.yearsInBusiness` — founded 2010, per live About page
- 11,000+ Projects: `SITE.stats.projectsCompleted` — per live About page ("nearly 11,000 projects"); new build rounds to 11,000+
- 12–15 Person Crew: `SITE.stats.employees` — from live site context

**Owner:** Spec-approved; no action needed from Brian

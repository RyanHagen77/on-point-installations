# Known Issues — Polish & Content Backlog

Items flagged for resolution. Each entry has a source rule, owner, and phase.

---

## Content — Needs Real Source Material (BLOCKING for launch)

### REVIEWS — Homepage review section + /reviews/ page
**Status:** Sections not yet built. Do not populate until resolved.
**Issue:** The live onpointinstallations.com/reviews/ page renders review text via a JavaScript widget (not static HTML). Static curl fetch returns no review text. The "selfishly don't recommend" quote referenced in CLAUDE.md is an audit-identified *theme*, not a verbatim quote. Brian has approved using verbatim Google review text (see CLAUDE.md — Phase 2 Decisions), but the actual quote text has not been provided.
**Affected locations:**
- Homepage — "Why On Point" section and review snippet section are not yet built; they require real quotes
- /reviews/ page — full page build blocked
**Resolution needed from Brian:** Provide 5–10 verbatim Google review quotes with reviewer first name + last initial. Alternatively, grant access to the Google Business Profile account so reviews can be pulled directly.
**Owner:** Brian Vetter
**Phase:** Resolve before Phase 5 launch prep

---

### "No Subcontracting" — Differentiator body copy
**Status:** Headline is spec-approved. Body copy flagged as unverified.
**Issue:** Phase 2 spec lists "No subcontracting" as a key proof point. The live About page does not explicitly state this claim. Body copy was generated, not sourced.
**Resolution needed:** Brian to confirm this claim is accurate and provide preferred phrasing, OR confirm the live About page language can be used to infer it. If confirmed, body copy should be drafted from Brian's words.
**Owner:** Brian Vetter
**Phase:** Resolve before Phase 5 launch prep

---

### Contact Form Email — Destination address unverified
**Status:** Address confirmed by Brian but not yet verified as correct.
**Issue:** Brian confirmed the contact form should send to `info@onpointinstall.com` — note this is a *shorter* domain than the website (`onpointinstall.com` vs `onpointinstallations.com`). This may be a typo. If wrong, form submissions would go nowhere — silently dropped leads.
**Resolution needed:** Verify the correct email address before Phase 5 deploy. Correct options: `info@onpointinstall.com` or `info@onpointinstallations.com`.
**Owner:** Brian Vetter
**Phase:** Verify before contact form is wired in Phase 4/5

---

### SVG Logo — Phase 5 deliverable
**Status:** Using PNG logo downloaded from live site. SVG is not yet available.
**Issue:** The current logo in the build (`/images/logo.png`) is a PNG downloaded from the live WordPress site. Brian will commission an SVG file as a Phase 5 deliverable. Until then, the PNG is acceptable for staging.
**Resolution needed:** Brian to provide SVG file before Phase 5 launch prep.
**Owner:** Brian Vetter
**Phase:** Phase 5

---

### Favicon — Generated from ImageResponse, not from official brand assets
**Status:** Functional but not final.
**Issue:** `src/app/icon.tsx` generates a 32×32 maroon favicon with an "OPI" monogram using Next.js `ImageResponse`. This is a placeholder until Brian provides the official favicon file or SVG logo it can be derived from.
**Resolution needed:** When Brian provides the SVG logo (Phase 5), replace `icon.tsx` with a proper favicon generated from the brand mark.
**Owner:** Brian Vetter
**Phase:** Phase 5

---

## Visual Polish — Phase 5 Batch

### Navigation — Logo size
**Issue:** Logo is currently `h-14` (56px display height). Live site shows logo at closer to 80–90px. Increase to `h-16` or `h-20` and verify it doesn't crowd nav links on mid-width viewports.
**Phase:** Phase 5 polish pass

---

### Electrical & Voice/Data — Stock Photo License (hero image)
**Issue:** The hero/service card image (`on-point-installations-electrical-voice-data.jpg`) was sourced from the live site. Its original WP filename was `depositphotos_32139119_xl-scaled-1...` — a Depositphotos stock image.
**Action needed from Brian:** Confirm the Depositphotos license is still active and covers use on the new domain before launch. If it has lapsed or is seat-limited, replace with a job-site photo or a licensed alternative.
**Phase:** Resolve before Phase 5 launch prep

---

### Electrical & Voice/Data — High Voltage Content Image Below 1600px Rule
**Issue:** `on-point-installations-high-voltage-electrical-install.jpg` (800×700) is below the CLAUDE.md spec of 1600px on the longest edge for content photos. Sourced from `img-6417.jpg` on the live WP site — appears to be a Brian job-site photo; no higher-res version available on the server.
**Action needed:** If Brian has the original higher-resolution version of this photo, replace with it. Otherwise flag for replacement with a new job-site photo during Phase 5 photography sourcing.
**Phase:** Replace before Phase 5 launch prep

---

## Content — Drafted Copy Pending Brian Review

### Office Installations Money Page — 3 Absorbed H2 Sections
**Status:** Drafted per Voice Rules. Not sourced from live site or audit spec. Needs Brian review before launch.
**Issue:** The Office Installations page (`/services/commercial-furniture-installation-chicago-il/`) absorbs three audit-only URLs as H2 sections. No direct live-site equivalent exists for any of these three sections — the live site's Office Installations page does not break out cubicle installation, systems furniture, or delivery & setup as distinct sections. Copy was drafted in Brian's contractor voice per CLAUDE.md Voice Rules.
**Affected sections:**
- H2: "Cubicle Installation in Chicago" — body copy drafted
- H2: "Systems Furniture Installation" — body copy drafted
- H2: "Office Furniture Delivery and Setup" — body copy drafted
**Resolution needed:** Brian to review and approve or revise these three sections before Phase 5 launch prep.
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

### Office Installations Money Page — "Why Chicago Businesses Choose On Point" Section
**Status:** Partially ported from live About page; remainder drafted per Voice Rules. Needs Brian review.
**Issue:** The "Why Chicago Businesses Choose On Point Installations" H2 section draws from the live About page where possible, but the live About page doesn't have an exact equivalent differentiator block. Some copy was drafted to fill gaps.
**Resolution needed:** Brian to review the differentiator claims for accuracy (especially: non-union pricing, same-crew commitment, quote accuracy).
**Owner:** Brian Vetter
**Phase:** Review before Phase 5 launch prep

## General

*(Add items here as they are identified during Phase 2–4 builds)*

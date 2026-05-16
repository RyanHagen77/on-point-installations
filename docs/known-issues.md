# Known Issues — Polish & Content Backlog

Items flagged for resolution. Each entry has a source rule, owner, and phase.

---

## Content — Needs Real Source Material (BLOCKING for launch)

### REVIEWS — Homepage + /reviews/ page
**Status:** Placeholder shown. Do not populate until resolved.
**Issue:** The live onpointinstallations.com/reviews/ page renders review text via a JavaScript widget (not static HTML). Static curl fetch returns no review text. The "selfishly don't recommend" quote referenced in CLAUDE.md is an audit-identified *theme*, not a verbatim quote.
**Affected locations:**
- Homepage section 6 (review cards) — 3 placeholder cards currently shown
- Homepage section 4 (Why On Point pull quote) — placeholder shown
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

## Visual Polish — Phase 5 Batch

### Navigation — Logo size
**Issue:** Logo is currently `h-14` (56px display height). Live site shows logo at closer to 80–90px. Increase to `h-16` or `h-20` and verify it doesn't crowd nav links on mid-width viewports.
**Phase:** Phase 5 polish pass

---

## General

*(Add items here as they are identified during Phase 2–4 builds)*

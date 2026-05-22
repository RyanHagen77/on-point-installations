# Phase 5 Session 8 — Supervisor Handoff

Phase 5 Session 7 closed mid-session after the full 25-post inline image migration completed cleanly. The image SEO arc is complete and verified. Session 8 picks up the remaining Phase 5 work: two small image commits, contact form wiring, GTM scaffolding, sitemap regeneration, verification tasks, doc closeout, and the IntegrePro client report.

## Required reading before any action

1. `CLAUDE.md` — IMAGE SEO RULES (13 enforced) and BODY CONTENT MIGRATION RULES (8 enforced)
2. `docs/spec-gaps.md` — 7 diagnostic entries from the Phase 5 image SEO arc
3. `docs/known-issues.md` — Phase 5 open items with Session 7 resolutions applied (webhook, crop, migration entries now marked RESOLVED; modular-furniture-designs entry corrected to reflect actual accessibility)
4. `docs/design-decisions.md` — Phase 5 design decisions
5. `docs/Phase5_Kickoff_Schema_GTM_Launch_Prep.md` — full Phase 5 brief, with Session 7 amendment replacing Postmark with Nodemailer
6. `BUILD_PLAN.md` — PHASE STATUS section, specifically the Session 6 and Session 7 blocks
7. `docs/post-launch-recommendations.md` — context on what is deferred to Brian's SEO consultant, including the new blog content audit item added in Session 7

## State at handoff (2026-05-21, end of Session 7)

**Migration scope complete and verified.** All 25 published blog posts migrated. Pass 1 (featured): 23 fresh + 2 idempotent skips. Pass 2 (inline): 65 fresh + 11 from prior steps = 76 total. Zero null assets, zero missing dimensions, zero unrecovered failures. Sanity webhook active. 4:3 crop on imageGroup handler shipped and visually verified.

Latest commit on origin/main captures the Session 7 wrap doc updates (this commit).

## Outstanding Phase 5 work for Session 8

Work is grouped by execution gate: items that can ship without Brian, items gated on Brian providing something, and verification tasks.

### Group A — ships without Brian

1. **Blog index thumbnail `sizes` prop fix.** Index card images in `src/app/blog/page.tsx` render via `urlFor(...).width(800).height(450)` with no `sizes` attribute. Add appropriate `sizes` prop to prevent Next/Image from serving oversized variants on mobile. Own small commit.

2. **ImageObject schema enrichment in `src/lib/schema.ts` `buildArticleSchema`.** Current implementation emits a minimal ImageObject (url, width, height). Eight-signal item 7 calls for enrichment with `contentUrl`, `caption`, and any other fields surfaced by the audit. Confirm exact field set against the original eight-signal audit before implementing. Own small commit.

3. **Alt-text worksheet regeneration.** The original `tmp/alt-text-worksheet.xlsx` was lost between Session 6 close and Session 7 open (gitignored, not retrieved off the worker). Regenerate from current Sanity state: GROQ for current alt values + originalFilename + asset URLs across all 25 posts; WXR for surrounding paragraph context. The 44-row count may be slightly different now since all 25 posts have completed inline migration — enumerate every image (featured + inline) whose alt is empty, single-character, filename-derived, or camera-timestamp-derived. Save off-worker durably.

4. **Sitemap regeneration + canonical alignment.** `public/sitemap-0.xml` was generated 2026-05-20 (Session 5) and contains only 3 blog slugs; the 22 additional posts migrated since are missing. Sitemap URLs also have no trailing slashes while canonical URLs throughout the site use trailing slashes — a canonical/sitemap mismatch. Either add `trailingSlash` to next-sitemap.config.js or remove trailing slashes from canonical metadata; align then regenerate. Own commit.

5. **GTM placeholder scaffolding.** Brian creates the GTM container next week. Until he provides the GTM-XXXXXXX ID, scaffold the wiring in `src/app/layout.tsx` using a placeholder constant pattern that reads from `gtmId` in `src/lib/constants.ts`. Layout should conditionally render the GTM snippet only if `gtmId` is a non-empty value, so a placeholder empty string is a safe no-op. When Brian provides the ID, the change is a one-line constants.ts update — no layout changes needed at that point. Initialize `window.dataLayer = window.dataLayer || []` in the layout snippet so the existing `contact_form_submit` dataLayer push in ContactPageClient.tsx stops firing into void.

6. **Phase 5 closeout doc updates.**
   - `BUILD_PLAN.md` — Add Session 7 block using Lanes/Validations/Carry-forward structure. After Session 8 work ships, update Phase 5 PHASE STATUS row to COMPLETE with final commit hash and date.
   - `docs/content-source-map.md` — Currently still says "1 of 25 migrated with inline images." Update to reflect full migration. Review per-post notes for any divergences from default methodology surfaced during the full 23-post run (most should follow default and need no entry).
   - `docs/known-issues.md` — Continue closing resolved entries as Session 8 work completes.

### Group B — gated on Brian

7. **Nodemailer contact form wiring.** Destination address locked at `info@onpointinstall.com`. Brian provides SMTP host details and credentials (or generates app password if Gmail/Workspace). Once provided: install nodemailer + @types/nodemailer, add SMTP env vars to Vercel, wire `src/app/api/contact/route.ts` to send via the transporter, verify delivery from a staging test submission. See Phase5_Kickoff amendment for full implementation steps.

8. **GTM container creation.** Brian creates a GTM container and provides the GTM-XXXXXXX ID. Once provided: update `gtmId` in `src/lib/constants.ts`. The scaffolding from Group A item 5 means no other code changes are needed — the conditional render in layout fires automatically when the ID is non-empty.

9. **Confirm Brian's Sanity Studio access.** Ryan reports Brian was invited; needs verbal confirmation that he can log in at sanity.io/manage and edit content. No developer work — just confirmation.

10. **Wikidata Q-URL in sameAs.** Phase5_Kickoff completion criteria flags this. Entity does not exist yet. Brian or IntegrePro creates the Wikidata entity; once the Q-number exists, add the canonical Q-URL to the `sameAs` array in `src/lib/constants.ts`. Not a Phase 5 close blocker if the entity creation runs long — can be deferred to post-launch.

### Group C — verification tasks (not code)

11. **Rich Results Test re-run.** Sessions 5–7 changed schema-rendering surfaces (ArticleSchema image enrichment, inline image block type). Re-run on homepage, one service page, one blog post, and /about/ per Phase5_Kickoff criteria. Zero errors target.

12. **Lighthouse re-run.** Phase5_Kickoff criteria calls for homepage, primary service page, blog index, one blog post. Phase 2 hit Performance > 85 on homepage. Re-verify after all Phase 5 additions. Capture scores for the IntegrePro client report.

13. **OG tag verification.** Use opengraph.xyz on homepage and primary service page per Phase5_Kickoff criteria.

### Group D — final deliverable

14. **IntegrePro client report for Brian.** Phase 5 delivery summary with Lighthouse/Rich Results validation results, post-launch handoff package (`docs/post-launch-recommendations.md` summary), and remaining Brian-side actions (SVG logo, replacement images for 10 small/phone-photo featured posts, alt text authoring on regenerated worksheet, GTM container, SMTP credentials, content audit handoff to SEO consultant).

## Recommended Session 8 sequence

1. Group A items 1, 2 (small image commits — Lighthouse depends on these)
2. Group A item 4 (sitemap regen — single commit, deploy-green check)
3. Group A item 5 (GTM placeholder scaffolding — single commit)
4. Group A item 3 (alt-text worksheet regeneration — off-critical-path, can interleave)
5. Group C items 11, 12, 13 (verification tasks — produce numbers for client report)
6. Group A item 6 (closeout doc updates — capture final state)
7. Group D item 14 (IntegrePro client report — last)
8. Group B items 7, 8, 9 — execute whenever Brian provides what's needed. May not all land in Session 8.

Phase 5 closes COMPLETE when Groups A, C, and D are done. Group B items can be tracked as Brian-pending and don't block close-out — Phase 5 ships with placeholder GTM and the Nodemailer wiring queued.

## Working principles (carry forward unchanged)

- Audit prompts in `docs/seo-audit/` authoritative
- Voice rules > live-site parity > SEO audit > drafted copy
- Outline-before-draft on structural decisions
- One commit at a time, pre-commit hook mandatory
- Worker can't read `.env.local`
- Don't paste secret values to chat
- Plain-English summaries on technical routing
- Vercel-deploy-green gate on source-touching commits
- Source-of-truth Sanity query after every migration run, dereferencing asset references
- Scope-enumerate before declaring a session done

## Opening move for Session 8

Confirm HEAD commit hash and Vercel deploy status. Read the Session 7 wrap commit (this commit) for full Session 8 surface. Confirm with Ryan which Group B items have Brian-side prerequisites resolved (or assume none until Ryan reports otherwise). Then proceed with Recommended Session 8 sequence.

---

End of file.

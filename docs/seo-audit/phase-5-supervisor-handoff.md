# Phase 5 Image SEO Pass — Supervisor Handoff

You're taking over a Phase 5 image SEO pass mid-arc. The previous supervisor closed the session after Step A-live executed cleanly on one post and after the documentation arc updated the project's existing docs with diagnostic lessons. This document gives you operational state and immediate next steps. The institutional knowledge lives in the existing doc ecosystem — read it before touching anything.

## Required reading before any action

1. `CLAUDE.md` — IMAGE SEO RULES (rules 7-10 added this session) and BODY CONTENT MIGRATION RULES (new section added this session). These are enforced project rules, not advice. Eight migration rules cover failure modes that have already shipped regressions twice.

2. `docs/spec-gaps.md` — diagnostic chain for seven Phase 5 gaps. Each entry explains the symptom, the wrong assumption that produced it, the actual mechanism, and the fix. The patterns are transferable — recognize them before they recur.

3. `docs/known-issues.md` — six open Phase 5 items. Some block remaining migration runs (webhook configuration, crop decision); others are deferred to post-launch (alt text worksheet, external link audit).

4. `docs/design-decisions.md` — four decisions made this session: filename strategy as platform constraint, blog inline image width (Option B, exception to CLAUDE.md rule 11), gallery layout via render-layer adjacency detection, WXR-driven migration source.

## State at handoff (2026-05-21)

HEAD on origin/main: latest commit is the documentation arc closeout. Confirm hash on arrival.

Step A-live executed on one post:
- `how-to-survive-office-downsizing` migrated successfully
- 1 featured image re-uploaded (originalFilename slug-derived, public URL still content-hashed per platform constraint)
- 6 inline images uploaded as Portable Text image blocks
- Body rewritten with byline strip, link substitutions, image block insertion
- Rendering verified on Vercel preview with gallery grouping applied
- Page-level `export const revalidate = 86400` added in `src/app/blog/[slug]/page.tsx`

Step B-live and full migration not executed. Remaining slugs: 24.

Operational gaps blocking remaining runs:
- Sanity webhook not configured (manual revalidation required after each Sanity write until configured)
- Inline image crop decision pending (4:3 / 3:2 / 16:9 — affects `imageGroup` handler)

## Immediate next steps

1. Verify state. Confirm HEAD commit hash, confirm `how-to-survive-office-downsizing` renders correctly on Vercel preview, confirm `tmp/alt-text-worksheet.xlsx` has been retrieved by Ryan and saved durably (the file is gitignored).

2. Ryan configures Sanity webhook. Setup steps:
   - sanity.io/manage → On Point Installations project (hwyx6cco) → API → Webhooks → Create webhook
   - URL: https://on-point-installations.vercel.app/api/revalidate (update to production domain post-Phase-6)
   - Filter: `_type == "blogPost"`
   - Triggers: Create + Update + Delete
   - Secret: matches SANITY_REVALIDATE_SECRET in Vercel env
   - Test with a trivial Studio edit; confirm webhook log shows 200 from Vercel
   - Required before remaining migration runs proceed

3. Ryan and supervisor agree on inline image crop aspect ratio. Default recommendation: 4:3 (closest to typical phone-photo orientation, mild crop on landscape sources). Other options: 3:2 (DSLR-standard, modest crop on phone sources) or 16:9 (wide cinematic, aggressive crop). One-line change to `imageGroup` handler in `src/app/blog/[slug]/page.tsx` — modify `urlFor()` call to include `.fit('crop')` with target dimensions.

4. Step B-live. Run `pnpm tsx scripts/migrate-inline-images.ts --slug=modular-furniture-designs`. Expected behavior: featured image fetch returns 403 (source deleted from WP), handler logs and skips with manifest flag `featured_status: source_deleted_replacement_needed`, leaves existing Sanity featuredImage reference untouched. 5 inline images fetch successfully via WXR attachment lookup.

5. Source-of-truth verification on Step B. GROQ query confirms body image count, dereferences asset URLs, confirms featured reference intact. Visual verification on Vercel preview.

6. Full run on remaining 23 slugs. Single batch invocation (no --slug filter) or per-slug iteration — supervisor judgment. Manifest emits incrementally per post. Source-of-truth GROQ verification across all 25 after run.

7. Remaining eight-signal items (small commits each):
   - Blog index thumbnail `sizes` prop
   - `ImageObject` schema enrichment in `src/lib/schema.ts` `buildArticleSchema`

8. Closeout updates. Update `docs/build_plan.md` with Phase 5 status. Update `docs/content-source-map.md` to include the 25 blog posts and their content source notes. Produce IntegrePro client report for Brian capturing Phase 5 delivery, remaining Brian-side actions, and post-launch handoffs to SEO consultant.

## Working principles (carry forward unchanged)

- Audit prompts in `docs/seo-audit/` authoritative
- Voice rules > live-site parity > SEO audit > drafted copy
- Outline-before-draft on structural decisions
- One commit at a time, pre-commit hook mandatory
- Worker can't read `.env.local`
- Don't paste secret values to chat
- Plain-English summaries on technical routing
- Vercel-deploy-green gate on source-touching commits
- Dry-run protocol mandatory before full migration: happy-path slug + expected-fail slug, output to `/tmp` first, supervisor reviews before live writes
- Source-of-truth Sanity query after every migration run, dereferencing asset references — not top-level only
- Scope-enumerate before declaring a session done

## Operating posture

Brian's previous SEO consultant Nancy still has access to him and will audit the rebuild post-launch for findings to flag back. The defensive posture is real but informed by the diagnostic lessons this session captured. Specifically:

- Filename hashing is not the audit-defense lever the original onboarding framed it as. The stronger user-visible signals are alt text, schema, dimensions, format, gallery layout, link integrity, and visible content.
- If Nancy raises content-hashed URLs as a finding, the response is documented in `docs/post-launch-recommendations.md` under "Platform characteristics" — Sanity is content-addressed storage, this is consistent across headless CMS stacks, not a missed optimization.
- Post-launch content tasks (44 alt text strings, external link audit, internal link insertion, meta description rewrites) are tracked in `docs/post-launch-recommendations.md` and are Brian's SEO consultant's scope, not migration scope. The rebuild closes Nancy's billing surface on technical work; remaining items are correctly content/editorial.

## Documentation arc completed in this session

The following docs were updated or created in the documentation arc that closed this session:
- `CLAUDE.md` — IMAGE SEO RULES 7-10 added, BODY CONTENT MIGRATION RULES section added
- `docs/spec-gaps.md` — 7 diagnostic entries from Phase 5 image SEO arc
- `docs/known-issues.md` — 6 Phase 5 open items
- `docs/design-decisions.md` — 4 Phase 5 design decisions
- `docs/seo-audit/phase-5-supervisor-handoff.md` — this file
- `docs/post-launch-recommendations.md` — post-launch content and configuration tasks (forthcoming in this arc)
- `docs/build_plan.md` — Phase 5 status update (forthcoming in this arc)
- `docs/content-source-map.md` — blog post source notes (forthcoming in this arc)

Read each before assuming any prior framing of Phase 5 scope or methodology still applies.

---

End of file.

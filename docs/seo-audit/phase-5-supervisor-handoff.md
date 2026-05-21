# Phase 5 Image SEO Pass — Session 8 Supervisor Handoff

Session 7 closed the migration arc. All 25 posts are migrated. This document is the onboarding for the session that closes out Phase 5 and delivers the client report.

## State at handoff (Session 7 end)

**Migration arc: complete.**

- Full batch run processed all 25 posts in a single invocation
- 76 total inline images confirmed via GROQ dereferencing across all 25 posts
- 0 upload failures in the batch run
- imageGroup 4:3 crop committed and deployed (commit: `blog: apply 4:3 crop to imageGroup gallery rendering`)
- Sanity webhook configured and active (configured mid-session before full batch run)
- All 25 posts verified via source-of-truth GROQ queries dereferencing asset references

**Pass 1 (featured images):**
- 23 posts: `ok` — featured image re-uploaded with slug-derived `originalFilename`
- 2 posts: `skipped_existing_asset` — already had slug-derived asset from prior migration pass
- `modular-furniture-designs`: uploaded successfully at 1200×800 (below 1600 px threshold — quality issue, not migration failure; tracked in known-issues.md and post-launch-recommendations.md)

**Pass 2 (inline body images):**
- 23 posts: `ok` — inline images uploaded, body patched
- 2 posts: `skipped_collision` — `how-to-survive-office-downsizing` (6 images, Step A) and `modular-furniture-designs` (5 images, Step B) already migrated; collision guard correctly preserved them
- 65 inline images uploaded in batch run; 6 + 5 from earlier runs = 76 total

**Head on origin/main:** Session 7 mid-session wrap commit. Confirm hash on arrival.

**Vercel:** deploy was green after the imageGroup crop commit. Confirm ● Ready on arrival before any new commits.

## Required reading before any action

1. `CLAUDE.md` — IMAGE SEO RULES and BODY CONTENT MIGRATION RULES. Both sections are live and enforced.

2. `docs/known-issues.md` — review for any items that Session 7 resolved and have not yet been closed out. The modular-furniture-designs "WP Source Deleted" entry was corrected in the Session 7 wrap commit.

3. `docs/post-launch-recommendations.md` — the 10-item priority list for SEO consultant and Brian. Blog content audit added as item 4 in Session 7 wrap.

## Outstanding Phase 5 work

All items below are required before Phase 5 is declared complete and before the client report ships.

### Small commits (code)

**1. Blog index thumbnail `sizes` prop.**
The blog index page (`src/app/blog/page.tsx` or equivalent) renders featured image thumbnails. The `sizes` attribute likely does not match the actual rendered width of the card grid. Fix to reflect actual breakpoint widths. Small commit, one file.

**2. `ImageObject` schema enrichment.**
`src/lib/schema.ts` `buildArticleSchema` function currently emits a minimal `image` field (URL only). Enrich to full `ImageObject` with `url`, `width`, `height`, and `caption` where available. Requires reading the current `buildArticleSchema` implementation and the Sanity `postQuery` in `src/app/blog/[slug]/page.tsx` to confirm which dimension data is already available at render time. Small commit, targeted to `src/lib/schema.ts` and possibly `src/app/blog/[slug]/page.tsx`.

### Alt text worksheet

`tmp/alt-text-worksheet.xlsx` is gitignored and was lost between sessions. It must be regenerated before the client report ships — Brian's SEO consultant needs it. The worksheet has two sections: Section A (30 inline images with empty or placeholder alts) and Section B (22 featured images with filename-derived alts). Regeneration requires a GROQ query across all 25 posts pulling body image alt values and featured image alt values, then formatting into a spreadsheet. Coordinate with Ryan on tooling for the xlsx generation.

### Phase 5 closeout docs

**`BUILD_PLAN.md`** — add Session 7 status block documenting migration arc completion. Match the format of prior session blocks.

**`docs/content-source-map.md`** — add entries for the 25 migrated blog posts noting that body content was preserved from WXR source with byline strip, retired-URL link substitutions, and internal cross-link insertions where text patterns matched. Note image migration pass completed Session 7.

**`docs/known-issues.md`** — close out items that Session 7 resolved:
- Sanity webhook (configured mid-Session 7, verify it is marked resolved)
- Inline image crop decision (resolved: 4:3, committed)
- Blog inline image aspect ratio entry (same)
- Review all remaining open items for accuracy against current state

### IntegrePro client report for Brian

Deliver a plain-English summary covering:
- What Phase 5 delivered: 76 inline images migrated, 25 featured images migrated with slug-derived filenames, gallery rendering, 4:3 crop, schema enrichment
- What Brian needs to do before launch (Phase 6 cutover): SVG logo, modular-furniture-designs replacement image, Sanity webhook URL update after cutover
- What Brian's SEO consultant should do post-launch: the 10-item priority list from `docs/post-launch-recommendations.md`, verbatim or summarized
- What is handled automatically: ISR revalidation via Sanity webhook, ImageObject schema, alt fallbacks

Tone: plain-spoken, contractor voice. Not a technical report — a handoff memo Brian can read in five minutes.

## Opening move for Session 8

1. Pre-flight recon (read-only):
   - Confirm HEAD commit hash and Vercel ● Ready
   - Confirm all 25 posts render on production (spot-check 3: `how-to-survive-office-downsizing`, `modular-furniture-designs`, one third slug)
   - Confirm Sanity webhook active: check sanity.io/manage → project hwyx6cco → API → Webhooks → verify webhook URL and last delivery status
   - Read `docs/known-issues.md` current state

2. Proceed to small commits in order: blog index `sizes` prop, then `ImageObject` schema enrichment.

3. After both small commits are green on Vercel, proceed to alt text worksheet regeneration and closeout docs.

4. Client report last — after all docs are accurate.

## Working principles (carry forward unchanged)

- Audit prompts in `docs/seo-audit/` authoritative
- Voice rules > live-site parity > SEO audit > drafted copy
- One commit at a time, pre-commit hook mandatory
- Worker can't read `.env.local`
- Don't paste secret values to chat
- Vercel-deploy-green gate on source-touching commits
- Source-of-truth Sanity GROQ query after every migration run, dereferencing asset references
- Scope-enumerate before declaring a session done

## Post-launch posture

Brian's previous SEO consultant Nancy will audit the rebuild post-launch. The defensive posture is documented. Specifically:

- Content-hashed image URLs are not a deficiency. The response is in `docs/post-launch-recommendations.md` under "Platform characteristics." Use it verbatim if Nancy flags it.
- The 44 alt text items are the highest-value post-launch task. The worksheet gets her there — regenerating it is not optional.
- Post-launch content tasks are Brian's SEO consultant's scope, not migration scope. The rebuild closes the technical surface.

---

End of file.

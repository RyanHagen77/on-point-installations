# Phase 5.5 Kickoff — Project Gallery Migration and Phase 5 Closeout

**Phase:** 5.5
**Status:** In progress
**Opened:** 2026-05-22
**Predecessor:** Phase 5 (Session 8 closed with Lighthouse 100/100/100/100 evidence)
**Successor:** Phase 6 (launch prep, currently blocked until Phase 5.5 ships)

---

## Why Phase 5.5 exists

Phase 5.5 was not in the original phase plan. It surfaced late in Phase 5 Session 8 as a scope miss inherited from Phase 4: the project gallery page exists in the routing scaffold as a stub, components are written but unwired, and zero project content has been migrated from the legacy WordPress site. Phase 6 opens with the line "Phases 1 through 5 are complete, the site is fully built." That statement is incorrect as written, and Phase 5 cannot honestly flip to COMPLETE until Phase 5.5 ships migrated project content, a working contact form, and a reconciled closeout.

Phase 5.5 is structured as a multi-session arc (3 to 5 sessions). It is not a single-session push. The scope is bounded, the patterns are proven from Phase 5 blog migration, and the sequencing is designed to prevent the batch-ship drift that occurred at the end of Session 8.

---

## Scope

Five workstreams sit inside Phase 5.5. Each is named explicitly so scope expansion mid-phase requires a supervisor decision, not a worker judgment call.

**Project gallery migration.** Nine published project entries in the WXR migrate to a new Sanity `project` document type. Featured images and inline body images route through the Sanity asset pipeline. The /project-gallery/ index page wires to GROQ. The /project/[slug]/ detail page wires to GROQ. ProjectCard and ImageGallery components swap from plain string sources to Sanity asset references. Visual verification on Vercel preview before the migration is declared complete.

**Nodemailer contact form wiring.** The contact route at /api/contact wires to Microsoft 365 SMTP via Nodemailer. The destination is locked at info@onpointinstall.com. Env var names and route logic ship in Session 2 or 3 with placeholder credentials. Real credentials swap into Vercel during Session 5 closeout once Brian delivers the app password. Honeypot bot trap and rate limit included. Graph send-mail is the documented fallback if M365 tenant policy blocks SMTP AUTH.

**Alt-text worksheet regeneration.** The original worksheet was lost between Session 6 and Session 7. The regenerated version covers all 25 migrated blog posts and the 9 migrated project entries. Approach is hybrid: worker drafts the GROQ plus WXR cross-reference script, Ryan executes against Sanity locally. Output saves to tmp/ (gitignored) and copies to a durable Ryan-side location.

**Closeout reconciliation.** A single closeout commit lands at the end of Phase 5.5 covering BUILD_PLAN.md status changes (Phase 5 to COMPLETE, Phase 5.5 to COMPLETE), content-source-map.md additions, known-issues.md cleanup of claims-not-evidence carry-forwards, spec-gaps.md Session 8 drift entry, post-launch-recommendations.md additions, and the Phase 6 kickoff line correction.

**CLAUDE.md size pass.** Current file is 1,006 lines and 58,033 characters against a 40,000 character soft ceiling. Historical sections archive to a sibling doc. The active file retains only currently enforced rules. Reduces context compaction risk for the remainder of Phase 5.5 and all of Phase 6.

What is explicitly out of scope: the 8 service post type entries in the WXR (full-site export artifact, not real content), any new features beyond what was already scaffolded, any visual redesign of the gallery or detail pages, any blog content edits beyond the single link restoration in modular-furniture-designs.

---

## Decisions locked from Session 8

These are restated here so they do not drift mid-phase. Any deviation requires a supervisor decision in chat.

**Single content type with index and detail.** The gallery is one content type, 9 entries, index at /project-gallery/, detail at /project/[slug]/. Not a separate case studies arc. Mirrors current-site URL structure.

**Stock photos: migrate and flag for replacement.** Two confirmed stock images in the WXR (adobestock_116301466.jpg on the Park Ridge modular project, pexels-photo-374016.jpeg on the restaurant project) migrate with their projects. Both log to post-launch-recommendations.md as Brian-replacement items. The blog-post image set gets the same sweep, same flag-list, no code change.

**Low-resolution images: migrate as-is, flag for replacement.** The restaurant project's images are img_NNNN-300x225.jpeg WordPress crops with no larger source. They ship as-is. They log to post-launch-recommendations.md as Brian-replacement items.

**Thin-content project (ais-divi, 175 words): migrate as-is, flag for SEO expansion.** Folds into the existing "Blog content audit across all 25 migrated posts" item in post-launch-recommendations.md. The item renames to cover projects too.

**WXR service post type: out of scope.** 8 entries, full-site export artifact, not part of Phase 5.5.

**Nodemailer destination locked at info@onpointinstall.com.** Postmark to Nodemailer pivot was authorized during Phase 5. Do not re-litigate.

---

## Migration approach

Mirror of the Phase 5 blog migration pattern, which shipped 25 posts cleanly:

1. Sanity `project` schema design and commit
2. GROQ queries for listing and detail
3. WXR-driven migration script (featured images first, body content plus inline images second)
4. Dereferenced GROQ verification after every write batch
5. Visual spot-check on at least one rendered project detail page on Vercel preview before declaring migration complete

The WXR at repo root is the source of truth. The live site is reference only. Where the WXR and live site diverge, the WXR wins unless a supervisor decision overrides.

---

## Sanity schema design

The `project` document type ships with the following fields. Best practices, mirrored against the current site's apparent structure.

- `title` — string, required
- `slug` — slug type, required, sourced from title with manual override
- `summary` — text, required, used on index card and seeds meta description
- `featuredImage` — image with hotspot, alt text required, used on index card and detail hero
- `body` — Portable Text array, includes inline image blocks with alt and optional caption
- `imageGallery` — array of image objects with alt and optional caption, renders through ImageGallery component with lightbox
- `completedDate` — date, optional, sourced from WXR pubDate as fallback when project content does not specify
- `location` — string, optional, captures city or city-and-state when content references it
- `relatedBlogPosts` — array of references to blogPost documents, optional, empty by default, populated manually post-migration

Excluded from v1: `clientName` (current site does not name clients in most projects), `projectValue` (not present in WXR or live site), `testimonial` (handled at site level, not per-project).

Schema commit lands in Session 2 along with GROQ queries.

---

## Component wiring

Components exist and need the type swap from plain strings to Sanity asset references.

- `src/components/ui/ProjectCard.tsx` — currently typed `src: string`, swaps to Sanity image reference with hotspot support
- `src/components/ui/ImageGallery.tsx` — currently typed `src: string` array, swaps to array of Sanity image references, lightbox preserved
- `src/types/project.ts` — type definitions update to match new schema

Index page at `src/app/project-gallery/page.tsx` wires to GROQ listing query. Detail page at `src/app/project/[slug]/page.tsx` wires to GROQ detail query, ISR pattern mirrored from blog detail pages. BreadcrumbList schema renders on detail pages. Per-project schema (CreativeWork or similar) ships if appropriate after a quick check; if not, BreadcrumbList alone suffices.

---

## Nodemailer plan

Implementation path:

1. `nodemailer` and `@types/nodemailer` to package.json
2. Vercel env vars: `SMTP_HOST` (smtp.office365.com), `SMTP_PORT` (587), `SMTP_USER` (info@onpointinstall.com), `SMTP_PASS` (M365 app password). Placeholders for code commit, real values added to Vercel during Session 5.
3. `src/app/api/contact/route.ts` wires the transporter, validates form fields, sends to info@onpointinstall.com
4. Honeypot field on the form, server-side rate limit on the route
5. Test submission from Vercel preview before declaring done (deferred to Session 5 when real credentials are present)

Brian-side prerequisites tracked separately: SMTP AUTH confirmation on the mailbox, app password generation, secure delivery of the app password (Ryan adds to Vercel directly, not pasted in chat).

Fallback if tenant policy blocks SMTP AUTH: Microsoft Graph send-mail via registered Azure application. Documented as fallback only, not coded unless triggered.

---

## Alt-text worksheet regeneration

Hybrid execution path. Worker drafts a script combining:

- A GROQ query across all `blogPost` and `project` documents pulling current alt text, asset `originalFilename`, and asset URL
- A WXR cross-reference pulling surrounding paragraph context for each image
- Output formatted as xlsx

Ryan executes the script against Sanity locally with a read-only token. Output saves to `tmp/alt-text-worksheet.xlsx` (gitignored) and copies to a durable Ryan-side location.

This is not a commit-bearing workstream. It is a deliverable artifact.

---

## Blog to project link restoration

One blog post (`modular-furniture-designs`) contains 2 stripped `/project/[slug]/` links in its Portable Text body. Both restorable after project migration completes:

- Park Ridge link: exact match against migrated slug
- Downers Grove link: old slug `complete-office-system-installationdowners-grove-il` is missing a hyphen, canonical is `complete-office-system-installation-downers-grove-il`. Manual slug correction during restoration.

Restoration is a single Portable Text edit on `modular-furniture-designs` in Sanity. Lands with the closeout commit, not as a separate commit, since it is content not code.

---

## DEAD_LINK_PREFIXES script change

The Phase 5 blog migration script contains a `DEAD_LINK_PREFIXES` table that includes `/project/`. With project entries now live, that prefix is no longer dead and should not be stripped on future runs. One-line removal lands in the same commit as the closeout, paired with the script change so the table reflects post-Phase-5.5 state.

---

## Closeout commit contents

Single closeout commit at the end of Phase 5.5. Touches the following files:

- `BUILD_PLAN.md` — Phase 5 status set to COMPLETE with final commit hash. Phase 5.5 status set to COMPLETE with final commit hash. Phase 6 row updated if needed.
- `docs/content-source-map.md` — 9 project entries added with WXR source paths, Sanity slugs, and migration verification notes.
- `docs/known-issues.md` — reconciliation of Session 8 carry-forwards. Remove stale "remaining items" lines. Align with what actually shipped. Add new items if Phase 5.5 surfaced any.
- `docs/spec-gaps.md` — Session 8 drift-pattern entry if not already shipped at Phase 5.5 open.
- `docs/post-launch-recommendations.md` — stock photo flag list (gallery and blog), low-res image flag list (restaurant project), thin-content flag (ais-divi project), any others surfaced during migration.
- `docs/Phase6_*.md` — kickoff line correction: "Phases 1 through 5.5 are complete" replaces "Phases 1 through 5 are complete." Verify the exact wording in context at closeout time.
- `migration-script.js` (or equivalent) — `DEAD_LINK_PREFIXES` table: remove `/project/`.

The closeout commit does not ship code or content. It is documentation reconciliation plus the one-line script change.

---

## Session sequencing

Sessions flex based on Brian's delivery timeline for the app password. Baseline plan:

**Session 1 (this session).** Pre-flight recon. Gitignore WXR pattern (commit 4186132). Kickoff doc and BUILD_PLAN Phase 5.5 row. Email to Brian for SMTP AUTH plus app password (drafted in supervisor chat, Ryan sends).

**Session 2.** Sanity `project` schema design and commit. GROQ listing and detail queries. Sanity Studio confirmation that the schema renders for editing. Possible interleave: Nodemailer route handler with placeholder env vars, if Brian has not delivered yet.

**Session 3.** Migration script: featured images pass. Migration script: body content plus inline images pass. Dereferenced GROQ verification across all 9 entries. Nodemailer interleave continues here if not landed in Session 2.

**Session 4.** Wire /project-gallery/page.tsx and /project/[slug]/page.tsx to GROQ and components. BreadcrumbList schema and per-project schema decision. Visual verification on Vercel preview.

**Session 5 (closeout).** Blog-to-project link restoration in modular-furniture-designs. DEAD_LINK_PREFIXES script change. Nodemailer credential swap into Vercel (assumes Brian has delivered). Alt-text worksheet regeneration (hybrid). CLAUDE.md size pass. Phase 5.5 closeout commit. Phase 5.5 client report drafted in supervisor chat for Brian. This is the report that ships, replacing the unauthorized 7eee607 (which was removed from working tree in d72d481 but remains in history).

---

## Working principles

Carried from Phase 5 and tightened post-Session-8:

One commit at a time. No batch-ship sequences. Worker fires one prompt per commit and waits for explicit supervisor authorization before the next.

Two-round pattern (recon, then edit) for any commit touching multiple files or requiring data discovery.

Worker never self-authorizes scope. Discovered problems get surfaced and stopped on. Supervisor decides fix-in-scope, defer, or carry forward.

Worker never writes client-facing copy. Reports, emails, and external communications are supervisor-drafted in chat.

Verification evidence saves to disk and commits as part of the verification work. No "verified" claims without backing artifacts in the repo.

Every commit prompt requires `git log -1 --oneline` post-commit and `git log origin/main -1 --oneline` post-push in the report-back, verbatim.

Pre-flight recon at the start of every session, read-only, confirms HEAD, working tree state, and any expected file markers from the prior session.

Source-of-truth Sanity query after every migration write batch, dereferencing asset references.

Voice rules outrank live-site parity. Live-site parity outranks SEO audit. SEO audit outranks drafted copy.

No em-dashes anywhere in code, comments, commit messages, or docs. Review-enforced.

---

## Verification methodology

**Schema commit (Session 2).** Sanity Studio loads. New `project` document type appears. All fields render for editing. No console errors.

**Migration write batches (Session 3).** After each batch, dereferenced GROQ query returns expected count. Asset references resolve. originalFilename matches WXR source. Alt text present on all images.

**Component wiring (Session 4).** Index page renders 9 cards on Vercel preview. Detail page renders for at least 2 spot-checked slugs on Vercel preview. ImageGallery lightbox opens. Internal links work.

**Closeout (Session 5).** All documentation files modified are diffed and reviewed. BUILD_PLAN status changes are visible. Phase 6 kickoff line correction is verified in context. Link restoration is verified by anchor click on Vercel preview.

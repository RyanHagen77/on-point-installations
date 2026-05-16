# Dev Environment Setup — On Point Installations

One-time setup steps for a new clone of this repo. Each section below is something you do once per machine, not per session.

---

## Prerequisites

- **Node.js** — check `.nvmrc` or `package.json` `engines` field for required version
- **Vercel CLI** — install globally: `npm i -g vercel`
- **Git** — any recent version

---

## 1. Install dependencies

```bash
npm install
```

---

## 2. Link the Vercel project

This tells the Vercel CLI which project and team to use for deployments and inspection.

```bash
vercel link
```

What to expect:
- CLI asks: "Set up and deploy?" → No (just linking, not deploying)
- CLI asks: which scope → select `ryanhagen77s-projects`
- CLI asks: link to existing project → Yes → `on-point-installations`

What gets created:
- `.vercel/project.json` — stores `projectId`, `orgId`, and `projectName`
- `.vercel/` is in `.gitignore` — it is never committed

Verify the link worked:

```bash
cat .vercel/project.json
# Should output: {"projectId":"prj_...","orgId":"team_...","projectName":"on-point-installations"}
```

---

## 3. Activate the pre-commit voice hook

The repo includes a voice quality hook at `.githooks/pre-commit`. Git does not activate hooks in non-default directories automatically.

```bash
git config core.hooksPath .githooks
```

This is a local-only config setting (stored in `.git/config`). It does not affect other repos and does not need to be repeated if you've done it once on this machine for this repo.

Verify:

```bash
git config core.hooksPath
# Should output: .githooks
```

---

## 4. Confirm the dev server runs

```bash
npm run dev
```

The site should be available at `http://localhost:3000`.

---

## Reading `vercel ls` output — confirming a deployment

`vercel ls` lists recent deployments newest-first. The Vercel CLI does not show git commit SHAs directly. To confirm a specific commit deployed:

**Step 1** — note the commit timestamp from git:
```bash
git log origin/main -1 --format="%H %ci"
# Example: d52f9f3 2026-05-16 09:54:56 -0500
```

**Step 2** — run `vercel ls` and look at the Age column:
```
Age     Deployment                                               Status    Environment
4m      https://on-point-installations-qq7bqep08-...vercel.app  ● Ready   Production
```

**Step 3** — the deployment should be timestamped within 30–60 seconds of the git push. If the `vercel ls` age and the git push time match up and the status is `● Ready`, that deployment corresponds to your push.

**Step 4** — optionally confirm with `vercel inspect`:
```bash
vercel inspect <deployment-url>
# Check the `created` field — it should be a few seconds after your push.
```

**The canonical staging URL** for this project is:
```
https://on-point-installations.vercel.app
```

This alias always points to the latest production deployment. If you need to check a specific deployment, use its unique URL from `vercel ls`.

**What "Ready" means:** the build succeeded and the deployment is serving traffic. If it shows `● Error`, check `vercel logs <deployment-url>` for the build error.

---

## What to do when the pre-commit hook fires

The hook checks staged `.tsx`, `.ts`, and `.mdx` files against a list of banned voice patterns (em dashes, AI tells, prohibited phrases). Output looks like:

```
  VOICE VIOLATION — pattern: "look no further"
  File: src/app/services/example/page.tsx
    42:    <p>When you need a partner, look no further than...</p>

Commit blocked: voice violations found above.
Fix the copy, re-stage, and commit again.
Do not use --no-verify without explicit supervisor approval.
```

**The fix is always to rewrite the copy.** Find the flagged line, replace the banned pattern with prose that says the same thing without the pattern, re-stage the file, and commit again.

**The hook matches comments too.** It scans the full staged file, not just JSX output. If a banned pattern appears in a code comment — for example, a comment that quotes the pattern to explain what was changed — paraphrase the comment so it describes the issue without reproducing the string. "Removed AI tell from intro" is fine. Quoting the specific phrase is not.

**Do not use `--no-verify`** unless you have explicit supervisor approval. Bypassing the hook without approval defeats the purpose of having it.

To add a new pattern to the hook: add a line to `.githooks/voice-patterns.txt` (literal string, no regex) and commit the file.

---

## Deployment verification — run after every push

Per `CLAUDE.md`, after every `git push`:

```bash
git fetch origin && git log origin/main..HEAD --oneline
```

- **Empty output** → push succeeded; `origin/main` is current
- **Non-empty output** → push failed silently; retry before proceeding

Then confirm the commit hash and timestamp:

```bash
git log origin/main -1 --format="%H %ci"
```

Match this against the Vercel dashboard or `vercel ls` to confirm the correct build deployed.

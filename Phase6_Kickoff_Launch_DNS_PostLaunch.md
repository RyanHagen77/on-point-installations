# On Point Installations — Next.js Rebuild
# Phase 6: Launch — DNS Cutover, GSC, GBP, Post-Launch Monitoring
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phases 1–5 are complete. The site is fully built, all schema validates cleanly, all redirects are working, GA4 is firing through GTM with conversion tracking, and Core Web Vitals are passing. Phase 6 is the launch sequence — cutting over DNS from the old WordPress hosting to Vercel, verifying everything in GSC, updating the GBP, and establishing post-launch monitoring.

**Do not rush this phase.** A botched DNS cutover or missed redirect can undo months of ranking equity. Follow the checklist in order.

**Refer to:** BUILD_PLAN.md Section 10 (Migration Checklist). Prompt 19 (Monthly SEO Report) prompt — run this 30 days post-launch to capture the first performance data on the new site.

---

## PRE-LAUNCH FINAL CHECKLIST

Complete every item before touching DNS.

### Content verification
- [ ] Every page has a unique, non-placeholder title tag (no "test", no duplicates)
- [ ] Every page has a unique meta description under 155 characters
- [ ] Every H1 is present and matches the audit specification
- [ ] Every service page has 800+ words of body content
- [ ] Every city page has 600+ words of body content
- [ ] All 26 migrated blog posts are published in Sanity
- [ ] The /services/ hub page meta description is NOT "test" (it was on the WordPress site)
- [ ] The /site-credits/ redirect is in place and /site-credits/ returns 301 → /about/
- [ ] No pages link to /site-credits/

### Schema verification
- [ ] Homepage: LocalBusiness + Organization + WebSite all pass Rich Results Test
- [ ] Primary service page: Service + FAQPage + BreadcrumbList pass Rich Results Test
- [ ] /about/: Person + BreadcrumbList pass Rich Results Test
- [ ] At least 3 blog posts: Article + FAQPage + BreadcrumbList pass Rich Results Test
- [ ] At least 2 city pages: Service + FAQPage + BreadcrumbList pass Rich Results Test
- [ ] Brand name in all schema: "On Point Installations, Inc." (with 's') — zero instances of "Installation" singular

### Redirect verification
- [ ] All 15 redirects return HTTP 301
- [ ] No redirect chains
- [ ] No redirect loops
- [ ] Old WordPress URL for the primary money page redirects to new URL

### Analytics verification
- [ ] GTM container is installed
- [ ] GA4 page_view fires on every page (confirmed in DebugView)
- [ ] form_submit event fires on contact form success
- [ ] phone_click event fires on phone number tap
- [ ] Old WordPress gtag.js script is NOT present in the new site source

### Technical verification
- [ ] Sitemap generates at /sitemap.xml and includes all pages
- [ ] robots.txt is correct — all important pages are crawlable
- [ ] SSL certificate is active on Vercel (automatic — but confirm)
- [ ] All images have alt text
- [ ] No broken internal links (run a crawl with Screaming Frog or similar on staging URL)
- [ ] Mobile rendering passes on actual device (not just browser dev tools)
- [ ] Lighthouse scores: Performance > 85, Accessibility > 95, SEO = 100

---

## DNS CUTOVER SEQUENCE

### Step 1 — Take a WordPress backup
Before touching anything, confirm CyberOptik has a complete WordPress backup. The old site must be preserved for 90 days minimum in case any content or redirect needs to be retrieved.

### Step 2 — Set DNS TTL low (24 hours before cutover)
If you have access to the domain's DNS settings, lower the TTL to 300 seconds (5 minutes) 24 hours before the planned cutover. This reduces propagation time.

**DNS records to change:**
- A record: point to Vercel's IP (or use CNAME to cname.vercel-dns.com if using a subdomain)
- For apex domains (no www): Vercel recommends using their A records (76.76.21.21)
- www: CNAME → cname.vercel-dns.com

**In Vercel:**
- Go to Project → Settings → Domains
- Add onpointinstallations.com and www.onpointinstallations.com
- Vercel will show the DNS records to configure
- Follow Vercel's domain configuration guide exactly

### Step 3 — Add domain to Vercel project
```
vercel domains add onpointinstallations.com
```
Vercel handles SSL automatically via Let's Encrypt once DNS propagates.

### Step 4 — Execute cutover
Change DNS records at the registrar. Allow 15–60 minutes for propagation (longer if TTL was not lowered in advance).

### Step 5 — Verify live site
```bash
# Confirm DNS is resolving to Vercel
dig onpointinstallations.com

# Confirm HTTPS is active
curl -I https://onpointinstallations.com

# Confirm redirects are working on live domain
curl -I https://onpointinstallations.com/space-planning/
# Expected: 301 → /services/commercial-space-planning-chicago-il/

curl -I https://onpointinstallations.com/site-credits/
# Expected: 301 → /about/
```

---

## POST-CUTOVER — GOOGLE SEARCH CONSOLE

### Step 1 — Verify property ownership
The existing GSC property (onpointinstallations.com) was verified under the old WordPress install. After DNS cutover:
1. Go to search.google.com/search-console
2. Select the onpointinstallations.com property
3. Confirm the property is still verified (HTML file verification or DNS TXT record should persist)
4. If verification is lost, re-verify using the DNS TXT record method (most durable — doesn't depend on a file in WordPress)

### Step 2 — Submit new sitemap
In GSC → Sitemaps:
- Remove any old WordPress sitemap URL (https://onpointinstallations.com/sitemaps.xml)
- Add new sitemap: https://onpointinstallations.com/sitemap.xml
- Submit and confirm "Success" status

### Step 3 — Request indexing for critical pages
In GSC → URL Inspection, request indexing for:
1. https://onpointinstallations.com/ (homepage)
2. https://onpointinstallations.com/services/commercial-furniture-installation-chicago-il/ (primary money page)
3. https://onpointinstallations.com/services/commercial-furniture-installation-schaumburg-il/ (Schaumburg — first new city page)
4. https://onpointinstallations.com/services/commercial-furniture-installation-wauconda-il/ (Wauconda — hometown)
5. https://onpointinstallations.com/services/cubicle-installation-chicago-il/ (cubicle — second most important service)

### Step 4 — Monitor for crawl errors
In GSC → Coverage → Errors:
- Check daily for the first 2 weeks post-launch
- Common post-launch errors: 404s from old URLs not in the redirect map, soft 404s on thin pages, redirect errors
- Fix any 404 by adding a redirect to next.config.js and redeploying

### Step 5 — Watch for manual actions
GSC → Security & Manual Actions → Manual Actions
- Should be clear — but check within 7 days of launch

---

## POST-CUTOVER — GOOGLE BUSINESS PROFILE

### Step 1 — Update website URL (only if domain changed)
If onpointinstallations.com is still the domain (likely — no domain change in this rebuild), no GBP update is needed. The URL resolves to the new site automatically.

If there was any domain change: GBP → Edit Profile → Contact → Website

### Step 2 — Verify GBP is pointing to the correct page
In GBP, the website link should go to the homepage. After cutover, click the website link from GBP and confirm it loads the new Next.js site.

### Step 3 — Update GBP primary category (from Prompt 17 audit)
The audit found GBP was categorized as "Office refurbishment service" — too generic.
- GBP → Edit Profile → Business Category → Change primary to "Office furniture store" or "Furniture installation service"
- This is a Brian task — requires GBP owner access

### Step 4 — Publish first GBP post on the new site launch
Use the Week 1, Post 1 copy from Prompt 18 (GBP Posting Pattern report):
- Tuesday, 8:30 AM CT
- Post type: UPDATE
- Announce the new site launch as a "project completion" style post
- Include the new URL in the post copy

---

## POST-CUTOVER — CITATION LISTINGS

### Priority updates (from Prompt 14 Citation Audit)

All citation listings should link to https://onpointinstallations.com/ (same domain, no change needed unless domain changed).

**Critical fixes still pending from Prompt 14:**
1. **Manta** — remove the phantom "#124" from the address (1220 Karl Ct **#124**, Wauconda — the #124 doesn't exist)
2. **Bing Places** — listing was missing entirely — create it now (the new site makes this higher priority)
3. **Facebook** — add full street address to the Facebook business page
4. **GSA eLibrary** — name showing as all-lowercase "on point installations inc" — request correction from GSA

These are Brian tasks but should be completed within 30 days of launch. Log completion in the monthly SEO report.

---

## POST-LAUNCH MONITORING SCHEDULE

### Days 1–3 post-launch
- [ ] Verify live site loads correctly on mobile and desktop
- [ ] Confirm GSC has no crawl errors
- [ ] Confirm GA4 is receiving data (Realtime report — should show active users within minutes of launch)
- [ ] Confirm all redirects are still working on the live domain
- [ ] Run Rich Results Test on live homepage URL (not staging)

### Days 4–14 post-launch
- [ ] Check GSC Coverage report daily for new 404 errors — fix any with redirects
- [ ] Check GSC Performance report — expect a temporary dip in clicks as Google re-crawls (normal)
- [ ] Confirm sitemap is being crawled (GSC → Sitemaps → Last read date)
- [ ] Request indexing for remaining new pages (city pages, new blog posts)

### Day 30 post-launch
- [ ] Run Prompt 19 (Monthly SEO Report) — this is the first post-launch report and establishes the new baseline
- [ ] Compare average position to pre-launch baseline (22.9 → target 15–18 within 60 days)
- [ ] Check if primary money page has moved from position 35.8 toward top 20
- [ ] Document any new 404s discovered and add to redirect map for next deploy

### Day 60 post-launch
- [ ] Second Prompt 19 monthly report
- [ ] Evaluate whether Schaumburg and Wauconda city pages are ranking
- [ ] Begin publishing Category 3 blog posts (the cost guide should go live by Day 30–45)
- [ ] Assess GBP posting consistency — are Tuesday/Thursday posts happening?

---

## WORDPRESS SITE PRESERVATION

**Do not delete the WordPress site for 90 days minimum.** Keep it on a subdomain or staging environment.

Reasons:
- Old blog posts may have external links pointing to WordPress URLs — these will 301 to the new site, but if the old site is deleted, any misconfigured redirects become 404s with no fallback
- CyberOptik may have files, images, or config you need to retrieve
- If anything goes wrong with the launch, you can fail back to WordPress while diagnosing

After 90 days: confirm all old URLs are either redirecting correctly or returning 404 on the new site, then decommission the WordPress install.

---

## HANDOFF DOCUMENTATION FOR BRIAN

Create a one-page quick reference for Brian:

**Your new site:**
- URL: https://onpointinstallations.com
- Hosting: Vercel (vercel.com — IntegrePro account)
- CMS for blog posts: Sanity Studio (studio.onpointinstallations.com or sanity.io/manage)
- Analytics: GA4 via Google Tag Manager (tagmanager.google.com)
- GSC: search.google.com/search-console (r.hagen@integrepro.com added as owner)

**Things Brian does himself:**
- GBP posts (twice per week, Tuesday + Thursday — copy from Prompt 18 calendar)
- Review requests (after every completed project — scripts in Prompt 13 report)
- Update Yelp, Manta, Bing Places, GSA eLibrary, Facebook NAP
- Create Wikidata entity (step-by-step in Prompt 17 Section 4)

**Things IntegrePro handles:**
- Monthly SEO reports (Prompt 19 — first of each month)
- Content publishing in Sanity (new blog posts from Prompt 16 briefs)
- Schema updates when Wikidata Q-URL is available
- New city page builds as service area expands
- GBP posting strategy refinement (quarterly — per Prompt 18 calendar template)
- GSC monitoring for crawl errors and ranking movement

**Emergency contacts:**
- Site down: check Vercel status at vercel-status.com
- DNS issue: contact domain registrar
- Analytics missing: check GTM preview mode — confirm container is published

---

## PHASE 6 COMPLETION CRITERIA

- [ ] DNS cutover complete — live site resolving to Vercel
- [ ] SSL active on onpointinstallations.com and www.onpointinstallations.com
- [ ] GSC property verified under new hosting
- [ ] New sitemap submitted to GSC
- [ ] GA4 receiving live data through GTM
- [ ] All 15 redirects working on live domain
- [ ] No crawl errors in GSC 48 hours post-launch
- [ ] Rich Results Test passing on live URL (not staging)
- [ ] GBP website link confirmed loading new site
- [ ] First GBP post published announcing new site
- [ ] Brian's quick reference handoff document delivered
- [ ] WordPress site preserved on backup hosting for 90 days
- [ ] Prompt 19 monthly report scheduled for Day 30 post-launch
- [ ] All open questions from BUILD_PLAN.md Section 11 answered and documented

---

## THE ENGAGEMENT COMPLETE

Once Phase 6 is done, On Point Installations, Inc. will have:
- A clean Next.js site with every SEO finding from 19 audit prompts baked in at the build level
- Schema across every page type — no more homepage-only structured data
- A redirect map that preserves every link equity signal from the old WordPress site
- GA4 with conversion tracking through GTM
- A Sanity CMS that Brian or an agent can use to publish content without a developer
- A GBP posting calendar and 8 ready-to-publish posts
- A monthly SEO reporting system (Prompt 19) to track progress
- A documented agent integration layer for future automated workflows

The March 2026 baseline: 174 clicks / 18,400 impressions / avg pos. 22.9 / map pack #2.

Target at 90 days post-launch: 400+ clicks / 20,000+ impressions / avg pos. 15 / map pack #1 for primary keyword.

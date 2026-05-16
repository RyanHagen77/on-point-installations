# On Point Installations — Phase 2 Supervisor Prompt
# Paste this into a new Claude Code session to begin Phase 2
# Phase 1 is complete — project scaffolded and deployed to Vercel staging

---

## WHO YOU ARE AND WHAT WE'RE BUILDING

You are the developer assistant for IntegrePro Software LLC. We are building a new Next.js website for **On Point Installations, Inc.**, a commercial furniture installation company based in Wauconda, IL. This is a full replacement of an existing WordPress site.

The project is fully scaffolded from Phase 1. All routes are stubbed, constants are wired, redirects are in place, and the Vercel staging URL is live. Phase 2 builds the visible pages — homepage, primary Chicago service pages, and supporting core pages — with full content, schema, and visual design.

**All specification files are in this project directory. Read these before writing any code:**
- `BUILD_PLAN.md` — master specification
- `Phase2_Kickoff_Homepage_ServicePages.md` — full Phase 2 brief with page structure, metadata, schema, internal links, and content requirements

---

## PHASE 2 SCOPE

Build these pages in this order:

1. `/` — Homepage
2. `/services/commercial-furniture-installation-chicago-il/` — Primary money page
3. `/services/cubicle-installation-chicago-il/`
4. `/services/office-relocation-chicago-il/`
5. `/services/systems-furniture-installation-chicago-il/`
6. `/services/office-furniture-delivery-setup-chicago-il/`
7. `/services/commercial-space-planning-chicago-il/`
8. `/about/`
9. `/contact/`
10. `/reviews/`

Full metadata, H1s, body content, schema, and internal links for every page are specified in `Phase2_Kickoff_Homepage_ServicePages.md`. Do not deviate from the SEO configuration — it was written against live Google Search Console data.

---

## VISUAL CONTINUITY — MATCH THE CURRENT SITE

**This is critical for Phase 2.** The new site must feel visually familiar to Brian and his existing clients. We are replacing the technical foundation, not rebranding the company.

### Step 1 — Fetch and analyze the current site before building anything

Before writing a single component, fetch the current site and extract its visual design:

```
Fetch: https://onpointinstallations.com
Fetch: https://onpointinstallations.com/services/commercial-office-furniture-installation-chicago-il/
Fetch: https://onpointinstallations.com/about/
```

From these pages, extract and document:

**Colors:**
- Primary brand color (likely navy or dark blue — extract the exact hex from CSS)
- Accent/CTA color (button color — extract hex)
- Background colors (white, light gray sections)
- Text color (body copy, headings)
- Navigation background color

**Typography:**
- Heading font family (check Google Fonts link in page source)
- Body font family
- Approximate heading sizes (H1, H2, H3)
- Font weights used

**Layout patterns:**
- Navigation structure (logo position, link layout, CTA button style)
- Hero section layout (full-width? Split? Image treatment?)
- Section padding and spacing rhythm
- Footer column structure
- Button style (rounded? Pill? Sharp corners? Outline or filled?)
- Card style if used

**Logo:**
- Current logo URL: `https://onpointinstallations.com/wp-content/themes/onpoint-installations/images/logo.png`
- Fetch and use this logo in the new Navigation and Footer until Brian provides SVG files

**Existing photography:**
- Note any hero images or project photos used on the current site
- These will be used in the new build until Brian provides new assets

### Step 2 — Codify the design tokens

Once you have extracted the colors and typography, codify them in Tailwind before building any components:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '[EXTRACTED HEX]',      // Primary brand color
          accent: '[EXTRACTED HEX]',    // CTA / button color
          light: '[EXTRACTED HEX]',     // Light section background
        },
      },
      fontFamily: {
        heading: ['[EXTRACTED FONT]', 'sans-serif'],
        body: ['[EXTRACTED FONT]', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

If the font is a Google Font, add it to the Next.js layout using `next/font/google` instead of a `<link>` tag:

```typescript
// src/app/layout.tsx
import { [FontName] } from 'next/font/google';

const font = [FontName]({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-brand',
});
```

### Step 3 — Build components that match current visual patterns

When building Navigation, Hero, CTABlock, and Footer — match the structural feel of the current site:

**Navigation:**
- If the current nav has the logo on the left and links on the right, match that
- If the current nav has a navy background, match that
- If the phone number appears in the header, keep it in the same position
- The CTA button style (color, shape, size) should match the current site exactly

**Hero section:**
- If the current homepage has a full-width hero with overlay text, match that
- Use the same image if available; otherwise use a placeholder with the correct dimensions
- H1 text per spec: "Commercial Office Furniture Installer in Chicago, IL"

**Buttons and CTAs:**
- Match the current button style exactly — color, border-radius, padding, hover state
- Primary CTA: phone call button — same color as current site
- Secondary CTA: "Get a Quote" → /contact/

**Section layout:**
- Match the current site's section padding and alternating background pattern (white → light gray → white)
- Match heading sizes and weight

**Footer:**
- Match the column structure and background color of the current footer
- NAP (name, address, phone, hours) must appear in the footer exactly as specified in `lib/constants.ts`

---

## SEO RULES — ENFORCE THROUGHOUT

These are non-negotiable in every file:

1. Every page has a unique title tag and meta description — exactly as specified in BUILD_PLAN.md Section 4
2. Every H1 matches the audit specification — do not rewrite or "improve" H1s
3. Every non-homepage page renders `<BreadcrumbSchema />`
4. Every service page renders `<ServiceSchema />` and `<FAQSchema />`
5. The homepage renders `<LocalBusinessSchema />`, `<OrganizationSchema />`, and `<WebSiteSchema />`
6. The /about/ page renders `<PersonSchema />` for Brian Vetter
7. Phone number always uses `href={SITE.phoneHref}` — never hardcoded
8. Brand name everywhere: "On Point Installations, Inc." — with the 's'
9. Internal links use the exact anchor text from the Phase 2 spec
10. **Retired-URL substitution rule.** When a spec internal link points to a retired audit URL, substitute with a jump anchor to the corresponding H2 on the money page. The audit anchor text stays exactly as written — only the destination changes.
    - `/services/cubicle-installation-chicago-il/` → `/services/commercial-furniture-installation-chicago-il/#cubicle-installation`
    - `/services/systems-furniture-installation-chicago-il/` → `/services/commercial-furniture-installation-chicago-il/#systems-furniture`
    - `/services/office-furniture-delivery-setup-chicago-il/` → `/services/commercial-furniture-installation-chicago-il/#office-furniture-delivery-setup`

---

## IMAGE SEO RULES — ENFORCE THROUGHOUT

1. **Next.js `<Image>` required.** Never use `<img>`. All images use `next/image` with explicit `width` and `height`.
2. **Keyword-aware file names.** Image filenames in `public/images/` must describe the subject for SEO. Use hyphens. Examples: `chicago-office-furniture-installation.jpg`, not `hero-home.jpg`; `on-point-installations-cubicle-install.jpg`, not `image1.jpg`.
3. **Alt text is required on every image.** Alt text must describe what is in the photo accurately. It may include the primary keyword for the page, but must read naturally — no keyword stuffing. Do not leave alt text empty or `""` unless the image is purely decorative.
4. **OG image.** The sitewide default OG image (1200×630px) is generated by `src/app/opengraph-image.tsx`. Pages that need a custom OG image pass `ogImage` to `generatePageMetadata`. Do not hardcode OG image URLs.
5. **Favicon.** The favicon is generated by `src/app/icon.tsx`. Do not add `<link rel="icon">` tags manually — Next.js App Router handles this automatically.
6. **No external image hotlinks.** All images must be stored in `public/images/` and served locally. Do not reintroduce hotlinks to `onpointinstallations.com/wp-content/uploads/`.
7. **`priority` prop only on above-the-fold images.** The hero image on each page gets `priority`. All other images do not.
8. **SOURCE QUALITY.** Images must match or exceed live-site quality at every breakpoint. When porting from WordPress, always pull from `-scaled.jpg` or unsuffixed originals. Never use `-1200x800`, `-600x400`, or other WordPress resized variants as the source file. Verify final dimensions are at least 1600px on the longest edge for hero images and content photos. (Logos and icons exempt — native size is fine.)
9. **Content images render constrained, not full-width.** Inline illustration images inside page sections must be wrapped in `max-w-2xl mx-auto` (or a narrower cap if appropriate) with `py-8` vertical breathing room. Full-width treatment is reserved for hero images handled by the `ServiceHero` component. Never display an image wider than its native resolution — upscaling exposes source quality issues. Set the `sizes` attribute to match the actual display cap (e.g. `"(min-width: 672px) 672px, 100vw"` for `max-w-2xl`).

---

## IMAGE INCLUSION TEST

Before placing any image on a page, all three must be true:

1. Does this show actual On Point work, OR illustrate a specific service described in adjacent copy?

2. Is the composition strong enough to read at the display size used? (Subject fills the frame, not crammed in a corner. No large dead space. Sharp at the rendered width.)

3. Does it add information the copy doesn't already convey?

If any answer is no, omit. Real-work photos with bad composition are not better than no photo. A page without images is not incomplete.

Test bias: when in doubt, omit. The remaining three service pages and three supporting pages will all face this decision. Default to omission unless the image clearly earns its place.

---

## VOICE AND CONTENT RULES — ENFORCE THROUGHOUT

All user-facing copy is in Brian Vetter's voice. Brian is a contractor, not a consultant or marketer. Content is ported from the existing live site (onpointinstallations.com) unless explicitly flagged as drafted in `docs/content-source-map.md`.

### Tone
Direct, plain-spoken, professional but approachable. Speaks to B2B buyers — facilities directors, office managers, furniture dealers. Sounds like someone who has been doing this for 15 years and knows the business cold. Not corporate, not salesy.

### Hard bans

1. **No em dashes (—). No en dashes (–) as punctuation.** If a sentence wants a pause, recast it. Common fixes: split into two sentences, use a comma, use parentheses, use a colon. (Numeric ranges like "12–15" are exempt — that is standard typography, not punctuation.)

2. **No AI tells.** These phrases and structures read as machine-generated even when grammatically clean:
   - "It's worth noting that..."
   - "In today's fast-paced world..."
   - "Whether you're X or Y, we've got you covered"
   - "Look no further"
   - "Elevate your..."
   - "Unlock the potential of..."
   - "Seamlessly integrate..."
   - "Robust solutions"
   - "Cutting-edge"
   - "State-of-the-art"
   - "Leverage" as a verb
   - "Streamline" as a verb (Brian says "speed up" or "cut steps")
   - Tricolons that feel balanced for the sake of balance ("fast, reliable, and affordable")
   - Hero-section openers that start with a participle ("Bringing decades of experience...")

3. **No consultant verbs.** Optimize, leverage, synergize, streamline, empower, transform, revolutionize, elevate, unlock, drive, deliver (as in "deliver value"). Permitted plain verbs (concrete usage only): install, move, plan, build, coordinate, set up, finish, handle, deliver (literal physical delivery). These are fine when describing a literal action on a concrete object. Still prohibited when used abstractly.

4. **No title-case multi-word adjectives.** Never "Best-In-Class," "Full-Service," "World-Class Service," or similar.

5. **No corporate plurals.** Avoid "solutions," "partnerships," "offerings," "capabilities," "deliverables." Say what the thing actually is.

6. **No "white-glove."** Flagged as a voice violation. Do not use it.

7. **Contractions are required where natural.** "We will" reads as a robot. Brian says "we'll." Same for we're, don't, can't, it's, you're.

### Tricolon rule — do not fix a tricolon with a tricolon
When a banned tricolon needs to be replaced, the replacement must not itself be a three-part rhythmic list. "Show up when we say, communicate through the job, and finish clean" is structurally identical to "professionalism, precision, and integrity" — three balanced phrases for cadence. Wrong fix.

Rewrites must be prose: one or two sentences, concrete facts, no rhythmic grouping.

Enumerations of real things (products, customer types, service offerings) are not tricolons. "Blinds, shades, and drapery" or "dealers, facility managers, and end users" are lists — they stay.

Test: if removing the third item leaves the sentence saying the same thing, it was a list (fine). If removing the third item changes the meaning or breaks the rhythm, it was a tricolon doing rhetorical work — rewrite as prose.

### When porting live-site copy
If you find yourself wanting any of the above while porting, the live site copy probably needs a small rewrite to land in voice. Flag the line, propose the rewrite, get approval before committing.

### Voice test
Read the copy aloud. If it sounds like a consultant's slide deck, rewrite it. If it sounds like Brian talking to a furniture dealer he's worked with for five years, it's right.

### Proof points — verified sources only
These are cleared for use on service pages:
- 15+ years in business (founded 2010)
- 11,000+ completed projects
- 12–15 person non-union crew
- 130+ years combined team experience
- 5.0★ Google rating / 25 reviews
- Fully insured

"No subcontracting" is flagged in `docs/known-issues.md`. Do not assert it until Brian confirms.

### Reviews and testimonials
The "selfishly don't want to recommend" angle is an audit-identified *theme*, not a verbatim quote. Use it as a framing device only. Verbatim review text is blocked until Brian provides it. See `docs/known-issues.md`.

### FAQs
Every service page needs minimum 5 FAQ Q&As. Same direct voice. Source from live service pages or the Phase 2 spec — do not invent questions or answers.

---

## SEO AUDIT AND VOICE RULES — PRECEDENCE

The Phase 1 SEO audit informs page structure, target keywords, headings, internal linking, and topic coverage. It does not override voice rules.

If audit-recommended copy contains em dashes, AI tells, consultant verbs, or any other banned pattern, the copy gets rewritten to comply with voice rules while preserving the keyword intent and topic. The SEO goal is the underlying intent (what the page should rank for and answer), not the literal wording.

Same applies to live-site copy being ported. Verbatim porting is the default, but verbatim does not include banned patterns. If the live site uses "optimize" or an em dash, the port cleans that line and flags it.

Order of precedence when conflicts arise:
1. Voice rules (non-negotiable)
2. Live-site parity
3. SEO audit recommendations
4. Drafted copy

---

## SOURCING RULE — ENFORCE THROUGHOUT

Every piece of content — copy, statistics, review quotes, testimonials, customer attributions — must trace to one of three sources:

1. **The Phase 2 audit** — SEO configuration: title tags, meta descriptions, H1s, canonical URLs, schema, internal link anchor texts. Do not modify these without flagging it.
2. **The current live site at onpointinstallations.com** — Published copy is cleared for use verbatim or near-verbatim. Mark sourced content with a comment: `{/* Verbatim from onpointinstallations.com, fetched YYYY-MM-DD */}`
3. **Real source documents provided by Brian** — actual review text, case studies, customer names, confirmed business claims.

If content cannot be traced to one of those three, use **placeholder text** and add a flag to `docs/known-issues.md`. Do not generate plausible-sounding B2B copy to fill gaps.

---

## LIVE-SITE PARITY RULE — ENFORCE THROUGHOUT

Every section on every page must either:
- **Exist on the current live site** — port it verbatim or near-verbatim and note the source, OR
- **Be a documented intentional addition** — logged in `docs/spec-additions.md` with rationale and approval status.

No section gets invented. If a needed section doesn't exist on the live site, port the closest equivalent and flag for Brian's review. Do not write new sections in a generic B2B voice to fill perceived gaps.

Before building any page, fetch the corresponding live-site URL and compare section-by-section.

---

## SESSION-START VERIFICATION

At the start of every new session:
1. Re-read this CLAUDE.md.
2. Identify the most recently built or modified page.
3. Audit it against all current rules in this file.

Rules added mid-session do not retroactively scrub copy written before them — only the next audit pass does. If violations are found, fix them before building new pages.

When a correction is made during a session, add the resulting rule to this file before the session ends.

---

## DEPLOYMENT VERIFICATION

After every `git push` operation, immediately run:

```
git fetch origin && git log origin/main..HEAD --oneline
```

If the output is non-empty, the push failed silently — retry before proceeding. If the output is empty, the push succeeded.

Always report after any push:
- The commit hash that is now at `origin/main`
- The commit timestamp (`git log origin/main -1 --format="%H %ci"`)
- Whether the output of `git log origin/main..HEAD` was empty (push confirmed) or non-empty (push failed)

This gives the user a hash and timestamp they can match against the Vercel dashboard to confirm the correct build deployed.

---

## SCHEMA IMPLEMENTATION FOR PHASE 2

Implement these schema components fully in Phase 2 (they were stubbed in Phase 1):

### LocalBusinessSchema (homepage)
Use the complete JSON-LD from the audit. Key fields:
```typescript
{
  "@type": "ProfessionalService",
  "@id": "https://onpointinstallations.com/#business",
  "name": "On Point Installations, Inc.",
  "telephone": "+18475504042",
  "priceRange": "$$",
  "foundingDate": "2010",
  "aggregateRating": { "ratingValue": "5.0", "reviewCount": "25" },
  // Pull full sameAs array from SAME_AS_URLS in lib/constants.ts
}
```

### ServiceSchema (all service pages)
```typescript
interface ServiceSchemaProps {
  name: string;          // "Commercial Furniture Installation in Chicago, IL"
  description: string;
  serviceType: string;   // "Commercial Furniture Installation"
  areaServed: string[];  // ["Chicago", "Schaumburg", ...]
  url: string;           // canonical URL of this page
}
```

### FAQSchema (all service pages)
```typescript
interface FAQ {
  question: string;
  answer: string;
}
interface FAQSchemaProps {
  faqs: FAQ[];
}
```

The FAQAccordion component should accept the same `faqs` array and render the visible accordion UI. The FAQSchema component renders the invisible JSON-LD. Both go on the same page — one for users, one for Google.

---

## CONTACT FORM

Build the ContactForm component in Phase 2 for the /contact/ page:

**Fields:**
- Name (required)
- Company (required — this is B2B)
- Phone (required)
- Email (required)
- Project type (dropdown: Commercial Furniture Installation / Cubicle Installation / Office Relocation / Systems Furniture / Delivery & Setup / Space Planning / Other)
- City / Project location (text — important for routing)
- Project details (textarea)
- Submit button: "Send Message" or "Request a Free Quote"

**On success:**
- Show a thank you message inline (do not redirect — keep user on the page)
- Fire the GTM dataLayer event for form_submit (GTM container ID will be added in Phase 5 — add the dataLayer push now so it's ready):

```typescript
const handleSuccess = () => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'contact_form_submit',
      form_type: 'contact',
    });
  }
  setSubmitted(true);
};
```

**Handler:** For now, use a simple API route that sends an email via nodemailer or a service like Resend. We will connect a CRM later if Brian decides to use one.

---

## PHASE 2 COMPLETION CRITERIA

Before calling Phase 2 complete, verify every item:

**Content:**
- [ ] Homepage fully built — all 7 sections, real content, not placeholder
- [ ] Primary money page — 800+ words, 5+ FAQ Q&As
- [ ] All 5 additional Chicago service pages — correct metadata, content, FAQ
- [ ] /about/ — Brian's story, team stats, non-union advantage, CTA
- [ ] /contact/ — form works, thank you state renders
- [ ] /reviews/ — star rating, review quotes, CTA

**Visual:**
- [ ] Navigation matches current site structure and color
- [ ] Logo loading from constants or the current site URL
- [ ] Button style matches current site (color, shape, hover)
- [ ] Section padding and background alternation matches current site
- [ ] Footer matches current site column structure
- [ ] Mobile navigation works (hamburger, phone number visible)
- [ ] Renders correctly on actual mobile device

**SEO and schema:**
- [ ] No duplicate title tags
- [ ] No placeholder meta descriptions
- [ ] All H1s match the audit spec exactly
- [ ] BreadcrumbSchema rendering on all non-homepage pages
- [ ] ServiceSchema and FAQSchema rendering on all service pages
- [ ] LocalBusinessSchema, OrganizationSchema, WebSiteSchema on homepage
- [ ] PersonSchema on /about/
- [ ] Rich Results Test passing on: homepage, primary service page, /about/

**Performance:**
- [ ] Lighthouse Performance > 85 on homepage
- [ ] Lighthouse SEO = 100 on homepage
- [ ] No console errors on any page
- [ ] All images using Next.js `<Image>` component with alt text
- [ ] No broken internal links

---

## CONTEXT BLOCK FOR SUBSEQUENT SESSIONS

At the start of any new Claude Code session continuing Phase 2, paste this:

```
We are building the On Point Installations Next.js site for IntegrePro Software LLC.
Phase 1 is complete — project scaffolded, all routes stubbed, deployed to Vercel.
Current phase: 2 — Homepage + primary service pages
Phase file: Phase2_Kickoff_Homepage_ServicePages.md
Visual reference: https://onpointinstallations.com (match this site's visual design)
Last completed: [describe what was done]
Next task: [describe what to build next]
Open questions for Brian: brand hex colors, logo SVG file, gallery photo access, contact form email handler
```

---

## OPEN QUESTIONS STILL NEEDED FROM BRIAN

These are blocking full completion of Phase 2 design. Chase these before Phase 2 is done:

- [ ] **Exact hex colors** — primary navy, accent/CTA color, any secondary colors
- [ ] **Logo files** — SVG preferred, PNG acceptable (high resolution)
- [ ] **Font confirmation** — is the current Google Font the right one to carry forward?
- [ ] **Contact form email** — what address should form submissions go to?
- [ ] **Hero image** — does Brian want to use the current hero photo or provide a new one?
- [ ] **Review quotes** — confirm it's okay to use the Google review text in the /reviews/ page

If Brian hasn't provided brand assets yet, build Phase 2 using colors and fonts extracted from the current live site. Flag which values were extracted vs. confirmed so they can be swapped easily when Brian delivers the style guide.

---

*This project was specified by a 19-prompt SEO audit completed by IntegrePro Software LLC. All SEO configuration in this build derives from live Google Search Console data. Do not modify title tags, H1s, meta descriptions, canonical URLs, schema, or internal link anchor text without referencing the source audit reports.

# Phase 2 — Brian's Confirmed Decisions

**Date locked:** May 15, 2026
**Use this file as the source of truth for the open questions from `Phase2_Kickoff_Homepage_ServicePages.md`.**

---

## Decisions confirmed by Brian

| Question | Decision |
|---|---|
| Brand colors | **Pull from live site.** Extract exact hex values from `https://onpointinstallations.com` CSS. Do not invent or approximate. |
| Fonts | **Pull from live site.** Use the same Google Font(s) the current WordPress theme loads. Carry forward exactly. |
| Logo file | **PNG only for now.** Use `https://onpointinstallations.com/wp-content/uploads/logo.png` (footer logo) or `/wp-content/themes/onpoint-installations/images/logo.png` (header logo). SVG is a Phase 5 deliverable — Brian will commission it later. |
| Hero image | **Reuse current hero image.** Pull from the live site rather than waiting on new photography. |

---

## Decisions closed (May 15, 2026)

| Question | Decision |
|---|---|
| Contact form email destination | **`info@onpointinstall.com`** ⚠️ *Verify spelling before deploy — shorter domain than the website (`onpointinstallations.com`). If this is a typo, correct to `info@onpointinstallations.com` before going live. Wrong email = silently dropped leads.* |
| Review quotes on `/reviews/` page | **Approved.** Use verbatim Google review text. Cite reviewer first name + last initial per Google's TOS. |
| GTM container ID | **Deferred to Phase 5.** Brian to create the container then. Phase 2 ships with the `dataLayer.push` event already wired so the form fires correctly once GTM lands — no Phase 2 changes needed. |

## Still open

- [ ] **Verify `info@onpointinstall.com` vs `info@onpointinstallations.com`** — confirm the correct inbox before Phase 5 deploy
- [ ] **Logo SVG** — Phase 5 deliverable; Brian to commission separately

---

## First task in the next Claude Code session — design token extraction

**Paste this block at the start of the Claude Code session, after the standard context block.**

Before building any components, run the following to extract design tokens from the live site and write them to `docs/design-tokens.md`:

```bash
# 1. Grab the raw homepage HTML so we can see all linked stylesheets and inline CSS
mkdir -p docs tmp
curl -sL https://onpointinstallations.com/ -o tmp/home.html

# 2. List every stylesheet the theme loads
grep -oE 'href="[^"]*\.css[^"]*"' tmp/home.html | sort -u

# 3. List every Google Fonts link (gives us the font families)
grep -oE 'fonts\.googleapis\.com[^"]*' tmp/home.html | sort -u

# 4. Pull the main theme stylesheet (typical WordPress path)
curl -sL "https://onpointinstallations.com/wp-content/themes/onpoint-installations/style.css" -o tmp/theme-style.css
curl -sL "https://onpointinstallations.com/wp-content/themes/onpoint-installations/css/style.css" -o tmp/theme-css-style.css 2>/dev/null

# 5. Extract every hex color used in the theme CSS, ranked by frequency
grep -hoE '#[0-9a-fA-F]{3,8}' tmp/*.css 2>/dev/null | sort | uniq -c | sort -rn | head -30

# 6. Extract font-family declarations
grep -h "font-family" tmp/*.css 2>/dev/null | sort -u
```

From that output, document the following in `docs/design-tokens.md` and commit it before building any components:

1. **Primary brand color** (most-used dark hex — almost certainly the navy)
2. **Accent / CTA color** (the button hex — usually a contrasting orange, red, or bright blue)
3. **Body text color** (most-used dark gray or near-black)
4. **Light section background** (most-used near-white hex other than `#fff`)
5. **Heading font family** + weights loaded
6. **Body font family** + weights loaded
7. **Button border-radius** (search for `border-radius` near `.btn`, `.button`, or `wp-block-button`)
8. **Default heading sizes** (h1, h2, h3 — search for `h1 {`, `h2 {`, etc.)

Once `docs/design-tokens.md` exists with confirmed values, codify them in `tailwind.config.ts` and `src/app/layout.tsx` per the Phase 2 brief, then start building components.

**Do not guess or approximate any of these values.** If grep returns nothing useful for a given token, log it as "could not extract — needs visual inspection" and continue. Brian can confirm the missing values from a browser DevTools session.

---

## Asset paths to use directly (no extraction needed)

| Asset | URL |
|---|---|
| Header logo | `https://onpointinstallations.com/wp-content/themes/onpoint-installations/images/logo.png` |
| Footer logo | `https://onpointinstallations.com/wp-content/uploads/logo.png` |
| Homepage hero | `https://onpointinstallations.com/wp-content/uploads/1_home-1200x800.jpg` |
| Office installation photo | `https://onpointinstallations.com/wp-content/uploads/on-point-installation-office-installation-scaled-1-1200x800.jpg` |
| Brian Vetter portrait | `https://onpointinstallations.com/wp-content/uploads/brian-vetter-1-1200x1200.jpg` |
| Team / about hero | `https://onpointinstallations.com/wp-content/uploads/our-non-union-team-at-on-point-installations-warehouse-and-offices-scaled-1-e1767820080705.jpg` |
| Furniture brands graphic | `https://onpointinstallations.com/wp-content/uploads/2_furniture_brands-1200x738.jpg` |
| Customer service photo | `https://onpointinstallations.com/wp-content/uploads/customer-service-representative-on-phone-scaled-1-e1767773925896.jpg` |

**Implementation note:** download these to `/public/images/` in the Next.js project on first build rather than hot-linking from the WordPress site. The current WP install will eventually go away and any hot-linked images would break. Use `next/image` with local paths.

---

## Sitewide structural observations from the live site

Pulled from rendered HTML of the homepage and `/about/` — useful for Navigation, Footer, and section rhythm components:

**Header / nav structure (left to right):**
Logo (left) → Home | About | Services (with dropdown) | Project Gallery | Reviews | Blog | Contact (right)

**Services dropdown items (8 total) — keep the new dropdown matching this for muscle memory:**
- Office Installations
- Relocation
- Warehousing
- Space Planning
- Electrical & Voice/Data
- Artwork Installation
- Window Treatment Installations
- Cubicle Wall and Upholstery Cleaning

> **SEO note:** the new build is consolidating around 6 Chicago-focused service pages per the audit (`commercial-furniture-installation-chicago-il`, `cubicle-installation-chicago-il`, `office-relocation-chicago-il`, `systems-furniture-installation-chicago-il`, `office-furniture-delivery-setup-chicago-il`, `commercial-space-planning-chicago-il`). Old service URLs are redirected per Phase 1. The visible dropdown should reflect the **new** information architecture, not the old one — but visual styling stays the same.

**Footer column structure:**
- Col 1: Logo
- Col 2: "Services" heading + service link list
- Col 3: "Contact Us" heading + NAP (1220 Karl Court, Wauconda, IL 60084 / email / (847) 550-4042) + social icons (Facebook, Instagram, LinkedIn)
- Bottom bar: © 2026 On Point Installations, Inc. + legal links (Privacy / Terms / Cookie / Disclaimer)

**Section rhythm on existing pages:**
- Hero image with overlay or alongside H1
- Alternating sections, image left/right swap
- Stats blocks on /about/ (14 / 133 / 15,000 — these are old numbers; new build uses 15+ / 130+ / 11,000+)
- Brand logo wall on homepage (AIS, Allsteel, Bernhardt, Friant, Haworth, Herman Miller, Hon, KI, Kimball, Knoll, OFS, Steelcase, Teknion, Three H, Trendway — preserve this list, it's a trust signal)
- Multiple CTA blocks per page driving to /contact/

---

## Existing site stats (replace with audit-confirmed numbers in new build)

The current site shows:
- 14 years in business → **new build: "15+ years"** (audit-confirmed, founded 2010)
- 133 combined years of expertise → **new build: "130+ years"** (rounded down for honesty)
- 15,000 sq ft facility → **keep 15,000 sq ft** (plus mention the 40,000 sq ft secondary warehouse)
- The current /about/ says "nearly 11,000 projects" → **new build: "11,000+ completed projects"**

---

## Real review themes to weave into copy (from audit + live /reviews/)

Per the audit, the strongest review angle: clients say they "selfishly don't want to recommend" On Point because they don't want competitors to find them. This is the keystone trust-signal for /reviews/ and the "Why Choose On Point" homepage section.

Other recurring themes from the live reviews page (verify when /reviews/ is fetched):
- Quote accuracy (98% of jobs come in at quoted price)
- Same-day communication / end-of-day photo updates
- Engineering mindset / 90-degree precision
- 130+ years combined experience on the crew
- Non-union pricing without sacrificing quality
- Will physically drive to transfer station to recover delayed shipments

---

# On Point Installations — Next.js Rebuild
# Phase 2: Homepage + Primary Service Pages
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phase 1 is complete. The project scaffold, folder structure, constants, redirects, and core layout components are in place. Phase 2 builds the visible pages — starting with the homepage and the primary Chicago service pages that drive the most commercial traffic.

**Refer to:** BUILD_PLAN.md Section 4 for all SEO configuration. Prompt 10 (Money Page Audit) for title tags, H1s, and meta descriptions. Prompt 11 (City Page Builder) for full page copy, FAQ Q&As, and CTAs.

**SEO constraint:** Every title tag, H1, meta description, and canonical URL in this phase is pre-specified in the audit. Do not rewrite, paraphrase, or "improve" them without flagging it — they were written against live GSC data.

---

## PHASE 2 OBJECTIVES

Build fully content-complete, schema-complete, internally-linked pages for:
1. Homepage (`/`)
2. Primary Chicago service pages (the core commercial keyword targets)
3. Supporting core pages (/about/, /contact/, /reviews/)

---

## PAGE BUILD ORDER

Build in this exact sequence — each page provides internal link targets for the next:

1. `/` — Homepage (establishes the internal linking hub)
2. `/services/commercial-furniture-installation-chicago-il/` — Primary money page
3. `/services/cubicle-installation-chicago-il/`
4. `/services/office-relocation-chicago-il/`
5. `/services/systems-furniture-installation-chicago-il/`
6. `/services/office-furniture-delivery-setup-chicago-il/`
7. `/services/commercial-space-planning-chicago-il/`
8. `/about/`
9. `/contact/`
10. `/reviews/`

---

## HOMEPAGE — `/`

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Office Furniture Installer Chicago IL | On Point Installations',
  description: 'On Point Installations is Chicago\'s trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/',
});
```

### Schema (all three — homepage only)
```tsx
<LocalBusinessSchema />
<OrganizationSchema />
<WebSiteSchema />
```

### Page Sections (in order)
1. **Hero** — H1: `Commercial Office Furniture Installer in Chicago, IL` | Subheading: "Non-union. Fully insured. 11,000+ projects since 2010." | CTA: Call (847) 550-4042 + Get a Free Quote → /contact/ | Background: real project photo
2. **Trust bar** — 5.0★ / 25 Google Reviews | 15 Years in Business | 11,000+ Projects | 12–15 Person Crew
3. **Services grid** — 6 service cards linking to primary Chicago service pages
4. **Why On Point** — 3–4 differentiators pulled from Prompt 12 review language: "I selfishly don't want to recommend this company" quote angle, non-union advantage, no subcontracting, same-day quotes
5. **Service area** — city list with links to city service pages (Chicago, Schaumburg, Naperville, Waukegan, Wauconda)
6. **Review snippet** — 2–3 review quotes from GBP (pull from Prompt 12 analysis)
7. **CTA block** — "Ready to get started? Call (847) 550-4042 or request a quote online."

### Internal Links (required — these are the audit-specified anchor texts)
- → /services/commercial-furniture-installation-chicago-il/ anchor: "commercial furniture installation Chicago"
- → /services/cubicle-installation-chicago-il/ anchor: "cubicle installation"
- → /services/office-relocation-chicago-il/ anchor: "office relocation services"
- → /services/commercial-space-planning-chicago-il/ anchor: "commercial space planning"
- → /project-gallery/ anchor: "view our completed projects"
- → /reviews/ anchor: "see what our clients say"
- → /contact/ anchor: "get a free quote"

---

## PRIMARY MONEY PAGE — `/services/commercial-furniture-installation-chicago-il/`

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Installation Chicago | On Point Installations',
  description: 'Professional commercial furniture installation in Chicago, IL. Office systems, cubicles, systems furniture & more. Non-union. Serving Chicagoland since 2010. Call (847) 550-4042.',
  canonical: 'https://onpointinstallations.com/services/commercial-furniture-installation-chicago-il/',
});
```

### Schema
```tsx
<BreadcrumbSchema items={[
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services/' },
  { name: 'Commercial Furniture Installation Chicago', url: '/services/commercial-furniture-installation-chicago-il/' },
]} />
<ServiceSchema
  name="Commercial Office Furniture Installation in Chicago, IL"
  description="Professional, fully insured commercial office furniture installation services throughout Chicago and the greater Chicagoland area. Non-union installation crews handle cubicle systems, panel systems, workstations, executive furniture, conference room furniture, and complete office setups."
  serviceType="Commercial Furniture Installation"
  areaServed={["Chicago", "Schaumburg", "Naperville", "Waukegan", "Wauconda"]}
/>
<FAQSchema faqs={chicagoServiceFAQs} />
```

### H1
`Commercial Furniture Installation in Chicago, IL`

### Page Sections (in order)
1. **Breadcrumb** — Home > Services > Commercial Furniture Installation Chicago
2. **Intro paragraph** — Lead with the outcome, not the service. "When your Chicago office needs furniture installed right — on time, on budget, and without the need to babysit the crew — On Point Installations is the team dealers and facility managers call first." Include primary keyword in first 80 words.
3. **What We Install** — H2: "What Our Chicago Office Furniture Installation Includes" — bulleted scope list: cubicle and panel systems, systems furniture (Herman Miller, Steelcase, Haworth, Knoll, Teknion, Hon, Allsteel), workstations, executive furniture, conference room, reception, healthcare, modular
4. **Why Choose On Point** — H2: "Why Chicago Businesses Choose On Point Installations" — use review language from Prompt 12: non-union flexibility, no subcontracting, fully insured, 130+ years combined experience, 11,000+ completed projects
5. **Service scope** — H2: "What's Included in Every Installation" — receiving and inspection, assembly, configuration, leveling, cleanup, punch list walk-through
6. **Brands** — H2: "Furniture Brands We Install" — Herman Miller, Steelcase, Haworth, Knoll, Teknion, Hon, Allsteel, Kimball, Trendway, DIRTT, Groupe Lacasse
7. **FAQ section** — H2: "Frequently Asked Questions" — use FAQAccordion component with FAQSchema. Minimum 5 Q&As from Prompt 17 Schema 5 FAQ block.
8. **CTA** — "Get a quote for your Chicago commercial furniture installation. Call (847) 550-4042 or request a free estimate online."

### Internal Links (required)
- → /services/cubicle-installation-chicago-il/ anchor: "cubicle installation in Chicago"
- → /services/office-relocation-chicago-il/ anchor: "office relocation services"
- → /services/commercial-space-planning-chicago-il/ anchor: "commercial space planning Chicago"
- → /project-gallery/ anchor: "see our completed Chicago projects"
- → /contact/ anchor: "get a free quote"
- → /services/commercial-furniture-installation-schaumburg-il/ anchor: "Schaumburg furniture installation"
- → /services/commercial-furniture-installation-naperville-il/ anchor: "Naperville furniture installation"

### Word count target: 800–1,000 words

---

## SERVICE PAGE PATTERN (apply to all remaining service pages)

Each service page follows the same structure. Fill in the specifics per service:

```
Breadcrumb
H1: [Service] in Chicago, IL
Intro paragraph (primary keyword in first 80 words)
H2: What [Service] Includes
H2: Why Choose On Point Installations
H2: [Service] for Chicago Businesses (city-specific paragraph)
H2: Frequently Asked Questions (FAQAccordion + FAQSchema — 5 Q&As minimum)
CTA block
```

### `/services/cubicle-installation-chicago-il/`
- Title: `Cubicle Installation Chicago | On Point Installations`
- H1: `Cubicle Installation in Chicago, IL`
- Meta: `Expert cubicle installation in Chicago, IL. New installs, reconfigurations, and teardowns for offices of all sizes. Non-union. Call (847) 550-4042.`
- Target keyword: cubicle installation Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /blog/what-is-cubicle-installation/ | → /contact/

### `/services/office-relocation-chicago-il/`
- Title: `Office Relocation Services Chicago | On Point Installations`
- H1: `Office Relocation Services in Chicago, IL`
- Meta: `Commercial office relocation in Chicago, IL. Teardown, transport, reinstallation, electrical disconnect/reconnect. Trusted since 2010. Call (847) 550-4042.`
- Target keyword: office relocation Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /services/office-furniture-delivery-setup-chicago-il/ | → /contact/

### `/services/systems-furniture-installation-chicago-il/`
- Title: `Systems Furniture Installation Chicago | On Point Installations`
- H1: `Systems Furniture Installation in Chicago, IL`
- Meta: `Commercial systems furniture installation in Chicago, IL. Haworth, Knoll, Steelcase, Herman Miller & more. Non-union team. Call (847) 550-4042.`
- Target keyword: systems furniture installation Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /blog/what-is-systems-furniture/ | → /contact/

### `/services/office-furniture-delivery-setup-chicago-il/`
- Title: `Office Furniture Delivery & Setup Chicago | On Point Installations`
- H1: `Office Furniture Delivery & Setup in Chicago, IL`
- Meta: `Office furniture delivery and setup services in Chicago, IL. White-glove delivery, assembly, and placement for commercial spaces. Call (847) 550-4042.`
- Target keyword: office furniture delivery setup Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /services/office-relocation-chicago-il/ | → /contact/

### `/services/commercial-space-planning-chicago-il/`
- Title: `Commercial Space Planning Chicago | On Point Installations`
- H1: `Commercial Space Planning in Chicago, IL`
- Meta: `Commercial space planning services in Chicago, IL. On-site measurement, floor plan verification, code compliance guidance. Call (847) 550-4042.`
- Target keyword: commercial space planning Chicago
- Internal links: → /services/commercial-furniture-installation-chicago-il/ | → /blog/what-to-do-when-office-furniture-doesnt-fit/ | → /contact/

---

## /about/ PAGE

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'About On Point Installations | Commercial Furniture Installers | Wauconda, IL',
  description: 'Brian Vetter founded On Point Installations in 2010. Learn about our team, our non-union advantage, and why Chicago businesses trust us for commercial furniture installation.',
  canonical: 'https://onpointinstallations.com/about/',
});
```

### Schema
```tsx
<BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }]} />
<PersonSchema
  name="Brian Vetter"
  jobTitle="Founder and Owner"
  description="Brian Vetter founded On Point Installations, Inc. in 2010 and has built it into a leading commercial furniture installation company serving the Chicagoland metropolitan area and Tri-State region."
/>
```

### H1: `About On Point Installations`

### Sections
1. Brian's story — founded 2010, 15+ years, built on repeat business from dealers and corporate clients
2. By the numbers — 11,000+ projects, 130+ years combined team experience, 12–15 person crew, 5.0★ rating
3. Non-union advantage — flexibility, no jurisdiction restrictions, same crew from start to finish
4. Who we serve — furniture dealers, facilities directors, office managers, corporate project leads, healthcare, education, government
5. CTA → /contact/

---

## /contact/ PAGE

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Contact On Point Installations | Chicago Commercial Furniture Installer',
  description: 'Get a quote for commercial furniture installation in the Chicago metro area. Call (847) 550-4042 or fill out our contact form. On Point Installations — Wauconda, IL.',
  canonical: 'https://onpointinstallations.com/contact/',
});
```

### H1: `Contact On Point Installations`

### Sections
1. ContactForm component — fields: Name, Company, Phone, Email, Project type (dropdown), City, Project details (textarea)
2. Direct contact — phone number (large, tappable on mobile), email, address
3. Hours — Monday–Friday 9AM–5PM
4. NAP component (schema-eligible)

---

## /reviews/ PAGE

### Metadata
```typescript
export const metadata = generatePageMetadata({
  title: 'Reviews | On Point Installations | Chicago Commercial Furniture Installers',
  description: 'See what clients say about On Point Installations. 5.0★ Google rating. Expert commercial furniture installation across Chicagoland since 2010.',
  canonical: 'https://onpointinstallations.com/reviews/',
});
```

### H1: `Client Reviews & Testimonials`

### Sections
1. Rating summary — 5.0★ / 25 Google Reviews (update count dynamically or hard-code with note to update)
2. Review cards — pull top quotes from Prompt 12 review analysis including the "I selfishly don't want to recommend this company" angle
3. CTA → /contact/

---

## INTERNAL LINKING MAP (Phase 2 pages only)

Every arrow below must be a live `<Link>` with the specified anchor text:

```
Homepage → /services/commercial-furniture-installation-chicago-il/ (anchor: "commercial furniture installation Chicago")
Homepage → /services/cubicle-installation-chicago-il/ (anchor: "cubicle installation")
Homepage → /services/office-relocation-chicago-il/ (anchor: "office relocation services")
Homepage → /reviews/ (anchor: "see what our clients say")
Homepage → /contact/ (anchor: "get a free quote")

/services/commercial-furniture-installation-chicago-il/ → /services/cubicle-installation-chicago-il/ (anchor: "cubicle installation in Chicago")
/services/commercial-furniture-installation-chicago-il/ → /services/office-relocation-chicago-il/ (anchor: "office relocation services")
/services/commercial-furniture-installation-chicago-il/ → /contact/ (anchor: "get a free quote")

/about/ → /services/ (anchor: "our services")
/about/ → /contact/ (anchor: "request a quote")
/about/ → /reviews/ (anchor: "see reviews")
```

---

## PHASE 2 COMPLETION CRITERIA

- [ ] Homepage fully built — all 7 sections, all schema, all internal links live
- [ ] Primary money page (/services/commercial-furniture-installation-chicago-il/) fully built — 800+ words, FAQ with 5 Q&As, all schema, all internal links
- [ ] All 5 additional Chicago service pages built per pattern — correct metadata, H1, schema, internal links
- [ ] /about/, /contact/, /reviews/ built and internally linked
- [ ] All BreadcrumbSchema components rendering correctly (validate via Rich Results Test on staging)
- [ ] All ServiceSchema and FAQSchema components rendering correctly
- [ ] PersonSchema rendering on /about/
- [ ] All three homepage schemas rendering correctly (LocalBusiness, Organization, WebSite)
- [ ] No duplicate title tags across any two pages
- [ ] All internal links from the mapping above are live and pointing to correct URLs
- [ ] Lighthouse score on homepage: Performance > 85, Accessibility > 95, Best Practices > 95, SEO 100

---

## NEXT PHASE PREVIEW

**Phase 3** builds all city service pages using a template-driven approach — Schaumburg, Naperville, Waukegan, Wauconda — plus the service area hub pages. Have the Prompt 11 (City Page Builder) full page copy available — 6 complete pages were written with exact body copy, FAQs, and CTAs.


*Maintained by IntegrePro Software LLC. Update this file as Brian closes open questions; do not edit historical decisions without versioning.*
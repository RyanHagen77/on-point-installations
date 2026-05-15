# On Point Installations — Claude Code Handoff Prompt
# Paste this into Claude Code at the start of the first session
# All phase files and BUILD_PLAN.md are in this project directory

---

## WHO YOU ARE AND WHAT WE'RE BUILDING

You are the developer assistant for IntegrePro Software LLC. We are building a new Next.js website for **On Point Installations, Inc.**, a commercial furniture installation company based in Wauconda, IL. This is a full replacement of an existing WordPress site.

The entire project is pre-specified. A 19-prompt SEO audit was completed before any code was written. Every URL, title tag, H1, meta description, schema block, redirect, and internal link has been determined by that audit. Your job is to implement the specification exactly — not to make design or SEO decisions independently. If something in the spec seems wrong or unclear, flag it before proceeding.

**All specification files are in this project directory:**
- `BUILD_PLAN.md` — master specification (site inventory, tech stack, page architecture, SEO config, redirect map, content requirements, schema plan, component list, agent integration points, migration checklist, open questions)
- `Phase1_Kickoff_Scaffold_Components.md` — project scaffold, folder structure, constants, redirects, core components
- `Phase2_Kickoff_Homepage_ServicePages.md` — homepage, primary service pages, /about/, /contact/, /reviews/
- `Phase3_Kickoff_CityPages_ServiceAreaHub.md` — city service pages, service area hub, secondary service pages
- `Phase4_Kickoff_Blog_Sanity_CMS.md` — Sanity CMS setup, blog index, blog post route, WordPress migration
- `Phase5_Kickoff_Schema_GTM_Launch_Prep.md` — schema validation, redirect verification, GA4/GTM migration
- `Phase6_Kickoff_Launch_DNS_PostLaunch.md` — DNS cutover, GSC, GBP, post-launch monitoring

**Read BUILD_PLAN.md and Phase1_Kickoff_Scaffold_Components.md before writing a single line of code.**

---

## FIRST SESSION TASK — CREATE AND DEPLOY THE PROJECT

Your first task is to initialize the project and get a live staging URL on Vercel. Do this before any component or page work.

### Step 1 — Initialize Next.js project

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Answer the prompts:
- Would you like to use TypeScript? → Yes
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Yes
- Would you like to use the `src/` directory? → Yes
- Would you like to use App Router? → Yes
- Would you like to customize the import alias? → Yes → @/*

### Step 2 — Install additional dependencies

```bash
npm install next-sanity @sanity/image-url @portabletext/react
npm install next-sitemap
npm install react-hook-form
npm install @tailwindcss/typography
npm install --save-dev @sanity/cli
```

### Step 3 — Create the complete folder structure

Create every directory and stub file per Phase1_Kickoff_Scaffold_Components.md Section "FOLDER STRUCTURE". Every route must exist as a stub from day one — this ensures the sitemap is complete and no page is accidentally missed in later phases.

For stub pages, use this minimal pattern:
```typescript
// Every stub page — update metadata and content in its phase
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: '[PAGE TITLE]',
  description: '[META DESCRIPTION]',
  canonical: 'https://onpointinstallations.com/[path]/',
});

export default function PageName() {
  return (
    <main>
      <h1>[H1 FROM SPEC]</h1>
      {/* Content coming in Phase [X] */}
    </main>
  );
}
```

Use the exact title tags, H1s, and meta descriptions from BUILD_PLAN.md Section 4 for every stub — never use placeholder text like "Coming soon" or "TODO" for SEO fields.

### Step 4 — Build lib/constants.ts

Build this file completely before anything else. Every component in the entire project pulls from this file. No hardcoded strings anywhere in the codebase.

Use the complete constants from Phase1_Kickoff_Scaffold_Components.md Section "GLOBAL CONSTANTS".

### Step 5 — Build next.config.js with complete redirect map

Use the complete redirect array from Phase1_Kickoff_Scaffold_Components.md Section "REDIRECT MAP". All 15 redirects must be in place from the first deploy.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // All 15 redirects from Phase 1 spec
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

module.exports = nextConfig;
```

### Step 6 — Build lib/metadata.ts

```typescript
import { Metadata } from 'next';
import { SITE } from './constants';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'Office Furniture Installer Chicago IL | On Point Installations',
    template: '%s | On Point Installations',
  },
  description: 'On Point Installations is Chicago\'s trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}
```

### Step 7 — Build the root layout

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/metadata';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

Note: GTM snippet goes in the layout in Phase 5 once the GTM container ID is available.

### Step 8 — Build core layout components

Build these three components completely in Phase 1 — every other phase depends on them:

**Navigation.tsx:**
- Desktop: logo left, nav links center, phone number + "Get a Quote" button right
- Mobile: hamburger menu, phone number always visible in header
- Links: Home, Services (dropdown with all service pages), Service Areas, About, Reviews, Blog, Contact
- Phone number: `href={SITE.phoneHref}` — always tappable on mobile
- Active state: highlight current page

**Footer.tsx:**
- Column 1: Logo, company description, phone, address, hours
- Column 2: Services (links to all primary service pages)
- Column 3: Service Cities (links to all city service pages)
- Column 4: Company (About, Reviews, Project Gallery, Blog, Contact)
- Bottom bar: © 2025 On Point Installations, Inc. | Privacy Policy | Terms of Service
- NAP in footer must match schema exactly: "On Point Installations, Inc. | 1220 Karl Ct, Wauconda, IL 60084 | (847) 550-4042"

**CTABlock.tsx:**
Three variants controlled by a `variant` prop:
- `primary` — large CTA with phone number button + "Request a Quote" link → /contact/
- `secondary` — smaller inline CTA, text + link
- `banner` — full-width strip with contrasting background, used at bottom of service pages

### Step 9 — Stub all schema components

Create stub components for all 8 schema types in `src/components/schema/`. Each accepts typed props and renders a `<script type="application/ld+json">` tag. Implement them fully in Phase 5 — for now, create the files with the correct interfaces so TypeScript is happy throughout the build.

```typescript
// Example stub — src/components/schema/BreadcrumbSchema.tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://onpointinstallations.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

Follow this pattern for: LocalBusinessSchema, OrganizationSchema, WebSiteSchema, ServiceSchema, FAQSchema, PersonSchema, ArticleSchema.

### Step 10 — Configure next-sitemap

```javascript
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://onpointinstallations.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/studio/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/studio/'] },
    ],
  },
};
```

Add to package.json scripts:
```json
"postbuild": "next-sitemap"
```

### Step 11 — Deploy to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? [IntegrePro account]
# Link to existing project? No
# Project name: onpoint-installations
# Directory: ./
# Override settings? No
```

After deploy, confirm:
- Staging URL is live (e.g., onpoint-installations-[hash].vercel.app)
- All stub pages load without errors
- No 404s on any route
- Redirects are working on the staging domain

```bash
# Verify a redirect on staging
curl -I https://[staging-url].vercel.app/space-planning/
# Expected: 301 → /services/commercial-space-planning-chicago-il/
```

---

## SEO RULES — ENFORCE THROUGHOUT ALL PHASES

These rules apply to every file in the project. Never deviate without flagging it.

1. **Every page has a unique title tag and meta description.** Run a check before each phase completes — no duplicates, no placeholders.
2. **Never hardcode NAP.** Always pull from `@/lib/constants` SITE object.
3. **Every non-homepage page renders a BreadcrumbSchema component** in the page `<head>`.
4. **Every service page renders ServiceSchema and FAQSchema.**
5. **The homepage renders LocalBusinessSchema, OrganizationSchema, and WebSiteSchema — all three.**
6. **The /about/ page renders PersonSchema for Brian Vetter.**
7. **All blog posts render ArticleSchema. If FAQs exist, also render FAQSchema.**
8. **The redirect map in next.config.js is the source of truth.** No new URLs without corresponding redirects for old ones.
9. **Image alt text is required on every `<Image>` component.** ESLint jsx-a11y will catch missing alt — fix all warnings.
10. **Phone number link always uses `href={SITE.phoneHref}`.** Never hardcode the phone number string.
11. **No page links to /site-credits/.** It redirects to /about/ but must not be linked from anywhere in the new site.
12. **Brand name in all schema and copy: "On Point Installations, Inc."** — with the 's'. Zero instances of "On Point Installation" (singular) anywhere in the codebase.

---

## PHASE SEQUENCE

After the first session (project created and deployed to Vercel), work through phases in order. Start each phase by reading the corresponding phase file completely before writing any code.

| Phase | File | Primary Deliverable |
|-------|------|-------------------|
| 1 | Phase1_Kickoff_Scaffold_Components.md | ✅ Done in first session |
| 2 | Phase2_Kickoff_Homepage_ServicePages.md | Homepage + Chicago service pages + /about/ /contact/ /reviews/ |
| 3 | Phase3_Kickoff_CityPages_ServiceAreaHub.md | City pages + service area hub + secondary services |
| 4 | Phase4_Kickoff_Blog_Sanity_CMS.md | Sanity CMS + blog routes + content migration |
| 5 | Phase5_Kickoff_Schema_GTM_Launch_Prep.md | Schema validation + GA4/GTM + Core Web Vitals |
| 6 | Phase6_Kickoff_Launch_DNS_PostLaunch.md | DNS cutover + GSC + GBP + launch |

At the start of each new Claude Code session after the first, paste this context block so the assistant has orientation:

```
We are building the On Point Installations Next.js site for IntegrePro Software LLC.
All spec files are in this project directory — read BUILD_PLAN.md for the master spec.
Current phase: [X]
Phase file: [PhaseX_Kickoff_*.md]
Last completed: [describe what was done in the previous session]
Next task: [describe what to build next]
```

---

## DECISIONS ALREADY MADE — DO NOT RE-LITIGATE

These were decided in the audit and are final:

- **Framework:** Next.js 14+ App Router (not Vite, not CRA, not Remix)
- **Hosting:** Vercel
- **CMS:** Sanity.io for blog content only
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Rendering:** SSG for service/city pages, ISR (24hr) for blog, SSR for contact confirmation only
- **Analytics:** GA4 via GTM (not direct gtag)
- **Fonts:** next/font (pending brand style guide from Brian)
- **Images:** Next.js Image component, WebP/AVIF output
- **URL structure:** Per BUILD_PLAN.md Section 3 — do not change any slug

---

## WHAT TO DO WHEN YOU'RE UNSURE

1. **Check BUILD_PLAN.md first.** The answer is usually there.
2. **Check the relevant phase file.** Phase files have implementation details BUILD_PLAN.md doesn't repeat.
3. **Flag it before proceeding.** If the spec is silent on something, ask before making a decision that affects SEO (URLs, metadata, schema, internal links). Make design decisions independently if they don't affect SEO.
4. **Never guess on SEO-critical fields.** Title tags, H1s, meta descriptions, canonical URLs, and schema are audit outputs — they are not approximations.

---

## OPEN QUESTIONS (need answers from Brian before Phase 2 completes)

- [ ] Brand style guide — exact hex colors, typography, logo files (SVG + PNG)
- [ ] Project gallery photos — where are they stored, who owns them?
- [ ] Contact form handler — email notification only, or CRM?
- [ ] Electrical/voice/data cabling service page — keep or remove?
- [ ] GTM container ID — new container or was one previously created?
- [ ] GBP full ownership confirmed — is it under Brian's Google account?
- [ ] Wikidata entity — has it been created? If yes, what is the Q-number?
- [ ] Email address — what is the public contact email?

---

*This project was specified by a 19-prompt SEO audit completed by IntegrePro Software LLC. All SEO configuration derives from live Google Search Console data, GBP audit, competitor analysis, keyword research, and entity optimization. Do not modify SEO-critical fields without referencing the source audit reports.*

# Design Decisions

Decisions made during the build where multiple valid options existed. Documented here so future sessions know which path was chosen and why.

---

## Service Architecture — 8 Pages, Live-Site Set, Audit URLs Where They Map

**Decision (locked 2026-05-16):** The new site has 8 service pages matching the live site's 8 services exactly. Audit-specified SEO slugs are used where they map cleanly; new Chicago-suffixed slugs are used for the other 4. Three audit-only URLs fold into the Office Installations money page as H2 sections.

**Canonical 8 services and slugs:**
1. Office Installations → `commercial-furniture-installation-chicago-il` (audit URL, money page)
2. Relocation → `office-relocation-chicago-il` (audit URL)
3. Warehousing → `commercial-office-furniture-storage-chicago-il` (audit URL)
4. Space Planning → `commercial-space-planning-chicago-il` (audit URL)
5. Electrical & Voice/Data → `electrical-voice-data-cabling-chicago-il` (new slug)
6. Artwork Installation → `artwork-installation-chicago-il` (new slug)
7. Window Treatment Installations → `window-treatment-installation-chicago-il` (new slug)
8. Cubicle Wall and Upholstery Cleaning → `cubicle-wall-upholstery-cleaning-chicago-il` (new slug)

**Three audit URLs absorbed into Office Installations:**
- `cubicle-installation-chicago-il` → H2: "Cubicle Installation in Chicago"
- `systems-furniture-installation-chicago-il` → H2: "Systems Furniture Installation in Chicago"
- `office-furniture-delivery-setup-chicago-il` → H2: "Office Furniture Delivery & Setup"

Their audit-specified keywords and FAQ content are preserved inside the Office Installations page rather than discarded. 301 redirects from all three slugs are in `next.config.ts`.

**Why:** The live site has 8 services — users and Brian's clients know this service set. The audit targeted a narrower 6-page Chicago SEO structure, but forcing 6 audit-only pages would break the brand's existing navigation muscle memory and leave 4 live services without pages. The umbrella approach retains all keyword targeting inside the money page.

---

## Mobile Header — Phone Number Treatment

**Decision:** Phone icon (Option A) — not a styled text number (Option B)

**Context:** On mobile, the header shows `[Logo] … [phone] [hamburger]`. The phone was rendering as plain dark text (`text-sm font-semibold text-[#292929]`), which looked like accidental content rather than an interactive element.

**Options considered:**
- **Option A:** Replace phone text with a phone SVG icon on mobile. Icon is a `tel:` link in maroon (`text-[#800000]`). Full phone number text continues to display on desktop (`lg:` breakpoint and above).
- **Option B:** Style the phone number as a small maroon button on mobile.

**Chosen:** Option A (phone icon)

**Reason:** The phone icon takes minimal horizontal space in a tight mobile header, is universally recognizable as a call action, and the maroon color clearly signals it is interactive without requiring a button container. Option B would add visual weight to an already compact header and crowd the logo/hamburger.

**Implementation:** `src/components/layout/Navigation.tsx` — mobile phone link renders an SVG phone path icon at `w-5 h-5` in `text-[#800000]`. Desktop (`lg:flex`) continues to render the full `{SITE.phone}` string.

---

## Primary Brand Color — Maroon (#800000)

**Decision:** `#800000` is the confirmed primary brand color used throughout the new build.

**Context:** The live site CSS was extracted during Phase 2 kickoff. The dominant accent hex across all interactive elements, borders, headings, and CTAs on the current site is `#800000` (maroon/dark red). All button backgrounds, active nav states, header borders, and H2 headings in the new build use this value. Hover states use `#5A0000`.

**Extracted from:** `https://onpointinstallations.com` CSS — most-used dark hex by frequency.

**Implementation:** Used as a literal value throughout the codebase (`bg-[#800000]`, `text-[#800000]`, `border-[#800000]`) rather than as a Tailwind design token, because Tailwind v4 uses CSS-first config via `@theme {}` in `globals.css` — not `tailwind.config.ts`.

---

## Brand Font — Wix Madefor Text

**Decision:** Wix Madefor Text is the confirmed brand typeface used in the new build.

**Context:** The live site loads Wix Madefor Text from Google Fonts. Extracted from the `fonts.googleapis.com` link tag in the live site's HTML during Phase 2 kickoff. Carried forward into the new build using `next/font/google`.

**Implementation:** `src/app/layout.tsx` — loaded with `variable: '--font-wix-madefor-text'` and applied to `<body>` via `font-[family-name:var(--font-wix-madefor-text)]`. Weights: 400, 500, 600, 700.

---

## H1 Size Scale — Responsive Typography

**Decision:** Three-step responsive H1 scale: `text-[32px]` mobile → `text-[42px]` tablet (sm) → `text-5xl` desktop (lg)

**Context:** The original H1 was set to a fixed large size that overflowed on mobile — text ran too wide and required two lines at a font size that looked disproportionate on small screens. The three-step scale keeps the H1 impactful on desktop while fitting cleanly on a standard phone viewport.

**Chosen values:**
- Mobile: `text-[32px] leading-[1.15]` — tight leading to prevent the two-line wrap from adding too much height
- Tablet (≥640px): `sm:text-[42px] sm:leading-tight`
- Desktop (≥1024px): `lg:text-5xl` (48px)

**Implementation:** `src/app/page.tsx` — H1 className: `text-[32px] leading-[1.15] sm:text-[42px] sm:leading-tight lg:text-5xl font-bold text-[#800000] mb-4`

---

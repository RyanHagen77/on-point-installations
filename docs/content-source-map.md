# Content Source Map — Service Pages

For each of the 8 canonical service pages: slug, display title, build status, content source, voice changes applied during port, and cross-references to spec-additions.md where structural departures were made.

All live-site URLs referenced below were fetched 2026-05-15 or 2026-05-16. Wayback Machine snapshots used where the live site was blocked by firewall (noted per page).

---

## 1. Office Installations (Umbrella Money Page)

**Slug:** `commercial-furniture-installation-chicago-il`
**Route:** `/services/commercial-furniture-installation-chicago-il/`
**Display title:** Office Installations
**Status:** Shipped (Phase 2)
**Page H1:** `Commercial Furniture Installation in Chicago, IL`
**Title tag:** `Commercial Furniture Installation Chicago | On Point Installations`
**Meta description:** `Professional commercial furniture installation in Chicago, IL. Office systems, cubicles, systems furniture & more. Non-union. Serving Chicagoland since 2010. Call (847) 550-4042.`

**Content source:**
- Intro and body: live site — `https://onpointinstallations.com/services/commercial-office-furniture-installation-chicago-il/`
- Title tag, H1, meta description: audit-specified (Phase 2 spec, Prompt 10)
- FAQs: audit-specified (Phase 2 spec, Prompt 17 FAQ block) — sourced, not drafted

**H2 structure (canonical order):**

| # | H2 Heading | Content source |
|---|---|---|
| 1 | What Our Chicago Office Furniture Installation Includes | Live site — Office Installations page (ported near-verbatim) |
| 2 | Cubicle Installation in Chicago | Drafted per Voice Rules — needs Brian review (see docs/known-issues.md) |
| 3 | Systems Furniture Installation | Drafted per Voice Rules — needs Brian review (see docs/known-issues.md) |
| 4 | Office Furniture Delivery and Setup | Drafted per Voice Rules — needs Brian review (see docs/known-issues.md) |
| 5 | Why Chicago Businesses Choose On Point Installations | Partially ported from live About page; remainder drafted — needs Brian review (see docs/known-issues.md) |
| 6 | Furniture Brands We Install | Live site — homepage brand list (ported verbatim) |
| 7 | Frequently Asked Questions | Audit spec — Phase 2 FAQSchema block, 5 Q&As |

**Structural departure:** This page absorbs three audit-only URLs as H2 sections. See `docs/spec-additions.md` — "Office Installations Money Page — Absorbed-URL H2 Sections."

| Absorbed URL | H2 on this page | Keyword absorbed |
|---|---|---|
| `/services/cubicle-installation-chicago-il/` | "Cubicle Installation in Chicago" | cubicle installation Chicago |
| `/services/systems-furniture-installation-chicago-il/` | "Systems Furniture Installation" | systems furniture installation Chicago |
| `/services/office-furniture-delivery-setup-chicago-il/` | "Office Furniture Delivery and Setup" | office furniture delivery setup Chicago |

Permanent 301 redirects from all three slugs are in `next.config.ts`.

---

## 2. Relocation

**Slug:** `office-relocation-chicago-il`
**Route:** `/services/office-relocation-chicago-il/`
**Display title:** Relocation
**Status:** Shipped (Phase 2)
**Page H1:** `Office Relocation Services in Chicago, IL`
**Title tag:** `Office Relocation Services Chicago | On Point Installations`
**Meta description:** `Commercial office relocation in Chicago, IL. Teardown, transport, reinstallation, electrical disconnect/reconnect. Trusted since 2010. Call (847) 550-4042.`

**Content source:**
- Body copy: live site — `https://onpointinstallations.com/services/company-office-relocation-chicago-il/` (intro paragraph, 5-bullet service scope, mission statement ported near-verbatim)
- Title tag, H1, meta description: audit-specified
- Expanded sections: dealer workflow, downtime communication details, FAQ Q&As — drafted per Voice Rules (needs Brian review)

**Structural departure:** Live-site page is ~150 words. New build expands to meet Phase 2 word target. See `docs/spec-additions.md` — "Office Relocation Service Page — Expanded Beyond Live-Site Content."

**Voice changes applied during port:** No em dashes found in live-site source for this page. Minor prose recasting for contractor voice where needed.

---

## 3. Warehousing

**Slug:** `commercial-office-furniture-storage-chicago-il`
**Route:** `/services/commercial-office-furniture-storage-chicago-il/`
**Display title:** Warehousing
**Status:** Shipped (Phase 2)
**Page H1:** `Commercial Office Furniture Storage in Chicago, IL`
**Title tag:** `Commercial Office Furniture Storage Chicago | On Point Installations`
**Meta description:** `Commercial office furniture storage in Wauconda, IL near Chicago. 15,000 sq ft primary + 40,000 sq ft secondary warehouse. Receive, store, and redeliver. Call (847) 550-4042.`

**Content source:**
- Body copy: live site — `https://onpointinstallations.com/services/commercial-office-furniture-storage-chicago-il/` (ported near-verbatim)
- Title tag, H1, meta description: working drafts — confirm against audit before Phase 5 finalize

---

## 4. Space Planning

**Slug:** `commercial-space-planning-chicago-il`
**Route:** `/services/commercial-space-planning-chicago-il/`
**Display title:** Space Planning
**Status:** Shipped (Phase 2)
**Page H1:** `Commercial Space Planning in Chicago, IL`
**Title tag:** `Commercial Space Planning Chicago | On Point Installations`
**Meta description:** `Commercial space planning services in Chicago, IL. On-site measurement, floor plan verification, code compliance guidance. Call (847) 550-4042.`

**Content source:**
- Ported content (~80 words): live site — `https://onpointinstallations.com/services/space-planning/` — single paragraph covering on-site measurement, floor core chalking, code compliance, and keeping installation on schedule
- Drafted content (remainder): H2 sections on what space planning includes, why it matters before installation, service use cases for dealers and facility managers — drafted per Voice Rules (needs Brian review)
- Title tag, H1, meta description: audit-specified

**Structural departure:** Live site has ~80 words; new build is a full service page. See `docs/spec-additions.md` — "Space Planning Service Page — Net-New Content."

---

## 5. Electrical & Voice/Data

**Slug:** `electrical-voice-data-cabling-chicago-il`
**Route:** `/services/electrical-voice-data-cabling-chicago-il/`
**Display title:** Electrical & Voice/Data
**Status:** Shipped (Phase 2)
**Page H1:** `Electrical, Voice & Data Cabling in Chicago, IL`
**Title tag:** `Electrical, Voice & Data Cabling Chicago | On Point Installations`
**Meta description:** `Commercial electrical, voice, and data cabling installation in Chicago, IL. High and low voltage for office furniture systems. Non-union. Call (847) 550-4042.`

**Content source:**
- Body copy: live site — `https://onpointinstallations.com/services/electrical-voice-and-data-cabling-for-your-commercial-installation/` (fetched 2026-05-15)
- Services Overview card grid: drafted per Voice Rules — intro summary before High Voltage and Voice & Data H2 sections; not on live site (see `docs/spec-additions.md`)
- "Why Electrical and Furniture Go Together" sidebar: drafted per Voice Rules (needs Brian review)
- FAQs: drafted per Voice Rules (needs Brian review — see `docs/known-issues.md`)
- Title tag, H1, meta description: working drafts — confirm against audit before Phase 5 finalize

**Voice changes applied during port:**
- "optimize your office setting" → recast: removed "optimize" (prohibited verb); replaced with concrete outcome sentence
- Intro construction with participate phrase → recast per Voice Rules

**Note:** Hero image (`on-point-installations-electrical-voice-data.jpg`) is a Depositphotos stock image carried from the live site. License confirmation needed from Brian. See `docs/known-issues.md`.

---

## 6. Artwork Installation

**Slug:** `artwork-installation-chicago-il`
**Route:** `/services/artwork-installation-chicago-il/`
**Display title:** Artwork Installation
**Status:** Shipped (Phase 2)
**Page H1:** `Artwork Installation in Chicago, IL`
**Title tag:** `Artwork Installation Chicago | On Point Installations`
**Meta description:** `Professional commercial artwork installation in Chicago, IL. Commercial art, signage, and display mounting for offices and businesses. Non-union. Call (847) 550-4042.`

**Content source:**
- Body copy: Wayback Machine snapshot `2025-10-07` of `https://onpointinstallations.com/services/artwork-installation/` (live site blocked by CyberOptik firewall during build)
- FAQs: drafted per Voice Rules (needs Brian review — see `docs/known-issues.md`)
- Title tag, H1, meta description: working drafts — confirm against audit before Phase 5 finalize

**Structural departure:** Live site presents paragraphs 3 and 4 as continuous prose under one H2. New build splits into "What On Point Installations Handles" and "Where We Install." See `docs/spec-additions.md` — "Artwork Installation — Section Split."

**Voice changes applied during port:**
- "Whether it's...unparalleled attention to detail" → recast as two concrete sentences about oversized art, hardware, and wall type
- "By partnering...optimizing the layout" → recast as "We handle it door to door: delivery, unpacking at the site, placement, installation, and cleanup."
- "Our mission...exceeding quality expectations" → omitted per Voice Rules (filler sentence)
- "If you're looking to..." AI tell opener → recast

---

## 7. Window Treatment Installations

**Slug:** `window-treatment-installation-chicago-il`
**Route:** `/services/window-treatment-installation-chicago-il/`
**Display title:** Window Treatment Installations
**Status:** Shipped (Phase 2)
**Page H1:** `Window Treatment Installation in Chicago, IL`
**Title tag:** `Window Treatment Installation Chicago | On Point Installations`
**Meta description:** `Professional office window treatment installation in Chicago, IL. Blinds, shades, and drapery for commercial spaces. Non-union. Call (847) 550-4042.`

**Content source:**
- Body copy: Wayback Machine snapshot `2025-11-11` of `https://onpointinstallations.com/services/window-treatment-installations/` (live site blocked by CyberOptik firewall during build)
- FAQs: drafted per Voice Rules (needs Brian review — see `docs/known-issues.md`)
- Title tag, H1, meta description: working drafts — confirm against audit before Phase 5 finalize

**Structural departure:** Live site presents all body copy as continuous prose under one H2. New build splits into "Window Treatment Installation Services" and "Where We Work." See `docs/spec-additions.md` — "Window Treatment — Section Split."

**Voice changes applied during port:**
- Rhetorical tricolon "productivity, wellbeing, and overall morale" → "productivity and wellbeing" (tricolon test: removing "morale" left the sentence saying the same thing)
- "Luckily...adding to aesthetics" → "The right window treatment handles the glare and keeps costs down."
- "optimize the window treatments" → recast with concrete outcome language
- "When you partner with On Point..." → "We handle it door to door:"
- "single-source installation solution" → "we're one call"
- Filler closing sentence omitted per Voice Rules

---

## 8. Cubicle Wall and Upholstery Cleaning

**Slug:** `cubicle-wall-upholstery-cleaning-chicago-il`
**Route:** `/services/cubicle-wall-upholstery-cleaning-chicago-il/`
**Display title:** Cubicle Wall and Upholstery Cleaning
**Status:** Shipped (Phase 2)
**Page H1:** `Cubicle Wall & Upholstery Cleaning in Chicago, IL`
**Title tag:** `Cubicle Wall & Upholstery Cleaning Chicago | On Point Installations`
**Meta description:** `Professional cubicle wall and upholstery cleaning in Chicago, IL. Deep cleaning for panel systems and office furniture. Non-union. Call (847) 550-4042.`

**Content source:**
- Body copy: live site — `https://onpointinstallations.com/services/cubicle-wall-and-upholstery-cleaning/` (fetched 2026-05-16; direct fetch worked for this page)
- FAQs: drafted per Voice Rules (needs Brian review — see `docs/known-issues.md`)
- Title tag, H1, meta description: working drafts — confirm against audit before Phase 5 finalize

**Structural departures:**
- "Swinging Pendulum" trend-framing section omitted. See `docs/spec-additions.md` — "Cubicle Wall & Upholstery Cleaning — Swinging Pendulum Section Omitted."
- Productivity statistics omitted pending source verification. See `docs/known-issues.md` and `docs/spec-additions.md`.

**Voice changes applied during port:**
- Bullet label-to-detail separators: em dashes in live site → colons in new build

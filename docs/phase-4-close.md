# Phase 4 Close — IntegrePro SEO Lab Sandbox + Wave 1 Retrofits
# Closed: 2026-05-18

---

## Phase 4 Scope Summary

Phase 4 delivered two categories of work:

1. **Wave 1 page retrofits** — three Phase 3 retrofit items that were "READY TO EXECUTE" but not included in the Phase 3 close commit (commits 065bee5–52b4630)
2. **Blog infrastructure + sandbox proof-of-concept** — Sanity CMS schema for On Point production, and a full migration pipeline validated in the IntegrePro SEO Lab sandbox (commits 10da426–8657f88 are housekeeping; the sandbox development happened in the `integrepro-seo-lab` repo)

---

## Phase 4 Commit List — On Point Production Repo

| Hash | Description |
|---|---|
| `065bee5` | Fix: /about/ retrofit — Schaumburg + Naperville city page anchor links |
| `6a88731` | Fix: /project-gallery/ retrofit — Schaumburg anchor link in gallery intro |
| `dda741f` | Fix: Schaumburg CFI retrofit — Naperville anchor link in service details |
| `52b4630` | Schaumburg CFI retrofit: revise closing paragraph per voice rules |
| `10da426` | Docs/Fix: replace Resend with Postmark as contact form email provider |
| `1b6c773` | Docs: BUILD_PLAN.md — close contact form email provider open question |
| `35dbe1c` | Docs: phase-3-prep.md — mark Wave 1 retrofits as shipped |
| `def22d2` | Docs: known-issues.md — Phase 4 close note and blog migration carry-forwards |
| `8657f88` | Docs: Phase5_Kickoff — Phase 4 handoff, blog migration, Postmark scope |

---

## Sandbox State at Phase 4 Close

| Field | Value |
|---|---|
| Repo | https://github.com/RyanHagen77/integrepro-seo-lab |
| Deployed | https://project-wdufc.vercel.app |
| Sanity project ID | `hwyx6cco` |
| Sanity dataset | `production` |
| Posts imported | 3 of 25 (sample batch) |
| Blog index | https://project-wdufc.vercel.app/blog/ |
| Studio | https://project-wdufc.vercel.app/studio |

**What the sandbox proves:**
- Full WordPress → Sanity blog migration pipeline (HTML fetch → jsdom extraction → `@sanity/block-tools` Portable Text conversion → `createOrReplace` write)
- `@sanity/block-tools` v3.70.0 + `@sanity/schema` v5 schema compilation pattern
- Byline strip via `/^by\s/i` regex on first `<p>` element
- `--meta-description` override flag for posts with meta > 155 chars
- Per-post audit logs (`logs/<slug>.log` + `.err`)
- `--dry-run` flag for inspection before write
- GROQ `coalesce(publishedAt, _createdAt) desc` sort for posts with null `publishedAt`
- Article + BreadcrumbList JSON-LD always rendered; FAQPage conditional on `faqs.length > 0`
- FAQAccordion + FAQPage JSON-LD via Studio-authored `faqs` array field

**What is NOT in the sandbox (must be built for On Point production):**
- Image migration (script strips `<img>` tags; images need manual Sanity upload or separate tooling)
- `publishedAt` extraction (theme emits no date meta; needs WP REST API — see carry-forward #1 in Phase5_Kickoff)
- Category extraction (`.cat-links a` returns null; needs `.entry-header .cat-links a` — see carry-forward #2)
- Dead-link substitution (sandbox kept external `onpointinstallations.com` URLs; production must apply substitution table below)
- On-demand Sanity webhook revalidation
- Multi-user auth (Brian's Sanity account)
- Full 25-post load

---

## Sample Batch — 3 Posts Imported in Phase 4

| Internal label | WP date | Slug | Sanity _id |
|---|---|---|---|
| Sample #5 (first imported) | 2023-01-30 | `the-benefits-of-quality-furniture-installation` | `blog-the-benefits-of-quality-furniture-installation` |
| Sample #8 (second imported) | 2022-11-15 | `how-to-find-a-chicago-corporate-installation-expert` | `blog-how-to-find-a-chicago-corporate-installation-expert` |
| Sample #1 (third imported) | 2024-08-25 | `modular-furniture-designs` | `blog-modular-furniture-designs` |

All three verified: Article + BreadcrumbList JSON-LD present. Sample #8 additionally verified FAQPage JSON-LD with 3 Studio-authored FAQs.

---

## Full 25-Post WordPress Inventory

Source: WP REST API `/wp-json/wp/v2/posts` — confirmed 25 posts, no 26th post exists. Earlier estimate of 26 was an overcount.

| # | Published | Slug | Title |
|---|---|---|---|
| 1 | 2024-08-25 | `modular-furniture-designs` | Top 10 Modular Office Furniture Design Trends |
| 2 | 2023-04-25 | `how-to-find-the-right-team-for-your-office-furniture-installation-project` | How to Find the Right Team for Your Office Furniture Installation Project |
| 3 | 2023-03-27 | `the-importance-of-strong-relationships-between-office-furniture-dealerships-and-installation-providers` | The Importance of Strong Relationships Between Office Furniture Dealerships and Installation Providers |
| 4 | 2023-02-23 | `the-benefits-of-a-professional-restaurant-furniture-installation` | The Benefits of a Professional Restaurant Furniture Installation |
| 5 | 2023-01-30 | `the-benefits-of-quality-furniture-installation` | 7 Benefits of Quality Furniture Installation |
| 6 | 2023-01-06 | `this-years-biggest-modular-furniture-trends` | The Biggest Modular Furniture Trends |
| 7 | 2022-12-13 | `qualities-to-look-for-in-warehousing-services` | Qualities to Look for in Warehousing Services |
| 8 | 2022-11-15 | `how-to-find-a-chicago-corporate-installation-expert` | How to Find a Chicago Corporate Installation Expert |
| 9 | 2022-10-06 | `benefits-of-using-warehousing-services-during-downsizing-and-beyond` | 4 Benefits of Using Warehousing Services During Downsizing |
| 10 | 2022-09-08 | `factors-to-consider-when-relocating-to-a-smaller-space` | 4 Factors to Consider When Relocating Your Corporate Office to a Smaller Space |
| 11 | 2022-07-06 | `how-to-survive-office-downsizing` | How to Survive Office Downsizing |
| 12 | 2022-05-02 | `the-differences-between-high-and-low-voltage-electricity` | The Differences Between High- and Low-Voltage Electricity |
| 13 | 2022-04-12 | `different-types-of-window-treatments` | 5 Different Types of Window Treatments |
| 14 | 2022-04-12 | `5-reasons-you-need-a-professional-art-installation-team` | 5 Reasons You Need a Professional Art Installation Team |
| 15 | 2021-10-22 | `is-the-concept-of-a-physical-office-dying` | Is the Concept of a Physical Office Dying? |
| 16 | 2021-09-18 | `why-hybrid-workspaces-need-thoughtful-office-furniture` | Why Hybrid Workspaces Need Thoughtful Office Furniture |
| 17 | 2021-08-23 | `the-top-office-design-trends` | The Top Office Design Trends |
| 18 | 2021-08-23 | `6-signs-you-need-to-renovate-your-commercial-office` | 6 Signs You Need to Renovate Your Commercial Office |
| 19 | 2021-06-22 | `how-to-deal-with-a-surplus-of-office-furniture` | How to Deal with a Surplus of Office Furniture |
| 20 | 2021-05-25 | `what-can-an-office-furniture-installation-company-do-for-you` | What Can an Office Furniture Installation Company Do for You? |
| 21 | 2021-05-04 | `7-factors-to-consider-when-choosing-an-office-furniture-installation-company` | 7 Factors to Consider When Choosing an Office Furniture Installation Company |
| 22 | 2021-03-26 | `how-to-move-or-downsize-an-office` | How to Move or Downsize an Office |
| 23 | 2021-02-05 | `5-essential-tips-from-office-installers-in-chicago` | 5 Essential Tips From Office Installers in Chicago |
| 24 | 2020-12-23 | `how-to-ensure-safe-warehousing-for-your-product` | How to Ensure Safe Warehousing for Your Product |
| 25 | 2020-12-19 | `benefits-of-using-professional-office-furniture-installers` | 5 Benefits of Using Professional Office Furniture Installers |

All slugs are preserved as-is in the new build (existing WP slugs stay under `/blog/[slug]/`). No slug substitution needed for blog posts themselves — only for internal links within post bodies (see substitution table below).

---

## Internal Link Substitution Table for Production Migration

When migrating blog post bodies, any internal links pointing to old WP URLs must be substituted. The sandbox migration intentionally preserved these as external `onpointinstallations.com` URLs. Production migration must apply this table.

### Service page URL changes (old WP slug → new build slug)

| Old WP URL (as it appears in post body) | New build URL | Status |
|---|---|---|
| `/commercial-office-furniture-installation-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/` | SUBSTITUTE |
| `/services/commercial-office-furniture-installation-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/` | SUBSTITUTE |
| `/company-office-relocation-chicago-il/` | `/services/office-relocation-chicago-il/` | SUBSTITUTE |
| `/services/company-office-relocation-chicago-il/` | `/services/office-relocation-chicago-il/` | SUBSTITUTE |
| `/commercial-office-furniture-storage-chicago-il/` | `/services/commercial-office-furniture-storage-chicago-il/` | SUBSTITUTE |
| `/services/commercial-office-furniture-storage-chicago-il/` | `/services/commercial-office-furniture-storage-chicago-il/` | UNCHANGED |
| `/space-planning/` | `/services/commercial-space-planning-chicago-il/` | SUBSTITUTE |
| `/services/space-planning/` | `/services/commercial-space-planning-chicago-il/` | SUBSTITUTE |
| `/artwork-installation/` | `/services/artwork-installation/` | UNCHANGED (slug same, namespace added) |
| `/services/artwork-installation/` | `/services/artwork-installation/` | UNCHANGED |
| `/window-treatment-installations/` | `/services/window-treatment-installations/` | UNCHANGED (slug same) |
| `/services/window-treatment-installations/` | `/services/window-treatment-installations/` | UNCHANGED |
| `/about-us-chicago-il/` | `/about/` | SUBSTITUTE |
| `/contact-us/` | `/contact/` | SUBSTITUTE |

### Audit-only slugs (redirected to money page anchors)

| Old WP URL | Substitute URL |
|---|---|
| `/services/cubicle-installation-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/#cubicle-installation` |
| `/services/systems-furniture-installation-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/#systems-furniture` |
| `/services/office-furniture-delivery-setup-chicago-il/` | `/services/commercial-furniture-installation-chicago-il/#office-furniture-delivery-setup` |

### Dead links — no equivalent in new build

| Old WP URL pattern | Action |
|---|---|
| `/project/[any-slug]/` | Strip link; render as plain text |
| `/category/[any-name]/` | Strip link; render as plain text |

**Implementation note:** The migration script (`scripts/migrate-wp-post.ts`) currently logs dead-link warnings to `<slug>.err` for these patterns but does not substitute or strip. Before the 25-post production run, add substitution logic to `buildDocument()` or as a post-processing pass on the extracted body HTML. The `DEAD_PREFIXES` array in the script already identifies `/project/` and `/category/` as no-equivalent — extend it to apply actual DOM mutations rather than just warnings.

---

*Phase 4 closed 2026-05-18. Phase 5 is the next active phase.*

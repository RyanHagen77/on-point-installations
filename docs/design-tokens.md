# Design Tokens — On Point Installations

Extracted from the live WordPress site at `https://onpointinstallations.com`
on 2026-05-15. All values are confirmed from CSS source; none are approximated.

Source files inspected:
- `https://onpointinstallations.com/wp-content/themes/onpoint-installations/style.css`
- Inline `<style>` blocks in homepage HTML (WordPress block editor global styles)

---

## Colors

### Primary Brand Color
| Token | Hex | Usage |
|---|---|---|
| `--color-brand-primary` | `#800000` | Buttons, H1, H6, nav CTA button, scroll bar border, footer top border, active states |
| `--color-brand-primary-dark` | `#5A0000` | Button hover, dark variant |
| `--color-brand-primary-light` | `#C53333` | Button hover (light variant), icon accent, menu mobile active |

> **Note:** The brand primary is **maroon/dark red**, not navy blue. This was confirmed from the WordPress
> custom CSS variable `--wp--custom--primary--main: #800000`. The placeholder navy colors in Phase 1
> (`#1a3a5c`) were incorrect and must be replaced.

### Secondary / Neutral
| Token | Hex | Usage |
|---|---|---|
| `--color-brand-secondary` | `#535353` | Secondary text, body supporting copy |
| `--color-brand-secondary-dark` | `#131313` | Near black |
| `--color-brand-secondary-light` | `#B4B3B3` | Muted / disabled text |

### Dark Scale (text hierarchy)
| Token | Hex | Usage |
|---|---|---|
| `--color-dark-1` | `#292929` | Primary body text, nav links |
| `--color-dark-2` | `#5A5A5A` | Footer body text |
| `--color-dark-3` | `#898989` | Muted / secondary labels |

### Light Scale (backgrounds)
| Token | Hex | Usage |
|---|---|---|
| `--color-light-1` | `#E9E9E9` | Alternating section background (medium) |
| `--color-light-2` | `#F3F3F3` | Alternating section background (light) |
| `--color-light-3` | `#F8F8F8` | Near-white background sections |

### Structural
| Element | Color |
|---|---|
| Navigation background | `#ffffff` |
| Navigation link text | `#292929` (uppercase, weight 600) |
| Navigation CTA button | `#800000` background, white text |
| Scroll bar (sticky header) | White background, 2px `#800000` bottom border |
| Footer background | `#ffffff` |
| Footer top border | 2px solid `#800000` |
| Footer heading text | `#800000` |
| Footer body text | `#5A5A5A` |
| Footer link text | `#292929` |
| Footer link hover | `#800000` |

---

## Typography

### Font Family
| Token | Value | Notes |
|---|---|---|
| `--font-brand` | `'Wix Madefor Text', sans-serif` | Single font for headings and body — from `--wp--custom--font--1` |

Source: `--wp--custom--font--1: Wix Madefor Text,sans-serif`

Wix Madefor Text is a Google Font. Load via `next/font/google`. Weights available: 400, 500, 600, 700, 800.

### Heading Sizes (from theme CSS)
| Heading | Size |
|---|---|
| H1 | `2.6em` (~41.6px at 16px base) |
| H2 | `2.4em` (~38.4px) |
| H3 | `1.8em` (~28.8px) |
| H4 | `1.25em` (~20px) |
| H5 | `1em` (16px) |
| H6 | `0.85em` (~13.6px) |

H1 color: `#800000` (primary) — applied globally in theme CSS.

### Body Text
- Base font size: 16px
- Body color: `#292929` (`--color-dark-1`)

---

## Button Styles

Extracted from `.button, .wp-block-button__link` in theme CSS:

| Property | Value |
|---|---|
| Background | `#800000` |
| Hover background | `#5A0000` |
| Text color | `white` |
| Border radius | `3px` (radius--xs) |
| Padding | `0.75em 2.25em` |
| Font weight | `600` |
| Text transform | `uppercase` |

---

## Spacing Scale

From `--wp--custom--spacer--*` CSS variables:

| Token | Value |
|---|---|
| xxs | 10px |
| xs | 20px |
| sm | 30px |
| md | 40px |
| lg | 60px |
| xl | 80px |
| xxl | 100px |

---

## Border Radius Scale

From `--wp--custom--radius--*` CSS variables:

| Token | Value |
|---|---|
| xs | 3px |
| sm | 6px |
| md | 12px |
| lg | 24px |
| xl | 32px |
| full | 9999px |
| none | 0 |

---

## Layout / Container

| Token | Value |
|---|---|
| Regular container | 1320px |
| Wide container | 1720px |

---

## Status

| Token | Status |
|---|---|
| Primary color `#800000` | Extracted — confirmed from CSS source |
| Font `Wix Madefor Text` | Extracted — confirmed from CSS source |
| Button border-radius `3px` | Extracted — confirmed from CSS source |
| Heading sizes | Extracted — confirmed from CSS source |
| Navigation structure | Extracted from rendered HTML |
| Footer structure | Extracted from CSS source |
| Hero image URL | Confirmed in CLAUDE.md asset table |
| Logo URL | Confirmed in CLAUDE.md asset table |

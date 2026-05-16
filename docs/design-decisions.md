# Design Decisions

Decisions made during the build where multiple valid options existed. Documented here so future sessions know which path was chosen and why.

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

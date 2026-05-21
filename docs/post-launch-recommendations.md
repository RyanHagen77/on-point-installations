# Post-Launch Recommendations — On Point Installations Rebuild

This document captures content and configuration work that is outside the scope of the Phase 5 rebuild but should be addressed after Phase 6 domain cutover. Items here are content and editorial tasks (alt text, link audits, copy refinements) and asset replacements that require Brian's input. The rebuild itself ships complete on its technical scope.

Items should be handled by an SEO consultant or content editor working in Sanity Studio. None requires developer time.

## Content tasks for SEO consultant or content editor

### Alt text for 44 images

A worksheet at `tmp/alt-text-worksheet.xlsx` (delivered separately, gitignored from the repo) contains 44 rows organized in two sections.

Section A — 30 inline images with empty or placeholder alt attributes. These are images embedded inside blog post bodies where the original WordPress source had blank, single-character, or filename-derived alts. Each row includes the post slug, image position, source URL (clickable for visual reference), surrounding paragraph context from the source, and the Sanity Studio location where the alt is edited.

Section B — 22 featured images with filename-derived or title-derived alt fallbacks from the original migration. These are the large hero images at the top of each blog post. Each row shows the current alt value, the source URL, and the Sanity Studio location.

Recommended priority: Section B first (featured images are visible on blog index cards, OG social shares, and structured data), then Section A. Total work: roughly two to three hours for someone familiar with the business writing concise descriptive alts.

### Internal link insertion opportunities

Several blog posts have zero internal links to service pages or related posts. Examples include `how-to-survive-office-downsizing`. Internal cross-linking is an SEO signal (topical authority, crawl path, anchor-text relevance) and a user-experience signal (helps readers find related content).

The migration script preserved existing internal links and rewrote outdated URLs to the new structure. It did not invent new links — link insertion is content-aware editorial work that depends on understanding what each post is about and which service page or other blog post is the most relevant target.

Recommended: review each blog post, identify two to three relevant internal link targets per post, add links in Sanity Studio. The annotation type is `link` on text spans within Portable Text body content.

### External link editorial audit

Body content in several blog posts contains links to third-party sites (e.g., commercialcafe.com and others). Some are legitimate citations to industry sources. Others may be holdover from prior link-building strategies that no longer fit the current site's positioning, or may point to sites that are no longer authoritative.

The migration preserved external links exactly as authored. Editorial review is recommended: for each external link, decide whether to keep (real citation, useful to user), remove (former partner, dead site, competitor, or weak destination), or replace (link to internal page instead). Sanity Studio edits the link annotation on the relevant text span.

### Meta description overruns on 6 posts

Six blog posts have meta descriptions exceeding 155 characters. Sanity Studio surfaces this as a warning on the field. Search engines truncate descriptions at roughly this length, so the trailing portion is invisible. Recommended: rewrite to fit, leading with the key message in the first 120 characters.

## Asset replacements requiring Brian's input

### Phone-photo featured images on 10 posts

Ten featured images are at 640px on the longest edge or lower — phone photos taken on job sites. They render acceptably but lack resolution for retina displays and high-quality social sharing. Recommended: Brian provides higher-resolution replacements where available. Specific slugs listed in `docs/seo-audit/blog-asset-audit.md`.

### modular-furniture-designs featured image

The original WordPress source file (`mid-century-modern-modular-office-furniture-hero.jpg` and its variants) was deleted from the WordPress server and cannot be recovered. The rebuild currently uses the existing Sanity featured image from an earlier migration pass.

Recommended: Brian provides a replacement image relevant to the modular furniture content. Any reasonable office-modular-furniture photo at 1600px or higher on the longest edge will work.

### SVG logo

The current logo at `public/images/logo.png` is raster. The Rich Results Test flags this as a LocalBusiness schema image warning — Google prefers SVG for organizational logos. Recommended: Brian provides an SVG export of the On Point Installations logo. One-time replacement.

## Configuration tasks after Phase 6 cutover

### FAQ infrastructure

The Sanity schema and page template support FAQ sections on blog posts via a structured FAQ field. No posts currently populate it. When populated, FAQPage schema renders automatically on the page, which can earn rich snippets in search results.

Recommended: Brian and his SEO consultant identify which posts benefit from FAQ sections (typically informational posts where users have follow-up questions), then author three to five Q&A pairs per chosen post in Sanity Studio.

### Sanity webhook URL update

After the domain cuts over from on-point-installations.vercel.app to onpointinstallations.com, the Sanity webhook URL needs updating. In sanity.io/manage → On Point Installations project → API → Webhooks, edit the existing webhook and change the URL to https://onpointinstallations.com/api/revalidate. One field change. The secret and filter remain unchanged.

## Platform characteristics — document if audited

### Image filenames in page source are content-hashed

Sanity is content-addressed asset storage. Public CDN URLs use the asset's content hash, not the upload filename — a standard architecture across modern headless CMS platforms (Sanity, Contentful, Strapi, Cloudinary). This is consistent industry practice and is not a missed optimization.

The rebuild captures descriptive filename metadata at the Sanity asset document level (the `originalFilename` field, which is visible in Sanity Studio and surfaceable via Sanity API). Image-related SEO signals are carried by alt text, structured data (`ImageObject` schema), surrounding content, image dimensions, and format optimization (WebP/AVIF). Per Google's published guidance, image filenames themselves are a lightweight ranking signal — image search benefits slightly from descriptive filenames, but main web search ranking depends far more on alt text and surrounding context.

If an external SEO audit flags content-hashed image URLs as a deficiency, the response is the above explanation. The architecture is correct for the chosen platform.

## Suggested priority order

1. SEO consultant: 22 featured image alts (highest visibility — appears in blog index cards, social shares, search results)
2. SEO consultant: external link editorial audit (defensive — avoid leaking authority to inappropriate destinations)
3. SEO consultant: 30 inline image alts
4. SEO consultant: internal link insertion across the 25 blog posts
5. Brian: SVG logo (resolves Google Rich Results Test warning)
6. Brian: modular-furniture-designs replacement image
7. SEO consultant: meta description rewrites on 6 posts
8. Brian and SEO consultant: FAQ section planning and authoring
9. Brian: phone-photo featured image replacements where available

---

End of file.

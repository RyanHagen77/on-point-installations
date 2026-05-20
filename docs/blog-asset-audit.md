# Blog Asset Audit -- 2026-05-20

Generated: Session 4, Lane 2. All data fetched live from WP REST API + HTML scrape of onpointinstallations.com.

---

## Detection Methodology

**Stock photo detection** checked filename prefixes and URL fragments against:
- `depositphotos` -- Depositphotos
- `pexels` -- Pexels (free-use CC0, but not On Point job-site photos)
- `shutterstock` -- Shutterstock
- `gettyimages` -- Getty Images
- `istockphoto` -- iStockphoto

The initial script run omitted `pexels` from the detection pattern. This document reflects the corrected re-scan with Pexels included. All stock flags in the per-post inventory are accurate.

**Pexels licensing note:** Pexels images are CC0 -- no rights issue. The flag marks them as generic stock, not On Point job-site photography. They are candidates for replacement with real job photos when Brian provides them, but they are not a legal/licensing blocker like a lapsed Depositphotos license would be.

**Resize variant detection** flagged URLs with:
- Standard WP thumbnail suffix: `-NNNxNNN.ext` (e.g., `-300x225.jpeg`)
- WP `-NNNxNNN-N.ext` with cache-busting trailer (e.g., `-300x225-2.jpeg`) -- these fail the standard strip regex because of the `-2` trailer
- WP `-rotated-N.ext` suffix (e.g., `-rotated-2.jpeg`)
- Custom display-width suffix: `_1200.ext` (used in the modular-furniture-designs post set)

**Phone camera filenames** (`img_XXXX.jpeg`, `20XXXXXX_XXXXXX.jpeg`) are NOT resize variants -- they are sequential camera filenames. They are flagged as "below size spec" if dimensions are under 1600px, but not as resize variants requiring original derivation.

**Featured image dimensions** sourced from WP REST API `media_details.width/height`. Images below 1000px on the longest edge are noted -- most are phone photos uploaded as-is at 640x480.

**Inline images** for the 3 already-migrated posts sourced from `logs/<slug>.err` files. The `.err` file for `how-to-find-a-chicago-corporate-installation-expert` contained `-1200x927` and `-1200x900` resize variants; this audit lists those with the dimension suffix already stripped (confirmed the originals exist at the resulting URLs -- no `-2` trailer issue on that post).

---

## Summary

- Total posts: 25
- Posts with featured images: 25 (all)
- Posts with inline images: 25 (all)
- Posts with no images: 0

**Stock photo breakdown (Pexels):** 9 posts -- all flagged as Pexels (CC0 free-use; not Depositphotos, no licensing concern)
- `different-types-of-window-treatments` -- featured + 2 inline
- `5-reasons-you-need-a-professional-art-installation-team` -- featured + 1 inline
- `is-the-concept-of-a-physical-office-dying` -- featured + 1 inline
- `why-hybrid-workspaces-need-thoughtful-office-furniture` -- featured + 1 inline (1 inline is On Point job photo)
- `the-top-office-design-trends` -- featured + 2 inline
- `6-signs-you-need-to-renovate-your-commercial-office` -- featured + 2 inline
- `how-to-deal-with-a-surplus-of-office-furniture` -- featured + 2 inline
- `what-can-an-office-furniture-installation-company-do-for-you` -- featured + 2 inline
- `how-to-ensure-safe-warehousing-for-your-product` -- featured + 2 inline

**Depositphotos:** 0 blog posts. (The Depositphotos image flagged in known-issues.md is on the `/services/electrical-voice-data-cabling-chicago-il/` service page, not a blog post.)

**Resize variants needing original derivation (Session 5 work):** 2 posts
- `modular-furniture-designs` -- featured + 5 inline use `_1200.ext` display-width suffix
- `the-benefits-of-a-professional-restaurant-furniture-installation` -- 6 inline use `-300x225-2.jpeg` and `-rotated-2.jpeg` suffixes (the `-2` trailer breaks the standard strip regex)

**Small featured images (longest edge < 1000px):** 10 posts have featured images at 640px wide. These are phone photos uploaded at capture resolution. They are usable as article hero images (blog templates constrain to `max-w-3xl`) but do not meet the 1600px service-page spec from CLAUDE.md. The size note is informational -- blog hero sizing is less strict than service page heroes.

**Fetch errors:** 0. All 25 REST API calls and HTML fetches succeeded.

---

## Per-Post Inventory

### modular-furniture-designs `[already in Sanity]`
- Title: Top 10 Modular Office Furniture Design Trends
- Published: 2024-08-25
- Featured image: https://onpointinstallations.com/wp-content/uploads/mid-century-modern-modular-office-furniture-hero_1200.jpg (1200x800)
  - **Resize variant** -- `_1200` display-width suffix. Probable original: `mid-century-modern-modular-office-furniture-hero.jpg`
- Inline images (5) -- from .err log:
  - https://onpointinstallations.com/wp-content/uploads/3-collaborative-workspaces_1200.jpg **[resize variant]** -- original: `3-collaborative-workspaces.jpg`
  - https://onpointinstallations.com/wp-content/uploads/4-hidden-storage_1200.jpg **[resize variant]** -- original: `4-hidden-storage.jpg`
  - https://onpointinstallations.com/wp-content/uploads/6-cozy-collaborative-inviting-workspaces_1200.jpg **[resize variant]** -- original: `6-cozy-collaborative-inviting-workspaces.jpg`
  - https://onpointinstallations.com/wp-content/uploads/9-modular-furniture-styles-are-lowering-cubicle-wall-barriers_1200.jpg **[resize variant]** -- original: `9-modular-furniture-styles-are-lowering-cubicle-wall-barriers.jpg`
  - https://onpointinstallations.com/wp-content/uploads/10-curvy-multifunctional-modular-furniture_1200.jpg **[resize variant]** -- original: `10-curvy-multifunctional-modular-furniture.jpg`
- Notes: All inline images are display-width variants. Session 5 image migration script should fetch originals (strip `_1200`). Verify originals exist before bulk download.

---

### how-to-find-the-right-team-for-your-office-furniture-installation-project
- Title: How to Find the Right Team for Your Office Furniture Installation Project
- Published: 2023-04-25
- Featured image: https://onpointinstallations.com/wp-content/uploads/ir5i0ejc.jpeg (640x427)
  - Small: 640px wide (phone or third-party upload). 8-char random filename suggests import from external source (media library upload, not camera roll).
- Inline images (8):
  - https://onpointinstallations.com/wp-content/uploads/jkrvwsqy.jpeg
  - https://onpointinstallations.com/wp-content/uploads/c9yl0i4w.jpeg
  - https://onpointinstallations.com/wp-content/uploads/b7hmuoua-1.jpeg
  - https://onpointinstallations.com/wp-content/uploads/z9nzxm7s.jpeg
  - https://onpointinstallations.com/wp-content/uploads/umb7wsng.jpeg
  - https://onpointinstallations.com/wp-content/uploads/esymfc24.jpeg
  - https://onpointinstallations.com/wp-content/uploads/xcsozpoo.jpeg
  - https://onpointinstallations.com/wp-content/uploads/eejf0_0i.jpeg
- Notes: 8-char alphanumeric filenames suggest these were uploaded via a media plugin or imported from another CMS. Cannot determine content type from filename alone. Session 5: download and inspect before migrating.

---

### the-importance-of-strong-relationships-between-office-furniture-dealerships-and-installation-providers
- Title: The Importance of Strong Relationships Between Office Furniture Dealerships and Installation Providers
- Published: 2023-03-27
- Featured image: https://onpointinstallations.com/wp-content/uploads/opi-group-shot.jpeg (640x427)
  - On Point job photo (crew group shot). Small: 640px.
- Inline images (1):
  - https://onpointinstallations.com/wp-content/uploads/330867_424338904275552_1022656594_o.jpeg
  - Notes: Facebook-origin filename (`_o` = original quality). Likely a historic OPI Facebook post photo.

---

### the-benefits-of-a-professional-restaurant-furniture-installation
- Title: The Benefits of a Professional Restaurant Furniture Installation
- Published: 2023-02-23
- Featured image: https://onpointinstallations.com/wp-content/uploads/img_1083-1.jpeg (640x480)
  - On Point job photo (phone). Small: 640px.
- Inline images (6):
  - https://onpointinstallations.com/wp-content/uploads/img_1076-300x225-2.jpeg **[resize variant -- -2 trailer]** -- original: `img_1076.jpeg`
  - https://onpointinstallations.com/wp-content/uploads/img_1075-300x225-2.jpeg **[resize variant -- -2 trailer]** -- original: `img_1075.jpeg`
  - https://onpointinstallations.com/wp-content/uploads/img_1079-300x225-2.jpeg **[resize variant -- -2 trailer]** -- original: `img_1079.jpeg`
  - https://onpointinstallations.com/wp-content/uploads/img_1084-300x225-2.jpeg **[resize variant -- -2 trailer]** -- original: `img_1084.jpeg`
  - https://onpointinstallations.com/wp-content/uploads/img_1081-rotated-2.jpeg **[resize variant -- rotated+trailer]** -- original: `img_1081.jpeg`
  - https://onpointinstallations.com/wp-content/uploads/img_1082-rotated-2.jpeg **[resize variant -- rotated+trailer]** -- original: `img_1082.jpeg`
- Notes: All 6 inline images are WP thumbnail/rotated variants with `-2` cache-busting trailers. Standard `-NNNxNNN` strip regex fails because of the `-2` trailer. Session 5 image migration script needs an extended pattern: `re.sub(r'-(\d+x\d+|rotated)(-\d+)?(\.ext)$`, etc.). Originals are `img_NNNN.jpeg` at the base upload path.

---

### the-benefits-of-quality-furniture-installation `[already in Sanity]`
- Title: 7 Benefits of Quality Furniture Installation
- Published: 2023-01-30
- Featured image: https://onpointinstallations.com/wp-content/uploads/20211214_115442.jpeg (640x480)
  - On Point job photo (phone). Small: 640px.
- Inline images (4) -- from .err log:
  - https://onpointinstallations.com/wp-content/uploads/20200908_155115_resized.jpeg
  - https://onpointinstallations.com/wp-content/uploads/20200626_144619_resized.jpeg
  - https://onpointinstallations.com/wp-content/uploads/20210305_170607_resized.jpeg
  - https://onpointinstallations.com/wp-content/uploads/20201105_134319_resized.jpeg
- Notes: `_resized` suffix indicates WP auto-resize on upload (large original resized to fit). Originals are probably the same filename without `_resized`. All are On Point job photos from phone camera roll.

---

### this-years-biggest-modular-furniture-trends
- Title: The Biggest Modular Furniture Trends
- Published: 2023-01-06
- Featured image: https://onpointinstallations.com/wp-content/uploads/colaboration-space.jpeg (640x480)
  - Small: 640px. Descriptive filename suggests workspace content, not clearly stock or OPI job site.
- Inline images (6):
  - https://onpointinstallations.com/wp-content/uploads/shared-locker-space.jpeg
  - https://onpointinstallations.com/wp-content/uploads/multipurpose-.jpeg
  - https://onpointinstallations.com/wp-content/uploads/private-office.jpeg
  - https://onpointinstallations.com/wp-content/uploads/benching-stations.jpeg
  - https://onpointinstallations.com/wp-content/uploads/hoteling-stations.jpeg
  - https://onpointinstallations.com/wp-content/uploads/ht.-adj.-desking.jpeg
- Notes: Descriptive workspace filenames -- could be manufacturer product photography, dealer collateral, or OPI job site shots. Source unknown from filename alone. Session 5: download and inspect.

---

### qualities-to-look-for-in-warehousing-services
- Title: Qualities to Look for in Warehousing Services
- Published: 2022-12-13
- Featured image: https://onpointinstallations.com/wp-content/uploads/img_8938.jpeg (640x480)
  - On Point job photo (phone). Small: 640px.
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/img_8588.jpeg
  - https://onpointinstallations.com/wp-content/uploads/img_8936.jpeg
- Notes: All phone camera filenames. On Point warehouse shots.

---

### how-to-find-a-chicago-corporate-installation-expert `[already in Sanity]`
- Title: How to Find a Chicago Corporate Installation Expert
- Published: 2022-11-15
- Featured image: https://onpointinstallations.com/wp-content/uploads/pic-3.jpg (2000x1545)
  - On Point job photo. Good dimensions.
- Inline images (7) -- from .err log; resize variants stripped to originals:
  - https://onpointinstallations.com/wp-content/uploads/school-project-2.jpg (raw .err had `-1200x927` variant -- stripped)
  - https://onpointinstallations.com/wp-content/uploads/school-install-1.jpg (raw .err had `-1200x927` variant -- stripped)
  - https://onpointinstallations.com/wp-content/uploads/workstation-pic-1.jpg (raw .err had `-1200x927` variant -- stripped)
  - https://onpointinstallations.com/wp-content/uploads/on-point-installations-workstation-pic-2-scaled-1.jpg (raw .err had `-1200x900` variant -- stripped)
  - https://onpointinstallations.com/wp-content/uploads/mamava-pod.jpg
  - https://onpointinstallations.com/wp-content/uploads/hoteling-stations.jpeg
  - https://onpointinstallations.com/wp-content/uploads/u-shape-office.jpg
- Notes: Strong post for image migration -- 7 inline job site photos, all On Point work. `hoteling-stations.jpeg` also appears in `this-years-biggest-modular-furniture-trends` (shared asset). Verify originals exist at stripped URLs before bulk download.

---

### benefits-of-using-warehousing-services-during-downsizing-and-beyond
- Title: 4 Benefits of Using Warehousing Services During Downsizing
- Published: 2022-10-06
- Featured image: https://onpointinstallations.com/wp-content/uploads/img_0938-1.jpg (640x279)
  - On Point job photo (phone, landscape crop). Very small: 640x279. `-1` trailer suggests a duplicate upload.
- Inline images (1):
  - https://onpointinstallations.com/wp-content/uploads/img_0936.jpeg
- Notes: Featured image is narrow (279px height) -- may look awkward as hero. Worth checking before migrating.

---

### factors-to-consider-when-relocating-to-a-smaller-space
- Title: 4 Factors to Consider When Relocating Your Corporate Office to a Smaller Space
- Published: 2022-09-08
- Featured image: https://onpointinstallations.com/wp-content/uploads/img_0950.jpeg (640x480)
  - On Point job photo (phone). Small: 640px.
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/img_8868.jpg
  - https://onpointinstallations.com/wp-content/uploads/img_6878.jpg
- Notes: All phone camera filenames. On Point job site shots.

---

### how-to-survive-office-downsizing
- Title: How to Survive Office Downsizing
- Published: 2022-07-06
- Featured image: https://onpointinstallations.com/wp-content/uploads/20220629_121038_hdr-scaled-1.jpg (2000x1202)
  - On Point job photo (Samsung HDR). Good dimensions. `-scaled-1` is the WP full-size scaled copy (original was larger; WP auto-scaled on upload).
- Inline images (6):
  - https://onpointinstallations.com/wp-content/uploads/20220629_074749_hdr-scaled-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/20220629_130647_hdr-scaled-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/20220629_130745-scaled-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/20220629_130758_hdr-scaled-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/20220629_122941-scaled-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/20220629_121836-scaled-1.jpg
- Notes: Strong post for image migration -- 7 images all from same job site, same date (2022-06-29). All `-scaled-1` variants are WP's max-size copies (typically 2560px max). These are the preferred download target. The original phone files may be larger but are not accessible via WP media library.

---

### the-differences-between-high-and-low-voltage-electricity
- Title: The Differences Between High- and Low-Voltage Electricity
- Published: 2022-05-02
- Featured image: https://onpointinstallations.com/wp-content/uploads/img_5074-resized-e1651469079899.jpg (800x558)
  - On Point job photo. `-resized` = WP auto-resize on upload. `-e1651469079899` = WP edit timestamp. Small: 800px.
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/img_3542.jpg
  - https://onpointinstallations.com/wp-content/uploads/img_3539.jpeg
- Notes: All On Point electrical job photos. Featured image has WP edit timestamp in filename -- the uploaded original was probably larger.

---

### different-types-of-window-treatments
- Title: 5 Different Types of Window Treatments
- Published: 2022-04-12
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-scott-webb-532568-scaled-1.jpg (2000x1334) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-1666667.jpeg **[Pexels stock]**
  - https://onpointinstallations.com/wp-content/uploads/2022/04/pexels-lisa-fotios-1957478.jpg **[Pexels stock]**
- Notes: All 3 images are Pexels (CC0). No On Point job photos in this post. Candidate for photo replacement when Brian provides window treatment installation shots.

---

### 5-reasons-you-need-a-professional-art-installation-team
- Title: 5 Reasons You Need a Professional Art Installation Team
- Published: 2022-04-12
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-2372978-1-1.jpg (600x414) **[Pexels stock]**
  - Small: 600px. `-1-1` duplicate-upload trailer.
- Inline images (1):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-2372925-.jpg **[Pexels stock]**
  - Note: trailing period before extension in filename (`2372925-.jpg`) -- unusual; may cause download issues. Verify URL is fetchable.
- Notes: All Pexels. No On Point job photos. Candidate for replacement when Brian provides artwork installation shots.

---

### is-the-concept-of-a-physical-office-dying
- Title: Is the Concept of a Physical Office Dying?
- Published: 2021-10-22
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-374016-3.jpeg (1880x1253) **[Pexels stock]**
- Inline images (1):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-389818.jpeg **[Pexels stock]**
- Notes: All Pexels. Thought-leadership post -- generic office photography is contextually appropriate here. Lower priority for replacement than service-specific posts.

---

### why-hybrid-workspaces-need-thoughtful-office-furniture
- Title: Why Hybrid Workspaces Need Thoughtful Office Furniture
- Published: 2021-09-18
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-5387614.jpeg (1880x1253) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/space-desk-office-hero-7065.jpg (On Point job photo)
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-7534232.jpeg **[Pexels stock]**
- Notes: Mixed -- 1 On Point job photo, 2 Pexels. Thought-leadership post.

---

### the-top-office-design-trends
- Title: The Top Office Design Trends
- Published: 2021-08-23
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-6899395.jpeg (1880x1255) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-7046155.jpeg **[Pexels stock]**
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-7988758.jpeg **[Pexels stock]**
- Notes: All Pexels. Thought-leadership post.

---

### 6-signs-you-need-to-renovate-your-commercial-office
- Title: 6 Signs You Need to Renovate Your Commercial Office
- Published: 2021-08-23
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-3182763.jpeg (1880x1253) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-7793690.jpeg **[Pexels stock]**
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-3872470.jpeg **[Pexels stock]**
- Notes: All Pexels. Thought-leadership post.

---

### how-to-deal-with-a-surplus-of-office-furniture
- Title: How to Deal with a Surplus of Office Furniture
- Published: 2021-06-22
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-635041-1.jpeg (1880x1253) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-3184301.jpeg **[Pexels stock]**
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-3850580.jpeg **[Pexels stock]**
- Notes: All Pexels. Warehousing/relocation content.

---

### what-can-an-office-furniture-installation-company-do-for-you
- Title: What Can an Office Furniture Installation Company Do for You?
- Published: 2021-05-25
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-photo-1024248.jpeg (1880x1253) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-1181605.jpeg **[Pexels stock]**
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-5696239.jpeg **[Pexels stock]**
- Notes: All Pexels. Service overview post -- good candidate for OPI job photo replacement.

---

### 7-factors-to-consider-when-choosing-an-office-furniture-installation-company
- Title: 7 Factors to Consider When Choosing an Office Furniture Installation Company
- Published: 2021-05-04
- Featured image: https://onpointinstallations.com/wp-content/uploads/img_6479-scaled-1.jpg (2000x1500)
  - On Point job photo. Good dimensions. `-scaled-1` = WP full-size scaled copy.
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/opi_payroc-progress1-0571.jpeg (On Point job photo -- Payroc install)
  - https://onpointinstallations.com/wp-content/uploads/haworth-intuity-modular-installation-private-office-chicago.jpg (On Point job photo -- Haworth install)
- Notes: Strong post for image migration -- all On Point job photos with SEO-relevant filenames. `haworth-intuity-modular-installation-private-office-chicago.jpg` is exactly the kind of keyword-rich filename CLAUDE.md requires.

---

### how-to-move-or-downsize-an-office
- Title: How to Move or Downsize an Office
- Published: 2021-03-26
- Featured image: https://onpointinstallations.com/wp-content/uploads/onpointinstallations1-2.jpg (900x663)
  - On Point job photo. Medium: 900px.
- Inline images (3):
  - https://onpointinstallations.com/wp-content/uploads/onpointinstallations3-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/onpointinstallations4-1.jpg
  - https://onpointinstallations.com/wp-content/uploads/onpointinstallations2-1.jpg
- Notes: All On Point job photos with `onpointinstallations` branded filenames. `-1` and `-2` trailers are duplicate-upload sequence numbers, not WP resize variants.

---

### 5-essential-tips-from-office-installers-in-chicago
- Title: 5 Essential Tips From Office Installers in Chicago
- Published: 2021-02-05
- Featured image: https://onpointinstallations.com/wp-content/uploads/opi_payroc-progress1-0628.jpg (900x600)
  - On Point job photo (Payroc install). Medium: 900px.
- Inline images (3):
  - https://onpointinstallations.com/wp-content/uploads/opi_payroc-progress1-0575.jpg (On Point job photo)
  - https://onpointinstallations.com/wp-content/uploads/opi_payroc_progress2-1035.jpg (On Point job photo)
  - https://onpointinstallations.com/wp-content/uploads/opi_payroc_final-1285.jpg (On Point job photo)
- Notes: All On Point Payroc job photos. The `_0628`, `_0575`, `_1035`, `_1285` are camera sequence numbers from a professional shoot or numbered phone shots. Good migration candidates.

---

### how-to-ensure-safe-warehousing-for-your-product
- Title: How to Ensure Safe Warehousing for Your Product
- Published: 2020-12-23
- Featured image: https://onpointinstallations.com/wp-content/uploads/pexels-tiger-lily-4483610-scaled-1.jpg (2000x1334) **[Pexels stock]**
- Inline images (2):
  - https://onpointinstallations.com/wp-content/uploads/2020/12/pexels-tiger-lily-4483556.jpg **[Pexels stock]**
  - https://onpointinstallations.com/wp-content/uploads/pexels-photo-4480988.jpeg **[Pexels stock]**
- Notes: All Pexels. Warehousing content -- good candidate for On Point warehouse interior photos when Brian provides them.

---

### benefits-of-using-professional-office-furniture-installers
- Title: 5 Benefits of Using Professional Office Furniture Installers
- Published: 2020-12-19
- Featured image: https://onpointinstallations.com/wp-content/uploads/opi_dec-0022-scaled-1.jpg (2000x1334)
  - On Point job photo (December shoot). Good dimensions. `-scaled-1` = WP full-size scaled copy.
- Inline images (1):
  - https://onpointinstallations.com/wp-content/uploads/2020/12/OPI_Dec-0161.jpg (On Point job photo -- December shoot)
- Notes: Both On Point job photos from same shoot session (OPI Dec). Good migration candidates.

---

## Session 5 Action Items

1. **Resize variant parser extension** -- update the image migration script to handle `-NNNxNNN-N.ext` (cache-busting trailer) and `_1200.ext` suffixes. The 2 affected posts are `modular-furniture-designs` (6 images) and `the-benefits-of-a-professional-restaurant-furniture-installation` (6 inline).

2. **8-char random filename inspection** -- `how-to-find-the-right-team` has 9 images with random 8-char filenames. Download and visually inspect before migrating to Sanity.

3. **Pexels posts: featured image migration decision** -- 9 posts have Pexels featured images. Pexels images are CC0 but they're not On Point job photos. Decision needed: migrate Pexels images to Sanity as-is for blog rendering continuity, OR leave featured image null (blog template renders gracefully with no featured image) until Brian provides real photos. Migrating as-is is lower friction; leaving null keeps the blog clean of generic stock.

4. **`blogPost` schema: add alt field** -- currently tracked in known-issues.md (Session 3 close note). This is the prerequisite for all image migration work -- alt text needs a place to live in Sanity before images are added to posts.

5. **Shared asset: `hoteling-stations.jpeg`** -- used in both `how-to-find-a-chicago-corporate-installation-expert` and `this-years-biggest-modular-furniture-trends`. Single Sanity asset upload, referenced by both posts.

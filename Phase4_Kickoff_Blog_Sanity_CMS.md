# On Point Installations — Next.js Rebuild
# Phase 4: Blog + Sanity CMS Setup
# Developer: IntegrePro Software LLC

---

## CONTEXT

Phases 1–3 are complete. Scaffold, homepage, primary service pages, city pages, and service area hub are live on staging. Phase 4 establishes the content layer — setting up Sanity.io as the headless CMS, migrating the 26 existing blog posts from WordPress, and scaffolding the 20 new blog posts from the Prompt 16 content briefs.

**Refer to:** BUILD_PLAN.md Section 6 (Content Requirements). Prompt 16 (Content Gap Analysis) — all 20 new blog post briefs with exact title tags, H1s, meta descriptions, URL slugs, recommended structure, word counts, internal links, schema, and CTAs. Prompt 15 (Search Intent Mapping) — the four buyer journey stages that determine content priority.

**Content priority order (from Prompt 16):**
- Category 3 (Local Service) — build first: cost guide, scope explainer, timeline guide
- Category 2 (Solution-Comparison) — build second: DIY vs professional, union vs non-union
- Category 1 (Problem-Awareness) — build third: what is systems furniture, open office problems

---

## PHASE 4 OBJECTIVES

1. Sanity.io project created and configured
2. Blog post schema defined in Sanity Studio
3. 26 existing WordPress blog posts migrated to Sanity
4. 20 new blog post drafts scaffolded in Sanity (ready for content)
5. Blog index page (`/blog/`) built and pulling from Sanity
6. Dynamic blog post page (`/blog/[slug]/`) built with full schema
7. All blog posts internally linked to relevant service pages

---

## SANITY SETUP

### 1. Create Sanity project
```bash
npm create sanity@latest
# Project name: onpoint-installations-blog
# Dataset: production
# Template: Clean project with no predefined schemas
```

### 2. Install in Next.js project
```bash
npm install next-sanity @sanity/image-url
npm install --save-dev @sanity/cli
```

### 3. Environment variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token  # read-only for frontend
SANITY_WRITE_TOKEN=your_write_token  # for agent writes — store server-side only
```

---

## SANITY SCHEMA DEFINITIONS

### Blog Post Schema

```typescript
// sanity/schemas/blogPost.ts
import { defineType, defineField } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title Tag (under 60 chars)', type: 'string', validation: r => r.required().max(60) }),
    defineField({ name: 'h1', title: 'H1 Heading', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'h1' }, validation: r => r.required() }),
    defineField({ name: 'metaDescription', title: 'Meta Description (under 155 chars)', type: 'text', rows: 3, validation: r => r.required().max(155) }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'updatedAt', title: 'Last Updated Date', type: 'datetime' }),
    defineField({ name: 'featuredImage', title: 'Featured Image (1200x630)', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
    ]}),
    defineField({ name: 'category', title: 'Content Category', type: 'string',
      options: { list: [
        { title: 'Category 1 — Problem Awareness', value: 'problem-awareness' },
        { title: 'Category 2 — Solution Comparison', value: 'solution-comparison' },
        { title: 'Category 3 — Local Service', value: 'local-service' },
        { title: 'Existing Post — Migrated', value: 'migrated' },
      ]}
    }),
    defineField({ name: 'targetKeyword', title: 'Primary Target Keyword', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt (for blog index card)', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Body Content', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ]},
    ]}),
    defineField({ name: 'faqs', title: 'FAQ Items (for FAQPage schema)', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'question', type: 'string', validation: r => r.required() }),
        defineField({ name: 'answer', type: 'text', validation: r => r.required() }),
      ]}]
    }),
    defineField({ name: 'schema', title: 'Schema Types to Apply', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Article', 'FAQPage', 'HowTo', 'BreadcrumbList'] }
    }),
    defineField({ name: 'internalLinks', title: 'Internal Links Note (for author reference)', type: 'text', rows: 3 }),
    defineField({ name: 'wordCountTarget', title: 'Target Word Count', type: 'number' }),
    defineField({ name: 'status', title: 'Content Status', type: 'string',
      options: { list: [
        { title: 'Draft — awaiting content', value: 'draft' },
        { title: 'Ready for review', value: 'review' },
        { title: 'Published', value: 'published' },
      ]},
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: { title: 'h1', subtitle: 'category', media: 'featuredImage' },
  },
});
```

---

## SANITY CLIENT SETUP

```typescript
// lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// GROQ queries
export const BLOG_INDEX_QUERY = `
  *[_type == "blogPost" && status == "published"]
  | order(publishedAt desc) {
    _id,
    title,
    h1,
    slug,
    metaDescription,
    publishedAt,
    category,
    targetKeyword,
    excerpt,
    featuredImage,
  }
`;

export const BLOG_POST_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    h1,
    slug,
    metaDescription,
    publishedAt,
    updatedAt,
    category,
    targetKeyword,
    excerpt,
    featuredImage,
    body,
    faqs,
    schema,
    internalLinks,
  }
`;

export const BLOG_SLUGS_QUERY = `
  *[_type == "blogPost" && status == "published"].slug.current
`;
```

---

## BLOG INDEX PAGE — `/blog/`

```typescript
// app/blog/page.tsx
export const metadata = generatePageMetadata({
  title: 'Office Furniture Installation Blog | On Point Installations',
  description: 'Expert insights on commercial furniture installation, cubicle setup, office relocation, and workspace planning from On Point Installations — Chicago\'s trusted installer.',
  canonical: 'https://onpointinstallations.com/blog/',
});

// Fetch all published posts from Sanity
// Render BlogPostCard grid
// Sidebar or filter by category (optional in Phase 4 — can add later)
```

---

## DYNAMIC BLOG POST PAGE — `/blog/[slug]/`

```typescript
// app/blog/[slug]/page.tsx

// generateStaticParams: fetch all slugs from Sanity at build time
export async function generateStaticParams() {
  const slugs = await client.fetch(BLOG_SLUGS_QUERY);
  return slugs.map((slug: string) => ({ slug }));
}

// generateMetadata: pull title + meta from Sanity per post
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await client.fetch(BLOG_POST_QUERY, { slug: params.slug });
  return generatePageMetadata({
    title: post.title,
    description: post.metaDescription,
    canonical: `https://onpointinstallations.com/blog/${params.slug}/`,
    ogImage: post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined,
  });
}

// Schema injection per post
// Article schema always
// FAQPage schema if post.faqs.length > 0
// BreadcrumbList schema always
// HowTo schema if post.schema includes 'HowTo' (optional)

// Body rendering: use @portabletext/react to render Sanity block content
// import { PortableText } from '@portabletext/react';
```

### ISR Configuration (blog posts)
```typescript
// Revalidate blog posts every 24 hours
// This allows Sanity content updates to go live without a full rebuild
export const revalidate = 86400; // 24 hours in seconds
```

---

## MIGRATING EXISTING WORDPRESS BLOG POSTS

26 existing posts need to be migrated from WordPress to Sanity. Do this manually for now — a migration script can be built later for future clients.

### Migration process per post:
1. Copy post title → Sanity `h1` field
2. Copy post content → Sanity `body` field (paste as rich text)
3. Set `status` = "published"
4. Set `publishedAt` to original publication date
5. Set `category` = "migrated"
6. Write a new `metaDescription` (155 chars max) — the WordPress posts had thin or missing meta descriptions
7. Add 2–3 internal links to relevant service pages within the body content
8. Add `targetKeyword` if determinable from the post content

### Posts to migrate (existing WordPress URLs — keep slugs exactly):
All existing blog posts at `/blog/[slug]/` — maintain exact URL structure. No redirects needed.

Key posts to prioritize (by GSC impressions from Prompt 10):
1. `/blog/the-differences-between-high-and-low-voltage-electricity/` — 910 impressions (highest traffic blog)
2. `/blog/the-importance-of-strong-relationships-between-office-furniture-dealerships-and-installation-providers/` — 302 impressions
3. `/blog/benefits-of-using-professional-office-furniture-installers/` — migrate with internal links
4. `/blog/5-essential-tips-from-office-installers-in-chicago/` — Chicago keyword opportunity
5. Remaining 22 posts — migrate in bulk

---

## SCAFFOLDING THE 20 NEW BLOG POSTS

Create Sanity documents for all 20 new blog posts from Prompt 16 with status = "draft". This scaffolds the content pipeline so the posts are ready to receive content without any developer work.

### Priority order (from Prompt 16):

**Category 3 — Local Service (build content first):**

| Slug | H1 | Target Keyword | Word Count | Schema |
|------|-----|---------------|-----------|--------|
| office-furniture-installation-cost-chicago | How Much Does Office Furniture Installation Cost in Chicago? (2026 Guide) | how much does office furniture installation cost in Chicago | 1,000–1,200 | Article, FAQPage |
| what-does-commercial-furniture-installation-include | What Does Commercial Furniture Installation Include? A Complete Breakdown | what does commercial furniture installation include | 700–900 | Article, FAQPage, HowTo |
| how-long-does-office-furniture-installation-take | How Long Does Office Furniture Installation Take? Timeline Guide by Project Size | how long does office furniture installation take | 700–900 | Article, FAQPage, HowTo |
| what-to-look-for-chicagoland-furniture-installer | What to Look for in a Chicagoland Office Furniture Installer | what to look for in a Chicagoland furniture installer | 1,000–1,200 | Article, FAQPage |
| find-office-furniture-installers-near-me | How to Find Office Furniture Installers Near Me — A Guide for Illinois Businesses | how do I find office furniture installers near me | 700–900 | Article, FAQPage |
| large-commercial-furniture-installation-projects | Can On Point Installations Handle Large Commercial Furniture Projects? | large commercial furniture installation | 600–800 | Article, FAQPage |

**Category 2 — Solution-Comparison:**

| Slug | H1 | Target Keyword | Word Count |
|------|-----|---------------|-----------|
| hire-furniture-installer-vs-diy | Should You Hire a Furniture Installer or Do It Yourself? An Honest Comparison | should I hire a furniture installer or do it myself | 900–1,100 |
| union-vs-non-union-furniture-installation | Union vs. Non-Union Office Furniture Installation: What Every Facilities Manager Should Know | union vs non-union furniture installation | 900–1,100 |
| how-to-choose-office-furniture-installation-company | How to Choose an Office Furniture Installation Company: 6 Criteria That Matter | how to choose an office furniture installation company | 1,000–1,200 |
| questions-to-ask-office-furniture-installer | 10 Questions to Ask Before Hiring an Office Furniture Installer | what questions should I ask a furniture installer | 800–1,000 |
| is-it-worth-hiring-commercial-furniture-installer | Is It Worth Hiring a Commercial Furniture Installer? Here's the Honest Answer | is it worth hiring a commercial furniture installer | 900–1,100 |
| furniture-dealer-vs-installer-difference | Furniture Dealer vs. Furniture Installer: What's the Difference and Why It Matters | what is the difference between a furniture dealer and installer | 700–900 |
| how-do-furniture-installation-companies-charge | How Do Commercial Furniture Installation Companies Charge? Pricing Models Explained | how do commercial furniture installation companies charge | 900–1,100 |

**Category 1 — Problem-Awareness:**

| Slug | H1 | Target Keyword | Word Count |
|------|-----|---------------|-----------|
| what-is-systems-furniture | What Is Systems Furniture? A Plain-English Guide for Office Managers | what is systems furniture | 800–1,000 |
| why-open-office-feels-chaotic | Why Does Your Open Office Feel Chaotic? The Real Causes — and What to Fix First | why does open office feel chaotic | 800–1,000 |
| what-causes-poor-office-acoustics | What Causes Poor Office Acoustics — and What Actually Fixes It | what causes poor office acoustics | 800–1,000 |
| why-is-office-furniture-hard-to-reconfigure | Why Is Your Office Furniture Hard to Reconfigure — and What Can You Do About It? | why is my office furniture hard to reconfigure | 700–900 |
| what-to-do-when-office-furniture-doesnt-fit | What to Do When Your Office Furniture Doesn't Fit Your Space | what to do when office furniture doesn't fit | 700–900 |
| what-is-cubicle-installation | What Is Cubicle Installation? Everything Office Managers Need to Know | what is cubicle installation | 700–900 |
| why-hire-professional-furniture-installer | Why Should I Hire a Professional Furniture Installer? 7 Reasons Chicago Businesses Don't DIY | why should I hire a furniture installer | 900–1,100 |

---

## INTERNAL LINKING REQUIREMENTS FOR BLOG POSTS

Every blog post must contain at minimum 2 internal links to service pages. The full internal link map for each brief is in the Prompt 16 report. Key patterns:

- Cost/scope/timeline posts → link to /services/commercial-furniture-installation-chicago-il/
- "Near me" and "find an installer" posts → link to /services/commercial-furniture-installation-chicago-il/ + /contact/
- Comparison posts → link to /about/ + /reviews/ + primary service page
- Problem-awareness posts → link to /services/space-planning/ or /services/commercial-furniture-installation-chicago-il/
- Cubicle-specific posts → link to /services/cubicle-installation-chicago-il/

---

## PHASE 4 COMPLETION CRITERIA

- [ ] Sanity project created, schema defined, Studio accessible
- [ ] `lib/sanity.ts` client configured with GROQ queries
- [ ] `/blog/` index page pulling live from Sanity
- [ ] `/blog/[slug]/` dynamic page with ISR (24hr), generateStaticParams, and generateMetadata
- [ ] ArticleSchema rendering on all blog posts
- [ ] FAQSchema rendering on posts where faqs.length > 0
- [ ] BreadcrumbSchema rendering on all blog posts
- [ ] 26 existing blog posts migrated to Sanity with status = "published"
- [ ] 20 new blog post drafts scaffolded in Sanity with status = "draft"
- [ ] All published blog posts have unique meta descriptions (no placeholders)
- [ ] All published blog posts have at least 2 internal links to service pages
- [ ] Blog index page renders correctly with ISR
- [ ] Rich Results Test passing on at least 3 blog posts (Article + FAQPage)

---

## NEXT PHASE PREVIEW

**Phase 5** implements the complete schema package across the site, configures all redirects as final, and sets up GA4 via Google Tag Manager. Have the Prompt 17 (Entity Optimization) report available — it contains the complete JSON-LD blocks for all 7 schema types, ready to paste. Also have the Wikidata Q-number ready if the entity has been created by this point.

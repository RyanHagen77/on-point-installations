import { config as loadDotenv } from 'dotenv';
import { createClient } from 'next-sanity';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';

loadDotenv({ path: '.env.local' });

// ── Logging ───────────────────────────────────────────────────────────────────

let logStream: fs.WriteStream | null = null;
let errStream: fs.WriteStream | null = null;

function initLogFiles(slug: string): void {
  fs.mkdirSync('logs', { recursive: true });
  logStream = fs.createWriteStream(path.join('logs', `${slug}.log`), { flags: 'w' });
  errStream = fs.createWriteStream(path.join('logs', `${slug}.err`), { flags: 'w' });
  log('LOG', `Writing to logs/${slug}.log and logs/${slug}.err`);
}

function log(tag: string, msg: string): void {
  const line = `[${tag.padEnd(8)}] ${msg}\n`;
  process.stdout.write(line);
  logStream?.write(line);
}

function warn(msg: string): void {
  const line = `[WARN    ] ${msg}\n`;
  process.stderr.write(line);
  errStream?.write(line);
}

function die(msg: string): never {
  const line = `[ERROR   ] ${msg}\n`;
  process.stderr.write(line);
  errStream?.write(line);
  process.exit(1);
}

// ── CLI ───────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const getArg = (flag: string): string | undefined => {
  const i = argv.indexOf(flag);
  return i !== -1 ? argv[i + 1] : undefined;
};
const hasFlag = (flag: string): boolean => argv.includes(flag);

const urlArg      = getArg('--url');
const fileArg     = getArg('--file');
const slugArg     = getArg('--slug');
const metaOverride = getArg('--meta-description');
const dryRun      = hasFlag('--dry-run');

if (!urlArg && !fileArg) die('Provide --url <url> or --file <path>');
if (fileArg && !slugArg) die('--file requires --slug <value>');

// ── Env ───────────────────────────────────────────────────────────────────────

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) die(`${key} is not set`);
  return value as string;
}

const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
const dataset   = requireEnv('NEXT_PUBLIC_SANITY_DATASET');
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!dryRun && !writeToken) die('SANITY_API_WRITE_TOKEN not set (required without --dry-run)');

// ── Sanity write client ───────────────────────────────────────────────────────

const writeClient = dryRun
  ? null
  : createClient({ projectId, dataset, apiVersion: '2024-01-01', token: writeToken!, useCdn: false });

// ── Block-tools schema ────────────────────────────────────────────────────────
// Compiles a minimal schema that matches the blogPost body field definition.
// @sanity/schema v5 is a transitive dep of sanity v5; no extra install needed.

const migrationSchema = Schema.compile({
  name: 'migration',
  types: [{
    name: 'post',
    type: 'object',
    fields: [{
      name: 'body',
      type: 'array',
      of: [{
        type: 'block',
        styles: [
          { title: 'Normal',     value: 'normal' },
          { title: 'H2',         value: 'h2' },
          { title: 'H3',         value: 'h3' },
          { title: 'H4',         value: 'h4' },
          { title: 'Blockquote', value: 'blockquote' },
        ],
        marks: {
          decorators: [
            { title: 'Strong',   value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
          annotations: [{
            name: 'link',
            type: 'object',
            fields: [{ name: 'href', type: 'url' }],
          }],
        },
      }],
    }],
  }],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockContentType = (migrationSchema.get('post') as any)
  .fields.find((f: { name: string }) => f.name === 'body')
  .type;

// ── Types ─────────────────────────────────────────────────────────────────────

interface InternalLink {
  href: string;
  text: string;
}

interface ExtractedPost {
  title: string;
  metaDescription: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  category: string | null;
  bodyHtml: string;
  internalLinks: InternalLink[];
  skippedImages: string[];
}

interface FeaturedImageMeta {
  sourceUrl: string;
  wpAlt: string | null;
}

// ── Image URL and alt utilities ───────────────────────────────────────────────

function deriveOriginalUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const original = parsed.pathname;
    let cleaned = original;
    // Strip _NNN display-width suffix: hero_1200.jpg -> hero.jpg
    cleaned = cleaned.replace(/(_\d+)(\.[^.]+)$/, '$2');
    // Strip -NNNxNNN[-N] and -rotated[-N] WP thumbnail suffixes
    cleaned = cleaned.replace(/(-\d+x\d+|-rotated)(-\d+)?(\.[^.]+)$/, '$3');
    if (cleaned !== original) {
      log('RESIZE', `derived original URL pathname: "${original}" -> "${cleaned}"`);
      parsed.pathname = cleaned;
    }
    return parsed.href;
  } catch {
    return url;
  }
}

const DEGENERATE_STEMS = /^(image|img|pic|photo|logo|untitled|default|placeholder|dsc|dscn)$/i;
const CAMERA_DEFAULT_STEM = /^(img_?\d+|dsc_?\d+|dscn\d+|p\d+|20\d{6}[_-]\d{6})/i;

function isQualityAlt(alt: string, imageUrl: string): boolean {
  const trimmed = alt.trim();

  // Reject: starts with "pexels" (filename attribution or WP Pexels alt text)
  if (/^pexels[\s-]/i.test(trimmed)) return false;

  // Reject: contains 5+ consecutive digits (Pexels IDs, filename IDs)
  if (/\d{5,}/.test(trimmed)) return false;

  // Reject: ends with pixel-size number (1200, 1920, etc.)
  if (/\b\d{3,4}\b$/.test(trimmed)) return false;

  // Reject: contains dimension string like 1920x1080
  if (/\b\d{3,4}x\d{3,4}\b/.test(trimmed)) return false;

  const normalized = trimmed.toLowerCase().replace(/[-_\s]+/g, ' ').replace(/\s+/g, ' ').trim();

  // Reject: matches alt text denylist
  if (/^(pic|image|img|photo|logo|untitled|default|placeholder|screenshot|unnamed)$/.test(normalized)) return false;

  // Reject: matches camera-default pattern
  if (/^(img|dsc|dscn|p)\s?\d+$/.test(normalized)) return false;

  // Reject: normalized alt matches normalized image filename (auto-populated by WP)
  const filename = imageUrl.split('/').pop() ?? '';
  const normalizedFilename = filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[-_\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (normalized === normalizedFilename) return false;

  return true;
}

function deriveAlt(
  wpAlt: string | null,
  imageUrl: string,
  postTitle: string
): { alt: string; tier: 'wp' | 'filename' | 'title'; note?: string } {
  // Tier 1: WP alt_text, only if it passes quality gate
  if (wpAlt && wpAlt.trim()) {
    if (isQualityAlt(wpAlt, imageUrl)) {
      return { alt: wpAlt.trim(), tier: 'wp' };
    }
  }
  const wpRejected = !!(wpAlt && wpAlt.trim());

  // Tier 2: filename derivation with cleanup pass
  const filename = imageUrl.split('/').pop() ?? '';
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  const stemCleaned = withoutExt
    .replace(/(_\d+)$/, '')                          // _1200 display-width suffix
    .replace(/(-scaled-?\d*)$/, '')                  // -scaled-1 WP max-size marker
    .replace(/(-resized)(-e\d+)?$/, '')              // -resized-eNNNNNN WP edit timestamp
    .replace(/(-\d+x\d+|-rotated)(-\d+)?$/, '')     // -300x225-2, -rotated-2
    .replace(/-(\d+)$/, '');                          // -1 duplicate upload trailer

  const isDegenerate =
    stemCleaned.length <= 6 ||
    DEGENERATE_STEMS.test(stemCleaned) ||
    CAMERA_DEFAULT_STEM.test(stemCleaned);

  if (!isDegenerate) {
    const rawReadable = stemCleaned.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
    // Strip Pexels attribution prefix and bare 4+ digit numeric tokens
    const cleanedReadable = rawReadable
      .replace(/^pexels\s+/i, '')
      .replace(/\b\d{4,}\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleanedReadable.length > 6) {
      const readable = cleanedReadable.replace(/\b\w/g, (c) => c.toUpperCase());
      return { alt: readable, tier: 'filename', note: wpRejected ? 'wp rejected' : undefined };
    }
  }

  return { alt: postTitle, tier: 'title', note: wpRejected ? 'wp rejected' : undefined };
}

// ── slugFromUrl ───────────────────────────────────────────────────────────────

function slugFromUrl(url: string): string {
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  if (!last) die(`Could not extract slug from URL: ${url}`);
  return last;
}

// ── fetchPublishedAt ──────────────────────────────────────────────────────────
// WP theme emits no article:published_time meta or <time datetime>; use REST API.

async function fetchPublishedAt(slug: string): Promise<string | null> {
  const apiUrl = `https://onpointinstallations.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`;
  log('REST', `GET ${apiUrl}`);
  try {
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      warn(`WP REST API returned HTTP ${res.status} for slug "${slug}" -- publishedAt will be null`);
      return null;
    }
    const posts = await res.json() as Array<{ date_gmt?: string }>;
    if (!Array.isArray(posts) || posts.length === 0) {
      warn(`WP REST API: no post found for slug "${slug}" -- publishedAt will be null`);
      return null;
    }
    const dateGmt = posts[0].date_gmt;
    if (!dateGmt) {
      warn(`WP REST API: date_gmt missing for slug "${slug}" -- publishedAt will be null`);
      return null;
    }
    const iso = dateGmt.endsWith('Z') ? dateGmt : `${dateGmt}Z`;
    log('REST', `publishedAt from WP API: ${iso}`);
    return iso;
  } catch (err) {
    warn(`WP REST API fetch failed for slug "${slug}": ${String(err)} -- publishedAt will be null`);
    return null;
  }
}

// ── fetchFeaturedImageMeta ────────────────────────────────────────────────────
// Two REST calls: posts endpoint for featured_media ID, then media endpoint for
// source_url and alt_text. Separate from fetchPublishedAt to avoid modifying
// hardened Session 4 logic. Soft failure on any error: warns and returns null.
//
// Sanity deduplicates uploaded assets by SHA-1 hash, so re-running on an
// already-migrated post uploads the same bytes and returns the same asset _id.
// createOrReplace replaces the entire document, so re-migration is idempotent.

async function fetchFeaturedImageMeta(slug: string): Promise<FeaturedImageMeta | null> {
  const postsUrl = `https://onpointinstallations.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`;
  log('IMG', `GET posts API for featured_media: ${postsUrl}`);
  let featuredMediaId: number;
  try {
    const res = await fetch(postsUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      warn(`WP REST posts API returned HTTP ${res.status} -- featuredImage skipped`);
      return null;
    }
    const posts = await res.json() as Array<{ featured_media?: number }>;
    if (!Array.isArray(posts) || posts.length === 0) {
      warn(`WP REST posts API: no post found for slug "${slug}" -- featuredImage skipped`);
      return null;
    }
    featuredMediaId = posts[0].featured_media ?? 0;
    if (featuredMediaId === 0) {
      log('IMG', 'featured_media is 0 -- no featured image set in WP');
      return null;
    }
  } catch (err) {
    warn(`WP REST posts API fetch failed: ${String(err)} -- featuredImage skipped`);
    return null;
  }

  const mediaUrl = `https://onpointinstallations.com/wp-json/wp/v2/media/${featuredMediaId}`;
  log('IMG', `GET media API: ${mediaUrl}`);
  try {
    const res = await fetch(mediaUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      warn(`WP REST media API returned HTTP ${res.status} for media ID ${featuredMediaId} -- featuredImage skipped`);
      return null;
    }
    const media = await res.json() as { source_url?: string; alt_text?: string };
    if (!media.source_url) {
      warn(`WP REST media API: source_url missing for media ID ${featuredMediaId} -- featuredImage skipped`);
      return null;
    }
    const sourceUrl = media.source_url;
    const wpAlt = media.alt_text?.trim() || null;
    log('IMG', `WP source_url: ${sourceUrl}`);
    if (wpAlt) log('IMG', `WP alt_text: "${wpAlt}"`);
    return { sourceUrl, wpAlt };
  } catch (err) {
    warn(`WP REST media API fetch failed: ${String(err)} -- featuredImage skipped`);
    return null;
  }
}

// ── loadHtml ──────────────────────────────────────────────────────────────────

async function loadHtml(): Promise<{ html: string; slug: string }> {
  if (fileArg) {
    log('LOAD', `Reading file: ${fileArg}`);
    const html = fs.readFileSync(fileArg, 'utf8');
    return { html, slug: slugArg! };
  }

  log('FETCH', `GET ${urlArg}`);
  const res = await fetch(urlArg!, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OnPointMigrator/1.0)' },
  });
  if (!res.ok) die(`HTTP ${res.status}: ${urlArg}`);
  const html = await res.text();
  const finalUrl = res.url;
  const slug = slugFromUrl(finalUrl);
  log('FETCH', `-> ${res.status} ${finalUrl} (~${Math.round(html.length / 1024)}KB)`);
  log('FETCH', `Resolved slug: ${slug}`);
  return { html, slug };
}

// ── Link substitution tables (per docs/phase-4-close.md) ─────────────────────

const SERVICE_SUBSTITUTIONS: Record<string, string> = {
  '/commercial-office-furniture-installation-chicago-il/': '/services/commercial-furniture-installation-chicago-il/',
  '/services/commercial-office-furniture-installation-chicago-il/': '/services/commercial-furniture-installation-chicago-il/',
  '/company-office-relocation-chicago-il/': '/services/office-relocation-chicago-il/',
  '/services/company-office-relocation-chicago-il/': '/services/office-relocation-chicago-il/',
  '/commercial-office-furniture-storage-chicago-il/': '/services/commercial-office-furniture-storage-chicago-il/',
  '/space-planning/': '/services/commercial-space-planning-chicago-il/',
  '/services/space-planning/': '/services/commercial-space-planning-chicago-il/',
  '/artwork-installation/': '/services/artwork-installation-chicago-il/',
  '/services/artwork-installation/': '/services/artwork-installation-chicago-il/',
  '/window-treatment-installations/': '/services/window-treatment-installation-chicago-il/',
  '/services/window-treatment-installations/': '/services/window-treatment-installation-chicago-il/',
  '/services/electrical-voice-and-data-cabling-for-your-commercial-installation/': '/services/electrical-voice-data-cabling-chicago-il/',
  '/about-us-chicago-il/': '/about/',
  '/contact-us/': '/contact/',
  '/review/': '/reviews/',
};

const AUDIT_SUBSTITUTIONS: Record<string, string> = {
  '/services/cubicle-installation-chicago-il/': '/services/commercial-furniture-installation-chicago-il/#cubicle-installation',
  '/services/systems-furniture-installation-chicago-il/': '/services/commercial-furniture-installation-chicago-il/#systems-furniture',
  '/services/office-furniture-delivery-setup-chicago-il/': '/services/commercial-furniture-installation-chicago-il/#office-furniture-delivery-setup',
};

const DEAD_LINK_PREFIXES = ['/category/'];

function applyLinkSubstitutions(
  doc: Document,
  contentEl: Element
): { substituted: number; stripped: number } {
  const links = Array.from(contentEl.querySelectorAll('a[href]'));
  let substituted = 0;
  let stripped = 0;

  for (const a of links) {
    const rawHref = a.getAttribute('href') ?? '';
    const href = rawHref.replace(/^https?:\/\/(?:www\.)?onpointinstallations\.com/, '');

    if (SERVICE_SUBSTITUTIONS[href]) {
      const newHref = SERVICE_SUBSTITUTIONS[href];
      a.setAttribute('href', newHref);
      log('SUBST', `service URL: "${href}" -> "${newHref}"`);
      substituted++;
    } else if (AUDIT_SUBSTITUTIONS[href]) {
      const newHref = AUDIT_SUBSTITUTIONS[href];
      a.setAttribute('href', newHref);
      log('SUBST', `audit slug: "${href}" -> "${newHref}"`);
      substituted++;
    } else if (DEAD_LINK_PREFIXES.some((p) => href.startsWith(p))) {
      const text = doc.createTextNode(a.textContent ?? '');
      a.parentNode?.replaceChild(text, a);
      log('SUBST', `dead link stripped: "${href}" (text preserved: "${text.textContent}")`);
      stripped++;
    }
  }

  if (substituted + stripped > 0) {
    log('SUBST', `total: ${substituted} substituted, ${stripped} dead links stripped`);
  } else {
    log('SUBST', 'no link substitutions needed');
  }
  return { substituted, stripped };
}

// ── extractPost ───────────────────────────────────────────────────────────────

function extractPost(html: string): ExtractedPost {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Title: H1 preferred, <title> fallback (strip site name suffix)
  const title =
    doc.querySelector('h1')?.textContent?.trim() ??
    doc.querySelector('title')?.textContent?.replace(/\s*[|\u2013\-].*$/, '').trim() ??
    'Untitled';
  log('EXTRACT', `title: "${title}"`);

  // Meta description
  const metaEl =
    doc.querySelector('meta[name="description"]') ??
    doc.querySelector('meta[property="og:description"]');
  const metaDescription = metaEl?.getAttribute('content')?.trim() ?? null;
  if (metaDescription) {
    log('EXTRACT', `metaDescription: ${metaDescription.length} chars`);
    if (metaDescription.length > 155) warn(`metaDescription is ${metaDescription.length} chars (exceeds 155 limit)`);
  } else {
    warn('metaDescription: not found -- will need to be written before publish');
  }

  // Published date: OG meta preferred, <time datetime> fallback
  const publishedAt =
    doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ??
    doc.querySelector('time[datetime]')?.getAttribute('datetime') ??
    null;
  log('EXTRACT', publishedAt ? `publishedAt: ${publishedAt}` : 'publishedAt: not found');

  // Category: theme renders categories via <select> not <a>; use OG article:section meta
  const category = doc.querySelector('meta[property="article:section"]')?.getAttribute('content')?.trim() ?? null;
  log('EXTRACT', category ? `category: "${category}"` : 'category: not found');

  // Body content
  const contentEl = doc.querySelector('.entry-content');
  if (!contentEl) die('Body selector .entry-content not found -- check HTML structure');
  log('EXTRACT', 'body selector: .entry-content found');

  // Remove and log images
  const imgEls = Array.from(contentEl.querySelectorAll('img'));
  const skippedImages = imgEls.map((img) => img.getAttribute('src') ?? '').filter(Boolean);
  imgEls.forEach((img, i) => {
    warn(`<img> skipped at position ${i} -- src: ${img.getAttribute('src') ?? '(no src)'}`);
    img.parentNode?.removeChild(img);
  });
  if (imgEls.length === 0) log('EXTRACT', 'no images found in body');

  // Strip byline if first <p> matches /^by\s/i; removes it from body HTML and excerpt
  const firstPEl = contentEl.querySelector('p');
  if (firstPEl && /^by\s/i.test(firstPEl.textContent?.trim() ?? '')) {
    warn(`Byline detected ("${firstPEl.textContent?.trim()}") -- stripping from body`);
    firstPEl.parentNode?.removeChild(firstPEl);
    log('EXTRACT', 'Byline stripped from body HTML');
  }

  // Apply link substitutions per phase-4-close.md table (before links inventory)
  applyLinkSubstitutions(doc, contentEl);

  // Internal links inventory (after all DOM mutations including substitutions)
  const internalLinks: InternalLink[] = Array.from(contentEl.querySelectorAll('a[href]'))
    .map((a) => ({ href: a.getAttribute('href') ?? '', text: a.textContent?.trim() ?? '' }))
    .filter((l) => l.href && (l.href.startsWith('/') || l.href.includes('onpointinstallations.com')));
  log('EXTRACT', `internal links in body (post-substitution): ${internalLinks.length}`);

  // Excerpt: first remaining paragraph text, max 300 chars
  const excerpt = contentEl.querySelector('p')?.textContent?.trim().slice(0, 300) ?? null;

  log('EXTRACT', `body: ${contentEl.innerHTML.length} chars`);

  return {
    title, metaDescription, publishedAt, excerpt, category,
    bodyHtml: contentEl.innerHTML,
    internalLinks, skippedImages,
  };
}

// ── convertBody ───────────────────────────────────────────────────────────────

function convertBody(bodyHtml: string): unknown[] {
  const blocks = htmlToBlocks(bodyHtml, blockContentType, {
    parseHtml: (html: string) => new JSDOM(html).window.document,
  });
  log('CONVERT', `htmlToBlocks complete -- ${blocks.length} blocks`);
  return blocks;
}

// ── uploadFeaturedImage ───────────────────────────────────────────────────────

async function uploadFeaturedImage(
  sourceUrl: string,
  filename: string
): Promise<string | null> {
  if (dryRun) {
    log('DRY-RUN', `would upload featured image: ${sourceUrl} as "${filename}"`);
    return 'dry-run-asset-id';
  }

  // Try source_url verbatim first
  log('IMG', `fetching image bytes: ${sourceUrl}`);
  let imageRes: Response;
  try {
    imageRes = await fetch(sourceUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OnPointMigrator/1.0)' },
      signal: AbortSignal.timeout(30000),
    });
  } catch (err) {
    warn(`Image fetch failed: ${String(err)} -- featuredImage skipped`);
    return null;
  }

  // On 404, fall back to resize-stripped original URL
  if (!imageRes.ok) {
    const derivedUrl = deriveOriginalUrl(sourceUrl);
    if (derivedUrl !== sourceUrl) {
      log('IMG', `fetching image bytes: ${derivedUrl}`);
      try {
        imageRes = await fetch(derivedUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OnPointMigrator/1.0)' },
          signal: AbortSignal.timeout(30000),
        });
      } catch (err) {
        warn(`Image fetch failed: ${String(err)} -- featuredImage skipped`);
        return null;
      }
      if (!imageRes.ok) {
        warn(`Image fetch returned HTTP ${imageRes.status} for source_url and derived original -- featuredImage skipped`);
        return null;
      }
    } else {
      warn(`Image fetch returned HTTP ${imageRes.status} for ${sourceUrl} -- featuredImage skipped`);
      return null;
    }
  }

  const contentType = imageRes.headers.get('content-type') ?? 'image/jpeg';
  const buffer = Buffer.from(await imageRes.arrayBuffer());
  log('IMG', `uploading to Sanity CDN: ${buffer.length} bytes, contentType: ${contentType}`);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const asset = await (writeClient as any).assets.upload('image', buffer, { filename, contentType });
    log('IMG', `asset uploaded: ${asset._id}`);
    return asset._id as string;
  } catch (err) {
    warn(`Sanity asset upload failed: ${String(err)} -- featuredImage skipped`);
    return null;
  }
}

// ── buildDocument ─────────────────────────────────────────────────────────────

function buildDocument(
  extracted: ExtractedPost,
  slug: string,
  blocks: unknown[],
  metaDescriptionOverride?: string,
  assetId?: string | null,
  altText?: string,
  existingFeaturedImage?: unknown
): Record<string, unknown> {
  const metaDescription = metaDescriptionOverride ?? extracted.metaDescription;
  return {
    _id: `blog-${slug}`,
    _type: 'blogPost',
    title: extracted.title,
    slug: { _type: 'slug', current: slug },
    h1: extracted.title,
    ...(metaDescription != null && { metaDescription }),
    ...(extracted.excerpt != null && { excerpt: extracted.excerpt }),
    body: blocks,
    ...(extracted.publishedAt != null && { publishedAt: extracted.publishedAt }),
    ...(extracted.category != null && { category: extracted.category }),
    status: 'published',
    ...(assetId != null
      ? {
          featuredImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
            alt: altText ?? '',
          },
        }
      : existingFeaturedImage != null
      ? { featuredImage: existingFeaturedImage }
      : {}),
  };
}

// ── run ───────────────────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const { html, slug } = await loadHtml();
  initLogFiles(slug);

  const restDate = await fetchPublishedAt(slug);
  const imageMeta = await fetchFeaturedImageMeta(slug);
  const extracted = extractPost(html);
  if (!extracted.publishedAt && restDate) {
    log('REST', `using WP REST date (HTML had none): ${restDate}`);
    extracted.publishedAt = restDate;
  }
  if (metaOverride) {
    log('META', `--meta-description override: ${metaOverride.length} chars`);
  }
  const blocks = convertBody(extracted.bodyHtml);

  let assetId: string | null = null;
  let altText = extracted.title;
  if (imageMeta) {
    const derived = deriveAlt(imageMeta.wpAlt, imageMeta.sourceUrl, extracted.title);
    altText = derived.alt;
    log('ALT-TIER', `tier=${derived.tier}${derived.note ? ` (${derived.note})` : ''} alt="${derived.alt}"`);
    assetId = await uploadFeaturedImage(imageMeta.sourceUrl, imageMeta.sourceUrl.split('/').pop() ?? slug);
  } else {
    log('IMG', 'no featured image found -- featuredImage omitted from document');
  }

  let existingFeaturedImage: unknown = null;
  if (!dryRun && assetId === null && imageMeta !== null) {
    try {
      const existing = await writeClient!.fetch<{ featuredImage?: unknown }>(
        `*[_id == $id][0]{ featuredImage }`,
        { id: `blog-${slug}` }
      );
      existingFeaturedImage = existing?.featuredImage ?? null;
      if (existingFeaturedImage) {
        log('IMG', `upload failed -- preserving existing featuredImage from Sanity`);
      }
    } catch {
      log('IMG', 'could not read existing Sanity document -- featuredImage will be omitted');
    }
  }

  const document = buildDocument(extracted, slug, blocks, metaOverride, assetId, altText, existingFeaturedImage);

  // Internal links report (dead links and substitutions already applied in extractPost)
  if (extracted.internalLinks.length > 0) {
    log('LINKS', `${extracted.internalLinks.length} internal links (post-substitution):`);
    for (const l of extracted.internalLinks) {
      log('LINKS', `  [OK      ] "${l.text}" -> ${l.href}`);
    }
  }

  if (dryRun) {
    log('DRY-RUN', 'Portable Text blocks:');
    const blocksJson = JSON.stringify(blocks, null, 2);
    process.stdout.write(blocksJson + '\n');
    logStream?.write(blocksJson + '\n');

    log('DRY-RUN', `Document shape (body collapsed to block count):`);
    const docPreview = JSON.stringify(
      { ...document, body: `[${blocks.length} blocks -- see above]` },
      null,
      2
    );
    process.stdout.write(docPreview + '\n');
    logStream?.write(docPreview + '\n');

    log('DRY-RUN', 'Done -- no Sanity write performed.');
    return;
  }

  log('WRITE', `createOrReplace _id: ${String(document._id)}`);
  log('WRITE', `dataset: ${dataset}, projectId: ${projectId}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await writeClient!.createOrReplace(document as any);
  log('DONE', `checkmark ${String(document._id)} written to Sanity`);
}

run().catch((e: unknown) => die(String(e)));

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

// ── loadHtml ──────────────────────────────────────────────────────────────────

async function loadHtml(): Promise<{ html: string; slug: string }> {
  if (fileArg) {
    log('LOAD', `Reading file: ${fileArg}`);
    const html = fs.readFileSync(fileArg, 'utf8');
    return { html, slug: slugArg! };
  }

  log('FETCH', `GET ${urlArg}`);
  const res = await fetch(urlArg!);
  if (!res.ok) die(`HTTP ${res.status}: ${urlArg}`);
  const html = await res.text();
  const finalUrl = res.url;
  const slug = slugFromUrl(finalUrl);
  log('FETCH', `-> ${res.status} ${finalUrl} (~${Math.round(html.length / 1024)}KB)`);
  log('FETCH', `Resolved slug: ${slug}`);
  return { html, slug };
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

  // Internal links inventory (before any DOM mutations)
  const internalLinks: InternalLink[] = Array.from(contentEl.querySelectorAll('a[href]'))
    .map((a) => ({ href: a.getAttribute('href') ?? '', text: a.textContent?.trim() ?? '' }))
    .filter((l) => l.href && (l.href.startsWith('/') || l.href.includes('onpointinstallations.com')));
  log('EXTRACT', `internal links in body: ${internalLinks.length}`);

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

// ── buildDocument ─────────────────────────────────────────────────────────────

function buildDocument(
  extracted: ExtractedPost,
  slug: string,
  blocks: unknown[],
  metaDescriptionOverride?: string
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
  };
}

// ── run ───────────────────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const { html, slug } = await loadHtml();
  initLogFiles(slug);

  const restDate = await fetchPublishedAt(slug);
  const extracted = extractPost(html);
  if (!extracted.publishedAt && restDate) {
    log('REST', `using WP REST date (HTML had none): ${restDate}`);
    extracted.publishedAt = restDate;
  }
  if (metaOverride) {
    log('META', `--meta-description override: ${metaOverride.length} chars`);
  }
  const blocks = convertBody(extracted.bodyHtml);
  const document = buildDocument(extracted, slug, blocks, metaOverride);

  // Internal links report with dead-link warnings
  if (extracted.internalLinks.length > 0) {
    const DEAD_PREFIXES = ['/project/', '/category/'];
    log('LINKS', `${extracted.internalLinks.length} internal links:`);
    for (const l of extracted.internalLinks) {
      const isDead = DEAD_PREFIXES.some((p) => l.href.includes(p));
      if (isDead) warn(`link target has no equivalent in new build: ${l.href}`);
      log('LINKS', `  ${isDead ? '[NO EQUIV]' : '[OK      ]'} "${l.text}" -> ${l.href}`);
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

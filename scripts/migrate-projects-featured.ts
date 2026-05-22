/**
 * migrate-projects-featured.ts
 * Pass 1: Create Sanity project documents with featured images.
 * Default mode: dry-run (no Sanity writes).
 * Live mode:    --live flag.
 * Verification: runs automatically after --live writes.
 *               Output: tmp/projects-featured-verification.json
 */

import { config as loadDotenv } from 'dotenv';
import { createClient }          from 'next-sanity';
import * as fs   from 'fs';
import * as path from 'path';

loadDotenv({ path: '.env.local' });

// ── CLI ───────────────────────────────────────────────────────────────────────

const argv    = process.argv.slice(2);
const hasFlag = (flag: string): boolean => argv.includes(flag);
const getArg  = (flag: string): string | undefined => {
  const i = argv.indexOf(flag);
  return i !== -1 ? argv[i + 1] : undefined;
};

const isLive  = hasFlag('--live');
const slugArg = getArg('--slug');

// ── Config ────────────────────────────────────────────────────────────────────

const WXR_PATH     = 'onpointinstallationsinc.WordPress.2026-05-21.xml';
const USER_AGENT   = 'Mozilla/5.0 (compatible; OnPointMigrator/1.0)';
const MODE         = isLive ? 'live' : 'dry-run';
const LOG_PATH     = path.join('tmp', `projects-featured-${MODE}.log`);
const MANIFEST_DIR = path.join('tmp', `projects-featured-${MODE}`);
const VERIFY_PATH  = path.join('tmp', 'projects-featured-verification.json');

// ── Logging ───────────────────────────────────────────────────────────────────

fs.mkdirSync('tmp', { recursive: true });
const logStream = fs.createWriteStream(LOG_PATH, { flags: 'w' });

function log(prefix: string, tag: string, msg: string): void {
  const line = `[${prefix}][${tag.padEnd(8)}] ${msg}\n`;
  process.stdout.write(line);
  logStream.write(line);
}

function warn(prefix: string, msg: string): void {
  const line = `[${prefix}][WARN    ] ${msg}\n`;
  process.stderr.write(line);
  logStream.write(line);
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface AttachmentInfo {
  url:   string;
  wpAlt: string | null;
}

interface WxrProject {
  slug:           string;
  title:          string;
  postId:         string;
  pubDate:        string;
  wpExcerpt:      string;
  contentEncoded: string;
  thumbnailId:    string | null;
}

interface AltResult {
  alt:   string;
  tier:  'wp' | 'filename' | 'title';
  note?: string;
}

interface ExcerptResult {
  text:   string | undefined;
  source: 'post_excerpt' | 'derived' | 'none';
}

interface FetchResult {
  ok:          boolean;
  status:      number;
  buffer:      Buffer | null;
  contentType: string | null;
}

interface ProjectDryRunEntry {
  slug:             string;
  title:            string;
  thumbnailId:      string | null;
  featuredImageUrl: string | null;
  fetchStatus:      number | null;
  byteSize:         number | null;
  contentType:      string | null;
  altResult:        AltResult;
  location:         string | undefined;
  completedDate:    string | null;
  excerptResult:    ExcerptResult;
  documentId:       string;
  error:            string | null;
}

interface LiveManifestEntry {
  slug:       string;
  documentId: string;
  assetId:    string;
  sourceUrl:  string;
  filename:   string;
  status:     'ok';
}

interface VerifyDoc {
  _id:           string;
  title:         string;
  slug:          string;
  location:      string | null;
  excerpt:       string | null;
  completedDate: string | null;
  status:        string;
  featuredImage: {
    alt:   string | null;
    asset: {
      _id:              string;
      originalFilename: string;
      mimeType:         string;
      size:             number;
      url:              string;
    } | null;
  } | null;
}

// ── WXR parsing (verbatim from migrate-inline-images.ts) ─────────────────────

function extractField(xml: string, tag: string): string | null {
  const cdataRx = new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`);
  const cdataMatch = cdataRx.exec(xml);
  if (cdataMatch) return cdataMatch[1];
  const plainRx = new RegExp(`<${tag}>([^<]*)<\\/${tag}>`);
  const plainMatch = plainRx.exec(xml);
  return plainMatch ? plainMatch[1].trim() : null;
}

function extractThumbnailId(itemXml: string): string | null {
  const blockRx = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g;
  let match: RegExpExecArray | null;
  while ((match = blockRx.exec(itemXml)) !== null) {
    const key = extractField(match[1], 'wp:meta_key');
    if (key === '_thumbnail_id') return extractField(match[1], 'wp:meta_value');
  }
  return null;
}

function extractAttachmentAlt(itemXml: string): string | null {
  const blockRx = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g;
  let match: RegExpExecArray | null;
  while ((match = blockRx.exec(itemXml)) !== null) {
    const key = extractField(match[1], 'wp:meta_key');
    if (key === '_wp_attachment_image_alt') return extractField(match[1], 'wp:meta_value');
  }
  return null;
}

// ── Image utilities (verbatim from migrate-wp-post.ts) ───────────────────────

function extFromContentType(contentType: string, urlFallback: string): string {
  if (/jpe?g/.test(contentType)) return 'jpg';
  if (/png/.test(contentType))   return 'png';
  if (/gif/.test(contentType))   return 'gif';
  if (/webp/.test(contentType))  return 'webp';
  const suffix = urlFallback.split('.').pop()?.toLowerCase() ?? 'jpg';
  return suffix === 'jpeg' ? 'jpg' : suffix;
}

async function fetchBinary(url: string): Promise<FetchResult> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return { ok: false, status: res.status, buffer: null, contentType: null };
    const buffer      = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') ?? 'image/jpeg';
    return { ok: true, status: res.status, buffer, contentType };
  } catch {
    return { ok: false, status: 0, buffer: null, contentType: null };
  }
}

// ── Alt text derivation (verbatim from migrate-wp-post.ts) ───────────────────

const DEGENERATE_STEMS    = /^(image|img|pic|photo|logo|untitled|default|placeholder|dsc|dscn)$/i;
const CAMERA_DEFAULT_STEM = /^(img_?\d+|dsc_?\d+|dscn\d+|p\d+|20\d{6}[_-]\d{6})/i;

function isQualityAlt(alt: string, imageUrl: string): boolean {
  const trimmed = alt.trim();
  if (/^pexels[\s-]/i.test(trimmed)) return false;
  if (/\d{5,}/.test(trimmed)) return false;
  if (/\b\d{3,4}\b$/.test(trimmed)) return false;
  if (/\b\d{3,4}x\d{3,4}\b/.test(trimmed)) return false;
  const normalized = trimmed.toLowerCase().replace(/[-_\s]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^(pic|image|img|photo|logo|untitled|default|placeholder|screenshot|unnamed)$/.test(normalized)) return false;
  if (/^(img|dsc|dscn|p)\s?\d+$/.test(normalized)) return false;
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

function deriveAlt(wpAlt: string | null, imageUrl: string, postTitle: string): AltResult {
  if (wpAlt && wpAlt.trim()) {
    if (isQualityAlt(wpAlt, imageUrl)) {
      return { alt: wpAlt.trim(), tier: 'wp' };
    }
  }
  const wpRejected = !!(wpAlt && wpAlt.trim());

  const filename    = imageUrl.split('/').pop() ?? '';
  const withoutExt  = filename.replace(/\.[^.]+$/, '');
  const stemCleaned = withoutExt
    .replace(/(_\d+)$/, '')
    .replace(/(-scaled-?\d*)$/, '')
    .replace(/(-resized)(-e\d+)?$/, '')
    .replace(/(-\d+x\d+|-rotated)(-\d+)?$/, '')
    .replace(/-(\d+)$/, '');

  const isDegenerate =
    stemCleaned.length <= 6 ||
    DEGENERATE_STEMS.test(stemCleaned) ||
    CAMERA_DEFAULT_STEM.test(stemCleaned);

  if (!isDegenerate) {
    const rawReadable = stemCleaned.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
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

// ── New utilities ─────────────────────────────────────────────────────────────

function truncateAtWordBoundary(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const candidate = text.slice(0, maxLen - 3);
  const lastSpace = candidate.lastIndexOf(' ');
  return (lastSpace === -1 ? candidate : candidate.slice(0, lastSpace)) + '...';
}

function deriveExcerpt(wpPostExcerpt: string, contentEncoded: string): ExcerptResult {
  const trimmed = wpPostExcerpt.trim();
  if (trimmed.length >= 20) {
    return { text: truncateAtWordBoundary(trimmed, 155), source: 'post_excerpt' };
  }

  const pRx = /<p[^>]*>([\s\S]*?)<\/p>/i;
  const pMatch = pRx.exec(contentEncoded);
  if (pMatch) {
    const rawText = pMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#\d+;/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (rawText.length >= 20 && !/^by\s/i.test(rawText)) {
      return { text: truncateAtWordBoundary(rawText, 155), source: 'derived' };
    }
  }

  return { text: undefined, source: 'none' };
}

// Fallback: when " - <tail>" has no ", IL" segment, return tail verbatim.
function parseLocation(title: string): string | undefined {
  const dashIdx = title.indexOf(' - ');
  if (dashIdx === -1) return undefined;
  const locationPart = title.slice(dashIdx + 3).trim();
  const segments = locationPart.split(',').map((s) => s.trim());
  const ilIdx = segments.findIndex((s) => s === 'IL');
  if (ilIdx === -1) {
    return locationPart.length > 0 ? locationPart : undefined;
  }
  if (ilIdx <= 0) return undefined;
  return `${segments[ilIdx - 1]}, IL`;
}

function pubDateToIso(pubDate: string): string | null {
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

// ── WXR project item parsing ──────────────────────────────────────────────────

function parseWxrProjects(wxrPath: string): {
  projects:    WxrProject[];
  attachments: Map<string, AttachmentInfo>;
} {
  const xml = fs.readFileSync(wxrPath, 'utf8');
  const projects:    WxrProject[]                = [];
  const attachments: Map<string, AttachmentInfo> = new Map();

  const itemRx = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRx.exec(xml)) !== null) {
    const item     = match[1];
    const postType = extractField(item, 'wp:post_type');
    const postId   = extractField(item, 'wp:post_id');

    if (postType === 'attachment' && postId) {
      const url   = extractField(item, 'wp:attachment_url');
      const wpAlt = extractAttachmentAlt(item);
      if (url) attachments.set(postId, { url, wpAlt });
      continue;
    }

    if (postType !== 'project') continue;
    if (extractField(item, 'wp:status') !== 'publish') continue;

    const slug = extractField(item, 'wp:post_name');
    if (!slug) continue;

    const title          = extractField(item, 'title')           ?? '';
    const pubDate        = extractField(item, 'pubDate')         ?? '';
    const wpExcerpt      = extractField(item, 'excerpt:encoded') ?? '';
    const contentEncoded = extractField(item, 'content:encoded') ?? '';
    const thumbnailId    = extractThumbnailId(item);

    projects.push({ slug, title, postId: postId ?? '', pubDate, wpExcerpt, contentEncoded, thumbnailId });
  }

  return { projects, attachments };
}

// ── Sanity client (live mode only) ────────────────────────────────────────────

function initWriteClient(): ReturnType<typeof createClient> {
  const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const writeToken = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId)  { process.stderr.write('[ERROR] NEXT_PUBLIC_SANITY_PROJECT_ID not set\n'); process.exit(1); }
  if (!dataset)    { process.stderr.write('[ERROR] NEXT_PUBLIC_SANITY_DATASET not set\n'); process.exit(1); }
  if (!writeToken) { process.stderr.write('[ERROR] SANITY_API_WRITE_TOKEN not set\n'); process.exit(1); }
  return createClient({ projectId, dataset, apiVersion: '2024-01-01', token: writeToken, useCdn: false });
}

// ── Retry helper (Sanity calls throw on failure) ──────────────────────────────

async function withRetry<T>(fn: () => Promise<T>, label: string, prefix: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    warn(prefix, `${label} threw, retrying once: ${String(err)}`);
    return await fn();
  }
}

// ── Dry-run ───────────────────────────────────────────────────────────────────

async function runDryRun(
  toProcess:   WxrProject[],
  attachments: Map<string, AttachmentInfo>
): Promise<void> {
  const dryEntries: ProjectDryRunEntry[] = [];
  fs.mkdirSync(MANIFEST_DIR, { recursive: true });

  for (const project of toProcess) {
    const slug          = project.slug;
    log(slug, 'START', `title: "${project.title}"`);

    const excerptResult = deriveExcerpt(project.wpExcerpt, project.contentEncoded);
    const location      = parseLocation(project.title);
    const completedDate = pubDateToIso(project.pubDate);
    const documentId    = `project-${slug}`;

    log(slug, 'META', `location:      ${location ?? '(none)'}`);
    log(slug, 'META', `completedDate: ${completedDate ?? '(null)'}`);
    log(slug, 'META', `excerpt.source: ${excerptResult.source}${excerptResult.text ? ` -- "${excerptResult.text.slice(0, 60)}..."` : ''}`);

    const entry: ProjectDryRunEntry = {
      slug,
      title:            project.title,
      thumbnailId:      project.thumbnailId,
      featuredImageUrl: null,
      fetchStatus:      null,
      byteSize:         null,
      contentType:      null,
      altResult:        { alt: project.title, tier: 'title' },
      location,
      completedDate,
      excerptResult,
      documentId,
      error:            null,
    };

    if (!project.thumbnailId) {
      warn(slug, 'no _thumbnail_id in WXR');
      entry.error = 'no _thumbnail_id';
      dryEntries.push(entry);
      continue;
    }

    const attachInfo = attachments.get(project.thumbnailId);
    if (!attachInfo) {
      warn(slug, `_thumbnail_id ${project.thumbnailId} not in WXR attachments map`);
      entry.error = `attachment ${project.thumbnailId} not in WXR`;
      dryEntries.push(entry);
      continue;
    }

    entry.featuredImageUrl = attachInfo.url;
    log(slug, 'FEAT', `WXR attachment URL: ${attachInfo.url}`);
    log(slug, 'FEAT', `attachment wpAlt:   "${attachInfo.wpAlt ?? '(none)'}"`);

    const fetched = await fetchBinary(attachInfo.url);
    entry.fetchStatus = fetched.status;

    if (!fetched.ok) {
      warn(slug, `featured image fetch HTTP ${fetched.status} for ${attachInfo.url}`);
      entry.error = `HTTP ${fetched.status}`;
      dryEntries.push(entry);
      continue;
    }

    entry.byteSize    = fetched.buffer!.length;
    entry.contentType = fetched.contentType;
    log(slug, 'FEAT', `fetch OK: HTTP ${fetched.status}, ${fetched.buffer!.length} bytes, ${fetched.contentType}`);

    const ext      = extFromContentType(fetched.contentType!, attachInfo.url);
    const filename = `${slug}-featured.${ext}`;
    log(slug, 'FEAT', `would upload as: ${filename}`);

    const altResult = deriveAlt(attachInfo.wpAlt, attachInfo.url, project.title);
    entry.altResult = altResult;
    log(slug, 'ALT', `tier=${altResult.tier}${altResult.note ? ` (${altResult.note})` : ''} -- "${altResult.alt}"`);

    const dryDocument = {
      _id:   documentId,
      _type: 'project',
      title: project.title,
      slug:  { _type: 'slug', current: slug },
      status: 'draft',
      ...(excerptResult.text != null && { excerpt: excerptResult.text }),
      ...(location != null && { location }),
      ...(completedDate != null && { completedDate }),
      body:         [],
      imageGallery: [],
      featuredImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: '(dry-run: asset not uploaded)' },
        alt:   altResult.alt,
      },
    };

    const slugDir = path.join(MANIFEST_DIR, slug);
    fs.mkdirSync(slugDir, { recursive: true });
    fs.writeFileSync(path.join(slugDir, 'document.json'), JSON.stringify(dryDocument, null, 2));
    log(slug, 'DRY-RUN', `document preview written to ${path.join(MANIFEST_DIR, slug, 'document.json')}`);

    dryEntries.push(entry);
    log(slug, 'DONE', `ok -- fetch=${fetched.status} alt.tier=${altResult.tier}`);
  }

  const totalOk     = dryEntries.filter((e) => e.error === null).length;
  const totalErrors = dryEntries.filter((e) => e.error !== null).length;
  const httpOk      = dryEntries.filter((e) => e.fetchStatus === 200).length;

  const summaryLines = [
    '',
    '=== migrate-projects-featured dry-run summary ===',
    `Projects processed:       ${dryEntries.length}`,
    `Featured image fetch OK:  ${httpOk} / ${dryEntries.length} (all expected 200)`,
    `Ready to write:           ${totalOk}`,
    `Errors:                   ${totalErrors}`,
    '',
    'Per-project alt text tiers:',
  ];

  for (const e of dryEntries) {
    summaryLines.push(
      `  ${e.slug.padEnd(65)} tier=${e.altResult.tier.padEnd(8)} "${e.altResult.alt.slice(0, 60)}"`
    );
  }

  summaryLines.push('', 'Parsed locations:');
  for (const e of dryEntries) {
    summaryLines.push(`  ${e.slug.padEnd(65)} ${e.location ?? '(none)'}`);
  }

  summaryLines.push('', 'Excerpt sources:');
  for (const e of dryEntries) {
    summaryLines.push(
      `  ${e.slug.padEnd(65)} ${e.excerptResult.source}${e.excerptResult.text ? ` -- "${e.excerptResult.text.slice(0, 50)}..."` : ''}`
    );
  }

  if (totalErrors > 0) {
    summaryLines.push('', 'Errors:');
    for (const e of dryEntries.filter((x) => x.error !== null)) {
      summaryLines.push(`  ${e.slug}: ${e.error}`);
    }
  }

  summaryLines.push('');

  const summary = summaryLines.join('\n');
  process.stdout.write(summary);
  logStream.write(summary);

  fs.writeFileSync(path.join(MANIFEST_DIR, 'summary.json'), JSON.stringify(dryEntries, null, 2));
  log('system', 'INFO', `dry-run manifest written to ${MANIFEST_DIR}/`);
}

// ── Live run ──────────────────────────────────────────────────────────────────

async function runLive(
  toProcess:   WxrProject[],
  attachments: Map<string, AttachmentInfo>,
  writeClient: ReturnType<typeof createClient>
): Promise<void> {
  const manifestPath = path.join(MANIFEST_DIR, 'manifest.json');
  fs.mkdirSync(MANIFEST_DIR, { recursive: true });
  const manifest: LiveManifestEntry[] = [];

  for (const project of toProcess) {
    const slug = project.slug;
    log(slug, 'START', `title: "${project.title}"`);

    const excerptResult = deriveExcerpt(project.wpExcerpt, project.contentEncoded);
    const location      = parseLocation(project.title);
    const completedDate = pubDateToIso(project.pubDate);
    const documentId    = `project-${slug}`;

    log(slug, 'META', `location: ${location ?? '(none)'}`);
    log(slug, 'META', `completedDate: ${completedDate ?? '(null)'}`);
    log(slug, 'META', `excerpt.source: ${excerptResult.source}`);

    if (!project.thumbnailId) {
      throw new Error(`${slug}: no _thumbnail_id in WXR -- stop condition`);
    }
    const attachInfo = attachments.get(project.thumbnailId);
    if (!attachInfo) {
      throw new Error(`${slug}: thumbnail ID ${project.thumbnailId} not in WXR -- stop condition`);
    }

    log(slug, 'FEAT', `fetching: ${attachInfo.url}`);
    let fetched = await fetchBinary(attachInfo.url);
    if (!fetched.ok) {
      warn(slug, `fetch HTTP ${fetched.status} -- retrying once`);
      fetched = await fetchBinary(attachInfo.url);
      if (!fetched.ok) {
        throw new Error(`${slug}: fetch failed after retry (HTTP ${fetched.status}) -- stop condition`);
      }
    }
    log(slug, 'FEAT', `fetch OK: HTTP 200, ${fetched.buffer!.length} bytes, ${fetched.contentType}`);

    const ext      = extFromContentType(fetched.contentType!, attachInfo.url);
    const filename = `${slug}-featured.${ext}`;
    const altResult = deriveAlt(attachInfo.wpAlt, attachInfo.url, project.title);
    log(slug, 'ALT', `tier=${altResult.tier} -- "${altResult.alt}"`);

    log(slug, 'UPLOAD', `uploading ${filename} (${fetched.buffer!.length} bytes)...`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const asset: { _id: string } = await withRetry(
      () => (writeClient as any).assets.upload('image', fetched.buffer!, { filename, contentType: fetched.contentType! }),
      'assets.upload',
      slug
    );
    const assetId = asset._id;
    log(slug, 'UPLOAD', `asset uploaded: ${assetId}`);

    const document = {
      _id:    documentId,
      _type:  'project',
      title:  project.title,
      slug:   { _type: 'slug', current: slug },
      status: 'draft',
      ...(excerptResult.text != null && { excerpt: excerptResult.text }),
      ...(location != null && { location }),
      ...(completedDate != null && { completedDate }),
      body:         [],
      imageGallery: [],
      featuredImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt:   altResult.alt,
      },
    };

    log(slug, 'WRITE', `createOrReplace ${documentId}...`);
    await withRetry(
      () => writeClient.createOrReplace(document),
      'createOrReplace',
      slug
    );
    log(slug, 'WRITE', `document created: ${documentId}`);

    manifest.push({ slug, documentId, assetId, sourceUrl: attachInfo.url, filename, status: 'ok' });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    log(slug, 'DONE', `ok`);
  }

  log('system', 'INFO', `live manifest written to ${manifestPath}`);
}

// ── Verification (runs automatically after --live) ────────────────────────────

async function runVerification(
  toProcess:   WxrProject[],
  writeClient: ReturnType<typeof createClient>
): Promise<boolean> {
  log('system', 'VERIFY', 'querying Sanity for all project documents...');

  const docs: VerifyDoc[] = await writeClient.fetch(`
    *[_type == "project"]{
      _id,
      title,
      "slug": slug.current,
      location,
      excerpt,
      completedDate,
      status,
      "featuredImage": {
        "alt": featuredImage.alt,
        "asset": featuredImage.asset->{ _id, originalFilename, mimeType, size, url }
      }
    } | order(_createdAt asc)
  `);

  fs.writeFileSync(VERIFY_PATH, JSON.stringify(docs, null, 2));
  log('system', 'VERIFY', `raw results (${docs.length} docs) written to ${VERIFY_PATH}`);

  const wxrSlugs          = new Set(toProcess.map((p) => p.slug));
  const restaurantSlug    = 'the-benefits-of-a-professional-restaurant-furniture-installation';
  const originalFilenameRx = /^[a-z0-9-]+-featured\.(jpg|jpeg|png)$/;
  const isoDateRx          = /^\d{4}-\d{2}-\d{2}$/;

  const assertions: Array<{ name: string; pass: boolean; failures: string[] }> = [];

  // 1. Count is exactly 9
  {
    const pass = docs.length === 9;
    assertions.push({
      name: 'count == 9',
      pass,
      failures: pass ? [] : [`count is ${docs.length} (expected 9) -- check for undeletted test document`],
    });
  }

  // 2. All have featuredImage.asset._id resolved
  {
    const failures = docs
      .filter((d) => !d.featuredImage?.asset?._id)
      .map((d) => `${d._id}: featuredImage.asset._id is null`);
    assertions.push({ name: 'all have asset._id resolved', pass: failures.length === 0, failures });
  }

  // 3. All originalFilename match slug-derived pattern
  {
    const failures = docs
      .filter((d) => !originalFilenameRx.test(d.featuredImage?.asset?.originalFilename ?? ''))
      .map((d) => `${d._id}: originalFilename="${d.featuredImage?.asset?.originalFilename ?? '(null)'}"`);
    assertions.push({ name: 'all originalFilename match pattern', pass: failures.length === 0, failures });
  }

  // 4. All mimeType starts with "image/"
  {
    const failures = docs
      .filter((d) => !d.featuredImage?.asset?.mimeType?.startsWith('image/'))
      .map((d) => `${d._id}: mimeType="${d.featuredImage?.asset?.mimeType ?? '(null)'}"`);
    assertions.push({ name: 'all mimeType starts with image/', pass: failures.length === 0, failures });
  }

  // 5. All featuredImage.alt non-empty
  {
    const failures = docs
      .filter((d) => !d.featuredImage?.alt?.trim())
      .map((d) => `${d._id}: alt="${d.featuredImage?.alt ?? '(null)'}"`);
    assertions.push({ name: 'all featuredImage.alt non-empty', pass: failures.length === 0, failures });
  }

  // 6. All status == "draft"
  {
    const failures = docs
      .filter((d) => d.status !== 'draft')
      .map((d) => `${d._id}: status="${d.status}"`);
    assertions.push({ name: 'all status == draft', pass: failures.length === 0, failures });
  }

  // 7. All slugs match WXR set
  {
    const failures = docs
      .filter((d) => !wxrSlugs.has(d.slug))
      .map((d) => `${d._id}: slug="${d.slug}" not in WXR project set`);
    assertions.push({ name: 'all slugs match WXR', pass: failures.length === 0, failures });
  }

  // 8. All completedDate in ISO YYYY-MM-DD
  {
    const failures = docs
      .filter((d) => !isoDateRx.test(d.completedDate ?? ''))
      .map((d) => `${d._id}: completedDate="${d.completedDate ?? '(null)'}"`);
    assertions.push({ name: 'all completedDate YYYY-MM-DD', pass: failures.length === 0, failures });
  }

  // 9. 8 have location ending ", IL", 1 (restaurant) has "Chicago Suburbs"
  {
    const failures: string[] = [];
    let ilCount = 0;
    for (const d of docs) {
      if (d.slug === restaurantSlug) {
        if (d.location !== 'Chicago Suburbs') {
          failures.push(`${d._id}: expected "Chicago Suburbs", got="${d.location ?? '(null)'}"`);
        }
      } else {
        if (d.location?.endsWith(', IL')) {
          ilCount++;
        } else {
          failures.push(`${d._id}: expected location ending ", IL", got="${d.location ?? '(null)'}"`);
        }
      }
    }
    if (ilCount !== 8 && failures.length === 0) {
      failures.push(`expected 8 docs with ", IL" location, got ${ilCount}`);
    }
    assertions.push({ name: '8 IL locations + 1 Chicago Suburbs', pass: failures.length === 0, failures });
  }

  const summaryLines = ['', '=== Verification Results ==='];
  let allPass = true;
  for (const a of assertions) {
    const label = a.pass ? 'PASS' : 'FAIL';
    summaryLines.push(`  [${label}] ${a.name}`);
    if (!a.pass) {
      allPass = false;
      for (const f of a.failures) {
        summaryLines.push(`         ${f}`);
        warn('system', `assertion failure: ${f}`);
      }
    }
  }
  summaryLines.push('', allPass ? 'All assertions passed.' : 'VERIFICATION FAILED -- see above.', '');

  const verifyBlock = summaryLines.join('\n');
  process.stdout.write(verifyBlock);
  logStream.write(verifyBlock);

  return allPass;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  if (!fs.existsSync(WXR_PATH)) {
    process.stderr.write(`[ERROR] WXR not found: ${WXR_PATH}\n`);
    process.exit(1);
  }

  log('system', 'INFO', `mode: ${MODE}`);
  log('system', 'INFO', `WXR: ${WXR_PATH}`);
  log('system', 'INFO', `slug filter: ${slugArg ?? 'all'}`);
  log('system', 'INFO', `log path: ${LOG_PATH}`);

  log('system', 'INFO', 'parsing WXR...');
  const { projects, attachments } = parseWxrProjects(WXR_PATH);
  log('system', 'INFO', `WXR: ${projects.length} published project(s), ${attachments.size} attachment(s)`);

  const toProcess = slugArg
    ? projects.filter((p) => p.slug === slugArg)
    : projects;

  if (toProcess.length === 0) {
    warn('system', slugArg ? `slug "${slugArg}" not found in WXR` : 'no published projects found');
    process.exit(1);
  }

  log('system', 'INFO', `processing ${toProcess.length} project(s)`);

  if (isLive) {
    const writeClient = initWriteClient();
    await runLive(toProcess, attachments, writeClient);
    log('system', 'INFO', 'starting verification...');
    const passed = await runVerification(toProcess, writeClient);
    if (!passed) {
      process.stderr.write('[ERROR] verification failed -- see assertions above -- stop condition\n');
      process.exit(1);
    }
    log('system', 'INFO', 'verification PASSED -- all assertions ok');
    return;
  }

  await runDryRun(toProcess, attachments);
}

main().catch((e: unknown) => {
  process.stderr.write(`[ERROR] ${String(e)}\n`);
  process.exit(1);
});

/**
 * migrate-projects-body.ts
 * Pass 2: Populate project document body with Portable Text and inline images.
 * Default mode: dry-run (no Sanity writes).
 * Live mode:    --live flag.
 * Verification: runs automatically after --live writes.
 *               Output: tmp/projects-body-verification.json
 *
 * Update pattern: writeClient.patch(`project-${slug}`).set({ body }).commit()
 * This preserves featuredImage, imageGallery, and all other Pass 1 fields.
 *
 * DOM walk strategy: querySelectorAll('img') at any depth.
 * For each img, find the topmost <figure> ancestor (up to body).
 * Replace the topmost figure with one sentinel <p> per contained image.
 * This handles both standalone wp:image blocks and nested wp:gallery blocks.
 */

import { config as loadDotenv } from 'dotenv';
import { createClient }          from 'next-sanity';
import { htmlToBlocks }          from '@sanity/block-tools';
import { Schema }                from '@sanity/schema';
import { JSDOM }                 from 'jsdom';
import * as crypto from 'crypto';
import * as fs     from 'fs';
import * as path   from 'path';

loadDotenv({ path: '.env.local' });

// ── CLI ───────────────────────────────────────────────────────────────────────

const argv    = process.argv.slice(2);
const hasFlag = (flag: string): boolean => argv.includes(flag);
const getArg  = (flag: string): string | undefined => {
  const i = argv.indexOf(flag);
  return i !== -1 ? argv[i + 1] : undefined;
};

const isLive   = hasFlag('--live');
const isForce  = hasFlag('--force');
const slugArg  = getArg('--slug');

// ── Config ────────────────────────────────────────────────────────────────────

const WXR_PATH     = 'onpointinstallationsinc.WordPress.2026-05-21.xml';
const USER_AGENT   = 'Mozilla/5.0 (compatible; OnPointMigrator/1.0)';
const MODE         = isLive ? 'live' : 'dry-run';
const LOG_PATH     = path.join('tmp', `projects-body-${MODE}.log`);
const MANIFEST_DIR = path.join('tmp', `projects-body-${MODE}`);
const VERIFY_PATH  = path.join('tmp', 'projects-body-verification.json');

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
  contentEncoded: string;
  thumbnailId:    string | null;
}

interface MarkerInfo {
  markerKey:  string;
  alt:        string;
  wpImageId:  string | null;
  srcHint:    string;
}

interface AltResult {
  alt:   string;
  tier:  'wp' | 'filename' | 'title';
  note?: string;
}

interface FetchResult {
  ok:          boolean;
  status:      number;
  buffer:      Buffer | null;
  contentType: string | null;
}

interface ImageResult {
  markerKey:    string;
  wpImageId:    string | null;
  srcHint:      string;
  attachUrl:    string | null;
  fetchStatus:  number | null;
  assetId:      string | null;
  altResult:    AltResult;
  isStockPhoto: boolean;
  error:        string | null;
}

interface ProjectBodyResult {
  slug:               string;
  imagesWalked:       number;
  imagesResolved:     number;
  imagesFetched:      number;
  bodyBlockCount:     number;
  bodyImageCount:     number;
  bylineStripped:     boolean;
  linkSubsApplied:    number;
  stockPhotosFound:   string[];
  anomalies:          string[];
  imageResults:       ImageResult[];
  // dry-run only
  bodyPreview?:       unknown[];
}

interface VerifyProjectDoc {
  _id:                   string;
  slug:                  string;
  bodyLength:            number;
  bodyImageCount:        number;
  unresolvedImageCount:  number;
  emptyAltCount:         number;
  featuredImageResolved: boolean;
  status:                string;
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

function extractAttachmentAlt(itemXml: string): string | null {
  const blockRx = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g;
  let m: RegExpExecArray | null;
  while ((m = blockRx.exec(itemXml)) !== null) {
    if (extractField(m[1], 'wp:meta_key') === '_wp_attachment_image_alt') {
      return extractField(m[1], 'wp:meta_value');
    }
  }
  return null;
}

function extractThumbnailId(itemXml: string): string | null {
  const blockRx = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g;
  let m: RegExpExecArray | null;
  while ((m = blockRx.exec(itemXml)) !== null) {
    if (extractField(m[1], 'wp:meta_key') === '_thumbnail_id') {
      return extractField(m[1], 'wp:meta_value');
    }
  }
  return null;
}

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

    projects.push({
      slug,
      title:          extractField(item, 'title')           ?? '',
      contentEncoded: extractField(item, 'content:encoded') ?? '',
      thumbnailId:    extractThumbnailId(item),
    });
  }

  return { projects, attachments };
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
    if (isQualityAlt(wpAlt, imageUrl)) return { alt: wpAlt.trim(), tier: 'wp' };
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

// ── Stock photo detection ─────────────────────────────────────────────────────

function isStockPhotoUrl(url: string): boolean {
  return /pexels-/i.test(url)
    || /adobestock-/i.test(url)
    || /shutterstock-/i.test(url)
    || /istock-/i.test(url)
    || /-photo-\d+/i.test(url);
}

// ── Utility ───────────────────────────────────────────────────────────────────

function generateKey(): string {
  return crypto.randomBytes(8).toString('hex');
}

// ── Block-tools schema (mirrors project body field) ───────────────────────────

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
          { title: 'Normal',     value: 'normal'     },
          { title: 'H2',         value: 'h2'          },
          { title: 'H3',         value: 'h3'          },
          { title: 'H4',         value: 'h4'          },
          { title: 'Blockquote', value: 'blockquote' },
        ],
        marks: {
          decorators: [
            { title: 'Strong',   value: 'strong' },
            { title: 'Emphasis', value: 'em'     },
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

// ── Link substitutions (verbatim from migrate-inline-images.ts) ───────────────

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

const DEAD_LINK_PREFIXES = ['/project/', '/category/'];

function applyLinkSubstitutions(doc: Document, contentEl: Element, slug: string): number {
  const links = Array.from(contentEl.querySelectorAll('a[href]'));
  let substituted = 0;
  let stripped = 0;

  for (const a of links) {
    const rawHref = a.getAttribute('href') ?? '';
    const href = rawHref.replace(/^https?:\/\/(?:www\.)?onpointinstallations\.com/, '');

    if (SERVICE_SUBSTITUTIONS[href]) {
      a.setAttribute('href', SERVICE_SUBSTITUTIONS[href]);
      substituted++;
    } else if (AUDIT_SUBSTITUTIONS[href]) {
      a.setAttribute('href', AUDIT_SUBSTITUTIONS[href]);
      substituted++;
    } else if (DEAD_LINK_PREFIXES.some((p) => href.startsWith(p))) {
      const text = doc.createTextNode(a.textContent ?? '');
      a.parentNode?.replaceChild(text, a);
      stripped++;
    }
  }

  const total = substituted + stripped;
  if (total > 0) {
    log(slug, 'SUBST', `${substituted} substituted, ${stripped} dead links stripped`);
  }
  return total;
}

// ── DOM walk: discover images and insert sentinels ────────────────────────────
//
// Strategy: querySelectorAll('img') collects all images at any depth.
// For each image, walk up to find the topmost <figure> ancestor within body.
// Topmost-figure replacement ensures sentinels land as siblings of block-level
// elements (in column divs), not inside nested <figure> wrappers.
// For gallery blocks (multiple imgs inside one outer figure), all images in that
// outer figure are processed together: one sentinel per image, inserted before
// the outer figure, then the outer figure is removed.

interface DomWalkResult {
  markers:        MarkerInfo[];
  bylineStripped: boolean;
  linkSubsCount:  number;
  modifiedHtml:   string;
}

function domWalkAndSentinel(contentHtml: string, slug: string): DomWalkResult {
  const dom  = new JSDOM(contentHtml);
  const doc  = dom.window.document;
  const body = doc.body;

  // Strip byline: first <p> matching /^by\s/i
  let bylineStripped = false;
  const firstP = body.querySelector('p');
  if (firstP && /^by\s/i.test(firstP.textContent?.trim() ?? '')) {
    warn(slug, `byline stripped: "${firstP.textContent?.trim()}"`);
    firstP.parentNode!.removeChild(firstP);
    bylineStripped = true;
  }

  // Apply link substitutions
  const linkSubsCount = applyLinkSubstitutions(doc, body, slug);

  // Walk images
  const imgs = Array.from(body.querySelectorAll('img')) as HTMLElement[];
  const processedFigures = new Set<Element>();
  const markers: MarkerInfo[] = [];
  let markerIdx = 0;

  for (const img of imgs) {
    // Skip imgs detached by prior gallery processing
    if (!body.contains(img)) continue;

    // Find topmost <figure> ancestor within body
    let topFigure: Element | null = null;
    let cur: Element | null = (img as Element).parentElement;
    while (cur && cur !== body) {
      if (cur.tagName.toLowerCase() === 'figure') topFigure = cur;
      cur = cur.parentElement;
    }

    // Skip if this topmost figure was already processed (e.g., later imgs in same gallery)
    if (topFigure && processedFigures.has(topFigure)) continue;

    // Collect all imgs within this block (1 for standalone, N for gallery)
    const blockImgs = topFigure
      ? (Array.from(topFigure.querySelectorAll('img')) as HTMLElement[])
      : [img];

    const blockMarkers: string[] = [];
    for (const bImg of blockImgs) {
      const markerKey  = `__IMGMARKER_${markerIdx}__`;
      const alt        = bImg.getAttribute('alt') ?? '';
      const cls        = bImg.getAttribute('class') ?? '';
      const srcHint    = bImg.getAttribute('src') ?? '';
      const idMatch    = /wp-image-(\d+)/.exec(cls);
      const wpImageId  = idMatch ? idMatch[1] : null;
      markers.push({ markerKey, alt, wpImageId, srcHint });
      markerIdx++;
      blockMarkers.push(markerKey);
    }

    // Replace the target block with sentinel paragraphs (one per image)
    const replaceTarget = topFigure ?? (img as Element);
    const parent = replaceTarget.parentNode!;
    for (const mk of blockMarkers) {
      const p = doc.createElement('p');
      p.textContent = mk;
      parent.insertBefore(p, replaceTarget);
    }
    parent.removeChild(replaceTarget);

    if (topFigure) processedFigures.add(topFigure);
  }

  log(slug, 'DOM', `walked ${markers.length} image(s), byline=${bylineStripped}, linkSubs=${linkSubsCount}`);

  return { markers, bylineStripped, linkSubsCount, modifiedHtml: body.innerHTML };
}

// ── Per-project body builder (shared between dry-run and live) ────────────────

interface BodyBuilderResult {
  imageResults:    ImageResult[];
  finalBlocks:     unknown[];
  stockPhotos:     string[];
  anomalies:       string[];
}

async function buildBodyBlocks(
  slug:        string,
  project:     WxrProject,
  attachments: Map<string, AttachmentInfo>,
  dryRun:      boolean,
  writeClient: ReturnType<typeof createClient> | null
): Promise<{ domResult: DomWalkResult } & BodyBuilderResult> {
  const domResult = domWalkAndSentinel(project.contentEncoded, slug);
  const { markers, modifiedHtml } = domResult;

  const imageResults:  ImageResult[] = [];
  const assetMap:      Map<string, string | null> = new Map();
  const stockPhotos:   string[] = [];
  const anomalies:     string[] = [];

  // Fetch and (if live) upload each image
  for (let i = 0; i < markers.length; i++) {
    const marker     = markers[i];
    const inlineBase = `${slug}-${i + 1}`;

    const ir: ImageResult = {
      markerKey:    marker.markerKey,
      wpImageId:    marker.wpImageId,
      srcHint:      marker.srcHint,
      attachUrl:    null,
      fetchStatus:  null,
      assetId:      null,
      altResult:    { alt: project.title, tier: 'title' },
      isStockPhoto: false,
      error:        null,
    };

    if (!marker.wpImageId) {
      const msg = `inline ${i + 1}: no wp-image-NNNN class; src="${marker.srcHint}"`;
      warn(slug, msg);
      anomalies.push(msg);
      ir.error = 'no wp-image class';
      assetMap.set(marker.markerKey, null);
      imageResults.push(ir);
      continue;
    }

    const attachInfo = attachments.get(marker.wpImageId);
    if (!attachInfo) {
      const msg = `inline ${i + 1}: wp-image-${marker.wpImageId} not in WXR attachments map; src="${marker.srcHint}"`;
      warn(slug, msg);
      anomalies.push(msg);
      ir.error = `wp-image-${marker.wpImageId} not in WXR`;
      assetMap.set(marker.markerKey, null);
      imageResults.push(ir);
      continue;
    }

    ir.attachUrl    = attachInfo.url;
    ir.isStockPhoto = isStockPhotoUrl(attachInfo.url);
    if (ir.isStockPhoto) stockPhotos.push(attachInfo.url);

    // Alt text derivation: three-tier
    const wpAlt  = marker.alt.trim() || attachInfo.wpAlt;
    ir.altResult = deriveAlt(wpAlt, attachInfo.url, project.title);

    log(slug, 'IMG', `${i + 1}/${markers.length} url=${attachInfo.url.split('/').pop()} alt.tier=${ir.altResult.tier}`);

    // Fetch binary (always, to verify 200 in dry-run)
    let fetched = await fetchBinary(attachInfo.url);
    if (!fetched.ok) {
      warn(slug, `inline ${i + 1}: fetch HTTP ${fetched.status} -- retrying once`);
      fetched = await fetchBinary(attachInfo.url);
      if (!fetched.ok) {
        const msg = `inline ${i + 1}: fetch HTTP ${fetched.status} after retry`;
        anomalies.push(msg);
        ir.fetchStatus = fetched.status;
        ir.error = `HTTP ${fetched.status}`;
        assetMap.set(marker.markerKey, null);
        imageResults.push(ir);
        continue;
      }
    }

    ir.fetchStatus = fetched.status;
    const ext      = extFromContentType(fetched.contentType!, attachInfo.url);
    const filename = `${inlineBase}.${ext}`;

    if (dryRun) {
      log(slug, 'DRY-RUN', `would upload: ${filename} (${fetched.buffer!.length} bytes)`);
      assetMap.set(marker.markerKey, `dry-run-${marker.markerKey}`);
    } else {
      // Live: upload to Sanity
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const asset: { _id: string } = await withRetry(
        () => (writeClient as any).assets.upload('image', fetched.buffer!, { filename, contentType: fetched.contentType! }),
        `assets.upload(${filename})`,
        slug
      );
      ir.assetId = asset._id;
      log(slug, 'UPLOAD', `${filename} -> ${asset._id}`);
      assetMap.set(marker.markerKey, asset._id);
    }

    imageResults.push(ir);
  }

  // Convert modified HTML to Portable Text via htmlToBlocks
  const textBlocks = htmlToBlocks(modifiedHtml, blockContentType, {
    parseHtml: (html: string) => new JSDOM(html).window.document,
  });

  log(slug, 'BLOCKS', `htmlToBlocks: ${(textBlocks as unknown[]).length} blocks from modified HTML`);

  // Replace sentinel text blocks with image blocks
  const finalBlocks: unknown[] = [];
  for (const block of textBlocks as Array<{ _type: string; children?: Array<{ text: string }> }>) {
    if (
      block._type === 'block' &&
      Array.isArray(block.children) &&
      block.children.length === 1
    ) {
      const text = block.children[0]?.text ?? '';
      const m = /^__IMGMARKER_(\d+)__$/.exec(text);
      if (m) {
        const idx    = parseInt(m[1], 10);
        const marker = markers[idx];
        const ref    = assetMap.get(marker.markerKey);
        const imgRes = imageResults[idx];

        if (ref && !ref.startsWith('dry-run-') || (dryRun && ref)) {
          const assetRef = dryRun
            ? '(dry-run: asset not uploaded)'
            : ref!;
          finalBlocks.push({
            _type:  'image',
            _key:   generateKey(),
            asset:  { _type: 'reference', _ref: assetRef },
            alt:    imgRes?.altResult.alt ?? marker.alt,
          });
          log(slug, 'BLOCKS', `sentinel ${idx + 1} -> image block (alt: "${imgRes?.altResult.alt ?? marker.alt}")`);
        } else if (!ref || ref.startsWith('dry-run-')) {
          if (dryRun && ref) {
            finalBlocks.push({
              _type:  'image',
              _key:   generateKey(),
              asset:  { _type: 'reference', _ref: '(dry-run: asset not uploaded)' },
              alt:    imgRes?.altResult.alt ?? marker.alt,
            });
          } else {
            warn(slug, `sentinel ${idx + 1}: no asset -- image block omitted`);
            const msg = `sentinel ${idx + 1} (wp-image-${marker.wpImageId ?? 'none'}): upload failed, image block omitted`;
            anomalies.push(msg);
          }
        }
        continue;
      }
    }
    finalBlocks.push(block);
  }

  const bodyImageCount = (finalBlocks as Array<{ _type: string }>).filter((b) => b._type === 'image').length;
  log(slug, 'BLOCKS', `final body: ${finalBlocks.length} blocks (${bodyImageCount} image blocks)`);

  return { domResult, imageResults, finalBlocks, stockPhotos, anomalies };
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
  fs.mkdirSync(MANIFEST_DIR, { recursive: true });
  const results: ProjectBodyResult[] = [];

  for (const project of toProcess) {
    const slug = project.slug;
    log(slug, 'START', `title: "${project.title}"`);

    const { domResult, imageResults, finalBlocks, stockPhotos, anomalies } =
      await buildBodyBlocks(slug, project, attachments, true, null);

    const bodyImageCount = (finalBlocks as Array<{ _type: string }>).filter((b) => b._type === 'image').length;
    const result: ProjectBodyResult = {
      slug,
      imagesWalked:    imageResults.length,
      imagesResolved:  imageResults.filter((r) => r.attachUrl !== null).length,
      imagesFetched:   imageResults.filter((r) => r.fetchStatus === 200).length,
      bodyBlockCount:  finalBlocks.length,
      bodyImageCount,
      bylineStripped:  domResult.bylineStripped,
      linkSubsApplied: domResult.linkSubsCount,
      stockPhotosFound: stockPhotos,
      anomalies,
      imageResults,
      bodyPreview: finalBlocks,
    };

    const slugDir = path.join(MANIFEST_DIR, slug);
    fs.mkdirSync(slugDir, { recursive: true });
    fs.writeFileSync(path.join(slugDir, 'body.json'), JSON.stringify(finalBlocks, null, 2));
    log(slug, 'DRY-RUN', `body preview written to ${path.join(MANIFEST_DIR, slug, 'body.json')}`);

    results.push(result);
    log(slug, 'DONE', `images=${result.imagesWalked} resolved=${result.imagesResolved} fetched=${result.imagesFetched} bodyBlocks=${result.bodyBlockCount} imageBlocks=${result.bodyImageCount}`);
  }

  // Summary report
  const totalWalked   = results.reduce((a, r) => a + r.imagesWalked, 0);
  const totalResolved = results.reduce((a, r) => a + r.imagesResolved, 0);
  const totalFetched  = results.reduce((a, r) => a + r.imagesFetched, 0);
  const totalStock    = results.reduce((a, r) => a + r.stockPhotosFound.length, 0);
  const totalBylines  = results.filter((r) => r.bylineStripped).length;
  const totalLinkSubs = results.reduce((a, r) => a + r.linkSubsApplied, 0);
  const totalAnomalies = results.reduce((a, r) => a + r.anomalies.length, 0);

  const tierCounts = { wp: 0, filename: 0, title: 0 };
  for (const r of results) {
    for (const ir of r.imageResults) {
      tierCounts[ir.altResult.tier]++;
    }
  }

  const summaryLines = [
    '',
    '=== migrate-projects-body dry-run summary ===',
    `Total images walked:        ${totalWalked} (expected 71)`,
    `Total images resolved:      ${totalResolved} / ${totalWalked}`,
    `Total images fetched 200:   ${totalFetched} / ${totalWalked}`,
    `Alt tier breakdown:         wp=${tierCounts.wp}  filename=${tierCounts.filename}  title=${tierCounts.title}`,
    `Stock photos detected:      ${totalStock}`,
    `Bylines stripped:           ${totalBylines}`,
    `Link subs applied:          ${totalLinkSubs}`,
    `Anomalies:                  ${totalAnomalies}`,
    '',
    'Per-project breakdown:',
    `  ${'slug'.padEnd(68)} walked  resolved  fetched  blocks  imgBlocks  byline  linkSubs  stock`,
  ];

  for (const r of results) {
    summaryLines.push(
      `  ${r.slug.padEnd(68)} ${String(r.imagesWalked).padEnd(7)} ${String(r.imagesResolved).padEnd(9)} ${String(r.imagesFetched).padEnd(8)} ${String(r.bodyBlockCount).padEnd(7)} ${String(r.bodyImageCount).padEnd(10)} ${r.bylineStripped ? 'YES   ' : 'no    '} ${String(r.linkSubsApplied).padEnd(9)} ${r.stockPhotosFound.length}`
    );
  }

  if (totalStock > 0) {
    summaryLines.push('', 'Stock photo URLs:');
    for (const r of results) {
      for (const url of r.stockPhotosFound) {
        summaryLines.push(`  ${r.slug}: ${url}`);
      }
    }
  }

  const allAnomalies = results.flatMap((r) => r.anomalies.map((a) => `${r.slug}: ${a}`));
  summaryLines.push('', 'Anomalies:');
  if (allAnomalies.length === 0) {
    summaryLines.push('  None.');
  } else {
    for (const a of allAnomalies) summaryLines.push(`  - ${a}`);
  }

  // CTA block sample: show last 3 blocks from first project (modular-installation-services-park-ridge-il)
  const ctaSample = results[0];
  if (ctaSample && ctaSample.bodyPreview) {
    const blocks = ctaSample.bodyPreview as Array<{ _type: string }>;
    const lastBlocks = blocks.slice(-4);
    summaryLines.push('', `CTA block handling (last 4 blocks from ${ctaSample.slug}):`, '```json');
    summaryLines.push(JSON.stringify(lastBlocks, null, 2));
    summaryLines.push('```');
  }

  // Restaurant gallery surface: list first project's images that are the restaurant
  const restaurantSlug = 'the-benefits-of-a-professional-restaurant-furniture-installation';
  const restResult = results.find((r) => r.slug === restaurantSlug);
  if (restResult) {
    summaryLines.push('', 'Restaurant gallery images (in order):');
    for (let i = 0; i < restResult.imageResults.length; i++) {
      const ir = restResult.imageResults[i];
      const fname = ir.attachUrl ? ir.attachUrl.split('/').pop() : '(no url)';
      summaryLines.push(`  ${i + 1}. wp-image-${ir.wpImageId ?? 'none'} | ${fname} | alt.tier=${ir.altResult.tier}`);
    }
  }

  summaryLines.push('');
  const summary = summaryLines.join('\n');
  process.stdout.write(summary);
  logStream.write(summary);

  fs.writeFileSync(path.join(MANIFEST_DIR, 'summary.json'), JSON.stringify(results, null, 2));
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
  const manifest: ProjectBodyResult[] = [];

  for (const project of toProcess) {
    const slug       = project.slug;
    const documentId = `project-${slug}`;
    log(slug, 'START', `title: "${project.title}"`);

    // Collision guard: abort if body already has image blocks (unless --force)
    const existing = await writeClient.fetch<{ hasImages: boolean; count: number } | null>(
      `*[_id == $id][0]{ "hasImages": defined(body[_type == "image"][0]), "count": length(body) }`,
      { id: documentId }
    );
    if (!isForce && existing?.hasImages) {
      throw new Error(`${slug}: body already contains image blocks -- re-run with --force to override. Stop condition.`);
    }

    const { domResult, imageResults, finalBlocks, stockPhotos, anomalies } =
      await buildBodyBlocks(slug, project, attachments, false, writeClient);

    const bodyImageCount = (finalBlocks as Array<{ _type: string }>).filter((b) => b._type === 'image').length;

    if (anomalies.some((a) => a.includes('upload failed'))) {
      throw new Error(`${slug}: image upload failure detected -- stop condition (partial writes not committed)`);
    }

    log(slug, 'PATCH', `patching body on ${documentId} (${finalBlocks.length} blocks, ${bodyImageCount} image blocks)...`);
    await withRetry(
      () => writeClient.patch(documentId).set({ body: finalBlocks }).commit(),
      'patch.body',
      slug
    );
    log(slug, 'PATCH', `body patched`);

    const result: ProjectBodyResult = {
      slug,
      imagesWalked:    imageResults.length,
      imagesResolved:  imageResults.filter((r) => r.attachUrl !== null).length,
      imagesFetched:   imageResults.filter((r) => r.fetchStatus === 200).length,
      bodyBlockCount:  finalBlocks.length,
      bodyImageCount,
      bylineStripped:  domResult.bylineStripped,
      linkSubsApplied: domResult.linkSubsCount,
      stockPhotosFound: stockPhotos,
      anomalies,
      imageResults,
    };

    manifest.push(result);
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

  const docs: VerifyProjectDoc[] = await writeClient.fetch(`
    *[_type == "project"]{
      _id,
      "slug": slug.current,
      "bodyLength": length(body),
      "bodyImageCount": length(body[_type == "image"]),
      "unresolvedImageCount": length(body[_type == "image" && !defined(asset->._id)]),
      "emptyAltCount": length(body[_type == "image" && (alt == null || alt == "")]),
      "featuredImageResolved": defined(featuredImage.asset->._id),
      status
    } | order(_createdAt asc)
  `);

  fs.writeFileSync(VERIFY_PATH, JSON.stringify(docs, null, 2));
  log('system', 'VERIFY', `raw results (${docs.length} docs) written to ${VERIFY_PATH}`);

  const wxrSlugs = new Set(toProcess.map((p) => p.slug));
  const assertions: Array<{ name: string; pass: boolean; failures: string[] }> = [];

  // 1. Count == 9
  assertions.push({
    name: 'count == 9',
    pass: docs.length === 9,
    failures: docs.length !== 9
      ? [`count is ${docs.length} (expected 9) -- check for test document`]
      : [],
  });

  // 2. All body.length > 0
  {
    const failures = docs.filter((d) => d.bodyLength === 0).map((d) => `${d._id}: bodyLength == 0`);
    assertions.push({ name: 'all body non-empty', pass: failures.length === 0, failures });
  }

  // 3. All have at least 1 image block in body
  {
    const failures = docs.filter((d) => d.bodyImageCount === 0).map((d) => `${d._id}: no image blocks in body`);
    assertions.push({ name: 'all body has image blocks', pass: failures.length === 0, failures });
  }

  // 4. All image blocks have resolved asset._id
  {
    const failures = docs.filter((d) => d.unresolvedImageCount > 0).map((d) => `${d._id}: ${d.unresolvedImageCount} unresolved image asset(s)`);
    assertions.push({ name: 'all image blocks resolved', pass: failures.length === 0, failures });
  }

  // 5. All image blocks have non-empty alt
  {
    const failures = docs.filter((d) => d.emptyAltCount > 0).map((d) => `${d._id}: ${d.emptyAltCount} image(s) with empty alt`);
    assertions.push({ name: 'all image blocks have alt', pass: failures.length === 0, failures });
  }

  // 6. All featuredImage preserved from Pass 1
  {
    const failures = docs.filter((d) => !d.featuredImageResolved).map((d) => `${d._id}: featuredImage.asset not resolved`);
    assertions.push({ name: 'all featuredImage preserved', pass: failures.length === 0, failures });
  }

  // 7. All status == "draft"
  {
    const failures = docs.filter((d) => d.status !== 'draft').map((d) => `${d._id}: status="${d.status}"`);
    assertions.push({ name: 'all status == draft', pass: failures.length === 0, failures });
  }

  // 8. All slugs match WXR
  {
    const failures = docs.filter((d) => !wxrSlugs.has(d.slug)).map((d) => `${d._id}: slug="${d.slug}" not in WXR`);
    assertions.push({ name: 'all slugs match WXR', pass: failures.length === 0, failures });
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

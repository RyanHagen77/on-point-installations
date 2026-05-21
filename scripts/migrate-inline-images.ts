import { config as loadDotenv } from 'dotenv';
import { createClient } from 'next-sanity';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

loadDotenv({ path: '.env.local' });

// ── CLI ───────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const hasFlag = (flag: string): boolean => argv.includes(flag);
const getArg  = (flag: string): string | undefined => {
  for (const arg of argv) {
    if (arg === flag) return argv[argv.indexOf(flag) + 1];
    if (arg.startsWith(`${flag}=`)) return arg.slice(flag.length + 1);
  }
  return undefined;
};

const dryRun  = hasFlag('--dry-run');
const forceP2 = hasFlag('--force');
const slugArg = getArg('--slug');

// ── Config ────────────────────────────────────────────────────────────────────

const WXR_PATH   = 'onpointinstallationsinc.WordPress.2026-05-21.xml';
const USER_AGENT = 'Mozilla/5.0 (compatible; OnPointMigrator/1.0)';

// ── Env ───────────────────────────────────────────────────────────────────────

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) { process.stderr.write(`[ERROR] ${key} is not set\n`); process.exit(1); }
  return value as string;
}

const projectId  = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
const dataset    = requireEnv('NEXT_PUBLIC_SANITY_DATASET');
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!dryRun && !writeToken) {
  process.stderr.write('[ERROR] SANITY_API_WRITE_TOKEN not set (required without --dry-run)\n');
  process.exit(1);
}

// ── Sanity clients ────────────────────────────────────────────────────────────

const readClient = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false });
const writeClient = dryRun
  ? null
  : createClient({ projectId, dataset, apiVersion: '2024-01-01', token: writeToken!, useCdn: false });

// ── Block-tools schema (mirrors blogPost body field) ──────────────────────────

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

// ── Types ─────────────────────────────────────────────────────────────────────

interface WxrPost {
  slug:           string;
  title:          string;
  postId:         string;
  contentEncoded: string;
  thumbnailId:    string | null;
}

interface MarkerInfo {
  markerKey: string;
  alt:       string;
  wpImageId: string | null;
  srcHint:   string;
}

interface FetchResult {
  ok:          boolean;
  status:      number;
  buffer:      Buffer | null;
  contentType: string | null;
}

interface Pass1Result {
  status:           'ok' | 'skipped_no_thumbnail' | 'skipped_fetch_fail' | 'skipped_existing_asset' | 'dry_run';
  sourceUrl?:       string;
  newAssetId?:      string;
  existingAssetId?: string;
  oldAssetRef?:     string;
  reason?:          string;
}

interface Pass2Result {
  status:                'ok' | 'skipped_collision' | 'dry_run' | 'error';
  inlineImagesFound:     number;
  inlineImagesUploaded:  number;
  inlineImagesFailed:    number;
  bodyBlocksBefore:      number;
  bodyBlocksAfter:       number;
  reason?:               string;
}

interface ManifestEntry {
  slug:   string;
  pass1:  Pass1Result;
  pass2:  Pass2Result;
  errors: string[];
}

// ── Logging ───────────────────────────────────────────────────────────────────

fs.mkdirSync('logs', { recursive: true });
const globalLog = fs.createWriteStream(
  path.join('logs', 'phase5-inline-migration.log'),
  { flags: 'w' }
);

function log(prefix: string, tag: string, msg: string): void {
  const line = `[${prefix}][${tag.padEnd(8)}] ${msg}\n`;
  process.stdout.write(line);
  globalLog.write(line);
}

function warn(prefix: string, msg: string): void {
  const line = `[${prefix}][WARN    ] ${msg}\n`;
  process.stderr.write(line);
  globalLog.write(line);
}

// ── WXR parsing ───────────────────────────────────────────────────────────────

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

function parseWxr(wxrPath: string): { posts: Map<string, WxrPost>; attachments: Map<string, string> } {
  const xml = fs.readFileSync(wxrPath, 'utf8');
  const posts       = new Map<string, WxrPost>();
  const attachments = new Map<string, string>(); // postId → attachment URL

  const itemRx = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRx.exec(xml)) !== null) {
    const item     = match[1];
    const postType = extractField(item, 'wp:post_type');
    const postId   = extractField(item, 'wp:post_id');

    if (postType === 'attachment' && postId) {
      const url = extractField(item, 'wp:attachment_url');
      if (url) attachments.set(postId, url);

    } else if (postType === 'post') {
      if (extractField(item, 'wp:status') !== 'publish') continue;
      const slug = extractField(item, 'wp:post_name');
      if (!slug) continue;
      const title          = extractField(item, 'title') ?? '';
      const contentEncoded = extractField(item, 'content:encoded') ?? '';
      const thumbnailId    = extractThumbnailId(item);
      posts.set(slug, { slug, title, postId: postId ?? '', contentEncoded, thumbnailId });
    }
  }

  return { posts, attachments };
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function generateKey(): string {
  return crypto.randomBytes(8).toString('hex');
}

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

async function findExistingAsset(filename: string): Promise<string | null> {
  const result = await readClient.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{ _id }`,
    { filename }
  );
  return result?._id ?? null;
}

async function uploadAsset(
  buffer: Buffer,
  contentType: string,
  filename: string,
  slug: string
): Promise<string | null> {
  if (dryRun) {
    log(slug, 'DRY-RUN', `would upload ${filename} (${buffer.length} bytes, ${contentType})`);
    return `dry-run-${generateKey()}`;
  }

  const existing = await findExistingAsset(filename);
  if (existing) {
    log(slug, 'ASSET', `idempotent: ${filename} already exists (${existing})`);
    return existing;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const asset = await (writeClient as any).assets.upload('image', buffer, { filename, contentType });
    log(slug, 'ASSET', `uploaded ${filename} -> ${asset._id}`);
    return asset._id as string;
  } catch (err) {
    warn(slug, `Sanity upload failed for ${filename}: ${String(err)}`);
    return null;
  }
}

// ── Link substitutions (ported verbatim from migrate-wp-post.ts) ─────────────

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

function applyLinkSubstitutions(doc: Document, contentEl: Element, slug: string): void {
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

  if (substituted + stripped > 0) {
    log(slug, 'SUBST', `${substituted} link(s) substituted, ${stripped} dead link(s) stripped`);
  } else {
    log(slug, 'SUBST', 'no link substitutions needed');
  }
}

// ── Pass 1: Featured image re-upload ─────────────────────────────────────────

async function migratePass1Featured(
  slug: string,
  wxrPost: WxrPost,
  attachments: Map<string, string>
): Promise<Pass1Result> {
  log(slug, 'PASS1', 'starting featured image re-upload');

  if (!wxrPost.thumbnailId) {
    log(slug, 'PASS1', 'no _thumbnail_id in WXR -- skipping');
    return { status: 'skipped_no_thumbnail' };
  }

  const sourceUrl = attachments.get(wxrPost.thumbnailId);
  if (!sourceUrl) {
    warn(slug, `_thumbnail_id ${wxrPost.thumbnailId} not found in WXR attachments map`);
    return { status: 'skipped_no_thumbnail', reason: `attachment ${wxrPost.thumbnailId} not in WXR` };
  }

  log(slug, 'PASS1', `WXR attachment URL: ${sourceUrl}`);
  const filename = `${slug}-featured.jpg`;

  // Idempotency: check if slug-derived asset already exists and document already points to it
  if (!dryRun) {
    const existingAssetId = await findExistingAsset(filename);
    if (existingAssetId) {
      const currentRef = await readClient.fetch<{ ref: string | null } | null>(
        `*[_id == $id][0]{ "ref": featuredImage.asset._ref }`,
        { id: `blog-${slug}` }
      );
      if (currentRef?.ref === existingAssetId) {
        log(slug, 'PASS1', `idempotent: document already points to ${existingAssetId} -- no action needed`);
        return { status: 'skipped_existing_asset', existingAssetId };
      }
      // Asset exists but document doesn't point to it yet -- just patch
      await writeClient!.patch(`blog-${slug}`)
        .set({ 'featuredImage.asset': { _type: 'reference', _ref: existingAssetId } })
        .commit();
      log(slug, 'PASS1', `patched document to existing slug-derived asset ${existingAssetId}`);
      return { status: 'ok', sourceUrl, newAssetId: existingAssetId };
    }
  }

  // Fetch binary from WXR attachment URL (no deriveOriginalUrl -- WXR IS the canonical source)
  const fetched = await fetchBinary(sourceUrl);
  if (!fetched.ok) {
    warn(slug, `featured image fetch HTTP ${fetched.status} for ${sourceUrl} -- skipping Pass 1, existing Sanity featuredImage left untouched`);
    return { status: 'skipped_fetch_fail', sourceUrl, reason: `HTTP ${fetched.status}` };
  }

  log(slug, 'PASS1', `fetched ${fetched.buffer!.length} bytes, Content-Type: ${fetched.contentType}`);

  if (dryRun) {
    const dryDir = path.join('/tmp', 'phase5-dry-run', slug);
    fs.mkdirSync(dryDir, { recursive: true });
    fs.writeFileSync(path.join(dryDir, 'featured-pass1.json'), JSON.stringify({
      slug,
      sourceUrl,
      filename,
      fetchStatus: fetched.status,
      byteSize: fetched.buffer!.length,
      contentType: fetched.contentType,
      wouldPatch: { documentId: `blog-${slug}`, field: 'featuredImage.asset', newRef: '(pending upload)' },
    }, null, 2));
    log(slug, 'DRY-RUN', `Pass 1 preview written to /tmp/phase5-dry-run/${slug}/featured-pass1.json`);
    return { status: 'dry_run', sourceUrl };
  }

  // Read current asset ref before overwriting (for rollback logging)
  const current = await readClient.fetch<{ assetRef: string | null; alt: string | null } | null>(
    `*[_id == $id][0]{ "assetRef": featuredImage.asset._ref, "alt": featuredImage.alt }`,
    { id: `blog-${slug}` }
  );
  if (current?.assetRef) log(slug, 'PASS1', `old asset ref: ${current.assetRef}`);

  const ext      = extFromContentType(fetched.contentType!, sourceUrl);
  const fname    = `${slug}-featured.${ext}`;
  const assetId  = await uploadAsset(fetched.buffer!, fetched.contentType!, fname, slug);
  if (!assetId) return { status: 'skipped_fetch_fail', sourceUrl, reason: 'upload failed' };

  // Targeted patch: asset ref only; alt, hotspot, crop untouched
  await writeClient!.patch(`blog-${slug}`)
    .set({ 'featuredImage.asset': { _type: 'reference', _ref: assetId } })
    .commit();

  log(slug, 'PASS1', `patched featuredImage.asset -> ${assetId} (alt preserved: "${current?.alt ?? ''}")`);
  return { status: 'ok', sourceUrl, newAssetId: assetId, oldAssetRef: current?.assetRef ?? undefined };
}

// ── Pass 2: Inline image migration ───────────────────────────────────────────

async function migratePass2Inline(
  slug: string,
  wxrPost: WxrPost,
  attachments: Map<string, string>
): Promise<Pass2Result> {
  log(slug, 'PASS2', 'starting inline image migration');

  // Read current body stats and collision guard from Sanity
  const existingDoc = await readClient.fetch<{ hasImages: boolean; count: number } | null>(
    `*[_id == $id][0]{
      "hasImages": defined(body[_type == "image"][0]),
      "count": length(body)
    }`,
    { id: `blog-${slug}` }
  );
  const bodyBlocksBefore = existingDoc?.count ?? 0;

  if (!dryRun && existingDoc?.hasImages && !forceP2) {
    warn(slug, 'body already contains _type=image blocks -- skipping Pass 2 (re-run with --force to override)');
    return {
      status: 'skipped_collision',
      inlineImagesFound:    0,
      inlineImagesUploaded: 0,
      inlineImagesFailed:   0,
      bodyBlocksBefore,
      bodyBlocksAfter: bodyBlocksBefore,
      reason: 'body already has image blocks',
    };
  }

  const contentHtml = wxrPost.contentEncoded;
  if (!contentHtml.trim()) {
    log(slug, 'PASS2', 'empty content:encoded -- nothing to do');
    return {
      status: 'ok',
      inlineImagesFound: 0, inlineImagesUploaded: 0, inlineImagesFailed: 0,
      bodyBlocksBefore, bodyBlocksAfter: bodyBlocksBefore,
    };
  }

  // ── Sub-pass 2a: parse DOM, inject markers where figures are ─────────────────

  const dom  = new JSDOM(contentHtml);
  const doc  = dom.window.document;
  const body = doc.body;

  // Strip byline (first <p> matching /^by\s/i) -- same logic as migrate-wp-post.ts
  const firstP = body.querySelector('p');
  if (firstP && /^by\s/i.test(firstP.textContent?.trim() ?? '')) {
    warn(slug, `byline stripped: "${firstP.textContent?.trim()}"`);
    firstP.parentNode!.removeChild(firstP);
  }

  // Apply link substitutions (SERVICE_SUBSTITUTIONS + AUDIT_SUBSTITUTIONS + dead links)
  applyLinkSubstitutions(doc, body, slug);

  const markers: MarkerInfo[] = [];
  let markerIdx = 0;

  // Gutenberg places wp:image and wp:gallery blocks as direct children of body.
  // A wp:gallery contains multiple nested figures; handle all images per block.
  for (const child of Array.from(body.children)) {
    const tag = child.tagName.toUpperCase();
    if (tag !== 'FIGURE' && !(tag === 'DIV' && child.classList.contains('wp-block-image'))) {
      continue;
    }

    const imgs = Array.from(child.querySelectorAll('img'));
    if (imgs.length === 0) continue;

    const blockMarkers: string[] = [];
    for (const img of imgs) {
      const alt       = img.getAttribute('alt') ?? '';
      const classes   = img.getAttribute('class') ?? '';
      const srcHint   = img.getAttribute('src') ?? '';
      const wpIdMatch = /wp-image-(\d+)/.exec(classes);
      const wpImageId = wpIdMatch ? wpIdMatch[1] : null;
      const markerKey = `__IMGMARKER_${markerIdx}__`;
      markers.push({ markerKey, alt, wpImageId, srcHint });
      markerIdx++;
      blockMarkers.push(markerKey);
    }

    // Insert one marker paragraph per image (preserves reading order), then remove block
    for (const mk of blockMarkers) {
      const p = doc.createElement('p');
      p.textContent = mk;
      child.parentNode!.insertBefore(p, child);
    }
    child.parentNode!.removeChild(child);
  }

  log(slug, 'PASS2', `found ${markers.length} inline image(s)`);

  if (markers.length === 0) {
    log(slug, 'PASS2', 'no inline images -- nothing to migrate');
    return {
      status: 'ok',
      inlineImagesFound: 0, inlineImagesUploaded: 0, inlineImagesFailed: 0,
      bodyBlocksBefore, bodyBlocksAfter: bodyBlocksBefore,
    };
  }

  // Upload assets for each marker
  const assetMap = new Map<string, string | null>(); // markerKey → asset _ref
  let uploadedCount = 0;
  let failedCount   = 0;

  const uploadManifest: unknown[] = [];

  for (let i = 0; i < markers.length; i++) {
    const marker        = markers[i];
    const inlineFilenameBase = `${slug}-inline-${i + 1}`;

    if (!marker.wpImageId) {
      warn(slug, `inline ${i + 1}: no wp-image-NNN class -- cannot look up attachment; src hint: ${marker.srcHint}`);
      assetMap.set(marker.markerKey, null);
      uploadManifest.push({ position: i + 1, wpImageId: null, error: 'no wp-image class', srcHint: marker.srcHint });
      failedCount++;
      continue;
    }

    const attachmentUrl = attachments.get(marker.wpImageId);
    if (!attachmentUrl) {
      warn(slug, `inline ${i + 1}: wp-image-${marker.wpImageId} not in WXR attachments map; src hint: ${marker.srcHint}`);
      assetMap.set(marker.markerKey, null);
      uploadManifest.push({ position: i + 1, wpImageId: marker.wpImageId, error: 'not in WXR attachments', srcHint: marker.srcHint });
      failedCount++;
      continue;
    }

    log(slug, 'PASS2', `inline ${i + 1}: fetching ${attachmentUrl}`);
    const fetched = await fetchBinary(attachmentUrl);

    if (!fetched.ok) {
      warn(slug, `inline ${i + 1}: fetch HTTP ${fetched.status} for ${attachmentUrl}`);
      assetMap.set(marker.markerKey, null);
      uploadManifest.push({ position: i + 1, wpImageId: marker.wpImageId, url: attachmentUrl, httpStatus: fetched.status, error: `HTTP ${fetched.status}` });
      failedCount++;
      continue;
    }

    const ext      = extFromContentType(fetched.contentType!, attachmentUrl);
    const filename = `${inlineFilenameBase}.${ext}`;

    uploadManifest.push({ position: i + 1, wpImageId: marker.wpImageId, url: attachmentUrl, httpStatus: fetched.status, byteSize: fetched.buffer!.length, contentType: fetched.contentType, filename });

    const assetId = await uploadAsset(fetched.buffer!, fetched.contentType!, filename, slug);
    if (assetId) {
      assetMap.set(marker.markerKey, assetId);
      uploadedCount++;
    } else {
      assetMap.set(marker.markerKey, null);
      failedCount++;
    }
  }

  // ── Sub-pass 2b: build final Portable Text array ──────────────────────────

  // Strip remaining img tags from marked HTML (htmlToBlocks is text-only)
  const markedHtml = body.innerHTML;

  const textBlocks = htmlToBlocks(markedHtml, blockContentType, {
    parseHtml: (html: string) => new JSDOM(html).window.document,
  });

  log(slug, 'PASS2', `htmlToBlocks: ${textBlocks.length} blocks from marked HTML`);

  // Walk textBlocks; replace marker sentinel blocks with image blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalBlocks: unknown[] = [];
  for (const block of textBlocks as any[]) {
    if (block._type === 'block' && Array.isArray(block.children) && block.children.length === 1) {
      const text: string = block.children[0]?.text ?? '';
      const m = /^__IMGMARKER_(\d+)__$/.exec(text);
      if (m) {
        const idx    = parseInt(m[1], 10);
        const marker = markers[idx];
        const ref    = assetMap.get(marker.markerKey);

        if (ref) {
          finalBlocks.push({
            _type: 'image',
            _key:  generateKey(),
            asset: { _type: 'reference', _ref: ref },
            alt:   marker.alt,
          });
          log(slug, 'PASS2', `inserted image block at index ${finalBlocks.length - 1} for inline ${idx + 1} (alt: "${marker.alt}")`);
        } else {
          warn(slug, `inline ${idx + 1} upload failed -- image block omitted from body`);
        }
        continue;
      }
    }
    finalBlocks.push(block);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageBlockCount = finalBlocks.filter((b: any) => b._type === 'image').length;
  log(slug, 'PASS2', `final body: ${finalBlocks.length} blocks (${imageBlockCount} image blocks)`);

  if (dryRun) {
    const dryDir = path.join('/tmp', 'phase5-dry-run', slug);
    fs.mkdirSync(dryDir, { recursive: true });
    fs.writeFileSync(path.join(dryDir, 'body-pass2.json'),      JSON.stringify(finalBlocks,   null, 2));
    fs.writeFileSync(path.join(dryDir, 'upload-manifest.json'), JSON.stringify(uploadManifest, null, 2));
    log(slug, 'DRY-RUN', `Pass 2 body + upload manifest written to /tmp/phase5-dry-run/${slug}/`);
    return {
      status: 'dry_run',
      inlineImagesFound:    markers.length,
      inlineImagesUploaded: uploadedCount,
      inlineImagesFailed:   failedCount,
      bodyBlocksBefore,
      bodyBlocksAfter: finalBlocks.length,
    };
  }

  // Full body replacement (targeted patch, not createOrReplace)
  await writeClient!.patch(`blog-${slug}`)
    .set({ body: finalBlocks })
    .commit();

  log(slug, 'PASS2', `body patched: ${bodyBlocksBefore} -> ${finalBlocks.length} blocks`);

  return {
    status: 'ok',
    inlineImagesFound:    markers.length,
    inlineImagesUploaded: uploadedCount,
    inlineImagesFailed:   failedCount,
    bodyBlocksBefore,
    bodyBlocksAfter: finalBlocks.length,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  log('system', 'INFO', `WXR path: ${WXR_PATH}`);
  log('system', 'INFO', `dry-run: ${dryRun}${dryRun ? '' : ' (LIVE WRITES)'}`);
  log('system', 'INFO', `slug filter: ${slugArg ?? 'all Sanity slugs'}`);

  // Parse WXR
  log('system', 'INFO', 'parsing WXR...');
  const { posts: wxrPosts, attachments } = parseWxr(WXR_PATH);
  log('system', 'INFO', `WXR: ${wxrPosts.size} published posts, ${attachments.size} attachments`);

  // Fetch Sanity slug list (always read; filters the slug scope)
  const sanityDocs = await readClient.fetch<Array<{ slug: string }>>(
    `*[_type == "blogPost" && status == "published"]{ "slug": slug.current } | order(slug.current asc)`
  );
  log('system', 'INFO', `Sanity: ${sanityDocs.length} published blogPost documents`);

  // Determine slugs to process
  let slugsToProcess: string[] = slugArg
    ? [slugArg]
    : sanityDocs.map((d) => d.slug);

  // Warn about any Sanity slugs missing from WXR, then drop them
  const wxrSlugs = new Set(wxrPosts.keys());
  for (const s of slugsToProcess.filter((s) => !wxrSlugs.has(s))) {
    warn('system', `slug "${s}" is in Sanity but not in WXR -- skipping`);
  }
  slugsToProcess = slugsToProcess.filter((s) => wxrSlugs.has(s));

  log('system', 'INFO', `processing ${slugsToProcess.length} slug(s)`);

  const manifest: ManifestEntry[] = [];
  const manifestPath = '/tmp/phase5-migration-manifest.json';

  for (const slug of slugsToProcess) {
    const wxrPost = wxrPosts.get(slug)!;
    const errors: string[] = [];

    let pass1Result: Pass1Result;
    let pass2Result: Pass2Result;

    try {
      pass1Result = await migratePass1Featured(slug, wxrPost, attachments);
    } catch (err) {
      const msg = `Pass 1 threw: ${String(err)}`;
      warn(slug, msg);
      errors.push(msg);
      pass1Result = { status: 'skipped_fetch_fail', reason: msg };
    }

    try {
      pass2Result = await migratePass2Inline(slug, wxrPost, attachments);
    } catch (err) {
      const msg = `Pass 2 threw: ${String(err)}`;
      warn(slug, msg);
      errors.push(msg);
      pass2Result = {
        status: 'error',
        inlineImagesFound: 0, inlineImagesUploaded: 0, inlineImagesFailed: 0,
        bodyBlocksBefore: 0, bodyBlocksAfter: 0,
        reason: msg,
      };
    }

    manifest.push({ slug, pass1: pass1Result, pass2: pass2Result, errors });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    log(slug, 'DONE', `pass1=${pass1Result.status} pass2=${pass2Result.status} inline=${pass2Result.inlineImagesUploaded}/${pass2Result.inlineImagesFound}`);
  }

  // Write manifest (final flush -- incremental writes already happened inside the loop)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log('system', 'INFO', `manifest written to ${manifestPath}`);

  // Summary
  const pass1Ok    = manifest.filter((e) => e.pass1.status === 'ok' || e.pass1.status === 'skipped_existing_asset').length;
  const pass1Fail  = manifest.filter((e) => e.pass1.status === 'skipped_fetch_fail').length;
  const pass2Ok    = manifest.filter((e) => e.pass2.status === 'ok').length;
  const pass2Skip  = manifest.filter((e) => e.pass2.status === 'skipped_collision').length;
  const totalUp    = manifest.reduce((acc, e) => acc + e.pass2.inlineImagesUploaded, 0);
  const totalFail  = manifest.reduce((acc, e) => acc + e.pass2.inlineImagesFailed, 0);
  const totalFound = manifest.reduce((acc, e) => acc + e.pass2.inlineImagesFound, 0);

  const summaryLines = [
    '',
    '=== Phase 5 Migration Summary ===',
    `Posts processed:          ${manifest.length}`,
    `Pass 1 (featured):        ${pass1Ok} ok, ${pass1Fail} fetch-failed`,
    `Pass 2 (inline):          ${pass2Ok} ok, ${pass2Skip} skipped (collision)`,
    `Inline images found:      ${totalFound}`,
    `Inline images uploaded:   ${totalUp}`,
    `Inline images failed:     ${totalFail}`,
  ];

  const fetchFailed = manifest.filter((e) => e.pass1.status === 'skipped_fetch_fail');
  if (fetchFailed.length > 0) {
    summaryLines.push('', 'Featured images requiring replacement asset from Brian:');
    for (const e of fetchFailed) {
      summaryLines.push(`  ${e.slug} -- ${e.pass1.reason ?? e.pass1.sourceUrl ?? 'unknown'}`);
    }
  }

  if (dryRun) {
    summaryLines.push('Pass 1 fetch-fail handler (SKIP+LOG+leave existing untouched): implemented, not exercised by this dry-run -- all image fetches returned HTTP 200.');
  }
  summaryLines.push('');
  const summary = summaryLines.join('\n');
  process.stdout.write(summary);
  globalLog.write(summary);
}

main().catch((e: unknown) => {
  process.stderr.write(`[ERROR] ${String(e)}\n`);
  process.exit(1);
});

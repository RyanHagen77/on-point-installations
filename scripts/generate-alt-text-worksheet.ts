/**
 * Alt-text worksheet generator for SEO consultant deliverable.
 *
 * Reads all blogPost and project documents from Sanity (read-only, no mutations).
 * Outputs tmp/alt-text-worksheet-v2.csv with one row per image (featured + body).
 *
 * Studio URL pattern follows Sanity structure tool's standard
 * {basePath}/structure/{schemaType};{_id} routing.
 * Verify against live Studio before delivering worksheet to consultant.
 *
 * Usage:
 *   npx tsx scripts/generate-alt-text-worksheet.ts
 *
 * Requires SANITY_API_READ_TOKEN in environment (source .env.local first or use --env-file).
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Hardcoded production domain. Staging substitution is manual.
const STUDIO_BASE = 'https://onpointinstallations.com/studio/structure';

function studioUrl(type: string, id: string): string {
  return `${STUDIO_BASE}/${type};${id}`;
}

// ---- CSV writer ----

function csvCell(value: string | number | boolean | null | undefined): string {
  const s = value == null ? '' : String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function csvRow(cells: (string | number | boolean | null | undefined)[]): string {
  return cells.map(csvCell).join(',');
}

// ---- Normalization ----

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

// ---- Heuristics ----

// H1: alt is null, undefined, or empty after trim
function h1(alt: string | null | undefined): boolean {
  return !alt || alt.trim() === '';
}

// H2: alt (normalized) appears more than once in the same document
// Pass the full allAltsInDoc list (including this alt itself); fires when count > 1.
function h2(alt: string, allAltsInDoc: string[]): boolean {
  const n = normalize(alt);
  return allAltsInDoc.filter((a) => normalize(a) === n).length > 1;
}

// H3: alt contains pipe separator (title-tag bleed pattern)
function h3(alt: string): boolean {
  return alt.includes(' | ');
}

// H4: alt (normalized) matches the parent document title (normalized)
function h4(alt: string, docTitle: string): boolean {
  return normalize(alt) === normalize(docTitle);
}

// H5: alt contains hyphen-space-hyphen pattern (mangled location suffix or hyphenation error)
function h5(alt: string): boolean {
  return / - /.test(alt);
}

// H6: alt starts with a known stock-photo or raw-filename prefix
function h6(alt: string): boolean {
  return /^(adobestock_|pexels-|img_)/i.test(alt.trim());
}

// H7: alt (normalized) appears in any other document in the full corpus (global duplicate)
function h7(alt: string, globalAltMap: Map<string, number>): boolean {
  return (globalAltMap.get(normalize(alt)) ?? 0) > 1;
}

// ---- Sanity types ----

interface SanityAsset {
  _id: string;
  originalFilename: string | null;
}

interface SanityBodyBlock {
  _type: string;
  _key: string;
  alt?: string | null;
  asset?: SanityAsset | null;
}

interface SanityDoc {
  _id: string;
  _type: string;
  slug: string;
  title: string;
  featuredImage?: {
    alt?: string | null;
    asset?: SanityAsset | null;
  } | null;
  body?: SanityBodyBlock[] | null;
}

// ---- Row type ----

interface WorksheetRow {
  document_type: string;
  document_slug: string;
  document_title: string;
  image_role: 'featured' | 'body';
  image_position: number | '';
  asset_id: string;
  asset_filename: string;
  sanity_studio_url: string;
  current_alt: string;
  needs_rewrite: 'TRUE' | 'FALSE';
  heuristics_fired: string;
  suggested_rewrite: '';
}

// ---- Main ----

async function main() {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    console.error('ERROR: SANITY_API_READ_TOKEN is not set. Aborting.');
    console.error('Source .env.local or run with: npx tsx --env-file=.env.local scripts/generate-alt-text-worksheet.ts');
    process.exit(1);
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) {
    console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is not set. Aborting.');
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  });

  console.log('Fetching blogPost documents...');
  const blogPosts: SanityDoc[] = await client.fetch(`
    *[_type == "blogPost"] | order(_createdAt asc) {
      _id,
      _type,
      "slug": slug.current,
      title,
      "featuredImage": featuredImage {
        alt,
        "asset": asset-> {
          _id,
          originalFilename
        }
      },
      "body": body[] {
        _type,
        _key,
        alt,
        "asset": asset-> {
          _id,
          originalFilename
        }
      }
    }
  `);
  console.log(`  Fetched ${blogPosts.length} blog posts.`);

  console.log('Fetching project documents...');
  const projects: SanityDoc[] = await client.fetch(`
    *[_type == "project"] | order(_createdAt asc) {
      _id,
      _type,
      "slug": slug.current,
      title,
      "featuredImage": featuredImage {
        alt,
        "asset": asset-> {
          _id,
          originalFilename
        }
      },
      "body": body[] {
        _type,
        _key,
        alt,
        "asset": asset-> {
          _id,
          originalFilename
        }
      }
    }
  `);
  console.log(`  Fetched ${projects.length} projects.`);

  // Sort each group alphabetically by slug (stable ordering for the worksheet)
  blogPosts.sort((a, b) => a.slug.localeCompare(b.slug));
  projects.sort((a, b) => a.slug.localeCompare(b.slug));

  // ---- Build flat row list (before heuristic flagging) ----

  interface RawRow {
    doc: SanityDoc;
    image_role: 'featured' | 'body';
    image_position: number | '';
    asset_id: string;
    asset_filename: string;
    current_alt: string | null;
    allAltsInDoc: string[];
  }

  const allDocs = [...blogPosts, ...projects];
  const rawRows: RawRow[] = [];

  for (const doc of allDocs) {
    // Collect all alt values in this document for H2
    const altsInDoc: (string | null | undefined)[] = [];
    if (doc.featuredImage?.alt != null) altsInDoc.push(doc.featuredImage.alt);
    if (doc.body) {
      for (const block of doc.body) {
        if (block._type === 'image' && block.alt != null) altsInDoc.push(block.alt);
      }
    }

    // Full alt list for this document (used by H2 -- all alts including current)
    const allAltsInDoc = altsInDoc.filter((a): a is string => a != null);

    // Featured image row
    if (doc.featuredImage) {
      const fi = doc.featuredImage;
      rawRows.push({
        doc,
        image_role: 'featured',
        image_position: '',
        asset_id: fi.asset?._id ?? '',
        asset_filename: fi.asset?.originalFilename ?? '',
        current_alt: fi.alt ?? null,
        allAltsInDoc,
      });
    }

    // Body image rows (Option A: filter and index in JS)
    if (doc.body) {
      doc.body.forEach((block, idx) => {
        if (block._type !== 'image') return;
        rawRows.push({
          doc,
          image_role: 'body',
          image_position: idx,
          asset_id: block.asset?._id ?? '',
          asset_filename: block.asset?.originalFilename ?? '',
          current_alt: block.alt ?? null,
          allAltsInDoc,
        });
      });
    }
  }

  // ---- Pre-pass: build globalAltMap ----
  // Keyed by normalized alt, value is occurrence count across entire corpus.
  const globalAltMap = new Map<string, number>();
  for (const row of rawRows) {
    if (row.current_alt == null || row.current_alt.trim() === '') continue;
    const key = normalize(row.current_alt);
    globalAltMap.set(key, (globalAltMap.get(key) ?? 0) + 1);
  }

  // ---- Heuristic flagging pass ----

  const heuristicCounts: Record<string, number> = {
    H1: 0, H2: 0, H3: 0, H4: 0, H5: 0, H6: 0, H7: 0,
  };

  const worksheetRows: WorksheetRow[] = rawRows.map((raw) => {
    const alt = raw.current_alt;
    const fired: string[] = [];

    if (h1(alt)) {
      fired.push('H1');
      heuristicCounts.H1++;
    } else {
      // H1 null-guard: skip H2-H7 for null/empty alts
      const safeAlt = alt as string;

      if (h2(safeAlt, raw.allAltsInDoc)) { fired.push('H2'); heuristicCounts.H2++; }
      if (h3(safeAlt)) { fired.push('H3'); heuristicCounts.H3++; }
      if (h4(safeAlt, raw.doc.title)) { fired.push('H4'); heuristicCounts.H4++; }
      if (h5(safeAlt)) { fired.push('H5'); heuristicCounts.H5++; }
      if (h6(safeAlt)) { fired.push('H6'); heuristicCounts.H6++; }
      if (h7(safeAlt, globalAltMap)) { fired.push('H7'); heuristicCounts.H7++; }
    }

    return {
      document_type: raw.doc._type,
      document_slug: raw.doc.slug,
      document_title: raw.doc.title,
      image_role: raw.image_role,
      image_position: raw.image_position,
      asset_id: raw.asset_id,
      asset_filename: raw.asset_filename,
      sanity_studio_url: studioUrl(raw.doc._type, raw.doc._id),
      current_alt: alt ?? '',
      needs_rewrite: fired.length > 0 ? 'TRUE' : 'FALSE',
      heuristics_fired: fired.join(','),
      suggested_rewrite: '',
    };
  });

  // ---- Write CSV ----

  const headers = [
    'document_type',
    'document_slug',
    'document_title',
    'image_role',
    'image_position',
    'asset_id',
    'asset_filename',
    'sanity_studio_url',
    'current_alt',
    'needs_rewrite',
    'heuristics_fired',
    'suggested_rewrite',
  ];

  const lines: string[] = [csvRow(headers)];
  for (const row of worksheetRows) {
    lines.push(csvRow([
      row.document_type,
      row.document_slug,
      row.document_title,
      row.image_role,
      row.image_position,
      row.asset_id,
      row.asset_filename,
      row.sanity_studio_url,
      row.current_alt,
      row.needs_rewrite,
      row.heuristics_fired,
      row.suggested_rewrite,
    ]));
  }

  const outputPath = path.join('tmp', 'alt-text-worksheet-v2.csv');
  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');

  // ---- Stdout summary ----

  const featuredCount = worksheetRows.filter((r) => r.image_role === 'featured').length;
  const bodyCount = worksheetRows.filter((r) => r.image_role === 'body').length;
  const needsRewriteCount = worksheetRows.filter((r) => r.needs_rewrite === 'TRUE').length;
  const totalRows = worksheetRows.length;

  console.log('');
  console.log('=== Alt-text worksheet generated ===');
  console.log(`Output: ${outputPath}`);
  console.log('');
  console.log(`Total image rows:   ${totalRows}  (excludes header row)`);
  console.log(`  Featured images:  ${featuredCount}`);
  console.log(`  Body images:      ${bodyCount}`);
  console.log(`  needs_rewrite=TRUE: ${needsRewriteCount}`);
  console.log('');
  console.log('Heuristic firing counts:');
  for (const [key, count] of Object.entries(heuristicCounts)) {
    console.log(`  ${key}: ${count}`);
  }
  console.log('');
  console.log('=== Heuristic legend (paste into consultant email) ===');
  console.log('H1 - Alt is missing or empty. Must be written from scratch.');
  console.log('H2 - Alt is identical to another image in the same document. Likely a copy-paste artifact; each image needs a distinct description.');
  console.log('H3 - Alt contains " | " separator. Looks like a page title was used as alt text. Rewrite to describe the image, not the page.');
  console.log('H4 - Alt matches the document title exactly. Same issue as H3; rewrite to describe the image.');
  console.log('H5 - Alt contains " - " hyphen pattern. May indicate a mangled location suffix (e.g. "Downers - Grove") or a city-state append that reads awkwardly. Review and rewrite if needed.');
  console.log('H6 - Alt starts with a stock-photo or phone-photo filename prefix (adobestock_, pexels-, img_). Replace with a description of what is in the image.');
  console.log('H7 - Alt appears in more than one document across the full corpus. May be acceptable for generic images, but review each instance.');
  console.log('');
  console.log('Note: H5 is conservative. A row where only H5 fires may be acceptable -- the heuristics_fired column lets you deprioritize H5-only rows.');
}

main().catch((err) => {
  console.error('ERROR:', err);
  process.exit(1);
});

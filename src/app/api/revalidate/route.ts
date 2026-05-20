import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';

// Sanity signs webhook payloads with this header.
// Format: t=<unix_timestamp>,v1=<base64_hmac_sha256>
// Signed string: "<timestamp>.<rawBody>"
const SIGNATURE_HEADER = 'sanity-webhook-signature';

function isValidSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;

  const parts: Record<string, string> = {};
  header.split(',').forEach((segment) => {
    const eq = segment.indexOf('=');
    if (eq !== -1) {
      parts[segment.slice(0, eq).trim()] = segment.slice(eq + 1).trim();
    }
  });

  const { t: timestamp, v1: signature } = parts;
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('base64');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'base64'),
      Buffer.from(expected, 'base64')
    );
  } catch {
    return false;
  }
}

interface SanityWebhookBody {
  _type?: string;
  _id?: string;
  slug?: { current?: string };
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error('revalidate: SANITY_REVALIDATE_SECRET is not set');
    return NextResponse.json({ error: 'Revalidation secret not configured' }, { status: 500 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'Could not read request body' }, { status: 400 });
  }

  if (!isValidSignature(rawBody, request.headers.get(SIGNATURE_HEADER), secret)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }

  let body: SanityWebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body._type !== 'blogPost') {
    return NextResponse.json({ revalidated: false, reason: 'not a blogPost' });
  }

  try {
    revalidateTag('blog', 'default');
    revalidatePath('/blog/');
    revalidatePath('/blog/[slug]', 'page');
    const slug = body.slug?.current;
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      console.log(`[revalidate] blog post: ${slug}`);
    }
  } catch (err) {
    console.error('revalidate: cache invalidation failed', err);
    return NextResponse.json({ error: 'Cache invalidation failed' }, { status: 500 });
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

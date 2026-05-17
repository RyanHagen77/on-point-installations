import { NextRequest, NextResponse } from 'next/server';

// TODO Phase 5: Wire Resend send here after verifying info@onpointinstall.com vs.
// info@onpointinstallations.com with Brian. Do not import or initialize Resend until
// the correct inbox is confirmed to avoid silently dropped leads.

// Required fields on the contact form submission
const REQUIRED_FIELDS = [
  'name',
  'company',
  'phone',
  'email',
  'projectType',
  'city',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate all required fields are present and non-empty
    const missing = REQUIRED_FIELDS.filter(
      (field) => !body[field] || String(body[field]).trim() === ''
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields', missing },
        { status: 400 }
      );
    }

    // projectDetails is optional -- no validation needed

    // Phase 5: send email via Resend here

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

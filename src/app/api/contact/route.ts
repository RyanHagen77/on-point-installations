import { NextRequest, NextResponse } from 'next/server';

// Contact form handler : wire to email or CRM in Phase 2 once Brian confirms preference
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, phone, email, projectDetails } = data;
    if (!name || !phone || !email || !projectDetails) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO Phase 2: Send email notification via Resend or Nodemailer
    // TODO Phase 2: Optionally push to CRM (HubSpot, etc.)

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

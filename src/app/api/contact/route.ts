import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Honeypot: bots fill hidden fields, real users never see this field
    if (body.website && String(body.website).trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

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

    const { name, company, phone, email, projectType, city, projectDetails } = body as Record<string, string>;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false, // STARTTLS on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const text = [
      'New contact form submission',
      '',
      `Name:           ${name}`,
      `Company:        ${company}`,
      `Phone:          ${phone}`,
      `Email:          ${email}`,
      `Project Type:   ${projectType}`,
      `City/Location:  ${city}`,
      'Project Details:',
      `  ${projectDetails?.trim() || '(none provided)'}`,
    ].join('\n');

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_FORM_TO_EMAIL,
      replyTo: email,
      subject: `New contact form submission: ${name} (${company})`,
      text,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] sendMail error:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

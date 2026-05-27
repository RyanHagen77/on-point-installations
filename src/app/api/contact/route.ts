import { NextRequest, NextResponse } from 'next/server';
import { ConfidentialClientApplication } from '@azure/msal-node';

// Module-scoped singleton: persists across requests so MSAL can cache tokens internally.
// Lazy-initialized on first request rather than at module eval to avoid ConfidentialClientApplication
// throwing invalid_client_credential when Azure env vars are absent at build time.
let msalClient: ConfidentialClientApplication | null = null;

function getMsalClient(): ConfidentialClientApplication {
  if (!msalClient) {
    msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: process.env.AZURE_CLIENT_ID ?? '',
        clientSecret: process.env.AZURE_CLIENT_SECRET ?? '',
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID ?? ''}`,
      },
    });
  }
  return msalClient;
}

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

    // Acquire OAuth access token via client credentials flow
    const tokenResponse = await getMsalClient().acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });

    if (!tokenResponse?.accessToken) {
      throw new Error('Failed to acquire access token from Microsoft identity platform');
    }

    // Build plaintext email body (same shape as before)
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

    const sender = process.env.GRAPH_SEND_AS_USER ?? '';
    const recipient = process.env.CONTACT_FORM_TO_EMAIL ?? '';

    // POST to Microsoft Graph sendMail endpoint
    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: `New contact form submission: ${name} (${company})`,
            body: {
              contentType: 'Text',
              content: text,
            },
            toRecipients: [{ emailAddress: { address: recipient } }],
            replyTo: [{ emailAddress: { address: email } }],
          },
          saveToSentItems: false,
        }),
      }
    );

    if (!graphResponse.ok) {
      const errBody = await graphResponse.text();
      throw new Error(`Graph API sendMail failed: ${graphResponse.status} ${errBody}`);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] send error:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

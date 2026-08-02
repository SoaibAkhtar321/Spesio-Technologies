import path from 'path';
import fs from 'fs/promises';
import { Resend } from 'resend';

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  service?: string;
  budget?: string;
  message?: string;
}

export interface EnquiryRecord extends EnquiryInput {
  submittedAt: string;
  ip: string;
  userAgent: string;
}

export interface EnquiryResult {
  status: number;
  body: { success: boolean; message: string };
}

// On Vercel, only /tmp is writable, and it isn't guaranteed to persist between
// invocations — it's a best-effort safety net there, not durable storage.
// Locally (and on traditional Node hosts), we use a real project-relative folder.
function getFallbackPath(): { dir: string; file: string } {
  const dir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
  return { dir, file: path.join(dir, 'enquiries-fallback.json') };
}

// Lazily created so a missing RESEND_API_KEY doesn't crash server startup.
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEnquiryEmailHtml(enquiry: EnquiryRecord): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;font-weight:bold;color:#7a1f2b;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;color:#1a1a1a;">${value || '-'}</td>
    </tr>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;">
    <h2 style="color:#7a1f2b;border-bottom:2px solid #7a1f2b;padding-bottom:8px;">New Project Enquiry — Spesio Technologies</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${row('Name', escapeHtml(enquiry.name))}
      ${row('Phone', escapeHtml(enquiry.phone))}
      ${row('Email', escapeHtml(enquiry.email))}
      ${row('Service / Package', escapeHtml(enquiry.service))}
      ${row('Budget', escapeHtml(enquiry.budget))}
      ${row('Requirements', escapeHtml(enquiry.message).replace(/\n/g, '<br/>'))}
      ${row('Date &amp; Time', escapeHtml(enquiry.submittedAt))}
      ${row('IP', escapeHtml(enquiry.ip))}
      ${row('User Agent', escapeHtml(enquiry.userAgent))}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Sent automatically from the Spesio Technologies website contact form.</p>
  </div>`;
}

async function saveFallbackEnquiry(enquiry: Record<string, unknown>) {
  const { dir, file } = getFallbackPath();
  try {
    await fs.mkdir(dir, { recursive: true });
    let existing: unknown[] = [];
    try {
      const raw = await fs.readFile(file, 'utf-8');
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(enquiry);
    await fs.writeFile(file, JSON.stringify(existing, null, 2), 'utf-8');
    console.log('[contact] Enquiry saved to fallback storage:', file);
  } catch (fallbackErr) {
    console.error('[contact] CRITICAL: fallback storage also failed:', fallbackErr);
    throw fallbackErr;
  }
}

/**
 * Pure, transport-agnostic enquiry handler. Both the Express dev server
 * (server.ts) and the Vercel serverless function (api/contact.ts) call this
 * and just translate the result into their own req/res shape.
 */
export async function processEnquiry(
  input: Partial<EnquiryInput>,
  meta: { ip: string; userAgent: string }
): Promise<EnquiryResult> {
  const { name, email, phone, service, budget, message } = input;

  if (!name || !email || !phone) {
    console.warn('[contact] Rejected enquiry: missing required fields', { name, email, phone });
    return {
      status: 400,
      body: { success: false, message: 'Name, email, and phone are required to submit an enquiry.' },
    };
  }

  const enquiry: EnquiryRecord = {
    name,
    email,
    phone,
    service: service || '',
    budget: budget || '',
    message: message || '',
    submittedAt: new Date().toISOString(),
    ip: meta.ip,
    userAgent: meta.userAgent,
  };

  console.log('[contact] Received enquiry:', enquiry);

  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'spesiotechnologies@gmail.com';
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Spesio Technologies <onboarding@resend.dev>';

  const resend = getResendClient();
  let emailSent = false;

  if (resend) {
    try {
      console.log('[contact] Sending email via Resend...');
      const { error } = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `New Project Enquiry from ${name} — Spesio Technologies`,
        html: buildEnquiryEmailHtml(enquiry),
      });

      if (error) {
        console.error('[contact] Resend API returned an error:', error);
      } else {
        emailSent = true;
        console.log('[contact] Email sent successfully to', CONTACT_TO_EMAIL);
      }
    } catch (emailErr) {
      console.error('[contact] Email failed to send:', emailErr);
    }
  } else {
    console.warn('[contact] RESEND_API_KEY not configured — skipping email send.');
  }

  if (!emailSent) {
    try {
      await saveFallbackEnquiry({ ...enquiry, emailDeliveryFailed: true });
    } catch {
      // Both email AND fallback storage failed — the only case we tell the client something went wrong.
      return {
        status: 500,
        body: {
          success: false,
          message: 'We could not process your enquiry right now. Please contact us directly on WhatsApp or call +91 8957833269.',
        },
      };
    }
  }

  return {
    status: 200,
    body: {
      success: true,
      message: `Inquiry successfully submitted! Soaib Akhtar from Spesio Technologies will respond to ${email} or ${phone} within 24 hours.`,
    },
  };
}

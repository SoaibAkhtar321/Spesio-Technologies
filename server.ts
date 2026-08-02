import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const FALLBACK_DIR = path.join(process.cwd(), 'data');
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'enquiries-fallback.json');

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

function buildEnquiryEmailHtml(enquiry: {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
}): string {
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
  try {
    await fs.mkdir(FALLBACK_DIR, { recursive: true });
    let existing: unknown[] = [];
    try {
      const raw = await fs.readFile(FALLBACK_FILE, 'utf-8');
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(enquiry);
    await fs.writeFile(FALLBACK_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    console.log('[contact] Enquiry saved to fallback storage:', FALLBACK_FILE);
  } catch (fallbackErr) {
    console.error('[contact] CRITICAL: fallback storage also failed:', fallbackErr);
    throw fallbackErr;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for project enquiries
  app.post('/api/contact', async (req, res) => {
    const { name, email, phone, service, message, budget } = req.body || {};

    // Basic validation
    if (!name || !email || !phone) {
      console.warn('[contact] Rejected enquiry: missing required fields', { name, email, phone });
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required to submit an enquiry.',
      });
    }

    const submittedAt = new Date().toISOString();
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const enquiry = { name, email, phone, service, budget, message, submittedAt, ip, userAgent };

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
        // Both email AND fallback storage failed — this is the only case we tell the client something went wrong.
        return res.status(500).json({
          success: false,
          message: `We could not process your enquiry right now. Please contact us directly on WhatsApp or call +91 8957833269.`,
        });
      }
    }

    return res.json({
      success: true,
      message: `Inquiry successfully submitted! Soaib Akhtar from Spesio Technologies will respond to ${email} or ${phone} within 24 hours.`,
    });
  });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Spesio Technologies Server running on http://localhost:${PORT}`);
  });
}

startServer();
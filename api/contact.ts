import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processEnquiry } from '../lib/enquiry';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded) || req.socket?.remoteAddress || 'unknown';
  const userAgent = (req.headers['user-agent'] as string) || 'unknown';

  const result = await processEnquiry(req.body || {}, { ip, userAgent });

  return res.status(result.status).json(result.body);
}
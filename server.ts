import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { processEnquiry } from './lib/enquiry';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for project enquiries (local/dev + any non-Vercel Node host).
  // On Vercel, api/contact.ts is what actually serves this route in production;
  // both call the same processEnquiry() logic in lib/enquiry.ts.
  app.post('/api/contact', async (req, res) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const result = await processEnquiry(req.body || {}, { ip, userAgent });
    return res.status(result.status).json(result.body);
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
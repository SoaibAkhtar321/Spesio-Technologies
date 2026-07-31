import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for quick contact inquiries
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, service, message, budget } = req.body;
    console.log('Received inquiry:', { name, email, phone, service, message, budget });
    res.json({
      success: true,
      message: `Inquiry successfully submitted! Soaib Akhtar from Spesio Technologies will respond to ${email} or ${phone} within 24 hours.`
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
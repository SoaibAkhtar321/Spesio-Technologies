import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini AI Assistant
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback response if API key is not configured yet
        return res.json({
          reply: `Thank you for reaching out to Spesio Technologies! Soaib Akhtar and our engineering team offer custom Software, Web, Mobile App Development, and AI Integrations. For direct inquiries, call us at +91 8957833269 or email spesiotechnologies@gmail.com.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are Spesio AI, the official intelligent assistant for Spesio Technologies (Founded by Soaib Akhtar, Founder & Software Developer).
      Company Tagline: "We build. You grow." / "Building Digital Solutions That Drive Success."
      Contact: Phone +91 8957833269, Email spesiotechnologies@gmail.com, Location: Gorakhpur, Uttar Pradesh, India - 273001.
      Core Services:
      1. Custom Software Development (Scalable backends, ERP/CRM, microservices)
      2. Web Development (High-performance React/Next.js/Tailwind web apps)
      3. App Development (iOS & Android mobile apps using React Native / Flutter)
      4. AI Integrations (Gemini API, Chatbots, Automation, Smart LLM workflows)

      Be professional, concise, enthusiastic, helpful, and encourage the client to request a project estimate or contact Soaib Akhtar directly.`;

      const contents = history ? [...history, { role: 'user', parts: [{ text: message }] }] : [{ role: 'user', parts: [{ text: message }] }];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({ error: 'Failed to process AI request', details: error.message });
    }
  });

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

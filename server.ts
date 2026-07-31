import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const SYSTEM_PROMPT = `You are Spesio AI, the official assistant for Spesio Technologies, a software development company founded by Soaib Akhtar (Founder & Software Developer).

Tagline: "We build. You grow." / "Building Digital Solutions That Drive Success."
Location: Gorakhpur, Uttar Pradesh, India - 273001.
Contact: Phone +91 8957833269, Email spesiotechnologies@gmail.com, Instagram @spesiotechnologies.

Core services:
1. Custom Software Development — scalable backends, ERP/CRM tools, microservices, automated workflow engines.
2. Web Development — React/Next.js/Tailwind web apps, SEO and performance optimized.
3. App Development — cross-platform iOS & Android apps (React Native / Flutter), offline sync, push notifications.
4. AI Integrations — LLM chatbots, automation, document processing, predictive insights.

Business philosophy: reliable, modern, scalable engineering with end-to-end support from concept to post-launch.

Rules:
- If asked for pricing or a quote, do NOT invent numbers. Direct the person to the interactive Project Estimator on the site, or offer to connect them with Soaib Akhtar for a custom quote.
- If asked about something unrelated to Spesio Technologies or software/web/app/AI development, politely redirect the conversation back to how Spesio can help.
- Be professional, concise, and enthusiastic. Use short paragraphs or occasional markdown (bold, bullet points) where it improves clarity — avoid walls of text.
- Encourage next steps: using the estimator, filling the contact form, or reaching out directly via WhatsApp/phone/email.
- Never fabricate client names, testimonials, or statistics that aren't provided to you.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const anthropic = process.env.ANTHROPIC_API_KEY
    ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    : null;

  // API Route for AI Assistant (Claude)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body as {
        message: string;
        history?: { role: 'user' | 'assistant'; content: string }[];
      };

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required.' });
      }

      if (!anthropic) {
        // Fallback response if API key is not configured yet
        return res.json({
          reply: `Thanks for reaching out to Spesio Technologies! We offer Custom Software, Web Development, App Development, and AI Integrations. For direct inquiries, call **+91 8957833269** or email **spesiotechnologies@gmail.com**.`,
        });
      }

      const conversation = [
        ...(history ?? []).slice(-10),
        { role: 'user' as const, content: message },
      ];

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: conversation,
      });

      const reply = response.content
        .map((block) => (block.type === 'text' ? block.text : ''))
        .join('\n')
        .trim();

      res.json({ reply: reply || "Sorry, I couldn't process that — could you rephrase?" });
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

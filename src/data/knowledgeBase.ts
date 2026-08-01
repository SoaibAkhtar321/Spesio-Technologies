/**
 * Local, rule-based knowledge base for the Spesio AI Assistant.
 * No external API calls — everything is matched and answered on-device.
 */

export interface KnowledgeEntry {
  id: string;
  /** Keywords/phrases that should trigger this entry. Matching is done via score-based overlap, not exact phrases. */
  triggers: string[];
  /** Plain-text answer. Kept conversational and short. */
  answer: string;
  /** Optional follow-up suggestions shown as quick-reply chips after this answer. */
  followUps?: string[];
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'services',
    triggers: ['service', 'services', 'what do you do', 'what do you offer', 'what can you build', 'offerings', 'capabilities'],
    answer:
      'Spesio Technologies offers four core services: Custom Software Development (SaaS, ERP/CRM, backend systems), Web Development (React/Next.js, SEO-optimized), Android App Development (native Kotlin apps), and AI Integrations (chatbots, automation, LLM workflows). Want details on a specific one?',
    followUps: ['How much does a website cost?', 'Can you build AI products?', 'How do I start?'],
  },
  {
    id: 'technologies',
    triggers: ['technolog', 'tech stack', 'what tools', 'what languages', 'what framework', 'stack do you use', 'programming'],
    answer:
      'Our stack varies by project: Node.js, Python and TypeScript on the backend with PostgreSQL and Docker; React, Next.js, Vite and Tailwind CSS for web; Kotlin and Jetpack Compose for native Android apps; and Gemini/OpenAI with LangChain for AI features. We pick the right stack for your product, not the other way around.',
    followUps: ['What services do you provide?', 'What is CampusBite?'],
  },
  {
    id: 'why-choose',
    triggers: ['why choose', 'why spesio', 'why should i', 'what makes you different', 'why pick you', 'advantage'],
    answer:
      'Spesio is founder-led, so you work directly with the engineer building your product — no account-manager layers. We ship production-ready, type-safe code, keep architecture scalable from day one, and stay available for support after launch. Client satisfaction is our only real metric.',
    followUps: ['Who is Soaib Akhtar?', 'Do you provide maintenance?'],
  },
  {
    id: 'founder',
    triggers: ['soaib', 'founder', 'who made this', 'who built this', 'who owns', 'about the founder', 'who is behind', 'developer'],
    answer:
      'Soaib Akhtar is the Founder & Software Developer of Spesio Technologies, based in Kushinagar, Uttar Pradesh. He is a full-stack engineer who has built products including CampusBite (a campus dining and queue platform) and Eifa Couture (a luxury e-commerce storefront), and personally leads every Spesio project.',
    followUps: ['What is CampusBite?', 'What is Eifa Couture?', 'How do I start?'],
  },
  {
    id: 'timeline',
    triggers: ['how long', 'timeline', 'turnaround', 'duration', 'how much time', 'delivery time'],
    answer:
      'Timelines depend on your package tier: Bronze packages typically take 1-2 weeks, Silver 2-3 weeks, Gold 3-5 weeks, and Diamond 5-8 weeks. See the "View Packages" section above for the exact tier breakdown.',
    followUps: ['How much does a website cost?', 'Can I schedule a consultation?'],
  },
  {
    id: 'website-cost',
    triggers: ['website cost', 'web cost', 'cost of website', 'price of website', 'how much for a website', 'pricing web'],
    answer:
      'We use fixed website packages, not arbitrary quotes: Bronze ₹3,500, Silver ₹6,500, Gold ₹9,000, and Diamond ₹17,500 — each includes 1 year FREE maintenance. Check "View Packages" above for full feature breakdowns, or use "Find My Package" for a guided recommendation.',
    followUps: ['How much does an Android app cost?', 'How do payments work?'],
  },
  {
    id: 'app-cost',
    triggers: ['app cost', 'cost of app', 'price of app', 'how much for an app', 'mobile app price', 'pricing app', 'android app cost'],
    answer:
      'We use fixed Android app packages, not arbitrary quotes: Bronze ₹7,500, Silver ₹12,500, Gold ₹18,500, and Diamond ₹30,000 — each includes 1 year FREE maintenance. We also offer discounted Website + App bundles. Check "View Packages" above, or use "Find My Package" for a guided recommendation.',
    followUps: ['How much does a website cost?', 'How do payments work?'],
  },
  {
    id: 'ai-products',
    triggers: ['ai product', 'build ai', 'ai integration', 'chatbot', 'machine learning', 'llm', 'artificial intelligence'],
    answer:
      'Yes — AI Integrations is one of our four core services. We build smart customer-support chatbots, automated document/data processing pipelines, custom LLM prompting workflows, and predictive analytics dashboards, typically using Gemini, OpenAI, LangChain, and vector databases.',
    followUps: ['What services do you provide?', 'How do I start?'],
  },
  {
    id: 'maintenance',
    triggers: ['maintenance', 'support after launch', 'ongoing support', 'bug fixes', 'updates after'],
    answer:
      'Yes, we provide post-launch maintenance and support — bug fixes, performance monitoring, and feature updates. Support terms are scoped per project, so mention it when you request your estimate or during your consultation.',
    followUps: ['How do I start?', 'Can I schedule a consultation?'],
  },
  {
    id: 'get-started',
    triggers: ['how do i start', 'how to start', 'get started', 'begin a project', 'how does it work', 'process', 'next steps'],
    answer:
      'Getting started is simple: 1) Pick a package via "View Packages" or "Find My Package," or tell us about your project via the Contact form. 2) We confirm scope and send a proposal. 3) We agree on timeline and payment terms. 4) Development begins with regular progress updates until launch. You can also just message us on WhatsApp to kick things off.',
    followUps: ['How do payments work?', 'Can I schedule a consultation?'],
  },
  {
    id: 'payments',
    triggers: ['payment', 'payments work', 'how do i pay', 'advance', 'installment', 'invoice'],
    answer:
      'Payments are typically split into milestones — an upfront advance to begin work, followed by installments tied to project phases (design/backend/frontend/deployment), with the final balance due at delivery. Exact terms are agreed upon before development starts.',
    followUps: ['How do I start?', 'How much does a website cost?'],
  },
  {
    id: 'industries',
    triggers: ['industries', 'industry', 'domains you work', 'sectors', 'niches'],
    answer:
      'We work across industries — e-commerce and retail, education and campus platforms, hospitality and food service, and general SaaS/business tools. If your industry is not listed, tell us your use case and we will let you know if it is a good fit.',
    followUps: ['What is CampusBite?', 'What is Eifa Couture?'],
  },
  {
    id: 'consultation',
    triggers: ['schedule a consultation', 'book a call', 'schedule a call', 'meeting', 'consultation'],
    answer:
      'Absolutely — the fastest way to schedule a consultation is to message Soaib Akhtar directly on WhatsApp or fill out the Contact form below with your preferred time. We usually reply within 2 hours during business hours.',
    followUps: ['What is your contact number?', 'How do I start?'],
  },
  {
    id: 'campusbite',
    triggers: ['campusbite', 'campus bite', 'campus dining', 'queue management'],
    answer:
      'CampusBite is a smart campus dining and queue management platform built by Soaib Akhtar, designed to reduce wait times and streamline food ordering for students using Kotlin, Firebase, and Jetpack Compose.',
    followUps: ['What is Eifa Couture?', 'Who is Soaib Akhtar?'],
  },
  {
    id: 'eifa',
    triggers: ['eifa', 'eifa couture', 'luxury e-commerce', 'e-commerce store'],
    answer:
      'Eifa Couture is a luxury e-commerce storefront currently in development, built with Next.js, Supabase, and Tailwind CSS — engineered for a premium shopping experience with fast performance and clean checkout flows.',
    followUps: ['What is CampusBite?', 'Who is Soaib Akhtar?'],
  },
  {
    id: 'contact',
    triggers: ['contact number', 'phone number', 'call you', 'reach you', 'email address', 'contact info', 'contact details'],
    answer:
      'You can reach Spesio Technologies directly: Phone/WhatsApp +91 89578 33269, Email spesiotechnologies@gmail.com. We are based in Kushinagar, Uttar Pradesh, and typically reply within 2 hours during business hours (Mon–Sat, 9 AM–8 PM IST).',
    followUps: ['Can I schedule a consultation?', 'How do I start?'],
  },
  {
    id: 'greeting',
    triggers: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'yo'],
    answer:
      'Hey there! I am Spesio AI. Ask me about our services, pricing, timelines, tech stack, or the team — I am happy to help.',
    followUps: ['What services do you provide?', 'How much does a website cost?'],
  },
  {
    id: 'packages',
    triggers: ['package', 'packages', 'bundle', 'bundles', 'pricing plan', 'plans', 'what packages'],
    answer:
      'We offer four fixed tiers — Bronze, Silver, Gold, and Diamond — for both Website and Android App packages, plus discounted Website + App bundles (Starter, Business, Professional, Enterprise). Every package includes 1 year of FREE maintenance. See "View Packages" above for full details, or use "Find My Package" for a guided recommendation.',
    followUps: ['How much does a website cost?', 'How much does an Android app cost?'],
  },
  {
    id: 'thanks',
    triggers: ['thank you', 'thanks', 'appreciate it', 'thx'],
    answer: "You're welcome! Let me know if there's anything else you'd like to know about Spesio Technologies.",
    followUps: ['How do I start?', 'Can I schedule a consultation?'],
  },
];

export const FALLBACK_ANSWER =
  "I don't have a confident answer for that one yet. For anything specific, the fastest way to get a real answer is to message us directly on WhatsApp — Soaib Akhtar usually replies within 2 hours.";

export const DEFAULT_QUICK_PROMPTS = [
  'What services do you provide?',
  'How much does a website cost?',
  'Who is Soaib Akhtar?',
  'How do I start?',
];

/**
 * Scores a user message against every knowledge entry using simple keyword
 * overlap, and returns the best match if it clears a minimum confidence bar.
 */
export function matchKnowledgeBase(userInput: string): KnowledgeEntry | null {
  const normalized = userInput.toLowerCase().trim();
  if (!normalized) return null;

  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const trigger of entry.triggers) {
      if (normalized.includes(trigger)) {
        // Longer, more specific triggers score higher than short generic ones.
        score += trigger.length >= 6 ? 3 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestScore > 0 ? bestEntry : null;
}
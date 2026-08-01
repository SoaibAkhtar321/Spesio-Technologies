// Rule-based Knowledge Base for Spesio AI Assistant
// This replaces the previous LLM-based (Gemini) fallback with a simple,
// deterministic keyword-matching engine. No external API or LLM is required.

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  answer: string;
}

export const FALLBACK_ANSWER =
  "I'm not sure about that. Please contact us on WhatsApp at +91 8957833269 or email spesiotechnologies@gmail.com.";

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'services',
    keywords: ['service', 'services', 'what do you do', 'what do you offer', 'offerings', 'what can you build'],
    answer:
      "Spesio Technologies offers 4 core services: Custom Software Development, Web Development, Android App Development (native Kotlin apps), and AI Integrations (chatbots, automation, LLM workflows). Ask me about any of these for more detail!",
  },
  {
    id: 'founder',
    keywords: ['founder', 'soaib', 'akhtar', 'owner', 'who created', 'who made', 'who runs', 'ceo'],
    answer:
      "Spesio Technologies was founded by Soaib Akhtar, Founder & Software Developer. He personally leads development on every project, based in Gorakhpur, Uttar Pradesh, India.",
  },
  {
    id: 'technologies',
    keywords: ['technology', 'technologies', 'tech stack', 'stack', 'programming language', 'frameworks', 'tools you use'],
    answer:
      "We work with a modern tech stack: React.js, Next.js, Node.js, Python, TypeScript, Tailwind CSS, PostgreSQL, Kotlin, Jetpack Compose, Firebase, and AI tools like the Gemini API and LangChain.",
  },
  {
    id: 'website',
    keywords: ['website', 'web development', 'web app', 'web site', 'landing page'],
    answer:
      "Our Web Development service delivers fast, SEO-optimized, fully responsive websites and web apps built with React, Next.js, and Tailwind CSS — including sub-second load speeds and mobile-first design.",
  },
  {
    id: 'mobile-app',
    keywords: ['mobile app', 'app development', 'android', 'android app', 'play store'],
    answer:
      "We build native Android business apps using Kotlin and Jetpack Compose, with smooth 60fps UI, offline sync, push notifications, and full Play Store publishing support. We only build for Android.",
  },
  {
    id: 'ai-integration',
    keywords: ['ai integration', 'ai integrations', 'artificial intelligence', 'chatbot', 'automation', 'machine learning', 'llm'],
    answer:
      "Our AI Integrations service adds smart chatbots, document/data automation, custom LLM prompting, and predictive analytics to your product using tools like the Gemini API, OpenAI, and LangChain.",
  },
  {
    id: 'timeline',
    keywords: ['timeline', 'how long', 'duration', 'delivery time', 'turnaround', 'how much time'],
    answer:
      "Delivery timelines depend on your package tier: Bronze 1-2 weeks, Silver 2-3 weeks, Gold 3-5 weeks, and Diamond 5-8 weeks. See the Packages section above for the exact tier breakdown.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach you', 'get in touch', 'phone number', 'email address', 'talk to someone'],
    answer:
      "You can reach Spesio Technologies directly on WhatsApp/Phone at +91 8957833269 or via email at spesiotechnologies@gmail.com. We reply within 24 hours.",
  },
  {
    id: 'process',
    keywords: ['process', 'how do you work', 'how it works', 'workflow', 'work with you', 'steps'],
    answer:
      "Our process has 3 stages: 1) Discovery & Architecture - requirement analysis and schema design, 2) Agile Development & Testing - iterative, type-safe builds with validation, 3) Cloud Deployment & Support - CI/CD, SSL setup, and ongoing monitoring.",
  },
  {
    id: 'location',
    keywords: ['location', 'where are you', 'based in', 'address', 'city', 'country'],
    answer:
      "Spesio Technologies is based in Gorakhpur, Uttar Pradesh, India - 273001. We work with clients across India and internationally, remotely.",
  },
  {
    id: 'hours',
    keywords: ['business hours', 'working hours', 'open', 'availability', 'when can i contact', '24/7', '24x7'],
    answer:
      "We offer 24/7 support availability, and typically respond to WhatsApp and email inquiries within 24 hours.",
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'budget', 'how much', 'charge', 'quote', 'package', 'packages'],
    answer:
      "We use fixed, transparent packages (Bronze, Silver, Gold, Diamond) for both Website and Android App projects, plus discounted bundles, all in Indian Rupees (₹). See \"View Packages\" above for the full price list, or use \"Find My Package\" for a guided recommendation.",
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    answer:
      "Hello! I'm Spesio AI. I can tell you about our Services, Founder, Technologies, Pricing, Timelines, Process, or how to Contact us. What would you like to know?",
  },
];

/**
 * Simple, deterministic rule-based responder.
 * Scans the user's message for known keywords and returns the first matching answer.
 * If nothing matches, returns the standard fallback response.
 */
export function getAssistantReply(message: string): string {
  const normalized = message.toLowerCase().trim();

  if (!normalized) {
    return FALLBACK_ANSWER;
  }

  for (const entry of KNOWLEDGE_BASE) {
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        return entry.answer;
      }
    }
  }

  return FALLBACK_ANSWER;
}

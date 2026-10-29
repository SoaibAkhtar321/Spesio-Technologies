// Single source of truth for all site copy and facts.
// Used by the UI, by src/seo.ts, by the SSR prerender and by the generated llms.txt.
// Keep this file free of DOM/React imports.

export const SITE = {
  name: 'Spesio Technologies',
  shortName: 'Spesio',
  url: 'https://spesio-technologies.vercel.app',
  locale: 'en_IN',
  lang: 'en-IN',
  themeColor: '#0B0B0C',
  email: 'spesiotechnologies@gmail.com',
  phone: '+91 89578 33269',
  phoneE164: '+918957833269',
  phoneHref: 'tel:+918957833269',
  whatsappHref:
    'https://wa.me/918957833269?text=Hi%20Spesio%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  city: 'Greater Noida',
  region: 'Uttar Pradesh',
  country: 'IN',
  location: 'Greater Noida, India',
  timezone: 'Asia/Kolkata',
  foundingYear: '2023',
  hours: 'Mon–Sat, 09:00–20:00 IST',
  socials: {
    instagram: 'https://instagram.com/spesio_technologies',
    youtube: 'https://youtube.com/@spesiotechnologies',
  },
  founder: {
    name: 'Soaib Akhtar',
    role: 'Founder & Software Engineer',
    quote:
      'I started Spesio so that the person you brief is the person who builds. No hand-offs, no account managers, no lost context. Just a product that works, and code you own.',
  },
} as const;

/* ---------------------------------------------------------------- Hero */

export const HERO = {
  eyebrow: 'Digital product studio — est. 2023',
  lines: ['We turn ambitious', 'ideas into', 'digital products.'],
  headline: 'We turn ambitious ideas into digital products.',
  sub: 'A founder-led studio designing and engineering websites, web applications, Android apps and AI integrations for businesses that want to be taken seriously online.',
  primaryCta: 'Start a project',
  secondaryCta: 'See selected work',
};

export const MANIFESTO =
  'Most studios sell you a website. We build the system behind your business: the storefront your customers see, the dashboard your team runs on, and the automation that quietly saves hours every week. Engineered properly, shipped quickly, and yours to own.';

export const TICKER = [
  'Web applications',
  'Business websites',
  'Native Android',
  'AI assistants',
  'E-commerce',
  'Dashboards',
  'Workflow automation',
  'Admin panels',
];

/* ------------------------------------------------------------ Services */

export interface Service {
  slug: string;
  number: string;
  title: string;
  seoTitle: string;
  line: string;
  description: string;
  capabilities: string[];
  stack: string[];
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'web-development',
    number: '01',
    title: 'Web Experiences',
    seoTitle: 'Website & Web Application Development',
    line: 'Fast, search-friendly websites and web apps that turn visitors into enquiries.',
    description:
      'High-performance business websites, e-commerce storefronts and full web applications built with React and Next.js. Every build is mobile-first, accessible, optimised for Core Web Vitals and set up for search from day one.',
    capabilities: ['Business websites', 'Web applications', 'E-commerce & payments', 'SEO & performance'],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    deliverables: [
      'Responsive, mobile-first design',
      'Technical SEO, sitemap and structured data',
      'Payment gateway integration (Razorpay)',
      'Admin panel for products, services and enquiries',
    ],
  },
  {
    slug: 'custom-software',
    number: '02',
    title: 'Digital Products',
    seoTitle: 'Custom Software, ERP & Dashboard Development',
    line: 'Custom software shaped around how your business actually runs.',
    description:
      'Internal tools, dashboards, ERP and CRM systems, SaaS platforms and APIs. We map your workflow first, then design the data model and build software that removes manual work instead of adding it.',
    capabilities: ['Custom software', 'ERP & CRM', 'Dashboards', 'APIs & integrations'],
    stack: ['Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker', 'REST / GraphQL'],
    deliverables: [
      'Workflow and data-model design',
      'Role-based admin dashboards',
      'Secure, documented APIs',
      'Deployment, backups and monitoring',
    ],
  },
  {
    slug: 'android-app-development',
    number: '03',
    title: 'Mobile Applications',
    seoTitle: 'Native Android App Development',
    line: 'Native Android apps that feel fast in the hand and stay reliable at scale.',
    description:
      'Native Android apps written in Kotlin with Jetpack Compose, backed by Firebase or your own cloud. Login, ordering, payments, push notifications, offline sync and Play Store publishing, from first release to ongoing updates.',
    capabilities: ['Native Android', 'Backend & cloud', 'Push notifications', 'Play Store publishing'],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions', 'SQLite'],
    deliverables: [
      'Native Kotlin + Compose codebase',
      'Server-side business logic',
      'Push notifications and analytics',
      'Play Store listing and release',
    ],
  },
  {
    slug: 'ai-integration',
    number: '04',
    title: 'AI & Automation',
    seoTitle: 'AI Integration, Chatbots & Workflow Automation',
    line: 'Practical AI placed exactly where it saves time or wins customers.',
    description:
      'Customer-support assistants, document and data processing, guided flows and workflow automation built on modern LLM APIs and integrated into the apps you already use. No hype, just measurable hours saved.',
    capabilities: ['AI chatbots & assistants', 'Document processing', 'Workflow automation', 'LLM API integration'],
    stack: ['OpenAI', 'Gemini', 'Claude', 'LangChain', 'Python', 'Vector databases'],
    deliverables: [
      'Assistant trained on your business content',
      'Automated document and data pipelines',
      'Integration with existing tools',
      'Guardrails, logging and cost controls',
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/* ---------------------------------------------------------------- Work */

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  overview: string;
  challenge: string;
  capabilities: string[];
  stack: string[];
  liveUrl?: string;
  /** Colours for the generated cover art: [accent, deep]. */
  hue: [string, string];
  /** Motif for the generated cover art. */
  motif: 'map' | 'queue' | 'thread';
}

export const PROJECTS: Project[] = [
  {
    slug: 'property-planet',
    number: '01',
    name: 'Property Planet',
    category: 'Real Estate · Web Platform',
    summary: 'A marketplace for plots and land, with map browsing and an admin-controlled listing flow.',
    overview:
      'A property marketplace where sellers and agents list plots and land, and buyers browse on a map and send enquiries. Every listing is reviewed by an admin before it goes public, and seller contact details are never handed out automatically.',
    challenge:
      'Land listings attract spam and duplicates, and sellers worry about their numbers being scraped. The platform needed to stay open for self-service while keeping quality and privacy under admin control.',
    capabilities: [
      'Map-based property browsing',
      'Admin approval before a listing goes public',
      'Self-service seller registration',
      'One dashboard for buying and selling activity',
      'Lead handling with admin oversight',
    ],
    stack: ['Next.js', 'Supabase', 'Google Maps'],
    liveUrl: 'https://propertyplanet.vercel.app/',
    hue: ['#FF6B1A', '#24120A'],
    motif: 'map',
  },
  {
    slug: 'campusbite',
    number: '02',
    name: 'CampusBite',
    category: 'Food Tech · Android App',
    summary: 'A native Android app for ordering food on campus and managing pickup queues.',
    overview:
      'A native Android app that lets students order food on campus and helps outlets manage queues and time slots. Order creation runs on the server, so prices and slot capacity cannot be altered from the client.',
    challenge:
      'Lunch-hour rushes overwhelmed campus outlets. The app had to spread demand across pickup slots and stay tamper-proof with many student devices ordering at once.',
    capabilities: [
      'Server-side order creation with transactional Cloud Functions',
      'Time-slot capacity management',
      'Push notifications for order updates',
      'Admin and staff dashboards',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions'],
    hue: ['#D8FF5A', '#141611'],
    motif: 'queue',
  },
  {
    slug: 'eifa-couture',
    number: '03',
    name: 'Eifa Couture',
    category: 'E-commerce · Luxury Fashion',
    summary: 'A luxury Chikankari storefront with online payments and a full admin back office.',
    overview:
      'An e-commerce storefront for a luxury Chikankari fashion label, with online payments, order history and an admin back office for inventory, refunds and finance reporting.',
    challenge:
      'A handcrafted label needed a store that felt as considered as the garments, while giving a small team real tools for stock, refunds and finance without a separate system.',
    capabilities: [
      'Razorpay payment integration',
      'Order confirmation and account order history',
      'Refund management',
      'Finance reporting with CSV export',
      'Inventory, category and banner management',
      'Sign in with Google',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Razorpay'],
    liveUrl: 'https://eifa-couture-ds3d-theta.vercel.app/',
    hue: ['#E9C9A4', '#1E1410'],
    motif: 'thread',
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/* ------------------------------------------------------------- Studio */

export const PRINCIPLES = [
  { title: 'Direct line to the builder', line: 'You talk to the engineer writing your code. Decisions take minutes, not meetings.' },
  { title: 'You own everything', line: 'Code, data, domain and accounts sit in your name. No lock-in, ever.' },
  { title: 'Built to last', line: 'Typed code, real databases and clean architecture the next developer will thank you for.' },
  { title: 'Support after launch', line: 'Six months of free maintenance on every package. We stay on after launch day.' },
];

export const PROCESS = [
  {
    number: '01',
    title: 'Discover',
    duration: 'Week 1',
    line: 'We agree on what to build, who it is for and what “done” looks like. You get a written scope and a clear quote.',
  },
  {
    number: '02',
    title: 'Design & build',
    duration: 'Weeks 2–6',
    line: 'Iterative development with working builds you can click through every week. Your feedback goes straight into the next build.',
  },
  {
    number: '03',
    title: 'Launch & grow',
    duration: 'Ongoing',
    line: 'We ship to production, set up analytics and search, then stay on for fixes, updates and the next feature.',
  },
];

export const STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Kotlin', 'Jetpack Compose', 'Firebase',
  'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel', 'Razorpay', 'OpenAI', 'Gemini', 'LangChain',
];

/* ----------------------------------------------------------- Packages */

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}

export const PACKAGES: Record<'website' | 'android', Tier[]> = {
  website: [
    { id: 'bronze', name: 'Bronze', tagline: 'A sharp first impression', features: ['Up to 8 pages', 'Contact & Google Maps', 'Mobile responsive', 'Basic SEO setup'] },
    { id: 'silver', name: 'Silver', tagline: 'Built to convert', features: ['Up to 12 pages', 'Product / service listing', 'WhatsApp, Instagram & email', 'Enhanced animations'] },
    { id: 'gold', name: 'Gold', tagline: 'Your business command centre', features: ['Admin panel', 'Manage products & services', 'Enquiry management', 'Advanced dashboard'], highlight: true },
    { id: 'diamond', name: 'Diamond', tagline: 'Full commerce platform', features: ['Full e-commerce', 'Payment gateway', 'Orders & inventory', 'ERP & analytics'] },
  ],
  android: [
    { id: 'bronze', name: 'Bronze', tagline: 'Your business, in their pocket', features: ['8–10 screens', 'Services, about & contact', 'WhatsApp & social links', 'Push notifications'] },
    { id: 'silver', name: 'Silver', tagline: 'Real accounts, real orders', features: ['Up to 15 screens', 'Login & Firebase', 'Catalogue & search', 'WhatsApp ordering'] },
    { id: 'gold', name: 'Gold', tagline: 'Operations HQ on mobile', features: ['Web admin panel', 'Orders & users', 'Notification panel', 'Analytics dashboard'], highlight: true },
    { id: 'diamond', name: 'Diamond', tagline: 'The complete mobile business', features: ['Payment gateway', 'Inventory management', 'ERP integration', 'Reports & analytics'] },
  ],
};

/* ---------------------------------------------------------------- FAQ */

export const FAQS = [
  {
    question: 'What does Spesio Technologies build?',
    answer:
      'Spesio Technologies is a founder-led digital product studio in Greater Noida, India. We design and build business websites, web applications, e-commerce stores, native Android apps, custom software such as dashboards and ERP systems, and AI integrations including chatbots and workflow automation.',
  },
  {
    question: 'How long does a website or app take?',
    answer:
      'Most business websites launch in two to four weeks. Web applications and Android apps usually take four to ten weeks depending on scope. You receive a written scope and timeline after the discovery call, and working builds to review every week.',
  },
  {
    question: 'Do you provide free maintenance?',
    answer:
      'Yes. Every website and app package includes six months of free maintenance after launch, covering bug fixes and minor updates.',
  },
  {
    question: 'Do I own the code and data?',
    answer:
      'Yes. The source code, database, domain and hosting accounts are set up in your name. There is no lock-in, and you can take the project to any developer at any time.',
  },
  {
    question: 'Can you add AI to my existing website or app?',
    answer:
      'Yes. We integrate large language models from providers such as OpenAI, Google Gemini and Anthropic Claude into existing products, for example a support assistant trained on your content, automated document processing, or smart search.',
  },
  {
    question: 'Do you work with clients outside Greater Noida?',
    answer:
      'Yes. We work with businesses across India and internationally. Everything runs remotely over calls, WhatsApp and shared builds, and we are happy to meet in person around Delhi NCR.',
  },
  {
    question: 'Do you integrate payment gateways?',
    answer:
      'Yes. E-commerce and Diamond-tier builds include payment gateway integration such as Razorpay, along with order, refund and inventory management.',
  },
];

/* ------------------------------------------------------------- Contact */

export const CONTACT = {
  headline: "Have an idea? Let's build it.",
  services: ['Website', 'Web application', 'Android app', 'AI integration', 'Custom software', 'Not sure yet'],
  budgets: ['Under ₹25k', '₹25k – ₹75k', '₹75k – ₹2L', '₹2L +', 'Not sure yet'],
};

export const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Studio', href: '/#studio' },
  { label: 'FAQ', href: '/#faq' },
];

export const HOME_META = {
  title: 'Spesio Technologies — Web, App & AI Development Studio in Greater Noida',
  description:
    'Founder-led studio building fast websites, web apps, native Android apps and AI integrations for growing businesses. Based in Greater Noida, serving India and worldwide.',
};

/** All indexable routes. Used by the prerender script and the sitemap. */
export const routes = (): string[] => [
  '/',
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...PROJECTS.map((p) => `/work/${p.slug}`),
];

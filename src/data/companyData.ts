import { ServiceItem, PortfolioItem, PricingPackage, BundlePackage, MaintenancePlan } from '../types';

export const COMPANY_INFO = {
  name: 'Spesio Technologies',
  shortName: 'SPESIO',
  tagline: 'We build. You grow.',
  subTagline: 'Building Digital Solutions That Drive Success.',
  founder: {
    name: 'Soaib Akhtar',
    title: 'Founder & Software Developer',
    location: 'Kushinagar, Uttar Pradesh, India - 274401',
    phone: '+91 8957833269',
    formattedPhone: '+91 89578 33269',
    email: 'spesiotechnologies@gmail.com',
    website: 'www.spesiotech.com',
    bio: 'Visionary software engineer and entrepreneur dedicated to engineering high-performance digital products, scalable web apps, mobile solutions, and custom AI integrations that transform businesses.',
  },
  socials: {
    whatsapp: 'https://wa.me/918957833269?text=Hello%20Spesio%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    instagram: 'https://instagram.com/spesiotechnologies',
  },
  pillars: [
    { title: 'Fast Delivery', desc: 'Cutting-edge tech stack tailored for high speed and durability.' },
    { title: 'Scalable Architecture', desc: 'Architectures engineered to handle growing traffic and business operations.' },
    { title: 'Full Ownership', desc: 'You own the code, the data, and the platform — no vendor lock-in.' },
    { title: 'Post-Launch Support', desc: 'End-to-end guidance from initial concept to post-launch optimization.' }
  ],
  stats: [
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Core Services', value: '4 Key Domains' },
    { label: 'Project Delivery', value: 'Fast & Reliable' },
    { label: 'Support Availability', value: '24 / 7' }
  ]
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'campusbite',
    name: 'CampusBite',
    category: 'Campus Dining Platform',
    status: 'Production',
    description: 'Smart campus dining and queue management platform that reduces wait times and streamlines food ordering for students.',
    stack: ['Kotlin', 'Firebase', 'Jetpack Compose'],
  },
  {
    id: 'eifa-couture',
    name: 'Eifa Couture',
    category: 'Luxury E-Commerce',
    status: 'Production',
    description: 'Luxury e-commerce storefront engineered for a premium shopping experience with fast performance and clean checkout flows.',
    stack: ['Next.js', 'Supabase', 'Tailwind'],
    liveUrl: 'https://eifa-couture-ds3d-theta.vercel.app/',
  },
];

export const PROCESS_STEPS = [
  {
    title: 'Discovery & Architecture',
    desc: 'In-depth requirement analysis and scalable database schema mapping before a single line of code is written.',
  },
  {
    title: 'Agile Development & Testing',
    desc: 'Rapid iterations with clean, type-safe code, code review, and security validations at every stage.',
  },
  {
    title: 'Cloud Deployment & Support',
    desc: 'CI/CD pipelines, SSL configuration, and ongoing performance monitoring post-launch.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'software',
    title: 'Custom Software Development',
    shortDesc: 'Powerful, Scalable Software Solutions',
    fullDesc: 'Tailor-made backend architectures, SaaS platforms, internal ERP/CRM tools, and custom business logic engines designed to optimize operations and automate complex workflows.',
    iconName: 'code',
    technologies: ['Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker', 'REST/GraphQL APIs'],
    features: [
      'Automated Workflow Engines',
      'Database Design & Optimization',
      'Secure Microservices Architecture',
      'Custom Admin Portals & Dashboards'
    ]
  },
  {
    id: 'web',
    title: 'Web Development',
    shortDesc: 'Modern, Responsive Web Experiences',
    fullDesc: 'High-speed, SEO-optimized web applications with modern interactive interfaces. Built with React, Next.js, and Tailwind CSS for flawless performance across all device types.',
    iconName: 'globe',
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Vite', 'PWA'],
    features: [
      'Sub-Second Page Load Speeds',
      'Fully Responsive Mobile-First Design',
      'SEO & Performance Optimization',
      'Interactive Web Tools & Portals'
    ]
  },
  {
    id: 'app',
    title: 'Android App Development',
    shortDesc: 'Beautiful, Fast & User-Friendly Native Android Apps',
    fullDesc: 'Native Android business apps built with Kotlin that deliver fluid 60fps user experiences, offline synchronization, push notifications, and intuitive UI design.',
    iconName: 'smartphone',
    technologies: ['Kotlin', 'Jetpack Compose', 'Android', 'Firebase', 'SQLite'],
    features: [
      'Native Android Applications',
      'Smooth Touch & Gesture UI',
      'Real-Time Offline Syncing',
      'Play Store Publishing'
    ]
  },
  {
    id: 'ai',
    title: 'AI Integrations',
    shortDesc: 'Intelligent Automation for Smarter Business',
    fullDesc: 'Leverage Large Language Models, Generative AI, natural language chatbots, automated content processors, and machine learning pipelines into your existing apps.',
    iconName: 'brain',
    technologies: ['Gemini API', 'OpenAI', 'LangChain', 'Python AI Libraries', 'Vector DBs'],
    features: [
      'Smart Customer Support AI Chatbots',
      'Automated Document & Data Processing',
      'Custom LLM Fine-Tuning & Prompting',
      'Predictive Analytics & Smart Insights'
    ]
  }
];

/**
 * Fixed, professional package pricing (all figures in INR).
 * These are the ONLY prices used anywhere on the site — the AI Assistant,
 * pricing cards, and the "Find My Package" wizard all read from this list
 * rather than calculating arbitrary numbers.
 */
export const WEBSITE_PACKAGES: PricingPackage[] = [
  {
    id: 'bronze',
    emoji: '🥉',
    name: 'Bronze Website',
    price: 3500,
    features: [
      'Business landing page',
      'Up to 8 pages',
      'Contact section',
      'Google Maps integration',
      'Mobile responsive design',
      'Basic SEO setup',
      '1 year FREE maintenance',
    ],
    cta: 'Get Bronze Website',
  },
  {
    id: 'silver',
    emoji: '🥈',
    name: 'Silver Website',
    price: 6500,
    features: [
      'Everything in Bronze, PLUS',
      'Product / service listing',
      'WhatsApp Buy buttons',
      'Instagram feed integration',
      'Facebook integration',
      'Email integration',
      'Up to 12 pages',
      'Enhanced animations',
      '1 year FREE maintenance',
    ],
    cta: 'Get Silver Website',
  },
  {
    id: 'gold',
    emoji: '🥇',
    name: 'Gold Website',
    price: 9000,
    features: [
      'Everything in Silver, PLUS',
      'Admin panel access',
      'Manage products',
      'Manage services',
      'Manage enquiries',
      'Advanced dashboard',
      '1 year FREE maintenance',
    ],
    cta: 'Get Gold Website',
    highlight: true,
  },
  {
    id: 'diamond',
    emoji: '💎',
    name: 'Diamond Website',
    price: 17500,
    features: [
      'Everything in Gold, PLUS',
      'Full eCommerce platform',
      'ERP integration',
      'Payment gateway',
      'Analytics dashboard',
      'Order management',
      'Inventory management',
      'Restaurant / school / clothing / grocery ready',
      '1 year FREE maintenance',
    ],
    cta: 'Get Diamond Website',
  },
];

export const ANDROID_PACKAGES: PricingPackage[] = [
  {
    id: 'bronze',
    emoji: '🥉',
    name: 'Bronze Android App',
    price: 7500,
    features: [
      'Business information screens',
      'Contact screen',
      'About screen',
      'Services screen',
      'WhatsApp integration',
      'Social media links',
      'Push notifications',
      '8–10 screens',
      '1 year FREE maintenance',
    ],
    cta: 'Get Bronze Android App',
  },
  {
    id: 'silver',
    emoji: '🥈',
    name: 'Silver Android App',
    price: 12500,
    features: [
      'Everything in Bronze, PLUS',
      'Login & authentication',
      'Firebase integration',
      'Category browsing',
      'Product listing',
      'Search functionality',
      'WhatsApp ordering',
      'Social integration',
      'Up to 15 screens',
      '1 year FREE maintenance',
    ],
    cta: 'Get Silver Android App',
  },
  {
    id: 'gold',
    emoji: '🥇',
    name: 'Gold Android App',
    price: 18500,
    features: [
      'Everything in Silver, PLUS',
      'Web admin panel',
      'Product management',
      'Notification panel',
      'Analytics',
      'User management',
      'Order management',
      'Dashboard',
      '1 year FREE maintenance',
    ],
    cta: 'Get Gold Android App',
    highlight: true,
  },
  {
    id: 'diamond',
    emoji: '💎',
    name: 'Diamond Android App',
    price: 30000,
    features: [
      'Everything in Gold, PLUS',
      'Payment gateway',
      'ERP integration',
      'Restaurant / grocery / school ready',
      'Inventory management',
      'Analytics & reports',
      'Complete business solution',
      '1 year FREE maintenance',
    ],
    cta: 'Get Diamond Android App',
  },
];

export const BUNDLES: BundlePackage[] = [
  { id: 'starter', name: 'Starter Bundle', websiteTier: 'bronze', androidTier: 'bronze', price: 10000 },
  { id: 'business', name: 'Business Bundle', websiteTier: 'silver', androidTier: 'silver', price: 17500 },
  { id: 'professional', name: 'Professional Bundle', websiteTier: 'gold', androidTier: 'gold', price: 25000 },
  { id: 'enterprise', name: 'Enterprise Bundle', websiteTier: 'diamond', androidTier: 'diamond', price: 45000, highlight: true },
];

export const WEBSITE_MAINTENANCE: MaintenancePlan[] = [
  { tier: 'bronze', priceLabel: '₹700/year' },
  { tier: 'silver', priceLabel: '₹1,200/year' },
  { tier: 'gold', priceLabel: '₹1,700/year' },
  { tier: 'diamond', priceLabel: '₹2,200/year' },
];

export const ANDROID_MAINTENANCE_LABEL = '₹2,500 – ₹4,000/year';
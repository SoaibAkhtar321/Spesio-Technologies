import { ServiceItem, PortfolioItem } from '../types';

export const COMPANY_INFO = {
  name: 'Spesio Technologies',
  shortName: 'SPESIO',
  tagline: 'We build. You grow.',
  subTagline: 'Building Digital Solutions That Drive Success.',
  founder: {
    name: 'Soaib Akhtar',
    title: 'Founder & Software Developer',
    location: 'Gorakhpur, Uttar Pradesh, India - 273001',
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
    { title: 'Modern Solutions', desc: 'Cutting-edge tech stack tailored for high speed and durability.' },
    { title: 'Reliable Support', desc: 'End-to-end guidance from initial concept to post-launch optimization.' },
    { title: 'Scalable Growth', desc: 'Architectures engineered to handle growing traffic and business operations.' }
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
    status: 'In Development',
    description: 'Luxury e-commerce storefront engineered for a premium shopping experience with fast performance and clean checkout flows.',
    stack: ['Next.js', 'Supabase', 'Tailwind'],
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
    title: 'App Development',
    shortDesc: 'Beautiful, Fast & User-Friendly Mobile Apps',
    fullDesc: 'Native and cross-platform iOS & Android apps that deliver fluid 60fps user experiences, offline synchronization, push notifications, and intuitive UI design.',
    iconName: 'smartphone',
    technologies: ['React Native', 'Flutter', 'iOS / Android', 'Firebase', 'SQLite'],
    features: [
      'Cross-Platform iOS & Android Apps',
      'Smooth Touch & Gesture UI',
      'Real-Time Offline Syncing',
      'App Store & Play Store Publishing'
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
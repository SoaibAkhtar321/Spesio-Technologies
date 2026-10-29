// Single source of truth for all site copy and facts.
// Used by the UI, by src/seo.ts, by the SSR prerender and by the generated llms.txt.
// Keep this file free of DOM/React imports. Style rule: no em dashes in copy.

export const SITE = {
  name: 'Spesio Technologies',
  shortName: 'Spesio',
  // Change this one line when the custom domain is connected in Vercel.
  url: 'https://spesio-technologies.vercel.app',
  locale: 'en_IN',
  lang: 'en-IN',
  themeColor: '#F4EFE6',
  email: 'spesiotechnologies@gmail.com',
  phone: '+91 89578 33269',
  phoneE164: '+918957833269',
  phoneHref: 'tel:+918957833269',
  whatsappHref:
    'https://wa.me/918957833269?text=Hi%20Spesio%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  city: 'Greater Noida',
  region: 'Uttar Pradesh',
  regionCode: 'IN-UP',
  country: 'IN',
  location: 'Greater Noida, Uttar Pradesh, India',
  timezone: 'Asia/Kolkata',
  foundingYear: '2023',
  hours: 'Monday to Saturday, 9 am to 8 pm IST',
  socials: {
    instagram: 'https://instagram.com/spesio_technologies',
    youtube: 'https://youtube.com/@spesiotechnologies',
  },
  founder: {
    name: 'Soaib Akhtar',
    role: 'Founder and Software Engineer',
  },
  legalUpdated: '29 October 2026',
} as const;

/* ---------------------------------------------------------------- Hero */

export const HERO = {
  eyebrow: 'Web design and development studio in Greater Noida',
  headline: 'We design and build websites, web apps and Android apps for growing businesses.',
  sub: 'From a fast business website to a full online store, booking system or mobile app. Designed, coded and launched by one accountable team, with six months of free maintenance.',
  primaryCta: 'Start a project',
  secondaryCta: 'See our work',
};

export const BUILD_LIST = ['Business websites', 'Online stores', 'Web applications', 'Android apps', 'Admin dashboards', 'AI chatbots'];

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
    slug: 'website-development',
    number: '01',
    title: 'Website development',
    seoTitle: 'Website Development',
    line: 'Business websites and online stores that load fast, rank on Google and bring in enquiries.',
    description:
      'We design and build business websites, landing pages and e-commerce stores with React and Next.js. Every site is mobile first, accessible, tuned for Core Web Vitals and set up for Google from day one, with a sitemap, structured data and clean page titles.',
    capabilities: ['Business websites', 'E-commerce stores', 'Landing pages', 'SEO setup'],
    stack: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Razorpay', 'Vercel'],
    deliverables: [
      'Custom design for desktop and mobile',
      'Technical SEO: sitemap, structured data, page titles',
      'Payment gateway integration with Razorpay',
      'Admin panel to manage products, services and enquiries',
    ],
  },
  {
    slug: 'web-app-development',
    number: '02',
    title: 'Web app development',
    seoTitle: 'Web Application and Custom Software Development',
    line: 'Dashboards, portals, ERP and booking systems built around how your business runs.',
    description:
      'Internal tools, customer portals, dashboards, ERP and CRM systems, and the APIs behind them. We map your workflow first, design the database, then build software that removes manual work instead of adding it.',
    capabilities: ['Custom web apps', 'ERP and CRM', 'Dashboards', 'APIs and integrations'],
    stack: ['Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker'],
    deliverables: [
      'Workflow and database design',
      'Role based admin dashboards',
      'Secure, documented APIs',
      'Deployment, backups and monitoring',
    ],
  },
  {
    slug: 'android-app-development',
    number: '03',
    title: 'Android app development',
    seoTitle: 'Android App Development',
    line: 'Native Android apps with login, ordering, payments and push notifications.',
    description:
      'Native Android apps written in Kotlin with Jetpack Compose, backed by Firebase or your own server. Login, catalogues, ordering, payments, push notifications and Play Store publishing, from first release to ongoing updates.',
    capabilities: ['Native Android', 'Firebase backend', 'Push notifications', 'Play Store release'],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions'],
    deliverables: [
      'Native Kotlin and Jetpack Compose code',
      'Server side business logic',
      'Push notifications and analytics',
      'Play Store listing and release',
    ],
  },
  {
    slug: 'ai-integration',
    number: '04',
    title: 'AI integration',
    seoTitle: 'AI Chatbot and Automation Development',
    line: 'Chatbots and automations added to your website or app where they save real time.',
    description:
      'Customer support chatbots trained on your own content, automatic document and data processing, and workflow automation, built on the OpenAI, Gemini and Claude APIs and connected to the tools you already use.',
    capabilities: ['AI chatbots', 'Document processing', 'Workflow automation', 'LLM API integration'],
    stack: ['OpenAI', 'Gemini', 'Claude', 'LangChain', 'Python'],
    deliverables: [
      'Chatbot trained on your business content',
      'Automated document and data pipelines',
      'Integration with your existing tools',
      'Usage limits, logging and cost controls',
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
  type: string;
  summary: string;
  overview: string;
  challenge: string;
  capabilities: string[];
  stack: string[];
  liveUrl?: string;
  /** Screenshot of the live site, captured with `npm run screenshots`. */
  screenshot?: string;
  service: string;
  hue: [string, string];
  motif: 'map' | 'queue' | 'thread';
}

export const PROJECTS: Project[] = [
  {
    slug: 'property-planet',
    number: '01',
    name: 'Property Planet',
    category: 'Real estate',
    type: 'Website and web app',
    summary: 'A marketplace for plots and land, with map browsing and an admin approved listing flow.',
    overview:
      'A property marketplace where sellers and agents list plots and land, and buyers browse on a map and send enquiries. Every listing is reviewed by an admin before it goes public, and seller phone numbers are never shown automatically.',
    challenge:
      'Land listings attract spam and duplicates, and sellers worry about their numbers being scraped. The platform had to stay open for self service while keeping quality and privacy under admin control.',
    capabilities: [
      'Map based property browsing',
      'Admin approval before a listing goes public',
      'Self service seller registration',
      'One dashboard for buying and selling activity',
      'Enquiry handling with admin oversight',
    ],
    stack: ['Next.js', 'Supabase', 'Google Maps'],
    liveUrl: 'https://propertyplanet.vercel.app/',
    screenshot: '/work/property-planet.jpg',
    service: 'website-development',
    hue: ['#87A96B', '#2E2219'],
    motif: 'map',
  },
  {
    slug: 'campusbite',
    number: '02',
    name: 'CampusBite',
    category: 'Food ordering',
    type: 'Android app',
    summary: 'A native Android app for ordering food on campus and managing pickup time slots.',
    overview:
      'A native Android app that lets students order food on campus and helps outlets manage queues and pickup slots. Orders are created on the server, so prices and slot capacity cannot be changed from the phone.',
    challenge:
      'Lunch hour rushes overwhelmed campus outlets. The app had to spread demand across pickup slots and stay tamper proof with many students ordering at the same time.',
    capabilities: [
      'Server side order creation with Cloud Functions',
      'Pickup slot capacity management',
      'Push notifications for order updates',
      'Admin and staff dashboards',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions'],
    service: 'android-app-development',
    hue: ['#D5851F', '#2A1F17'],
    motif: 'queue',
  },
  {
    slug: 'eifa-couture',
    number: '03',
    name: 'Eifa Couture',
    category: 'Fashion e-commerce',
    type: 'Online store',
    summary: 'An online store for a Chikankari fashion label, with Razorpay payments and a full admin back office.',
    overview:
      'An e-commerce store for a Chikankari fashion label, with online payments, order history and an admin back office for inventory, refunds and finance reports.',
    challenge:
      'A handcrafted label needed a store that felt as considered as the garments, while giving a small team real tools for stock, refunds and finance without a second system.',
    capabilities: [
      'Razorpay payment integration',
      'Order confirmation and order history',
      'Refund management',
      'Finance reports with CSV export',
      'Inventory, category and banner management',
      'Sign in with Google',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay'],
    liveUrl: 'https://eifa-couture-ds3d-git-main-campus-bite-s-projects.vercel.app/',
    screenshot: '/work/eifa-couture.jpg',
    service: 'website-development',
    hue: ['#E2C29A', '#3A2A1E'],
    motif: 'thread',
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/* ------------------------------------------------------------- Studio */

export const STUDIO = {
  heading: 'You work directly with the engineer who builds your product.',
  body: [
    `Spesio Technologies was started in 2023 by Soaib Akhtar, a software engineer, so that clients could brief the person writing the code. There are no account managers and no hand offs between teams.`,
    'We take on a small number of projects at a time, agree the scope in writing before work starts, and share a working build every week so you can see progress and give feedback.',
  ],
};

export const PRINCIPLES = [
  { title: 'Written scope and quote', line: 'You know what is being built, what it costs and when it ships before we start.' },
  { title: 'You own everything', line: 'Code, database, domain and hosting accounts are set up in your name.' },
  { title: 'Weekly working builds', line: 'Click through real progress every week instead of waiting for a big reveal.' },
  { title: 'Six months of maintenance', line: 'Bug fixes and small updates are included for six months after launch.' },
];

export const PROCESS = [
  {
    number: '01',
    title: 'Discovery call and scope',
    duration: 'Week 1',
    line: 'We talk through your business and goals, then send a written scope, timeline and quote.',
  },
  {
    number: '02',
    title: 'Design and development',
    duration: 'Weeks 2 to 6',
    line: 'We design the pages, build them, and share a working link every week for your feedback.',
  },
  {
    number: '03',
    title: 'Launch and support',
    duration: 'After launch',
    line: 'We connect your domain, submit the site to Google, and handle fixes and updates for six months.',
  },
];

export const STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Kotlin', 'Jetpack Compose', 'Firebase', 'Supabase', 'PostgreSQL', 'Razorpay', 'Vercel'];

/* ----------------------------------------------------------- Packages */

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  features: string[];
}

export const PACKAGES: Record<'website' | 'android', Tier[]> = {
  website: [
    { id: 'bronze', name: 'Bronze', tagline: 'A professional online presence', features: ['Up to 8 pages', 'Contact form and Google Maps', 'Mobile responsive', 'Basic SEO setup'] },
    { id: 'silver', name: 'Silver', tagline: 'Built to bring in enquiries', features: ['Up to 12 pages', 'Product or service listing', 'WhatsApp, Instagram and email', 'Subtle animations'] },
    { id: 'gold', name: 'Gold', tagline: 'Manage your business online', features: ['Admin panel', 'Manage products and services', 'Enquiry management', 'Dashboard'] },
    { id: 'diamond', name: 'Diamond', tagline: 'A complete online store', features: ['Full e-commerce', 'Payment gateway', 'Orders and inventory', 'Analytics and ERP'] },
  ],
  android: [
    { id: 'bronze', name: 'Bronze', tagline: 'Your business in an app', features: ['8 to 10 screens', 'Services, about and contact', 'WhatsApp and social links', 'Push notifications'] },
    { id: 'silver', name: 'Silver', tagline: 'Accounts and orders', features: ['Up to 15 screens', 'Login with Firebase', 'Catalogue and search', 'WhatsApp ordering'] },
    { id: 'gold', name: 'Gold', tagline: 'Run operations from the app', features: ['Web admin panel', 'Orders and users', 'Notification panel', 'Analytics'] },
    { id: 'diamond', name: 'Diamond', tagline: 'A complete mobile business', features: ['Payment gateway', 'Inventory management', 'ERP integration', 'Reports'] },
  ],
};

/* ---------------------------------------------------------------- FAQ */

export const FAQS = [
  {
    question: 'What does Spesio Technologies build?',
    answer:
      'Spesio Technologies is a web design and development studio in Greater Noida, India. We build business websites, online stores, web applications, native Android apps, custom dashboards and ERP systems, and AI chatbots and automations.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most business websites launch in two to four weeks. Online stores, web applications and Android apps usually take four to ten weeks depending on scope. You receive a written timeline after the discovery call.',
  },
  {
    question: 'Do you provide maintenance after launch?',
    answer:
      'Yes. Every website and app package includes six months of free maintenance after launch, covering bug fixes and small updates.',
  },
  {
    question: 'Will I own the website and the code?',
    answer:
      'Yes. The source code, database, domain and hosting accounts are set up in your name. You can move the project to any developer at any time.',
  },
  {
    question: 'Can you add an AI chatbot to my existing website?',
    answer:
      'Yes. We can add a support chatbot trained on your own content, or automate tasks such as document processing, using the OpenAI, Google Gemini or Anthropic Claude APIs.',
  },
  {
    question: 'Do you work with clients outside Greater Noida?',
    answer:
      'Yes. We work with businesses across India and abroad over calls, WhatsApp and shared links, and can meet in person in Delhi NCR.',
  },
  {
    question: 'Do you set up payment gateways?',
    answer:
      'Yes. Online stores and Diamond packages include payment gateway integration such as Razorpay, along with order, refund and inventory management.',
  },
];

/* ------------------------------------------------------------- Contact */

export const CONTACT = {
  services: ['Website', 'Online store', 'Web app', 'Android app', 'AI integration', 'Not sure yet'],
  budgets: ['Under ₹25,000', '₹25,000 to ₹75,000', '₹75,000 to ₹2,00,000', 'Above ₹2,00,000', 'Not sure yet'],
};

export const NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Packages', href: '/#packages' },
  { label: 'FAQ', href: '/#faq' },
];

export const HOME_META = {
  title: 'Website and App Development Company in Greater Noida | Spesio Technologies',
  description:
    'Spesio Technologies designs and builds websites, online stores, web apps and Android apps for growing businesses. Based in Greater Noida, working across India.',
};

/* --------------------------------------------------------------- Legal */

export interface LegalPage {
  slug: 'privacy-policy' | 'terms-and-conditions';
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
}

export const LEGAL: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How Spesio Technologies collects, uses and protects the information you share through this website.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `This website is operated by Spesio Technologies, ${'Greater Noida, Uttar Pradesh, India'}. You can contact us at spesiotechnologies@gmail.com or +91 89578 33269.`,
        ],
      },
      {
        heading: 'Information we collect',
        body: [
          'When you submit the contact form we collect your name, email address, phone number, the service and budget you select, and your message. We also record the date and time of the submission, your IP address and your browser type to help prevent spam.',
          'When you contact us by email or WhatsApp, we receive the details you choose to share in that conversation.',
          'This website does not use advertising or tracking cookies.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use your information only to reply to your enquiry, prepare a proposal, and deliver and support any project you hire us for. We do not sell, rent or share your information for marketing.',
        ],
      },
      {
        heading: 'Service providers',
        body: [
          'The website is hosted on Vercel. Contact form submissions are delivered to our inbox using Resend. These providers process data on our behalf and only as needed to provide their service.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We keep enquiry details for as long as needed to respond and, if you become a client, for the length of our working relationship and any period required by law. You can ask us to delete your details at any time.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask to see, correct or delete the personal information we hold about you by emailing spesiotechnologies@gmail.com. We will respond within 30 days.',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: ['If we change this policy we will update the date at the top of this page.'],
      },
    ],
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    description: 'The terms that apply when you use the Spesio Technologies website or hire us for a project.',
    sections: [
      {
        heading: 'About these terms',
        body: [
          'These terms apply to your use of this website. Each client project is also covered by a written proposal or agreement, which sets out the scope, price, timeline and payment schedule. If that agreement differs from these terms, the agreement applies.',
        ],
      },
      {
        heading: 'Website content',
        body: [
          'The text, design and code of this website belong to Spesio Technologies unless stated otherwise. Project names and logos shown in our work section belong to their respective owners.',
          'Package descriptions on this website are a general guide. Final scope and pricing are confirmed in writing for each project.',
        ],
      },
      {
        heading: 'Projects and payments',
        body: [
          'Work begins after the proposal is accepted and any agreed advance payment is received. Remaining payments are due at the milestones set out in the proposal.',
          'Changes requested outside the agreed scope may affect the price and timeline. We will confirm any such change with you in writing before doing the work.',
        ],
      },
      {
        heading: 'Ownership',
        body: [
          'Once a project is paid in full, the source code, design files and content created for you belong to you. Third party software, fonts and services used in the project remain subject to their own licences.',
        ],
      },
      {
        heading: 'Maintenance',
        body: [
          'Packages include six months of free maintenance after launch, covering bug fixes and small content or design updates. New features and major changes are quoted separately.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'We take care to build reliable software, but we cannot guarantee that a website or app will be free from all errors or available without interruption. Our total liability for any project is limited to the amount paid for that project.',
        ],
      },
      {
        heading: 'Governing law',
        body: ['These terms are governed by the laws of India, and any disputes are subject to the courts of Gautam Buddh Nagar, Uttar Pradesh.'],
      },
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);

/** All indexable routes. Used by the prerender script and the sitemap. */
export const routes = (): string[] => [
  '/',
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...PROJECTS.map((p) => `/work/${p.slug}`),
  ...LEGAL.map((l) => `/${l.slug}`),
];

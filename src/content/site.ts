import { AREAS_PATH, CONTENT_PUBLISHED, CONTENT_UPDATED } from './guides';

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
  /** Dates used for schema dateModified and sitemap lastmod. Change only when content really changes. */
  published: CONTENT_PUBLISHED,
  updated: CONTENT_UPDATED,
  updatedLabel: '9 November 2026',
  socials: {
    instagram: 'https://instagram.com/spesio_technologies',
    youtube: 'https://youtube.com/@spesiotechnologies',
    // Fill these in with the real profile URLs. Empty values are skipped everywhere (schema sameAs, footer).
    linkedin: '',
    github: '',
    googleBusinessProfile: '',
    clutch: '',
  },
  founder: {
    name: 'Soaib Akhtar',
    role: 'Founder and Software Engineer',
    // Founder's own profile URLs (LinkedIn, GitHub). Empty list is skipped.
    sameAs: [] as readonly string[],
  },
  legal: {
    entity: 'Sole proprietorship',
    udyam: '[PLACEHOLDER: Udyam registration number]',
    grievanceOfficer: 'Soaib Akhtar',
    grievanceEmail: 'spesiotechnologies@gmail.com',
    // Confirm with your legal adviser that this is the court jurisdiction you want.
    jurisdiction: 'Greater Noida, Uttar Pradesh',
  },
  legalUpdated: '9 November 2026',
} as const;

/** True for values the owner still has to fill in. */
export const isPlaceholder = (v: string) => v.startsWith('[PLACEHOLDER');

/** Non empty social profile URLs, for schema sameAs and footer links. */
export const socialLinks = (): string[] => Object.values(SITE.socials).filter(Boolean) as string[];

/* ---------------------------------------------------------------- Hero */

export const HERO = {
  eyebrow: 'Websites · Android apps · Custom software · ERP · AI',
  headline: 'Websites, software and apps that bring you customers.',
  sub: 'We design, build and launch websites, e-commerce stores, Android apps, custom ERP software and AI integrations, and you own everything we make.',
  primaryCta: 'Start a Project',
  secondaryCta: 'See Our Work',
  trustStatement: 'Based in Uttar Pradesh, serving clients across India.',
  trust: ['Reply within one working day', 'You own the code', 'Free maintenance & support up to 3 months'],
  heroImage: '/images/hero-studio.jpg',
};

export const BUILD_LIST = [
  'Websites & e-commerce',
  'Android applications',
  'Custom software',
  'ERP & admin dashboards',
  'AI integrations & automation',
];

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  slug: string;
  summary: string;
  details: string;
  useCases: string[];
  visualType: 'screenshot' | 'illustration';
  projectSlug?: string;
  image?: string;
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'websites-ecommerce',
    number: '01',
    title: 'Websites & e-commerce',
    slug: 'website-development',
    summary: 'Fast business websites, landing pages and online stores designed to bring in enquiries and orders.',
    details:
      'Built mobile first with React, Next.js and TypeScript, configured for technical SEO, structured data, GA4 analytics and Razorpay payments where online checkout is required.',
    useCases: ['Company websites and landing pages', 'Online stores with Razorpay payments', 'Product catalogues and admin content updates'],
    visualType: 'screenshot',
    projectSlug: 'eifa-couture',
    image: '/images/svc-websites.jpg',
  },
  {
    id: 'android-applications',
    number: '02',
    title: 'Android applications',
    slug: 'android-app-development',
    summary: 'Native Android apps built in Kotlin with Jetpack Compose for ordering, accounts and daily customer use.',
    details:
      'Backed by Firebase or your own server so products, orders and customer accounts stay in sync. Includes push notifications and Google Play Store release preparation under your own console account.',
    useCases: ['Customer ordering and booking apps', 'Business directory and service apps', 'Real-time notifications and order tracking'],
    visualType: 'illustration',
    projectSlug: 'campusbite',
    image: '/images/svc-android.jpg',
  },
  {
    id: 'custom-software',
    number: '03',
    title: 'Custom software',
    slug: 'web-app-development',
    summary: 'Tailored web applications, customer portals and booking systems built around your exact workflow.',
    details:
      'We map your operational workflow first, design a structured database in PostgreSQL or Supabase, and build secure applications with authentication, documented APIs and automated backups.',
    useCases: ['Customer and vendor portals', 'Booking and marketplace platforms', 'Internal tools replacing spreadsheets'],
    visualType: 'screenshot',
    projectSlug: 'property-planet',
    image: '/images/svc-webapps.jpg',
  },
  {
    id: 'erp-dashboards',
    number: '04',
    title: 'ERP & admin dashboards',
    slug: 'web-app-development',
    summary: 'Role-based admin back offices, inventory controls, reporting dashboards and operational tools.',
    details:
      'Centralise orders, enquiries, stock, refunds and finance reports with CSV exports and role-based permissions so team members only access what their role requires.',
    useCases: ['Order, inventory and refund management', 'Enquiry and lead tracking dashboards', 'Finance reporting with CSV export'],
    visualType: 'illustration',
    image: '/images/svc-webapps.jpg',
  },
  {
    id: 'ai-automation',
    number: '05',
    title: 'AI integrations & automation',
    slug: 'ai-integration',
    summary: 'Practical AI chatbots, document processing and email or WhatsApp automations with cost controls.',
    details:
      'Built on the OpenAI, Google Gemini and Anthropic Claude APIs, grounded in your approved business content with usage limits, logging and clear handover to your team when needed.',
    useCases: ['Website and WhatsApp support chatbots', 'Automated document and invoice data extraction', 'Lead routing via email and WhatsApp'],
    visualType: 'illustration',
    image: '/images/svc-ai.jpg',
  },
];

/* ------------------------------------------------------------ Services */

export interface Service {
  slug: string;
  number: string;
  title: string;
  seoTitle: string;
  /** Short keyword for the page title (kept under 60 characters). */
  titleKey: string;
  /** Direct answer (40 to 60 words) shown first on the page and used in schema. */
  answer: string;
  faqs: { question: string; answer: string }[];
  shortLine: string;
  line: string;
  description: string;
  capabilities: string[];
  stack: string[];
  deliverables: string[];
  image: string;
  imageAlt: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'website-development',
    number: '01',
    title: 'Website development',
    seoTitle: 'Website Development',
    titleKey: 'Website Development',
    answer:
      'Spesio Technologies designs and builds business websites, landing pages and online stores with React and Next.js. Each site is mobile first, fast, and set up for Google and AI search from day one, with a sitemap and structured data. You receive the full source code and hosting access on full payment.',
    faqs: [
      { question: 'How much does a business website cost?', answer: 'It depends on the number of pages and features. A simple business website costs less than an online store with payments and an admin panel. Share your requirements and we send a written quote within one working day.' },
      { question: 'Will my website rank on Google?', answer: 'Every site we build is set up for search from day one: fast loading, mobile friendly, clean page titles and descriptions, a sitemap and structured data. Ranking also depends on your content and competition, and we guide you on both.' },
      { question: 'Can I update the website myself?', answer: 'Yes. Gold and Diamond packages include an admin panel where you can add and edit products, services and content without writing code.' },
      { question: 'How long does it take to build a business website?', answer: 'Most business websites launch in two to four weeks. Online stores with payments and an admin panel usually take longer, depending on scope. You receive a written timeline after the discovery call.' },
      { question: 'Do you build websites for businesses outside Greater Noida?', answer: 'Yes. We work remotely with businesses in every Indian city, including Delhi, Mumbai, Ahmedabad, Indore, Jaipur, Lucknow and Bhubaneswar, over calls, WhatsApp and shared links.' },
    ],
    shortLine: 'Business websites & online stores built for enquiries.',
    line: 'Choose this when customers need to find you and get in touch. Fast sites and online stores that bring in enquiries.',
    description:
      'We design and build business websites, landing pages and e-commerce stores with React and Next.js. Every site is mobile first, accessible, tuned for Core Web Vitals and set up for Google from day one, with a sitemap, structured data and clean page titles.',
    capabilities: ['Business websites and landing pages', 'Online stores with payments', 'Set up for Google search'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Razorpay'],
    deliverables: [
      'Custom design for desktop and mobile',
      'Technical SEO: sitemap, structured data, page titles',
      'Payment gateway integration with Razorpay',
      'Admin panel to manage products, services and enquiries',
      'GA4 analytics with event and funnel tracking',
      'Full source code, documentation and hosting access on handover',
    ],
    image: '/images/svc-websites.jpg',
    imageAlt: 'Laptop displaying an e-commerce storefront designed for conversion and clean product browsing',
  },
  {
    slug: 'web-app-development',
    number: '02',
    title: 'Web app & ERP systems',
    seoTitle: 'Web Application and Custom Software Development',
    titleKey: 'Web App Development',
    answer:
      'Spesio Technologies builds custom web applications such as customer portals, dashboards, booking systems and ERP or CRM tools. We map your workflow first, design the database, then build secure software with role based access and backups. The source code, database and hosting accounts are set up in your name.',
    faqs: [
      { question: 'What kind of web apps do you build?', answer: 'Dashboards, customer portals, booking systems, ERP and CRM tools, inventory and order management, and internal tools that replace spreadsheets and manual work.' },
      { question: 'Can you connect the app to tools we already use?', answer: 'Yes. We integrate with payment gateways, WhatsApp, email, Google services and most systems that offer an API.' },
      { question: 'How do you keep business data secure?', answer: 'We use role based access, secure authentication, encrypted connections and regular backups, and the database is set up in your own account.' },
      { question: 'How is a web app different from a website?', answer: 'A website mainly shows information to visitors. A web app lets people log in to manage data, such as bookings, orders, customers or inventory, with different access for different roles.' },
      { question: 'Will I own the source code?', answer: 'Yes. On full payment we hand over the complete source code, database and hosting access, and documentation, so you can move to any developer later.' },
    ],
    shortLine: 'Dashboards, ERP tools & booking portals for your team.',
    line: 'Choose this when your team or customers log in to manage data. Dashboards, ERP and booking systems built around how you work.',
    description:
      'Internal tools, customer portals, dashboards, ERP and CRM systems, and the APIs behind them. We map your workflow first, design the database, then build software that removes manual work instead of adding it.',
    capabilities: ['Custom software and ERP', 'Dashboards and customer portals', 'Connects to the tools you use'],
    stack: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Drizzle', 'Redis', 'Docker', 'AWS'],
    deliverables: [
      'Workflow and database design',
      'Role based admin dashboards',
      'Secure, documented APIs',
      'Deployment, backups and monitoring',
      'Login with Google or email OTP, and role based access',
      'Architecture chosen to fit your scale: serverless or VPS/Docker/AWS',
    ],
    image: '/images/svc-webapps.jpg',
    imageAlt: 'Studio monitor showing a custom ERP and admin analytics dashboard on a walnut desk',
  },
  {
    slug: 'android-app-development',
    number: '03',
    title: 'Android app development',
    seoTitle: 'Android App Development',
    titleKey: 'Android App Development',
    answer:
      'Spesio Technologies builds native Android apps in Kotlin with Jetpack Compose, backed by Firebase or your own server. Apps include login, ordering, payments and push notifications, and we publish them on the Google Play Store under your own account. You receive the full source code on handover.',
    faqs: [
      { question: 'Do you build native Android apps?', answer: 'Yes. We build native Android apps in Kotlin with Jetpack Compose, which gives smooth performance and full access to device features.' },
      { question: 'Will you publish the app on the Google Play Store?', answer: 'Yes. We prepare the store listing, screenshots and release, and publish the app under your own Play Console account.' },
      { question: 'Can the app share data with my website?', answer: 'Yes. The app and website can use the same backend, so products, orders and users stay in sync across both.' },
      { question: 'How long does it take to build an Android app?', answer: 'Most Android apps take four to ten weeks depending on scope. We build in phases, so you can launch the core features first and add more after release.' },
      { question: 'Do you build iPhone apps?', answer: 'Our focus is native Android apps. If you need iPhone users covered as well, a responsive web app is a practical option, and we can discuss other approaches after the discovery call.' },
    ],
    shortLine: 'Native Kotlin Android apps published to Play Store.',
    line: 'Choose this for daily repeat use or phone features. Native Android apps your customers keep on their phone.',
    description:
      'Native Android apps written in Kotlin with Jetpack Compose, backed by Firebase or your own server. Login, catalogues, ordering, payments, push notifications and Play Store publishing, from first release to ongoing updates.',
    capabilities: ['Login, ordering and payments', 'Push notifications', 'Published on Google Play'],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions'],
    deliverables: [
      'Native Kotlin and Jetpack Compose code',
      'Server side business logic',
      'Push notifications and analytics',
      'Play Store listing and release',
      'Full source code and Firebase project handed over to you',
    ],
    image: '/images/svc-android.jpg',
    imageAlt: 'Matte dark Android smartphone displaying a clean native ordering and tracking app',
  },
  {
    slug: 'ai-integration',
    number: '04',
    title: 'AI integration',
    seoTitle: 'AI Chatbot and Automation Development',
    titleKey: 'AI Chatbot Development',
    answer:
      'Spesio Technologies adds AI chatbots and automations to websites and apps, using the OpenAI, Google Gemini and Anthropic Claude APIs. Chatbots answer customer questions from your own content, process documents and automate email and WhatsApp tasks, with usage limits, logging and cost controls so spending stays predictable.',
    faqs: [
      { question: 'Can an AI chatbot answer questions about my business?', answer: 'Yes. We train the chatbot on your own content, such as your services, prices, policies and FAQs, so it gives accurate answers to your customers.' },
      { question: 'Which AI models do you use?', answer: 'We work with the OpenAI, Google Gemini and Anthropic Claude APIs and choose the one that best fits your use case and budget.' },
      { question: 'What tasks can be automated with AI?', answer: 'Common examples are answering customer enquiries, extracting data from documents and invoices, sorting emails and generating reports.' },
      { question: 'Can the chatbot work on WhatsApp?', answer: 'Yes. We can connect a chatbot or automation to WhatsApp through the WhatsApp Business platform, where WhatsApp approval and messaging rules apply.' },
      { question: 'How do you stop the chatbot from giving wrong answers?', answer: 'We limit it to your approved content, test it with real customer questions before launch, add logging and usage limits, and let it hand over to a person when it is unsure.' },
    ],
    shortLine: 'Support chatbots & workflow automations on your data.',
    line: 'A chatbot that answers customers from your own content and hands over to a person when it is unsure.',
    description:
      'Customer support chatbots trained on your own content, automatic document and data processing, and workflow automation, built on the OpenAI, Gemini and Claude APIs and connected to the tools you already use.',
    capabilities: ['Chatbot on your website or WhatsApp', 'Document and data processing', 'Email and WhatsApp automation'],
    stack: ['FastAPI', 'Python', 'OpenAI', 'Gemini', 'Claude'],
    deliverables: [
      'Chatbot trained on your business content',
      'Automated document and data pipelines',
      'Integration with your existing tools',
      'Usage limits, logging and cost controls',
      'Email and WhatsApp automation for leads and updates',
    ],
    image: '/images/svc-ai.jpg',
    imageAlt: 'Tablet showing a customer support assistant and automated workflow pipeline on sandstone desk',
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
  /** Primary homepage screenshot of the live site, captured with `npm run screenshots`. */
  screenshot?: string;
  /** Additional inner-page screenshot showing a second live view of the platform. */
  secondaryScreenshot?: {
    src: string;
    url: string;
    label: string;
    alt: string;
  };
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
    summary: 'A land and plot marketplace with map browsing and admin approved listings.',
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
    secondaryScreenshot: {
      src: '/work/property-planet-2.jpg',
      url: 'propertyplanet.vercel.app/about',
      label: 'Agency & Buyer Guide page',
      alt: 'Second-page screenshot of the Property Planet agency overview page',
    },
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
    summary: 'An Android app for ordering campus food and booking pickup slots.',
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
    hue: ['#87A96B', '#2A1F17'],
    motif: 'queue',
  },
  {
    slug: 'eifa-couture',
    number: '03',
    name: 'Eifa Couture',
    category: 'Fashion e-commerce',
    type: 'Online store',
    summary: 'An online store for a Chikankari label, with payments and an admin back office.',
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
    liveUrl: 'https://eifacouture.com',
    screenshot: '/work/eifa-couture.jpg',
    secondaryScreenshot: {
      src: '/work/eifa-couture-2.jpg',
      url: 'eifacouture.com/women',
      label: "Women's Collection storefront",
      alt: "Second-page screenshot of the Eifa Couture Women's Collection storefront",
    },
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
    'Spesio Technologies was started in 2023 by Soaib Akhtar, a software engineer based in Greater Noida, Uttar Pradesh, so that clients could brief the person writing the code. There are no account managers and no hand offs between teams.',
    'Based in Uttar Pradesh, we work remotely with businesses across Delhi NCR and all over India. Soaib leads every project and brings in trusted specialists for design, mobile or infrastructure work when a project needs them, so you always have one accountable point of contact.',
  ],
};

export const ABOUT = {
  title: 'About Spesio Technologies',
  intro:
    'Spesio Technologies is a technology development studio founded in 2023 by software engineer Soaib Akhtar. Based in Uttar Pradesh, we serve businesses across Delhi NCR and all over India with websites, e-commerce stores, native Android apps, custom software, ERP dashboards and AI integrations.',
  story: [
    'Spesio started with a simple idea: the person you explain your business to should be the person who builds your product. Too many projects lose clarity as they pass between sales teams, project managers and developers.',
    'Every project is led by the engineer writing the code. We agree the scope in writing first, work remotely through shared live previews, ship in phases so you can launch early, and hand over everything on completion: source code, server access and documentation.',
    'We choose practical, production-grade technology suited to your requirements, from fast serverless setups for early launches to custom Docker or AWS deployments when operational complexity grows.',
  ],
  team:
    'We operate as a remote studio from Greater Noida, Uttar Pradesh, serving clients across Delhi NCR (including Noida and Delhi), Uttar Pradesh (including Gorakhpur and Kushinagar) and all over India. Soaib leads every build personally and collaborates with trusted specialists when a project requires additional capacity.',
};

export const PRINCIPLES = [
  { title: 'Written scope and plan', line: 'You know what is being built, what is included and how milestones work before development starts.' },
  { title: 'You own everything', line: 'Full source code, server access, domain and third-party accounts are set up and handed over in your name.' },
  { title: 'Launch early, grow in phases', line: 'Go live with the core requirements first, then expand features step by step in planned phases.' },
  { title: 'Support after launch', line: 'Free maintenance and support are included for up to 3 months after launch, with optional paid plans afterwards.' },
];

export interface ProcessStepDetail {
  number: string;
  title: string;
  duration: string;
  line: string;
  summary: string;
  spesioHandles: string[];
  clientProvides: string[];
  outcome: string;
}

export const PROCESS_STEPS: ProcessStepDetail[] = [
  {
    number: '01',
    title: 'Discovery & Requirements',
    duration: 'Step 01',
    line: 'We understand your business, goals, audience and requirements to agree on a clear written scope.',
    summary:
      'Before writing code or designing screens, we review your business model, target users, operational workflow and the problems the website, software or app needs to solve.',
    spesioHandles: [
      'Reviewing your goals, target audience and core workflows',
      'Recommending the right platform, package or architecture',
      'Defining features, integrations and exclusions in writing',
    ],
    clientProvides: [
      'Overview of your business, services or products',
      'Reference websites, apps or examples you like',
      'Must-have features and operational goals',
    ],
    outcome: 'An agreed project scope.',
  },
  {
    number: '02',
    title: 'Planning & Design',
    duration: 'Step 02',
    line: 'We plan pages, screens, user journeys, visual direction, technical architecture and integrations for your approval.',
    summary:
      'Once the scope is agreed, we map out the page structure or app screens, user journeys, database structure and any third-party integrations before full development begins.',
    spesioHandles: [
      'Page and screen planning with user journeys',
      'Visual direction and responsive layout design',
      'Database, authentication and integration planning',
    ],
    clientProvides: [
      'Timely review and feedback on planned layouts and flows',
      'Confirmation on branding, colours and content structure',
      'Approval to proceed into development',
    ],
    outcome: 'An agreed design and development plan.',
  },
  {
    number: '03',
    title: 'Development & Testing',
    duration: 'Step 03',
    line: 'We build the frontend, backend and agreed integrations, sharing progress for testing and refinement.',
    summary:
      'We implement the frontend interface, backend logic, databases, admin dashboards and agreed integrations (such as payments, authentication or notifications), testing functionality across devices as we go.',
    spesioHandles: [
      'Frontend and backend or native Android development',
      'Agreed integrations (payments, login, notifications, APIs)',
      'Functional, responsive and browser/device testing',
    ],
    clientProvides: [
      'Required text copy, product details, photos and brand assets',
      'Necessary third-party credentials or sandbox access',
      'Feedback on shared preview builds',
    ],
    outcome: 'A functional solution ready for review and launch.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    duration: 'Step 04',
    line: 'We complete final checks, deploy or prepare the Android release, hand over access and provide up to 3 months of free support.',
    summary:
      'After final client sign-off, we configure production hosting, domain/SSL or Google Play Store release preparation, hand over the source code and documentation, and stay on for post-launch support.',
    spesioHandles: [
      'Final pre-launch checks, SEO setup and production deployment',
      'Android Play Store release preparation under your console account',
      'Source code, account handover and documentation',
    ],
    clientProvides: [
      'Final approval to go live',
      'Production domain, hosting, Play Console or payment gateway accounts in your name',
      'Reporting any bugs or issues discovered after launch',
    ],
    outcome: 'A completed solution ready for use. Free maintenance and support are included for up to 3 months.',
  },
];

export const PROCESS = PROCESS_STEPS.map(({ number, title, duration, line }) => ({
  number,
  title,
  duration,
  line,
}));

export const PHASED_NOTE =
  'Free maintenance and support are included for up to 3 months after launch for bug fixes and security updates within the agreed scope. Larger projects can also launch in phases, starting with core features first.';

export interface StackGroup {
  title: string;
  items: string[];
  line: string;
}

/** Technologies we deliver with in production, grouped for clients. */
export const STACK_GROUPS: StackGroup[] = [
  { title: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], line: 'Fast, responsive interfaces that work on every screen.' },
  { title: 'Backend', items: ['Node.js', 'Next.js API routes', 'FastAPI for AI workloads'], line: 'Secure APIs and business logic behind your product.' },
  { title: 'Serverless and BaaS', items: ['Supabase', 'Firebase'], line: 'Login, database, file storage and real time updates without managing servers.' },
  { title: 'Database', items: ['PostgreSQL', 'Prisma ORM', 'Drizzle ORM'], line: 'Reliable, structured data that is easy to grow and query.' },
  { title: 'Performance', items: ['CDN', 'Next.js caching', 'Redis when traffic needs it'], line: 'Pages that stay fast as your traffic grows.' },
  { title: 'Infrastructure', items: ['Docker', 'VPS and AWS deployment', 'CI/CD', 'SSL', 'Automatic backups', 'Monitoring'], line: 'Production hosting that is secure, backed up and watched.' },
  { title: 'Security', items: ['Google login', 'Email OTP', 'Role based access', 'Admin panel'], line: 'The right people see the right data, and nothing more.' },
  { title: 'AI and automation', items: ['AI integrations', 'Email automation', 'WhatsApp automation'], line: 'Assistants and automations that save your team time.' },
  { title: 'SEO and analytics', items: ['Technical SEO', 'Structured data', 'Core Web Vitals', 'GA4', 'Event and funnel tracking'], line: 'Found on Google, and measured so you know what works.' },
  { title: 'Mobile', items: ['Kotlin', 'Jetpack Compose', 'Firebase'], line: 'Native Android apps that share data with your website.' },
];

/** Flat list kept for places that show a short stack strip. */
export const STACK = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'FastAPI', 'Supabase', 'Firebase', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Kotlin'];

export const DELIVERY = {
  heading: 'What you get when we hand over',
  items: [
    { title: 'Full source code', line: 'The complete code in a repository you own, with nothing held back.' },
    { title: 'Server and account access', line: 'Hosting, database, domain and third party accounts set up in your name.' },
    { title: 'Documentation', line: 'How the system is set up, how to deploy it and how to manage content.' },
    { title: 'Bug and security support', line: 'Three months included after launch, then optional support plans.' },
  ],
};

export const SCALE = {
  heading: 'An architecture that fits your project',
  intro: 'We do not force every project onto the same setup. We pick the architecture that matches your budget, timeline and expected growth, and we can move you to a bigger setup later.',
  options: [
    {
      title: 'Serverless, for fast launches',
      tools: 'Supabase or Firebase',
      line: 'Best for new products, business websites, online stores and MVPs. Login, database and storage are managed for you, so you launch sooner and pay less to run.',
    },
    {
      title: 'VPS with Docker, for custom systems',
      tools: 'Docker, PostgreSQL, Redis',
      line: 'Best for custom business software with heavier logic or background jobs. More control over performance and costs as usage grows.',
    },
    {
      title: 'AWS, for larger workloads',
      tools: 'AWS, CDN, CI/CD, monitoring',
      line: 'Best for high traffic or business critical systems that need scaling, automated deployments and close monitoring.',
    },
  ],
};

/* ----------------------------------------------------------- Packages */

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  /** Technologies included in this package. */
  tech: string[];
  suitableFor: string;
  deliverables: string[];
  clientProvides: string[];
  spesioHandles: string[];
  thirdPartyNotes: string;
  handoverSupport: string;
}

export const PACKAGES: Record<'website' | 'android', Tier[]> = {
  website: [
    {
      id: 'bronze',
      name: 'Bronze',
      tagline: 'A professional online presence',
      features: ['Up to 8 pages', 'Contact form and Google Maps', 'Mobile friendly with basic SEO'],
      tech: ['Next.js', 'React', 'Tailwind CSS'],
      suitableFor: 'Businesses that need a clean, credible online presence where customers can understand their offerings and get in touch.',
      deliverables: [
        'Up to 8 responsive pages designed for desktop and mobile',
        'Working contact form and embedded Google Maps location',
        'Mobile-friendly layout with basic on-page SEO setup (page titles, descriptions, sitemap)',
      ],
      clientProvides: [
        'Business details, service text, logo and photos',
        'Contact email, phone number and office or business address for maps',
        'Domain registration account access',
      ],
      spesioHandles: [
        'UI layout design and responsive frontend build in Next.js, React and Tailwind CSS',
        'Contact form wiring, Google Maps integration and basic SEO configuration',
        'Testing, deployment and full source code handover',
      ],
      thirdPartyNotes: 'Domain name registration, hosting plans (if paid) and transactional email services may involve separate third-party charges unless explicitly included in your proposal.',
      handoverSupport: 'Full source code and hosting access handed over on full payment. Free maintenance and support are included for up to 3 months for agreed bug fixes and security updates.',
    },
    {
      id: 'silver',
      name: 'Silver',
      tagline: 'Built to bring in enquiries',
      features: ['Up to 12 pages', 'Product or service listing', 'WhatsApp, Instagram and email'],
      tech: ['Next.js', 'TypeScript', 'Framer Motion'],
      suitableFor: 'Growing businesses showcasing a structured catalogue of products or services and converting visitors into direct enquiries.',
      deliverables: [
        'Up to 12 responsive pages built with Next.js and TypeScript',
        'Structured product or service listing pages',
        'Direct enquiry routing via WhatsApp, Instagram links and email contact form',
      ],
      clientProvides: [
        'Complete list of products or services with descriptions and images',
        'WhatsApp business number, Instagram link and enquiry email address',
        'Feedback during design and content review',
      ],
      spesioHandles: [
        'Custom responsive design, page structure and subtle motion interactions',
        'Product/service listing templates and enquiry channel integration',
        'Cross-device testing, deployment and source code handover',
      ],
      thirdPartyNotes: 'Domain, hosting and any paid third-party email or messaging services involve separate provider charges unless explicitly included in your proposal.',
      handoverSupport: 'Full source code and deployment access handed over on full payment. Free maintenance and support are included for up to 3 months for agreed bug fixes and security updates.',
    },
    {
      id: 'gold',
      name: 'Gold',
      tagline: 'Manage your business online',
      features: ['Admin panel and dashboard', 'Manage products and services', 'Enquiry management'],
      tech: ['Supabase', 'PostgreSQL', 'Google login'],
      suitableFor: 'Teams that want to update products or services themselves and track incoming customer enquiries in one dashboard.',
      deliverables: [
        'Public website connected to a Supabase and PostgreSQL database',
        'Authenticated admin panel and dashboard with Google login',
        'Manage products, services and customer enquiries without editing code',
      ],
      clientProvides: [
        'Initial catalogue of products/services and business copy',
        'Admin user email accounts for dashboard access',
        'Cloud/database account setup in your name (with our guidance)',
      ],
      spesioHandles: [
        'Database schema design, authentication setup and role-safe admin workflows',
        'Building both the customer-facing site and the admin management dashboard',
        'Testing, launch setup, documentation and full code/account handover',
      ],
      thirdPartyNotes: 'Domain, hosting, database tier upgrades (if usage exceeds free limits) and paid email services may involve separate third-party charges unless explicitly included.',
      handoverSupport: 'Full source code, database and hosting access handed over in your name on full payment. Free maintenance and support are included for up to 3 months.',
    },
    {
      id: 'diamond',
      name: 'Diamond',
      tagline: 'A complete online store',
      features: ['Full e-commerce with payments', 'Orders and inventory', 'Analytics and ERP'],
      tech: ['Razorpay', 'Supabase', 'GA4'],
      suitableFor: 'Retail brands and businesses selling products online that need checkout, payment processing, inventory control and reporting.',
      deliverables: [
        'Complete e-commerce storefront with cart, checkout and Razorpay payment integration',
        'Order history, inventory management and admin operations / ERP workflows',
        'Google Analytics 4 (GA4) setup for traffic and conversion tracking',
      ],
      clientProvides: [
        'Product catalogue, pricing, tax/shipping rules and product photography',
        'Razorpay merchant account and KYC verification documents',
        'Domain, hosting and GA4 account details',
      ],
      spesioHandles: [
        'Storefront, cart, checkout and Razorpay payment gateway integration',
        'Admin back office for orders, inventory and reporting workflows',
        'End-to-end payment testing, GA4 setup, deployment and full handover',
      ],
      thirdPartyNotes: 'Razorpay transaction fees, domain, hosting, SMS/email notifications and database usage beyond free tiers are billed separately by the respective providers unless explicitly included.',
      handoverSupport: 'Full source code, merchant integration code, database and hosting access handed over on full payment. Free maintenance and support are included for up to 3 months.',
    },
  ],
  android: [
    {
      id: 'bronze',
      name: 'Bronze',
      tagline: 'Your business in an app',
      features: ['8 to 10 screens', 'Services, about and contact', 'Push notifications'],
      tech: ['Kotlin', 'Jetpack Compose'],
      suitableFor: 'Businesses that want a dedicated, native Android presence on customers’ phones with direct updates via push notifications.',
      deliverables: [
        'Native Android application (8 to 10 screens) in Kotlin and Jetpack Compose',
        'Services showcase, about information and contact screens',
        'Push notification integration for announcements and updates',
      ],
      clientProvides: [
        'App name, logo/icon assets, business info and service descriptions',
        'Google Play Console developer account for publishing',
        'Privacy policy details and store listing text',
      ],
      spesioHandles: [
        'Native Android UI design and Kotlin / Jetpack Compose development',
        'Push notification setup and device testing',
        'Play Store release build preparation and source code handover',
      ],
      thirdPartyNotes: 'Google Play Console one-time registration fee and any paid cloud messaging or backend tiers are separate third-party charges unless explicitly included.',
      handoverSupport: 'Full Android source code and Play Store release files handed over on full payment. Free maintenance and support are included for up to 3 months.',
    },
    {
      id: 'silver',
      name: 'Silver',
      tagline: 'Accounts and orders',
      features: ['Up to 15 screens', 'Login, catalogue and search', 'WhatsApp ordering'],
      tech: ['Kotlin', 'Firebase Auth'],
      suitableFor: 'Businesses whose customers browse a catalogue, log into an account and place orders directly via WhatsApp.',
      deliverables: [
        'Native Android app with up to 15 screens in Kotlin',
        'User login with Firebase Auth, searchable product/service catalogue',
        'Structured WhatsApp ordering workflow',
      ],
      clientProvides: [
        'Product/service catalogue, categories and images',
        'WhatsApp business number for receiving orders',
        'Google Play Console and Firebase project access (with our setup guidance)',
      ],
      spesioHandles: [
        'Native Android UI, authentication flows and catalogue search implementation',
        'Firebase Auth setup and WhatsApp order formatting',
        'Testing, Play Store release preparation and source code handover',
      ],
      thirdPartyNotes: 'Google Play Console registration, Firebase usage beyond free quotas and WhatsApp Business API charges (if used) are separate provider costs unless explicitly included.',
      handoverSupport: 'Full source code and Firebase project access handed over on full payment. Free maintenance and support are included for up to 3 months.',
    },
    {
      id: 'gold',
      name: 'Gold',
      tagline: 'Run operations from the app',
      features: ['Web admin panel', 'Orders and users', 'Notification panel'],
      tech: ['Firebase', 'Cloud Functions'],
      suitableFor: 'Operations that need a live Android app paired with a web admin panel to manage users, orders and customer notifications.',
      deliverables: [
        'Native Android app backed by Firebase and Cloud Functions',
        'Web admin panel for managing orders and registered users',
        'Notification panel to send targeted updates to app users',
      ],
      clientProvides: [
        'Catalogue data, order workflow rules and admin team emails',
        'Google Play Console and Firebase billing/account setup if Cloud Functions require Blaze plan',
        'Review feedback during staged test builds',
      ],
      spesioHandles: [
        'Android app, Firebase Cloud Functions and web admin dashboard development',
        'Order, user and notification workflows with server-side validation',
        'Testing, release preparation, documentation and full handover',
      ],
      thirdPartyNotes: 'Firebase Blaze plan usage (required for Cloud Functions), web admin hosting and Google Play Console fees are separate third-party costs unless explicitly included.',
      handoverSupport: 'Full Android and web admin source code plus Firebase access handed over on full payment. Free maintenance and support are included for up to 3 months.',
    },
    {
      id: 'diamond',
      name: 'Diamond',
      tagline: 'A complete mobile business',
      features: ['Payment gateway', 'Inventory and reports', 'ERP integration'],
      tech: ['Razorpay', 'Firebase', 'Cloud Functions'],
      suitableFor: 'Businesses running end-to-end mobile commerce or service operations with online payments, inventory and ERP integration.',
      deliverables: [
        'Native Android app with Razorpay payment gateway integration',
        'Inventory tracking, operational reports and web admin back office',
        'Server-side Cloud Functions and ERP integration workflows',
      ],
      clientProvides: [
        'Product/inventory data, pricing and existing ERP API/workflow details (if integrating)',
        'Razorpay merchant account (with KYC) and Google Play Console account',
        'Firebase account setup and staging sign-off',
      ],
      spesioHandles: [
        'End-to-end Android app, server-side Cloud Functions and Razorpay checkout integration',
        'Inventory, reporting and agreed ERP integration logic',
        'Security checks, payment verification testing, release prep and full handover',
      ],
      thirdPartyNotes: 'Razorpay payment fees, Firebase / Cloud Functions usage, SMS/email APIs and Google Play Console fees are separate provider charges unless explicitly included.',
      handoverSupport: 'Full source code, documentation and cloud/Play Console assets handed over on full payment. Free maintenance and support are included for up to 3 months.',
    },
  ],
};

export const PACKAGE_COMPARISON: Record<'website' | 'android', { label: string; values: Record<string, string> }[]> = {
  website: [
    { label: 'Scope & pages', values: { bronze: 'Up to 8 pages', silver: 'Up to 12 pages', gold: 'Website + admin panel', diamond: 'Full online store + ERP' } },
    { label: 'Product / service listing', values: { bronze: 'Basic sections', silver: 'Dedicated listing', gold: 'Admin-managed', diamond: 'Full catalogue & stock' } },
    { label: 'Enquiries & channels', values: { bronze: 'Contact form & Maps', silver: 'WhatsApp, IG & email', gold: 'Enquiry dashboard', diamond: 'Orders, enquiries & GA4' } },
    { label: 'Admin dashboard & login', values: { bronze: 'Not included', silver: 'Not included', gold: 'Included (Google login)', diamond: 'Included (orders & ERP)' } },
    { label: 'Online payments', values: { bronze: 'Not included', silver: 'Not included', gold: 'Optional add-on', diamond: 'Razorpay included' } },
    { label: 'Free post-launch support', values: { bronze: 'Up to 3 months', silver: 'Up to 3 months', gold: 'Up to 3 months', diamond: 'Up to 3 months' } },
  ],
  android: [
    { label: 'App screens', values: { bronze: '8 to 10 screens', silver: 'Up to 15 screens', gold: 'Full app + web admin', diamond: 'Full app + ERP' } },
    { label: 'User accounts & login', values: { bronze: 'Not included', silver: 'Firebase Auth', gold: 'Managed user accounts', diamond: 'Full user & order history' } },
    { label: 'Ordering & payments', values: { bronze: 'Contact & notifications', silver: 'WhatsApp ordering', gold: 'In-app order flow', diamond: 'Razorpay gateway' } },
    { label: 'Admin & notifications', values: { bronze: 'Push notifications', silver: 'Catalogue & search', gold: 'Web admin + push panel', diamond: 'Inventory, reports & ERP' } },
    { label: 'Play Store release prep', values: { bronze: 'Included', silver: 'Included', gold: 'Included', diamond: 'Included' } },
    { label: 'Free post-launch support', values: { bronze: 'Up to 3 months', silver: 'Up to 3 months', gold: 'Up to 3 months', diamond: 'Up to 3 months' } },
  ],
};

/* ---------------------------------------------------------------- FAQ */

export const FAQS = [
  {
    question: 'What does Spesio Technologies build?',
    answer: 'Websites and e-commerce stores, native Android apps, custom software, ERP and admin dashboards, and AI integrations and automations for businesses across India.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Most business websites launch in two to four weeks. Stores, custom software and Android apps take four to ten weeks depending on scope. You receive a written timeline after discovery.',
  },
  {
    question: 'Will I own the code?',
    answer: 'Yes. On full payment you receive the source code, hosting, database and domain in your name, so you retain full ownership.',
  },
  {
    question: 'What support is included after launch?',
    answer: 'Free maintenance and support are included for up to 3 months after launch for bug fixes and security updates within the agreed scope. Paid support plans are available afterwards.',
  },
  {
    question: 'Which should I start with: a website, software or an app?',
    answer: 'Start with a website if customers need to find you online. Choose custom software or an ERP dashboard if your team or customers log in to manage data. Choose an Android app for daily repeat use on phones. You can add more in phases.',
  },
  {
    question: 'Where are you based and do you work across India?',
    answer: 'We are based in Greater Noida, Uttar Pradesh, and serve clients across Delhi NCR (including Noida and Delhi), Uttar Pradesh (including Gorakhpur and Kushinagar) and all over India remotely over calls, WhatsApp and live preview links.',
  },
];

/* ------------------------------------------------------------- Contact */

export const CONTACT = {
  services: ['Website', 'Online store', 'Software or ERP', 'Android app', 'AI chatbot', 'Not sure yet'],
};

export const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/#work' },
  { label: 'Packages', href: '/packages' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
];

export const HOME_META = {
  title: 'Website, App & Software Development | Spesio Technologies',
  description:
    'Based in Uttar Pradesh, serving clients across India. Websites, e-commerce stores, Android apps, custom ERP software and AI integrations with full code handover.',
};

/* --------------------------------------------------------------- Legal */

export interface LegalPage {
  slug: 'privacy-policy' | 'terms-and-conditions' | 'refund-and-cancellation-policy' | 'support-and-maintenance-policy';
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
}

const L = SITE.legal;
const UDYAM_NOTE = isPlaceholder(L.udyam) ? '' : ` (Udyam registration: ${L.udyam})`;

export const LEGAL: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'How Spesio Technologies collects, uses and protects personal data from this website, in line with India\'s Digital Personal Data Protection Act, 2023.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `This website is operated by Spesio Technologies, a ${L.entity.toLowerCase()} based in India${UDYAM_NOTE}. For this policy, Spesio Technologies is the data fiduciary for personal data collected through this website.`,
          `Contact: ${SITE.email}, ${SITE.phone}.`,
        ],
      },
      {
        heading: 'Data we collect',
        body: [
          'Contact and enquiry forms: your name, email address, phone number, the service and budget you select, and your message.',
          'Technical data: your IP address, browser type and the time of your visit, which our hosting provider records to keep the site secure and prevent spam.',
          'Analytics: if you accept analytics cookies, we use Google Analytics 4 to understand which pages are visited and how visitors use the site. This data is aggregated and is not used to identify you personally.',
          'Messages you send us by email or WhatsApp, which contain whatever details you choose to share.',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'To reply to your enquiry, prepare a quote or proposal, and deliver and support any project you hire us for.',
          'To keep the website secure and working properly.',
          'With your consent, to measure and improve the website using analytics.',
          'We do not sell or rent your personal data, and we do not use it for third party advertising.',
        ],
      },
      {
        heading: 'Legal basis and consent',
        body: [
          'We process enquiry details because you give them to us for the purpose of contacting us, and analytics data only after you give consent through the cookie banner. You can withdraw consent at any time, and withdrawing consent does not affect processing done before that.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'The website uses a small amount of local browser storage to remember your light or dark mode choice and your cookie choice. These are needed for the site to work as you expect.',
          'Analytics cookies from Google Analytics are only set if you click Accept on the cookie banner. You can change your choice at any time using the Cookie settings link in the footer.',
        ],
      },
      {
        heading: 'How we store and protect it',
        body: [
          'The website is hosted on Vercel. Contact form submissions are delivered to our inbox through Resend. Analytics data, if enabled, is processed by Google. These providers may store data on servers outside India and process it only on our behalf.',
          'We use HTTPS encryption, restrict access to people who need it for your enquiry or project, and use secure, access controlled accounts for email and hosting.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiry details are kept for as long as needed to respond and follow up. If you become a client, we keep project records for the length of our work together and for any period required by law. Analytics data is kept according to the retention period set in Google Analytics.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Under the Digital Personal Data Protection Act, 2023, you can ask us for a summary of the personal data we hold about you, ask us to correct, complete or update it, ask us to erase it, withdraw your consent, and nominate another person to exercise these rights on your behalf.',
          `To make a request, email ${L.grievanceEmail}. We will respond within 30 days.`,
        ],
      },
      {
        heading: 'Grievance officer',
        body: [
          `If you have a concern about how we handle your personal data, contact our grievance officer: ${L.grievanceOfficer}, ${L.grievanceEmail}. If you are not satisfied with our response, you may approach the Data Protection Board of India.`,
        ],
      },
      {
        heading: 'Changes to this policy',
        body: ['If we change this policy, we will update the date shown at the top of this page.'],
      },
    ],
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    description:
      'Terms for hiring Spesio Technologies: scope, payments, timelines, client responsibilities, source code ownership, confidentiality and liability.',
    sections: [
      {
        heading: 'About these terms',
        body: [
          `These terms apply to your use of this website and to projects carried out by Spesio Technologies, a ${L.entity.toLowerCase()}${UDYAM_NOTE}. Each project is also covered by a written proposal that sets out the scope, price, timeline and payment schedule. If the proposal and these terms differ, the proposal applies.`,
        ],
      },
      {
        heading: 'Scope of services',
        body: [
          'We provide website development, web application and custom software development, Android app development, AI integration and automation, and related design, SEO, hosting setup and support services.',
          'The exact features, pages and deliverables for your project are listed in the proposal. Work not listed there is outside the scope and is quoted separately.',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'Work begins after the proposal is accepted and the advance payment is received. Remaining payments are due at the milestones set out in the proposal.',
          'Invoices are payable by the due date stated in your proposal or invoice. Work may pause if a payment is overdue.',
          'Third party costs such as domains, hosting, paid APIs, app store fees and paid plugins are billed to you or paid directly by you, unless the proposal says otherwise.',
        ],
      },
      {
        heading: 'Timelines',
        body: [
          'Timelines in the proposal are estimates based on the agreed scope and on receiving content, feedback and approvals on time. Delays in client inputs or changes to scope will move the timeline.',
        ],
      },
      {
        heading: 'Client responsibilities',
        body: [
          'You agree to provide content, images, logins and feedback needed for the project in good time, to review and approve work at each phase, and to make sure that any content you supply does not infringe anyone else\'s rights.',
        ],
      },
      {
        heading: 'Changes to scope',
        body: [
          'If you request changes or new features outside the agreed scope, we will confirm the extra cost and time in writing before doing the work.',
        ],
      },
      {
        heading: 'Intellectual property and source code',
        body: [
          'Once the project is paid in full, you own the source code, design files and content created specifically for you, and we hand over the code, server access and documentation.',
          'Until full payment is received, ownership stays with Spesio Technologies. Open source libraries, third party software, fonts and services used in the project remain under their own licences.',
          'We may show the finished project in our portfolio, unless you ask us not to in writing.',
        ],
      },
      {
        heading: 'Confidentiality',
        body: [
          'We keep your business information, data and credentials confidential and use them only to deliver your project. We are happy to sign a separate non disclosure agreement if you need one.',
        ],
      },
      {
        heading: 'Support, refunds and cancellation',
        body: [
          'Support after launch is described in our Support and Maintenance Policy. Advance payments, milestones and cancellations are covered by our Refund and Cancellation Policy.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'We build and test our work carefully, but we cannot guarantee that any website or app will be free of all errors or available without interruption, or guarantee specific search rankings or sales results.',
          'We are not liable for indirect or consequential losses, or for problems caused by third party services, hosting outages or changes made by others after handover. Our total liability for any project is limited to the amount paid for that project.',
        ],
      },
      {
        heading: 'Governing law',
        body: [`These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in ${L.jurisdiction}.`],
      },
    ],
  },
  {
    slug: 'refund-and-cancellation-policy',
    title: 'Refund and Cancellation Policy',
    description:
      'How advance payments, milestone payments, refunds and project cancellations work at Spesio Technologies.',
    sections: [
      {
        heading: 'Advance payment',
        body: [
          'Projects start after an advance payment, which is a percentage of the project price stated in your written proposal. The advance reserves our time and covers discovery and planning work.',
          'If you cancel before any work has started, the part of the advance that is refunded is stated in your written proposal. Once discovery or design work has started, the advance is non refundable.',
        ],
      },
      {
        heading: 'Milestone payments',
        body: [
          'The rest of the project price is split into milestones listed in your proposal, such as design approval, development phases and launch. Each milestone payment is due when that milestone is delivered.',
          'Milestone payments for work that has been delivered and approved are non refundable.',
        ],
      },
      {
        heading: 'Cancelling a project',
        body: [
          'You can cancel a project at any time by telling us in writing. You pay for work completed up to the date of cancellation, calculated against the milestones in your proposal. Any amount paid for work not yet started is refunded.',
          'On cancellation, we hand over the work completed and paid for up to that point.',
        ],
      },
      {
        heading: 'If we need to cancel',
        body: [
          'If we are unable to continue a project, we refund any amount paid for work not yet delivered and hand over all completed work.',
        ],
      },
      {
        heading: 'Third party costs',
        body: [
          'Payments made to third parties on your behalf, such as domains, hosting, paid APIs and app store fees, are not refundable by us.',
        ],
      },
      {
        heading: 'Support plans',
        body: [
          'Monthly or yearly support plans can be cancelled before the next billing period. Amounts already paid for the current period are not refunded.',
        ],
      },
      {
        heading: 'How refunds are paid',
        body: [
          `Approved refunds are paid to the original payment method or bank account on the date we confirm in writing when the refund is approved. To request a refund or cancellation, email ${SITE.email}.`,
        ],
      },
    ],
  },
  {
    slug: 'support-and-maintenance-policy',
    title: 'Support and Maintenance Policy',
    description:
      'What bug and security support is included after launch at Spesio Technologies, and what is covered by paid support plans.',
    sections: [
      {
        heading: 'Included after launch',
        body: [
          'Every website and app package includes three months of free support, starting from the launch date. This covers:',
          'Bug fixes: anything that does not work as agreed in the proposal.',
          'Security updates: updating frameworks and libraries when security fixes are released, and fixing security issues in code we wrote.',
          'Small changes: minor text, image and layout updates that take a small amount of time each month, as agreed in your proposal.',
        ],
      },
      {
        heading: 'Not included in free support',
        body: [
          'New features, new pages or changes to how the system works.',
          'Problems caused by changes made by you or another developer after handover.',
          'Third party outages or changes, such as payment gateways, hosting providers or APIs changing how they work.',
          'Content entry, design changes and marketing work.',
          'These can be quoted separately or covered by a paid support plan.',
        ],
      },
      {
        heading: 'Paid support plans',
        body: [
          'After the free period, you can choose a monthly or yearly support plan. Plans can include ongoing bug and security fixes, framework and dependency updates, uptime and backup checks, performance and SEO reviews, and a set number of hours for small changes each month.',
          'Plan names and prices are shared on request and confirmed in writing before you sign up.',
        ],
      },
      {
        heading: 'Response times',
        body: [
          `Support requests can be sent to ${SITE.email} or on WhatsApp at ${SITE.phone} during ${SITE.hours}. We prioritise urgent issues, such as the site being down, and reply to other requests in the order we receive them. Target response times are confirmed in your proposal or support plan.`,
        ],
      },
      {
        heading: 'Backups and hosting',
        body: [
          'Where we set up hosting for you, we configure automatic backups and monitoring. Hosting accounts are in your name, so you always keep access to your site and data.',
        ],
      },
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);

/** All indexable routes. Used by the prerender script and the sitemap. */
export const routes = (): string[] => [
  '/',
  '/services',
  '/packages',
  '/process',
  '/about',
  '/contact',
  AREAS_PATH,
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...PROJECTS.map((p) => `/work/${p.slug}`),
  ...LEGAL.map((l) => `/${l.slug}`),
];

// Single source of truth for all site copy and facts.
// Everything here is something the codebase or the owner can verify.
// Used by the UI, by src/seo.ts, and by scripts/prerender.ts (so keep it free of DOM/React imports).

export const SITE = {
  name: 'Spesio Technologies',
  shortName: 'Spesio',
  url: 'https://spesio-technologies.vercel.app',
  locale: 'en_IN',
  themeColor: '#800020',
  email: 'spesiotechnologies@gmail.com',
  phone: '+91 8957833269',
  phoneHref: 'tel:+918957833269',
  whatsappHref: 'https://wa.me/918957833269',
  location: 'Greater Noida, India',
  founder: {
    name: 'Soaib Akhtar',
    role: 'Founder',
    line: 'Soaib Akhtar founded Spesio and builds its products hands-on, from first sketch to launch.',
  },
} as const;

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  /** One line for the list on the home page. */
  summary: string;
  /** Short paragraph for the case-study page. */
  overview: string;
  capabilities: string[];
  stack: string[];
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'property-planet',
    number: '01',
    name: 'Property Planet',
    category: 'Real Estate · Web Platform',
    summary: 'A marketplace for plots and land, with map browsing and an admin-controlled listing flow.',
    overview:
      'A property marketplace where sellers and agents list plots and land, and buyers browse on a map and send enquiries. Every listing is reviewed by an admin before it goes public, and seller contact details are not handed out automatically.',
    capabilities: [
      'Map-based property browsing',
      'Admin approval before a listing becomes public',
      'Self-service seller registration',
      'One dashboard for both buying and selling activity',
      'Lead handling with admin oversight of enquiries',
    ],
    stack: ['Next.js', 'Supabase', 'Google Maps'],
  },
  {
    slug: 'campusbite',
    number: '02',
    name: 'CampusBite',
    category: 'Food Tech · Mobile Platform',
    summary: 'A native Android app for ordering food on campus and managing pickup queues.',
    overview:
      'A native Android app that lets students order food on campus and helps outlets manage queues and time slots. Order creation runs on the server, so prices and slot capacity cannot be altered from the client.',
    capabilities: [
      'Server-side order creation using transactional Cloud Functions',
      'Time-slot capacity management',
      'Push notifications for order updates',
      'Admin and staff dashboards',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions'],
  },
  {
    slug: 'eifa-couture',
    number: '03',
    name: 'Eifa Couture',
    category: 'E-commerce · Digital Experience',
    summary: 'A luxury Chikankari storefront with online payments and a full admin back office.',
    overview:
      'An e-commerce storefront for a luxury Chikankari fashion label, with online payments, order history and an admin back office for inventory, refunds and finance reporting.',
    capabilities: [
      'Razorpay payment integration',
      'Order confirmation and account order history',
      'Refund management',
      'Admin finance reporting with CSV export',
      'Inventory, category and hero-banner management',
      'Account sign-in with Google',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Razorpay'],
    liveUrl: 'https://eifa-couture-ds3d-theta.vercel.app/',
  },
];

export const getProject = (slug: string): Project | undefined => PROJECTS.find((p) => p.slug === slug);

export const HERO = {
  eyebrow: 'Spesio Technologies / Digital Product Studio',
  headline: 'We turn ambitious ideas into digital products.',
  sub: 'A founder-led studio building websites, web applications, Android apps and AI integrations for ambitious businesses.',
  primaryCta: 'Start a project',
  secondaryCta: 'See selected work',
};

export interface Service {
  number: string;
  title: string;
  line: string;
  capabilities: string[];
}

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Digital Products',
    line: 'Custom software built around how your business actually works.',
    capabilities: ['Custom software', 'Dashboards', 'Internal tools'],
  },
  {
    number: '02',
    title: 'Web Experiences',
    line: 'Fast, well-built websites and web applications.',
    capabilities: ['Business websites', 'Web applications', 'E-commerce'],
  },
  {
    number: '03',
    title: 'Mobile Applications',
    line: 'Native Android apps, from first release to ongoing updates.',
    capabilities: ['Native Android', 'Backend and cloud integration', 'Push notifications'],
  },
  {
    number: '04',
    title: 'AI & Automation',
    line: 'Practical AI and automation added where it saves real time.',
    capabilities: ['Assistants and guided flows', 'Workflow automation', 'Third-party AI API integration'],
  },
];

export const STUDIO = {
  headline: 'Founder-led. Built to be owned.',
  statements: [
    'You work directly with the engineer building your product.',
    'You own the code, data and platform.',
    'Support continues after launch.',
  ],
};

export const PROCESS = [
  { number: '01', title: 'Discover', line: 'We agree on what to build, for whom, and what done looks like.' },
  { number: '02', title: 'Build', line: 'Iterative development with working builds you can review along the way.' },
  { number: '03', title: 'Launch & support', line: 'We ship it, then stay on for fixes and updates.' },
];

export const CONTACT = {
  headline: "Have an idea? Let's build it.",
  /** Service options for the form's select. */
  services: SERVICES.map((s) => s.title).concat('Not sure yet'),
};

export const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
];

export const HOME_META = {
  title: 'Spesio Technologies | Digital Product Studio',
  description:
    'Founder-led digital product studio building websites, web applications, Android apps and AI integrations. Based in Greater Noida, India.',
};

/** All indexable routes. Used by the prerender script and the sitemap. */
export const routes = (): string[] => ['/', ...PROJECTS.map((p) => `/work/${p.slug}`)];

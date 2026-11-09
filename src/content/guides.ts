// Guides (answer-first articles) and the "areas we serve" page.
// Self-contained on purpose: site.ts imports this file, so it must not import site.ts.
// Style rule: no em dashes in copy. Do not add prices or claims the business has not confirmed.

export const GUIDES_PATH = "/guides";
export const AREAS_PATH = "/areas-we-serve";
export const CONTENT_PUBLISHED = "2026-11-09";
export const CONTENT_UPDATED = "2026-11-09";

export interface Guide {
  slug: string;
  title: string;
  /** Meta description, about 150 characters. */
  description: string;
  /** Direct answer shown first, 40 to 60 words. Quoted by AI answer engines. */
  answer: string;
  published: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-to-choose-a-website-developer-in-india",
    title: "How to choose a website developer in India",
    description:
      "Six checks that separate a reliable website developer from a risky one: live work, written scope, code ownership, support, direct access and SEO.",
    answer:
      "Choose a website developer by checking six things: live projects you can open, a written scope and price, who owns the code after payment, what support is included after launch, whether you speak directly to the person building it, and whether the site is set up for search. Ignore claims of being the best and verify these instead.",
    published: CONTENT_PUBLISHED,
    updated: CONTENT_UPDATED,
    sections: [
      {
        heading: "1. Look at live work, not only screenshots",
        body: [
          "Ask for links to websites the developer has built for real clients and open them on your phone. Check how fast they load, whether the layout works on a small screen, and whether forms, payments and search actually work.",
          "Live projects show how a site behaves in real use. Screenshots and design mockups do not.",
        ],
      },
      {
        heading: "2. Get the scope and price in writing",
        body: [
          "A proper proposal lists the pages, features, timeline and payment milestones. A single number with no scope is a warning sign, because every extra request can then become an argument.",
          "Ask what is not included, such as content writing, photography, paid plugins or hosting, so there are no surprises later.",
        ],
      },
      {
        heading: "3. Confirm you own the code, domain and hosting",
        body: [
          "The domain, hosting and database accounts should be in your name, and the full source code should be handed over when you have paid. If the developer keeps control of these, moving to another developer later becomes slow and expensive.",
        ],
      },
      {
        heading: "4. Ask what happens after launch",
        body: [
          "Websites need bug fixes and security updates. Ask how long free support lasts, exactly what it covers, and what a paid support plan includes once the free period ends.",
        ],
      },
      {
        heading: "5. Check who actually does the work",
        body: [
          "Some agencies pass projects to other people. Ask who will build your site and whether you can talk to that person directly. Direct access means faster answers and fewer misunderstandings.",
        ],
      },
      {
        heading: "6. Check that the site is set up for search",
        body: [
          "A good developer builds in fast loading, mobile friendly layouts, clear page titles and descriptions, a sitemap and structured data from the start. Be careful with anyone who guarantees a Google ranking, because nobody can.",
        ],
      },
      {
        heading: "Where Spesio Technologies fits",
        body: [
          "Spesio Technologies is a founder-led web and app studio in Greater Noida that works with clients across India. You get a written quote within one working day, you work directly with the engineer building your product, the source code and server access are handed over on full payment, and six months of bug and security support are included after launch.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much should a business website cost in India?",
        answer:
          "The cost depends on the number of pages, features such as payments or an admin panel, and the amount of custom design. A fixed price without a written scope is a warning sign. Ask for a written quote that lists exactly what is included and what is not.",
      },
      {
        question: "Is a freelancer or an agency better for a website?",
        answer:
          "Neither is automatically better. Judge each by live work, written scope, code ownership and support after launch. A small founder-led studio gives you direct access to the engineer, while a larger agency may offer more people. Choose based on the size of your project.",
      },
    ],
  },
  {
    slug: "website-vs-web-app-vs-android-app",
    title: "Website, web app or Android app: which do you need?",
    description:
      "How to choose between a business website, a web app and an Android app, with three questions to decide and a phased way to start small.",
    answer:
      "Choose a website when customers need to find and contact you, a web app when staff or customers need to log in and manage data, and an Android app when you need phone features or daily repeat use. Many businesses start with a website and add the other two in phases.",
    published: CONTENT_PUBLISHED,
    updated: CONTENT_UPDATED,
    sections: [
      {
        heading: "When a website is enough",
        body: [
          "If your goal is to be found on Google, show your services or products, and collect enquiries or orders, a business website or online store is the right start. It works on every phone and computer without installing anything.",
        ],
      },
      {
        heading: "When you need a web application",
        body: [
          "A web app is for work that happens behind a login: booking systems, customer portals, dashboards, inventory and order tracking, CRM and ERP tools. If your team is managing this in spreadsheets and messages, a web app can replace that with one system and role based access.",
        ],
      },
      {
        heading: "When an Android app makes sense",
        body: [
          "A native Android app is worth it when people will use your product often, or when you need phone features such as push notifications, the camera or location. In India, where most users are on Android, an app can suit food ordering, delivery, learning and community products.",
        ],
      },
      {
        heading: "Three questions to decide",
        body: [
          "Who needs to use it: only your team, your customers, or both? How often will they use it: once, monthly or daily? Does it need phone features that a browser cannot give you?",
          "If the answers are customers, occasionally and no, start with a website. If they are your team, daily and no, build a web app. If they are customers, daily and yes, plan an Android app.",
        ],
      },
      {
        heading: "Start small and add in phases",
        body: [
          "You do not have to build everything at once. Launch the core features first, learn from real users, then add new features step by step. A website, web app and Android app can also share one backend, so the work you do first is not wasted.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I start with a website and add an app later?",
        answer:
          "Yes. Build the website first, and design the backend so that a web app or Android app can use the same data later. This keeps the first launch fast and the later additions cheaper.",
      },
      {
        question: "Do I need both a web app and an Android app?",
        answer:
          "Not always. If your users mainly work on phones, an Android app may be enough. If your team works on computers, a web app may be enough. Many projects use both, sharing one backend.",
      },
    ],
  },
  {
    slug: "ai-chatbot-for-business-website",
    title: "How to add an AI chatbot to your business website",
    description:
      "What an AI chatbot can and cannot do for a business, what to prepare, where it can run (website or WhatsApp), and how to handle privacy and wrong answers.",
    answer:
      "An AI chatbot can answer customer questions from your own content, collect enquiries and hand over to a person when it is unsure. It does not replace your team. The key choices are what content it learns from, where it runs, such as your website or WhatsApp, and how it hands over to a human.",
    published: CONTENT_PUBLISHED,
    updated: CONTENT_UPDATED,
    sections: [
      {
        heading: "What an AI chatbot can do",
        body: [
          "A chatbot trained on your own content can answer common questions about services, timings, policies and products at any hour. It can collect a visitor's name and requirement, send the enquiry to your email or CRM, and book calls.",
        ],
      },
      {
        heading: "What it should not do",
        body: [
          "A chatbot should not make promises about prices, refunds or legal terms unless those answers come from your approved content. It should say when it does not know and offer to connect the visitor with a person.",
        ],
      },
      {
        heading: "What to prepare before you start",
        body: [
          "Gather your FAQs, service descriptions, policies and product information in one place. Decide who receives handovers and how fast they will reply. The quality of the chatbot depends mostly on the quality of this content.",
        ],
      },
      {
        heading: "Where the chatbot can run",
        body: [
          "A chatbot can sit on your website as a chat widget, or connect to WhatsApp through the WhatsApp Business platform, where WhatsApp's own approval and messaging rules apply. Many businesses start on the website and add WhatsApp later.",
        ],
      },
      {
        heading: "Privacy and data",
        body: [
          "Chat messages are processed by an AI provider such as OpenAI, Google Gemini or Anthropic Claude through their APIs. Tell visitors that a chatbot is in use, avoid collecting sensitive data in chat, and update your privacy policy to describe how chat data is handled.",
        ],
      },
      {
        heading: "How a chatbot project runs",
        body: [
          "A typical project maps the questions people ask, builds the chatbot on your approved content, tests it with real questions, launches it, and then reviews the conversations to fix gaps. The review step is what makes a chatbot improve over time.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can an AI chatbot work on WhatsApp?",
        answer:
          "Yes. A chatbot can be connected to WhatsApp through the WhatsApp Business platform. WhatsApp's approval process and messaging rules apply, so plan for setup time and for the message types you are allowed to send.",
      },
      {
        question: "Will the chatbot give wrong answers?",
        answer:
          "It can. You reduce the risk by limiting it to your approved content, testing it with real customer questions before launch, and letting it hand over to a person when it is unsure. Reviewing conversations after launch keeps improving it.",
      },
    ],
  },
  {
    slug: "website-seo-and-ai-search-checklist",
    title: "SEO and AI search checklist for small businesses",
    description:
      "A practical checklist to get found on Google and quoted by AI assistants: crawlable pages, direct answers, structured data and fresh content.",
    answer:
      "To be found on Google and cited by AI assistants, make pages readable as plain HTML, let crawlers in, answer real questions directly, add structured data, keep your business details consistent everywhere, and keep content fresh. Nobody can guarantee rankings or citations, but these steps remove the common blockers.",
    published: CONTENT_PUBLISHED,
    updated: CONTENT_UPDATED,
    sections: [
      {
        heading: "1. Make pages readable without JavaScript",
        body: [
          "Many AI crawlers do not run JavaScript well. Render your pages to HTML on the server or at build time so the full text is in the page source, and do not hide key content behind tabs or animations that only load in the browser.",
        ],
      },
      {
        heading: "2. Let search and AI crawlers in",
        body: [
          "Check that robots.txt and any firewall or bot protection do not block search and retrieval crawlers such as Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot and Claude-SearchBot. Publish an XML sitemap and submit it in Google Search Console and Bing Webmaster Tools.",
        ],
      },
      {
        heading: "3. Answer real questions directly",
        body: [
          "Write headings as the questions your customers ask, and put a short, direct answer of about 40 to 60 words right under each one. Then add detail below. Include FAQ sections with specific answers, because vague marketing copy is rarely quoted.",
        ],
      },
      {
        heading: "4. Add structured data",
        body: [
          "Use JSON-LD to describe your business (Organization or LocalBusiness), your services, your FAQs, your articles and your breadcrumbs. Validate it with Google's Rich Results Test and the Schema.org validator.",
        ],
      },
      {
        heading: "5. Keep your business details consistent",
        body: [
          "Use the same business name, city, phone number and description on your website, Google Business Profile, LinkedIn and directory listings. Consistent details help search engines and AI systems trust that they are describing one real business.",
        ],
      },
      {
        heading: "6. Show freshness and authorship",
        body: [
          "Show a last updated date on important pages, name the author of articles and keep key pages current. Real dates should change only when the content really changes.",
        ],
      },
      {
        heading: "7. Earn mentions and reviews elsewhere",
        body: [
          "Rankings for searches such as best developer in a city depend on reviews, links, mentions on other sites and competition. A complete Google Business Profile, genuine client reviews and useful articles help more than any technical setting.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does llms.txt help me rank in AI search?",
        answer:
          "It is a low-cost convention for describing your site to AI tools, but major AI providers have not confirmed that they use it for ranking or citation. Treat it as a small extra, and put your effort into content, structured data and consistent business details.",
      },
      {
        question: "Can anyone guarantee a top ranking on Google or ChatGPT?",
        answer:
          "No. Rankings and AI citations depend on competition, content quality, reviews, links and systems that keep changing. Good technical setup removes blockers, but it does not guarantee a position.",
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

/* ----------------------------------------------------------- Areas served */

export const AREA_GROUPS: { region: string; cities: string[] }[] = [
  { region: "Delhi NCR", cities: ["Delhi", "Noida", "Greater Noida", "Gurgaon", "Ghaziabad", "Faridabad"] },
  { region: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Varanasi", "Gorakhpur", "Kushinagar", "Prayagraj", "Agra", "Meerut"] },
  { region: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
  { region: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  { region: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
  { region: "Madhya Pradesh", cities: ["Indore", "Bhopal", "Gwalior", "Jabalpur"] },
  { region: "Odisha", cities: ["Bhubaneswar", "Cuttack", "Rourkela"] },
  { region: "Bihar and Jharkhand", cities: ["Patna", "Ranchi", "Jamshedpur"] },
  { region: "West Bengal", cities: ["Kolkata", "Siliguri"] },
  { region: "South India", cities: ["Bengaluru", "Hyderabad", "Chennai", "Coimbatore", "Kochi"] },
  { region: "Punjab, Haryana and Uttarakhand", cities: ["Chandigarh", "Ludhiana", "Amritsar", "Dehradun"] },
];

export const AREAS = {
  title: "Website, app and AI development for businesses across India",
  seoTitle: "Areas We Serve: Website and App Developers Across India",
  description:
    "Spesio Technologies builds websites, web apps, Android apps and AI integrations for businesses in every Indian city, working remotely from Greater Noida.",
  answer:
    "Spesio Technologies is based in Greater Noida and works remotely with businesses in every Indian city, including Delhi, Mumbai, Ahmedabad, Indore, Jaipur, Lucknow, Gorakhpur and Bhubaneswar. Projects run over calls, WhatsApp and shared links, so the process is the same wherever you are. In person meetings are possible in Delhi NCR.",
  steps: [
    "A discovery call by phone or video to understand your business and goals.",
    "A written proposal and quote with scope, timeline and payment milestones, sent within one working day of your requirements.",
    "Phased delivery, with progress shared through live links so you can review from your own city.",
    "Handover of the full source code, server access and documentation on full payment, followed by six months of free bug and security support.",
  ],
  faqs: [
    {
      question: "Can you build a website or app for a business in my city?",
      answer:
        "Yes. Spesio works remotely with clients in any Indian city, including Delhi, Mumbai, Ahmedabad, Indore, Jaipur, Lucknow, Gorakhpur and Bhubaneswar. We talk on calls and WhatsApp, share progress through links, and hand over the full source code at the end. In person meetings are possible in Delhi NCR.",
    },
    {
      question: "Do you have an office in my city?",
      answer:
        "No. Spesio is a remote, founder-led studio based in Greater Noida, and we do not have offices in other cities. Clients receive the same service and direct access to the engineer wherever they are.",
    },
    {
      question: "Will working remotely make the project slower?",
      answer:
        "No. Requirements, designs and progress are shared online, and you review live versions instead of waiting for meetings. Most business websites launch in two to four weeks, and larger projects take four to ten weeks depending on scope.",
    },
  ],
};

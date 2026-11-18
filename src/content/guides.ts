// The "areas we serve" page data. The old guides were removed in the Phase 2 content cut.
// Self-contained on purpose: site.ts imports this file, so it must not import site.ts.
// Style rule: no em dashes in copy. Do not add prices or claims the business has not confirmed.

export const AREAS_PATH = "/areas-we-serve";
export const CONTENT_PUBLISHED = "2026-11-09";
export const CONTENT_UPDATED = "2026-11-09";

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
    "Spesio Technologies builds websites, Android apps, custom software and AI integrations for businesses all over India, from Greater Noida.",
  answer:
    "We serve businesses all over India, from Greater Noida, Delhi NCR and Uttar Pradesh to Mumbai, Bengaluru, Kolkata and beyond. Every project runs over calls, WhatsApp and shared links, so the experience is the same wherever you are.",
  steps: [
    "A short call to understand your business and goals.",
    "A written scope, timeline and quote.",
    "Progress shared through live links you can review from your own city.",
    "Handover of the full source code, followed by three months of free support.",
  ],
  faqs: [
    {
      question: "Can you build for a business in my city?",
      answer:
        "Yes. We work with clients in every Indian city, including Delhi, Mumbai, Gorakhpur, Kushinagar and Bhubaneswar. We meet in person in Delhi NCR.",
    },
    {
      question: "Do you have an office in my city?",
      answer:
        "No. We are a remote studio based in Greater Noida. You get the same service and direct access to the engineer wherever you are.",
    },
    {
      question: "Does working remotely make the project slower?",
      answer:
        "No. You review live versions instead of waiting for meetings. Most business websites launch in two to four weeks.",
    },
  ],
};

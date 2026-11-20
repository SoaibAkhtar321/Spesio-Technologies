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
  title: "Website, app and AI development across Uttar Pradesh, Delhi NCR and all of India",
  seoTitle: "Areas We Serve: Uttar Pradesh, Delhi NCR and All Over India | Spesio",
  description:
    "Based in Uttar Pradesh. Spesio Technologies serves businesses in Greater Noida, Noida, Delhi, Delhi NCR, Gorakhpur, Kushinagar and all over India.",
  answer:
    "Based in Uttar Pradesh. Serving businesses across Delhi NCR and all over India. From Greater Noida, Noida and Delhi to Gorakhpur, Kushinagar, Mumbai, Bengaluru and beyond, every project runs remotely over calls, WhatsApp and shared live links.",
  steps: [
    "A discovery call to understand your business, goals and project requirements.",
    "A written project scope, timeline and milestone plan.",
    "Progress shared through live preview links you can review from any city.",
    "Full source code and account handover, followed by up to 3 months of free maintenance and support.",
  ],
  faqs: [
    {
      question: "Can you build for a business in my city?",
      answer:
        "Yes. We work remotely with businesses across India, including Greater Noida, Noida, Delhi, Delhi NCR, Gorakhpur, Kushinagar, Lucknow, Mumbai and Bengaluru, and can meet in person in Delhi NCR when needed.",
    },
    {
      question: "Do you have physical offices in every city listed?",
      answer:
        "No. Spesio Technologies operates as a remote studio based in Greater Noida, Uttar Pradesh. Remote collaboration gives you direct access to the engineer building your product without agency overhead.",
    },
    {
      question: "Does working remotely make the project slower?",
      answer:
        "No. You review live versions instead of waiting for meetings. Most business websites launch in two to four weeks.",
    },
  ],
};

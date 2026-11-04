// Add real, approved projects here. Never add concept work without labelling it, and never invent results.
//
// Images: drop files into  public/work/<slug>/  and they appear automatically (no code change).
//   header.(png|jpg|webp)  -> top of the site (also used as the card cover)
//   footer.(png|jpg|webp)  -> bottom of the site
//   contact.(png|jpg|webp) -> closing image, just above the contact band
//   Website projects:  01-<name>.png, 02-<name>.png ... -> the extra screens listed in `screens`, in order
//   Branding projects: 01-<name>.png ... -> one per item in `servicesDelivered`, matched by position
//   Run  npm run images:setup  to create every folder and print the exact file names.
export const projectCategories = ["Branding", "Websites", "Web Applications", "Mobile Applications", "Motion Design", "Video Production"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  client?: string;
  role?: string;
  sector?: string;
  summary: string;
  objective?: string;
  servicesDelivered?: string[];
  screens?: string[]; // website projects: names of the extra screens (after header, before footer), matched by position
  challenge?: string;
  solution?: string;
  outcomes?: string[]; // verified outcomes only
  image?: string;
  url?: string;
  concept?: boolean; // true = not a commissioned client project
};

export const projects: Project[] = [
  // Branding portfolio (personal concept projects, labelled as concepts). Images: public/work/<slug>/header.png, 1.png, 2.png ...
  {
    slug: "sunvia",
    title: "Sunvia",
    category: "Branding",
    sector: "Solar / Renewable energy",
    role: "Brand Identity Designer",
    summary: "A brand identity concept for a solar and renewable energy company, from logo research through to application mockups.",
    servicesDelivered: [
      "Logo research and conceptual exploration",
      "Logo sketching and ideation",
      "Logo formation and construction",
      "Logo grid system and geometry",
      "Logo variations (primary, secondary and symbol)",
      "Brand colour palette development",
      "Typography selection and hierarchy",
      "Brand graphic elements and patterns",
      "Logo clear space and minimum size",
      "Logo usage and placement",
      "Stationery design",
      "Brand application mockups",
      "Brand identity presentation",
    ],
    concept: true,
  },
  {
    slug: "morova",
    title: "Morova",
    category: "Branding",
    sector: "Fintech",
    role: "Brand Identity Designer",
    summary: "A brand identity concept for a fintech brand, covering the logo system, colour, typography and usage rules.",
    servicesDelivered: [
      "Brand research and visual exploration",
      "Logo conceptualisation and sketching",
      "Logo formation and refinement",
      "Geometric logo construction",
      "Logo grid and proportion system",
      "Primary and secondary logo variations",
      "Brand colour system",
      "Typography system",
      "Brand visual elements",
      "Logo clear space and sizing",
      "Brand consistency and usage rules",
      "Brand identity presentation",
    ],
    concept: true,
  },
  {
    slug: "asaf-hub",
    title: "ASAF Hub",
    category: "Branding",
    sector: "Corporate / Multi-sector organisation",
    role: "Brand Identity Designer",
    summary: "A corporate brand identity concept for a multi-sector organisation, with a parent brand direction and sub-brand exploration.",
    servicesDelivered: [
      "Corporate brand research",
      "Parent brand visual direction",
      "Logo conceptualisation",
      "Logo construction and refinement",
      "Logo grid system",
      "Primary and secondary logo arrangements",
      "Corporate colour palette",
      "Typography system",
      "Sub-brand visual identity exploration",
    ],
    concept: true,
  },
  {
    slug: "asaf-international",
    title: "ASAF International",
    category: "Websites",
    client: "ASAF International Limited",
    summary: "A corporate website for a Nigerian multi-sector group spanning agriculture, technology, energy and real estate.",
    objective: "Present one group with several divisions as a single, credible company online.",
    servicesDelivered: ["Website design"],
    screens: ["Homepage", "Divisions page"],
    solution:
      "A divisions-led site: a clear homepage, a page for each division (Smart Agriculture, TechSolutions, EnergyWorks and Properties), About and Leadership pages, News & Insights, a filterable Gallery, downloadable registration certificates and easy contact through email and WhatsApp.",
    url: "https://asafhub.com/",
  },
  {
    slug: "emyjay-personal-care",
    title: "Emyjay Personal Care Products",
    category: "Websites",
    client: "Emyjay Personal Care Products Hub",
    summary: "An online shop for personal-care, oral-care and wellness products, with worldwide delivery.",
    objective: "Let customers browse the range and order without needing an account.",
    servicesDelivered: ["Website design"],
    screens: ["Homepage", "Product catalogue"],
    solution:
      "A simple shop: a searchable product catalogue, featured collections, a cart, a plain four-step 'How it works' guide, and WhatsApp ordering and chat for customers who prefer to talk first.",
    url: "https://emyjaypersonalcareproducts.store",
  },
  {
    slug: "gramex-logistics",
    title: "Gramex Logistics",
    category: "Websites",
    client: "Gramex Logistics Ltd",
    summary: "A website for a Lagos logistics company covering interstate and local delivery, trucking and international express.",
    objective: "Make it quick for businesses and individuals to understand the services and ask for a price.",
    servicesDelivered: ["Website design"],
    screens: ["Homepage", "Quote and shipping calculator"],
    solution:
      "A service-led site with a quote request form, a shipping calculator, shipment tracking for partner carriers, fleet and 'How it works' sections, shipping guides, customer reviews and a WhatsApp chat widget.",
    url: "https://gramexlogistics.com/",
  },
];

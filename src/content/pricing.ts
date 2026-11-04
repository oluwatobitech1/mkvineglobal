// Prices are in GBP. Change them here and every page updates.
export type Package = {
  slug: string;
  name: string;
  min: number;
  max: number;
  summary: string;
  features: string[];
  note?: string;
  featured?: boolean;
};

export const PRICE_NOTE =
  "Prices are indicative starting ranges and may vary according to project requirements, complexity, deliverables, and timeline. A final quotation will be provided after reviewing your project.";

export const packages: Package[] = [
  {
    slug: "core-brand-suite",
    name: "Core Brand Suite",
    min: 250,
    max: 500,
    summary: "The essentials of a distinctive brand identity.",
    features: [
      "Custom logo design",
      "Brand colour palette",
      "Typography recommendations",
      "Core brand identity assets",
      "Basic brand usage guidance",
    ],
  },
  {
    slug: "essential-web-package",
    name: "Essential Web Package",
    min: 400,
    max: 900,
    summary: "A responsive website for your business.",
    features: [
      "Responsive website design and development",
      "Mobile optimisation",
      "Core website pages",
      "Contact form or contact integrations",
      "Basic SEO setup",
      "Initial testing before launch",
    ],
    note: "Hosting, domain registration, premium plugins, paid third-party services and additional functionality are priced separately where applicable.",
  },
  {
    slug: "motion-media-package",
    name: "Motion & Media Package",
    min: 150,
    max: 500,
    summary: "Video and animated graphics for your campaigns.",
    features: [
      "Video editing or motion design",
      "Promotional visual content",
      "Animated graphics",
      "Exported files in agreed formats and dimensions",
    ],
  },
  {
    slug: "app-play-store-package",
    name: "App & Play Store Package",
    min: 1000,
    max: 2500,
    summary: "A mobile app, from planning through Google Play.",
    features: [
      "Application planning and UI/UX",
      "Development based on agreed requirements",
      "Testing and bug fixing within scope",
      "Google Play deployment assistance",
    ],
    note: "Platform coverage, publishing responsibilities, developer account fees, maintenance and third-party costs are clarified in the agreed scope.",
  },
  {
    slug: "complete-agency-launch",
    name: "Complete Agency Launch Package",
    min: 1800,
    max: 3500,
    summary: "Brand, website, app and motion, launched together.",
    features: [
      "Brand identity development",
      "Custom website design and development",
      "Mobile application development within an agreed scope",
      "Promotional motion graphics or videos",
      "Coordinated brand presentation",
      "Testing and launch support",
    ],
    note: "This package requires an individually agreed scope.",
    featured: true,
  },
];

export const additionalServices = [
  "Website management",
  "Performance optimisation",
  "Security and maintenance",
  "UI/UX consulting",
  "Digital product strategy",
  "Content and campaign design",
  "Technical support",
  "Monthly website care plans",
  "Application maintenance",
];

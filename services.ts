// Single source of truth for services. Edit here; pages update automatically.
export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  features: string[];
  notes?: string[];
  packageSlug?: string;
  icon: "palette" | "code" | "phone" | "film" | "support";
};

export const services: Service[] = [
  {
    slug: "brand-identity",
    title: "Brand Identity & Graphic Design",
    short: "Logos, colour systems, typography and the assets that make a business recognisable.",
    intro:
      "We design brand identities that are clear, consistent and ready to use across print, web and social, from the logo to the guidance for applying it.",
    features: [
      "Custom logo design",
      "Brand colour palette",
      "Typography recommendations",
      "Core brand identity assets",
      "Basic brand usage guidance",
      "Marketing materials and visual systems",
    ],
    packageSlug: "core-brand-suite",
    icon: "palette",
  },
  {
    slug: "web-development",
    title: "Web Design & Software Development",
    short: "Responsive websites and custom web applications, designed and built by the same team.",
    intro:
      "From business websites to custom web applications, we design and build for usability, speed and maintainability, and test before launch.",
    features: [
      "Responsive website design and development",
      "Mobile optimisation",
      "Core website pages",
      "Contact form or contact integrations",
      "Basic SEO setup",
      "E-commerce and custom software, scoped individually",
      "Initial testing before launch",
    ],
    notes: [
      "Hosting, domain registration, premium plugins, paid third-party services and additional functionality are separate items where applicable.",
    ],
    packageSlug: "essential-web-package",
    icon: "code",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps & Google Play Publishing",
    short: "Application planning, UI/UX, development and help getting your app onto Google Play.",
    intro:
      "We plan, design and build mobile applications around agreed requirements, then help you through the Google Play publishing process.",
    features: [
      "Application planning and UI/UX",
      "Development based on agreed requirements",
      "Testing and bug fixing within scope",
      "Google Play deployment assistance",
    ],
    notes: [
      "Platform coverage, publishing responsibilities, developer account fees, maintenance and third-party costs are clarified in the agreed scope.",
    ],
    packageSlug: "app-play-store-package",
    icon: "phone",
  },
  {
    slug: "motion-design",
    title: "Motion Design & Video Production",
    short: "Video editing, animated graphics and promotional content in the formats you need.",
    intro:
      "We create motion graphics and edited video that carry your brand across social, web and campaigns, exported in the formats and dimensions you agree.",
    features: [
      "Video editing or motion design",
      "Promotional visual content",
      "Animated graphics",
      "Exported files in agreed formats and dimensions",
    ],
    packageSlug: "motion-media-package",
    icon: "film",
  },
  {
    slug: "digital-solutions",
    title: "Digital Solutions & Support",
    short: "Ongoing management, optimisation, security and strategy for your digital products.",
    intro:
      "Once you launch, we can keep things running well, from maintenance and performance work to strategy and design consulting.",
    features: [
      "Website management",
      "Performance optimisation",
      "Security and maintenance",
      "UI/UX consulting",
      "Digital product strategy",
      "Content and campaign design",
      "Technical support",
      "Monthly website care plans",
      "Application maintenance",
    ],
    icon: "support",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

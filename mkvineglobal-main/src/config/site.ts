// Single source of truth for site-wide info. Leave contact/social values empty until approved.
export const site = {
  name: "MKVine Design Agency",
  tagline: "We build brands, digital products, and creative experiences that move businesses forward.",
  description:
    "MKVine Design Agency combines creative strategy, design, and technology to help businesses build distinctive brands and powerful digital products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Fill these in once verified. Empty values are hidden from the UI.
  contact: { email: "Osenih70@gmail.com", phone: "", whatsapp: "https://wa.me/447523640950", address: "" },
  // true: every project image slot shows a labelled frame until its picture is uploaded (work in progress).
  // false: slots without a picture are hidden. Switch to false when you are ready to launch.
  showImagePlaceholders: true,
  social: {
    instagram: "https://www.instagram.com/mkvine_creative/",
    facebook: "https://www.facebook.com/share/19Sos5weCR/",
    tiktok: "https://www.tiktok.com/@mkvine.design.age",
    x: "https://x.com/MkvineDes",
    linkedin: "",
    youtube: "",
  } as Record<string, string>,
};

// Legal entity details, shown in the footer and in emails (UK trading disclosure rules).
// Do NOT add a map, map embed or map link for the registered office: it is for official correspondence only.
export const company = {
  legalName: "MKVINE DESIGN LTD",
  tradingName: "MKVINE DESIGN AGENCY",
  jurisdiction: "England and Wales",
  number: "17551166",
  registeredOffice: "Flat 2, 31 St Swithuns Road, Bournemouth, BH1 3RG, United Kingdom",
  copyrightYear: 2026, // update this by hand each year if you want the notice to roll forward
};

// Display names for social platforms (the footer uses these).
export const socialLabels: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", x: "X", linkedin: "LinkedIn", youtube: "YouTube" };

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const serviceLinks = [
  { label: "Brand Identity & Graphic Design", href: "/services/brand-identity" },
  { label: "Web Design & Software Development", href: "/services/web-development" },
  { label: "Mobile Apps & Google Play Publishing", href: "/services/mobile-apps" },
  { label: "Motion Design & Video Production", href: "/services/motion-design" },
  { label: "Digital Solutions & Support", href: "/services/digital-solutions" },
];

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Terms", href: "/terms" },
];

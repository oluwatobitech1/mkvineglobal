import { site } from "@/config/site";
import { team } from "@/content/team";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";
import { LEGAL_REVIEWED, legalDocs } from "@/content/legal";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

// Every public page. Add new pages here and they appear in the sitemap automatically.
export function publicPaths() {
  return [
    "/", "/about", "/team", "/services", "/work", "/pricing", "/start-project", "/contact", "/reviews", "/insights", "/faq",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
    ...posts.map((p) => `/insights/${p.slug}`),
    ...(LEGAL_REVIEWED ? legalDocs.map((d) => `/${d.slug}`) : []),
  ];
}

// Structured data only states what the site really knows. Contact details, links and a logo are added
// automatically once they are filled in (src/config/site.ts), and never before.
export function organizationJsonLd() {
  const { email, phone } = site.contact;
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    founder: team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.title })),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

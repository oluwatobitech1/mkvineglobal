import { site } from "@/config/site";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { faqJsonLd, organizationJsonLd, publicPaths } from "@/lib/seo";
import { LEGAL_REVIEWED, legalDocs } from "@/content/legal";
import { services } from "@/content/services";

describe("sitemap and robots", () => {
  it("lists every core page and service once, and legal pages only once they are reviewed", () => {
    const urls = sitemap().map((e) => new URL(e.url).pathname);
    for (const p of ["/", "/about", "/pricing", "/start-project", "/contact", "/faq"]) expect(urls).toContain(p);
    for (const s of services) expect(urls).toContain(`/services/${s.slug}`);
    for (const d of legalDocs) expect(urls.includes(`/${d.slug}`)).toBe(LEGAL_REVIEWED);
    expect(new Set(urls).size).toBe(urls.length);
    expect(publicPaths().length).toBe(urls.length);
  });
  it("never exposes API routes and points to the sitemap", () => {
    const r = robots();
    expect(JSON.stringify(r.rules)).not.toContain("/api");
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/);
  });
});

describe("structured data", () => {
  it("includes the founders, and only contact details and social links that are really configured", () => {
    const o = organizationJsonLd() as Record<string, unknown>;
    expect((o.founder as unknown[]).length).toBe(3);
    // Email and social links appear because they are set in site.ts, and match it exactly
    expect(o.email).toBe(site.contact.email);
    expect(o.sameAs).toEqual(Object.values(site.social).filter(Boolean));
    // No phone number was supplied, so none is published
    expect(site.contact.phone).toBe("");
    expect(o).not.toHaveProperty("telephone");
    expect(o).not.toHaveProperty("aggregateRating");
  });
  it("builds FAQ data from the visible questions", () => {
    const f = faqJsonLd([{ q: "Q?", a: "A." }]) as { mainEntity: { name: string }[] };
    expect(f.mainEntity[0].name).toBe("Q?");
  });
});

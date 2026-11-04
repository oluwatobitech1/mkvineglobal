import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { company } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (n === "fonts") return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("company details (UK trading disclosures)", () => {
  it("holds the exact company data supplied", () => {
    expect(company.legalName).toBe("MKVINE DESIGN LTD");
    expect(company.tradingName).toBe("MKVINE DESIGN AGENCY");
    expect(company.number).toBe("17551166");
    expect(company.jurisdiction).toBe("England and Wales");
    expect(company.registeredOffice).toBe("Flat 2, 31 St Swithuns Road, Bournemouth, BH1 3RG, United Kingdom");
  });

  it("never embeds or links to a map anywhere in the site source", () => {
    const banned = /<iframe|maps\.google|google\.com\/maps|maps\.googleapis|goo\.gl\/maps|maps\.app\.goo\.gl|openstreetmap|mapbox|leaflet|bing\.com\/maps|apple\.com\/maps/i;
    const offenders = [...walk("src"), ...walk("public").filter((f) => /\.(html|svg|txt|json)$/i.test(f))].filter((f) => banned.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("keeps the registered office out of structured data so it cannot feed a map listing", () => {
    expect(JSON.stringify(organizationJsonLd())).not.toMatch(/address|Swithun|Bournemouth|geo|latitude/i);
  });
});

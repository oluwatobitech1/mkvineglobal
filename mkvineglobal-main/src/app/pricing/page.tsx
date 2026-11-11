import type { Metadata } from "next";
import { additionalServices, packages } from "@/content/pricing";
import { CtaBand, PackageCard, PageHero, PriceNote, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Pricing", description: "Indicative package ranges for branding, websites, apps and motion, in GBP." };

export default function Pricing() {
  return (
    <>
      <PageHero bg="pricing" title="Pricing" intro="Indicative package ranges in GBP. Your final quotation depends on your project." />
      <Section srTitle="Packages">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-stagger>{packages.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        <div className="mt-8"><PriceNote /></div>
      </Section>
      <Section tone="alt" title="Additional services" intro="Available on request and priced after reviewing your needs.">
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {additionalServices.map((a) => <li key={a} className="border-t border-line pt-3">{a}</li>)}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { CtaBand, Faq, PageHero, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about working with MKVine Design Agency." };

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero bg="faq" title="Frequently asked questions" />
      <Section><Faq items={faqs} /></Section>
      <CtaBand />
    </>
  );
}

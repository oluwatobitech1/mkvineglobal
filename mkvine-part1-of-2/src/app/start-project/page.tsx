import type { Metadata } from "next";
import { EstimatorForm } from "@/components/forms/EstimatorForm";
import { PageHero, PriceNote, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Start a Project", description: "Tell MKVine Design Agency about your project." };

export default function StartProject() {
  return (
    <>
      <PageHero bg="start-project" title="Start a Project" intro="Answer a few questions about your project. At the end, your email app opens with everything written out, ready for you to send." />
      <Section>
        <EstimatorForm />
        <div className="mt-10"><PriceNote /></div>
      </Section>
    </>
  );
}

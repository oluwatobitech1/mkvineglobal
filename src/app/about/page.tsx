import type { Metadata } from "next";
import { CtaBand, PageHero, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "About", description: "MKVine Design Agency is a creative technology and brand development studio." };

const values = [
  ["Creative and technical, together", "Design and engineering sit in the same team, so what we design is what we can build."],
  ["Tailored to you", "We shape solutions around your requirements rather than forcing them into a template."],
  ["Usable and functional", "We care how things work as much as how they look."],
  ["Clear communication", "You know what we’re doing, what it involves and what it costs."],
];

export default function About() {
  return (
    <>
      <PageHero bg="about" title="A creative technology studio for growing businesses." intro="We build brands, digital products, and creative experiences that move businesses forward." />
      <Section title="Who we are">
        <div className="max-w-2xl space-y-4 leading-relaxed text-muted" data-reveal="right">
          <p>MKVine Design Agency combines creative direction, brand strategy, graphic design, software engineering, website development, mobile application development and multimedia production to help businesses build stronger brands and better digital products.</p>
          <p>We work with businesses, entrepreneurs, startups and organisations that want professional creative and technical solutions.</p>
        </div>
      </Section>
      <Section tone="alt" title="How we work">
        <dl className="grid gap-8 sm:grid-cols-2" data-stagger>
          {values.map(([t, d]) => (
            <div key={t} className="border-t border-line pt-4">
              <dt className="font-display text-lg font-bold">{t}</dt>
              <dd className="mt-2 text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <CtaBand />
    </>
  );
}

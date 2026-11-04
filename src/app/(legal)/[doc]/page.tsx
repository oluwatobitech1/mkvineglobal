import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL_REVIEWED, legalDocs } from "@/content/legal";
import { PageHero, Section } from "@/components/sections/ui";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

const find = (slug: string) => legalDocs.find((d) => d.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const d = find((await params).doc);
  return d ? { title: d.title, ...(LEGAL_REVIEWED ? {} : { robots: { index: false, follow: true } }) } : {};
}

export default async function Legal({ params }: { params: Promise<{ doc: string }> }) {
  const d = find((await params).doc);
  if (!d) notFound();
  return (
    <>
      <PageHero bg="legal" title={d.title} />
      <Section>
        <div className="max-w-2xl space-y-8">
          {!LEGAL_REVIEWED && (
            <p className="rounded-md border border-line bg-card px-4 py-3 text-sm text-muted">Draft. This text is pending confirmation by MKVine Design Agency and legal review.</p>
          )}
          {d.sections.map((s) => (
            <div key={s.h}><h2 className="font-display text-xl font-bold">{s.h}</h2><p className="mt-2 leading-relaxed text-muted">{s.p}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}

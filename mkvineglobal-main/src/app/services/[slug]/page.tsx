import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getService, services } from "@/content/services";
import { packages } from "@/content/pricing";
import { priceRange } from "@/lib/format";
import { CtaBand, PageHero, PriceNote, Section } from "@/components/sections/ui";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const pkg = packages.find((p) => p.slug === s.packageSlug);

  return (
    <>
      <PageHero bg="services" title={s.title} intro={s.intro} />
      <Section title="What’s included">
        <ul className="grid max-w-3xl gap-3" data-stagger="left">
          {s.features.map((f) => (
            <li key={f} className="flex gap-3"><Check size={18} aria-hidden className="mt-1 shrink-0 text-accent" />{f}</li>
          ))}
        </ul>
        {s.notes?.map((n) => <p key={n} className="mt-6 max-w-3xl text-sm text-muted">{n}</p>)}
      </Section>
      {pkg && (
        <Section tone="alt" title={pkg.name} intro={pkg.summary}>
          <p className="font-display text-4xl font-extrabold">{priceRange(pkg.min, pkg.max)}</p>
          <div className="mt-4"><PriceNote /></div>
          <Link href="/start-project" className="btn-primary mt-8">Request a quotation</Link>
        </Section>
      )}
      <CtaBand />
    </>
  );
}

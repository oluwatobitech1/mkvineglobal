import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { getProjectImages } from "@/lib/project-images";
import { CtaBand, PageHero, Section, wrap } from "@/components/sections/ui";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

function Pic({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-card ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="w-full" />
    </figure>
  );
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const isBranding = p.category === "Branding";
  const items = isBranding ? (p.servicesDelivered ?? []) : [];
  const img = getProjectImages(p.slug, items.length);
  const noun = isBranding ? "brand identity" : "website";

  const shots = [
    ...(img.header ? [{ src: img.header, label: "Header" }] : []),
    ...img.shots.map((src, i) => ({ src, label: p.screens?.[i] ?? `Screen ${i + 1}` })),
    ...(img.footer ? [{ src: img.footer, label: "Footer" }] : []),
  ];
  const facts: [string, string | undefined][] = [
    ["Client", p.client],
    ["Sector", p.sector],
    ["Role", p.role],
    ["Category", p.category],
    ...(isBranding ? [] : ([["Delivered", p.servicesDelivered?.join(", ")]] as [string, string | undefined][])),
  ];
  const blocks: [string, string | undefined][] = [["Objective", p.objective], ["Challenge", p.challenge], ["Solution", p.solution]];

  // Branding: every deliverable that has at least one image gets its own numbered section; the rest are listed.
  const withImages = items.map((title, i) => ({ n: i + 1, title, pics: img.sections[i] ?? [] })).filter((s) => s.pics.length > 0);
  const withoutImages = items.map((title, i) => ({ n: i + 1, title, pics: img.sections[i] ?? [] })).filter((s) => s.pics.length === 0);

  return (
    <>
      <PageHero title={p.title} intro={p.summary} />
      {isBranding && img.header && (
        <div className={`${wrap} pt-10`}>
          <Pic src={img.header} alt={`${p.title} ${noun}: header`} />
        </div>
      )}
      <Section>
        {p.concept && <p className="mb-6 rounded-md border border-line bg-card px-4 py-3 text-sm text-muted">This is a concept project, not a commissioned client project.</p>}
        <div className="mb-10 flex flex-wrap gap-x-12 gap-y-4 border-y border-line py-6">
          {facts.filter(([, v]) => v).map(([k, v]) => (
            <dl key={k}><dt className="text-sm text-muted">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></dl>
          ))}
          {p.url && (
            <div className="sm:ml-auto sm:self-center">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-1">Visit live site <ArrowUpRight size={16} aria-hidden /></a>
            </div>
          )}
        </div>
        <div className="max-w-2xl space-y-8">
          {blocks.filter(([, v]) => v).map(([h, v]) => (
            <div key={h}><h2 className="font-display text-xl font-bold">{h}</h2><p className="mt-2 text-muted">{v}</p></div>
          ))}
          {isBranding && withoutImages.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">{withImages.length > 0 ? "Also covered" : "What I worked on"}</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{withoutImages.map((s) => <li key={s.n}>{s.title}</li>)}</ul>
            </div>
          )}
          {p.outcomes && p.outcomes.length > 0 && (
            <div><h2 className="font-display text-xl font-bold">Outcomes</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{p.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></div>
          )}
        </div>
      </Section>

      {isBranding && withImages.map((s, idx) => (
        <section key={s.n} className={idx % 2 === 0 ? "border-y border-line bg-bg-2" : ""}>
          <div className={`${wrap} py-14 lg:py-20`}>
            <div className="mb-8 flex items-baseline gap-4" data-reveal="left">
              <span className="font-display text-sm font-bold text-accent">{String(s.n).padStart(2, "0")}</span>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{s.title}</h2>
            </div>
            <div className={`grid gap-6 ${s.pics.length > 1 ? "md:grid-cols-2" : ""}`}>
              {s.pics.map((src, i) => (
                <Pic key={src} src={src} alt={`${p.title} ${noun}: ${s.title.toLowerCase()}${s.pics.length > 1 ? ` (${i + 1})` : ""}`}
                  className={s.pics.length > 1 && s.pics.length % 2 === 1 && i === 0 ? "md:col-span-2" : ""} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {isBranding && (img.footer || img.contact) && (
        <Section>
          <div className="grid gap-6">
            {img.footer && <Pic src={img.footer} alt={`${p.title} ${noun}: closing`} />}
            {img.contact && <Pic src={img.contact} alt={`${p.title} ${noun}: contact`} />}
          </div>
        </Section>
      )}

      {!isBranding && (shots.length > 0 || img.contact) && (
        <Section title="The website" tone="alt">
          <div className="grid gap-6 md:grid-cols-2">
            {shots.map((s) => (
              <Pic key={s.src} src={s.src} alt={`${p.title} website: ${s.label.toLowerCase()}`} className={s.label === "Header" || s.label === "Footer" ? "md:col-span-2" : ""} />
            ))}
            {img.contact && <Pic src={img.contact} alt={`${p.title} website: contact`} className="md:col-span-2" />}
          </div>
        </Section>
      )}
      <CtaBand />
    </>
  );
}

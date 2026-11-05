import { getTeamPhoto } from "@/lib/team-photos";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check, Code, Clapperboard, LifeBuoy, Palette, Smartphone } from "lucide-react";
import type { Service } from "@/content/services";
import type { Package } from "@/content/pricing";
import type { Member } from "@/content/team";
import { PRICE_NOTE } from "@/content/pricing";
import { priceRange } from "@/lib/format";
import type { BackgroundName } from "@/lib/backgrounds";
import { Backdrop } from "@/components/sections/Backdrop";

export const wrap = "mx-auto max-w-7xl px-5 lg:px-8";

export function PageHero({ title, intro, bg }: { title: string; intro?: string; bg?: BackgroundName }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {bg && <Backdrop name={bg} />}
      <div className={`${wrap} relative py-20 lg:py-28`}>
        <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-blue sm:text-6xl anim-up">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted anim-up" style={{ "--d": "140ms" } as CSSProperties}>{intro}</p>}
      </div>
    </section>
  );
}

export function Section({ title, intro, children, tone = "bg", srTitle }: { title?: string; intro?: string; children: React.ReactNode; tone?: "bg" | "alt"; srTitle?: string }) {
  return (
    <section className={tone === "alt" ? "border-y border-line bg-bg-2" : ""}>
      <div className={`${wrap} py-16 lg:py-24`}>
        {!title && srTitle && <h2 className="sr-only">{srTitle}</h2>}
        {title && (
          <div className="mb-10 max-w-2xl" data-reveal="left">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            {intro && <p className="mt-4 leading-relaxed text-muted">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

const icons = { palette: Palette, code: Code, phone: Smartphone, film: Clapperboard, support: LifeBuoy };

export function ServiceCard({ s }: { s: Service }) {
  const Icon = icons[s.icon];
  return (
    <Link href={`/services/${s.slug}`} className="group flex flex-col rounded-xl border border-line bg-card p-6 lift">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-bg text-accent ring-1 ring-brand-muted/60"><Icon size={22} aria-hidden /></span>
      <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Explore service <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

export function PriceNote() {
  return <p className="max-w-3xl text-sm leading-relaxed text-muted">{PRICE_NOTE}</p>;
}

export function PackageCard({ p }: { p: Package }) {
  return (
    <article className={`flex flex-col rounded-xl border p-6 ${p.featured ? "border-accent bg-card" : "border-line bg-card"} lift`}>
      <h3 className="font-display text-xl font-bold">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.summary}</p>
      <p className="mt-5 font-display text-3xl font-extrabold">{priceRange(p.min, p.max)}</p>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {p.features.map((f) => (
          <li key={f} className="flex gap-2"><Check size={16} aria-hidden className="mt-0.5 shrink-0 text-accent" /><span>{f}</span></li>
        ))}
      </ul>
      {p.note && <p className="mt-4 text-xs leading-relaxed text-muted">{p.note}</p>}
      <Link href="/start-project" className={`mt-6 justify-center ${p.featured ? "btn-primary" : "btn-ghost"}`}>Request a quotation</Link>
    </article>
  );
}

export function TeamCard({ m, compact = false }: { m: Member; compact?: boolean }) {
  const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const photo = m.photo ?? getTeamPhoto(m.name);
  return (
    <article className="lift rounded-xl border border-line bg-card p-6">
      <div className="overflow-hidden rounded-lg">
        {photo ? (
          <div className="zoom aspect-[4/3] bg-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${m.name}, ${m.title}`} loading="lazy" className="h-full w-full object-cover object-top" />
          </div>
        ) : (
          <div className="zoom grid aspect-[4/3] place-items-center bg-bg font-display text-5xl font-extrabold text-brand-muted-text" role="img" aria-label={`Photo of ${m.name} to be added`}>
            {initials}
          </div>
        )}
      </div>
      <h3 className="mt-5 font-display text-xl font-bold">{m.name}</h3>
      <p className="text-sm font-semibold text-accent">{m.title}</p>
      {!compact && m.bio?.map((para, i) => <p key={i} className="mt-3 text-sm leading-relaxed text-muted">{para}</p>)}
      <p className="mt-4 text-sm text-muted">{m.responsibilities.join(", ")}.</p>
      {m.links && m.links.length > 0 && (
        <ul className="mt-4 flex gap-4 text-sm">
          {m.links.map((l) => (
            <li key={l.url}><a className="underline underline-offset-4 hover:text-accent" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a></li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <Backdrop name="cta" />
      <div aria-hidden className="pointer-events-none absolute inset-0" data-anim>
        <div className="par absolute -right-32 -top-24 h-[30rem] w-[30rem]" data-parallax="0.1">
          <div className="blob inset-0" style={{ background: "radial-gradient(closest-side, rgba(6,94,254,.22), transparent)", "--t": "22s" } as CSSProperties} />
        </div>
      </div>
      <div className={`${wrap} relative py-20 lg:py-28`}>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" data-reveal="left">
          Have an Idea? Let’s Build Something Meaningful.
        </h2>
        <p className="mt-5 max-w-xl text-muted" data-reveal="right" data-delay="120">Tell us about your new brand, website, application or creative project and we’ll take it from there.</p>
        <div className="mt-8 flex flex-wrap gap-3" data-reveal data-delay="240">
          <Link href="/start-project" className="btn-primary">Start a Project</Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-3xl divide-y divide-line border-y border-line" data-stagger>
      {items.map((i) => (
        <details key={i.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {i.q}
            <span aria-hidden className="text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{i.a}</p>
        </details>
      ))}
    </div>
  );
}

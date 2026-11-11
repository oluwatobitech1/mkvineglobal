import Link from "next/link";
import type { CSSProperties } from "react";
import { services } from "@/content/services";
import { packages } from "@/content/pricing";
import { team } from "@/content/team";
import { process } from "@/content/process";
import { faqs } from "@/content/faqs";
import { projects } from "@/content/projects";
import { reviews } from "@/content/reviews";
import { posts } from "@/content/posts";
import { Marquee } from "@/components/motion/Marquee";
import { Stats } from "@/components/motion/Stats";
import { ReviewSlider } from "@/components/sections/ReviewSlider";
import { Backdrop } from "@/components/sections/Backdrop";
import { CtaBand, Faq, PackageCard, PriceNote, Section, ServiceCard, TeamCard, wrap } from "@/components/sections/ui";

// On the home page the agency is simply called "MKVine".
const homeIntro = "MKVine combines creative strategy, design, and technology to help businesses build distinctive brands and powerful digital products.";

const disciplines = ["Brand", "Web", "Apps", "Motion"];

const why = [
  "Creative and technical expertise in one team",
  "Solutions tailored to individual requirements",
  "Attention to functionality and usability",
  "Consistent visual quality",
  "Clear project communication",
  "Responsive digital experiences",
  "Agreed post-launch support",
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Backdrop name="home" />
        <div aria-hidden className="pointer-events-none absolute inset-0" data-anim>
          <div className="par absolute -right-40 -top-40 h-[34rem] w-[34rem]" data-parallax="0.12">
            <div className="blob inset-0" style={{ background: "radial-gradient(closest-side, rgba(6,94,254,.30), transparent)", "--t": "20s" } as CSSProperties} />
          </div>
          <div className="par absolute -bottom-56 left-1/3 h-[28rem] w-[28rem]" data-parallax="-0.08">
            <div className="blob inset-0" style={{ background: "radial-gradient(closest-side, rgba(232,180,36,.13), transparent)", "--t": "26s" } as CSSProperties} />
          </div>
          <span className="float hide-sm absolute right-[9%] top-24 h-14 w-14 rounded-full border-2 border-accent/50" style={{ "--t": "9s" } as CSSProperties} />
          <span className="float hide-sm absolute bottom-24 left-[46%] h-5 w-5 rounded-sm bg-brand-blue/70" style={{ "--t": "7s" } as CSSProperties} />
        </div>
        <div className={`${wrap} relative grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:py-32`}>
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1] tracking-tight sm:text-7xl">
              <span className="line"><span className="line-in" style={{ "--d": "80ms" } as CSSProperties}>Building Brands.</span></span>
              <span className="line"><span className="line-in text-brand-blue" style={{ "--d": "220ms" } as CSSProperties}>Engineering Digital Experiences.</span></span>
            </h1>
            <p className="anim-up mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "520ms" } as CSSProperties}>{homeIntro}</p>
            <div className="anim-up mt-10 flex flex-wrap gap-3" style={{ "--d": "680ms" } as CSSProperties}>
              <Link href="/start-project" className="btn-primary">Start a Project</Link>
              <Link href="/work" className="btn-ghost">Explore Our Work</Link>
            </div>
          </div>
          <ul aria-label="What we do" className="font-display text-6xl font-extrabold leading-none sm:text-7xl lg:text-8xl">
            {disciplines.map((d, i) => (
              <li key={d} className={`anim-left ${i === 0 ? "text-brand-blue" : "text-brand-muted-text"}`} style={{ "--d": `${420 + i * 130}ms` } as CSSProperties}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="space-y-2 border-b border-line py-8" aria-hidden>
        <Marquee items={["Brand Identity", "Web Development", "Mobile Apps", "Motion Design", "Digital Support"]} duration={48} />
        <Marquee items={["Strategy", "Design", "Development", "Testing", "Launch", "Support"]} duration={56} reverse muted />
      </div>

      <Section title="Creativity and engineering, together" intro="MKVine combines creative direction, brand strategy, graphic design, software engineering, website development, mobile application development and multimedia production, so your brand and your digital products are built by one team.">
        <Link href="/about" className="btn-ghost">About MKVine</Link>
      </Section>

      <Section tone="alt" title="What we do" intro="Four core services, plus ongoing support to keep your work performing.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </Section>

      <Stats
        items={[
          { value: team.length, label: "Co-founders leading every project" },
          { value: services.length, label: "Services, from brand to ongoing support" },
          { value: process.length, label: "Steps from first conversation to support" },
          { value: packages.length, label: "Package options to start from" },
        ]}
      />

      {projects.length > 0 && (
        <Section title="Selected projects">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {projects.filter(Boolean).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="rounded-xl border border-line bg-card p-6 lift">
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
              </Link>
            ))}
          </div>
          <Link href="/work" className="btn-ghost mt-8">View all projects</Link>
        </Section>
      )}

      <Section tone="alt" title="Client reviews" intro={reviews.length > 0 ? undefined : "Client reviews are coming soon. Worked with us? Leave your review and it opens in your email app, ready to send."}>
        {reviews.length > 0 && <ReviewSlider items={reviews} />}
        <Link href="/reviews" className={`btn-ghost ${reviews.length > 0 ? "mt-8" : ""}`}>Leave a review</Link>
      </Section>

      <Section title="Why choose MKVine?">
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2" data-stagger="alt">
          {why.map((w) => <li key={w} className="border-t border-line pt-4 font-display text-lg font-semibold">{w}</li>)}
        </ul>
      </Section>

      <Section tone="alt" title="Meet the founders">
        <div className="grid gap-5 md:grid-cols-3" data-stagger>{team.map((m) => <TeamCard key={m.name} m={m} compact />)}</div>
        <Link href="/team" className="btn-ghost mt-8">Read their stories</Link>
      </Section>

      <Section title="How we work" intro="A seven-step process from first conversation to ongoing support.">
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {process.map((s, i) => (
            <li key={s.title} className="bg-card p-6">
              <span className="font-display text-sm font-bold text-accent">Step {i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="alt" title="Pricing" intro="Indicative package ranges in GBP.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {packages.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
        <div className="mt-8"><PriceNote /></div>
      </Section>

      {posts.length > 0 && (
        <Section title="Insights">
          <div className="grid gap-5 md:grid-cols-3" data-stagger>
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="rounded-xl border border-line bg-card p-6 lift">
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section title="Frequently asked questions">
        <Faq items={faqs} />
      </Section>

      <CtaBand />
    </>
  );
}

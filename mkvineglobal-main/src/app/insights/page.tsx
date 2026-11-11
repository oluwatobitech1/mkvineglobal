import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { CtaBand, PageHero, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Insights", description: "Articles and resources from MKVine Design Agency." };

export default function Insights() {
  return (
    <>
      <PageHero bg="insights" title="Insights" intro="Articles and resources on branding, web, apps and motion." />
      <Section srTitle="Articles">
        {posts.length === 0 ? (
          <p className="max-w-xl text-muted">We haven’t published any articles yet. Check back soon.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-3" data-stagger>
            {posts.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="rounded-xl border border-line bg-card p-6 lift">
                <p className="text-sm text-muted">{p.category} · {p.readingMinutes} min read</p>
                <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </Section>
      <CtaBand />
    </>
  );
}

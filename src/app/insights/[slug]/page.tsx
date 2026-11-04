import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { PageHero, Section } from "@/components/sections/ui";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => posts.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero bg="insights" title={p.title} intro={`${p.category} · ${p.date} · ${p.readingMinutes} min read`} />
      <Section>
        <div className="max-w-2xl space-y-4 leading-relaxed">{p.body.map((para, i) => <p key={i}>{para}</p>)}</div>
      </Section>
    </>
  );
}

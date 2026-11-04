"use client";

import Link from "next/link";
import { useState } from "react";
import { projectCategories, type Project } from "@/content/projects";

// Filtering happens in the browser so the page can be exported as static HTML.
export function WorkGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const list = category ? projects.filter((p) => p.category === category) : projects;
  const pill = (active: boolean) => `rounded-full border px-4 py-1.5 text-sm ${active ? "border-accent text-accent" : "border-line text-muted"}`;

  return (
    <>
      <div role="group" aria-label="Project categories" className="mb-8 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!category} className={pill(!category)} onClick={() => setCategory(null)}>All</button>
        {projectCategories.map((c) => (
          <button key={c} type="button" aria-pressed={category === c} className={pill(category === c)} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="text-muted">No projects in this category yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {list.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="overflow-hidden rounded-xl border border-line bg-card lift">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={`${p.title} ${p.category === "Branding" ? "brand identity" : "website"} preview`} loading="lazy" className="aspect-[16/10] w-full border-b border-line object-cover object-top" />
              )}
              <div className="p-6">
              <p className="text-sm text-muted">{p.category}{p.concept ? " (concept project)" : ""}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

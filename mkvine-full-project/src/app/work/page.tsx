import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { CtaBand, PageHero, Section } from "@/components/sections/ui";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { getProjectImages } from "@/lib/project-images";

export const metadata: Metadata = { title: "Our Work", description: "Selected projects from MKVine Design Agency." };

export default function Work() {
  return (
    <>
      <PageHero bg="work" title="Our Work" intro="Selected projects across branding, web, apps and motion." />
      <Section srTitle="Projects">
        {projects.length === 0 ? (
          <div className="max-w-xl rounded-xl border border-line bg-card p-8">
            <h2 className="font-display text-2xl font-bold">Our portfolio is being prepared.</h2>
            <p className="mt-3 text-muted">We’re preparing approved case studies. In the meantime, tell us about your project and we’ll talk through what we can build for you.</p>
            <Link href="/start-project" className="btn-primary mt-6">Start a Project</Link>
          </div>
        ) : (
          <WorkGrid projects={projects.map((p) => { const i = getProjectImages(p.slug, p.category === "Branding" ? (p.servicesDelivered?.length ?? 0) : 0); return { ...p, image: p.image ?? i.header ?? i.shots[0] ?? i.sections.flat()[0] }; })} />
        )}
      </Section>
      <CtaBand />
    </>
  );
}

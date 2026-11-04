import type { Metadata } from "next";
import { team } from "@/content/team";
import { CtaBand, PageHero, Section, TeamCard } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Our Team", description: "Meet the three co-founders of MKVine Design Agency." };

export default function Team() {
  return (
    <>
      <PageHero bg="team" title="The people behind MKVine." intro="Three co-founders covering creative direction, software development and brand design." />
      <Section srTitle="Founders">
        <div className="grid gap-5 md:grid-cols-3" data-stagger>{team.map((m) => <TeamCard key={m.name} m={m} />)}</div>
      </Section>
      <CtaBand />
    </>
  );
}

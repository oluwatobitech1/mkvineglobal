import type { Metadata } from "next";
import { services } from "@/content/services";
import { CtaBand, PageHero, Section, ServiceCard } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Services", description: "Brand identity, web development, mobile apps, motion design and digital support." };

export default function Services() {
  return (
    <>
      <PageHero bg="services" title="Services" intro="Brand, web, mobile and motion, with the support to keep it all running." />
      <Section srTitle="All services">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>{services.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
      </Section>
      <CtaBand />
    </>
  );
}

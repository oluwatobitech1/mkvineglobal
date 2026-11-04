import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with MKVine Design Agency." };

export default function Contact() {
  const { email, phone, whatsapp } = site.contact;
  const hasDirect = email || phone || whatsapp;
  return (
    <>
      <PageHero bg="contact" title="Contact" intro="Tell us about your project, or ask a question." />
      <Section>
        <div className="max-w-xl space-y-6">
          {hasDirect && (
            <ul className="space-y-2">
              {email && <li><a className="underline underline-offset-4 hover:text-accent" href={`mailto:${email}`}>{email}</a></li>}
              {phone && <li><a className="underline underline-offset-4 hover:text-accent" href={`tel:${phone}`}>{phone}</a></li>}
              {whatsapp && <li><a className="underline underline-offset-4 hover:text-accent" href={whatsapp}>Message us on WhatsApp</a></li>}
            </ul>
          )}
          <p className="text-muted">Have a general question? Write your message below and your email app will open with it ready to send. For a new project, the project form helps us understand what you need.</p>
          <Link href="/start-project" className="btn-ghost">Start a Project</Link>
          <div className="border-t border-line pt-8"><ContactForm /></div>
        </div>
      </Section>
    </>
  );
}

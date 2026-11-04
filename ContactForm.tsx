"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { site } from "@/config/site";
import { buildMail, composeContact, makeReference, type MailLinks } from "@/lib/mailto";
import { contactSchema, type Contact, type ContactInput } from "@/lib/validation/enquiry";
import { Field, aria } from "./fields";
import { MailPrepared } from "./MailPrepared";

export function ContactForm() {
  const [prepared, setPrepared] = useState<{ reference: string; links: MailLinks } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput, unknown, Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", message: "" },
  });

  const onSubmit = handleSubmit((data) => {
    const reference = makeReference();
    const links = buildMail(site.contact.email, composeContact(data, reference));
    setPrepared({ reference, links });
    window.location.assign(links.mailto);
  });

  if (prepared) return <MailPrepared to={site.contact.email} reference={prepared.reference} links={prepared.links} onEdit={() => setPrepared(null)} />;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field id="c-name" label="Your name" error={errors.fullName?.message}>
        <input id="c-name" className="input" autoComplete="name" {...register("fullName")} {...aria("c-name", errors.fullName?.message)} />
      </Field>
      <Field id="c-email" label="Your email address" error={errors.email?.message}>
        <input id="c-email" type="email" className="input" autoComplete="email" {...register("email")} {...aria("c-email", errors.email?.message)} />
      </Field>
      <Field id="c-message" label="Message" error={errors.message?.message}>
        <textarea id="c-message" rows={6} className="input" {...register("message")} {...aria("c-message", errors.message?.message)} />
      </Field>
      <p className="text-sm text-muted">When you continue, your email app opens with your message written out. Press Send there to complete it.</p>
      <button type="submit" className="btn-primary">Write my email</button>
    </form>
  );
}

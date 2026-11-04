"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { site } from "@/config/site";
import { buildMail, composeReview, makeReference, type MailLinks } from "@/lib/mailto";
import { ratingOptions, reviewSchema, type Review, type ReviewInput } from "@/lib/validation/enquiry";
import { Field, aria } from "./fields";
import { MailPrepared } from "./MailPrepared";

// Like the other forms, this sends nothing itself. It writes the review as an email to the agency inbox.
export function ReviewForm() {
  const [prepared, setPrepared] = useState<{ reference: string; links: MailLinks } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ReviewInput, unknown, Review>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { fullName: "", email: "", company: "", project: "", rating: "5", review: "", canPublish: false },
  });

  const onSubmit = handleSubmit((data) => {
    const reference = makeReference();
    const links = buildMail(site.contact.email, composeReview(data, reference));
    setPrepared({ reference, links });
    window.location.assign(links.mailto);
  });

  if (prepared) return <MailPrepared to={site.contact.email} reference={prepared.reference} links={prepared.links} onEdit={() => setPrepared(null)} />;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field id="r-name" label="Your name" error={errors.fullName?.message}>
        <input id="r-name" className="input" autoComplete="name" {...register("fullName")} {...aria("r-name", errors.fullName?.message)} />
      </Field>
      <Field id="r-email" label="Your email address" error={errors.email?.message}>
        <input id="r-email" type="email" className="input" autoComplete="email" {...register("email")} {...aria("r-email", errors.email?.message)} />
      </Field>
      <Field id="r-company" label="Company" optional error={errors.company?.message}>
        <input id="r-company" className="input" autoComplete="organization" {...register("company")} {...aria("r-company", errors.company?.message)} />
      </Field>
      <Field id="r-project" label="What did we work on together?" optional hint="For example: website design, brand identity, mobile app." error={errors.project?.message}>
        <input id="r-project" className="input" {...register("project")} {...aria("r-project", errors.project?.message, "hint")} />
      </Field>
      <Field id="r-rating" label="Your rating" error={errors.rating?.message}>
        <select id="r-rating" className="input" {...register("rating")} {...aria("r-rating", errors.rating?.message)}>
          {ratingOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>
      <Field id="r-review" label="Your review" error={errors.review?.message}>
        <textarea id="r-review" rows={6} className="input" {...register("review")} {...aria("r-review", errors.review?.message)} />
      </Field>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("canPublish")} />
        <span>You may show my review on the MKVine website.</span>
      </label>
      <p className="text-sm text-muted">When you continue, your email app opens with your review written out. Press Send there to complete it.</p>
      <button type="submit" className="btn-primary">Write my review email</button>
    </form>
  );
}

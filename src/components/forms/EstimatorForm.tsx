"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetOptions, contactMethods, followUpGroups, labelOf, serviceOptions, timelineOptions } from "@/config/estimator";
import { enquirySchema, stepFields, type Enquiry, type EnquiryInput } from "@/lib/validation/enquiry";
import { PRICE_NOTE } from "@/content/pricing";
import { site } from "@/config/site";
import { buildMail, composeEnquiry, makeReference, type MailLinks } from "@/lib/mailto";
import { Field, aria } from "./fields";
import { MailPrepared } from "./MailPrepared";

const steps = ["Your details", "Services", "Project", "Budget", "Timeline", "Review"];

export function EstimatorForm() {
  const [step, setStep] = useState(0);
  const [prepared, setPrepared] = useState<{ reference: string; links: MailLinks } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [moved, setMoved] = useState(false);

  const { register, control, trigger, getValues, formState: { errors }, handleSubmit } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "", company: "", email: "", phone: "", contactMethod: "email", services: [],
      projectTitle: "", description: "", goals: "", audience: "", existingWebsite: "", existingApp: "", additional: "",
      budget: undefined, timeline: undefined, details: {},
    },
  });
  const selected = useWatch({ control, name: "services" }) ?? [];

  // Move focus to the new step heading (but not on first load) so screen-reader users know the step changed.
  useEffect(() => {
    if (moved) headingRef.current?.focus();
  }, [step, moved]);

  const go = (n: number) => { setMoved(true); setStep(n); };
  const next = async () => { if (await trigger(stepFields[step] as unknown as (keyof EnquiryInput)[])) go(step + 1); };

  const submit = handleSubmit(
    (data) => {
      const reference = makeReference();
      const links = buildMail(site.contact.email, composeEnquiry(data, reference));
      setPrepared({ reference, links });
      // Hand the message to the visitor's email app. They still have to press Send there.
      window.location.assign(links.mailto);
    },
    (errs) => {
      const idx = stepFields.findIndex((f) => (f as readonly string[]).some((x) => x in errs));
      if (idx >= 0) go(idx);
    },
  );

  if (prepared) return <MailPrepared to={site.contact.email} reference={prepared.reference} links={prepared.links} onEdit={() => setPrepared(null)} />;

  const values = getValues();
  const e = errors;

  return (
    <form onSubmit={submit} noValidate className="relative max-w-2xl">
      <p className="text-sm text-muted" aria-live="polite">Step {step + 1} of {steps.length}</p>
      <div className="mt-2 flex gap-1.5" aria-hidden>
        {steps.map((s, i) => <span key={s} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-line"}`} />)}
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-2xl font-bold outline-none">{steps[step]}</h2>

      <div className="mt-6 space-y-5">
        <div hidden={step !== 0} className="step-in space-y-5">
          <Field id="fullName" label="Full name" error={e.fullName?.message}><input id="fullName" className="input" autoComplete="name" {...register("fullName")} {...aria("fullName", e.fullName?.message)} /></Field>
          <Field id="company" label="Business or company name" optional error={e.company?.message}><input id="company" className="input" autoComplete="organization" {...register("company")} {...aria("company", e.company?.message)} /></Field>
          <Field id="email" label="Email address" error={e.email?.message}><input id="email" type="email" className="input" autoComplete="email" {...register("email")} {...aria("email", e.email?.message)} /></Field>
          <Field id="phone" label="Phone number" optional error={e.phone?.message}><input id="phone" type="tel" className="input" autoComplete="tel" {...register("phone")} {...aria("phone", e.phone?.message)} /></Field>
          <Field id="contactMethod" label="Preferred contact method" error={e.contactMethod?.message}>
            <select id="contactMethod" className="input" {...register("contactMethod")} {...aria("contactMethod", e.contactMethod?.message)}>
              {contactMethods.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </Field>
        </div>

        <fieldset hidden={step !== 1} className="step-in space-y-3">
          <legend className="mb-2 text-sm text-muted">Choose every service you’re interested in.</legend>
          {serviceOptions.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-card px-4 py-3 has-[:checked]:border-accent">
              <input type="checkbox" value={s.value} className="h-4 w-4 accent-[#e8b424]" {...register("services")} />
              {s.label}
            </label>
          ))}
          {e.services && <p role="alert" className="text-sm text-danger">Error: {e.services.message}</p>}
        </fieldset>

        <div hidden={step !== 2} className="step-in space-y-5">
          <Field id="projectTitle" label="Project title" error={e.projectTitle?.message}><input id="projectTitle" className="input" {...register("projectTitle")} {...aria("projectTitle", e.projectTitle?.message)} /></Field>
          <Field id="description" label="Project description" error={e.description?.message}><textarea id="description" rows={5} className="input" {...register("description")} {...aria("description", e.description?.message)} /></Field>
          <Field id="goals" label="Business goals" optional error={e.goals?.message}><textarea id="goals" rows={3} className="input" {...register("goals")} {...aria("goals", e.goals?.message)} /></Field>
          <Field id="audience" label="Target audience" optional error={e.audience?.message}><textarea id="audience" rows={2} className="input" {...register("audience")} {...aria("audience", e.audience?.message)} /></Field>
          <Field id="existingWebsite" label="Existing website address" optional hint="Include https://" error={e.existingWebsite?.message}><input id="existingWebsite" type="url" inputMode="url" className="input" {...register("existingWebsite")} {...aria("existingWebsite", e.existingWebsite?.message, "x")} /></Field>
          <Field id="existingApp" label="Existing application address" optional hint="Include https://" error={e.existingApp?.message}><input id="existingApp" type="url" inputMode="url" className="input" {...register("existingApp")} {...aria("existingApp", e.existingApp?.message, "x")} /></Field>

          {followUpGroups.filter((g) => g.triggers.some((t) => selected.includes(t as never))).map((g) => (
            <fieldset key={g.id} className="space-y-5 rounded-xl border border-line p-5">
              <legend className="px-2 font-display text-lg font-bold">{g.title}</legend>
              {g.questions.map((q) => (
                <Field key={q.key} id={q.key} label={q.label} hint={q.hint} optional>
                  <input id={q.key} className="input" {...register(`details.${q.key}` as `details.${string}`)} aria-describedby={q.hint ? `${q.key}-hint` : undefined} />
                </Field>
              ))}
            </fieldset>
          ))}

          <Field id="additional" label="Additional requirements" optional error={e.additional?.message}><textarea id="additional" rows={3} className="input" {...register("additional")} {...aria("additional", e.additional?.message)} /></Field>
        </div>

        <fieldset hidden={step !== 3} className="step-in space-y-3">
          <legend className="mb-2 text-sm text-muted">This helps us understand your project. It isn’t a quotation.</legend>
          {budgetOptions.map((b) => (
            <label key={b.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-card px-4 py-3 has-[:checked]:border-accent">
              <input type="radio" value={b.value} className="h-4 w-4 accent-[#e8b424]" {...register("budget")} />{b.label}
            </label>
          ))}
          {e.budget && <p role="alert" className="text-sm text-danger">Error: {e.budget.message}</p>}
        </fieldset>

        <fieldset hidden={step !== 4} className="step-in space-y-3">
          <legend className="mb-2 text-sm text-muted">When would you like the project delivered?</legend>
          {timelineOptions.map((t) => (
            <label key={t.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-card px-4 py-3 has-[:checked]:border-accent">
              <input type="radio" value={t.value} className="h-4 w-4 accent-[#e8b424]" {...register("timeline")} />{t.label}
            </label>
          ))}
          {e.timeline && <p role="alert" className="text-sm text-danger">Error: {e.timeline.message}</p>}
        </fieldset>

        {step === 5 && (
          <div className="step-in space-y-6">
            {[
              { t: 0, title: "Your details", rows: [["Name", values.fullName], ["Company", values.company], ["Email", values.email], ["Phone", values.phone], ["Contact via", labelOf(contactMethods, values.contactMethod)]] },
              { t: 1, title: "Services", rows: [["Selected", (values.services ?? []).map((s) => labelOf(serviceOptions, s)).join(", ")]] },
              { t: 2, title: "Project", rows: [["Title", values.projectTitle], ["Description", values.description], ["Goals", values.goals], ["Audience", values.audience], ["Website", values.existingWebsite], ["App", values.existingApp], ["Notes", values.additional]] },
              { t: 3, title: "Budget", rows: [["Range", values.budget ? labelOf(budgetOptions, values.budget) : ""]] },
              { t: 4, title: "Timeline", rows: [["When", values.timeline ? labelOf(timelineOptions, values.timeline) : ""]] },
            ].map((sec) => (
              <section key={sec.title} className="rounded-xl border border-line p-5">
                <div className="flex items-center justify-between"><h3 className="font-display text-lg font-bold">{sec.title}</h3><button type="button" className="text-sm text-accent underline underline-offset-4" onClick={() => go(sec.t)}>Edit<span className="sr-only"> {sec.title}</span></button></div>
                <dl className="mt-3 space-y-2 text-sm">
                  {sec.rows.filter(([, v]) => v).map(([k, v]) => <div key={k} className="grid grid-cols-[110px_1fr] gap-3"><dt className="text-muted">{k}</dt><dd className="whitespace-pre-wrap break-words">{v}</dd></div>)}
                </dl>
              </section>
            ))}
            <p className="text-sm text-muted">{PRICE_NOTE}</p>
            <p className="text-sm">Next, your email app opens with this enquiry written out. Press Send there to complete it.</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 0 && <button type="button" className="btn-ghost" onClick={() => go(step - 1)}>Back</button>}
        {step < steps.length - 1 ? (
          <button type="button" className="btn-primary" onClick={next}>Continue</button>
        ) : (
          <button type="submit" className="btn-primary">Write my email</button>
        )}
      </div>
    </form>
  );
}

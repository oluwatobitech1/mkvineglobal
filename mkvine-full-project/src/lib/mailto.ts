import { budgetOptions, contactMethods, followUpGroups, labelOf, serviceOptions, timelineOptions } from "@/config/estimator";
import type { Contact, Enquiry, Review } from "@/lib/validation/enquiry";

// The forms do not send anything themselves. They write the email and hand it to the visitor's own email app
// (a mailto link), or to Gmail on the web, and the visitor presses Send.

const ALPHABET = "ABCDEFGHJKMNPQRSTVWXYZ23456789"; // no look-alike characters

// A reference the visitor can quote later, e.g. MKV-20261101-K7P3QD. Nothing is stored; it just travels in the email.
export function makeReference(date = new Date(), bytes?: Uint8Array) {
  const b = bytes ?? crypto.getRandomValues(new Uint8Array(6));
  let code = "";
  for (let i = 0; i < 6; i++) code += ALPHABET[b[i] % ALPHABET.length];
  return `MKV-${date.toISOString().slice(0, 10).replace(/-/g, "")}-${code}`;
}

export type Message = { subject: string; body: string };

// Most important details first, so if a long message has to be shortened the least important part goes.
export function composeEnquiry(e: Enquiry, ref: string): Message {
  const short: [string, string][] = [
    ["Name", e.fullName],
    ["Email", e.email],
    ["Company", e.company],
    ["Phone", e.phone],
    ["Preferred contact", labelOf(contactMethods, e.contactMethod)],
    ["Services", e.services.map((s) => labelOf(serviceOptions, s)).join(", ")],
    ["Budget", labelOf(budgetOptions, e.budget)],
    ["Timeline", labelOf(timelineOptions, e.timeline)],
    ["Project title", e.projectTitle],
  ];
  const long: [string, string][] = [
    ["Description", e.description],
    ["Business goals", e.goals],
    ["Target audience", e.audience],
    ["Existing website", e.existingWebsite],
    ["Existing app", e.existingApp],
  ];
  for (const g of followUpGroups) for (const q of g.questions) if (e.details[q.key]) long.push([q.label, e.details[q.key]]);
  long.push(["Additional notes", e.additional]);

  const lines = [`New project enquiry ${ref}`, ""];
  for (const [k, v] of short) if (v) lines.push(`${k}: ${v}`);
  for (const [k, v] of long) if (v) lines.push("", `${k}:`, v);
  lines.push("", "Budget is for preliminary qualification only, not a quotation.", `Reference: ${ref}`);
  return { subject: `Project enquiry ${ref}: ${e.projectTitle}`, body: lines.join("\n") };
}

export function composeContact(c: Contact, ref: string): Message {
  return {
    subject: `Website message ${ref} from ${c.fullName}`,
    body: ["New message from the website", "", `Name: ${c.fullName}`, `Email: ${c.email}`, "", "Message:", c.message, "", `Reference: ${ref}`].join("\n"),
  };
}

export function composeReview(r: Review, ref: string): Message {
  const lines = [`New client review ${ref}`, "", `Name: ${r.fullName}`, `Email: ${r.email}`];
  if (r.company) lines.push(`Company: ${r.company}`);
  if (r.project) lines.push(`Project: ${r.project}`);
  lines.push(`Rating: ${r.rating} out of 5`, `OK to show on the website: ${r.canPublish ? "Yes" : "No"}`, "", "Review:", r.review, "", `Reference: ${ref}`);
  return { subject: `Client review ${ref} from ${r.fullName}`, body: lines.join("\n") };
}

// Many email apps refuse very long mailto links, so the link is kept under this length (once encoded).
export const MAX_LINK_LENGTH = 1800;
const NOTE = "\n\n[Shortened to fit. The sender has the full text.]";

// Cutting between the two halves of an emoji would make encoding throw, so never leave half of one.
const safeSlice = (s: string, n: number) => {
  const cut = s.slice(0, n);
  const last = cut.charCodeAt(cut.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? cut.slice(0, -1) : cut;
};

export type MailLinks = {
  mailto: string;
  gmail: string;
  truncated: boolean;
  fullText: string; // everything, for the Copy button
};

export function buildMail(to: string, { subject, body }: Message): MailLinks {
  const enc = encodeURIComponent;
  const makeMailto = (b: string) => `mailto:${to}?subject=${enc(subject)}&body=${enc(b.replace(/\n/g, "\r\n"))}`;

  let used = body;
  let truncated = false;
  if (makeMailto(body).length > MAX_LINK_LENGTH) {
    truncated = true;
    let lo = 0;
    let hi = body.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (makeMailto(safeSlice(body, mid).trimEnd() + NOTE).length <= MAX_LINK_LENGTH) lo = mid;
      else hi = mid - 1;
    }
    used = safeSlice(body, lo).trimEnd() + NOTE;
  }

  return {
    mailto: makeMailto(used),
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(used)}`,
    truncated,
    fullText: `To: ${to}\nSubject: ${subject}\n\n${body}`,
  };
}

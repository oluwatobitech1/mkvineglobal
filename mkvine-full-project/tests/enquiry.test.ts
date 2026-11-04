import { describe, expect, it } from "vitest";
import { contactSchema, enquirySchema } from "@/lib/validation/enquiry";
import { MAX_LINK_LENGTH, buildMail, composeContact, composeEnquiry, makeReference } from "@/lib/mailto";

const valid = {
  fullName: "Ada Obi", company: "Obi Ltd", email: "ada@example.com", phone: "+234 801 234 5678",
  contactMethod: "email", services: ["website", "branding"], projectTitle: "New site",
  description: "We need a new website and a refreshed brand identity.", goals: "", audience: "", existingWebsite: "",
  existingApp: "", additional: "", budget: "500-1000", timeline: "1-month", details: { web_pages: "5" },
};

describe("enquiry validation", () => {
  it("accepts a valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });
  it("rejects bad email, empty services, unknown budget and bad URL", () => {
    expect(enquirySchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, services: [] }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, budget: "free" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, existingWebsite: "javascript:alert(1)" }).success).toBe(false);
  });
  it("accepts a valid https URL", () => {
    expect(enquirySchema.safeParse({ ...valid, existingWebsite: "https://example.com" }).success).toBe(true);
  });
  it("strips line breaks from single-line fields (header injection)", () => {
    const r = enquirySchema.parse({ ...valid, fullName: "Ada\r\nBcc: evil@x.com" });
    expect(r.fullName).not.toMatch(/[\r\n]/);
  });
  it("drops unknown detail keys", () => {
    const r = enquirySchema.parse({ ...valid, details: { web_pages: "5", hack: "z" } });
    expect(Object.keys(r.details)).toEqual(["web_pages"]);
  });
  it("rejects oversized descriptions", () => {
    expect(enquirySchema.safeParse({ ...valid, description: "x".repeat(4001) }).success).toBe(false);
  });
  it("validates the contact form", () => {
    const base = { fullName: "Ada", email: "ada@example.com", message: "Hello there, a question." };
    expect(contactSchema.safeParse(base).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, message: "hi" }).success).toBe(false);
  });
});

describe("reference numbers", () => {
  it("has the expected shape and uses only unambiguous characters", () => {
    const d = new Date("2026-11-01T12:00:00Z");
    expect(makeReference(d, new Uint8Array([0, 1, 2, 3, 4, 5]))).toBe("MKV-20261101-ABCDEF");
    expect(makeReference(d)).toMatch(/^MKV-20261101-[A-HJKMNP-TV-Z2-9]{6}$/);
  });
  it("differs between calls", () => {
    expect(makeReference()).not.toBe(makeReference());
  });
});

describe("composing the email", () => {
  const ref = "MKV-TEST";
  it("writes every answer the visitor gave, in readable form", () => {
    const m = composeEnquiry(enquirySchema.parse(valid), ref);
    expect(m.subject).toBe("Project enquiry MKV-TEST: New site");
    for (const part of ["Ada Obi", "ada@example.com", "Website design and development", "Branding and graphic design", "£500 to £1,000", "Within one month", "How many pages do you expect?", "Reference: MKV-TEST"])
      expect(m.body).toContain(part);
  });
  it("does not carry an empty optional field", () => {
    expect(composeEnquiry(enquirySchema.parse(valid), ref).body).not.toContain("Business goals");
  });
  it("composes the contact message", () => {
    const m = composeContact(contactSchema.parse({ fullName: "Ada", email: "ada@example.com", message: "A question for you." }), ref);
    expect(m.subject).toContain("Ada");
    expect(m.body).toContain("A question for you.");
  });
});

describe("building the links", () => {
  const to = "someone@example.com";
  const fits = (s: string) => s.length <= MAX_LINK_LENGTH;

  it("makes a mailto link that decodes back to the message", () => {
    const msg = composeEnquiry(enquirySchema.parse(valid), "MKV-TEST");
    const l = buildMail(to, msg);
    expect(l.mailto.startsWith(`mailto:${to}?subject=`)).toBe(true);
    const url = new URL(l.mailto);
    expect(url.searchParams.get("subject")).toBe(msg.subject);
    expect((url.searchParams.get("body") ?? "").replace(/\r\n/g, "\n")).toBe(msg.body);
    expect(l.truncated).toBe(false);
    expect(l.gmail).toContain("mail.google.com");
  });
  it("shortens a very long message to fit a link, keeps the important details, and keeps the full text to copy", () => {
    const long = enquirySchema.parse({ ...valid, description: "word ".repeat(790).trim(), goals: "g ".repeat(900).trim() });
    const msg = composeEnquiry(long, "MKV-TEST");
    const l = buildMail(to, msg);
    expect(l.truncated).toBe(true);
    expect(fits(l.mailto)).toBe(true);
    const body = new URL(l.mailto).searchParams.get("body") ?? "";
    expect(body).toContain("Ada Obi");
    expect(body).toContain("£500 to £1,000");
    expect(body).toContain("Shortened to fit");
    expect(l.fullText).toContain(long.goals); // nothing lost in the copy
  });
  it("never breaks on emoji at the cut point", () => {
    const msg = composeContact(contactSchema.parse({ fullName: "Ada", email: "ada@example.com", message: "😀".repeat(1500) }), "MKV-TEST");
    expect(() => buildMail(to, msg)).not.toThrow();
  });
  it("keeps special characters intact", () => {
    const msg = composeContact(contactSchema.parse({ fullName: "Ada & Co", email: "ada@example.com", message: "100% sure? Yes #1 + more = ok" }), "MKV-TEST");
    const body = new URL(buildMail(to, msg).mailto).searchParams.get("body") ?? "";
    expect(body).toContain("100% sure? Yes #1 + more = ok");
  });
});

import { describe, expect, it } from "vitest";
import { reviewSchema } from "@/lib/validation/enquiry";
import { buildMail, composeReview, makeReference } from "@/lib/mailto";
import { site } from "@/config/site";
import { reviews } from "@/content/reviews";

const valid = { fullName: "Ada Obi", email: "ada@example.com", company: "Obi Ltd", project: "Website design", rating: "5", review: "Great to work with, and the site looks excellent.", canPublish: true };

describe("client review form", () => {
  it("accepts a valid review", () => {
    expect(reviewSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a bad email, a missing rating, and a review that is too short", () => {
    expect(reviewSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(reviewSchema.safeParse({ ...valid, rating: "9" }).success).toBe(false);
    expect(reviewSchema.safeParse({ ...valid, review: "ok" }).success).toBe(false);
  });
  it("strips line breaks from single-line fields (header injection)", () => {
    const r = reviewSchema.parse({ ...valid, fullName: "Ada\r\nBcc: evil@x.com" });
    expect(r.fullName).not.toMatch(/[\r\n]/);
  });
  it("addresses the email to the agency inbox and carries the answers", () => {
    const ref = makeReference();
    const m = composeReview(reviewSchema.parse(valid), ref);
    const links = buildMail(site.contact.email, m);
    expect(links.mailto.startsWith(`mailto:${site.contact.email}?`)).toBe(true);
    expect(m.subject).toContain(ref);
    expect(m.body).toContain("Rating: 5 out of 5");
    expect(m.body).toContain("OK to show on the website: Yes");
    expect(m.body).toContain(valid.review);
  });
  it("only ever lists reviews with real text and a name", () => {
    for (const r of reviews) {
      expect(r.name.length).toBeGreaterThan(1);
      expect(r.text.length).toBeGreaterThan(9);
    }
  });
});

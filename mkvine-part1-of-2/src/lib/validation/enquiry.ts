import { z } from "zod";
import { budgetOptions, contactMethods, detailKeys, serviceOptions, timelineOptions } from "@/config/estimator";

// Strips control characters; single-line fields also lose line breaks (blocks email header injection).
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/\r\n?/g, "\n").trim();
const oneLine = (s: string) => clean(s).replace(/\s*\n+\s*/g, " ");

const line = (max: number) => z.string().transform(oneLine).pipe(z.string().max(max, `Keep this under ${max} characters`));
const text = (max: number) => z.string().transform(clean).pipe(z.string().max(max, `Keep this under ${max} characters`));
const optionalUrl = z
  .string()
  .transform(oneLine)
  .pipe(
    z.string().max(300).refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(v), "Enter a full web address starting with http:// or https://"),
  );

const values = <T extends readonly { value: string }[]>(o: T) => o.map((x) => x.value) as [string, ...string[]];

export const enquirySchema = z.object({
  fullName: line(100).pipe(z.string().min(2, "Enter your full name")),
  company: line(120).default(""),
  email: line(254).pipe(z.email("Enter a valid email address")),
  phone: line(30).pipe(z.string().refine((v) => v === "" || /^[+()\d][\d\s().-]{5,}$/.test(v), "Enter a valid phone number")).default(""),
  contactMethod: z.enum(values(contactMethods), "Choose how we should contact you"),
  services: z.array(z.enum(values(serviceOptions))).min(1, "Choose at least one service").max(11),
  projectTitle: line(120).pipe(z.string().min(3, "Give your project a title")),
  description: text(4000).pipe(z.string().min(20, "Describe your project in at least a couple of sentences")),
  goals: text(2000).default(""),
  audience: text(1000).default(""),
  existingWebsite: optionalUrl.default(""),
  existingApp: optionalUrl.default(""),
  additional: text(2000).default(""),
  budget: z.enum(values(budgetOptions), "Choose a budget range"),
  timeline: z.enum(values(timelineOptions), "Choose a timeline"),
  details: z
    .record(z.string(), text(500))
    .default({})
    .transform((d) => Object.fromEntries(Object.entries(d).filter(([k, v]) => detailKeys.includes(k) && v !== ""))),
});
export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export const contactSchema = z.object({
  fullName: line(100).pipe(z.string().min(2, "Enter your name")),
  email: line(254).pipe(z.email("Enter a valid email address")),
  message: text(4000).pipe(z.string().min(10, "Write a short message")),
});
export type ContactInput = z.input<typeof contactSchema>;
export type Contact = z.output<typeof contactSchema>;

// Fields to check on each estimator step (client side).
export const stepFields = [
  ["fullName", "company", "email", "phone", "contactMethod"],
  ["services"],
  ["projectTitle", "description", "goals", "audience", "existingWebsite", "existingApp", "additional", "details"],
  ["budget"],
  ["timeline"],
] as const;

export const ratingOptions = [
  { value: "5", label: "5 – Excellent" },
  { value: "4", label: "4 – Very good" },
  { value: "3", label: "3 – Good" },
  { value: "2", label: "2 – Fair" },
  { value: "1", label: "1 – Poor" },
] as const;

export const reviewSchema = z.object({
  fullName: line(100).pipe(z.string().min(2, "Enter your name")),
  email: line(254).pipe(z.email("Enter a valid email address")),
  company: line(120).default(""),
  project: line(120).default(""),
  rating: z.enum(["5", "4", "3", "2", "1"], "Choose a rating"),
  review: text(2000).pipe(z.string().min(10, "Write a sentence or two about working with us")),
  canPublish: z.boolean().default(false),
});
export type ReviewInput = z.input<typeof reviewSchema>;
export type Review = z.output<typeof reviewSchema>;

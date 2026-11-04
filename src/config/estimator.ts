// Options and follow-up questions for the project estimator. Edit here to change the form.
export const serviceOptions = [
  { value: "branding", label: "Branding and graphic design" },
  { value: "website", label: "Website design and development" },
  { value: "ecommerce", label: "E-commerce development" },
  { value: "software", label: "Custom software" },
  { value: "mobile", label: "Mobile application development" },
  { value: "playstore", label: "Google Play publishing" },
  { value: "motion", label: "Motion graphics" },
  { value: "video", label: "Video editing" },
  { value: "maintenance", label: "Website maintenance" },
  { value: "uiux", label: "UI/UX consulting" },
  { value: "other", label: "Other" },
] as const;

export const budgetOptions = [
  { value: "under-250", label: "Under £250" },
  { value: "250-500", label: "£250 to £500" },
  { value: "500-1000", label: "£500 to £1,000" },
  { value: "1000-2500", label: "£1,000 to £2,500" },
  { value: "2500-5000", label: "£2,500 to £5,000" },
  { value: "above-5000", label: "Above £5,000" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "2-weeks", label: "Within two weeks" },
  { value: "1-month", label: "Within one month" },
  { value: "1-3-months", label: "Within one to three months" },
  { value: "flexible", label: "Flexible timeline" },
] as const;

export const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type FollowUp = { key: string; label: string; hint?: string };
export type FollowUpGroup = { id: string; title: string; triggers: string[]; questions: FollowUp[] };

export const followUpGroups: FollowUpGroup[] = [
  {
    id: "web",
    title: "About your website",
    triggers: ["website", "ecommerce", "software"],
    questions: [
      { key: "web_pages", label: "How many pages do you expect?" },
      { key: "web_ecommerce", label: "Do you need e-commerce features?", hint: "For example, selling products or taking payments." },
      { key: "web_integrations", label: "Which integrations do you need?", hint: "For example, payments, booking, CRM." },
      { key: "web_hosting", label: "Do you already have a domain or hosting?" },
    ],
  },
  {
    id: "app",
    title: "About your mobile app",
    triggers: ["mobile", "playstore"],
    questions: [
      { key: "app_platform", label: "Android, iOS, or both?" },
      { key: "app_features", label: "Which features do you need?" },
      { key: "app_auth", label: "Do users need to sign in?" },
      { key: "app_backend", label: "Do you need a backend or API?" },
      { key: "app_publishing", label: "Do you need help publishing it?" },
    ],
  },
  {
    id: "brand",
    title: "About your branding",
    triggers: ["branding"],
    questions: [
      { key: "brand_scope", label: "A logo only, or a full identity?" },
      { key: "brand_deliverables", label: "Which deliverables do you need?" },
      { key: "brand_assets", label: "Do you have existing brand assets?" },
    ],
  },
  {
    id: "motion",
    title: "About your motion or video work",
    triggers: ["motion", "video"],
    questions: [
      { key: "motion_duration", label: "How long should the video be?" },
      { key: "motion_footage", label: "Do you have source footage?" },
      { key: "motion_formats", label: "Which formats do you need?", hint: "For example, 16:9 or vertical for social." },
      { key: "motion_type", label: "What type of animation or edit?" },
    ],
  },
];

export const detailKeys = followUpGroups.flatMap((g) => g.questions.map((q) => q.key));
export const labelOf = (opts: readonly { value: string; label: string }[], v: string) => opts.find((o) => o.value === v)?.label ?? v;

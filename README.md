# MKVine Design Agency website

A Next.js website for MKVine Design Agency. It has the public pages, a multi step project enquiry form, a contact form, search engine setup and a static HTML build that can be previewed in VS Code Live Server and uploaded to any web host.

There is no database, no admin area and no server code by design. Content lives in files, and the forms open the visitor's own email app (a mailto link), so enquiries arrive as ordinary emails.

## What is inside

- Next.js (App Router), React, TypeScript, Tailwind CSS
- Forms: React Hook Form and Zod, with the email written by `src/lib/mailto.ts`
- Motion: plain CSS plus one small script (`src/lib/motion.ts`), switched off for visitors who prefer reduced motion
- Tests: Vitest

## Run it on your computer

You need Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local     # only needs your site address
npm run dev                    # http://localhost:3000
```

No email service or API key is needed.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm test` | Run the automated tests |
| `npm run lint` | Check the code |
| `npm run build:static` | Make the plain HTML site in the `out` folder (Live Server preview, or upload to your host) |

## Where to change things

| To change | Edit |
| --- | --- |
| Company name, contact email, WhatsApp, social links | `src/config/site.ts` (empty values stay hidden). `contact.email` is where enquiries go |
| Services | `src/content/services.ts` |
| Prices and packages | `src/content/pricing.ts` |
| Founders, bios, photos | `src/content/team.ts` |
| Portfolio projects | `src/content/projects.ts` |
| Client reviews shown on the site | `src/content/reviews.ts` (only reviews the client agreed to show; reviews arrive by email from the form at `/reviews`) |
| Portfolio pictures | save the named files from `docs/BRANDING-IMAGES.md` into `public/work/<project-slug>/` (header, footer, contact and numbered sections like `05-logo-grid-and-proportion-system.png`). They appear automatically. `npm run images:setup` recreates the folders and the list |
| Articles | `src/content/posts.ts` |
| FAQ | `src/content/faqs.ts` |
| Legal pages (drafts) | `src/content/legal.ts` |
| Estimator options and questions | `src/config/estimator.ts` |
| Colours | the variables at the top of `src/app/globals.css` |
| Animation speeds and distances | the Motion section of `src/app/globals.css` |
| Logo | `src/components/layout/Logo.tsx` (set `LOGO_SRC`) |
| Share image | `public/og.png` |
| Browser icon | `src/app/icon.svg` |

New pages are added to the sitemap by listing them in `publicPaths()` in `src/lib/seo.ts`.

## Company details (UK trading disclosures)

The legal entity is MKVINE DESIGN LTD, trading as MKVINE DESIGN AGENCY (England and Wales, company number 17551166). The details live in one place, `company` in `src/config/site.ts`, and feed the footer notice. The main site keeps the name MKVine Design Agency.

The registered office is for official correspondence only. Do not add a map, a map embed or a map link for it anywhere. A test (`tests/compliance.test.ts`) fails if a map embed or map link appears in the code, and the address is deliberately left out of the structured data.

The copyright year is set by hand in the same file (`copyrightYear`).

## How the forms work

Nothing is sent by the website itself. When a visitor finishes a form, `src/lib/mailto.ts` writes the email (subject, every answer, a reference such as `MKV-20261101-K7P3QD`) and opens it in their email app, addressed to `contact.email` in `src/config/site.ts`. They press Send there.

The page says plainly that nothing has been sent yet, and offers three fallbacks for visitors with no email app set up: open the same message in Gmail, copy the text, or see the address to write to. Very long messages are shortened inside the link (many email apps refuse long links), and the Copy button always holds the full text.

What this means in practice: you cannot see which visitors opened the form but did not press Send, and you get no automatic confirmation to the visitor. When you reply to an enquiry, add the company line to your email signature (see `docs/DEPLOYMENT.md`).

There is no server to protect. The forms still check every field in the browser (valid email and web addresses, size limits), and line breaks are stripped from single line fields.

## Live Server preview

`npm run build:static` creates the `out` folder. Open that folder in VS Code and run Live Server on `index.html`. The forms work here too, because they only open your email app. See `out/HOW-TO-PREVIEW.txt`. The same folder is what you upload to your host.

## Known limits

- No admin area: content changes mean editing files and redeploying.
- No database: enquiries are not stored on the site, and you only see the ones visitors actually send.
- The legal pages are drafts and need confirmation and legal review.
- Analytics are not installed. The cookie page says so. Add consent handling before adding any analytics.
- A strict Content Security Policy is not set, because the site uses a small inline script. Security headers come from `next.config.ts` on Vercel, or from `docs/hostinger.htaccess` on Hostinger.

## Before launch

Work through `docs/LAUNCH-CHECKLIST.md` and follow `docs/DEPLOYMENT.md`.

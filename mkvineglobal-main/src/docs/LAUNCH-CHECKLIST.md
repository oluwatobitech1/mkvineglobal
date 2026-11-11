# Launch checklist

Everything the site still needs from the company. Anything left empty stays hidden, so nothing fake is published.

## 1. Business details (`src/config/site.ts`)
- [x] Public business email (Osenih70@gmail.com, set in `src/config/site.ts`)
- [ ] Phone number
- [x] WhatsApp link (+44 7523 640950)
- [ ] Business address (field exists, no place on the site shows it yet)
- [ ] Consultation booking link (the Book a Consultation button is not built until this exists)
- [x] Company social links added: Instagram, Facebook, TikTok, X (LinkedIn and YouTube still empty, left hidden)

## 2. Domain and hosting
- [x] Forms use mailto, so no email service, API key or sender domain is needed
- [ ] Final domain name (`NEXT_PUBLIC_SITE_URL` in `.env.local`, set before building)
- [ ] Hostinger access (File Manager or FTP) to upload the `out` folder, or GitHub and Vercel accounts if you host there
- [ ] HTTPS switched on for the domain
- [ ] Email signature with the company details added to the inbox that replies to enquiries

## 3. Brand assets
- [ ] Official logo (SVG preferred, plus PNG) to replace the text logo
- [ ] Favicon or icon if different from the temporary gold M (`src/app/icon.svg`)
- [ ] Final share image if you want to replace `public/og.png`
- [ ] Hero video of the founders working plus a poster image (video support is not built yet)

## 4. Team (`src/content/team.ts`)
- [ ] Professional photo for each founder
- [ ] Verified social or profile links for each founder
- [ ] Confirm the bios, titles and the company name used inside them (the bios say MKVine Design Agency)
- [ ] Decide whether to keep the responsibilities line under each bio

## 5. Portfolio (`src/content/projects.ts`)
For each real project: name, category, client name (with permission), short description, objective, services delivered, challenge, solution, verified results only, images, live link, and whether it is a concept project.

- [ ] At least a few approved projects

## 6. Testimonials and articles
- [ ] Genuine, approved client testimonials (the section is not shown until they exist)
- [ ] Articles for the Insights page (`src/content/posts.ts`)

## 7. Wording to confirm
- [ ] About page text
- [ ] FAQ answers
- [ ] Service descriptions and the seven step process
- [ ] Prices (all in GBP) and whether the additional services should show prices
- [ ] Whether to promise a reply time (the emails promise none)

## 8. Legal (all pages are drafts, `src/content/legal.ts`)
- [ ] Registered company name and registration details, if any
- [ ] Business address
- [x] Retention (12 months) and privacy contact (the business email) written into the draft, pending legal review
- [ ] Governing law or country
- [ ] Refund and cancellation terms
- [ ] Payment terms, revisions and delivery timelines
- [ ] Who owns the finished work, and permission to show it in the portfolio
- [ ] Analytics choice (if any) and consent handling
- [ ] Review by a legal professional

## 9. Final checks (see `docs/DEPLOYMENT.md`)
- [ ] Forms tested on the live site with real email
- [ ] Mobile menu and forms tested on real phones
- [ ] Lighthouse scores measured and recorded
- [ ] Sitemap submitted to Google Search Console
- [ ] Set `LEGAL_REVIEWED = true` in `src/content/legal.ts` once approved. This removes the "Draft" banners, lets search engines index the legal pages and adds them to the sitemap

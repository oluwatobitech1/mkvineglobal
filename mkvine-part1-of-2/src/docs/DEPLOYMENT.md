# Deployment guide

The site needs no server, no database and no email service. The forms open the visitor's email app, so the whole site is plain files that any web host can serve. You have two options. Option A uses your Hostinger hosting. Option B uses Vercel.

## Option A: Hostinger (static files)

1. **Set your address.** Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain, for example `https://yourdomain.com`. This must be done before building, because page addresses and the sitemap are written at build time.
2. **Build.** Run `npm install` once, then `npm run build:static`. This creates the `out` folder.
3. **Upload.** In Hostinger hPanel open File Manager, go to `public_html`, and upload everything inside `out` (not the folder itself). Include the hidden `_next` folder. Make sure `index.html` ends up directly in `public_html`.
4. **HTTPS.** In hPanel switch on the free SSL for the domain and wait until it shows active.
5. **Optional security file.** Upload `docs/hostinger.htaccess` to `public_html` and rename it to `.htaccess`. It forces HTTPS and sets the security headers. Only do this after step 4. If the site ever shows an error after adding it, delete the file.
6. **Check.** Follow the checks below.

Updating the site later: edit the files in `src/content` or `src/config`, run `npm run build:static` again, and upload the new `out` contents over the old ones.

## Option B: Vercel

1. Put the project on GitHub (the `.gitignore` already keeps `node_modules`, `.next` and `.env.local` out).
2. In Vercel choose Add New, Project, import the repository. It detects Next.js.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your real domain.
4. Deploy. Add your domain under Settings, Domains and follow the DNS instructions. HTTPS is automatic.
5. The security headers in `next.config.ts` apply on Vercel.

## Checks after going live

- [ ] Open the home page, then a page two levels deep (for example `/services/web-development/`), and reload it. Both should load with styling.
- [ ] Use the project form from start to finish with a real answer. Your email app should open with every answer written out. Press Send and confirm it arrives at the business inbox.
- [ ] Do the same with the contact form.
- [ ] Try the form on a phone, and on a computer with no email app set up. The Open in Gmail and Copy buttons should work.
- [ ] Open `/sitemap.xml` and `/robots.txt` and check the addresses are your real domain.
- [ ] Look at the page source for one page and check the canonical address is your real domain.
- [ ] Run Lighthouse on the live site (Chrome DevTools, Lighthouse tab) and keep the scores you actually see.
- [ ] Add the site to Google Search Console and submit `/sitemap.xml`.
- [ ] When the legal text is approved, set `LEGAL_REVIEWED = true` in `src/content/legal.ts`, rebuild and upload again.

## Replying to enquiries

Emails from the company must carry the company details. Add this to the signature of the inbox that replies:

> MKVINE DESIGN LTD, trading as MKVINE DESIGN AGENCY, is registered in England and Wales. Company Number: 17551166. Registered Office (Official Correspondence Only): Flat 2, 31 St Swithuns Road, Bournemouth, BH1 3RG, United Kingdom.

## Backups and monitoring

- The code is the backup: keep it in GitHub. Everything on the site comes from the files in the project.
- Keep a copy of the `out` folder you last uploaded.
- Check the business inbox, including spam, so enquiries are not missed. Nothing else is stored anywhere.
- Re-run Lighthouse after big changes.

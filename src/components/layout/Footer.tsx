import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcon } from "./SocialIcon";
import { site, company, socialLabels, nav, serviceLinks, legalLinks } from "@/config/site";

export function Footer() {
  const { email, phone, whatsapp } = site.contact;
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-base font-bold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {nav.map((n) => (
              <li key={n.href}><Link className="link-u hover:text-ink" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="font-display text-base font-bold">Services</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {serviceLinks.map((s) => (
              <li key={s.href}><Link className="link-u hover:text-ink" href={s.href}>{s.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-bold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {email && <li><a className="link-u inline-flex items-center gap-2.5 break-all hover:text-ink" href={`mailto:${email}`}><Mail size={18} aria-hidden className="shrink-0" />{email}</a></li>}
            {phone && <li><a className="link-u inline-flex items-center gap-2.5 hover:text-ink" href={`tel:${phone}`}><Phone size={18} aria-hidden className="shrink-0" />{phone}</a></li>}
            {!email && !phone && !whatsapp && socials.length === 0 && (
              <li><Link className="link-u hover:text-ink" href="/contact">Send us an enquiry</Link></li>
            )}
          </ul>
          {(whatsapp || socials.length > 0) && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {whatsapp && (
                <li><a aria-label="WhatsApp" title="WhatsApp" href={whatsapp} rel="noopener noreferrer" target="_blank" className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"><SocialIcon name="whatsapp" size={18} /></a></li>
              )}
              {socials.map(([name, url]) => (
                <li key={name}><a aria-label={socialLabels[name] ?? name} title={socialLabels[name] ?? name} href={url} rel="noopener noreferrer" target="_blank" className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"><SocialIcon name={name} size={18} /></a></li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 lg:px-8">
          <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {company.copyrightYear} {company.legalName}. Trading as {company.tradingName}. All rights reserved.</p>
            <ul className="flex gap-5">
              {legalLinks.map((l) => (
                <li key={l.href}><Link className="link-u hover:text-ink" href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Company disclosure: small and discreet on purpose, but still above the contrast minimum (light grey on near black) */}
          <p className="max-w-4xl text-[11px] leading-relaxed text-muted">
            {company.legalName} is registered in {company.jurisdiction} | Company Number: {company.number}. Registered Office (Official Correspondence Only): {company.registeredOffice}. Strictly no walk-ins or unsolicited visitors accepted at this address. For project or career inquiries, please contact us online via our{" "}
            <Link href="/contact" className="whitespace-nowrap underline underline-offset-2 hover:text-ink">Contact Page</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}

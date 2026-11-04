import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Reads public/work/<slug>/ at build time, so adding a picture needs no code change.
//
//   header.png   top of the page (also the card cover)
//   footer.png   bottom of the page
//   contact.png  closing image, shown just above the contact band
//   Website projects:  1.png, 2.png, 3.png ...  extra screens, in numeric order
//   Branding projects: one image slot per item in `servicesDelivered`, matched by its position in the list:
//        01.png, 01-b.png   -> item 1  (a second image for the same item)
//        02-logo-grid.png   -> item 2  (anything after the number is free text, for your own reference)
export type ProjectImages = {
  header?: string;
  footer?: string;
  contact?: string;
  shots: string[];
  sections: string[][]; // index 0 = item 1 of servicesDelivered
};

const EXT = /\.(png|jpe?g|webp|avif)$/i;
const SECTION = /^(\d{1,2})(?:[-_ .].*)?$/;

export function getProjectImages(slug: string, sectionCount = 0): ProjectImages {
  const empty: ProjectImages = { shots: [], sections: Array.from({ length: sectionCount }, () => []) };
  const dir = join(process.cwd(), "public", "work", slug);
  if (!existsSync(dir)) return empty;
  const files = readdirSync(dir).filter((f) => EXT.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const url = (f: string) => `/work/${slug}/${f}`;
  const stem = (f: string) => f.replace(EXT, "");
  const named = (n: string) => files.find((f) => stem(f).toLowerCase() === n);
  const header = named("header");
  const footer = named("footer");
  const contact = named("contact");

  if (sectionCount > 0) {
    const sections = empty.sections;
    for (const f of files) {
      const m = SECTION.exec(stem(f));
      const n = m ? parseInt(m[1], 10) : 0;
      if (n >= 1 && n <= sectionCount) sections[n - 1].push(url(f));
    }
    return { header: header && url(header), footer: footer && url(footer), contact: contact && url(contact), shots: [], sections };
  }

  const shots = files
    .filter((f) => /^\d+$/.test(stem(f)))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map(url);
  return { header: header && url(header), footer: footer && url(footer), contact: contact && url(contact), shots, sections: [] };
}

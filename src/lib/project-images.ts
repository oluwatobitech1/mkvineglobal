import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Reads public/work/<slug>/ at build time, so adding a picture needs no code change.
//
//   header.png   top of the page (also the card cover)
//   main.png     websites only: the main (home) screen
//   footer.png   bottom of the page
//   contact.png  closing image, shown just above the contact band
//   Numbered files fill the numbered slots, matched by the number at the start of the name:
//        Branding projects: one slot per item in `servicesDelivered`   (05-logo-grid-and-proportion-system.png)
//        Website projects:  one slot per item in `screens`, and any extra numbers you add (01-..., 02-..., 03-...)
//        A second picture for the same slot: add a letter, e.g. 05-logo-grid-and-proportion-system-b.png
export type ProjectImages = {
  header?: string;
  main?: string;
  footer?: string;
  contact?: string;
  shots: string[]; // website numbered screens, flat, in order (used for the card cover fallback)
  sections: string[][]; // index 0 = slot 1 (branding: item 1 of servicesDelivered; websites: screen 1)
};

const EXT = /\.(png|jpe?g|webp|avif)$/i;
const SECTION = /^(\d{1,2})(?:[-_ .].*)?$/;

// slotCount = number of named slots. Websites may have more numbered files than named slots; the extra ones are kept.
export function getProjectImages(slug: string, slotCount = 0): ProjectImages {
  const empty: ProjectImages = { shots: [], sections: Array.from({ length: slotCount }, () => []) };
  const dir = join(process.cwd(), "public", "work", slug);
  if (!existsSync(dir)) return empty;
  const stem = (f: string) => f.replace(EXT, "");
  const files = readdirSync(dir).filter((f) => EXT.test(f)).sort((a, b) => stem(a).localeCompare(stem(b), undefined, { numeric: true })); // by name without extension, so 05-x comes before 05-x-b
  const url = (f: string) => `/work/${slug}/${f}`;
  const named = (n: string) => files.find((f) => stem(f).toLowerCase() === n);
  const pick = (n: string) => {
    const f = named(n);
    return f ? url(f) : undefined;
  };

  const sections = empty.sections;
  for (const f of files) {
    const m = SECTION.exec(stem(f));
    const n = m ? parseInt(m[1], 10) : 0;
    if (n < 1) continue;
    while (sections.length < n) sections.push([]); // extra numbers beyond the named slots
    sections[n - 1].push(url(f));
  }
  return { header: pick("header"), main: pick("main"), footer: pick("footer"), contact: pick("contact"), shots: sections.flat(), sections };
}

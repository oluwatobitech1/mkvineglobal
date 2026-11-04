// Prints (and writes to docs/BRANDING-IMAGES.md) the exact image file names for every branding project.
// Run:  node --experimental-strip-types scripts/image-guide.mjs
import { writeFileSync } from "node:fs";
import { projects } from "../src/content/projects.ts";

const pad = (n) => String(n).padStart(2, "0");
let out = "# Branding project images\n\nDrop files into `public/work/<project>/`. Formats: png, jpg, webp, avif.\n\n";
out += "- `header.png` is the top image and the card cover.\n- `footer.png` is the closing image.\n- `contact.png` is shown just above the contact band.\n";
out += "- `01.png`, `02.png`, ... belong to the numbered list item below. Add more for the same item with `01-b.png`, `01-c.png` (anything after the number is free).\n\n";
for (const p of projects.filter((x) => x.category === "Branding")) {
  out += `## ${p.title}  (public/work/${p.slug}/)\n\n| File | Section |\n| --- | --- |\n| header.png | Header |\n`;
  (p.servicesDelivered ?? []).forEach((s, i) => (out += `| ${pad(i + 1)}.png | ${s} |\n`));
  out += "| footer.png | Footer |\n| contact.png | Contact |\n\n";
}
writeFileSync("docs/BRANDING-IMAGES.md", out);
console.log(out);

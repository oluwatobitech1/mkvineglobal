// Creates every project image folder in public/work/<slug>/ and writes the exact file names to
//   docs/BRANDING-IMAGES.md  (the master list)  and  public/work/<slug>/_FILE-NAMES.txt  (a copy inside each folder).
// Run:  npm run images:setup      (safe to run again; it never touches your pictures)
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { projects } from "../src/content/projects.ts";

const pad = (n) => String(n).padStart(2, "0");
const slug = (t) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// One row per image slot for a project: [file name without extension, what it is]
function slots(p) {
  const isBrand = p.category === "Branding";
  const rows = [["header", "Header: top image and the card cover on the Our Work page"]];
  if (!isBrand) rows.push(["main", "Main: the main (home) screen of the website"]);
  const items = p.category === "Branding" ? (p.servicesDelivered ?? []) : (p.screens ?? []);
  items.forEach((t, i) => rows.push([`${pad(i + 1)}-${slug(t)}`, isBrand ? t : `${t} (screen ${i + 1})`]));
  if (!isBrand) rows.push([`${pad(items.length + 1)}-your-extra-screen`, "Optional: add as many extra screens as you like (03, 04, 05...); they appear automatically"]);
  rows.push(["footer", "Footer: closing image"], ["contact", "Contact: shown just above the contact band"]);
  return rows;
}

let md = `# Project image file names

Every project has a folder in \`public/work/<project>/\`. Save each picture into the right folder with **exactly** the name shown below.
Formats: png, jpg, webp or avif (use the same extension you export; the site accepts any of them). Nothing in the code needs to change.

- \`header\` is the top image and the card cover. \`footer\` is the closing image. \`contact\` sits just above the contact band.
- The number at the start (\`01\`, \`02\`...) decides which section the picture belongs to. The words after the number are only a label, so you may shorten them, but **keep the number and the dash**.
- Need two pictures for one section? Add a letter: \`05-logo-grid-and-proportion-system-b.png\`.
- If a file is missing, that section is simply left out of the page. Add them one at a time.

Regenerate this list after editing \`src/content/projects.ts\` with \`npm run images:setup\`.

`;
for (const p of projects) {
  const dir = `public/work/${p.slug}`;
  mkdirSync(dir, { recursive: true });
  const kind = p.category === "Branding" ? "Branding project" : "Website project";
  const rows = slots(p);
  md += `## ${p.title}  (${kind}, folder: ${dir}/)\n\n| # | File name | Section |\n| --- | --- | --- |\n`;
  rows.forEach(([f, label]) => (md += `| ${/^\d/.test(f) ? f.slice(0, 2) : "-"} | ${f}.png | ${label} |\n`));
  md += "\n";
  const txt = `${p.title}: file names for this folder\n${"=".repeat(40)}\nSave each picture here with exactly these names (png, jpg, webp or avif):\n\n` + rows.map(([f, l]) => `${f.padEnd(62)} ${l}`).join("\n") + "\n";
  writeFileSync(`${dir}/_FILE-NAMES.txt`, txt);
}
const docsDir = existsSync("docs") ? "docs" : "src/docs"; // your docs folder
writeFileSync(`${docsDir}/BRANDING-IMAGES.md`, md);
console.log(md);

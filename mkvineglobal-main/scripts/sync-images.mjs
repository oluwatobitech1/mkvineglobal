// Runs automatically before dev / build. Makes every picture you drop into public/ usable by the site:
//  - adds the missing extension (a file saved as "05-logo-grid" with no .png is detected and renamed 05-logo-grid.png)
//  - fixes the wrong extension (a JPEG named .png), upper-case extensions (.PNG) and .jpeg
//  - removes spaces and capitals from names ("Screenshot 2026 .PNG" -> "screenshot-2026.png")
// Folders: public/work/*  public/images/team  public/backgrounds  public/brand
import { existsSync, readdirSync, readFileSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["public/work", "public/images/team", "public/backgrounds", "public/brand"];
const KNOWN = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

function sniff(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0x89 && buf.toString("latin1", 1, 4) === "PNG") return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpg";
  if (buf.toString("latin1", 0, 4) === "RIFF" && buf.toString("latin1", 8, 12) === "WEBP") return "webp";
  if (buf.toString("latin1", 4, 8) === "ftyp" && /avif|avis/.test(buf.toString("latin1", 8, 16))) return "avif";
  if (buf.toString("latin1", 0, 3) === "GIF") return "gif";
  const head = buf.toString("utf8", 0, 300).toLowerCase();
  if (head.includes("<svg") || (head.includes("<?xml") && head.includes("svg"))) return "svg";
  return null;
}

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

let changed = 0;
for (const root of ROOTS) {
  if (!existsSync(root)) continue;
  for (const file of walk(root)) {
    const dir = file.slice(0, file.lastIndexOf("/"));
    const base = file.slice(dir.length + 1);
    if (base.startsWith("_") || base.startsWith(".")) continue; // helper notes
    if (/\.(txt|md|json|html?)$/i.test(base)) continue;
    const m = KNOWN.exec(base);
    const stem0 = m ? base.slice(0, m.index) : base;
    const real = sniff(readFileSync(file).subarray(0, 512));
    if (!real) { if (!m) console.warn(`sync-images: "${file}" is not a picture I recognise, ignored`); continue; }
    const stem = stem0.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
    const next = `${stem}.${real}`;
    if (next === base) continue;
    let target = join(dir, next);
    if (existsSync(target) && target !== file) {
      const n = Date.now().toString(36);
      target = join(dir, `${stem}-${n}.${real}`);
    }
    renameSync(file, target);
    changed++;
    console.log(`sync-images: ${file}  ->  ${target}`);
  }
}
if (changed === 0) console.log("sync-images: all pictures already have correct names");

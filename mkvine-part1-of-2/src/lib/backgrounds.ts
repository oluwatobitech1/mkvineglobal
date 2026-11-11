import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Page background pictures. Drop a file into  public/backgrounds/  named after the page and it appears
// automatically (no code change). If a file is missing, that page simply keeps its plain dark background.
//
//   home  about  services  work  pricing  team  insights  contact  faq  reviews  start-project  legal  cta
//
// Formats: png, jpg, jpeg, webp, avif.  "cta" is the closing "Have an idea?" band shown at the bottom of many pages.
export const backgroundNames = ["home", "about", "services", "work", "pricing", "team", "insights", "contact", "faq", "reviews", "start-project", "legal", "cta"] as const;
export type BackgroundName = (typeof backgroundNames)[number];

const EXT = /\.(png|jpe?g|webp|avif)$/i;

export function getBackground(name: BackgroundName): string | undefined {
  const dir = join(process.cwd(), "public", "backgrounds");
  if (!existsSync(dir)) return undefined;
  const file = readdirSync(dir).find((f) => EXT.test(f) && f.replace(EXT, "").toLowerCase() === name);
  return file ? `/backgrounds/${encodeURIComponent(file)}` : undefined;
}

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Reads public/images/team/ at build time. Save each founder's photo named after them (lowercase, dashes):
//   habeeb-oseni.jpg   adekunle-divine.jpg   oluwatobi-ayodele.jpg      (png, jpg, jpeg, webp or avif)
// No code change needed. With no file, the card shows the initials instead.
const EXT = /\.(png|jpe?g|webp|avif)$/i;

export function getTeamPhoto(name: string): string | undefined {
  const dir = join(process.cwd(), "public", "images", "team");
  if (!existsSync(dir)) return undefined;
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const file = readdirSync(dir).find((f) => EXT.test(f) && f.replace(EXT, "").toLowerCase() === key);
  return file ? `/images/team/${encodeURIComponent(file)}` : undefined;
}

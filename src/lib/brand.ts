import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Brand files. Drop them into  public/brand/  and they appear on the whole website automatically:
//   logo.(svg|png|webp|jpg)     header and footer logo
//   favicon.(png|ico|svg)       browser tab icon
//   og.(png|jpg)                picture shown when the site is shared on WhatsApp, LinkedIn, etc.
// If a file is missing the built-in default is used.
const EXT = /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i;

export function getBrandAsset(name: "logo" | "favicon" | "og"): string | undefined {
  const dir = join(process.cwd(), "public", "brand");
  if (!existsSync(dir)) return undefined;
  const file = readdirSync(dir).find((f) => EXT.test(f) && f.replace(EXT, "").toLowerCase() === name);
  return file ? `/brand/${encodeURIComponent(file)}` : undefined;
}

import Link from "next/link";
import Image from "next/image";

// Temporary text logo. To use the approved logo, drop the file in /public/images
// and pass its path via the `src` prop (or set LOGO_SRC below).
const LOGO_SRC: string | null = null;

// The logo reads just "MKVine" on every page.
export function Logo({ src = LOGO_SRC }: { src?: string | null }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="MKVine home">
      {src ? (
        <Image src={src} alt="MKVine" width={140} height={36} priority />
      ) : (
        <>
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-md bg-accent font-display text-lg font-extrabold text-black">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight">MKVine</span>
        </>
      )}
    </Link>
  );
}

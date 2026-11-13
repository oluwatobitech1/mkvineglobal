import Link from "next/link";

// Presentational only (it also runs in the client Header). layout.tsx finds the file and passes it as `src`.
// Text logo until you add a file: save your logo as  public/brand/logo.svg  (or .png / .webp)  and it replaces this everywhere.
// The logo reads just "MKVine" on every page.
export function Logo({ src }: { src?: string | null }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="MKVine home">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="MKVine" className="h-11 w-auto max-w-[240px] object-contain sm:h-14 sm:max-w-[300px]" />
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

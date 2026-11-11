import { getBackground, type BackgroundName } from "@/lib/backgrounds";

// A full-bleed background picture for the section it sits in. Put it FIRST inside a section that is
// `relative overflow-hidden`, and give the content after it `relative`. Renders nothing if no picture exists.
export function Backdrop({ name }: { name: BackgroundName }) {
  const src = getBackground(name);
  if (!src) return null;
  return (
    <div aria-hidden className="bg-photo pointer-events-none absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" decoding="async" className="h-full w-full object-cover" />
    </div>
  );
}

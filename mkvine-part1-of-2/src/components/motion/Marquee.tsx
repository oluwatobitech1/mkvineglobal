import type { CSSProperties } from "react";

// Endless horizontal text. Purely decorative, so it is hidden from screen readers.
// `reverse` makes it travel left to right. `duration` is seconds for one full loop (bigger = slower).
export function Marquee({ items, reverse = false, duration = 40, muted = false }: { items: string[]; reverse?: boolean; duration?: number; muted?: boolean }) {
  const loop = [...items, ...items];
  const track = (key: string) => (
    <div className="marquee-track" key={key}>
      {loop.map((text, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap font-display text-4xl font-extrabold sm:text-6xl lg:text-7xl ${muted ? "text-brand-muted-text" : "text-ink"}`}>
          <span className="px-6 sm:px-10">{text}</span>
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent sm:h-3.5 sm:w-3.5" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="marquee py-2" data-anim data-dir={reverse ? "right" : "left"} style={{ "--dur": `${duration}s` } as CSSProperties}>
      {track("a")}
      {track("b")}
    </div>
  );
}

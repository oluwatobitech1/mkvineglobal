"use client";

import { useEffect, useState } from "react";
import type { ClientReview } from "@/content/reviews";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

// Fades through the approved reviews on its own. It pauses while someone hovers or focuses it, and the dots
// let visitors pick a review. The fade comes from the site's own motion styles, which respect "reduced motion".
export function ReviewSlider({ items }: { items: ClientReview[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;
  const r = items[index % count];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      className="relative max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure key={index} className="anim-up rounded-xl border border-line bg-card p-8 sm:p-10" aria-live={paused ? "polite" : "off"}>
        {r.rating && <p className="text-xl text-accent" role="img" aria-label={`${r.rating} out of 5 stars`}>{stars(r.rating)}</p>}
        <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">“{r.text}”</blockquote>
        <figcaption className="mt-6 text-sm">
          <span className="font-semibold">{r.name}</span>
          {(r.company || r.project) && <span className="text-muted"> · {[r.company, r.project].filter(Boolean).join(", ")}</span>}
        </figcaption>
      </figure>
      {count > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show review ${i + 1} of ${count}`}
              aria-current={i === index % count}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${i === index % count ? "w-8 bg-accent" : "w-2.5 bg-line"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

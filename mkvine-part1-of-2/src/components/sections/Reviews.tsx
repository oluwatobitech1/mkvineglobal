import type { ClientReview } from "@/content/reviews";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export function ReviewCards({ items }: { items: ClientReview[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-stagger>
      {items.map((r, i) => (
        <figure key={`${r.name}-${i}`} className="flex flex-col rounded-xl border border-line bg-card p-6">
          {r.rating && <p className="text-accent" role="img" aria-label={`${r.rating} out of 5 stars`}>{stars(r.rating)}</p>}
          <blockquote className="mt-3 flex-1 leading-relaxed">“{r.text}”</blockquote>
          <figcaption className="mt-5 text-sm">
            <span className="font-semibold">{r.name}</span>
            {(r.company || r.project) && <span className="text-muted"> · {[r.company, r.project].filter(Boolean).join(", ")}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

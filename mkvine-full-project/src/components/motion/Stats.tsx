// Counters show true facts taken from the site's own content, never made-up figures.
export function Stats({ items }: { items: { value: number; label: string }[] }) {
  return (
    <section aria-label="At a glance" className="border-y border-line bg-bg-2">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-14 lg:grid-cols-4 lg:px-8" data-stagger>
        {items.map((s) => (
          <div key={s.label}>
            <dd className="order-first font-display text-6xl font-extrabold leading-none text-brand-blue sm:text-7xl">
              <span data-count={s.value} suppressHydrationWarning>{s.value}</span>
            </dd>
            <dt className="mt-3 max-w-[14rem] text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

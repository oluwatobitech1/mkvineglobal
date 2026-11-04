import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-24 lg:px-8">
      <p className="float inline-block font-display text-7xl font-extrabold text-brand-blue sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">This page doesn’t exist.</h1>
      <p className="mt-3 max-w-md text-muted">The link may be broken or the page may have moved. Head back home or tell us what you were looking for.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/contact" className="btn-ghost">Contact us</Link>
      </div>
    </section>
  );
}

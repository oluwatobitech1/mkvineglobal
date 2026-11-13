"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function Header({ logo }: { logo?: string | null }) {
  const pathname = usePathname();
  // The menu counts as open only on the page where it was opened, so it closes on navigation.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (v: boolean) => setOpenedOn(v ? pathname : null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock scroll, focus the close button, and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="site-header sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl sm:h-20 items-center justify-between px-5 lg:px-8">
        <Logo src={logo} />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.filter((n) => n.href !== "/").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`link-u rounded-md px-3 py-2 text-sm transition-colors hover:text-ink ${
                isActive(pathname, item.href) ? "text-accent" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/start-project" className="btn-primary hidden sm:inline-flex">
            Start a Project
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-line lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

    </header>

      {/* Outside the header on purpose: the header's blur would otherwise shrink this full-screen menu to the header's size */}
      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-bg px-5 py-4 lg:hidden">
          <div className="flex h-12 items-center justify-between">
            <Logo src={logo} />
            <button ref={closeRef} type="button" aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-md border border-line" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex flex-1 flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`border-b border-line py-4 font-display text-3xl font-bold ${isActive(pathname, item.href) ? "text-accent" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/start-project" className="btn-primary mt-6 w-full justify-center">
            Start a Project
          </Link>
        </div>
      )}
    </>
  );
}

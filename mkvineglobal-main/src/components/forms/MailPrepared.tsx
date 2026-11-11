"use client";

import { useEffect, useRef, useState } from "react";
import type { MailLinks } from "@/lib/mailto";

// Shown after the visitor completes a form. It is honest about the state: nothing has been sent until they press Send.
export function MailPrepared({ to, reference, links, onEdit }: { to: string; reference: string; links: MailLinks; onEdit: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState<"idle" | "yes" | "failed">("idle");

  useEffect(() => headingRef.current?.focus(), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.fullText);
      setCopied("yes");
    } catch {
      setCopied("failed");
    }
  };

  return (
    <div role="status" className="max-w-2xl rounded-xl border border-line bg-card p-6 sm:p-8">
      <h2 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-bold outline-none">Your email is ready to send</h2>
      <p className="mt-3 text-muted">
        <strong className="text-ink">Nothing has been sent yet.</strong> Your email app should have opened with your message written out. Press Send there to finish. Your reference is{" "}
        <span className="font-mono font-bold text-accent">{reference}</span>.
      </p>

      <p className="mt-6 text-sm font-semibold">If nothing opened, choose an option:</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a href={links.mailto} className="btn-primary">Open my email app</a>
        <a href={links.gmail} target="_blank" rel="noopener noreferrer" className="btn-ghost">Open in Gmail</a>
        <button type="button" className="btn-ghost" onClick={copy}>{copied === "yes" ? "Copied" : "Copy the text"}</button>
      </div>
      <p className="sr-only" aria-live="polite">{copied === "yes" ? "Copied to the clipboard" : ""}</p>

      <p className="mt-5 text-sm text-muted">
        Or paste it into an email to <a className="underline underline-offset-4 hover:text-ink" href={`mailto:${to}`}>{to}</a>.
      </p>
      {links.truncated && (
        <p className="mt-3 text-sm text-muted">Your message was long, so the email link carries a shortened version. Use “Copy the text” to paste the full message.</p>
      )}
      {copied === "failed" && <p role="alert" className="mt-3 text-sm text-danger">Error: copying did not work here. Select the text below and copy it yourself.</p>}

      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-semibold">Show the full text</summary>
        <textarea readOnly rows={10} value={links.fullText} className="input mt-3 font-mono text-xs" aria-label="Full message text" onFocus={(e) => e.currentTarget.select()} />
      </details>

      <button type="button" className="mt-6 text-sm text-accent underline underline-offset-4" onClick={onEdit}>Edit my answers</button>
    </div>
  );
}

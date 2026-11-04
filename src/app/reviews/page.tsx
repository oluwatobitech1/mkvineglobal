import type { Metadata } from "next";
import { site } from "@/config/site";
import { reviews } from "@/content/reviews";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { ReviewCards } from "@/components/sections/Reviews";
import { PageHero, Section } from "@/components/sections/ui";

export const metadata: Metadata = { title: "Client Reviews", description: "What clients say about working with MKVine Design Agency, and how to leave a review." };

export default function Reviews() {
  return (
    <>
      <PageHero bg="reviews" title="Client Reviews" intro="Worked with us? We’d love to hear how it went." />
      {reviews.length > 0 ? (
        <Section title="What our clients say">
          <ReviewCards items={reviews} />
        </Section>
      ) : (
        <Section>
          <div className="max-w-2xl rounded-xl border border-line bg-card p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Coming soon</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Client reviews are on their way.</h2>
            <p className="mt-3 text-muted">
              We’re gathering reviews from the clients we’ve worked with and will share them here. If you’ve worked with us, you can leave yours below, or email it to{" "}
              <a className="underline underline-offset-4 hover:text-ink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          </div>
        </Section>
      )}
      <Section tone="alt" title="Leave a review">
        <div className="max-w-xl">
          <p className="mb-8 text-muted">Write your review below and your email app will open with it ready to send to us. Reviews are only shown on the website with your permission.</p>
          <ReviewForm />
        </div>
      </Section>
    </>
  );
}

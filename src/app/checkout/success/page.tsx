import { getStripe } from "@/lib/stripe";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";
import PurchaseTracker from "@/components/analytics/PurchaseTracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Successful | YousicPlay",
  robots: "noindex",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <section className="bg-navy py-24">
        <MaxWidthWrapper>
          <div className="text-center">
            <h1 className="font-poppins text-3xl font-bold text-white">
              Something went wrong
            </h1>
            <p className="mt-4 text-white/70">
              No session found. If you completed a purchase, check your email
              for confirmation.
            </p>
            <div className="mt-8">
              <Button href="/" variant="lime">
                Back to Home
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    );
  }

  const session = await getStripe().checkout.sessions.retrieve(session_id);
  const slug = session.metadata?.slug;
  const itemType = session.metadata?.itemType;
  const customerName = session.customer_details?.name;

  // Determine where to send the user
  const learnUrl = slug && itemType === "course" ? `/learn/${slug}` : null;
  const browseUrl = slug
    ? itemType === "bundle"
      ? `/bundles/${slug}`
      : itemType === "product"
        ? `/products/${slug}`
        : `/classes/${slug}`
    : "/all-classes";

  return (
    <section className="bg-navy py-24">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime/20">
            <svg
              className="h-10 w-10 text-lime"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {slug && (
            <PurchaseTracker
              slug={slug}
              title={session.metadata?.title || slug}
              price={(session.amount_total ?? 0) / 100}
              transactionId={session.payment_intent as string | undefined}
            />
          )}

          <h1 className="mt-8 font-poppins text-3xl font-bold text-white sm:text-4xl">
            {customerName ? `Thanks, ${customerName}!` : "Thank You!"}
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Your purchase is confirmed. You&apos;re all set to start learning.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {learnUrl ? (
              <Button href={learnUrl} variant="magenta" className="px-10 py-4">
                Start Learning Now
              </Button>
            ) : (
              <Button href="/account" variant="magenta" className="px-10 py-4">
                Go to My Courses
              </Button>
            )}
            <Button href="/all-classes" variant="outline">
              Browse More Classes
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Cancelled | YousicPlay",
  robots: "noindex",
};

export default function CheckoutCancelPage() {
  return (
    <section className="bg-navy py-24">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <svg
              className="h-10 w-10 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="mt-8 font-poppins text-3xl font-bold text-white sm:text-4xl">
            Checkout Cancelled
          </h1>
          <p className="mt-4 text-lg text-white/70">
            No worries — your payment was not processed. You can pick up where
            you left off anytime.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/all-classes" variant="lime" className="px-10 py-4">
              Browse Courses
            </Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/40">
            Have questions?{" "}
            <a href="/support" className="text-lime hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

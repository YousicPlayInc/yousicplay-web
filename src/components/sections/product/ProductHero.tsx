import Image from "next/image";
import BuyButton from "@/components/shared/BuyButton";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface ProductHeroProps {
  slug: string;
  title: string;
  description: string;
  price: number;
  buyUrl: string;
  imagePath: string;
  type: "free" | "digital" | "coaching";
  instructorName?: string;
  instrument?: string;
  level?: string;
  features?: string[];
}

function getButtonLabel(type: ProductHeroProps["type"]): string {
  switch (type) {
    case "free":
      return "Enroll for Free";
    case "coaching":
      return "Sign Up";
    default:
      return "Buy Now";
  }
}

export default function ProductHero({
  slug,
  title,
  description,
  price,
  buyUrl,
  imagePath,
  type,
  instructorName,
  features,
}: ProductHeroProps) {
  const isFree = type === "free";
  const buttonVariant = isFree ? "lime" : "magenta";
  const buttonLabel = getButtonLabel(type);

  return (
    <section id="course-hero" className="bg-navy py-16">
      <MaxWidthWrapper>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-light">
            <Image
              src={imagePath}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {title}
            </h1>

            {instructorName && (
              <p className="mt-2 font-poppins text-lg font-semibold text-lime">
                {instructorName}
              </p>
            )}

            <p className="mt-4 font-serif text-base leading-relaxed text-white/70">
              {description}
            </p>

            {/* Price or FREE badge */}
            <div className="mt-6">
              {isFree ? (
                <span className="inline-block rounded-full bg-lime px-4 py-1 font-poppins text-sm font-bold uppercase tracking-wide text-navy">
                  FREE
                </span>
              ) : (
                <span className="font-poppins text-3xl font-bold text-white">
                  ${price}
                </span>
              )}
            </div>

            {/* Features list */}
            {features && features.length > 0 && (
              <ul className="mt-6 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-lime"
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
                    <span className="text-sm text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="mt-8">
              <BuyButton
                slug={slug}
                itemType="product"
                price={price}
                buyUrl={buyUrl}
                label={buttonLabel}
                variant={buttonVariant}
                className="px-10 py-4"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

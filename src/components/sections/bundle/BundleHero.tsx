import Image from "next/image";
import BuyButton from "@/components/shared/BuyButton";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface BundleHeroProps {
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  buyUrl: string;
  imagePath: string;
  highlights?: string[];
}

export default function BundleHero({
  slug,
  title,
  description,
  price,
  originalPrice,
  buyUrl,
  imagePath,
  highlights,
}: BundleHeroProps) {
  return (
    <section id="course-hero" className="bg-navy py-16">
      <MaxWidthWrapper>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Bundle image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-light">
            <Image
              src={imagePath}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Bundle info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 font-serif text-base leading-relaxed text-white/70">
              {description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-poppins text-3xl font-bold text-white">
                ${price}
              </span>
              <span className="text-lg text-lime line-through">
                ${originalPrice}
              </span>
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <ul className="mt-6 space-y-3">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
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
                    <span className="text-sm text-white/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="mt-8">
              <BuyButton
                slug={slug}
                itemType="bundle"
                price={price}
                buyUrl={buyUrl}
                variant="magenta"
                className="px-10 py-4"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

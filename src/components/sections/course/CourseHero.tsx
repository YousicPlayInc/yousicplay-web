import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import StarRating from "@/components/ui/StarRating";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface CourseHeroProps {
  title: string;
  description: string;
  instructorName: string;
  instructorBio: string;
  instrument: string;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  learnerCount: string;
  buyUrl: string;
  imagePath: string;
}

export default function CourseHero({
  title,
  description,
  instructorName,
  instrument,
  level,
  price,
  originalPrice,
  rating,
  learnerCount,
  buyUrl,
}: CourseHeroProps) {
  return (
    <section id="course-hero" className="bg-navy py-16">
      <MaxWidthWrapper>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Video preview placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-light">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-magenta/90">
                <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 p-6">
              <p className="font-poppins text-lg font-bold text-lime">{instructorName}</p>
            </div>
          </div>

          {/* Course info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 font-serif text-base leading-relaxed text-white/70">{description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>{level}</Tag>
              <Tag>{instrument}</Tag>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-poppins text-3xl font-bold text-white">${price}</span>
                <span className="text-lg text-lime line-through">${originalPrice}</span>
              </div>
              <StarRating rating={rating} />
            </div>
            <p className="mt-2 text-sm text-white/50">{learnerCount} Learners</p>
            <div className="mt-8">
              <Button href={buyUrl} external variant="magenta" className="px-10 py-4">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

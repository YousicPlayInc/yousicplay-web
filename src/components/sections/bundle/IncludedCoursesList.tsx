import Image from "next/image";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface IncludedCoursesListProps {
  courses: {
    cardTitle: string;
    instructorName: string;
    price: number;
    imagePath: string;
  }[];
}

export default function IncludedCoursesList({
  courses,
}: IncludedCoursesListProps) {
  return (
    <section className="bg-cream py-16">
      <MaxWidthWrapper>
        <h2 className="text-center font-poppins text-3xl font-bold text-navy sm:text-4xl">
          What&apos;s Included
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.cardTitle}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="relative aspect-video bg-navy-light">
                <Image
                  src={course.imagePath}
                  alt={course.cardTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-poppins text-base font-semibold text-navy">
                  {course.cardTitle}
                </h3>
                <p className="mt-1 text-sm text-navy/60">
                  {course.instructorName}
                </p>
                <p className="mt-2 text-sm text-navy/40 line-through">
                  ${course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

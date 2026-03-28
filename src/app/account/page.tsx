import { createSSRSupabase, createServerSupabase } from "@/lib/supabase";
import { courses } from "@/data/courses";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses | YousicPlay",
  robots: "noindex",
};

export default async function AccountPage() {
  // Auth is verified by layout — get user for data queries
  const supabase = await createSSRSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null; // Layout handles redirect, this satisfies TypeScript

  // Fetch user's purchases
  const adminSupabase = createServerSupabase();

  const { data: customer } = await adminSupabase
    .from("customers")
    .select("id, name")
    .eq("email", user.email!)
    .single();

  let purchasedSlugs: string[] = [];
  const progressMap: Record<string, number> = {};

  if (customer) {
    const { data: purchases } = await adminSupabase
      .from("purchases")
      .select("product_id, products(slug)")
      .eq("customer_id", customer.id)
      .eq("status", "completed");

    if (purchases) {
      purchasedSlugs = purchases
        .map((p) => {
          const product = p.products as unknown as { slug: string } | null;
          return product?.slug;
        })
        .filter(Boolean) as string[];
    }

    // Fetch progress for all courses this user has access to
    const { data: progressData } = await adminSupabase
      .from("lesson_progress")
      .select("course_slug, lesson_index")
      .eq("customer_id", customer.id);

    if (progressData) {
      for (const row of progressData) {
        progressMap[row.course_slug] = (progressMap[row.course_slug] || 0) + 1;
      }
    }
  }

  // Match purchased slugs to course data
  const purchasedCourses = courses.filter((c) => purchasedSlugs.includes(c.slug));

  // Free courses are always accessible
  const freeCourses = courses.filter((c) => c.price === 0);

  const displayName = customer?.name || user.user_metadata?.full_name || user.email;

  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-playfair text-3xl font-bold text-white sm:text-4xl">
          My Courses
        </h1>
        <p className="mt-2 text-white/50">
          Welcome back, {displayName}
        </p>
      </div>

      {/* Purchased Courses */}
      {purchasedCourses.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-poppins text-lg font-semibold text-white">
            Your Purchases
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {purchasedCourses.map((course) => (
              <CourseCard key={course.slug} course={course} owned progressMap={progressMap} />
            ))}
          </div>
        </section>
      )}

      {/* Free Courses */}
      {freeCourses.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-poppins text-lg font-semibold text-white">
            Free Courses
          </h2>
          <p className="mb-4 text-sm text-white/40">
            These courses are included with your account at no cost.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freeCourses.map((course) => (
              <CourseCard key={course.slug} course={course} owned progressMap={progressMap} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {purchasedCourses.length === 0 && freeCourses.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-navy-light p-12 text-center">
          <h2 className="font-poppins text-xl font-semibold text-white">
            No courses yet
          </h2>
          <p className="mt-2 text-sm text-white/50">
            Browse our catalog to find the perfect course for you.
          </p>
          <Link
            href="/all-classes"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-3 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-lime-dark"
          >
            Browse Classes
          </Link>
        </div>
      )}

      {/* Browse more */}
      {(purchasedCourses.length > 0 || freeCourses.length > 0) && (
        <div className="text-center">
          <Link
            href="/all-classes"
            className="text-sm text-lime hover:underline"
          >
            Browse more classes &rarr;
          </Link>
        </div>
      )}
    </>
  );
}

// ── Course Card Sub-Component ───────────────────────────────────────────

interface CourseCardProps {
  course: (typeof courses)[number];
  owned: boolean;
  progressMap?: Record<string, number>;
}

function CourseCard({ course, owned, progressMap = {} }: CourseCardProps) {
  const completedCount = progressMap[course.slug] || 0;
  const totalLessons = course.lessonPlan.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  return (
    <Link
      href={owned ? `/learn/${course.slug}` : `/classes/${course.slug}`}
      className="group overflow-hidden rounded-xl border border-white/10 bg-navy-light transition-colors hover:border-white/20"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-dark">
        <Image
          src={course.imagePath}
          alt={course.cardTitle}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {owned && (
          <div className="absolute right-2 top-2 rounded-full bg-lime/90 px-2.5 py-0.5 text-xs font-semibold text-navy">
            {course.price === 0 ? "Free" : "Owned"}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-poppins text-sm font-semibold text-white group-hover:text-lime">
          {course.cardTitle}
        </h3>
        <p className="mt-1 text-xs text-white/40">
          {course.instructor.name} &middot; {course.lessonPlan.length} lessons
        </p>
        {owned && (
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-lime transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-white/30">{progressPercent}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}

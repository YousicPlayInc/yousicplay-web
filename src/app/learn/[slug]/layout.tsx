import { notFound, redirect } from "next/navigation";
import { courses } from "@/data/courses";
import { createSSRSupabase } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabase";
import LearnHeader from "@/components/sections/learn/LearnHeader";
import LessonSidebar from "@/components/sections/learn/LessonSidebar";
import type { Metadata } from "next";

interface LearnLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.cardTitle} | Learn | YousicPlay`,
    robots: "noindex",
  };
}

export default async function LearnLayout({ children, params }: LearnLayoutProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  // ── Purchase verification ──────────────────────────────────────────────
  // Free courses ($0) are accessible to any authenticated user.
  // Paid courses require a completed purchase record in Supabase.
  if (course.price > 0) {
    const supabase = await createSSRSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Middleware should catch this, but as a safety net:
      redirect(`/login?redirect=/learn/${slug}`);
    }

    // Use admin client to bypass RLS and check purchases
    const adminSupabase = createServerSupabase();

    // Look up customer by auth user email
    const { data: customer } = await adminSupabase
      .from("customers")
      .select("id")
      .eq("email", user.email!)
      .single();

    if (!customer) {
      redirect(`/classes/${slug}?access=required`);
    }

    // Check for ANY completed purchase matching this slug.
    // Uses a direct join so it works whether products are pre-seeded or webhook-created.
    const { data: purchase } = await adminSupabase
      .from("purchases")
      .select("id, products!inner(slug)")
      .eq("customer_id", customer.id)
      .eq("status", "completed")
      .eq("products.slug", slug)
      .limit(1)
      .maybeSingle();

    if (!purchase) {
      // Also check if user bought a bundle that includes this course
      const { data: bundlePurchase } = await adminSupabase
        .from("purchases")
        .select("id, products!inner(type)")
        .eq("customer_id", customer.id)
        .eq("status", "completed")
        .eq("products.type", "bundle")
        .limit(1)
        .maybeSingle();

      if (!bundlePurchase) {
        redirect(`/classes/${slug}?access=required`);
      }
      // Bundle purchasers get access to all courses
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-dark">
      <LearnHeader
        courseTitle={course.cardTitle}
        courseSlug={course.slug}
        instructorName={course.instructor.name}
        totalLessons={course.lessonPlan.length}
      />
      <div className="flex flex-1 overflow-hidden">
        <LessonSidebar
          courseSlug={course.slug}
          lessons={course.lessonPlan}
          instructorName={course.instructor.name}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

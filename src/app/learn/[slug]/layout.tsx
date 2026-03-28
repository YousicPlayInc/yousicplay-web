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
    try {
      // Get authenticated user from SSR session
      const supabase = await createSSRSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Use admin client to bypass RLS and check purchases
        const adminSupabase = createServerSupabase();

        // Look up customer by auth user email
        const { data: customer } = await adminSupabase
          .from("customers")
          .select("id")
          .eq("email", user.email!)
          .single();

        if (customer) {
          // Check for a completed purchase of this course (by slug match in products table)
          const { data: product } = await adminSupabase
            .from("products")
            .select("id")
            .eq("slug", slug)
            .single();

          if (product) {
            const { data: purchase } = await adminSupabase
              .from("purchases")
              .select("id")
              .eq("customer_id", customer.id)
              .eq("product_id", product.id)
              .eq("status", "completed")
              .limit(1)
              .single();

            if (!purchase) {
              // User is authenticated but hasn't purchased — send to sales page
              redirect(`/classes/${slug}?access=required`);
            }
          } else {
            // Product not in DB yet (hasn't been purchased by anyone)
            // This means no one has bought it — redirect to sales page
            redirect(`/classes/${slug}?access=required`);
          }
        } else {
          // No customer record — redirect to sales page
          redirect(`/classes/${slug}?access=required`);
        }
      }
      // If no user, middleware should have already redirected to /login
    } catch {
      // If verification fails, allow access rather than block
      // (fail open — better UX, webhook will eventually create records)
      console.error("Purchase verification error for slug:", slug);
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

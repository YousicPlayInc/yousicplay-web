import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { courses } from "@/data/courses";
import { notFound } from "next/navigation";
import CertificateView from "./CertificateView";

async function createSSRSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignore — cookies can only be set in Server Actions or Route Handlers
          }
        },
      },
    },
  );
}

function createServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function generateMetadata(props: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await props.params;
  const course = courses.find((c) => c.slug === courseSlug);

  if (!course) {
    return { title: "Certificate Not Found | YousicPlay" };
  }

  return {
    title: `Certificate of Completion — ${course.title} | YousicPlay`,
    description: `Certificate of Completion for ${course.title} taught by ${course.instructor.name} on YousicPlay.`,
    openGraph: {
      title: `Certificate of Completion — ${course.title}`,
      description: `Completed ${course.title} with ${course.instructor.name} on YousicPlay.`,
      type: "website",
      siteName: "YousicPlay",
    },
    twitter: {
      card: "summary_large_image",
      title: `Certificate of Completion — ${course.title}`,
      description: `Completed ${course.title} with ${course.instructor.name} on YousicPlay.`,
    },
  };
}

export default async function CertificatePage(props: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await props.params;
  const course = courses.find((c) => c.slug === courseSlug);

  if (!course) {
    notFound();
  }

  // Authenticate the current user via SSR Supabase (cookie-based)
  const supabase = await createSSRSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#202536] px-4 text-center">
        <h1 className="mb-4 font-[family-name:var(--font-playfair-var)] text-3xl font-bold text-white">
          Sign In Required
        </h1>
        <p className="mb-8 max-w-md text-gray-400">
          Please sign in to view your certificate of completion.
        </p>
        <a
          href={`/learn/${courseSlug}`}
          className="rounded-lg bg-[#CCFF00] px-6 py-3 font-semibold text-[#202536] transition-colors hover:bg-[#CCFF00]/90"
        >
          Go to Course
        </a>
      </div>
    );
  }

  // Use admin client to query lesson progress
  const adminSupabase = createServerSupabase();

  // Look up customer by email
  const { data: customer } = await adminSupabase
    .from("customers")
    .select("id, name, email")
    .eq("email", user.email)
    .single();

  if (!customer) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#202536] px-4 text-center">
        <h1 className="mb-4 font-[family-name:var(--font-playfair-var)] text-3xl font-bold text-white">
          Account Not Found
        </h1>
        <p className="mb-8 max-w-md text-gray-400">
          We could not find a customer account associated with your email.
        </p>
        <a
          href={`/learn/${courseSlug}`}
          className="rounded-lg bg-[#CCFF00] px-6 py-3 font-semibold text-[#202536] transition-colors hover:bg-[#CCFF00]/90"
        >
          Go to Course
        </a>
      </div>
    );
  }

  // Check lesson progress — count completed lessons for this course
  const { data: completedLessons } = await adminSupabase
    .from("lesson_progress")
    .select("id, completed_at")
    .eq("customer_id", customer.id)
    .eq("course_slug", courseSlug)
    .eq("completed", true)
    .order("completed_at", { ascending: false });

  const totalLessons = course.lessonPlan.length;
  const completedCount = completedLessons?.length ?? 0;

  if (completedCount < totalLessons) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#202536] px-4 text-center">
        <h1 className="mb-4 font-[family-name:var(--font-playfair-var)] text-3xl font-bold text-white">
          Course Not Yet Completed
        </h1>
        <p className="mb-4 max-w-md text-gray-400">
          You have completed {completedCount} of {totalLessons} lessons in{" "}
          <span className="text-white">{course.title}</span>.
        </p>
        <div className="mb-8 h-2 w-64 overflow-hidden rounded-full bg-[#2a2f45]">
          <div
            className="h-full rounded-full bg-[#CCFF00] transition-all"
            style={{ width: `${(completedCount / totalLessons) * 100}%` }}
          />
        </div>
        <a
          href={`/learn/${courseSlug}`}
          className="rounded-lg bg-[#CCFF00] px-6 py-3 font-semibold text-[#202536] transition-colors hover:bg-[#CCFF00]/90"
        >
          Continue Learning
        </a>
      </div>
    );
  }

  // All lessons completed — determine the completion date
  const completionDate =
    completedLessons && completedLessons.length > 0
      ? new Date(completedLessons[0].completed_at)
      : new Date();

  const studentName =
    customer.name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "Student";

  const certificateUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://yousicplay.com"}/certificates/${courseSlug}`;

  return (
    <CertificateView
      studentName={studentName}
      courseTitle={course.title}
      instructorName={course.instructor.name}
      completionDate={completionDate.toISOString()}
      courseSlug={courseSlug}
      certificateUrl={certificateUrl}
    />
  );
}

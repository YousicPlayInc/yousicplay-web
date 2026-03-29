import { NextRequest, NextResponse } from "next/server";
import { createSSRSupabase, createServerSupabase } from "@/lib/supabase";
import { courses } from "@/data/courses";

/**
 * Get the authenticated customer_id for the current user.
 * Uses SSR Supabase for auth + admin client for customer lookup.
 */
async function getCustomerId(): Promise<{ customerId: string | null; error?: string; status?: number }> {
  const supabase = await createSSRSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { customerId: null, error: "Not authenticated", status: 401 };
  }

  const adminSupabase = createServerSupabase();
  const { data: customer } = await adminSupabase
    .from("customers")
    .select("id")
    .eq("email", user.email!)
    .single();

  if (!customer) {
    // User is authenticated but has no customer record yet.
    // This can happen for new users who haven't purchased anything.
    // Auto-create a customer record so they can track progress.
    const { data: newCustomer, error: createError } = await adminSupabase
      .from("customers")
      .insert({ email: user.email!, name: user.user_metadata?.full_name || null })
      .select("id")
      .single();

    if (createError || !newCustomer) {
      return { customerId: null, error: "Failed to create customer record", status: 500 };
    }

    return { customerId: newCustomer.id };
  }

  return { customerId: customer.id };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseSlug, lessonIndex, completed } = body;

    // Validate input
    if (!courseSlug || typeof lessonIndex !== "number") {
      return NextResponse.json(
        { error: "courseSlug and lessonIndex are required" },
        { status: 400 }
      );
    }

    // Verify course and lesson exist
    const course = courses.find((c) => c.slug === courseSlug);
    if (!course || lessonIndex < 0 || lessonIndex >= course.lessonPlan.length) {
      return NextResponse.json({ error: "Invalid course or lesson" }, { status: 400 });
    }

    // Get authenticated customer
    const { customerId, error: authError, status: authStatus } = await getCustomerId();
    if (!customerId) {
      return NextResponse.json({ error: authError }, { status: authStatus || 401 });
    }

    const adminSupabase = createServerSupabase();

    if (completed) {
      // Mark as complete — upsert to handle re-completions gracefully
      const { error } = await adminSupabase
        .from("lesson_progress")
        .upsert(
          {
            customer_id: customerId,
            course_slug: courseSlug,
            lesson_index: lessonIndex,
          },
          { onConflict: "customer_id,course_slug,lesson_index" }
        );

      if (error) {
        console.error("Progress save error:", error);
        return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
      }
    } else {
      // Unmark — delete the progress record
      const { error } = await adminSupabase
        .from("lesson_progress")
        .delete()
        .eq("customer_id", customerId)
        .eq("course_slug", courseSlug)
        .eq("lesson_index", lessonIndex);

      if (error) {
        console.error("Progress delete error:", error);
        return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, completed });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET: Fetch progress for a course
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseSlug = searchParams.get("courseSlug");

  if (!courseSlug) {
    return NextResponse.json({ error: "courseSlug is required" }, { status: 400 });
  }

  // Get authenticated customer
  const { customerId, error: authError, status: authStatus } = await getCustomerId();
  if (!customerId) {
    return NextResponse.json({ error: authError }, { status: authStatus || 401 });
  }

  const adminSupabase = createServerSupabase();

  const { data, error } = await adminSupabase
    .from("lesson_progress")
    .select("lesson_index, completed_at")
    .eq("customer_id", customerId)
    .eq("course_slug", courseSlug);

  if (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }

  const completedLessons = (data || []).map((d) => d.lesson_index);
  const response = NextResponse.json({ completedLessons });
  // Cache for 60s in browser, revalidate in background
  response.headers.set("Cache-Control", "private, max-age=60, stale-while-revalidate=300");
  return response;
}

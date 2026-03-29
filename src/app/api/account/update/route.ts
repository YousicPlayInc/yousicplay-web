import { NextRequest, NextResponse } from "next/server";
import { createSSRSupabase, createServerSupabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const { success } = rateLimit(`account-update:${ip}`, { maxTokens: 5, refillRate: 1, interval: 60000 });
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Verify auth
    const supabase = await createSSRSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const adminSupabase = createServerSupabase();

    // Update or create customer record
    const { error } = await adminSupabase
      .from("customers")
      .upsert(
        {
          email: user.email!,
          name: name.trim() || null,
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Profile update error:", error);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    // Also update Supabase Auth user metadata
    await supabase.auth.updateUser({
      data: { full_name: name.trim() },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

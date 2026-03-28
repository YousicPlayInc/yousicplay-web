import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  // Get the authenticated user
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // No-op for POST route — we don't need to set cookies
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get customer_id
  const adminSupabase = createServerSupabase();
  const { data: customer } = await adminSupabase
    .from("customers")
    .select("id")
    .eq("email", user.email)
    .single();

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  // Delete the Spotify music profile
  const { error } = await adminSupabase
    .from("music_profiles")
    .delete()
    .eq("customer_id", customer.id)
    .eq("provider", "spotify");

  if (error) {
    console.error("Spotify disconnect error:", error);
    return NextResponse.json(
      { error: "Failed to disconnect Spotify" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

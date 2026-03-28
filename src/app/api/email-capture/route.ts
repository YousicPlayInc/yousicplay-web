import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name, source, page_url } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const supabase = createServerSupabase();

  // Insert into email_captures
  const { error: captureError } = await supabase.from("email_captures").insert({
    email: email.toLowerCase().trim(),
    source: source || "unknown",
    page_url: page_url || null,
  });

  if (captureError) {
    console.error("Email capture error:", captureError);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  // Also upsert into customers if name provided (modal form)
  if (name) {
    await supabase
      .from("customers")
      .upsert(
        { email: email.toLowerCase().trim(), name },
        { onConflict: "email" }
      );
  }

  return NextResponse.json({ success: true });
}

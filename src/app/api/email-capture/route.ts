import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { trackEmailCapture } from "@/lib/klaviyo";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const { success } = rateLimit(`email-capture:${ip}`, { maxTokens: 5, refillRate: 1, interval: 60000 });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const { email, name, source, page_url } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
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

  // Sync to Klaviyo (non-blocking — don't fail the request if Klaviyo is down)
  trackEmailCapture({
    email: email.toLowerCase().trim(),
    name: name || undefined,
    source: source || "website",
    pageUrl: page_url || undefined,
  }).catch((err) => console.error("[Klaviyo] Email capture sync failed:", err));

  return NextResponse.json({ success: true });
}

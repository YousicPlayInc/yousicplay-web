import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getAuthUrl } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);

  // Get the authenticated user's email for the state parameter
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(
      new URL("/login?error=auth_required&redirect=/account/settings", origin)
    );
  }

  // Encode email in state for verification on callback
  const state = Buffer.from(
    JSON.stringify({ email: user.email, ts: Date.now() })
  ).toString("base64url");

  const redirectUri = `${origin}/api/spotify/callback`;
  const authUrl = getAuthUrl(redirectUri, state);

  return NextResponse.redirect(authUrl);
}

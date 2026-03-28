import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create a response we can modify (set cookies on)
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request for downstream server components
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Also set on the response so the browser gets them
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh the session (extends expiry, handles token rotation)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Check admin email whitelist
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());
    if (!adminEmails.includes(user.email?.toLowerCase() || "")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect /learn routes — require auth
  if (pathname.startsWith("/learn")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Purchase verification happens in the page component (server-side)
    // Middleware just ensures the user is authenticated
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/learn/:path*"],
};

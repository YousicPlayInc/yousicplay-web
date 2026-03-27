import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // TODO: Uncomment when Supabase auth is connected
    // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    // if (!supabaseUrl || !supabaseAnonKey) {
    //   return NextResponse.redirect(new URL("/admin/login", request.url));
    // }
    // Check for auth cookie — if missing, redirect to login
    // const authCookie = request.cookies.get("sb-access-token");
    // if (!authCookie) {
    //   return NextResponse.redirect(new URL("/admin/login", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

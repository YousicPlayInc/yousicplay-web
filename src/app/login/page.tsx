import type { Metadata } from "next";
import LoginForm from "@/components/sections/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | YousicPlay",
  robots: "noindex",
};

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect: redirectTo, error } = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Sign in to access your courses and track your progress
          </p>
        </div>

        {error === "auth_failed" && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
            Something went wrong. Please try again.
          </div>
        )}

        <LoginForm redirectTo={redirectTo} />

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/30">
          By signing in, you agree to our{" "}
          <a href="/terms-of-service" className="underline hover:text-white/50">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline hover:text-white/50">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

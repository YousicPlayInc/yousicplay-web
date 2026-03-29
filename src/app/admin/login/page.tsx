"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?redirect=/admin`,
        },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Admin login error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md rounded-2xl bg-navy-light p-8">
        {/* Logo */}
        <p className="text-center font-serif text-2xl font-bold text-white">
          YousicPlay
        </p>

        <h1 className="mt-6 text-center text-lg font-semibold text-white">
          Admin Access
        </h1>

        {submitted ? (
          <div className="mt-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lime/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-lime"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-white/70">
              Check your email for a login link.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs text-lime underline underline-offset-2"
            >
              Try a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="email" className="block text-sm text-white/60">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yousicplay.com"
              className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-lime"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-lime py-3 text-sm font-semibold text-navy transition-colors hover:bg-lime-dark disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
            {errorMsg && (
              <p className="mt-3 text-center text-xs text-red-400">
                {errorMsg}
              </p>
            )}
            <p className="mt-4 text-center text-xs text-white/40">
              A login link will be sent to your email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

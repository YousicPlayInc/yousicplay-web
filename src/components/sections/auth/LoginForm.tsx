"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";

interface LoginFormProps {
  redirectTo?: string;
}

type FormState = "idle" | "loading" | "sent" | "error";

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const callbackUrl = `${window.location.origin}/api/auth/callback${
    redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""
  }`;

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    setErrorMessage("");

    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: callbackUrl,
      },
    });

    if (error) {
      setState("error");
      setErrorMessage(error.message);
    } else {
      setState("sent");
    }
  }

  async function handleGoogleLogin() {
    setState("loading");
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
      },
    });

    if (error) {
      setState("error");
      setErrorMessage(error.message);
    }
  }

  // Success state — check your email
  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-light p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime/10">
          <svg className="h-8 w-8 text-lime" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="font-poppins text-xl font-semibold text-white">Check Your Email</h2>
        <p className="mt-2 text-sm text-white/50">
          We sent a magic link to <strong className="text-white">{email}</strong>.
          Click it to sign in — no password needed.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setEmail("");
          }}
          className="mt-4 text-sm text-lime hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-8">
      {/* Google OAuth */}
      <button
        onClick={handleGoogleLogin}
        disabled={state === "loading"}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/30">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Magic Link */}
      <form onSubmit={handleMagicLink}>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/50"
        />

        {errorMessage && (
          <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={state === "loading" || !email.trim()}
          className="mt-4 w-full rounded-full bg-lime px-6 py-3 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-lime-dark disabled:opacity-50"
        >
          {state === "loading" ? "Sending..." : "Send Magic Link"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-white/30">
        No password needed — we&apos;ll email you a secure login link
      </p>
    </div>
  );
}

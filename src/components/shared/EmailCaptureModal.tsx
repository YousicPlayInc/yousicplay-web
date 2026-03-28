"use client";

import { useEffect, useState } from "react";

interface EmailCaptureModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function EmailCaptureModal({ isOpen: controlledOpen, onClose }: EmailCaptureModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (controlledOpen !== undefined) return;
    const dismissed = localStorage.getItem("yp-modal-dismissed");
    if (!dismissed) {
      setIsOpen(true);
    }
  }, [controlledOpen]);

  const open = controlledOpen ?? isOpen;

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("yp-modal-dismissed", "true");
    onClose?.();
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: "modal",
          page_url: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy/10 hover:text-navy"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-4 text-center">
            <h2 className="font-poppins text-2xl font-bold text-magenta">You&apos;re In!</h2>
            <p className="mt-2 text-sm text-navy/70">We&apos;ll send you exclusive deals and updates.</p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-poppins text-2xl font-bold text-magenta">Unlock Your Potential</h2>
            <p className="mt-2 text-sm text-navy/70">Ready to master your music skills?</p>
            <p className="mt-3 text-sm font-semibold text-navy">
              For a limited time, get all 15 courses for just $199.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-navy/20 px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-magenta focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-navy/20 px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-magenta focus:outline-none"
              />
              {status === "error" && (
                <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-magenta py-3 font-poppins text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-magenta-dark disabled:opacity-60"
              >
                {status === "loading" ? "Saving..." : "Save Now"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

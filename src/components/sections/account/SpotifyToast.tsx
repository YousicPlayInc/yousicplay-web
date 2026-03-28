"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SpotifyToastProps {
  status: string;
}

export default function SpotifyToast({ status }: SpotifyToastProps) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Clean the URL params after toast disappears
      router.replace("/account/settings", { scroll: false });
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!visible) return null;

  const isSuccess = status === "connected";

  return (
    <div
      className={`mb-6 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? "border-lime/20 bg-lime/10 text-lime"
          : "border-red-500/20 bg-red-500/10 text-red-400"
      }`}
    >
      {isSuccess ? (
        <>
          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Spotify connected successfully! Your music taste will help us recommend the perfect courses.
        </>
      ) : (
        <>
          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          Failed to connect Spotify. Please try again.
        </>
      )}
      <button
        onClick={() => {
          setVisible(false);
          router.replace("/account/settings", { scroll: false });
        }}
        className="ml-auto text-current opacity-60 hover:opacity-100"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
}

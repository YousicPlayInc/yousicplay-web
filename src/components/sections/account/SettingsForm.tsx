"use client";

import { useState } from "react";

interface SettingsFormProps {
  initialName: string;
  email: string;
  authProvider: string;
}

export default function SettingsForm({
  initialName,
  email,
  authProvider,
}: SettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {/* Display Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/70">
          Display Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/50 sm:max-w-md"
        />
      </div>

      {/* Email (read-only) */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/40 sm:max-w-md"
        />
        <p className="mt-1 text-xs text-white/30">
          Signed in via {authProvider === "google" ? "Google" : "magic link"}
        </p>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || name.trim() === initialName}
          className="rounded-full bg-lime px-6 py-2 text-sm font-semibold text-navy transition-colors hover:bg-lime-dark disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <span className="text-sm text-lime">Saved!</span>
        )}
        {error && (
          <span className="text-sm text-red-400">{error}</span>
        )}
      </div>
    </form>
  );
}

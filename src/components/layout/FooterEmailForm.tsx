"use client";

export default function FooterEmailForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:bg-white/15 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-magenta px-6 py-2.5 text-sm font-semibold uppercase text-white transition-colors hover:bg-magenta-dark"
      >
        Join Us
      </button>
    </form>
  );
}

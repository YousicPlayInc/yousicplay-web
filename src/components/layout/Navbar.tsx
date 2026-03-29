"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm">
      <MaxWidthWrapper>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/yousic-logo.svg" alt="YousicPlay" width={160} height={40} className="h-8 w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/all-classes"
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-lime-dark"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Classes
            </Link>
            <UserMenu />
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </MaxWidthWrapper>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-navy sm:hidden">
          <div className="flex flex-col gap-4 px-4 py-6">
            <Link
              href="/all-classes"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold uppercase tracking-wide text-navy"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Classes
            </Link>
            <div className="flex justify-center">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

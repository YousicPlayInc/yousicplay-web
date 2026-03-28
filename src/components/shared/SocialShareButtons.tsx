"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SocialShareButtonsProps {
  url: string;
  text: string;
  hashtags?: string[];
  className?: string;
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.613.115v3.146c-.427-.044-.72-.065-.982-.065-1.393 0-1.93.527-1.93 1.898v2.464h3.578l-.614 3.668h-2.964v8.073C18.235 23.095 22.559 18.068 22.559 12.146c0-5.846-4.741-10.587-10.587-10.587S1.386 6.3 1.386 12.146c0 5.17 3.709 9.473 8.615 10.387l.1.007v1.151z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SocialShareButtons({
  url,
  text,
  hashtags = [],
  className,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const hashtagString = hashtags.join(",");

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}${hashtagString ? `&hashtags=${encodeURIComponent(hashtagString)}` : ""}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const handleShare = useCallback(
    async (platformUrl: string) => {
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({ title: text, url });
          return;
        } catch {
          // User cancelled or share failed — fall through to URL
        }
      }
      window.open(platformUrl, "_blank", "noopener,noreferrer,width=600,height=400");
    },
    [text, url],
  );

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const buttonBase =
    "inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => handleShare(twitterUrl)}
        className={cn(buttonBase, "bg-[#202536] text-white hover:bg-[#2a2f45] hover:text-[#CCFF00]")}
        aria-label="Share on X (Twitter)"
        title="Share on X"
      >
        <TwitterIcon />
      </button>

      <button
        type="button"
        onClick={() => handleShare(facebookUrl)}
        className={cn(buttonBase, "bg-[#202536] text-white hover:bg-[#2a2f45] hover:text-[#CCFF00]")}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <FacebookIcon />
      </button>

      <button
        type="button"
        onClick={() => handleShare(linkedinUrl)}
        className={cn(buttonBase, "bg-[#202536] text-white hover:bg-[#2a2f45] hover:text-[#CCFF00]")}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <LinkedInIcon />
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        className={cn(
          buttonBase,
          copied
            ? "bg-[#CCFF00] text-[#202536]"
            : "bg-[#202536] text-white hover:bg-[#2a2f45] hover:text-[#CCFF00]",
        )}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied && (
          <span className="ml-1.5 text-xs font-medium">Copied!</span>
        )}
      </button>
    </div>
  );
}

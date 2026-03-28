"use client";

import Script from "next/script";

interface VideoPlayerProps {
  courseSlug: string;
  lessonIndex: number;
  lessonTitle: string;
  /** Wistia video hash ID — e.g., "abc123def4" */
  wistiaId?: string;
}

export default function VideoPlayer({
  lessonTitle,
  wistiaId,
}: VideoPlayerProps) {
  if (wistiaId) {
    return (
      <>
        {/* Wistia player scripts (loaded once, deduplicated by Next.js) */}
        <Script
          src="https://fast.wistia.com/embed/medias/all.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://fast.wistia.com/assets/external/E-v1.js"
          strategy="lazyOnload"
        />

        {/* Responsive Wistia embed */}
        <div
          className="wistia_responsive_padding"
          style={{ padding: "56.25% 0 0 0", position: "relative" }}
        >
          <div
            className="wistia_responsive_wrapper"
            style={{
              height: "100%",
              left: 0,
              position: "absolute",
              top: 0,
              width: "100%",
            }}
          >
            <div
              className={`wistia_embed wistia_async_${wistiaId} seo=true videoFoam=true`}
              style={{ height: "100%", position: "relative", width: "100%" }}
            >
              <div
                className="wistia_swatch"
                style={{
                  height: "100%",
                  left: 0,
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  top: 0,
                  transition: "opacity 200ms",
                  width: "100%",
                }}
              >
                <img
                  src={`https://fast.wistia.com/embed/medias/${wistiaId}/swatch`}
                  style={{
                    filter: "blur(5px)",
                    height: "100%",
                    objectFit: "contain",
                    width: "100%",
                  }}
                  alt={lessonTitle}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Placeholder state — shown until wistiaId is added to the lesson data
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-navy-dark to-black">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-lime/30 bg-lime/10">
        <svg className="ml-1 h-8 w-8 text-lime" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p className="mb-1 font-poppins text-lg font-semibold text-white">{lessonTitle}</p>
      <p className="text-sm text-white/40">Video coming soon</p>
      <p className="mt-4 max-w-md text-center text-xs text-white/25">
        This lesson&apos;s video is being prepared. Once uploaded, it will stream here
        in full HD.
      </p>
    </div>
  );
}

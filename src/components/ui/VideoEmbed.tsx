"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface VideoEmbedProps {
  thumbnailSrc: string;
  videoUrl?: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square";
}

export default function VideoEmbed({
  thumbnailSrc,
  videoUrl,
  alt,
  className,
  aspectRatio = "video",
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const aspectClass = aspectRatio === "video" ? "aspect-video" : "aspect-square";

  if (isPlaying && videoUrl) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl", aspectClass, className)}>
        <iframe
          src={videoUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => videoUrl && setIsPlaying(true)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-xl",
        aspectClass,
        videoUrl && "cursor-pointer",
        className
      )}
    >
      <Image
        src={thumbnailSrc}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-magenta/90 transition-transform group-hover:scale-110">
            <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}

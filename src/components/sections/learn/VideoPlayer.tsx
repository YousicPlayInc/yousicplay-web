"use client";

import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  courseSlug: string;
  lessonIndex: number;
  lessonTitle: string;
  /** Mux playback ID — found in Mux dashboard after uploading the video */
  muxPlaybackId?: string;
}

export default function VideoPlayer({
  lessonTitle,
  muxPlaybackId,
}: VideoPlayerProps) {
  if (muxPlaybackId) {
    return (
      <MuxPlayer
        playbackId={muxPlaybackId}
        metadata={{ video_title: lessonTitle }}
        streamType="on-demand"
        style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}
        accentColor="#CCFF00"
      />
    );
  }

  // Placeholder — shown until muxPlaybackId is added to the lesson data
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
        This lesson&apos;s video is being prepared. Once uploaded to Mux, it will stream here
        in full HD.
      </p>
    </div>
  );
}

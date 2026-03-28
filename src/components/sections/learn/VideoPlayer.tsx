interface VideoPlayerProps {
  courseSlug: string;
  lessonIndex: number;
  lessonTitle: string;
  /** Mux playback ID — when provided, renders the real player */
  playbackId?: string;
}

export default function VideoPlayer({
  courseSlug,
  lessonIndex,
  lessonTitle,
  playbackId,
}: VideoPlayerProps) {
  // TODO: When Mux is integrated, replace placeholder with:
  // import MuxPlayer from "@mux/mux-player-react";
  // <MuxPlayer
  //   playbackId={playbackId}
  //   streamType="on-demand"
  //   accentColor="#CCFF00"
  //   metadata={{
  //     video_title: lessonTitle,
  //     viewer_user_id: customerId,
  //   }}
  // />

  if (playbackId) {
    // Future: render real Mux player
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <p className="text-white/60">Loading video...</p>
      </div>
    );
  }

  // Placeholder state — shown until videos are uploaded to Mux
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-navy-dark to-black">
      {/* Play icon */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-lime/30 bg-lime/10">
        <svg className="ml-1 h-8 w-8 text-lime" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      <p className="mb-1 font-poppins text-lg font-semibold text-white">{lessonTitle}</p>
      <p className="text-sm text-white/40">Video coming soon</p>
      <p className="mt-4 max-w-md text-center text-xs text-white/25">
        This lesson&apos;s video is being prepared. Once uploaded, it will stream here
        in full HD with adaptive bitrate for the best experience on any connection.
      </p>
    </div>
  );
}

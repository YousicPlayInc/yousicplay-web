"use client";

import SocialShareButtons from "@/components/shared/SocialShareButtons";

interface CertificateViewProps {
  studentName: string;
  courseTitle: string;
  instructorName: string;
  completionDate: string;
  courseSlug: string;
  certificateUrl: string;
}

export default function CertificateView({
  studentName,
  courseTitle,
  instructorName,
  completionDate,
  courseSlug,
  certificateUrl,
}: CertificateViewProps) {
  const formattedDate = new Date(completionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#202536] px-4 py-16">
      {/* Certificate Card */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#CCFF00]/20 bg-gradient-to-br from-[#2a2f45] to-[#202536] p-1">
        <div className="rounded-xl border border-[#CCFF00]/10 bg-[#202536] px-8 py-12 sm:px-16 sm:py-16">
          {/* Decorative corner accents */}
          <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#CCFF00]/30" />
          <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-[#CCFF00]/30" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[#CCFF00]/30" />
          <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#CCFF00]/30" />

          {/* YousicPlay Branding */}
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#CCFF00]">
              YousicPlay
            </p>
          </div>

          {/* Certificate Title */}
          <div className="mb-10 text-center">
            <h1 className="font-[family-name:var(--font-playfair-var)] text-3xl font-bold text-white sm:text-4xl">
              Certificate of Completion
            </h1>
            <div className="mx-auto mt-4 h-px w-24 bg-[#CCFF00]/40" />
          </div>

          {/* Presented To */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">
              Presented to
            </p>
            <p className="font-[family-name:var(--font-playfair-var)] text-2xl font-bold text-[#CCFF00] sm:text-3xl">
              {studentName}
            </p>
          </div>

          {/* Course Details */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">
              For successfully completing
            </p>
            <p className="text-xl font-semibold text-white sm:text-2xl">
              {courseTitle}
            </p>
          </div>

          {/* Instructor & Date */}
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
                Instructor
              </p>
              <p className="font-[family-name:var(--font-playfair-var)] text-lg font-semibold text-white">
                {instructorName}
              </p>
            </div>
            <div className="hidden h-12 w-px bg-[#CCFF00]/20 sm:block" />
            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
                Date of Completion
              </p>
              <p className="font-[family-name:var(--font-playfair-var)] text-lg font-semibold text-white">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-sm text-gray-400">Share your achievement</p>
        <SocialShareButtons
          url={certificateUrl}
          text={`I just completed "${courseTitle}" with ${instructorName} on YousicPlay!`}
          hashtags={["YousicPlay", "MusicEducation"]}
          className="justify-center"
        />
      </div>

      {/* Back to Course Link */}
      <div className="mt-8">
        <a
          href={`/learn/${courseSlug}`}
          className="text-sm text-gray-400 transition-colors hover:text-[#CCFF00]"
        >
          &larr; Back to course
        </a>
      </div>
    </div>
  );
}

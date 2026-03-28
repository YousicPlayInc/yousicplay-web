import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import VideoPlayer from "@/components/sections/learn/VideoPlayer";
import LessonNav from "@/components/sections/learn/LessonNav";
import MarkCompleteButton from "@/components/sections/learn/MarkCompleteButton";

interface LessonPageProps {
  params: Promise<{ slug: string; lessonIndex: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; lessonIndex: string }[] = [];
  for (const course of courses) {
    for (let i = 0; i < course.lessonPlan.length; i++) {
      params.push({ slug: course.slug, lessonIndex: String(i) });
    }
  }
  return params;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonIndex: lessonIndexStr } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const lessonIndex = parseInt(lessonIndexStr, 10);
  if (isNaN(lessonIndex) || lessonIndex < 0 || lessonIndex >= course.lessonPlan.length) {
    notFound();
  }

  const lesson = course.lessonPlan[lessonIndex];
  const isFirst = lessonIndex === 0;
  const isLast = lessonIndex === course.lessonPlan.length - 1;

  return (
    <div className="flex flex-col">
      {/* Video Player Area */}
      <div className="relative aspect-video w-full bg-black">
        <VideoPlayer
          courseSlug={slug}
          lessonIndex={lessonIndex}
          lessonTitle={lesson.title}
          wistiaId={lesson.wistiaId}
        />
      </div>

      {/* Lesson Info + Controls */}
      <div className="border-t border-white/10 bg-navy">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          {/* Lesson header */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-lime">
                Lesson {lessonIndex + 1} of {course.lessonPlan.length}
              </p>
              <h1 className="font-playfair text-2xl font-bold text-white sm:text-3xl">
                {lesson.title}
              </h1>
              <p className="mt-1 text-sm text-white/50">
                {course.instructor.name} &middot; {course.cardTitle}
              </p>
            </div>
            <MarkCompleteButton
              courseSlug={slug}
              lessonIndex={lessonIndex}
            />
          </div>

          {/* Lesson description (if available) */}
          {lesson.description && (
            <div className="mb-6 rounded-lg bg-white/5 p-4">
              <p className="text-sm leading-relaxed text-white/70">{lesson.description}</p>
            </div>
          )}

          {/* Navigation */}
          <LessonNav
            courseSlug={slug}
            currentIndex={lessonIndex}
            totalLessons={course.lessonPlan.length}
            prevTitle={isFirst ? undefined : course.lessonPlan[lessonIndex - 1].title}
            nextTitle={isLast ? undefined : course.lessonPlan[lessonIndex + 1].title}
          />
        </div>
      </div>
    </div>
  );
}

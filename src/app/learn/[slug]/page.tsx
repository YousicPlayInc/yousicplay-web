import { redirect, notFound } from "next/navigation";
import { courses } from "@/data/courses";

interface LearnPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  // Redirect to the first lesson
  redirect(`/learn/${slug}/0`);
}

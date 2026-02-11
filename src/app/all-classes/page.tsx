"use client";

import { useState, useMemo } from "react";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import CourseCard from "@/components/shared/CourseCard";
import CourseFilterBar from "@/components/shared/CourseFilterBar";
import Button from "@/components/ui/Button";
import { courses } from "@/data/courses";

const instructors = [...new Set(courses.map((c) => c.instructor.name))].sort();
const instruments = [...new Set(courses.map((c) => c.instrument))].sort();
const levels = [...new Set(courses.map((c) => c.level))].sort();

export default function AllClassesPage() {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (selectedInstructor && c.instructor.name !== selectedInstructor) return false;
      if (selectedInstrument && c.instrument !== selectedInstrument) return false;
      if (selectedLevel && c.level !== selectedLevel) return false;
      return true;
    });
  }, [selectedInstructor, selectedInstrument, selectedLevel]);

  return (
    <div className="min-h-screen bg-navy">
      {/* Bundle Banner */}
      <section className="bg-gradient-to-r from-magenta/20 via-navy to-magenta/20 py-16">
        <MaxWidthWrapper>
          <div className="text-center">
            <p className="mb-2 font-poppins text-xs font-semibold uppercase tracking-widest text-lime">
              Best Value
            </p>
            <h1 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              All Class Bundle
            </h1>
            <p className="mt-4 font-serif text-lg text-white/70">
              Get all 15 courses for just <span className="font-bold text-lime">$199</span>{" "}
              <span className="text-white/40 line-through">$1,299</span>
            </p>
            <div className="mt-8">
              <Button
                href="https://courses.yousicplay.com/bundles/vip-all-course-access"
                external
                variant="magenta"
                className="px-12 py-4 text-base"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Filters + Grid */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="mb-10">
            <CourseFilterBar
              instructors={instructors}
              instruments={instruments}
              levels={levels}
              selectedInstructor={selectedInstructor}
              selectedInstrument={selectedInstrument}
              selectedLevel={selectedLevel}
              onInstructorChange={setSelectedInstructor}
              onInstrumentChange={setSelectedInstrument}
              onLevelChange={setSelectedLevel}
            />
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  slug={course.slug}
                  imagePath={course.imagePath}
                  cardTitle={course.cardTitle}
                  instructorName={course.instructor.name}
                  instrument={course.instrument}
                  level={course.level}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-poppins text-lg text-white/60">
                No courses match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedInstructor("");
                  setSelectedInstrument("");
                  setSelectedLevel("");
                }}
                className="mt-4 font-poppins text-sm font-semibold text-lime underline underline-offset-4 hover:text-lime-dark"
              >
                Clear all filters
              </button>
            </div>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

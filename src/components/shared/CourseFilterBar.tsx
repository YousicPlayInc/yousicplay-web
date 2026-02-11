"use client";

import { cn } from "@/lib/utils";

interface CourseFilterBarProps {
  instructors: string[];
  instruments: string[];
  levels: string[];
  selectedInstructor: string;
  selectedInstrument: string;
  selectedLevel: string;
  onInstructorChange: (v: string) => void;
  onInstrumentChange: (v: string) => void;
  onLevelChange: (v: string) => void;
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1">
      <label className="mb-2 block font-poppins text-xs font-semibold uppercase tracking-wider text-white/50">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg bg-navy-light px-4 py-3 text-sm text-white",
          "border border-white/10 focus:border-lime focus:outline-none",
          "cursor-pointer"
        )}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function CourseFilterBar({
  instructors,
  instruments,
  levels,
  selectedInstructor,
  selectedInstrument,
  selectedLevel,
  onInstructorChange,
  onInstrumentChange,
  onLevelChange,
}: CourseFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <FilterSelect
        label="Your Instructor"
        options={instructors}
        value={selectedInstructor}
        onChange={onInstructorChange}
      />
      <FilterSelect
        label="Your Instrument"
        options={instruments}
        value={selectedInstrument}
        onChange={onInstrumentChange}
      />
      <FilterSelect
        label="Your Level"
        options={levels}
        value={selectedLevel}
        onChange={onLevelChange}
      />
    </div>
  );
}

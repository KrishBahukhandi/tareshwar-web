"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { CourseCard } from "@/components/course-card/course-card";
import type { Course } from "@/lib/courses";

type CourseDiscoveryProps = {
  courses: Course[];
};

export function CourseDiscovery({ courses }: CourseDiscoveryProps) {
  const [search, setSearch] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");

  const classLevels = useMemo(
    () =>
      Array.from(new Set(courses.map((c) => c.classLevel).filter(Boolean))).sort() as string[],
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const matchesPrice = (course: Course) => {
      if (selectedPrice === "all") return true;
      if (selectedPrice === "under-20000") return course.price < 20000;
      if (selectedPrice === "20000-30000") return course.price >= 20000 && course.price <= 30000;
      if (selectedPrice === "above-30000") return course.price > 30000;
      return true;
    };

    return [...courses]
      .filter((course) => {
        const searchable =
          `${course.title} ${course.description} ${course.category} ${course.teacherName}`.toLowerCase();
        return normalizedSearch ? searchable.includes(normalizedSearch) : true;
      })
      .filter(matchesPrice)
      .filter((course) =>
        selectedClass === "all" ? true : course.classLevel === selectedClass
      );
  }, [courses, search, selectedPrice, selectedClass]);

  const resetFilters = () => {
    setSearch("");
    setSelectedPrice("all");
    setSelectedClass("all");
  };

  return (
    <div className="mt-12 grid gap-8 xl:grid-cols-[18rem_1fr]">
      <aside className="h-fit rounded-4xl border border-ink/10 bg-white p-6 shadow-glow">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-coral" />
          <h2 className="font-heading text-2xl font-bold text-ink">Filters</h2>
        </div>

        <div className="mt-6 space-y-5">
          {/* Search */}
          <div>
            <label htmlFor="search" className="text-sm font-semibold text-ink">
              Search courses
            </label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
              <input
                id="search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or subject"
                className="w-full rounded-2xl border border-ink/10 bg-cream px-11 py-3 text-sm text-ink outline-none transition focus:border-coral"
              />
            </div>
          </div>

          {/* Price */}
          <FilterSelect label="Price" value={selectedPrice} onChange={setSelectedPrice}>
            <option value="all">All prices</option>
            <option value="under-20000">Under ₹20,000</option>
            <option value="20000-30000">₹20,000 – ₹30,000</option>
            <option value="above-30000">Above ₹30,000</option>
          </FilterSelect>

          {/* Class level */}
          <FilterSelect label="Class" value={selectedClass} onChange={setSelectedClass}>
            <option value="all">All classes</option>
            {classLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </FilterSelect>

          <button
            type="button"
            onClick={resetFilters}
            className="w-full rounded-full border border-ink/10 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-cream"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      <div>
        <div className="rounded-4xl border border-ink/10 bg-white px-6 py-5 shadow-glow">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">Course Results</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ink">
                {filteredCourses.length} course{filteredCourses.length === 1 ? "" : "s"} found
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate">
              Filter by price or class level to find the right program for you.
            </p>
          </div>
        </div>

        {filteredCourses.length ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <h3 className="font-heading text-2xl font-bold text-ink">No courses match these filters yet</h3>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate">
              Try changing your search terms or clearing one of the active filters to broaden the results.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

function FilterSelect({ label, value, onChange, children }: FilterSelectProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-coral"
      >
        {children}
      </select>
    </div>
  );
}

export function slugifyCourseTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCoursePath(course: { id: string; title: string }) {
  return `/course/${course.id}--${slugifyCourseTitle(course.title)}`;
}

export function getCourseIdFromSlug(slug: string) {
  return slug.split("--")[0] ?? slug;
}

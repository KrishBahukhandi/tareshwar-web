import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { createSupabaseAdminClient } from "@/lib/supabaseAdminClient";
import { getCourseIdFromSlug, getCoursePath, slugifyCourseTitle } from "@/lib/course-paths";

type CurriculumRow = {
  id: string;
  name: string;
  sort_order: number;
};

type ChapterRow = {
  id: string;
  subject_id: string;
  name: string;
  sort_order: number;
};

type LectureRow = {
  id: string;
  chapter_id: string;
};

type CourseRow = {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  price: number;
  thumbnail_url: string | null;
  category_tag: string | null;
  is_published: boolean;
  total_lectures: number;
  total_students: number;
  rating: number | null;
  created_at: string;
  teacher?: {
    id: string;
    name: string | null;
    avatar_url: string | null;
  } | {
    id: string;
    name: string | null;
    avatar_url: string | null;
  }[] | null;
};

export type CourseCurriculum = {
  id: string;
  subject: string;
  chapters: string[];
  lectures: number;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  teacherAvatarUrl: string | null;
  price: number;
  lectureCount: number;
  thumbnail: string;
  category: string;
  totalStudents: number;
  rating: number | null;
  createdAt: string;
  activeBatchCount: number;
  nextBatchDate: string | null;
  curriculum: CourseCurriculum[];
};

const COURSE_THUMBNAIL_FALLBACK =
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80";

function firstRelation<T>(value: T | T[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

async function getWebsiteSupabase() {
  return createSupabaseAdminClient() ?? createSupabaseServerClient();
}

function normalizeCourse(
  row: CourseRow,
  batchSummary?: {
    activeBatchCount: number;
    nextBatchDate: string | null;
  },
  curriculum: CourseCurriculum[] = []
) {
  const teacher = firstRelation(row.teacher);

  return {
    id: row.id,
    title: row.title,
    description: row.description || "Course details will be shared by the institute.",
    teacherId: row.teacher_id,
    teacherName: teacher?.name?.trim() || "Tareshwar Faculty",
    teacherAvatarUrl: teacher?.avatar_url ?? null,
    price: Number(row.price ?? 0),
    lectureCount: Number(row.total_lectures ?? 0),
    thumbnail: row.thumbnail_url || COURSE_THUMBNAIL_FALLBACK,
    category: row.category_tag?.trim() || "General",
    totalStudents: Number(row.total_students ?? 0),
    rating: row.rating == null ? null : Number(row.rating),
    createdAt: row.created_at,
    activeBatchCount: batchSummary?.activeBatchCount ?? 0,
    nextBatchDate: batchSummary?.nextBatchDate ?? null,
    curriculum
  } satisfies Course;
}

async function getBatchSummary(courseIds: string[]) {
  if (!courseIds.length) {
    return new Map<string, { activeBatchCount: number; nextBatchDate: string | null }>();
  }

  const supabase = await getWebsiteSupabase();
  const { data } = await supabase
    .from("batches")
    .select("course_id, start_date, is_active")
    .in("course_id", courseIds);

  const summary = new Map<string, { activeBatchCount: number; nextBatchDate: string | null }>();

  for (const row of data ?? []) {
    const courseId = String(row.course_id);
    const existing = summary.get(courseId) ?? {
      activeBatchCount: 0,
      nextBatchDate: null
    };

    if (row.is_active) {
      existing.activeBatchCount += 1;
      if (!existing.nextBatchDate || String(row.start_date) < existing.nextBatchDate) {
        existing.nextBatchDate = String(row.start_date);
      }
    }

    summary.set(courseId, existing);
  }

  return summary;
}

async function getCourseCurriculum(courseId: string) {
  const supabase = await getWebsiteSupabase();
  const { data: subjectRows } = await supabase
    .from("subjects")
    .select("id, name, sort_order")
    .eq("course_id", courseId)
    .order("sort_order", { ascending: true });

  const subjects = (subjectRows ?? []) as CurriculumRow[];
  if (!subjects.length) {
    return [] as CourseCurriculum[];
  }

  const subjectIds = subjects.map((subject) => subject.id);
  const { data: chapterRows } = await supabase
    .from("chapters")
    .select("id, subject_id, name, sort_order")
    .in("subject_id", subjectIds)
    .order("sort_order", { ascending: true });

  const chapters = (chapterRows ?? []) as ChapterRow[];
  const chapterIds = chapters.map((chapter) => chapter.id);
  const { data: lectureRows } = chapterIds.length
    ? await supabase.from("lectures").select("id, chapter_id").in("chapter_id", chapterIds)
    : { data: [] as LectureRow[] };

  const lectureCountByChapter = new Map<string, number>();
  for (const lecture of (lectureRows ?? []) as LectureRow[]) {
    lectureCountByChapter.set(
      lecture.chapter_id,
      (lectureCountByChapter.get(lecture.chapter_id) ?? 0) + 1
    );
  }

  const chaptersBySubject = new Map<string, ChapterRow[]>();
  for (const chapter of chapters) {
    const current = chaptersBySubject.get(chapter.subject_id) ?? [];
    current.push(chapter);
    chaptersBySubject.set(chapter.subject_id, current);
  }

  return subjects.map((subject) => {
    const subjectChapters = (chaptersBySubject.get(subject.id) ?? []).sort(
      (left, right) => left.sort_order - right.sort_order
    );

    return {
      id: subject.id,
      subject: subject.name,
      chapters: subjectChapters.map((chapter) => chapter.name),
      lectures: subjectChapters.reduce(
        (count, chapter) => count + (lectureCountByChapter.get(chapter.id) ?? 0),
        0
      )
    } satisfies CourseCurriculum;
  });
}

export async function getCourses() {
  const supabase = await getWebsiteSupabase();
  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, description, teacher_id, price, thumbnail_url, category_tag, is_published, total_lectures, total_students, rating, created_at, teacher:users!teacher_id(id, name, avatar_url)"
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [] as Course[];
  }

  const rows = data as CourseRow[];
  const batchSummary = await getBatchSummary(rows.map((course) => course.id));

  return rows.map((row) => normalizeCourse(row, batchSummary.get(row.id), []));
}

export async function getCourseById(id: string) {
  const supabase = await getWebsiteSupabase();
  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, description, teacher_id, price, thumbnail_url, category_tag, is_published, total_lectures, total_students, rating, created_at, teacher:users!teacher_id(id, name, avatar_url)"
    )
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const [batchSummary, curriculum] = await Promise.all([
    getBatchSummary([id]),
    getCourseCurriculum(id)
  ]);

  return normalizeCourse(data as CourseRow, batchSummary.get(id), curriculum);
}

export { slugifyCourseTitle, getCoursePath, getCourseIdFromSlug };

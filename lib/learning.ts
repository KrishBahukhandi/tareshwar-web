import { getCourseById } from "@/lib/courses";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { createSupabaseAdminClient } from "@/lib/supabaseAdminClient";

const STORAGE_SCHEME = "storage://";
const SIGNED_URL_EXPIRY = 3600; // 1 hour

/**
 * Resolve a storage:// reference to a signed Supabase Storage URL.
 * If the value is already an http(s) URL or null, returns it as-is.
 */
async function resolveStorageUrl(value: string | null): Promise<string | null> {
  if (!value || !value.startsWith(STORAGE_SCHEME)) {
    return value;
  }

  const withoutScheme = value.substring(STORAGE_SCHEME.length);
  const slashIndex = withoutScheme.indexOf("/");
  if (slashIndex <= 0) return value;

  const bucket = withoutScheme.substring(0, slashIndex);
  const path = withoutScheme.substring(slashIndex + 1);

  // Use admin client so signed URLs work regardless of RLS
  const admin = createSupabaseAdminClient();
  if (!admin) {
    // Fallback to regular server client
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.storage.from(bucket).createSignedUrl(path, SIGNED_URL_EXPIRY);
    return data?.signedUrl ?? value;
  }

  const { data } = await admin.storage.from(bucket).createSignedUrl(path, SIGNED_URL_EXPIRY);
  return data?.signedUrl ?? value;
}

type SubjectRow = {
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
  title: string;
  description: string | null;
  video_url: string | null;
  notes_url: string | null;
  duration_seconds: number | null;
  is_free: boolean;
  sort_order: number;
};

type ProgressRow = {
  lecture_id: string;
  watched_seconds: number;
  completed: boolean;
  updated_at?: string;
};

export type LearningLecture = {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  notesUrl: string | null;
  durationSeconds: number;
  isFree: boolean;
  sortOrder: number;
  watchedSeconds: number;
  completed: boolean;
};

export type LearningChapter = {
  id: string;
  name: string;
  sortOrder: number;
  lectures: LearningLecture[];
};

export type LearningSubject = {
  id: string;
  name: string;
  sortOrder: number;
  chapters: LearningChapter[];
};

export type LearningCourse = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacherName: string;
  classLevel: string | null;
  subjects: LearningSubject[];
  totalLectures: number;
  completedLectures: number;
  progressPercent: number;
  resumeLectureId: string | null;
};

export type LecturePageData = {
  course: LearningCourse;
  lecture: LearningLecture;
  chapter: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
  nextLectureId: string | null;
  previousLectureId: string | null;
};

function firstRelation<T>(value: T | T[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export async function getStudentCourseLearning(courseId: string, studentId: string) {
  const supabase = await createSupabaseServerClient();
  const courseMeta = await getCourseById(courseId);

  const { data: matchingEnrollment } = await supabase
    .from("enrollments")
    .select("id, progress_percent, course_id")
    .eq("student_id", studentId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (!matchingEnrollment) {
    return null;
  }

  const { data: subjectRows } = await supabase
    .from("subjects")
    .select("id, name, sort_order")
    .eq("course_id", courseId)
    .order("sort_order", { ascending: true });

  const filteredSubjects = (subjectRows ?? []) as SubjectRow[];

  if (!filteredSubjects.length && courseMeta) {
    return {
      id: courseMeta.id,
      title: courseMeta.title,
      description: courseMeta.description,
      thumbnail: courseMeta.thumbnail,
      teacherName: courseMeta.teacherName,
      classLevel: courseMeta.classLevel,
      subjects: [],
      totalLectures: 0,
      completedLectures: 0,
      progressPercent: Number(matchingEnrollment.progress_percent ?? 0),
      resumeLectureId: null
    } satisfies LearningCourse;
  }

  const subjectIds = filteredSubjects.map((subject) => subject.id);
  const { data: chapterRows } = subjectIds.length
    ? await supabase
        .from("chapters")
        .select("id, subject_id, name, sort_order")
        .in("subject_id", subjectIds)
        .order("sort_order", { ascending: true })
    : { data: [] as ChapterRow[] };

  const chapterIds = (chapterRows ?? []).map((chapter) => chapter.id);
  const { data: lectureRows } = chapterIds.length
    ? await supabase
        .from("lectures")
        .select("id, chapter_id, title, description, video_url, notes_url, duration_seconds, is_free, sort_order")
        .in("chapter_id", chapterIds)
        .order("sort_order", { ascending: true })
    : { data: [] as LectureRow[] };

  const lectureIds = (lectureRows ?? []).map((lecture) => lecture.id);
  const { data: progressRows } = lectureIds.length
    ? await supabase
        .from("watch_progress")
        .select("lecture_id, watched_seconds, completed, updated_at")
        .eq("student_id", studentId)
        .in("lecture_id", lectureIds)
    : { data: [] as ProgressRow[] };

  const progressByLecture = new Map(
    (progressRows ?? []).map((progress) => [progress.lecture_id, progress])
  );

  const chaptersBySubject = new Map<string, ChapterRow[]>();
  for (const chapter of (chapterRows ?? []) as ChapterRow[]) {
    const current = chaptersBySubject.get(chapter.subject_id) ?? [];
    current.push(chapter);
    chaptersBySubject.set(chapter.subject_id, current);
  }

  const lecturesByChapter = new Map<string, LectureRow[]>();
  for (const lecture of (lectureRows ?? []) as LectureRow[]) {
    const current = lecturesByChapter.get(lecture.chapter_id) ?? [];
    current.push(lecture);
    lecturesByChapter.set(lecture.chapter_id, current);
  }

  const subjects: LearningSubject[] = await Promise.all(
    filteredSubjects.map(async (subject) => ({
      id: subject.id,
      name: subject.name,
      sortOrder: subject.sort_order,
      chapters: await Promise.all(
        (chaptersBySubject.get(subject.id) ?? [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(async (chapter) => ({
            id: chapter.id,
            name: chapter.name,
            sortOrder: chapter.sort_order,
            lectures: await Promise.all(
              (lecturesByChapter.get(chapter.id) ?? [])
                .sort((a, b) => a.sort_order - b.sort_order)
                .map(async (lecture) => {
                  const progress = progressByLecture.get(lecture.id);

                  return {
                    id: lecture.id,
                    title: lecture.title,
                    description: lecture.description ?? "Watch the lesson and continue your progress.",
                    videoUrl: await resolveStorageUrl(lecture.video_url),
                    notesUrl: await resolveStorageUrl(lecture.notes_url),
                    durationSeconds: Number(lecture.duration_seconds ?? 0),
                    isFree: lecture.is_free,
                    sortOrder: lecture.sort_order,
                    watchedSeconds: Number(progress?.watched_seconds ?? 0),
                    completed: Boolean(progress?.completed)
                  };
                })
            )
          }))
      )
    }))
  );

  const flatLectures = subjects.flatMap((subject) =>
    subject.chapters.flatMap((chapter) => chapter.lectures)
  );
  const completedLectures = flatLectures.filter((lecture) => lecture.completed).length;
  const latestProgress = [...(progressRows ?? [])].sort((a, b) =>
    new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime()
  )[0];
  const fallbackLectureId = flatLectures.find((lecture) => !lecture.completed)?.id ?? flatLectures[0]?.id ?? null;

  return {
    id: courseMeta?.id ?? courseId,
    title: courseMeta?.title ?? "Course",
    description: courseMeta?.description ?? "Continue learning from your enrolled course.",
    thumbnail: courseMeta?.thumbnail ?? "",
    teacherName: courseMeta?.teacherName ?? "Faculty",
    classLevel: courseMeta?.classLevel ?? null,
    subjects,
    totalLectures: flatLectures.length,
    completedLectures,
    progressPercent:
      flatLectures.length > 0 ? (completedLectures / flatLectures.length) * 100 : Number(matchingEnrollment.progress_percent ?? 0),
    resumeLectureId:
      latestProgress?.lecture_id && flatLectures.some((lecture) => lecture.id === latestProgress.lecture_id)
        ? latestProgress.lecture_id
        : fallbackLectureId
  } satisfies LearningCourse;
}

export async function getStudentLecturePageData(lectureId: string, studentId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: lectureRow, error } = await supabase
    .from("lectures")
    .select(
      "id, title, description, video_url, notes_url, duration_seconds, is_free, sort_order, chapter:chapters(id, name, subject:subjects(id, name, course_id))"
    )
    .eq("id", lectureId)
    .maybeSingle();

  if (error || !lectureRow) {
    return null;
  }

  const chapter = firstRelation(lectureRow.chapter);
  const subject = firstRelation(chapter?.subject);
  const courseId = subject?.course_id;

  if (!courseId) {
    return null;
  }

  const course = await getStudentCourseLearning(courseId, studentId);

  if (!course) {
    return null;
  }

  let currentSubject: LearningSubject | null = null;
  let currentChapter: LearningChapter | null = null;
  let currentLecture: LearningLecture | null = null;

  for (const subjectNode of course.subjects) {
    for (const chapterNode of subjectNode.chapters) {
      const lectureNode = chapterNode.lectures.find((item) => item.id === lectureId);

      if (lectureNode) {
        currentSubject = subjectNode;
        currentChapter = chapterNode;
        currentLecture = lectureNode;
        break;
      }
    }

    if (currentLecture) {
      break;
    }
  }

  if (!currentSubject || !currentChapter || !currentLecture) {
    return null;
  }

  const flatLectures = course.subjects.flatMap((subjectNode) =>
    subjectNode.chapters.flatMap((chapterNode) => chapterNode.lectures)
  );
  const currentIndex = flatLectures.findIndex((item) => item.id === lectureId);

  return {
    course,
    lecture: currentLecture,
    chapter: {
      id: currentChapter.id,
      name: currentChapter.name
    },
    subject: {
      id: currentSubject.id,
      name: currentSubject.name
    },
    previousLectureId: currentIndex > 0 ? flatLectures[currentIndex - 1]?.id ?? null : null,
    nextLectureId:
      currentIndex >= 0 && currentIndex < flatLectures.length - 1 ? flatLectures[currentIndex + 1]?.id ?? null : null
  } satisfies LecturePageData;
}

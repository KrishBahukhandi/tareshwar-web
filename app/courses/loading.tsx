import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/loading/Skeleton";

export default function CoursesLoading() {
  return (
    <PageContainer as="section" className="py-20">
      <div className="max-w-3xl">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="mt-6 h-14 w-full max-w-3xl" />
        <Skeleton className="mt-5 h-6 w-full max-w-2xl" />
        <Skeleton className="mt-3 h-6 w-4/5 max-w-xl" />
      </div>

      <div className="mt-12 grid gap-8 xl:grid-cols-[18rem_1fr]">
        <aside className="h-fit rounded-4xl border border-ink/10 bg-white p-6 shadow-glow">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-8 w-28" />
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-2 h-12 w-full rounded-2xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="mt-2 h-12 w-full rounded-2xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="mt-2 h-12 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </aside>

        <div>
          <div className="rounded-4xl border border-ink/10 bg-white px-6 py-5 shadow-glow">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-3 h-9 w-48" />
            <Skeleton className="mt-4 h-4 w-full max-w-lg" />
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            <Skeleton className="h-[26rem]" />
            <Skeleton className="h-[26rem]" />
            <Skeleton className="h-[26rem]" />
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-4xl bg-ink px-8 py-10 text-cream shadow-glow lg:flex lg:items-center lg:justify-between">
        <div className="w-full max-w-2xl">
          <Skeleton className="h-10 w-72 max-w-full bg-white/20" />
          <Skeleton className="mt-3 h-5 w-full bg-white/15" />
          <Skeleton className="mt-2 h-5 w-4/5 bg-white/15" />
        </div>
        <Skeleton className="mt-6 h-12 w-36 rounded-full bg-white/20 lg:mt-0" />
      </div>
    </PageContainer>
  );
}

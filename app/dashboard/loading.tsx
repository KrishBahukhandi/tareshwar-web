import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/loading/Skeleton";

export default function DashboardLoading() {
  return (
    <PageContainer as="section" className="py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow lg:sticky lg:top-24">
          <div className="rounded-3xl bg-ink px-5 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-28 bg-white/20" />
                <Skeleton className="h-3 w-40 bg-white/15" />
              </div>
            </div>
            <Skeleton className="mt-4 h-3 w-24 bg-white/15" />
          </div>

          <div className="mt-5 grid gap-2">
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
          </div>
        </aside>

        <div className="space-y-8">
          <section className="rounded-4xl bg-ink px-8 py-10 shadow-glow">
            <Skeleton className="h-3 w-32 bg-white/15" />
            <Skeleton className="mt-4 h-10 w-80 max-w-full bg-white/20" />
            <Skeleton className="mt-3 h-5 w-full max-w-2xl bg-white/15" />
          </section>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
              <Skeleton className="h-8 w-52" />
              <div className="mt-6 space-y-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
              </div>
            </section>

            <div className="space-y-8">
              <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
                <Skeleton className="h-8 w-48" />
                <div className="mt-6 space-y-4">
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                </div>
              </section>

              <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
                <Skeleton className="h-8 w-56" />
                <div className="mt-6 space-y-4">
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

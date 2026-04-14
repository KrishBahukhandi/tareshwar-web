import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/loading/Skeleton";

export default function RootLoading() {
  return (
    <PageContainer as="section" className="py-16 lg:py-20">
      <div className="space-y-12">
        <section className="rounded-4xl bg-hero-grid px-8 py-12 text-white shadow-glow lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Skeleton className="h-8 w-28 bg-white/20" />
              <Skeleton className="h-14 w-full max-w-2xl bg-white/20" />
              <Skeleton className="h-6 w-full max-w-xl bg-white/15" />
              <Skeleton className="h-6 w-4/5 max-w-lg bg-white/15" />

              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                <Skeleton className="h-24 bg-white/15" />
                <Skeleton className="h-24 bg-white/15" />
                <Skeleton className="h-24 bg-white/15" />
              </div>
            </div>

            <Skeleton className="hidden h-[24rem] rounded-[2.5rem] bg-white/15 lg:block" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
        </section>

        <section className="space-y-5">
          <Skeleton className="h-8 w-56" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

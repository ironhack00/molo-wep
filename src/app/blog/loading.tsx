import { BackgroundGlow } from "@/components/molecules/BackgroundGlow";
import { cn, sectionPadding, maxWidths } from "@/utils/classNames";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black relative">
      <BackgroundGlow theme="primary" intensity={0.5} />
      
      <div className="relative z-10 pt-32 md:pt-40 px-4 sm:px-6 md:px-8 lg:px-12 animate-pulse">
        {/* Hero Skeleton */}
        <div className="w-full max-w-[1280px] mx-auto mb-20">
          <div className="aspect-[21/9] max-md:aspect-[16/9] rounded-[32px] bg-white/10" />
        </div>

        {/* Filters Skeleton */}
        <div className={cn(maxWidths.xl, sectionPadding.x, "mb-12")}>
          <div className="h-12 bg-white/10 rounded-full w-64 mb-8" />
          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-white/10 rounded-full w-24" />
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className={cn(maxWidths.xl, sectionPadding.x)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl bg-white/10 overflow-hidden">
                <div className="aspect-[16/9] bg-white/5" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


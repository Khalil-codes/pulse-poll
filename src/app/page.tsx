import PollList from "@/components/poll-list";
import { PollSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold underline decoration-primary decoration-dotted decoration-4 underline-offset-4">
          Active Polls
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={Array(3)
              .fill(1)
              .map((_, index) => (
                <PollSkeleton key={index} />
              ))}>
            <PollList type="active" />
          </Suspense>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold underline decoration-primary decoration-dotted decoration-4 underline-offset-4">
          Expired Polls
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={Array(3)
              .fill(1)
              .map((_, index) => (
                <PollSkeleton key={index} />
              ))}>
            <PollList type="expired" />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

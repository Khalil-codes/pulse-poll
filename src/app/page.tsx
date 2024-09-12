import PollList from "@/components/poll-list";
import {PollSkeleton} from "@/components/skeletons";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={Array(3)
          .fill(1)
          .map((_, index) => (
            <PollSkeleton key={index} />
          ))}>
        <PollList />
      </Suspense>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function PollSkeleton() {
  return (
    <div className="relative h-full">
      <div className="flex flex-col gap-3 rounded-md border bg-background p-5 pb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
          <Skeleton className="h-2 w-32 rounded-full"></Skeleton>
        </div>
        <Skeleton className="h-5 w-48 rounded-full"></Skeleton>
        <Skeleton className="h-3 w-14 rounded-full"></Skeleton>
        <Skeleton className="mt-3 h-3 w-48 rounded-full"></Skeleton>
      </div>

      <Skeleton className="absolute right-0 top-0 -z-10 h-full w-full translate-x-3 translate-y-3 rounded-md"></Skeleton>
    </div>
  );
}

export const OptionSkeleton = () => {
  return (
    <div className="relative h-full">
      <div className="flex flex-col gap-3 rounded-md border bg-background p-5 pb-6">
        <Skeleton className="h-2 w-32 rounded-full"></Skeleton>
        <Skeleton className="h-2 w-12 rounded-full"></Skeleton>
      </div>
      <Skeleton className="absolute right-0 top-0 -z-10 h-full w-full translate-x-3 translate-y-3 rounded-md"></Skeleton>
    </div>
  );
};

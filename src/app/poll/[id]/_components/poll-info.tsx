import { Skeleton } from "@/components/ui/skeleton";
import { rings } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { getRandomElement } from "@/lib/utils";
import nextDynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
const Timer = nextDynamic(() => import("../_components/timer"), {
  ssr: false,
  loading: () => <Skeleton className="h-7 w-32"></Skeleton>,
});

type Props = {
  id: string;
};

export const dynamic = "force-static";

const PollInfo = async ({ id }: Props) => {
  const { backgroundColor, ringColor } = getRandomElement(rings);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("poll")
    .select("title, description, ends_at, user:users(name, avatar_url)")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="group relative h-full">
      <div className="flex min-h-40 flex-col gap-3 rounded-md border bg-slate-50 p-5 dark:border-zinc-600 dark:bg-zinc-800">
        {data.user && (
          <div className="flex items-center gap-3">
            <Image
              src={data.user.avatar_url}
              alt={data.user.name}
              width={30}
              height={30}
              className={`rounded-full ring-2`}
              style={{ "--tw-ring-color": ringColor } as React.CSSProperties}
            />
            <div>
              <h1 className="text-base">{data.user.name}</h1>
            </div>
          </div>
        )}
        <h1 className="break-words text-3xl font-bold">{data.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {data.description}
        </p>
        <Timer date={data.ends_at} />
      </div>
      <div
        className={`absolute right-0 top-0 -z-10 h-full w-full translate-x-3 translate-y-3 rounded-md ring-1`}
        style={
          {
            "--tw-ring-color": ringColor,
            backgroundColor,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default PollInfo;

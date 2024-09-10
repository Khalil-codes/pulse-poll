import { rings } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { getRandomElement } from "@/lib/utils";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React from "react";
const Timer = dynamic(() => import("../_components/timer"), { ssr: false });

type Props = {
  id: string;
};

const PollInfo = async ({ id }: Props) => {
  const { backgroundColor, ringColor } = getRandomElement(rings);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("poll")
    .select("title, description, ends_at")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="group relative h-full">
      <div className="flex min-h-40 flex-col gap-3 rounded-md border bg-slate-50 p-5 dark:border-zinc-600 dark:bg-zinc-800">
        <h1 className="break-words text-3xl font-bold">{data.title}</h1>
        <p className="text-xl">{data.description}</p>
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

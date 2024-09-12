"use client";

import { rings } from "@/lib/constants";
import { cn, getRandomElement } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React, { useMemo } from "react";
import { castVote } from "../actions";
import { toast } from "sonner";

export type OptionType = {
  id: string;
  option: string;
  poll_id: string;
  votes: { count: number }[];
};

type Props = {
  option: OptionType;
  total: number;
  expired: boolean;
  voteCastedFor: { id: string; option_id: string } | null;
};

const Option = ({ option, total, voteCastedFor, expired }: Props) => {
  const { backgroundColor, ringColor } = getRandomElement(rings);

  const count = useMemo(
    () => (total > 0 ? +((option.votes[0].count / total) * 100).toFixed(2) : 0),
    [option, total]
  );

  const hasAlreadyCasted = useMemo(
    () => voteCastedFor?.option_id === option.id,
    [voteCastedFor, option]
  );

  const formAction = async () => {
    if (expired || hasAlreadyCasted) return;
    toast.promise(castVote.bind(null, option), {
      loading: "Voting...",
      success: "Voted!",
      error: "Error",
      position: "bottom-left",
    });
  };

  return (
    <form action={formAction}>
      <button
        className="group relative h-full w-full"
        type="submit"
        disabled={expired}>
        <div
          className={cn(
            "flex min-h-20 cursor-pointer items-center justify-between gap-3 rounded-md border bg-slate-50 p-5 transition-all dark:border-zinc-600 dark:bg-zinc-800",
            {
              "group-hover:translate-x-3 group-hover:translate-y-3": !expired,
              "cursor-not-allowed": expired || hasAlreadyCasted,
            }
          )}>
          <div>
            <p>{option.option}</p>
            <p className="w-fit text-xs text-gray-600 dark:text-gray-300">
              {option.votes[0].count} votes
            </p>
          </div>
          {hasAlreadyCasted && <CircleCheck size={24} />}
        </div>
        <div
          className={cn("absolute inset-0 left-0 rounded-l-md transition-all", {
            "rounded-md": count === 100,
            "group-hover:translate-x-3 group-hover:translate-y-3": !expired,
            "cursor-not-allowed": expired || hasAlreadyCasted,
          })}
          style={{ width: `${count}%`, backgroundColor }}
        />
        <div
          className={cn(
            `absolute right-0 top-0 -z-10 h-full w-full rounded-md ring-1`,
            {
              "translate-x-3 translate-y-3": !expired,
            }
          )}
          style={
            {
              "--tw-ring-color": ringColor,
              backgroundColor: backgroundColor,
            } as React.CSSProperties
          }
        />
      </button>
    </form>
  );
};

export default Option;

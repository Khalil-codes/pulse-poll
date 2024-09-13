import { rings } from "@/lib/constants";
import { PollWithUser } from "@/lib/types";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { getRandomElement } from "@/lib/utils";
import { isBefore } from "date-fns";
import RelativeTime from "./relative-time";

type Props = {
  poll: PollWithUser;
};

const PollCard = ({ poll }: Props) => {
  const { backgroundColor, ringColor } = getRandomElement(rings);
  const { title, ends_at, user } = poll;
  const isActive = isBefore(new Date(), new Date(ends_at));

  const totalVotes = poll.total_votes.reduce((a, b) => a + b.count, 0);

  return (
    <div className="group relative h-full">
      <div className="relative flex h-full flex-col gap-3 rounded-md border bg-slate-50 p-5 transition-all group-hover:translate-x-3 group-hover:translate-y-3 dark:border-zinc-600 dark:bg-zinc-800">
        {user && (
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar_url}
              alt={user.name}
              width={30}
              height={30}
              className={`rounded-full ring-2`}
              style={{ "--tw-ring-color": ringColor } as React.CSSProperties}
            />
            <div>
              <h1 className="text-base">{user.name}</h1>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 text-2xl font-medium">{title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {totalVotes} votes
          </p>
        </div>
        <div className="mt-auto" suppressHydrationWarning>
          {!isActive ? (
            <Badge>Expired</Badge>
          ) : (
            <p
              className="text-sm text-gray-600 dark:text-gray-400"
              suppressHydrationWarning>
              Expires <RelativeTime date={ends_at} />
            </p>
          )}
        </div>
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

export default PollCard;

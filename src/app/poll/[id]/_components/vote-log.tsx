import { toLocalDate } from "@/lib/helpers";
import { getUser } from "@/lib/supabase/user";
import { getLatestVotesByPollId } from "@/services/polls";
import { formatRelative } from "date-fns";
import { InfoIcon } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const VoteLog = async ({ id }: Props) => {
  const votes = await getLatestVotesByPollId(id, 3);
  const user = await getUser();

  if (votes.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-400">
        Latest Votes
      </h4>
      <div className="flex flex-col gap-2">
        {votes
          .filter((vote) => vote.user?.name || vote.option?.text)
          .map((vote) => (
            <div
              className="flex items-center gap-2 text-gray-700 dark:text-gray-400"
              key={vote.id}>
              <InfoIcon size={16} />
              <p className="text-sm">
                {vote?.user?.id === user?.id ? "You" : vote?.user?.name} voted
                for{" "}
                <span className="font-bold text-yellow-600 dark:text-yellow-500">
                  {vote.option?.text}
                </span>{" "}
                {formatRelative(
                  toLocalDate(new Date(vote.created_at)),
                  toLocalDate(new Date())
                )}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VoteLog;

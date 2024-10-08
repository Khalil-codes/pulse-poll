import { getPolls } from "@/services/polls";
import Link from "next/link";
import React from "react";
import PollCard from "./poll-card";

type Props = {
  type: "active" | "expired";
};

const PollList = async ({ type }: Props) => {
  const polls = await getPolls(type);

  if (polls.length === 0) {
    return <h1 className="text-3xl font-bold">No polls found</h1>;
  }
  return (
    <>
      {polls.map((poll) => (
        <Link href={`/poll/${poll.id}`} key={poll.id} className="h-full">
          <PollCard poll={poll} />
        </Link>
      ))}
    </>
  );
};

export default PollList;

import React from "react";
import PollOptions from "./options";
import { getPollById } from "@/services/polls";
import { notFound } from "next/navigation";
import { isAfter } from "date-fns";

type Props = {
  id: string;
};

const VoteWrapper = async (props: Props) => {
  const poll = await getPollById(props.id);

  if (!poll) {
    return notFound();
  }

  const { options, voteCasted, ends_at } = poll;

  return (
    <div>
      <PollOptions options={options} id={props.id} voteCasted={voteCasted} expired={isAfter(new Date(), new Date(ends_at))} />
    </div>
  );
};

export default VoteWrapper;

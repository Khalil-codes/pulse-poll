import React from "react";
import PollOptions from "./options";
import { getPollById } from "@/services/polls";
import { notFound } from "next/navigation";

type Props = {
  id: string;
};

const VoteWrapper = async (props: Props) => {
  const poll = await getPollById(props.id);

  if (!poll) {
    return notFound();
  }

  const { options, voteCasted } = poll;

  return (
    <div>
      <PollOptions options={options} id={props.id} voteCasted={voteCasted} />
    </div>
  );
};

export default VoteWrapper;

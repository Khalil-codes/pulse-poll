import React from "react";
import PollOptions from "./options";
import { getPollById } from "@/services/polls";
import { notFound } from "next/navigation";
import { isAfter } from "date-fns";
import { getUser } from "@/lib/supabase/user";
import AuthComponent from "./auth-component";
import Presence from "./presence";
import VoteLog from "./vote-log";

type Props = {
  id: string;
};

const VoteWrapper = async (props: Props) => {
  const user = await getUser();
  const poll = user ? await getPollById(props.id) : null;

  if (!user) {
    return <AuthComponent />;
  }

  if (!poll) {
    return notFound();
  }

  const { options, voteCasted, ends_at } = poll;

  return (
    <div className="flex flex-col gap-5">
      <Presence id={props.id} />
      <PollOptions
        options={options}
        id={props.id}
        voteCasted={voteCasted}
        expired={isAfter(new Date(), new Date(ends_at))}
      />
      <VoteLog id={props.id} />
    </div>
  );
};

export default VoteWrapper;

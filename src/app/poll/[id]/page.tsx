import { getPollIds } from "@/services/polls";
import React from "react";
import PollInfo from "./_components/poll-info";

export async function generateStaticParams() {
  const polls = await getPollIds();
  return polls.map((poll) => ({ id: poll.id }));
}

type Props = {
  params: {
    id: string;
  };
};

const PollPage = async ({ params }: Props) => {
  const { id } = params;

  return (
    <section className="mt-6 flex flex-1 flex-col gap-4">
      <PollInfo id={id} />
    </section>
  );
};

export default PollPage;

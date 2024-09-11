import { getPollIds } from "@/services/polls";
import React, { Suspense } from "react";
import PollInfo from "./_components/poll-info";
import VoteWrapper from "./_components/vote-wrapper";

export async function generateStaticParams() {
  const polls = await getPollIds();
  return polls.map((poll) => ({ id: poll.id }));
}

type Props = {
  params: {
    id: string;
  };
};

export const dynamic = "auto";

const PollPage = async ({ params }: Props) => {
  const { id } = params;

  return (
    <section className="mt-6 flex flex-1 flex-col gap-10">
      <PollInfo id={id} />
      <Suspense fallback={<div>Loading...</div>}>
        <VoteWrapper id={id} />
      </Suspense>
    </section>
  );
};

export default PollPage;

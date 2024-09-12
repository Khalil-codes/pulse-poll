import { getPollIds } from "@/services/polls";
import React, { Suspense } from "react";
import PollInfo from "./_components/poll-info";
import VoteWrapper from "./_components/vote-wrapper";
import { VoteWrapperSkeleton } from "@/components/skeletons";

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
    <section className="mt-6 flex flex-1 flex-col gap-10">
      <PollInfo id={id} />
      <Suspense fallback={<VoteWrapperSkeleton />}>
        <VoteWrapper id={id} />
      </Suspense>
    </section>
  );
};

export default PollPage;

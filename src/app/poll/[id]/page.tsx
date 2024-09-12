import { getPollIds, getPollMetadata } from "@/services/polls";
import React, { Suspense } from "react";
import PollInfo from "./_components/poll-info";
import VoteWrapper from "./_components/vote-wrapper";
import { PollSkeleton, VoteWrapperSkeleton } from "@/components/skeletons";
import { DEFAULT_DESCRIPTION } from "@/lib/constants";
import { Metadata } from "next";
import { getURL } from "@/lib/utils";

export async function generateStaticParams() {
  const polls = await getPollIds();
  return polls.map((poll) => ({ id: poll.id }));
}

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const data = await getPollMetadata(id);

  if (!data) {
    return {
      title: "Poll not found",
      description: DEFAULT_DESCRIPTION,
    };
  }

  return {
    metadataBase: new URL(getURL()),
    title: data?.title,
    authors: {
      name: data?.user?.name,
    },
    description: data?.description || DEFAULT_DESCRIPTION,
    openGraph: {
      description: data?.description || DEFAULT_DESCRIPTION,
      title: data?.title,
      url: "poll/" + id,
      siteName: "Pulse Vote",
      images: `api/og?author=${data?.user?.name}&author_url=${encodeURIComponent(data?.user?.avatar_url || "")}&title=${encodeURIComponent(data?.title || "")}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    keywords: ["vote", data?.user?.name || "", "pulsevote"],
  };
}

const PollPage = async ({ params }: Props) => {
  const { id } = params;

  return (
    <section className="mt-6 flex flex-1 flex-col gap-10">
      <Suspense fallback={<PollSkeleton />}>
        <PollInfo id={id} />
      </Suspense>
      <Suspense fallback={<VoteWrapperSkeleton />}>
        <VoteWrapper id={id} />
      </Suspense>
    </section>
  );
};

export default PollPage;

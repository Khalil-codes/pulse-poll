import PollCard from "@/components/poll-card";
import { getPolls } from "@/services/polls";
import Link from "next/link";

export default async function Home() {
  const polls = await getPolls();

  if (polls.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">No polls found</h1>
      </div>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll) => (
        <Link href={`/poll/${poll.id}`} key={poll.id} className="h-full">
          <PollCard poll={poll} />
        </Link>
      ))}
    </div>
  );
}

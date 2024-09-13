import { Button } from "@/components/ui/button";
import { getPollsByUser } from "@/services/polls";
import Link from "next/link";
import React from "react";
import PollsTable from "./_components/polls-table";

const ProfilePage = async () => {
  const polls = await getPollsByUser();

  if (polls.length === 0) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center gap-5">
        <h1 className="text-xl font-semibold">
          {"You don't any votes. Click here to create"}
        </h1>
        <Button asChild>
          <Link href="/create">Create</Link>
        </Button>
      </section>
    );
  }

  return (
    <section>
      <PollsTable polls={polls} />
    </section>
  );
};

export default ProfilePage;

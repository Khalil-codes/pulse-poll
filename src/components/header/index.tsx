import { RocketIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { ModeToggle } from "../theme-toggle";
import { getUser } from "@/lib/supabase/user";
import { Button } from "../ui/button";
import Profile from "./profile";
import { Skeleton } from "../ui/skeleton";

const Header = async () => {
  return (
    <nav className="flex w-full items-center justify-between">
      <div className="text-3xl font-bold">
        <Link href="/" className="flex items-center gap-2 font-geist-mono">
          PulseVote{" "}
          <RocketIcon className="h-5 w-5 transform animate-lanuch text-green-500 transition-all" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Suspense
          fallback={
            <Skeleton className="h-10 w-10 rounded-full bg-primary/30" />
          }>
          <User />
        </Suspense>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;

const User = async () => {
  const user = await getUser();

  return (
    <>
      {user ? (
        <Profile user={user} />
      ) : (
        <Button
          variant="outline"
          asChild
          className="flex animate-fade items-center gap-2 rounded-md border border-zinc-400 p-2 px-8 transition-all hover:border-green-500">
          <Link href={"/auth/"}>Login</Link>
        </Button>
      )}
    </>
  );
};

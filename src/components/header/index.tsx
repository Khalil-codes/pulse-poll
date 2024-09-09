import { RocketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../theme-toggle";
import { getUser } from "@/lib/supabase/user";
import { Button } from "../ui/button";
import Profile from "./profile";

const Header = async () => {
  const user = await getUser();

  return (
    <nav className="flex w-full items-center justify-between">
      <div className="text-3xl font-bold">
        <Link href="/" className="font-geist-mono flex items-center gap-2">
          PulseVote{" "}
          <RocketIcon className="animate-lanuch h-5 w-5 transform text-green-500 transition-all" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Profile user={user} />
        ) : (
          <Button
            variant="outline"
            asChild
            className="animate-fade flex items-center gap-2 rounded-md border border-zinc-400 p-2 px-8 transition-all hover:border-green-500">
            <Link href={"/auth/"}>Login</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;

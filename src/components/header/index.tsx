import { RocketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../theme-toggle";

const Header = () => {
  return (
    <nav className="flex w-full items-center justify-between">
      <div className="text-3xl font-bold">
        <Link href="/" className="font-geist-mono flex items-center gap-2">
          PulseVote{" "}
          <RocketIcon className="animate-lanuch h-5 w-5 transform text-green-500 transition-all" />
        </Link>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;

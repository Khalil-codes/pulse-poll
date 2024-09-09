"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";
import { LockIcon, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/auth/actions";
import { useTransition } from "react";

export default function Profile({ user }: { user: User | null }) {
  if (!user) return null;

  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild id="close-popover">
          <Image
            src={user?.user_metadata?.avatar_url}
            width={40}
            height={40}
            alt={user?.user_metadata?.user_name}
            className="animate-fade cursor-pointer rounded-full ring ring-green-500 transition-all hover:scale-110"
          />
        </PopoverTrigger>
        <PopoverContent className="flex w-72 flex-col divide-y" align="end">
          <Button
            className="flex w-full items-center justify-between rounded-none"
            variant="ghost"
            asChild
            onClick={() => {
              document.getElementById("close-popover")?.click();
            }}>
            <Link href={"/profile?id=" + user?.id}>
              Profile <Settings size={16} />
            </Link>
          </Button>
          <Button
            className="flex w-full items-center justify-between rounded-none"
            variant="ghost"
            onClick={() => {
              document.getElementById("close-popover")?.click();
            }}
            asChild>
            <Link href="/create">
              Create <Plus size={16} />
            </Link>
          </Button>
          <Button
            onClick={handleLogout}
            disabled={isPending}
            className="flex w-full items-center justify-between rounded-none"
            variant="ghost">
            Logout{" "}
            <LockIcon size={16} className={cn({ "animate-spin": isPending })} />
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}

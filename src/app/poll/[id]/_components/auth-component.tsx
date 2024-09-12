"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthComponent() {
  const pathname = usePathname();
  return (
    <div className="flex h-72 items-center justify-center border border-dashed border-zinc-500 text-gray-800 dark:text-gray-200">
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-bold">Login to Vote</h1>
        <Button className="mx-auto" asChild>
          <Link href={`/auth?screen=login&next=${pathname}`}>Login</Link>
        </Button>
      </div>
    </div>
  );
}

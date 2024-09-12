"use client";
import { createClient } from "@/lib/supabase/client";
import { CircleUser } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Presence({ id }: { id: string }) {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase.channel(id);
    channel
      .on("presence", { event: "sync" }, () => {
        let users: string[] = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          const user_id = channel.presenceState()[id][0]?.user_id;
          if (user_id) {
            users.push(user_id);
          }
        }
        const length = new Set(users).size;
        setOnlineUsers(length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const { data } = await supabase.auth.getUser();
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: data?.user?.id,
          });
        }
      });
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <span className="h-3 w-3 animate-pulse rounded-full bg-green-500"></span>
      <p className="text-md flex items-center gap-2">
        <span className="text-xl">{onlineUsers.toString()}</span>
        <CircleUser size={16} /> live on this vote channel
      </p>
    </div>
  );
}

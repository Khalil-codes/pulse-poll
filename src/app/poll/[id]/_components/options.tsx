"use client";

import React, { useEffect, useMemo, useState } from "react";
import Option, { OptionType } from "./option";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  expired: boolean;
  options: OptionType[];
  voteCasted: { id: string; option_id: string } | null;
};

const PollOptions = ({
  options: initalOptions,
  id,
  voteCasted: voteCastedFor,
  expired,
}: Props) => {
  const [options, setOptions] = useState(initalOptions);
  const [voteCasted, setVoteCasted] = useState(voteCastedFor);
  const supabase = createClient();
  const totalVotes = useMemo(
    () => options.reduce((acc, option) => acc + option.votes[0].count, 0),
    [options]
  );

  useEffect(() => {
    const channel = supabase
      .channel(`poll-${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "votes",
          filter: `poll_id=eq.${id}`,
        },
        async (payload) => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          setOptions((prev) => {
            return prev.map((option) => {
              if (option.id === payload.new.option_id) {
                return {
                  ...option,
                  votes: option.votes.map((vote) => ({
                    ...vote,
                    count: vote.count + 1,
                  })),
                };
              }
              return option;
            });
          });
          if (payload.new.user_id === user?.id) {
            setVoteCasted({
              id: payload.new.id,
              option_id: payload.new.option_id,
            });
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [id, supabase]);

  return (
    <div
      className={cn(
        "grid min-h-60 auto-rows-max grid-cols-1 gap-10 md:grid-cols-2",
        {
          "gap-6": !!voteCasted || expired,
        }
      )}>
      {options.map((option) => (
        <div key={option.id}>
          <Option
            option={option}
            total={totalVotes}
            voteCastedFor={voteCasted}
            expired={!!voteCasted || expired}
          />
        </div>
      ))}
    </div>
  );
};

export default PollOptions;

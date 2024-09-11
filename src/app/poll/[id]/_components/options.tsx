"use client";

import React, { useEffect, useMemo, useState } from "react";
import Option, { OptionType } from "./option";
import { createClient } from "@/lib/supabase/client";

type Props = {
  id: string;
  options: OptionType[];
  voteCasted: { id: string; option_id: string } | null;
};

const PollOptions = ({ options: initalOptions, id, voteCasted }: Props) => {
  const [options, setOptions] = useState(initalOptions);
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
        (payload) => {
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
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [id, supabase]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {options.map((option) => (
        <div key={option.id} className="w-full">
          <Option
            option={option}
            total={totalVotes}
            voteCastedFor={voteCasted}
          />
        </div>
      ))}
    </div>
  );
};

export default PollOptions;

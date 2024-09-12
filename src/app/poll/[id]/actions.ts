"use server";

import { createClient } from "@/lib/supabase/server";
import { OptionType } from "./_components/option";
import { revalidatePath } from "next/cache";

export const castVote = async (option: OptionType) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("votes")
    .insert({
      poll_id: option.poll_id,
      user_id: user.id,
      option_id: option.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/poll/${option.poll_id}`);
};

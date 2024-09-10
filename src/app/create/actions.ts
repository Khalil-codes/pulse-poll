"use server";

import { createClient } from "@/lib/supabase/server";
import { FormSchema } from "./form";
import { redirect } from "next/navigation";

export const createPoll = async (data: FormSchema) => {
  const supabase = createClient();
  const { options, end_date, title, description } = data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data: poll, error } = await supabase
    .from("poll")
    .insert({
      ends_at: end_date.toISOString(),
      title,
      description,
      created_by: user?.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { id: poll_id } = poll;

  const { error: options_error } = await supabase
    .from("poll_options")
    .insert(options.map((option) => ({ option, poll_id })))
    .select();

  if (options_error) {
    throw new Error(options_error.message);
  }

  redirect(`/poll/${poll_id}`);
};

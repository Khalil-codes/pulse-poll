"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createClientBrowser } from "@/lib/supabase/client";

export const getPollIds = async () => {
  const supabase = createClientBrowser();

  const { data, error } = await supabase
    .from("poll")
    .select("id")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return [];
  }

  return data;
};

export const getPollById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("poll")
    .select(
      "*, options:poll_options(option, id, count:votes(id.count())), total_votes:votes(id.count()), user:users(id, name, avatar_url)"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  console.log(JSON.stringify(data, null, 2));

  return { ...data };
};

export const getPolls = async () => {
  const supabase = createClient();

  const { data: polls, error } = await supabase
    .from("poll")
    .select(
      "*, total_votes:votes(id.count()), user:users(id, name, avatar_url)"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return polls;
};

export const getPollsByUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("poll")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

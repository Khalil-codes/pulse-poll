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

export const getPollMetadata = async (id: string) => {
  const supabase = createClientBrowser();

  const { data, error } = await supabase
    .from("poll")
    .select("title, description, user:users(name, avatar_url)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};

export const getPollById = async (id: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("poll")
    .select(
      "*, options:poll_options(option, id, poll_id, votes:votes(id.count())), total_votes:votes(id.count()), user:users(id, name, avatar_url)"
    )
    .eq("id", id)
    .single();

  const { data: voteCasted } = await supabase
    .from("votes")
    .select("id, option_id")
    .eq("poll_id", id)
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { ...data, voteCasted };
};

export const getLatestVotesByPollId = async (id: string, limit = 5) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("votes")
    .select(
      "id, user:users(id, name), created_at, option:poll_options(text:option)"
    )
    .eq("poll_id", id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data;
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

import { Database } from "./schema";
import { User as UserType } from "@supabase/auth-js";

export type Poll = Database["public"]["Tables"]["poll"]["Row"];

export type Vote = Database["public"]["Tables"]["votes"]["Row"];

export type PollOptions = Database["public"]["Tables"]["poll_options"]["Row"];

export type User = Database["public"]["Tables"]["users"]["Row"];

export type PollWithUser = Poll & {
  total_votes: { count: number }[];
  user: Pick<User, "avatar_url" | "id" | "name"> | null;
};

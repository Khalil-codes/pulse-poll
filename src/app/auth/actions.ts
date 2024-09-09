"use server";

import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/lib/utils";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const oauthLogin = async (provider: Provider) => {
  if (!provider) {
    redirect("/auth/?message=Provider not found");
  }
  const supabase = createClient();
  const redirectURL = getURL("/auth/callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: redirectURL },
  });

  if (error) {
    redirect("/auth/?message=Error signing in the user");
  }
  redirect(data.url);
};

export const logout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/");
};

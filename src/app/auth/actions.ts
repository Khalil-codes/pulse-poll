"use server";

import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/lib/utils";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginSchema } from "./_components/login";
import { SignupSchema } from "./_components/signup";

export const signInWithEmail = async (
  data: LoginSchema,
  params?: { next?: string }
) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error("Could not login. Please try again later.");
  }

  revalidatePath("/", "layout");
  const { next } = params || {};
  redirect(next ? next : "/");
};

export const signUpWithEmail = async (
  data: SignupSchema,
  params?: { next?: string }
) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.name
        )}&background=random&rounded=true`,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  const { next } = params || {};
  redirect(next ? next : "/");
};

export const oauthLogin = async (provider: Provider) => {
  if (!provider) {
    redirect("/auth/");
  }
  const supabase = createClient();
  const redirectURL = getURL("/auth/callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: redirectURL },
  });

  if (error) {
    redirect("/auth/");
  }
  redirect(data.url);
};

export const logout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/");
};

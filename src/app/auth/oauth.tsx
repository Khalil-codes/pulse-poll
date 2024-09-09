"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import React from "react";
import { oauthLogin } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

const oAuthProviders: OAuthProvider[] = [
  { name: "github", displayName: "GitHub", icon: <Github size={20} /> },
];

const OAuth = () => {
  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          onClick={async () => await oauthLogin(provider.name)}
          className="flex w-full flex-1 items-center gap-2">
          {provider.icon} Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
};

export default OAuth;

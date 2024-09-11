import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Login from "./_components/login";
import Signup from "./_components/signup";
import OAuth from "./oauth";

export function generateMetadata({ searchParams }: Props): Metadata {
  const { screen = "login" } = searchParams;
  return {
    title: `${screen === "login" ? "Login" : "Signup"} | PulsePoll`,
  };
}

type Props = {
  searchParams: { screen: "login" | "signup" };
};

const AuthPage = ({ searchParams }: Props) => {
  const { screen = "login" } = searchParams;
  return (
    <section className="mx-auto flex w-fit flex-1 flex-col items-center justify-center gap-3">
      <Tabs defaultValue={screen} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" asChild>
            <Link
              href={"/auth?screen=login"}
              prefetch={false}
              shallow
              scroll={false}>
              Login
            </Link>
          </TabsTrigger>
          <TabsTrigger value="signup" asChild>
            <Link
              href={"/auth?screen=signup"}
              prefetch={false}
              shallow
              scroll={false}>
              Signup
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-md text-gray-600 dark:text-gray-400">or</span>
        <OAuth />
      </div>
    </section>
  );
};

export default AuthPage;

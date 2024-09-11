"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUpWithEmail } from "../actions";

export const signupSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  password: z.string().trim().min(6),
});

export type SignupSchema = z.infer<typeof signupSchema>;

const DEFAULT_VALUES: SignupSchema = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const params = useParams<{ next?: string }>();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, reset } = form;

  const onSubmit = async (data: SignupSchema) => {
    setIsSubmitting(true);
    toast.promise(async () => signUpWithEmail(data, params), {
      loading: "Signing up",
      success: () => {
        reset(DEFAULT_VALUES);
        return "Signup successful";
      },
      error: "Something went wrong. Please try again later.",
      finally: () => setIsSubmitting(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Please register with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name</FormLabel>
                  <FormControl>
                    <Input placeholder="Arya Stark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="arya@stark.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="* * * * * * * *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Signup
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Signup;

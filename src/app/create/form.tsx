"use client";

import React, { useState } from "react";
import { z } from "zod";
import { startOfDay } from "date-fns/startOfDay";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createPoll } from "./actions";
import { toast } from "sonner";

const schema = z.object({
  options: z
    .array(z.string())
    .min(2)
    .max(6)
    .refine((items) => new Set(items).size === items.length, {
      message: "Must be a unique option",
    }),
  title: z
    .string()
    .trim()
    .min(5, { message: "Title should have atleast 5 characters" }),
  description: z.string().optional(),
  end_date: z
    .date()
    .min(startOfDay(new Date()), { message: "End date should be after today" }),
});

export type FormSchema = z.infer<typeof schema>;

const PollCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      options: [],
      end_date: undefined,
    },
  });

  const { handleSubmit, setError, clearErrors, control } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setIsSubmitting(true);
    toast.promise(async () => await createPoll(data), {
      loading: "Creating poll...",
      success: () => {
        form.reset();
        clearErrors();
        return "Poll created successfully";
      },
      error: "Something went wrong. Please try again",
      finally: () => setIsSubmitting(false),
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold">Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold">
                Description (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  rows={4}
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>Describe your poll</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold">Options</FormLabel>
              <div className="flex flex-col gap-4">
                {field.value?.map((item) => {
                  const option = { id: item, label: item };
                  return (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="options"
                      render={({ field }) => (
                        <FormItem
                          key={option.id}
                          className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              id={"option" + option.id}
                              {...field}
                              value={option.label}
                              checked={
                                Array.isArray(field.value) &&
                                field.value.includes(option.label)
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange(
                                    Array.isArray(field.value)
                                      ? [...field.value, option.label]
                                      : [option.label]
                                  );
                                } else {
                                  field.onChange(
                                    Array.isArray(field.value)
                                      ? field.value.filter(
                                          (value) => value !== option.label
                                        )
                                      : []
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <Label
                            htmlFor={"option" + option.id}
                            className="cursor-pointer text-sm font-medium">
                            {option.label}
                          </Label>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
              {field.value.length < 6 && (
                <Input
                  type="text"
                  placeholder="Press enter to add more option"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      clearErrors("options");
                      if (!("value" in e.target)) return;
                      const value = e.target.value as string;
                      if (!value) return;
                      if (field.value?.includes(value)) {
                        setError("options", {
                          message: "Must be a unique option",
                        });
                        return;
                      }

                      field.onChange([...field.value, value]);
                      e.target.value = "";
                    }
                  }}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-md font-semibold">End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < startOfDay(new Date()) ||
                      differenceInDays(date, new Date()) > 6
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
};
export default PollCreationForm;

"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { createQuestion } from "@/lib/questionController";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  category: z.string({
    required_error: "Please select category.",
  }),
  question: z.string({
    required_error: "Please add question.",
  }),
});

export default function AddQuestionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      question: "",
    },
  });
  const { data: session, status } = useSession();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    // const questionResponse = createQuestion(data);
    // console.log(session);
    if (!session) {
      redirect("/account/login");
    } else {
      // add question
      const userQuestion = { ...data, token: session.user.token };
      const questionResponse = await createQuestion(userQuestion);
      if (questionResponse?.status === 200) {
        toast.success("Question added successfully.");
        form.reset();
      } else {
        toast.error(questionResponse?.data.message);
      }
      // clear all fields
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col  items-center justify-between gap-6 mt-4"
        onSubmit={form.handleSubmit(onSubmit)}
        // onSubmit={handleFormSubmit}
      >
        <Toaster position="bottom-right" reverseOrder={false} />

        <h2 className="text-2xl font-semibold leading-none tracking-tight text-center">
          Add Question
        </h2>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your question."
                  className="h-36 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mx-auto w-40">Add Question</Button>
      </form>
    </Form>
  );
}

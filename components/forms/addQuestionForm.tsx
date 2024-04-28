"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  category: z.string({
    required_error: "Please select category.",
  }),
  question: z.string({
    required_error: "Please add question.",
  }),
});

export default function AddQuestionForm() {
  // alert state when similar question is found
  const [similarQLink, setSimilarQLink] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      question: "",
    },
  });
  const router = useRouter();
  const { data: session, status } = useSession();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    // const questionResponse = createQuestion(data);
    console.log(session);
    if (!session) {
      router.push("/account/login");
    } else {
      // add question
      const userQuestion = { ...data, token: session.user.token };
      const questionResponse = await createQuestion(userQuestion);
      if (questionResponse?.status === 200) {
        toast.success("Question added successfully.");
        form.reset();
      } else if (questionResponse?.status === 409) {
        toast.error("Question asked before.");
        setSimilarQLink(questionResponse.data.similarQuestions[0].id);
        console.log(questionResponse.data.similarQuestions);
      } else if (questionResponse?.status === 403) {
        toast.error("Not Autherized.");
      } else {
        toast.error("Something went wrong.");
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
        {similarQLink && (
          <Alert variant="destructive">
            <AlertTitle>Similar Question</AlertTitle>
            <AlertDescription>
              Question has been asked before.{" "}
              <Link
                className="underline text-blue-500"
                href={"/question/" + similarQLink}
              >
                link
              </Link>
            </AlertDescription>
          </Alert>
        )}
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
                  <SelectItem value="Matematik">Matematik</SelectItem>
                  <SelectItem value="Biyoloji">Biyoloji</SelectItem>
                  <SelectItem value="Fizik">Fizik</SelectItem>
                  <SelectItem value="Geometri">Geometri</SelectItem>
                  <SelectItem value="Tarih">Tarih</SelectItem>
                  <SelectItem value="Din">Din Kültürü</SelectItem>
                  <SelectItem value="Turkce">Türkçe</SelectItem>
                  <SelectItem value="Felsefe">Felsefe</SelectItem>
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

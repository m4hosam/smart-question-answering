"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { createAnswer } from "@/lib/answerController";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

const FormSchema = z.object({
  answer: z.string({
    required_error: "Answer is required",
  }),
});

export default function AddAnswerForm({ questionId }: { questionId: string }) {
  // state to hold loading status
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      answer: "",
    },
  });
  const { data: session } = useSession();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const teacherAnswer = { ...data, question_id: questionId };
    const userToken = session?.user?.token || "";
    // console.log(teacherAnswer);
    // console.log(session?.user?.token);
    // create answer
    setLoading(true);
    const response = await createAnswer(teacherAnswer, userToken);
    setLoading(false);
    if (response?.status === 200) {
      toast.success("Answer added successfully.");
      form.reset();
      router.refresh();
    } else {
      toast.error(response?.data.message);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center space-x-2"
      >
        <Toaster position="bottom-center" reverseOrder={false} />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className=" grid flex-1 gap-2">
                <Textarea placeholder="Type your answer here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button type="submit" className="px-3" disabled>
            Loading...
          </Button>
        ) : (
          <Button type="submit" className="px-3">
            Submit
          </Button>
        )}
        {/* <Button type="submit" className="px-3">
          Submit
        </Button> */}
      </form>
    </Form>
  );
}

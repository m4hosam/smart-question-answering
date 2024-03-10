import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function AddQuestionForm() {
  const [question, setQuestion] = useState<string>();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question === "") {
      toast.error("Please add Question.");
    } else {
      console.log(question);
    }
  };
  return (
    <form
      className="flex flex-col items-center justify-between gap-8 mt-4"
      onSubmit={handleFormSubmit}
    >
      <Toaster position="bottom-right" reverseOrder={false} />

      <h2 className="text-2xl font-semibold leading-none tracking-tight text-center">
        Add Question
      </h2>
      <Textarea
        placeholder="Enter your question."
        onChange={(e) => setQuestion(e.target.value)}
        className="h-64"
        required
      />

      <Button className="mx-auto w-40">Add Question</Button>
    </form>
  );
}

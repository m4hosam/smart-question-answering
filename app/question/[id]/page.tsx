import React from "react";
import QuestionCard from "@/components/questionCard";
import { getQuestionById } from "@/lib/questionController";
import { Question } from "@/types/common.types";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SingleQuestion({
  params: { id },
}: {
  params: { id: string };
}) {
  const questionResponse = await getQuestionById(id);
  if (questionResponse?.status !== 200) {
    redirect("/404");
  }
  const question = questionResponse?.data;
  return (
    <div>
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">
        Question
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-9"> */}
      <div className="flex flex-col items-center w-[70%] mx-auto gap-9 mb-14">
        {/* if question was not found */}
        <QuestionCard
          key={question.id}
          question={question.question}
          answer={question.Answer}
          category={question.category}
          image={question.questionImage}
        />
      </div>
    </div>
  );
}

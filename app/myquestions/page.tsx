import React from "react";
import QuestionCard from "@/components/questionCard";
import { getMyQuestions } from "@/lib/questionController";
import { Question } from "@/types/common.types";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function MyQuestions() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/account/login");
  }
  const questions = await getMyQuestions(session?.user.token);
  return (
    <div>
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">
        My Questions
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-9"> */}
      <div className="flex flex-col items-center w-[70%] mx-auto gap-9 mb-14">
        {questions?.data.map((question: Question) => (
          <QuestionCard
            key={question.id}
            question={question.question}
            answer={question.status}
            category={question.category}
          />
        ))}
      </div>
    </div>
  );
}

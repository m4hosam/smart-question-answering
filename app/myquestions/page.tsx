import React from "react";
import QuestionCard from "@/components/questionCard";
import { getQuestions } from "@/lib/questionController";

type Question = {
  id: string;
  question: string;
  category: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export default async function MyQuestions() {
  const questions = await getQuestions();
  console.log(questions?.data[0]);
  return (
    <div>
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">
        My Questions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-9">
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

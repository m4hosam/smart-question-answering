import React from "react";
import { getQuestions } from "@/lib/questionController";
export default async function MyQuestions() {
  const questions = await getQuestions();
  console.log(questions?.data[0]);
  return <div>Hi</div>;
}

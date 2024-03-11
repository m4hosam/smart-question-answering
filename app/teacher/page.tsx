import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileInput, Label } from "flowbite-react";
import QuestionCardTeacher from "@/components/questionCardTeacher";
import { getTeacherQuestions } from "@/lib/questionController";
import { Question } from "@/types/common.types";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Teacher() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/account/login");
  }
  const questions = await getTeacherQuestions(session?.user.token);
  return (
    <main className="flex items-center justify-center flex-col w-full md:w-[70%] mr-auto ml-auto">
      <section className="flex flex-col items-center justify-center px-5 gap-9">
        <h2 className="m-0 text-xl font-semibold my-9">Questions</h2>
        {questions?.data.map((question: Question) => (
          <QuestionCardTeacher
            key={question.id}
            id={question.id}
            question={question.question}
            category={question.category}
          />
        ))}
      </section>
    </main>
  );
}

import QuestionCardTeacher from "@/components/questionCardTeacher";
import { getTeacherQuestions } from "@/lib/questionController";
import { Question } from "@/types/common.types";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import FilterQuestionsForm from "@/components/forms/filterQuestionsForm";

export default async function Teacher() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/account/login");
  }

  const filterCategory = "Tarih";
  const questions = await getTeacherQuestions(session?.user.token);

  // Filter questions based on the specified category
  const filteredQuestions = questions?.data.filter(
    (question: Question) => question.category === filterCategory
  );
  return (
    <main className="flex items-center justify-center flex-col w-full md:w-[70%] mr-auto ml-auto">
      <section className="flex flex-col items-center justify-center px-5 gap-9">
        <h2 className="m-0 text-xl font-semibold my-9">Questions</h2>
        <FilterQuestionsForm questions={questions?.data} />
        {/* {filteredQuestions.map((question: Question) => (
          <QuestionCardTeacher
            key={question.id}
            question_id={question.id}
            question={question.question}
            category={question.category}
          />
        ))} */}
      </section>
    </main>
  );
}

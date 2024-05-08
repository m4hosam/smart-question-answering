import QuestionCard from "@/components/questionCard";
import AddQuestion from "@/components/addQuestion";
import { Question } from "@/types/common.types";
import { getAllQuestions } from "@/lib/questionController";

export default async function Home() {
  const questionsResponse = await getAllQuestions();

  let questions: Question[] = [];
  if (questionsResponse?.status === 200) {
    questions = questionsResponse.data;
  }

  return (
    <main className="flex items-center justify-center flex-col w-full md:w-[70%] mr-auto ml-auto">
      <AddQuestion />
      <section className="flex flex-col w-full items-center justify-center gap-9 px-5 mb-9">
        <h2 className="m-0 text-xl font-semibold mt-9">Sorular</h2>
        {/* <QuestionCard
          question="Üç basamakli bir dogal sayinin basamagindaki rakama diger rakamlarin çarpimi eklendiginde elde edi- len toplama 0 sayinin derinligi denir  Örneks 325 sayisinin derinligi 3 + 25 = 13 tür  Uç basamakli abc dogal sayisi Ile üç basamakli cab dogal sayisinin derinlikleri esit olduguna göre  abc dogal sayisi asagidakilerden olabilir? A) 123 B) 234 C) 309 D) 415 E) 732 yüzler hangisi"
          answer="B"
          category="Matematik"
        /> */}
        {questions.map((question: Question) => (
          <QuestionCard
            key={question.id}
            question={question.question}
            answer={question.Answer}
            category={question.category}
            image={question.questionImage}
          />
        ))}
      </section>
    </main>
  );
}

export const revalidate = 3600;

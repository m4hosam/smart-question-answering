import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileInput, Label } from "flowbite-react";
import QuestionCard from "@/components/questionCard";
import AddQuestion from "@/components/addQuestion";
export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col w-full md:w-[70%] mr-auto ml-auto">
      <AddQuestion />
      <Separator className="mt-5 ml-auto mr-auto w-[85%]" />
      <section className="flex flex-col items-center justify-center px-5 mb-9">
        <h2 className="m-0 text-xl font-semibold my-9">Questions</h2>
        <QuestionCard
          question="Üç basamakli bir dogal sayinin basamagindaki rakama diger rakamlarin çarpimi eklendiginde elde edi- len toplama 0 sayinin derinligi denir  Örneks 325 sayisinin derinligi 3 + 25 = 13 tür  Uç basamakli abc dogal sayisi Ile üç basamakli cab dogal sayisinin derinlikleri esit olduguna göre  abc dogal sayisi asagidakilerden olabilir? A) 123 B) 234 C) 309 D) 415 E) 732 yüzler hangisi"
          answer="B"
          category="Matematik"
        />
      </section>
    </main>
  );
}

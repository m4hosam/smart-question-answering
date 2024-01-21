import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileInput, Label } from "flowbite-react";
import QuestionCardTeacher from "@/components/questionCardTeacher";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col w-full md:w-[70%] mr-auto ml-auto">
      <section className="flex flex-col items-center justify-center px-5 mb-9">
        <h2 className="m-0 text-xl font-semibold my-9">Questions</h2>
        <QuestionCardTeacher
          question="Yaslari birbirinden farkli üç emekli arkadasin ve kilolari asagidaki tabloda verilmistir  Kilo(kg) Ali a Bülent Can C a Bu üç arkadasin en yaslisi Ali ve en genci Candir  Buna gÖre  bu uç arkadasin agirligina göre en hafif - ten en agira dogru siralanisi asagidakilerden hangi - sidir? A) Bülent  Can  Ali B) Bülent  Ali) Can C) Can  Bülentp Ali D) Can  Alip Bülent E) Bülents Can yaslari Yas Alis"
          category="Math"
        />
      </section>
    </main>
  );
}

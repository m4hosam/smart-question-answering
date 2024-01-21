import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileInput, Label } from "flowbite-react";
import QuestionCard from "@/components/questionCard";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col w-full md:w-[70%] mr-auto ml-auto">
      <section className="flex w-full flex-col items-center justify-center m-5 px-9">
        <h1 className="my-9 text-xl font-semibold">Upload A Question</h1>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
        <Button className="mt-9 w-48">Submit</Button>
      </section>
      <Separator className="ml-auto mr-auto w-[85%]" />
      <section className="flex flex-col items-center justify-center m-5 px-9">
        <h2 className="m-0 text-xl font-semibold my-9">Questions</h2>
        <QuestionCard
          question="Orhan Bey Döneminde sinirlarin Anadolu ve Rumelide genislemesinin asagidakilerden hangisi üzerinde etkili oldugu savunulamaz? A) Baskentin degismesi B) Bizans in toprak kaybetmesi  C) Veraset anlayisinin degistirilmesi D) Yaya ve Müsellem ordusunun kurulmasi 9 E) Anadolu Türk birligini saglama çalismalarinin baslama- SI"
          answer="B"
          category="Math"
        />
      </section>
    </main>
  );
}

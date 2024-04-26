import React from "react";
import { Card } from "flowbite-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import sampleQuestionImage from "@/public/sample.jpeg";
import AddAnswerForm from "@/components/forms/addAnswerForm";

interface QuestionCardProps {
  question: string;
  category: string;
  question_id: string;
}

const QuestionCardTeacher: React.FC<QuestionCardProps> = ({
  question,
  category,
  question_id,
}) => {
  // Regex to match the question and the multiple choice answers
  const regex =
    /(.*?)\s+([A-a][\)-\-])\s*(.*?)\s+([B-b][\)-\-])\s*(.*?)\s+([C-c][\)-\-])\s*(.*?)\s+([D-d][\)-\-])\s*(.*?)\s+([E-e][\)-\-])\s*(.*?)$/;
  // Extracting question and answers
  const match = question.match(regex);
  //   console.log(match);
  let choices = [];
  if (match) {
    // Extracting question and answers
    question = match[1];

    // Extracting choices with their letters
    for (let i = 2; i < match.length; i += 2) {
      choices.push({
        label: match[i].replace(")", ""), // Extracting choice letter
        text: match[i + 1],
      });
    }
  }
  return (
    <Card className="w-full mb-5 min-w-[35rem]">
      <p className="text-sm">{category}</p>
      <Separator className="ml-auto mr-auto w-full " />
      <h3 className="text-lg font-semibold">Q: {question}</h3>
      {/* Add the question choices here */}
      <ul>
        {choices.map((choice, index) => (
          <li
            key={index}
            className="bg-gray-100 hover:bg-gray-50 p-3 my-2 rounded-md"
          >
            <span className="text-gray-400">{choice.label}.</span> {choice.text}
          </li>
        ))}
      </ul>
      <section className="flex w-full items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-9 w-48">Add answer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add answer</DialogTitle>
              <DialogDescription>
                Please add the answer and submit the form
              </DialogDescription>
            </DialogHeader>
            {/* answer form */}
            <DialogClose asChild className="w-1/2">
              <AddAnswerForm questionId={question_id} />
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-9 w-48 bg-blue-700 hover:bg-blue-500">
              View Question&apos;s Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Question&apos;s Image</DialogTitle>
            </DialogHeader>
            <Image
              src={sampleQuestionImage}
              alt="Sample Question Image"
              width={500}
              height={500}
            />
          </DialogContent>
        </Dialog> */}
      </section>
    </Card>
  );
};

export default QuestionCardTeacher;

import React from "react";
import { Card } from "flowbite-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import sampleQuestionImage from "@/public/sample.jpeg";

interface QuestionCardProps {
  question: string;
  category: string;
  id: string;
}

const QuestionCardTeacher: React.FC<QuestionCardProps> = ({
  question,
  category,
  id,
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
    <Card className="w-full">
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
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Textarea placeholder="Type your answer here." />
              </div>
              <Button type="submit" className="px-3">
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-9 w-48 bg-blue-700 hover:bg-blue-500">
              View Question's Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Question's Image</DialogTitle>
            </DialogHeader>
            <Image
              src={sampleQuestionImage}
              alt="Sample Question Image"
              width={500}
              height={500}
            />
          </DialogContent>
        </Dialog>
      </section>
    </Card>
  );
};

export default QuestionCardTeacher;

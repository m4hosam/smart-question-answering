"use client";
import React from "react";
import { Card } from "flowbite-react";
import { Separator } from "@/components/ui/separator";
import { Answer } from "@/types/common.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteQuestion } from "@/lib/questionController";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
interface QuestionCardProps {
  question_id: string;
  question: string;
  answer: Answer[];
  category: string;
}

const MyQuestionCard: React.FC<QuestionCardProps> = ({
  question_id,
  question,
  answer,
  category,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
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

  const handleDelete = async () => {
    console.log("Delete button clicked");
    console.log(session?.user?.token);
    console.log(question_id);
    const deletedQuestionResponse = await deleteQuestion(
      question_id,
      session?.user?.token as string
    );
    console.log(deletedQuestionResponse);
    if (deletedQuestionResponse?.status !== 200) {
      // console.log("Question deleted successfully");
      toast.error(deletedQuestionResponse?.data.message);
    } else {
      toast.success("Question deleted successfully");
    }
    router.refresh();
  };

  let answerStatus = answer.length === 0 ? "Pending Answer" : answer[0].answer;

  return (
    <Card className="w-full">
      <div className="flex justify-between w-full items-center">
        <p className="text-sm">{category}</p>
        {/* delete button */}

        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 bg-red-500 rounded text-xs">Delete</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Are You sure</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the question?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between flex-row-reverse w-full gap-3">
              <DialogClose asChild className="w-1/2">
                <Button
                  type="submit"
                  onClick={handleDelete}
                  variant="destructive"
                  size="sm"
                  className="px-3 w-1/2"
                >
                  Yes
                </Button>
              </DialogClose>

              <DialogClose asChild className="w-1/2">
                <Button type="button" variant="secondary">
                  No
                </Button>
              </DialogClose>
            </div>
            <DialogFooter className="sm:justify-start"></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="ml-auto mr-auto w-full " />
      <p className="text-lg font-medium">{question}</p>
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
      <p>
        <span className="text-green-500	font-semibold">Cevap:</span>{" "}
        <span
          className={
            answerStatus === "Pending Answer"
              ? "text-red-500 font-semibold"
              : "text-gray-900 font-semibold"
          }
        >
          {answerStatus}
        </span>
      </p>
    </Card>
  );
};

export default MyQuestionCard;

import React from "react";
import { Card } from "flowbite-react";
import { Separator } from "@/components/ui/separator";
import { Answer } from "@/types/common.types";

interface QuestionCardProps {
  question: string;
  answer: Answer[];
  category: string;
  image: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  category,
  image,
}) => {
  // Regex to match the question and the multiple choice answers
  // const regex =
  //   /(.*?)\s+([A-a][\)-\-])\s*(.*?)\s+([B-b][\)-\-])\s*(.*?)\s+([C-c][\)-\-])\s*(.*?)\s+([D-d][\)-\-])\s*(.*?)\s+([E-e][\)-\-])\s*(.*?)$/;
  // // Extracting question and answers
  // const match = question.match(regex);
  // //   console.log(match);
  // let choices = [];
  // if (match) {
  //   // Extracting question and answers
  //   question = match[1];

  //   // Extracting choices with their letters
  //   for (let i = 2; i < match.length; i += 2) {
  //     choices.push({
  //       label: match[i].replace(")", ""), // Extracting choice letter
  //       text: match[i + 1],
  //     });
  //   }
  // }
  // console.log(image);
  let answerStatus = answer.length === 0 ? "Pending Answer" : answer[0].answer;

  return (
    <Card className="w-full">
      <h3 className="text-sm">{category}</h3>
      <Separator className="ml-auto mr-auto w-full " />
      <div className="w-full flex flex-col items-center lg:flex-row-reverse lg:items-start gap-9">
        <p className="text-sm md:text-base font-medium">{question}</p>
        {/* Add the question choices here */}
        {/* <ul>
        {choices.map((choice, index) => (
          <li
          key={index}
          className="bg-gray-100 hover:bg-gray-50 p-3 my-2 rounded-md"
          >
          <span className="text-gray-400">{choice.label}.</span> {choice.text}
          </li>
        ))}
      </ul> */}
        {/* Displaying the question image */}
        {image && (
          <img src={image} alt="question" className="h-48 object-contain" />
        )}
      </div>
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

export default QuestionCard;

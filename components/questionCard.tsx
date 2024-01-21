import React from "react";
import { Card } from "flowbite-react";
import { Separator } from "@/components/ui/separator";

interface QuestionCardProps {
  question: string;
  answer: string;
  category: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  category,
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
      <p>
        <span className="text-green-500	font-semibold">Answer:</span> {answer}
      </p>
    </Card>
  );
};

export default QuestionCard;

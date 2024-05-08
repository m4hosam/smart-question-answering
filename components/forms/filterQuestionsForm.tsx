"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/common.types";
import QuestionCardTeacher from "@/components/questionCardTeacher";

const lessons = [
  "Matematik",
  "Tarih",
  "Türkçe",
  "Biyoloji",
  "Felsefe",
  "Coğrafya",
  "Fizik",
  "Kimya",
  "Din Kültürü",
  "Geometri",
];

export default function FilterQuestionsForm({ questions }: any) {
  // state to hold the filtered questions
  const [filteredQuestions, setFilteredQuestions] = React.useState(questions);
  // console.log(questions);

  const handleSelect = (lesson: string) => {
    console.log(lesson);
    // Filter questions based on the specified category
    const newQuestions = questions.filter(
      (question: Question) => question.category === lesson
    );
    console.log(newQuestions);
    setFilteredQuestions(newQuestions);
    // setSelectedLesson(lesson);
    // setFruit(fruit);
  };

  return (
    <>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a lesson" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Lesson</SelectLabel>
            <SelectItem value="Matematik">Matematik</SelectItem>
            <SelectItem value="Tarih">Tarih</SelectItem>
            <SelectItem value="Türkçe">Türkçe</SelectItem>
            <SelectItem value="Biyoloji">Biyoloji</SelectItem>
            <SelectItem value="Felsefe">Felsefe</SelectItem>
            <SelectItem value="Coğrafya">Coğrafya</SelectItem>
            <SelectItem value="Fizik">Fizik</SelectItem>
            <SelectItem value="Kimya">Kimya</SelectItem>
            <SelectItem value="Din Kültürü">Din Kültürü</SelectItem>
            <SelectItem value="Geometri">Geometri</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        {filteredQuestions.length === 0 && <h2>No questions found.</h2>}
        {filteredQuestions.map((question: Question) => (
          <QuestionCardTeacher
            key={question.id}
            question_id={question.id}
            question={question.question}
            category={question.category}
            image={question.questionImage}
          />
        ))}
      </div>
    </>
  );
}

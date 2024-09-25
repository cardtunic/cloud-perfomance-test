import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnswerStatus, type Question } from "@/lib/definitions";
import { useQuestionsStore } from "@/store";
import clsx from "clsx";
import React from "react";

type QuestionProps = {
  questionNumber: number;
  question: Question;
};

export default function Question({ questionNumber, question }: QuestionProps) {
  const setSelectedAnswer = useQuestionsStore(
    (state) => state.setSelectedAnswer
  );

  const [checked, setChecked] = React.useState<string>();

  function handleChange(selectedOption: string) {
    setChecked(selectedOption);

    const answerIndex = Number(selectedOption.replace("option-", ""));
    const answer = question.answers[answerIndex];
    const correctAnswer = question.answers[question.correctAnswer];
    const status =
      answer === correctAnswer ? AnswerStatus.CORRECT : AnswerStatus.WRONG;

    setSelectedAnswer({
      question: question.question,
      answer,
      correct_answer: correctAnswer,
      status,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-lg sm:text-xl leading-tight sm:leading-snug flex gap-3 sm:gap-4 items-center">
        <div className="w-[2em] h-[2em] rounded-lg flex justify-center items-center border-2 border-foreground shrink-0">
          {questionNumber + 1}
        </div>
        {question.question}
      </h2>
      <RadioGroup
        onValueChange={(value) => handleChange(value)}
        className="gap-4"
      >
        {question.answers.map((answer, i) => (
          <QuestionAnswer
            key={`question-answer-${i}`}
            label={answer}
            value={`option-${i}`}
            checked={checked === `option-${i}`}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

function QuestionAnswer({
  label,
  value,
  checked,
}: {
  label: string;
  value: string;
  checked: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 border-border border rounded-md w-full h-full cursor-pointer  ease-in-out duration-100 pl-4 transition-all",
        !checked && "shadow-[0_3px_0_0_theme(colors.border)]",
        checked &&
          "shadow-[0_3px_0_0_theme(colors.accent.DEFAULT/0.4)] bg-accent/10 border border-accent/40 text-accent"
      )}
    >
      <RadioGroupItem value={value} id={value} className="shrink-0" />
      <Label
        className="cursor-pointer w-full p-4 pl-0 font-normal leading-tight"
        htmlFor={value}
      >
        {label}
      </Label>
    </div>
  );
}

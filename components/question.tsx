import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionData } from "@/lib/definitions";
import clsx from "clsx";
import React from "react";

type QuestionProps = {
  number: number;
  question: QuestionData;
  handleChange: (answer: string, question: string) => void;
};

export default function Question({
  number,
  question,
  handleChange,
}: QuestionProps) {
  const [checked, setChecked] = React.useState<string>();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-xl flex gap-4 items-center">
        <div className="w-[2em] h-[2em] rounded-lg flex justify-center items-center border-2 border-foreground shrink-0">
          {number}
        </div>
        {question.question}
      </h2>
      <RadioGroup
        onValueChange={(value) => {
          handleChange(value, question.id);
          setChecked(value);
        }}
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
          "shadow-[0_3px_0_0_theme(colors.primary.DEFAULT/0.4)] bg-primary/10 border border-primary/40 text-primary"
      )}
    >
      <RadioGroupItem value={value} id={value} className="shrink-0" />
      <Label
        className="cursor-pointer w-full p-4 pl-0 font-normal"
        htmlFor={value}
      >
        {label}
      </Label>
    </div>
  );
}

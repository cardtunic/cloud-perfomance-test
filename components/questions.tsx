"use client";

import Question from "@/components/question";
import { Button } from "@/components/ui/button";
import useServerAction from "@/hooks/useServerAction";
import { setResults } from "@/lib/actions";
import { QuestionData } from "@/lib/definitions";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Questions({
  questions,
}: {
  questions: QuestionData[];
}) {
  const [answers, setAnswers] = React.useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

  const [isAnswered, setIsAnswered] = React.useState<boolean>(false);

  const { push } = useRouter();

  function handleChange(answer: string, question: string) {
    setAnswers((prevAnswers) => {
      const newAnswers = [
        ...prevAnswers.filter((a) => a.question !== question),
        { question, answer },
      ];

      localStorage.setItem("answers", JSON.stringify(newAnswers));

      return newAnswers;
    });
    setIsAnswered(true);
  }

  const { pending, dispatchAction } = useServerAction({
    action: setResults,
  });

  const questionsComponentes = React.useMemo(() => {
    return questions.map((question, i) => (
      <Question
        key={`question-${question.id}`}
        number={i + 1}
        question={question}
        handleChange={handleChange}
      />
    ));
  }, []);

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="flex flex-col w-full h-full gap-12">
      <div className="w-full flex items-center gap-4">
        <div className="w-full h-4 rounded-full bg-primary/50 relative">
          <div
            className={`absolute left-0 top-0 h-4 bg-primary z-10 rounded-full flex items-center`}
            style={{
              width: `${Math.floor(
                (currentQuestion + 1) * (100 / questions.length)
              )}%`,
            }}
          ></div>
        </div>
      </div>
      {questionsComponentes[currentQuestion]}
      <Button
        variant="accent"
        className="w-full"
        onClick={() => {
          if (!isLastQuestion) {
            setCurrentQuestion((prev) => prev + 1);
            setIsAnswered(false);
            return;
          }

          dispatchAction();
        }}
        disabled={!isAnswered}
        isLoading={pending}
      >
        {isLastQuestion ? (
          <>
            Finalizar teste <CheckCircle className="ml-2 h-[1.25em]" />
          </>
        ) : (
          <>
            Próxima questão <ArrowRight className="ml-2 h-[1.25em]" />
          </>
        )}
      </Button>
    </div>
  );
}

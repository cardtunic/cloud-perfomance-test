"use client";

import Question from "@/components/question";
import { Button } from "@/components/ui/button";
import useServerAction from "@/hooks/useServerAction";
import * as actions from "@/lib/actions";
import type { Question as QuestionType } from "@/lib/definitions";
import { useQuestionsStore } from "@/store";
import clsx from "clsx";
import { AlarmClock, ArrowRight, CheckCircle } from "lucide-react";
import React from "react";

const QUESTION_TIMER = 30;

export default function Questions({
  questions,
}: {
  questions: QuestionType[];
}) {
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const selectedAnswer = useQuestionsStore((state) => state.selectedAnswer);
  const answers = useQuestionsStore((state) => state.answers);

  const nextQuestion = useQuestionsStore((state) => state.nextQuestion);

  const { pending, dispatchAction: submit } = useServerAction({
    action: actions.submit,
  });

  const [testStartedAt] = React.useState<Date>(new Date());

  async function handleSubmit() {
    if (!isLastQuestion) {
      nextQuestion();
      clearInterval(timerInterval.current);
      timerInterval.current = undefined;
      setTimer(QUESTION_TIMER);

      return;
    }

    const testDuration =
      new Date().getSeconds() - (testStartedAt.getSeconds() as number);

    const testTimeLeft = QUESTION_TIMER * questions.length - testDuration;

    await submit([...answers, selectedAnswer], testDuration, testTimeLeft);
  }

  const questionsComponentes = React.useMemo(() => {
    return questions.map((question, i) => (
      <Question
        key={`question-${question.id}`}
        questionNumber={i}
        question={question}
      />
    ));
  }, []);

  const isLastQuestion = currentQuestion === questions.length - 1;

  const alreadyChangedQuestion = React.useRef<boolean>(false);
  const timerInterval = React.useRef<NodeJS.Timeout>();
  const [timer, setTimer] = React.useState<number>(QUESTION_TIMER);

  React.useEffect(() => {
    if (!timerInterval.current) {
      timerInterval.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            if (!alreadyChangedQuestion.current) {
              if (questions.length === currentQuestion) {
                nextQuestion();
              } else {
                handleSubmit();
              }

              alreadyChangedQuestion.current = true;
            }

            clearInterval(timerInterval.current);
            timerInterval.current = undefined;

            return QUESTION_TIMER;
          }

          alreadyChangedQuestion.current = false;

          return prev - 1;
        });
      }, 1000);
    }
  }, [currentQuestion]);

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div
        className={clsx("w-full flex items-center gap-5 mb-8", {
          "animate-[shake_1s_infinite]": timer < 5,
        })}
      >
        <div
          className={clsx("w-full h-4 rounded-full relative", {
            "bg-green-500/50": timer > 15,
            "bg-yellow-500/50": timer >= 5 && timer <= 15,
            "bg-red-500/50": timer < 5,
          })}
        >
          <div
            className={clsx(
              `absolute left-0 top-0 h-4 z-10 rounded-full flex items-center`,
              {
                "bg-green-500/50": timer > 15,
                "bg-yellow-500/50": timer >= 5 && timer <= 15,
                "bg-red-500/50": timer < 5,
              }
            )}
            style={{
              width: `${Math.floor((timer / QUESTION_TIMER) * 100)}%`,
            }}
          ></div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <AlarmClock className="h-[1.5em] w-[1.5em]" />
          <p>{timer}s</p>
        </div>
      </div>
      {questionsComponentes[currentQuestion]}
      <Button
        variant="accent"
        className="w-full"
        onClick={handleSubmit}
        disabled={selectedAnswer.answer.length === 0}
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

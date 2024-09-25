"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AnswerStatus, type Answer, type RankEntry } from "@/lib/definitions";
import { formatInteger, formatSeconds } from "@/lib/utils";
import clsx from "clsx";
import { Check, Clock, ExternalLink, X } from "lucide-react";

export default function Results({
  ranking,
  userResults,
}: {
  ranking: RankEntry[];
  userResults: {
    position: number;
    points: number;
    correctAnswers: number;
    testDuration: number;
    answers: Answer[];
  };
}) {
  console.log(userResults);

  return (
    <main className="flex flex-col items-center gap-12 w-full grow">
      <>
        <div className="flex flex-col gap-8 items-center w-full justify-center">
          <div>
            <h1 className="text-2xl font-bold text-center mb-4">
              Sua pontuação
            </h1>
            <div className="px-10 py-2 border-accent/40 border-2 shadow-[0_4px_0_0_theme(colors.accent.DEFAULT/0.4)] rounded-full">
              <p className="text-5xl font-bold text-accent text-center">
                {formatInteger(userResults.points)}
              </p>
            </div>
          </div>

          <p className="text-foreground/70 w-full sm:w-[40%] text-center">
            Você acertou <b>{userResults.correctAnswers}</b> pergunta
            {userResults.correctAnswers === 1 ? "" : "s"} e finalizou o teste em{" "}
            <b>{formatSeconds(userResults.testDuration)} minutos</b>
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="accent" className="w-full">
              Ver seus erros e acertos
              <ExternalLink className="ml-2 h-[1.25em] w-[1.25em]" />
            </Button>
          </DialogTrigger>

          <DialogContent className="flex flex-col gap-4 w-full max-h-[80vh] overflow-auto ">
            <div className="mb-4">
              <h2 className="text-xl font-semibold m-0">Suas respostas</h2>
              <p className="text-foreground/50 m-0">
                Veja seus erros e acertos
              </p>
            </div>

            {userResults.answers.map((answer, i) => (
              <UserAnswer
                key={`user-nswer-${i}`}
                answer={answer}
                questioNumber={i + 1}
              />
            ))}
          </DialogContent>
        </Dialog>

        <div className="grow flex flex-col gap-4 w-full">
          {ranking.map((rank, i) => (
            <RankEntry
              key={`rank-entry-${i}`}
              position={i + 1}
              name={rank.username}
              points={rank.points}
              active={i === userResults.position - 1}
            />
          ))}
        </div>
      </>
    </main>
  );
}

function UserAnswer({
  answer,
  questioNumber,
}: {
  answer: Answer;
  questioNumber: number;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 border border-border rounded-md p-4 ",
        {
          "border-green-500/20 bg-green-500/5": answer.status === "correct",
          "border-red-500/20 bg-red-500/5": answer.status === "wrong",
          "border-gray-500/20 bg-gray-500/5": answer.status === "timeout",
        }
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex justify-center items-center shrink-0",
            {
              "bg-green-500": answer.status === "correct",
              "bg-red-500": answer.status === "wrong",
              "bg-gray-500": answer.status === "timeout",
            }
          )}
        >
          {answer.status === "correct" ? (
            <Check className="w-5 h-5 text-white" />
          ) : answer.status === "wrong" ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Clock className="w-5 h-5 text-white" />
          )}
        </div>

        <p className="font-semibold text-lg leading-tight">
          {questioNumber}. {answer.question}
        </p>
      </div>

      {answer.status !== AnswerStatus.TIMEOUT && (
        <div className="flex flex-col gap-1">
          <p className="text-foreground/50 text-sm">Sua resposta</p>
          <p className="leading-tight font-medium text-foreground">
            {answer.answer}
          </p>
        </div>
      )}

      {answer.status !== AnswerStatus.CORRECT && (
        <div className="flex flex-col gap-1">
          <p className="text-foreground/50 text-sm">Resposta correta</p>
          <p className="leading-tight font-medium text-foreground">
            {answer.correct_answer}
          </p>
        </div>
      )}
    </div>
  );
}

function CorrectUserAnswer({ answer }: { answer: Answer }) {
  return (
    <div className="flex flex-col gap-5 border-2 border-green-500 rounded-md p-4 bg-green-500/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex justify-center items-center shrink-0 bg-green-500">
          <Check className="w-4 h-4 text-white" />
        </div>

        <p className="font-semibold text-lg">{answer.question}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-foreground/50 text-sm">Sua resposta</p>
        <p className="leading-tight font-medium text-foreground">
          {answer.answer}
        </p>
      </div>
    </div>
  );
}

function WrongUserAnswer({ answer }: { answer: Answer }) {
  return (
    <div className="flex flex-col gap-2 border-border border rounded-md p-4">
      <p className="text-lg font-semibold text-foreground">{answer.question}</p>

      <p className="text-lg font-semibold text-foreground">{answer.answer}</p>

      <p className="text-lg font-semibold text-foreground">
        {answer.correct_answer}
      </p>
    </div>
  );
}

function TimeoutUserAnswer({ answer }: { answer: Answer }) {
  return (
    <div className="flex flex-col gap-2 border-border border rounded-md p-4">
      <p className="text-lg font-semibold text-foreground">{answer.question}</p>

      <p className="text-lg font-semibold text-foreground">{answer.answer}</p>

      <p className="text-lg font-semibold text-foreground">
        {answer.correct_answer}
      </p>
    </div>
  );
}

function RankEntry({
  position,
  name,
  points,
  active,
}: {
  position: number;
  name: string;
  points: number;
  active?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 border-border border rounded-md p-4",
        {
          "bg-accent/10 border-accent": active,
        }
      )}
    >
      <div className="flex items-center gap-3 grow min-w-0 ">
        <div
          className={clsx(
            "w-9 h-9 rounded-sm flex justify-center items-center font-semibold text-lg shrink-0",
            {
              "bg-foreground/10 text-foreground": position > 3,
              "bg-gradient-to-b from-[#FFE500] to-[#D98F00] text-[#554016]":
                position === 1,
              "bg-gradient-to-b from-[#ABB1CE] to-[#5D648A] text-[#212746]":
                position === 2,
              "bg-gradient-to-b from-[#E29157] to-[#954E1B] text-[#1C1613]":
                position === 3,
            }
          )}
        >
          {position}
        </div>

        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {active ? "Você" : name}
        </p>
      </div>

      <p className="text-lg font-semibold text-nowrap">
        {formatInteger(points)}
        <span className="font-normal ml-1 text-sm text-foreground/50">pts</span>
      </p>
    </div>
  );
}

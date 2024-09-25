"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { RankEntry } from "@/lib/definitions";
import { formatInteger, formatSeconds } from "@/lib/utils";
import clsx from "clsx";
import { ExternalLink } from "lucide-react";

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
            {userResults.correctAnswers > 1 && "s"} e finalizou o teste em{" "}
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

          <DialogContent>oi</DialogContent>
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

"use client";

import ResultsChart from "@/components/results-chart";
import { Button } from "@/components/ui/button";
import useServerAction from "@/hooks/useServerAction";
import { clearResults } from "@/lib/actions";
import { Percentage } from "@/lib/definitions";
import ibcData from "@/lib/ibc-data";
import { Loader2, Share2, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useTransition } from "react";

import html2canvas from "html2canvas";

export default function Page() {
  const [percentages, setPercentages] = React.useState<Percentage[]>([]);

  React.useEffect(() => {
    const answers: {
      question: string;
      answer: string;
    }[] = JSON.parse(localStorage.getItem("answers") || "[]");
    let percentage: Percentage[] = [
      {
        label: "Gato",
        value: 0,
        id: "gato",
      },
      {
        label: "Águia",
        value: 0,
        id: "aguia",
      },
      {
        label: "Tubarão",
        value: 0,
        id: "tubarao",
      },
      {
        label: "Lobo",
        value: 0,
        id: "lobo",
      },
    ];

    answers.forEach((answer) => {
      const answerNumber = Number(answer.answer.split("-")[1]);

      switch (answerNumber) {
        case 0:
          percentage.find((p) => p.id === "aguia")!.value += 1;
          break;
        case 1:
          percentage.find((p) => p.id === "tubarao")!.value += 1;
          break;
        case 2:
          percentage.find((p) => p.id === "gato")!.value += 1;
          break;
        case 3:
          percentage.find((p) => p.id === "lobo")!.value += 1;
          break;
      }
    });

    setPercentages(percentage.map((p) => ({ ...p, value: p.value * 4 })));
  }, []);

  const result = percentages.sort((a, b) => b.value - a.value)[0];
  const resultText = ibcData.results[result?.id];

  const { pending, dispatchAction } = useServerAction({
    action: clearResults,
  });

  const htmlImageEl = useRef<HTMLDivElement>(null);
  const [isSharing, startTransition] = useTransition();

  return (
    <main className="flex flex-col items-center gap-12 w-full grow">
      {result ? (
        <>
          <div
            className="border hidden m-auto border-border flex-col gap-[100px] items-center justify-center shadow-md rounded-md p-10 w-[1080px] h-[1920px] bg-white py-[50px]"
            id="image-container"
            ref={htmlImageEl}
          >
            <div className="flex flex-col gap-[50px] items-center">
              <div>
                <p className="text-center text-[10vw]">Meu perfil é</p>
              </div>

              <img
                className="md:w-32 md:h-32 w-[50%] rounded-full border-2 border-border shadow-lg"
                width={500}
                height={500}
                alt="botton"
                src={`/${result.id}-botton.webp`}
              ></img>

              <div className="px-[3em] py-[0.5em] relative border-primary/40 border-[5px] bg-white rounded-full">
                <p className="text-[30vw] font-bold text-primary">
                  {result?.value.toFixed(0)}%
                </p>

                <div className="absolute right-0 w-full h-full bg-primary/40 rounded-full -z-10 top-3"></div>
              </div>

              <div>
                <h1 className="text-[20vw] font-bold text-center mb-4">
                  {result?.label}
                </h1>

                <p className="md:text-start text-center text-[10vw] px-10">
                  {resultText.description}
                </p>
              </div>
            </div>

            <img src="/logo-gray.webp" className="w-[40%]" />
          </div>

          <div className="flex w-full flex-col md:flex-row gap-10 md:gap-0">
            <div className="flex flex-col gap-8 items-center w-full justify-center">
              <div>
                <p className="text-center">Seu perfil é</p>
                <h1 className="text-3xl font-bold text-center">
                  {result?.label}
                </h1>
              </div>

              <div className="px-[1.5em] py-[0.5em] border-primary/40 border-2 shadow-[0_4px_0_0_theme(colors.primary.DEFAULT/0.4)] rounded-full">
                <p className="text-4xl font-bold text-primary">
                  {result?.value.toFixed(0)}%
                </p>
              </div>

              <p className="text-center text-foreground/60 leading-tight">
                das suas respostas se <br /> alinham com esse perfil.
              </p>
            </div>

            <ResultsChart data={percentages} />
          </div>

          <div className="flex md:flex-row flex-col-reverse w-full gap-6 items-center">
            <Image
              className="md:w-32 md:h-32 w-[50%] rounded-full border-2 border-border shadow-lg"
              width={500}
              height={500}
              alt="botton"
              src={`/${result.id}-botton.webp`}
            ></Image>

            <p className="md:text-start text-center">
              {resultText.description}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              startTransition(async () => {
                const canvas = await html2canvas(
                  htmlImageEl.current as HTMLElement,
                  {
                    onclone: (document) => {
                      //@ts-ignore
                      document.querySelector("#image-container").style.display =
                        "flex";
                    },
                  }
                );

                canvas.toBlob(async (blob) => {
                  const filesArray = [
                    new File([blob as Blob], `image.png`, {
                      type: "image/png",
                      lastModified: new Date().getTime(),
                    }),
                  ];
                  const shareData = {
                    title: `image`,
                    files: filesArray,
                  };

                  if (navigator.canShare && navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                  }
                });
              });
            }}
            isLoading={isSharing}
          >
            Compartilhar seu resultado{" "}
            <Share2 className="ml-2 h-[1.25em] w-[1.25em]" />
          </Button>

          <div className="flex flex-col gap-4 w-full">
            <p className="text-2xl font-semibold text-center">
              Suas características
            </p>

            <div className="grid grid-rows-[repeat(4,1fr)] md:grid-cols-2 md:grid-rows-[repeat(2,1fr)] gap-4">
              {Object.entries(resultText)
                .filter(([key]) => key !== "description")
                .map(
                  ([key, value], i) =>
                    Array.isArray(value) && (
                      <CharacteristicItem
                        key={key}
                        number={(i + 1).toString()}
                        title={key}
                        text={value.join(", ")}
                      />
                    )
                )}
            </div>
          </div>

          <Link
            href="https://jobs.quickin.io/sindvagas"
            target="_blank"
            className="w-full flex justify-center items-center h-32 bg-[#004792] rounded-md"
          >
            <Image
              src="/banner-ad.webp"
              className="h-full aspect-auto w-auto "
              alt="Banner de anúncio"
              width={1024}
              height={425}
            />
          </Link>

          <Button
            className="w-full"
            variant="accent"
            onClick={() => {
              localStorage.clear();
              dispatchAction();
            }}
            isLoading={pending}
          >
            Refazer teste <Undo2 className="ml-2 h-[1.25em]" />
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-[2.5em] w-[2.5em] animate-[spin_750ms_ease-in-out_infinite]" />
          <p className="text-center">Carregando seus resultados...</p>
        </div>
      )}
    </main>
  );
}

function CharacteristicItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  const titles = {
    comportamentos: "Comportamentos",
    pontos_fortes: "Pontos Fortes",
    pontos_de_melhoria: "Pontos de Melhoria",
    motivacoes: "Motivações",
  };

  return (
    <div className="flex flex-col justify-center gap-2 border-border border rounded-md px-5 py-4 shadow-[0_4px_0_0_theme(colors.border)] hover:bg-primary/10 transition-all ease-in-out duration-200 hover:text-primary hover:border-primary/40 hover:shadow-[0_4px_0_0_theme(colors.primary.DEFAULT/0.4)] group">
      <h2 className="font-semibold text-xl flex gap-4 items-center">
        <div className="w-[2em] h-[2em] rounded-lg flex justify-center items-center border-2 border-foreground shrink-0 group-hover:border-primary">
          {number}
        </div>
        {titles[title as keyof typeof titles]}
      </h2>

      <p className="text-sm">{text}</p>
    </div>
  );
}

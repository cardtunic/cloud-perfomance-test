"use client";

import ErrorToast from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useServerAction from "@/hooks/useServerAction";
import * as actions from "@/lib/actions";
import {
  ArrowRight,
  Calculator,
  CircleHelp,
  Clock,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const { pending, dispatchAction } = useServerAction({
    action: actions.signup,
    onError: (error) => toast(<ErrorToast error={error} />),
  });

  return (
    <div className="w-full flex flex-col gap-12 items-center mt-10">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold flex gap-2 items-center">
          <CircleHelp className="w-[1.25em] h-[1.25em] text-accent" /> Como
          funciona?
        </h2>

        <p className="w-full md:w-[60%] text-center">
          Esse é um quiz para testar os seus conhecimentos na avaliação de
          sistemas de computação em nuvem.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-[60%]">
        <div className="flex gap-3 items-center bg-accent/10 px-6 py-5 rounded-md">
          <Clock className="w-[1.25em] h-[1.25em] text-accent shrink-0" />
          <p className="text-sm">
            Você tem 30 segundos para responder cada pergunta
          </p>
        </div>

        <div className="flex gap-3 items-center bg-accent/10 px-6 py-5 rounded-md">
          <Calculator className="w-[1.25em] h-[1.25em] text-accent shrink-0" />
          <p className="text-sm">
            A sua pontuação é calculada com base nos acertos e velocidade que
            você responde as perguntas.
          </p>
        </div>

        <div className="flex gap-3 items-center bg-accent/10 px-6 py-5 rounded-md">
          <Trophy className="w-[1.25em] h-[1.25em] text-accent shrink-0" />
          <p className="text-sm">
            Ao final, seu nome vai para um rank de jogadores ordenado pela
            quantidade de pontos.
          </p>
        </div>
      </div>

      <form
        action={dispatchAction}
        className="flex flex-col gap-2 w-full md:w-[60%]"
      >
        <Label className="font-medium text-base">Seu nome</Label>
        <Input
          type="text"
          name="username"
          placeholder="Digite seu nome aqui"
          required
        />
        <Button type="submit" variant="accent" isLoading={pending}>
          Começar o quiz <ArrowRight className="ml-2 w-[1.25em] h-[1.25em]" />
        </Button>
      </form>
    </div>
  );
}

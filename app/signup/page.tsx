"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useServerAction from "@/hooks/useServerAction";
import * as actions from "@/lib/actions";
import { SendHorizonal } from "lucide-react";

export default function Page() {
  const { pending, dispatchAction } = useServerAction({
    action: actions.signup,
  });

  return (
    <form action={dispatchAction}>
      <Input type="text" name="username" required />
      <Button type="submit" variant="accent" isLoading={pending}>
        Enviar <SendHorizonal className="w-[1.25em] h-[1.25em]" />
      </Button>
    </form>
  );
}

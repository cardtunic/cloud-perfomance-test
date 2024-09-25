"use server";

import actionHandler from "@/lib/action-handler";
import * as data from "@/lib/data";
import { Answer } from "@/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signup(formData: FormData) {
  return await actionHandler(
    async () => {
      const schema = z.object({
        username: z
          .string()
          .min(3, "Nome inválido")
          .refine(
            async (name) => {
              const user = await data.getUserByName(name);
              return !user;
            },
            {
              message: "Esse nome já está sendo utilizado",
            }
          ),
      });

      const userData = await schema.parseAsync(Object.fromEntries(formData));

      const user = await data.signup(userData.username);

      cookies().set("user_id", user.id.toString(), {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "lax",
      });
    },
    undefined,
    () => {
      redirect("/");
    }
  );
}

export async function submit(
  answers: Answer[],
  testDuration: number,
  testTimeLeft: number
) {
  return await actionHandler(
    async () => {
      await data.submit(answers, testDuration, testTimeLeft);
    },
    undefined,
    () => {
      cookies().set("answered", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "lax",
      });

      redirect("/results");
    }
  );
}

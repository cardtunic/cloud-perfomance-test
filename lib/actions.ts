"use server";

import data from "@/lib/data";
import { ValidationError } from "@/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signup(formData: FormData) {
  const validator = z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z
      .string()
      .min(11, "Esse número de telefone não é válido")
      .max(11, "Esse número de telefone não é válido"),
    areas: z.array(z.string()).refine(
      (items) => {
        if (new Set(items).size !== items.length) {
          return false;
        }

        const acceptedAreas = [
          "certificado-digital",
          "bdmg",
          "sindvagas",
          "cursos",
          "palestras-eventos",
          "unimed",
          "sindmais",
          "sindbank",
        ];

        return items.every((item) => acceptedAreas.includes(item));
      },
      {
        message: "Opções selecionadas inválidas",
      }
    ),
  });

  const signupData = await validator.safeParse({
    ...Object.fromEntries(formData),
    phone: formData
      .get("phone")
      ?.toString()
      .replace(/[^0-9]/g, ""),
    areas: formData.getAll("area"),
  });

  if (!signupData.success) {
    return { errors: signupData.error.flatten().fieldErrors };
  }

  const result = await data.findByPhoneOrEmail(
    signupData.data.phone,
    signupData.data.email
  );

  if (result && Object.keys(result).length > 0) {
    const errors: ValidationError = {};

    if (result.phone)
      errors.phone = ["Esse número de telefone já está cadastrado"];
    if (result.email) errors.email = ["Esse email já está cadastrado"];

    return { errors };
  }

  await data.signup(signupData);

  cookies().set("logged", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: "lax",
  });

  redirect("/");
}

export async function setResults() {
  cookies().set("answered", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: "lax",
  });

  redirect("/results");
}

export async function clearResults() {
  cookies().delete("answered");

  redirect("/");
}

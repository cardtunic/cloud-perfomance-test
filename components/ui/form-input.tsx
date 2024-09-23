"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { CircleAlert, Key } from "lucide-react";
import Link from "next/link";
import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  forgotPassword?: boolean;
  errors?: string[];
  className?: string;
  containerClassName?: string;
}

// Componente que renderiza um input que controla o estado de um formulário
// conforme tem seu valor atualizado. Além disso, mostra erros de validação.

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errors,
      name,
      className,
      containerClassName,
      forgotPassword,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <div
        className={twMerge(
          clsx("w-full flex-col flex gap-2", {
            "animate-[shake_500ms_linear]": !!errors,
          }),
          containerClassName
        )}
      >
        {label && (
          <Label
            htmlFor={props.id}
            className="flex justify-between items-center"
          >
            {label}{" "}
            {forgotPassword && (
              <Link
                href="/forgot-password"
                className="opacity-60 font-normal underline-offset-2 underline flex items-center gap-2 hover:opacity-100 transition-opacity duration-100 ease-in group"
              >
                Esqueceu sua senha?
                <Key className="h-[1.25em] w-[1.25em] group-hover:animate-[scale-in-out_750ms]" />
              </Link>
            )}
          </Label>
        )}
        <Input
          className={cn({
            "bg-destructive/5 border-destructive": errors && name in errors,
            className,
          })}
          name={name}
          ref={ref}
          {...props}
        />

        {errors && props.type === "password" && (
          <PasswordError errors={errors} />
        )}

        {errors && props.type !== "password" && <InputError errors={errors} />}
      </div>
    );
  }
);

function InputError({ errors }: { errors: String[] }) {
  return (
    <p className="text-destructive text-sm flex gap-1 items-center">
      <CircleAlert className="h-[1.25em]" /> {errors}
    </p>
  );
}

function PasswordError({ errors }: { errors: string[] }) {
  return (
    <div className="text-destructive text-sm flex flex-col gap-1">
      {errors.map((error, i) => (
        <div className="flex gap-1 items-center" key={`error-${i}`}>
          <CircleAlert className="h-[1.25em]" />
          <p className="text-destructive">{error}</p>
        </div>
      ))}
    </div>
  );
}

export default FormInput;

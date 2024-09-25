"use client";

import { Check, CircleAlert, Dot } from "lucide-react";

export type StatusToastProps = {
  success: boolean;
  message: {
    title: string;
    footer?: string;
    errors?: Record<string, string[]>;
  };
};

// Componente que renderiza um toast (notificação flutuante) com os status
// de uma requisição feita, por exemplo.

export default function StatusToast({ status }: { status: StatusToastProps }) {
  if (status.success === false) {
    const errors = status.message.errors || {};

    return (
      <div>
        <p className="font-semibold text-destructive flex items-center">
          <CircleAlert className="h-[1.25em] animate-[shake_500ms]" />{" "}
          {status.message.title}
        </p>
        {Object.keys(errors).map((error, i) => (
          <p key={`error-${i}`} className="flex text-gray-500">
            <Dot className="h-[1.25em]" />
            {errors[error]}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p className="font-semibold text-green-600 flex items-center">
          <Check className="h-[1.25em] animate-[scale-in-out_500ms]" />
          {status.message.title}
        </p>
        <p className="flex text-gray-500">{status.message.footer}</p>
      </div>
    );
  }
}

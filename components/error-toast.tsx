import StatusToast from "@/components/status-toast";
import {
  ServerError,
  ServerRateLimitedError,
  ServerValidationError,
} from "@/lib/definitions";

export default function ErrorToast({
  error,
}: {
  error: ServerValidationError | ServerRateLimitedError | ServerError;
}) {
  const titles = {
    ServerValidationError: "Ocorreu um erro ao processar os dados",
    ServerRateLimitedError: "Calma, você está fazendo muitas ações!",
    ServerError: "Ocorreu um erro inesperado",
  };

  const footers = {
    ServerRateLimitedError: "Tente novamente em [timeout] segundos.",
    ServerError: "Tente novamente mais tarde.",
  };

  const message: {
    title: string;
    errors?: Record<string, string[]>;
    footer?: string;
  } = {
    title: titles[error._error],
  };

  if (error._error === "ServerValidationError") {
    message.errors = error.errors;
  } else {
    message.footer = footers[error._error];
  }

  return (
    <StatusToast
      status={{
        success: false,
        message,
      }}
    />
  );
}

import {
  ServerError,
  ServerRateLimitedError,
  ServerValidationError,
  ValidationError,
} from "@/lib/definitions";
import errors from "@/lib/errors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export default async function actionHandler<T>(
  action: () => Promise<T>,
  revalidate?: string,
  onSuccess?: () => void
): Promise<T | ServerValidationError | ServerRateLimitedError | ServerError> {
  let actionResponse;

  try {
    actionResponse = await action();
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        _error: "ServerValidationError",
        errors: error.flatten().fieldErrors as ValidationError,
      };
    }

    if (error instanceof errors.ServerValidationError) {
      return {
        _error: "ServerValidationError",
        errors: error.errors,
      };
    }

    if (error instanceof errors.ServerRateLimitedError) {
      return {
        _error: "ServerRateLimitedError",
        timeout: error.timeout,
      };
    }

    console.error(error);

    return {
      _error: "ServerError",
    };
  }

  onSuccess?.();

  if (revalidate) {
    revalidatePath(revalidate);
    redirect(revalidate);
  }

  return actionResponse;
}

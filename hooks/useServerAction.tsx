import { ServerActionError, ValidationError } from "@/lib/definitions";
import { useState, useTransition } from "react";

interface UseServerActionParams<TData extends unknown[], TResponse> {
  action: (...args: TData) => Promise<ServerActionError | TResponse>;
  onSuccess?: (input: TData, response: TResponse) => void;
  onError?: (error: ValidationError) => void;
}

type UseServerActionResult<TData extends unknown[], TResponse> = {
  errors: ValidationError;
  pending: boolean;
  response: null | TResponse;
  dispatchAction: (...args: TData) => Promise<ServerActionError | unknown>;
};

function useServerAction<TData extends unknown[], TResponse = unknown>({
  action,
  onSuccess,
  onError,
}: UseServerActionParams<TData, TResponse>): UseServerActionResult<
  TData,
  TResponse
> {
  const [response, setResponse] = useState<null | TResponse>(null);
  const [errors, setErrors] = useState<ValidationError>({});
  const [pending, startTransition] = useTransition();

  async function dispatchAction(...args: TData) {
    startTransition(async () => {
      let response = await action(...args);

      if (response && typeof response === "object" && "errors" in response) {
        setErrors(response.errors);
        onError?.(response.errors);
        return;
      }

      setErrors({});
      setResponse(response);
      onSuccess?.(args, response);
    });
  }

  return {
    errors,
    pending,
    response,
    dispatchAction,
  };
}

export default useServerAction;

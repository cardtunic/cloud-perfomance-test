import {
  ServerActionError,
  ServerError,
  ServerRateLimitedError,
  ServerValidationError,
  ValidationError,
} from '@/lib/definitions';
import { useState, useTransition } from 'react';

interface UseServerActionParams<TData extends unknown[], TResponse> {
  action: (
    ...args: TData
  ) => Promise<
    ServerValidationError | ServerRateLimitedError | ServerError | TResponse
  >;
  onSuccess?: (input: TData, response: TResponse) => void;
  onError?: (
    error: ServerValidationError | ServerRateLimitedError | ServerError,
    input: TData
  ) => void;
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

      if (response && typeof response === 'object' && '_error' in response) {
        onError?.(response, args);

        switch (response._error) {
          case 'ServerValidationError':
            setErrors(response.errors);
            return;

          case 'ServerRateLimitedError':
            setErrors({ rateLimited: [`${response.timeout}`] });
            return;

          case 'ServerError':
            setErrors({ serverError: [] });
            return;
        }
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

import ServerError from "@/lib/errors/ServerError";
import ServerRateLimitedError from "@/lib/errors/ServerRateLimitedError";
import ServerValidationError from "@/lib/errors/ServerValidationError";

const errors = {
  ServerError,
  ServerRateLimitedError,
  ServerValidationError,
};

export default errors;

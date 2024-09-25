import { ServerActionError, ValidationError } from '@/lib/definitions';

export default class ServerValidationError {
  constructor(public errors: ValidationError) {
    this.errors = errors;
  }

  public flatten(): ServerActionError {
    return {
      success: false,
      errors: this.errors,
    };
  }
}

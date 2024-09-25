export type Question = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
};

export enum AnswerStatus {
  CORRECT = "correct",
  WRONG = "wrong",
  TIMEOUT = "timeout",
}

export type Answer = {
  question: string;
  answer: string;
  correct_answer: string;
  status: AnswerStatus;
};

export type UserAnswer = Answer & {
  user_id: number;
};

export type User = {
  id: number;
  username: string;
};

export type RankEntry = {
  username: string;
  points: number;
  test_duration: number;
};

export interface ValidationError extends Record<string, string[]> {}

export type ServerActionError = {
  success: false;
  errors: ValidationError;
};

export type ServerValidationError = {
  _error: "ServerValidationError";
  errors: ValidationError;
};

export type ServerRateLimitedError = {
  _error: "ServerRateLimitedError";
  timeout: number;
};

export type ServerError = {
  _error: "ServerError";
};

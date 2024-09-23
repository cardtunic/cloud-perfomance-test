export type QuestionData = {
  id: string;
  question: string;
  answers: string[];
};

export type Percentage = {
  value: number;
  label: "Gato" | "Águia" | "Tubarão" | "Lobo";
  id: "gato" | "aguia" | "tubarao" | "lobo";
};

export type SignupData = {
  email: string;
  phone: string;
  name: string;
  areas: string[];
};

export interface ValidationError extends Record<string, string[]> {}

export type ServerActionError = {
  success: false;
  errors: ValidationError;
};

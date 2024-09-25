import { Answer, AnswerStatus, Question } from "@/lib/definitions";
import questions from "@/lib/questions";
import { create } from "zustand";

type QuestionsState = {
  questions: Question[];
  currentQuestion: number;
  selectedAnswer: Answer | null;
  answers: Answer[];
};

type QuestionsActions = {
  nextQuestion: () => void;
  setSelectedAnswer: (answer: Answer | null) => void;
};

type QuestionStore = QuestionsState & QuestionsActions;

const initialState: QuestionsState = {
  //@ts-ignore
  questions,
  currentQuestion: 0,
  selectedAnswer: null,
  answers: [],
};

export const useQuestionsStore = create<QuestionStore>()((set, get) => ({
  ...initialState,
  nextQuestion: () => {
    set((state) => {
      const currentQuestion = state.questions[state.currentQuestion];
      const correctAnswer =
        currentQuestion.answers[currentQuestion.correctAnswer];

      const selectedAnswer = state.selectedAnswer ?? {
        question: currentQuestion.question,
        answer: "Não respondeu",
        correct_answer: correctAnswer,
        status: AnswerStatus.TIMEOUT,
      };

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answers: [...state.answers, selectedAnswer],
        selectedAnswer: null,
      };
    });
  },
  setSelectedAnswer: (answer) => {
    set({ selectedAnswer: answer });
  },
}));

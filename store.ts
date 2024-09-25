import { Answer, AnswerStatus, Question } from "@/lib/definitions";
import questions from "@/lib/questions";
import { create } from "zustand";

type QuestionsState = {
  questions: Question[];
  currentQuestion: number;
  selectedAnswer: Answer;
  answers: Answer[];
};

type QuestionsActions = {
  nextQuestion: () => void;
  setSelectedAnswer: (answer: Answer) => void;
};

type QuestionStore = QuestionsState & QuestionsActions;

const initialState: QuestionsState = {
  //@ts-ignore
  questions,
  currentQuestion: 0,
  selectedAnswer: {
    question: questions[0].question,
    answer: "",
    correct_answer: questions[0].answers[questions[0].correctAnswer],
    status: AnswerStatus.TIMEOUT,
  },
  answers: [],
};

export const useQuestionsStore = create<QuestionStore>()((set, get) => ({
  ...initialState,
  nextQuestion: () => {
    set((state) => {
      const nextQuestion = state.questions[state.currentQuestion + 1];
      const nextCorrectAnswer =
        nextQuestion.answers[nextQuestion.correctAnswer];

      const selectedAnswer = state.selectedAnswer;

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answers: [...state.answers, selectedAnswer],
        selectedAnswer: {
          question: nextQuestion.question,
          answer: "",
          correct_answer: nextCorrectAnswer,
          status: AnswerStatus.TIMEOUT,
        },
      };
    });
  },
  setSelectedAnswer: (answer) => {
    set({ selectedAnswer: answer });
  },
}));

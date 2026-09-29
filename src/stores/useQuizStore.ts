import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeAsyncStorage } from '@/utils/safeStorage';
import type { QuizQuestion, QuizResult } from '@/types/quiz';

interface QuizState {
  activeQuestions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  currentResult: QuizResult | null;
  status: 'idle' | 'in_progress' | 'analyzing' | 'completed';
  startSession: (questions: QuizQuestion[]) => void;
  selectAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: () => boolean;
  prevQuestion: () => void;
  setResult: (result: QuizResult) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      activeQuestions: [],
      currentIndex: 0,
      answers: {},
      currentResult: null,
      status: 'idle',

      startSession: (questions) =>
        set({
          activeQuestions: questions,
          currentIndex: 0,
          answers: {},
          currentResult: null,
          status: 'in_progress',
        }),

      selectAnswer: (questionId, optionId) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionId },
        })),

      nextQuestion: () => {
        const { currentIndex, activeQuestions } = get();
        if (currentIndex < activeQuestions.length - 1) {
          set({ currentIndex: currentIndex + 1 });
          return true;
        }
        set({ status: 'analyzing' });
        return false;
      },

      prevQuestion: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1 });
        }
      },

      setResult: (result) =>
        set({
          currentResult: result,
          status: 'completed',
        }),

      resetQuiz: () =>
        set({
          activeQuestions: [],
          currentIndex: 0,
          answers: {},
          currentResult: null,
          status: 'idle',
        }),
    }),
    {
      name: 'ne-ban-oi-quiz-session-storage',
      storage: createJSONStorage(() => safeAsyncStorage),
    }
  )
);

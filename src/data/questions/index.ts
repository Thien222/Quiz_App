import type { QuizQuestion } from '@/types/quiz';
import { foodQuestions } from './food';
import { textingQuestions } from './texting';
import { conflictQuestions } from './conflict';
import { skinshipQuestions } from './skinship';
import { caretakingQuestions } from './caretaking';
import { gamingQuestions } from './gaming';
import { jealousyQuestions } from './jealousy';
import { moneyQuestions } from './money';
import { datesQuestions } from './dates';

/**
 * Ngân hàng câu hỏi hạt giống (50+ câu hỏi tình huống đời thực)
 * Dễ dàng mở rộng lên 100–150 câu hỏi mà không làm thay đổi cấu trúc engine.
 */
export const questionPool: QuizQuestion[] = [
  ...foodQuestions,
  ...textingQuestions,
  ...conflictQuestions,
  ...skinshipQuestions,
  ...caretakingQuestions,
  ...gamingQuestions,
  ...jealousyQuestions,
  ...moneyQuestions,
  ...datesQuestions,
];

export function getQuestionById(id: string): QuizQuestion | undefined {
  return questionPool.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return questionPool.filter((q) => q.category === category);
}

export {
  foodQuestions,
  textingQuestions,
  conflictQuestions,
  skinshipQuestions,
  caretakingQuestions,
  gamingQuestions,
  jealousyQuestions,
  moneyQuestions,
  datesQuestions,
};

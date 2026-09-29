import type { QuizQuestion } from '@/types/quiz';
import { questionPool } from '@/data/questions';

interface SelectOptions {
  count?: number;
  seenQuestionIds?: string[];
  pool?: QuizQuestion[];
}

/**
 * Thuật toán chọn 20 câu hỏi thông minh:
 * - Ưu tiên các câu hỏi chưa từng gặp (unseen)
 * - Đảm bảo tính đa dạng của các chủ đề (Food, Texting, Conflict, Skinship, Caretaking, Gaming, Jealousy, Money, Dates)
 * - Tránh 3 câu liên tiếp cùng 1 danh mục
 * - Độc lập, mở rộng mượt mà khi ngân hàng mở rộng lên 100–150 câu
 */
export function selectQuizQuestions({
  count = 20,
  seenQuestionIds = [],
  pool = questionPool,
}: SelectOptions = {}): QuizQuestion[] {
  const activePool = pool.filter((q) => q.isActive);

  // 1. Phân loại câu chưa gặp và câu đã gặp
  const seenSet = new Set(seenQuestionIds);
  const unseenQuestions = activePool.filter((q) => !seenSet.has(q.id));
  const seenQuestions = activePool.filter((q) => seenSet.has(q.id));

  // Trộn ngẫu nhiên từng tập (Fisher-Yates shuffle)
  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledUnseen = shuffle(unseenQuestions);
  const shuffledSeen = shuffle(seenQuestions);

  // Gom đủ số lượng câu hỏi yêu cầu
  const candidatePool: QuizQuestion[] = [];
  candidatePool.push(...shuffledUnseen);
  if (candidatePool.length < count) {
    candidatePool.push(...shuffledSeen);
  }

  // 2. Chọn và phân bổ đều theo category
  const selected: QuizQuestion[] = [];
  const selectedCategoriesCount: Record<string, number> = {};

  for (const question of candidatePool) {
    if (selected.length >= count) break;

    // Tránh quá nhiều câu cùng 1 danh mục nếu còn lựa chọn khác
    const catCount = selectedCategoriesCount[question.category] || 0;
    if (catCount >= 3 && candidatePool.length > count * 1.5) {
      continue;
    }

    selected.push(question);
    selectedCategoriesCount[question.category] = catCount + 1;
  }

  // Nếu vẫn chưa đủ count, bổ sung nốt từ candidatePool
  if (selected.length < count) {
    for (const question of candidatePool) {
      if (selected.length >= count) break;
      if (!selected.some((q) => q.id === question.id)) {
        selected.push(question);
      }
    }
  }

  // 3. Sắp xếp lại để tránh 2-3 câu cùng category đứng liền kề
  const reordered: QuizQuestion[] = [];
  const remaining = [...selected];

  while (remaining.length > 0) {
    const lastCat = reordered[reordered.length - 1]?.category;
    let foundIndex = remaining.findIndex((q) => q.category !== lastCat);
    if (foundIndex === -1) {
      foundIndex = 0;
    }
    reordered.push(remaining.splice(foundIndex, 1)[0]);
  }

  return reordered;
}

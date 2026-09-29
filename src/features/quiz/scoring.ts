import type { DimensionMetric, QuizQuestion, QuizResult } from '@/types/quiz';
import { archetypes } from '@/data/archetypes';

interface CalculateScoreParams {
  sessionId: string;
  quizId?: string;
  questions: QuizQuestion[];
  answers: Record<string, string>; // questionId -> optionId
}

export function calculateQuizResult({
  sessionId,
  quizId = 'love-style',
  questions,
  answers,
}: CalculateScoreParams): QuizResult {
  const rawScores: Record<string, number> = {
    affection: 0,
    sensitivity: 0,
    caretaking: 0,
    playfulness: 0,
    independence: 0,
    communication: 0,
    compromise: 0,
    romantic_effort: 0,
    boundaries: 0,
    initiative: 0,
    reassurance: 0,
    patience: 0,
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length || 20;

  // 1. Tổng hợp điểm raw từ các câu trả lời
  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((opt) => opt.id === selectedOptionId);
    if (!option) continue;

    for (const [dim, weight] of Object.entries(option.scores)) {
      rawScores[dim] = (rawScores[dim] || 0) + weight;
    }
  }

  // 2. Chuẩn hóa điểm 0 – 100
  const normalizedScores: Record<string, number> = {};
  const averageFactor = Math.max(1, answeredCount);

  for (const [dim, raw] of Object.entries(rawScores)) {
    // Mỗi câu tối đa ~10 điểm per dimension, chuẩn hóa về khoảng 30 - 98
    const base = Math.round((raw / averageFactor) * 10);
    normalizedScores[dim] = Math.min(98, Math.max(30, base));
  }

  // 3. So khớp Archetype phù hợp nhất
  const affectionScore = normalizedScores.affection || 65;
  const sensitivityScore = normalizedScores.sensitivity || 55;
  const independenceScore = normalizedScores.independence || 50;
  const playfulnessScore = normalizedScores.playfulness || 60;
  const caretakingScore = normalizedScores.caretaking || 65;

  let matchedArchetype = archetypes[0]; // Default: Em Bé Khi Yêu

  if (independenceScore > 75 && independenceScore > affectionScore) {
    matchedArchetype = archetypes.find((a) => a.id === 'archetype-chien-than-doc-lap') || archetypes[1];
  } else if (playfulnessScore > 78 && playfulnessScore > caretakingScore) {
    matchedArchetype = archetypes.find((a) => a.id === 'archetype-mat-troi-nho') || archetypes[2];
  } else if (caretakingScore > 78 && caretakingScore > sensitivityScore) {
    matchedArchetype = archetypes.find((a) => a.id === 'archetype-he-cham-soc') || archetypes[3];
  } else {
    matchedArchetype = archetypes.find((a) => a.id === 'archetype-em-be-khi-yeu') || archetypes[0];
  }

  // 4. Bốn thanh đo chuẩn xác theo reference screenshot 04_result_kawaii.png
  const metrics: DimensionMetric[] = [
    {
      key: 'affection',
      label: 'Dính người',
      score: normalizedScores.affection || 82,
      color: '#F472B6',
      iconName: '💖',
    },
    {
      key: 'communication',
      label: 'Tinh tế',
      score: Math.round(((normalizedScores.communication || 70) + (normalizedScores.caretaking || 75)) / 2),
      color: '#A78BFA',
      iconName: '⭐',
    },
    {
      key: 'sensitivity',
      label: 'Hay tủi thân',
      score: normalizedScores.sensitivity || 56,
      color: '#60A5FA',
      iconName: '🥺',
    },
    {
      key: 'compromise',
      label: 'Biết chiều người yêu',
      score: Math.round(((normalizedScores.compromise || 75) + (normalizedScores.affection || 80)) / 2),
      color: '#F43F5E',
      iconName: '🤲',
    },
  ];

  return {
    sessionId,
    quizId,
    archetype: matchedArchetype,
    dimensionScores: normalizedScores,
    metrics,
    completedAt: new Date().toISOString(),
  };
}

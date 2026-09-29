export type GenderTheme = 'male' | 'female' | 'neutral';

export interface GenderAsset {
  male?: any;
  female?: any;
  neutral?: any;
}

export interface QuizOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  thumbnail?: GenderAsset;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  category: string;
  tag: string;
  question: string;
  scenarioHighlight?: string;
  heroImage: GenderAsset;
  options: QuizOption[];
  helperHint?: string;
  dimensions: string[];
  isActive: boolean;
}

export interface DimensionMetric {
  key: string;
  label: string;
  score: number;
  color: string;
  iconName?: string;
}

export interface UnlockedInsight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface LockedInsight {
  id: string;
  title: string;
  teaser: string;
  icon: string;
  previewVibe: string;
}

export interface QuizArchetype {
  id: string;
  title: string;
  subtitle: string;
  vibeTag: string;
  quote: string;
  summary: string;
  heroImage: GenderAsset;
  dominantDimensions: string[];
  freeInsights: UnlockedInsight[];
  lockedInsights: LockedInsight[];
}

export interface QuizResult {
  sessionId: string;
  quizId: string;
  archetype: QuizArchetype;
  dimensionScores: Record<string, number>;
  metrics: DimensionMetric[];
  completedAt: string;
}

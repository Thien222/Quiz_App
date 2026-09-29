export type ID = string;

export interface Dimension {
  id: ID;
  slug: string;
  name: string;
  description?: string;
  iconName?: string;
  displayOrder: number;
}

export interface DimensionWeight {
  dimensionId: ID;
  weight: number;
}

export interface QuestionOption {
  id: ID;
  key: string;
  text: string;
  subtext?: string;
  weights: DimensionWeight[];
}

export interface Question {
  id: ID;
  text: string;
  scenario?: string;
  illustrationKey?: string;
  options: QuestionOption[];
  tags: string[];
}

export interface QuestionPool {
  id: ID;
  slug: string;
  questionIds: ID[];
}

export interface SelectionPolicy {
  questionCount: number;
  strategy: 'random' | 'weighted' | 'balanced';
  exposureCooldownDays: number;
  avoidSeenQuestions: boolean;
}

export interface VisualProfile {
  id: ID;
  version: number;
  artStyle: string;
  palette: string[];
  subject: { archetype: string; mood: string; pose: string };
  scene: { setting: string; lighting: string; accents: string[] };
  composition: { framing: string; aspectRatio: string };
}

export type DailyItem =
  | { id: ID; type: 'quote'; title?: string; body: string }
  | { id: ID; type: 'poll'; title: string; question: string; options: string[] }
  | { id: ID; type: 'vibe'; title: string; label: string; color: string }
  | { id: ID; type: 'quiz_teaser'; title: string; quizId: ID };

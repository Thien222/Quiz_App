import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeAsyncStorage } from '@/utils/safeStorage';
import type { GenderTheme } from '@/types/quiz';

interface UserState {
  genderTheme: GenderTheme;
  nickname: string;
  relationshipStatus: string;
  seenQuestionIds: string[];
  setGenderTheme: (theme: GenderTheme) => void;
  setNickname: (name: string) => void;
  setRelationshipStatus: (status: string) => void;
  addSeenQuestionIds: (ids: string[]) => void;
  resetSeenQuestions: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      genderTheme: 'female',
      nickname: 'Bạn xinh',
      relationshipStatus: 'in_relationship',
      seenQuestionIds: [],
      setGenderTheme: (genderTheme) => set({ genderTheme }),
      setNickname: (nickname) => set({ nickname }),
      setRelationshipStatus: (relationshipStatus) => set({ relationshipStatus }),
      addSeenQuestionIds: (ids) =>
        set((state) => {
          const combined = Array.from(new Set([...state.seenQuestionIds, ...ids]));
          return { seenQuestionIds: combined };
        }),
      resetSeenQuestions: () => set({ seenQuestionIds: [] }),
    }),
    {
      name: 'ne-ban-oi-user-storage',
      storage: createJSONStorage(() => safeAsyncStorage),
    }
  )
);

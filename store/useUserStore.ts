import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// XP needed to reach each level
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1500, 2500];

function calcLevel(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return Math.min(level, LEVEL_THRESHOLDS.length);
}

function xpToNextLevel(xp: number, level: number): number {
  const next = LEVEL_THRESHOLDS[level]; // index = level means "next level threshold"
  return next !== undefined ? next - xp : 0;
}

interface UserState {
  // Profile
  name: string;
  username: string;
  avatarUri: string | null;

  // Progress
  xp: number;
  level: number;
  streak: number;
  daysActive: number;
  lastActiveDate: string | null;

  // Theme
  isDarkMode: boolean;

  // Computed helpers
  xpToNext: () => number;
  levelThresholds: number[];

  // Actions
  addXP: (amount: number) => void;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setAvatarUri: (uri: string) => void;
  checkAndUpdateStreak: () => void;
  toggleDarkMode: () => void;
  resetProgress: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Default starting values
      name: 'Your Name',
      username: '@username',
      avatarUri: null,
      xp: 0,
      level: 1,
      streak: 0,
      daysActive: 0,
      lastActiveDate: null,
      isDarkMode: false,
      levelThresholds: LEVEL_THRESHOLDS,

      xpToNext: () => {
        const { xp, level } = get();
        return xpToNextLevel(xp, level);
      },

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = calcLevel(newXP);
          return { xp: newXP, level: newLevel };
        });
      },

      setName: (name: string) => set({ name }),
      setUsername: (username: string) => set({ username }),
      setAvatarUri: (uri: string) => set({ avatarUri: uri }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActiveDate, streak, daysActive } = get();

        if (lastActiveDate === today) return; // already updated today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = lastActiveDate === yesterday ? streak + 1 : 1;

        set({
          streak: newStreak,
          daysActive: daysActive + 1,
          lastActiveDate: today,
        });
      },

      resetProgress: () =>
        set({
          xp: 0,
          level: 1,
          streak: 0,
          daysActive: 0,
          lastActiveDate: null,
        }),
    }),
    {
      name: 'adapt-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

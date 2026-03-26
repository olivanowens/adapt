import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { LEVEL_THRESHOLDS } from '@/constants/xp';

function calcLevel(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return Math.min(level, LEVEL_THRESHOLDS.length);
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

  // Level-up notification
  justLeveledUp: number | null; // the new level number, null if no level-up

  // Computed
  levelThresholds: number[];
  xpToNext: () => number;

  // Actions
  addXP: (amount: number) => void;
  clearLevelUp: () => void;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setAvatarUri: (uri: string) => void;
  checkAndUpdateStreak: () => void;
  toggleDarkMode: () => void;
  resetProgress: () => void;
  syncToSupabase: () => Promise<void>;
  loadFromSupabase: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: 'Your Name',
      username: '@username',
      avatarUri: null,
      xp: 0,
      level: 1,
      streak: 0,
      daysActive: 0,
      lastActiveDate: null,
      isDarkMode: false,
      justLeveledUp: null,
      levelThresholds: LEVEL_THRESHOLDS,

      xpToNext: () => {
        const { xp, level } = get();
        const next = LEVEL_THRESHOLDS[level];
        return next !== undefined ? next - xp : 0;
      },

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = calcLevel(newXP);
          const didLevelUp = newLevel > state.level;
          return {
            xp: newXP,
            level: newLevel,
            justLeveledUp: didLevelUp ? newLevel : null,
          };
        });
        get().syncToSupabase();
      },

      clearLevelUp: () => set({ justLeveledUp: null }),

      setName: (name) => set({ name }),
      setUsername: (username) => set({ username }),
      setAvatarUri: (uri) => set({ avatarUri: uri }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActiveDate, streak, daysActive } = get();
        if (lastActiveDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = lastActiveDate === yesterday ? streak + 1 : 1;
        set({ streak: newStreak, daysActive: daysActive + 1, lastActiveDate: today });
        get().syncToSupabase();
      },

      syncToSupabase: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { xp, level, streak, daysActive, lastActiveDate } = get();
        await supabase.from('profiles').upsert({
          id: user.id,
          xp,
          level,
          streak,
          days_active: daysActive,
          last_active_date: lastActiveDate,
          updated_at: new Date().toISOString(),
        });
      },

      loadFromSupabase: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) {
          set({
            xp: data.xp ?? 0,
            level: data.level ?? 1,
            streak: data.streak ?? 0,
            daysActive: data.days_active ?? 0,
            lastActiveDate: data.last_active_date ?? null,
          });
        }
      },

      resetProgress: () =>
        set({ xp: 0, level: 1, streak: 0, daysActive: 0, lastActiveDate: null }),
    }),
    {
      name: 'adapt-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

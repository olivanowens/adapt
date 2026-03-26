import { useUserStore } from '@/store/useUserStore';

export function useColorScheme(): 'light' | 'dark' {
  const isDarkMode = useUserStore((state) => state.isDarkMode);
  return isDarkMode ? 'dark' : 'light';
}

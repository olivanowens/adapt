/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#3D3529',
    background: '#F5F0E8',
    tint: '#5C6B4A',
    icon: '#8A8070',
    tabIconDefault: '#8A8070',
    tabIconSelected: '#5C6B4A',
    card: '#EDE8DC',
    completedCard: '#7A8C6E',
    gold: '#C4A35A',
    line: '#9AAB8A',
  },
  dark: {
    text: '#E8E0D0',
    background: '#1A1915',
    tint: '#7A8C6E',
    icon: '#9A9080',
    tabIconDefault: '#9A9080',
    tabIconSelected: '#7A8C6E',
    card: '#2A2720',
    completedCard: '#4A5C3E',
    gold: '#C4A35A',
    line: '#4A5C3E',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

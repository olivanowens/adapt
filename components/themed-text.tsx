import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

// Map React Native fontWeight values to loaded Nunito font families
function getFontFamily(style: any): string {
  const weight = style?.fontWeight;
  if (weight === '800' || weight === '900') return 'Nunito_800ExtraBold';
  if (weight === '700' || weight === 'bold') return 'Nunito_700Bold';
  if (weight === '600') return 'Nunito_600SemiBold';
  return 'Nunito_400Regular';
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const flatStyle = StyleSheet.flatten(style) ?? {};
  const fontFamily = getFontFamily(flatStyle);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
        { fontFamily },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: { fontSize: 16, lineHeight: 24 },
  defaultSemiBold: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: '800', lineHeight: 38 },
  subtitle: { fontSize: 20, fontWeight: '700' },
  link: { lineHeight: 30, fontSize: 16, color: '#5C6B4A' },
});

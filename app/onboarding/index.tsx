import { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';

const { width } = Dimensions.get('window');

const STEPS = [
  {
    emoji: '📱',
    title: 'Welcome to ADAPT',
    subtitle: 'Timeless Tech Learning',
    body: "You're in the right place. ADAPT helps adults like you build real confidence with everyday technology — at your own pace, without feeling rushed or judged.",
  },
  {
    emoji: '🎓',
    title: 'How It Works',
    subtitle: 'Simple. Step by step.',
    body: "Each level has 3 short lessons you can read at your own pace. When you're ready, take a quick quiz to prove what you know — then unlock the next level and earn XP along the way.",
  },
  {
    emoji: '🌱',
    title: 'You\'ve Got This',
    subtitle: 'Small steps. Real progress.',
    body: "There's no timer. No pressure. You can replay any lesson and retake any quiz. ADAPT moves as fast or as slow as you need — this is YOUR learning journey.",
  },
];

export default function OnboardingScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { markOnboardingDone } = useUserStore();
  const [step, setStep] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  function goToStep(next: number) {
    setStep(next);
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      goToStep(step + 1);
    } else {
      markOnboardingDone();
      router.replace('/select-track');
    }
  }

  function handleSkip() {
    markOnboardingDone();
    router.replace('/(tabs)');
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Skip */}
      <TouchableOpacity
        style={[styles.skipBtn, { top: insets.top + 16 }]}
        onPress={handleSkip}>
        <ThemedText style={[styles.skipText, { color: c.icon }]}>Skip</ThemedText>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}>
        {STEPS.map((s, i) => (
          <View key={i} style={[styles.slide, { width, paddingTop: insets.top + 60 }]}>
            <ThemedText style={styles.emoji}>{s.emoji}</ThemedText>
            <ThemedText style={[styles.title, { color: c.text }]}>{s.title}</ThemedText>
            <ThemedText style={[styles.subtitle, { color: c.tint }]}>{s.subtitle}</ThemedText>
            <ThemedText style={[styles.body, { color: c.icon }]}>{s.body}</ThemedText>
          </View>
        ))}
      </ScrollView>

      {/* Dots + Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.dots}>
          {STEPS.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goToStep(i)}>
              <View style={[
                styles.dot,
                { backgroundColor: i === step ? c.tint : c.line },
                i === step && styles.dotActive,
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: c.tint }]}
          onPress={handleNext}>
          <ThemedText style={styles.btnText}>
            {step < STEPS.length - 1 ? 'Next →' : "Let's Pick Your Device →"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  skipBtn: { position: 'absolute', right: 24, zIndex: 10 },
  skipText: { fontSize: 15 },
  slide: { padding: 32, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 72, marginBottom: 28 },
  title: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 24 },
  body: { fontSize: 17, lineHeight: 28, textAlign: 'center' },
  footer: { padding: 24, paddingTop: 8, gap: 20, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { width: 24 },
  btn: { width: '100%', borderRadius: 14, padding: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});

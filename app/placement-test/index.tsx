import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import type { DeviceTrack } from '@/data/curriculum';

const BASICS_QUESTIONS = [
  'Do you use a smartphone or tablet on a regular basis?',
  'Can you send a text message without asking for help?',
  'Can you make or receive a phone call on your own?',
  'Do you know how to connect to Wi-Fi?',
  'Can you download or update an app?',
  'Do you use the internet to search for things?',
  'Can you take a photo and find it again later?',
  'Do you use email on your own?',
  'Can you tell when something online might be unsafe or a scam?',
  'Do you feel comfortable exploring new apps or settings on your own?',
];

function getPlacement(yesCount: number): { level: number; label: string; message: string } {
  if (yesCount <= 2) {
    return {
      level: 1,
      label: 'Starting Fresh',
      message: "No worries — everyone starts somewhere. We'll begin at the very beginning and build your confidence step by step.",
    };
  }
  if (yesCount <= 5) {
    return {
      level: 2,
      label: 'Getting Comfortable',
      message: "You have some experience already. We suggest starting at Level 1 to make sure the foundation is solid before building on it.",
    };
  }
  if (yesCount <= 7) {
    return {
      level: 3,
      label: 'Building Confidence',
      message: "You know the basics well. Start at Level 1 to reinforce good habits, then move quickly through what you already know.",
    };
  }
  return {
    level: 4,
    label: 'Experienced User',
    message: "You're further along than most beginners. Start at Level 1 to fill any gaps, then advance at your own pace.",
  };
}

export default function PlacementTestScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { track } = useLocalSearchParams<{ track: DeviceTrack }>();
  const { markPlacementDone } = useUserStore();

  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(BASICS_QUESTIONS.length).fill(null)
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [yesCount, setYesCount] = useState(0);

  const placement = getPlacement(yesCount);

  function handleAnswer(yes: boolean) {
    const updated = [...answers];
    updated[currentQ] = yes;
    setAnswers(updated);
    const newYesCount = yesCount + (yes ? 1 : 0);

    if (currentQ < BASICS_QUESTIONS.length - 1) {
      setYesCount(newYesCount);
      setCurrentQ(currentQ + 1);
    } else {
      setYesCount(newYesCount);
      setPhase('result');
    }
  }

  function handleFinish() {
    if (track) markPlacementDone(track);
    router.replace('/(tabs)/levels');
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { backgroundColor: c.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 24 }]}>
          <ThemedText style={[styles.badge, { color: c.tint }]}>TEST YOUR TECH LEVEL</ThemedText>
          <ThemedText style={styles.title}>Let's Find Your Starting Point</ThemedText>
          <ThemedText style={[styles.body, { color: c.icon }]}>
            Before you start your lessons, we have 10 quick yes/no questions to understand where you are today.
          </ThemedText>
          <ThemedText style={[styles.body, { color: c.icon }]}>
            There are no wrong answers — this just helps us guide you to the right place.
          </ThemedText>

          <View style={[styles.infoBox, { backgroundColor: c.card }]}>
            <ThemedText style={[styles.infoTitle, { color: c.tint }]}>What to expect</ThemedText>
            <ThemedText style={[styles.infoText, { color: c.text }]}>
              ✔  10 yes / no questions{'\n'}
              ✔  Takes about 1 minute{'\n'}
              ✔  No judgment — all answers are helpful{'\n'}
              ✔  You can always go back and redo lessons
            </ThemedText>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={() => setPhase('quiz')}>
            <ThemedText style={styles.btnText}>Start the Quiz →</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFinish} style={styles.skipBtn}>
            <ThemedText style={[styles.skipText, { color: c.icon }]}>Skip for now</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (phase === 'quiz') {
    const progress = (currentQ / BASICS_QUESTIONS.length) * 100;
    return (
      <View style={[styles.container, { backgroundColor: c.background }]}>
        <View style={[styles.quizContent, { paddingTop: insets.top + 24 }]}>
          {/* Progress bar */}
          <View style={[styles.progressBg, { backgroundColor: c.card }]}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: c.tint }]} />
          </View>
          <ThemedText style={[styles.questionCounter, { color: c.icon }]}>
            Question {currentQ + 1} of {BASICS_QUESTIONS.length}
          </ThemedText>

          <ThemedText style={[styles.questionText, { color: c.text }]}>
            {BASICS_QUESTIONS[currentQ]}
          </ThemedText>
        </View>

        <View style={[styles.answerRow, { paddingBottom: insets.bottom + 32 }]}>
          <TouchableOpacity
            style={[styles.noBtn, { borderColor: c.line }]}
            onPress={() => handleAnswer(false)}>
            <ThemedText style={[styles.noBtnText, { color: c.text }]}>No</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.yesBtn, { backgroundColor: c.tint }]}
            onPress={() => handleAnswer(true)}>
            <ThemedText style={styles.yesBtnText}>Yes</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Result screen
  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 32 }]}>
        <View style={[styles.resultHeader, { backgroundColor: c.tint }]}>
          <ThemedText style={styles.resultEmoji}>🎯</ThemedText>
          <ThemedText style={styles.resultTitle}>Your Tech Level</ThemedText>
          <ThemedText style={styles.resultLabel}>{placement.label}</ThemedText>
          <ThemedText style={styles.resultScore}>{yesCount} out of 10</ThemedText>
        </View>

        <View style={[styles.resultCard, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.resultMessage, { color: c.text }]}>
            {placement.message}
          </ThemedText>
        </View>

        <View style={[styles.infoBox, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.infoTitle, { color: c.tint }]}>What this means for you</ThemedText>
          <ThemedText style={[styles.infoText, { color: c.text }]}>
            Your lessons start at Level 1 to make sure you never miss anything important. As you complete each level, you unlock the next one.
            {'\n\n'}
            The goal is mastery — not speed. Move at whatever pace feels right for you.
          </ThemedText>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: c.tint }]}
          onPress={handleFinish}>
          <ThemedText style={styles.btnText}>Start My Lessons →</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 20 },
  quizContent: { flex: 1, padding: 24, justifyContent: 'center' },
  badge: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16 },
  body: { fontSize: 16, lineHeight: 26, marginBottom: 16 },
  infoBox: { borderRadius: 16, padding: 20, marginTop: 8, marginBottom: 16 },
  infoTitle: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5, marginBottom: 12 },
  infoText: { fontSize: 15, lineHeight: 26 },
  footer: { padding: 24, paddingTop: 8, gap: 12 },
  btn: { borderRadius: 14, padding: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: { fontSize: 15 },
  progressBg: { height: 6, borderRadius: 3, marginBottom: 16 },
  progressFill: { height: 6, borderRadius: 3 },
  questionCounter: { fontSize: 13, fontWeight: '600', marginBottom: 24 },
  questionText: { fontSize: 22, fontWeight: '700', lineHeight: 32 },
  answerRow: { flexDirection: 'row', padding: 24, paddingTop: 0, gap: 14 },
  noBtn: {
    flex: 1, borderRadius: 14, borderWidth: 2,
    padding: 20, alignItems: 'center',
  },
  noBtnText: { fontSize: 18, fontWeight: '700' },
  yesBtn: { flex: 1, borderRadius: 14, padding: 20, alignItems: 'center' },
  yesBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  resultHeader: {
    borderRadius: 20, padding: 32, alignItems: 'center',
    marginBottom: 20, gap: 6,
  },
  resultEmoji: { fontSize: 48, marginBottom: 8 },
  resultTitle: { fontSize: 14, fontWeight: '700', color: '#fff', opacity: 0.8, letterSpacing: 1 },
  resultLabel: { fontSize: 28, fontWeight: '800', color: '#fff' },
  resultScore: { fontSize: 16, color: '#fff', opacity: 0.85, marginTop: 4 },
  resultCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
  resultMessage: { fontSize: 16, lineHeight: 26 },
});

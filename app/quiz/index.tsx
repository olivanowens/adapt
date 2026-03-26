import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { CURRICULUM } from '@/data/curriculum';
import type { DeviceTrack } from '@/data/curriculum';

export default function QuizScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { track, levelNum } = useLocalSearchParams<{ track: DeviceTrack; levelNum: string }>();

  const { addXP, unlockNextLevel, recordQuizAttempt, quizAttempts } = useUserStore();

  const level = CURRICULUM[track]?.[Number(levelNum) - 1];
  const questions = level?.quiz ?? [];

  const attemptKey = `${track}-${levelNum}`;
  const attemptsUsed = quizAttempts[attemptKey] ?? 0;
  const maxAttempts = 3;

  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!level || questions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: c.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText style={{ textAlign: 'center', padding: 32 }}>
          Quiz content for this level is coming soon.
        </ThemedText>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: c.tint, marginTop: 20 }]}
          onPress={() => router.back()}>
          <ThemedText style={styles.btnText}>Go Back</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  function selectAnswer(qIndex: number, optionIndex: number) {
    if (submitted) return;
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  }

  function handleSubmit() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const finalScore = correct;
    setScore(finalScore);
    setSubmitted(true);
    recordQuizAttempt(track, Number(levelNum));

    const passed = finalScore >= Math.ceil(questions.length * 0.7); // 70% to pass
    if (passed) {
      addXP(level.xpReward);
      unlockNextLevel(track, Number(levelNum));
    }
  }

  const passed = submitted && score >= Math.ceil(questions.length * 0.7);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.levelTag, { color: c.icon }]}>Level {levelNum} Quiz</ThemedText>
        <ThemedText style={styles.title}>{level.title}</ThemedText>
        <ThemedText style={[styles.subtitle, { color: c.icon }]}>
          {questions.length} questions · Attempt {attemptsUsed + (submitted ? 0 : 1)} of {maxAttempts}
        </ThemedText>

        {/* Results Banner */}
        {submitted && (
          <View style={[styles.resultBanner, { backgroundColor: passed ? c.completedCard : '#C0392B' }]}>
            <ThemedText style={styles.resultEmoji}>{passed ? '🎉' : '😔'}</ThemedText>
            <ThemedText style={styles.resultTitle}>
              {passed ? 'You Passed!' : 'Not Quite'}
            </ThemedText>
            <ThemedText style={styles.resultScore}>
              {score} out of {questions.length} correct
            </ThemedText>
            {passed && (
              <ThemedText style={styles.resultXP}>+{level.xpReward} XP earned!</ThemedText>
            )}
            {!passed && attemptsUsed < maxAttempts && (
              <ThemedText style={styles.resultTip}>
                You have {maxAttempts - attemptsUsed} attempt(s) left. Review the lessons and try again.
              </ThemedText>
            )}
          </View>
        )}

        {/* Questions */}
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex];
          const isCorrect = submitted && selected === q.correctIndex;
          const isWrong = submitted && selected !== null && selected !== q.correctIndex;

          return (
            <View key={q.id} style={styles.questionBlock}>
              <ThemedText style={[styles.questionNum, { color: c.icon }]}>
                Question {qIndex + 1}
              </ThemedText>
              <ThemedText style={[styles.questionText, { color: c.text }]}>{q.question}</ThemedText>
              {q.options.map((option, oIndex) => {
                let bgColor = c.card;
                let borderColor = c.line;
                if (selected === oIndex && !submitted) { bgColor = c.tint; borderColor = c.tint; }
                if (submitted && oIndex === q.correctIndex) { bgColor = c.completedCard; borderColor = c.completedCard; }
                if (submitted && selected === oIndex && oIndex !== q.correctIndex) { bgColor = '#C0392B'; borderColor = '#C0392B'; }

                return (
                  <TouchableOpacity
                    key={oIndex}
                    style={[styles.option, { backgroundColor: bgColor, borderColor }]}
                    onPress={() => selectAnswer(qIndex, oIndex)}
                    disabled={submitted}>
                    <ThemedText style={[
                      styles.optionText,
                      { color: (selected === oIndex || (submitted && oIndex === q.correctIndex)) ? '#fff' : c.text },
                    ]}>
                      {option}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}

      </ScrollView>

      {/* Footer Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: c.background }]}>
        {!submitted ? (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: allAnswered ? c.tint : c.icon }]}
            onPress={handleSubmit}
            disabled={!allAnswered}>
            <ThemedText style={styles.btnText}>Submit Answers</ThemedText>
          </TouchableOpacity>
        ) : passed ? (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={() => router.replace('/(tabs)')}>
            <ThemedText style={styles.btnText}>Back to Home 🏠</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={() => router.back()}>
            <ThemedText style={styles.btnText}>Review Lessons & Try Again</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 20 },
  backBtn: { marginBottom: 20 },
  back: { fontSize: 16, fontWeight: '600' },
  levelTag: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  resultBanner: {
    borderRadius: 16, padding: 24, alignItems: 'center',
    marginBottom: 24, gap: 6,
  },
  resultEmoji: { fontSize: 40 },
  resultTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  resultScore: { fontSize: 16, color: '#fff', opacity: 0.9 },
  resultXP: { fontSize: 15, color: '#fff', fontWeight: '700', marginTop: 4 },
  resultTip: { fontSize: 13, color: '#fff', opacity: 0.85, textAlign: 'center', marginTop: 4 },
  questionBlock: { marginBottom: 28 },
  questionNum: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  questionText: { fontSize: 17, fontWeight: '600', lineHeight: 24, marginBottom: 12 },
  option: {
    borderRadius: 12, borderWidth: 2,
    padding: 14, marginBottom: 8,
  },
  optionText: { fontSize: 15, lineHeight: 22 },
  footer: { padding: 24, paddingTop: 12 },
  btn: { borderRadius: 14, padding: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});

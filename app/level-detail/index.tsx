import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { CURRICULUM } from '@/data/curriculum';
import type { DeviceTrack } from '@/data/curriculum';

export default function LevelDetailScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { track, levelNum } = useLocalSearchParams<{ track: DeviceTrack; levelNum: string }>();
  const { completedLessons, getUnlockedLevel } = useUserStore();

  const level = CURRICULUM[track]?.[Number(levelNum) - 1];
  const unlockedLevel = getUnlockedLevel(track);
  const isLocked = Number(levelNum) > unlockedLevel;

  if (!level) {
    return (
      <View style={[styles.container, { backgroundColor: c.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText>Level not found.</ThemedText>
      </View>
    );
  }

  const lessonsCompleted = level.miniLessons.filter(l => completedLessons.includes(l.id)).length;
  const allLessonsComplete = lessonsCompleted === level.miniLessons.length;

  // Find first incomplete lesson index
  const firstIncompleteIndex = level.miniLessons.findIndex(l => !completedLessons.includes(l.id));
  const startIndex = firstIncompleteIndex === -1 ? 0 : firstIncompleteIndex;

  function handleStart() {
    if (allLessonsComplete) {
      router.push({ pathname: '/quiz', params: { track, levelNum } });
    } else {
      router.push({ pathname: '/lesson', params: { track, levelNum, lessonIndex: String(startIndex) } });
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
        </TouchableOpacity>

        {/* Header */}
        <ThemedText style={[styles.levelTag, { color: c.icon }]}>Level {levelNum}</ThemedText>
        <ThemedText style={styles.title}>{level.title}</ThemedText>
        <ThemedText style={[styles.description, { color: c.icon }]}>{level.description}</ThemedText>

        {/* Progress */}
        <View style={[styles.progressCard, { backgroundColor: c.card }]}>
          <View style={styles.progressRow}>
            <ThemedText style={[styles.progressLabel, { color: c.icon }]}>Lessons completed</ThemedText>
            <ThemedText style={[styles.progressCount, { color: c.tint }]}>
              {lessonsCompleted} / {level.miniLessons.length}
            </ThemedText>
          </View>
          <View style={[styles.progressBg, { backgroundColor: c.line }]}>
            <View style={[
              styles.progressFill,
              {
                backgroundColor: c.tint,
                width: `${(lessonsCompleted / level.miniLessons.length) * 100}%`,
              },
            ]} />
          </View>
        </View>

        {/* Mini-lesson list */}
        <ThemedText style={[styles.sectionTitle, { color: c.text }]}>Lessons in this Level</ThemedText>
        {level.miniLessons.map((lesson, i) => {
          const done = completedLessons.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonRow, { backgroundColor: c.card, borderColor: done ? c.completedCard : c.line }]}
              onPress={() => router.push({ pathname: '/lesson', params: { track, levelNum, lessonIndex: String(i) } })}>
              <View style={[styles.lessonNum, { backgroundColor: done ? c.completedCard : c.line }]}>
                <ThemedText style={[styles.lessonNumText, { color: done ? '#fff' : c.text }]}>
                  {done ? '✓' : String(i + 1)}
                </ThemedText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={[styles.lessonTitle, { color: c.text }]}>{lesson.title}</ThemedText>
                <ThemedText style={[styles.lessonDuration, { color: c.icon }]}>⏱ {lesson.duration}</ThemedText>
              </View>
              <ThemedText style={[styles.chevron, { color: c.icon }]}>›</ThemedText>
            </TouchableOpacity>
          );
        })}

        {/* Quiz info */}
        <View style={[styles.quizCard, { backgroundColor: c.card, borderColor: c.line }]}>
          <ThemedText style={styles.quizIcon}>📝</ThemedText>
          <View style={{ flex: 1 }}>
            <ThemedText style={[styles.quizTitle, { color: c.text }]}>Level Quiz</ThemedText>
            <ThemedText style={[styles.quizSub, { color: c.icon }]}>
              {level.quiz.length} questions · 70% to pass · 3 attempts
            </ThemedText>
          </View>
          {allLessonsComplete && (
            <ThemedText style={[styles.readyBadge, { color: c.tint }]}>Ready!</ThemedText>
          )}
        </View>

        {/* XP reward */}
        <View style={[styles.xpCard, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.xpText, { color: c.tint }]}>
            🏆  Complete this level to earn +{level.xpReward} XP
          </ThemedText>
        </View>

      </ScrollView>

      {/* Start button */}
      {!isLocked && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: c.background }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={handleStart}>
            <ThemedText style={styles.btnText}>
              {allLessonsComplete ? 'Take the Quiz →' : lessonsCompleted > 0 ? 'Continue Level →' : 'Start Level →'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 20 },
  backBtn: { marginBottom: 20 },
  back: { fontSize: 16, fontWeight: '600' },
  levelTag: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 24 },
  progressCard: { borderRadius: 14, padding: 16, marginBottom: 28, gap: 10 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 14 },
  progressCount: { fontSize: 14, fontWeight: '700' },
  progressBg: { height: 6, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderRadius: 14, borderWidth: 1.5, padding: 16, marginBottom: 10,
  },
  lessonNum: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  lessonNumText: { fontSize: 14, fontWeight: '700' },
  lessonTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  lessonDuration: { fontSize: 13 },
  chevron: { fontSize: 22 },
  quizCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderRadius: 14, borderWidth: 1.5, padding: 16, marginTop: 4, marginBottom: 10,
  },
  quizIcon: { fontSize: 24 },
  quizTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  quizSub: { fontSize: 13 },
  readyBadge: { fontSize: 13, fontWeight: '700' },
  xpCard: { borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 8 },
  xpText: { fontSize: 14, fontWeight: '600' },
  footer: { padding: 24, paddingTop: 12 },
  btn: { borderRadius: 14, padding: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});

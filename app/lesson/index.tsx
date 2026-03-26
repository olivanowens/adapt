import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { CURRICULUM } from '@/data/curriculum';
import type { DeviceTrack } from '@/data/curriculum';

export default function LessonScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { track, levelNum, lessonIndex } = useLocalSearchParams<{
    track: DeviceTrack;
    levelNum: string;
    lessonIndex: string;
  }>();

  const { completeLesson, completedLessons } = useUserStore();

  const level = CURRICULUM[track]?.[Number(levelNum) - 1];
  const lesson = level?.miniLessons?.[Number(lessonIndex)];

  if (!level || !lesson) {
    return (
      <View style={[styles.container, { backgroundColor: c.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText>Lesson not found.</ThemedText>
      </View>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const isLastLesson = Number(lessonIndex) === level.miniLessons.length - 1;
  const lessonXP = 25;

  function handleComplete() {
    completeLesson(lesson.id, lessonXP);
    if (isLastLesson) {
      router.replace({ pathname: '/quiz', params: { track, levelNum } });
    } else {
      router.replace({
        pathname: '/lesson',
        params: { track, levelNum, lessonIndex: String(Number(lessonIndex) + 1) },
      });
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

        {/* Header */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.levelTag, { color: c.icon }]}>
          Level {levelNum} · Lesson {Number(lessonIndex) + 1} of {level.miniLessons.length}
        </ThemedText>
        <ThemedText style={styles.title}>{lesson.title}</ThemedText>
        <ThemedText style={[styles.duration, { color: c.icon }]}>⏱ {lesson.duration}</ThemedText>

        {/* Video Placeholder */}
        <View style={[styles.videoPlaceholder, { backgroundColor: c.card, borderColor: c.line }]}>
          <ThemedText style={styles.videoIcon}>▶️</ThemedText>
          <ThemedText style={[styles.videoText, { color: c.icon }]}>Video coming soon</ThemedText>
        </View>

        {/* Lesson Content */}
        <View style={[styles.contentCard, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.contentTitle, { color: c.tint }]}>Read Along</ThemedText>
          <ThemedText style={[styles.contentText, { color: c.text }]}>{lesson.content}</ThemedText>
        </View>

        {/* Tip */}
        {lesson.tip ? (
          <View style={[styles.tipCard, { backgroundColor: c.background, borderColor: c.tint }]}>
            <ThemedText style={[styles.tipLabel, { color: c.tint }]}>💡 Try It Now</ThemedText>
            <ThemedText style={[styles.tipText, { color: c.text }]}>{lesson.tip}</ThemedText>
          </View>
        ) : null}

        {/* XP Badge */}
        {!isCompleted && (
          <View style={[styles.xpBadge, { backgroundColor: c.card }]}>
            <ThemedText style={[styles.xpText, { color: c.tint }]}>
              Complete this lesson to earn +{lessonXP} XP
            </ThemedText>
          </View>
        )}

      </ScrollView>

      {/* Bottom Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: c.background }]}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: isCompleted ? c.completedCard : c.tint }]}
          onPress={handleComplete}>
          <ThemedText style={styles.btnText}>
            {isCompleted
              ? '✓ Already Completed'
              : isLastLesson
              ? 'Complete & Take Quiz →'
              : 'Complete & Next Lesson →'}
          </ThemedText>
        </TouchableOpacity>
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
  title: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
  duration: { fontSize: 14, marginBottom: 20 },
  videoPlaceholder: {
    height: 180, borderRadius: 16, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24, gap: 8,
  },
  videoIcon: { fontSize: 40 },
  videoText: { fontSize: 14 },
  contentCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
  contentTitle: { fontSize: 13, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  contentText: { fontSize: 16, lineHeight: 26 },
  tipCard: { borderRadius: 16, borderWidth: 2, padding: 18, marginBottom: 16 },
  tipLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  tipText: { fontSize: 15, lineHeight: 24 },
  xpBadge: { borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 8 },
  xpText: { fontSize: 14, fontWeight: '600' },
  footer: { padding: 24, paddingTop: 12 },
  btn: { borderRadius: 14, padding: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});

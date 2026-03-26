import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { CURRICULUM, DEVICE_TRACKS } from '@/data/curriculum';

export default function LevelsScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { selectedTrack, getUnlockedLevel, completedLessons } = useUserStore();

  const track = selectedTrack ?? 'iphone';
  const levels = CURRICULUM[track] ?? [];
  const unlockedLevel = getUnlockedLevel(track);
  const trackLabel = DEVICE_TRACKS.find(t => t.id === track)?.label ?? 'iPhone';
  const trackIcon = DEVICE_TRACKS.find(t => t.id === track)?.icon ?? '📱';

  const levelsDescending = [...levels].reverse();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.title}>Levels</ThemedText>
          <ThemedText style={[styles.subtitle, { color: c.icon }]}>
            {trackIcon} {trackLabel} Track
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.switchBtn, { backgroundColor: c.card, borderColor: c.line }]}
          onPress={() => router.push('/select-track')}>
          <ThemedText style={[styles.switchText, { color: c.tint }]}>Switch</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Path */}
      <View style={styles.pathContainer}>
        <View style={[styles.connectingLine, { backgroundColor: c.line }]} />

        {levelsDescending.map((lvl) => {
          const isCompleted = lvl.level < unlockedLevel;
          const isCurrent = lvl.level === unlockedLevel;
          const isLocked = lvl.level > unlockedLevel;
          const stepsAbove = lvl.level - unlockedLevel;
          const opacity = isLocked ? Math.max(0.2, 1 - stepsAbove * 0.12) : 1;

          const lessonsCompleted = lvl.miniLessons.filter(l => completedLessons.includes(l.id)).length;
          const totalLessons = lvl.miniLessons.length;

          return (
            <TouchableOpacity
              key={lvl.level}
              style={[styles.levelRow, { opacity }]}
              onPress={() => {
                if (!isLocked) {
                  router.push({
                    pathname: '/level-detail',
                    params: { track, levelNum: String(lvl.level) },
                  });
                }
              }}
              disabled={isLocked}>

              {isCurrent && (
                <View style={[styles.currentCard, { backgroundColor: c.background, borderColor: c.line }]}>
                  <View style={styles.currentCardHeader}>
                    <ThemedText style={styles.starIcon}>⭐</ThemedText>
                    <ThemedText style={[styles.currentTitle, { color: c.text }]}>Level {lvl.level}</ThemedText>
                  </View>
                  <ThemedText style={[styles.currentSubtitle, { color: c.text }]}>{lvl.title}</ThemedText>
                  <ThemedText style={[styles.currentUnlocks, { color: c.icon }]}>
                    {lessonsCompleted}/{totalLessons} lessons · Tap to continue →
                  </ThemedText>
                </View>
              )}

              {isCompleted && (
                <View style={[styles.completedCard, { backgroundColor: c.completedCard }]}>
                  <ThemedText style={styles.completedCheck}>✓</ThemedText>
                  <ThemedText style={styles.completedTitle}>Level {lvl.level} — {lvl.title}</ThemedText>
                </View>
              )}

              {isLocked && (
                <View style={[styles.lockedCard, { backgroundColor: c.card }]}>
                  <ThemedText style={[styles.lockedTitle, { color: c.text }]}>
                    LEVEL {lvl.level}
                  </ThemedText>
                  {stepsAbove === 1 && (
                    <ThemedText style={{ fontSize: 16, opacity: 0.6 }}>🔒</ThemedText>
                  )}
                </View>
              )}

            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '800' },
  subtitle: { fontSize: 15, marginTop: 4 },
  switchBtn: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8, marginTop: 4 },
  switchText: { fontSize: 14, fontWeight: '600' },
  pathContainer: { position: 'relative', alignItems: 'center' },
  connectingLine: { position: 'absolute', width: 2, top: 0, bottom: 0, left: '50%', marginLeft: -1 },
  levelRow: { width: '100%', alignItems: 'center', marginBottom: 12, zIndex: 1 },
  currentCard: { width: '90%', borderWidth: 2, borderStyle: 'dashed', borderRadius: 16, padding: 18 },
  currentCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  starIcon: { fontSize: 20 },
  currentTitle: { fontSize: 22, fontWeight: '700' },
  currentSubtitle: { fontSize: 15, fontWeight: '500', marginBottom: 4 },
  currentUnlocks: { fontSize: 13 },
  completedCard: { width: '85%', flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 18, gap: 10 },
  completedCheck: { fontSize: 18, color: '#fff', fontWeight: '700' },
  completedTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: '#fff' },
  lockedCard: { width: '82%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 18, gap: 10 },
  lockedTitle: { fontSize: 14, fontWeight: '600', letterSpacing: 1.5, flex: 1, textAlign: 'center' },
});

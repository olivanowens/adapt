import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { name, xp, level, streak, levelThresholds, checkAndUpdateStreak, addXP } = useUserStore();

  const currentThreshold = levelThresholds[level - 1] ?? 0;
  const nextThreshold = levelThresholds[level] ?? xp;
  const progress = nextThreshold > currentThreshold
    ? (xp - currentThreshold) / (nextThreshold - currentThreshold)
    : 1;
  const xpToNext = nextThreshold - xp;

  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}>

      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.appName}>ADAPT</ThemedText>
        <ThemedText style={[styles.greeting, { color: colors.icon }]}>
          Welcome back, {name.split(' ')[0]} 👋
        </ThemedText>
      </ThemedView>

      {/* Today's Focus Card */}
      <View style={[styles.focusCard, { backgroundColor: colors.tint }]}>
        <ThemedText style={styles.focusLabel}>TODAY'S FOCUS</ThemedText>
        <ThemedText style={styles.focusTitle}>Keep the streak alive</ThemedText>
        <ThemedText style={styles.focusSub}>Complete today's challenge to earn XP</ThemedText>

        {/* Progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <ThemedText style={styles.progressText}>
          {xp} XP — {xpToNext > 0 ? `${xpToNext} XP to Level ${level + 1}` : 'Max Level!'}
        </ThemedText>
      </View>

      {/* Stats Row */}
      <ThemedView style={styles.statsRow}>
        <ThemedView style={[styles.statCard, { borderColor: colors.icon }]}>
          <ThemedText style={styles.statValue}>{streak}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.icon }]}>Day Streak</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { borderColor: colors.icon }]}>
          <ThemedText style={styles.statValue}>Lv {level}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.icon }]}>Current Level</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { borderColor: colors.icon }]}>
          <ThemedText style={styles.statValue}>{xp}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.icon }]}>Total XP</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.tint }]}
          onPress={() => addXP(50)}>
          <ThemedText style={styles.actionBtnText}>Complete Today's Challenge (+50 XP)</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: colors.tint }]}>
          <ThemedText style={[styles.actionBtnOutlineText, { color: colors.tint }]}>
            View My Progress
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 24 },
  appName: { fontSize: 32, fontWeight: '800', letterSpacing: 2 },
  greeting: { fontSize: 16, marginTop: 4 },
  focusCard: { borderRadius: 16, padding: 24, marginBottom: 24 },
  focusLabel: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1.5,
    color: '#fff', opacity: 0.8, marginBottom: 8,
  },
  focusTitle: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 4 },
  focusSub: { fontSize: 14, color: '#fff', opacity: 0.85, marginBottom: 16 },
  progressBg: {
    height: 8, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4, marginBottom: 8,
  },
  progressFill: { height: 8, backgroundColor: '#fff', borderRadius: 4 },
  progressText: { fontSize: 13, color: '#fff', opacity: 0.85 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  actionBtn: { borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 10 },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  actionBtnOutline: { borderRadius: 12, borderWidth: 2, padding: 16, alignItems: 'center' },
  actionBtnOutlineText: { fontWeight: '700', fontSize: 16 },
});

import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';

const LEVEL_NAMES = ['Newcomer', 'Learner', 'Adapter', 'Challenger', 'Achiever', 'Master'];

export default function LevelsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { xp, level, levelThresholds } = useUserStore();

  const currentThreshold = levelThresholds[level - 1] ?? 0;
  const nextThreshold = levelThresholds[level] ?? xp;
  const progress = nextThreshold > currentThreshold
    ? (xp - currentThreshold) / (nextThreshold - currentThreshold)
    : 1;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}>

      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Levels</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
          Your progression journey
        </ThemedText>
      </ThemedView>

      {/* Current Level Card */}
      <View style={[styles.currentCard, { backgroundColor: colors.tint }]}>
        <ThemedText style={styles.currentLevelNum}>Level {level}</ThemedText>
        <ThemedText style={styles.currentLevelTitle}>{LEVEL_NAMES[level - 1]}</ThemedText>
        <ThemedText style={styles.xpText}>
          {xp} XP{nextThreshold ? ` / ${nextThreshold} XP` : ''}
        </ThemedText>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        {levelThresholds[level] !== undefined && (
          <ThemedText style={styles.nextLevelText}>
            {nextThreshold - xp} XP to Level {level + 1}
          </ThemedText>
        )}
      </View>

      {/* All Levels */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>All Levels</ThemedText>
        {LEVEL_NAMES.map((name, i) => {
          const lvlNum = i + 1;
          const required = levelThresholds[i] ?? 0;
          const unlocked = xp >= required;
          const isCurrent = lvlNum === level;

          return (
            <ThemedView
              key={lvlNum}
              style={[
                styles.levelRow,
                {
                  borderColor: isCurrent ? colors.tint : colors.icon,
                  opacity: unlocked ? 1 : 0.4,
                },
              ]}>
              <View style={[styles.levelBadge, { backgroundColor: unlocked ? colors.tint : colors.icon }]}>
                <ThemedText style={styles.levelBadgeText}>{lvlNum}</ThemedText>
              </View>
              <ThemedView style={styles.levelInfo}>
                <ThemedText style={styles.levelTitle}>{name}</ThemedText>
                <ThemedText style={[styles.levelXP, { color: colors.icon }]}>
                  {required} XP required
                </ThemedText>
              </ThemedView>
              {isCurrent && (
                <ThemedText style={[styles.currentBadge, { color: colors.tint }]}>
                  CURRENT
                </ThemedText>
              )}
              {!unlocked && (
                <ThemedText style={{ fontSize: 18 }}>🔒</ThemedText>
              )}
            </ThemedView>
          );
        })}
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '800' },
  subtitle: { fontSize: 16, marginTop: 4 },
  currentCard: { borderRadius: 16, padding: 24, marginBottom: 24 },
  currentLevelNum: { fontSize: 14, fontWeight: '700', color: '#fff', opacity: 0.8 },
  currentLevelTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8 },
  xpText: { fontSize: 14, color: '#fff', opacity: 0.9, marginBottom: 12 },
  progressBg: {
    height: 8, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4, marginBottom: 8,
  },
  progressFill: { height: 8, backgroundColor: '#fff', borderRadius: 4 },
  nextLevelText: { fontSize: 13, color: '#fff', opacity: 0.8 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  levelRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10, gap: 12,
  },
  levelBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  levelBadgeText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  levelInfo: { flex: 1 },
  levelTitle: { fontWeight: '600', fontSize: 16 },
  levelXP: { fontSize: 12, marginTop: 2 },
  currentBadge: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
});

import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LevelUpModal } from '@/components/level-up-modal';
import { XP_VALUES } from '@/constants/xp';
import { TECH_OF_THE_DAY, VOCAB_OF_THE_DAY } from '@/data/curriculum';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const c = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const {
    xp, level, streak, levelThresholds,
    checkAndUpdateStreak, addXP, loadFromSupabase,
    justLeveledUp, clearLevelUp,
  } = useUserStore();
  const { user } = useAuthStore();

  const [challengeDoneToday, setChallengeDoneToday] = useState(false);

  // Pick a daily item based on day of year
  const dayIndex = Math.floor(Date.now() / 86400000) % TECH_OF_THE_DAY.length;
  const vocabIndex = Math.floor(Date.now() / 86400000) % VOCAB_OF_THE_DAY.length;
  const todayTech = TECH_OF_THE_DAY[dayIndex];
  const todayVocab = VOCAB_OF_THE_DAY[vocabIndex];

  const currentThreshold = levelThresholds[level - 1] ?? 0;
  const nextThreshold = levelThresholds[level] ?? xp;
  const progress = nextThreshold > currentThreshold
    ? (xp - currentThreshold) / (nextThreshold - currentThreshold)
    : 1;
  const xpToNext = nextThreshold - xp;

  const displayName = user?.user_metadata?.full_name ?? 'there';

  useEffect(() => {
    loadFromSupabase();
    checkAndUpdateStreak();
  }, []);

  function handleCompleteChallenge() {
    if (challengeDoneToday) return;
    addXP(XP_VALUES.COMPLETE_CHALLENGE);
    setChallengeDoneToday(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.appName}>ADAPT</ThemedText>
            <ThemedText style={[styles.greeting, { color: c.icon }]}>
              Welcome back, {displayName.split(' ')[0]} 👋
            </ThemedText>
          </View>
          <TouchableOpacity
            style={[styles.settingsBtn, { backgroundColor: c.card }]}
            onPress={() => router.push('/edit-profile')}>
            <ThemedText style={styles.settingsIcon}>⚙️</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Today's Focus Card */}
        <View style={[styles.focusCard, { backgroundColor: c.tint }]}>
          <ThemedText style={styles.focusLabel}>TODAY'S FOCUS</ThemedText>
          <ThemedText style={styles.focusTitle}>Keep the streak alive</ThemedText>
          <ThemedText style={styles.focusSub}>Complete today's challenge to earn XP</ThemedText>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
          <ThemedText style={styles.progressText}>
            {xp} XP — {xpToNext > 0 ? `${xpToNext} XP to Level ${level + 1}` : 'Max Level!'}
          </ThemedText>
        </View>

        {/* Stats Row */}
        <ThemedView style={styles.statsRow}>
          <ThemedView style={[styles.statCard, { borderColor: c.icon }]}>
            <ThemedText style={styles.statValue}>{streak}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: c.icon }]}>Day Streak</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { borderColor: c.icon }]}>
            <ThemedText style={styles.statValue}>Lv {level}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: c.icon }]}>Level</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { borderColor: c.icon }]}>
            <ThemedText style={styles.statValue}>{xp}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: c.icon }]}>Total XP</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Tech of the Day */}
        <View style={[styles.dailyCard, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.dailyLabel, { color: c.tint }]}>TECH OF THE DAY</ThemedText>
          <ThemedText style={[styles.dailyTerm, { color: c.text }]}>{todayTech.term}</ThemedText>
          <ThemedText style={[styles.dailyDef, { color: c.icon }]}>{todayTech.definition}</ThemedText>
        </View>

        {/* Vocab of the Day */}
        <View style={[styles.dailyCard, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.dailyLabel, { color: c.tint }]}>VOCAB OF THE DAY</ThemedText>
          <ThemedText style={[styles.dailyTerm, { color: c.text }]}>{todayVocab.word}</ThemedText>
          <ThemedText style={[styles.dailyDef, { color: c.icon }]}>{todayVocab.meaning}</ThemedText>
        </View>

        {/* Quick Actions */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: challengeDoneToday ? c.icon : c.tint }]}
            onPress={handleCompleteChallenge}
            disabled={challengeDoneToday}>
            <ThemedText style={styles.actionBtnText}>
              {challengeDoneToday ? '✓ Challenge Complete' : "Complete Today's Challenge"}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: c.tint }]}>
            <ThemedText style={[styles.actionBtnOutlineText, { color: c.tint }]}>
              View My Progress
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

      </ScrollView>

      {justLeveledUp !== null && (
        <LevelUpModal newLevel={justLeveledUp} onClose={clearLevelUp} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  appName: { fontSize: 32, fontWeight: '800', letterSpacing: 2 },
  greeting: { fontSize: 16, marginTop: 4 },
  settingsBtn: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  settingsIcon: { fontSize: 20 },
  focusCard: { borderRadius: 16, padding: 24, marginBottom: 24 },
  focusLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: '#fff', opacity: 0.8, marginBottom: 8 },
  focusTitle: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 4 },
  focusSub: { fontSize: 14, color: '#fff', opacity: 0.85, marginBottom: 16 },
  progressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, marginBottom: 8 },
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
  dailyCard: { borderRadius: 14, padding: 18, marginBottom: 14 },
  dailyLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6 },
  dailyTerm: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  dailyDef: { fontSize: 14, lineHeight: 21 },
});

import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';

const LEVELS_DATA = [
  { level: 1,  title: 'Level 1',  subtitle: 'Getting Started',     xpRequired: 0     },
  { level: 2,  title: 'Level 2',  subtitle: 'Building Habits',      xpRequired: 100   },
  { level: 3,  title: 'Level 3',  subtitle: 'Calling & Contacts',   xpRequired: 250   },
  { level: 4,  title: 'Level 4',  subtitle: 'Deep Focus',           xpRequired: 500   },
  { level: 5,  title: 'Level 5',  subtitle: 'Mental Strength',      xpRequired: 900   },
  { level: 6,  title: 'Level 6',  subtitle: 'Leadership',           xpRequired: 1500  },
  { level: 7,  title: 'Level 7',  subtitle: 'Resilience',           xpRequired: 2500  },
  { level: 8,  title: 'Level 8',  subtitle: 'Mastery',              xpRequired: 4000  },
  { level: 9,  title: 'Level 9',  subtitle: 'Elite Performance',    xpRequired: 6000  },
  { level: 10, title: 'Level 10', subtitle: 'ADAPT Master',         xpRequired: 10000 },
];

export default function LevelsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const c = Colors[colorScheme];
  const { level: currentLevel } = useUserStore();

  // Render top-to-bottom: 10 down to 1
  const levelsDescending = [...LEVELS_DATA].reverse();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={styles.content}>

      <View style={styles.pathContainer}>
        {/* Vertical connecting line */}
        <View style={[styles.connectingLine, { backgroundColor: c.line }]} />

        {levelsDescending.map((item, index) => {
          const isCompleted = item.level < currentLevel;
          const isCurrent = item.level === currentLevel;
          const isLocked = item.level > currentLevel;
          const stepsAboveCurrent = item.level - currentLevel;
          const opacity = isLocked ? Math.max(0.2, 1 - stepsAboveCurrent * 0.12) : 1;

          return (
            <View key={item.level} style={[styles.levelRow, { opacity }]}>

              {/* ── CURRENT level card ── */}
              {isCurrent && (
                <View style={[styles.currentCard, { backgroundColor: c.background, borderColor: c.line }]}>
                  <View style={styles.currentCardHeader}>
                    <ThemedText style={styles.starIcon}>⭐</ThemedText>
                    <ThemedText style={[styles.currentTitle, { color: c.text }]}>{item.title}</ThemedText>
                  </View>
                  <ThemedText style={[styles.currentSubtitle, { color: c.text }]}>{item.subtitle}</ThemedText>
                  <ThemedText style={[styles.currentUnlocks, { color: c.icon }]}>→ Unlocks sub-lessons</ThemedText>
                </View>
              )}

              {/* ── COMPLETED level card ── */}
              {isCompleted && (
                <View style={[styles.completedCard, { backgroundColor: c.completedCard }]}>
                  <ThemedText style={styles.completedCheck}>✓</ThemedText>
                  <ThemedText style={styles.completedTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.lockIcon}>🔒</ThemedText>
                </View>
              )}

              {/* ── LOCKED level card ── */}
              {isLocked && (
                <View style={[styles.lockedCard, { backgroundColor: c.card }]}>
                  <ThemedText style={[styles.lockedTitle, { color: c.text }]}>
                    {item.title.toUpperCase()}
                  </ThemedText>
                  {stepsAboveCurrent === 1 && (
                    <ThemedText style={[styles.lockIcon, { opacity: 0.6 }]}>🔒</ThemedText>
                  )}
                </View>
              )}

            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingVertical: 40, paddingHorizontal: 24 },

  pathContainer: {
    position: 'relative',
    alignItems: 'center',
  },

  connectingLine: {
    position: 'absolute',
    width: 2,
    top: 0,
    bottom: 0,
    left: '50%',
    marginLeft: -1,
  },

  levelRow: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 1,
  },

  // Current
  currentCard: {
    width: '90%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 18,
  },
  currentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  starIcon: { fontSize: 20 },
  currentTitle: { fontSize: 22, fontWeight: '700' },
  currentSubtitle: { fontSize: 15, fontWeight: '500', marginBottom: 4 },
  currentUnlocks: { fontSize: 13 },

  // Completed
  completedCard: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 10,
  },
  completedCheck: { fontSize: 18, color: '#fff', fontWeight: '700' },
  completedTitle: { flex: 1, fontSize: 18, fontWeight: '600', color: '#fff' },
  lockIcon: { fontSize: 16 },

  // Locked
  lockedCard: {
    width: '82%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 10,
  },
  lockedTitle: { fontSize: 14, fontWeight: '600', letterSpacing: 1.5, flex: 1, textAlign: 'center' },
});

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';

const COMING_SOON_FEATURES = [
  { icon: '🏆', label: 'Leaderboard', desc: 'See how your XP stacks up' },
  { icon: '👥', label: 'Study Groups', desc: 'Learn alongside others' },
  { icon: '🎉', label: 'Celebrate Wins', desc: 'Share your level-ups' },
  { icon: '💬', label: 'Ask Questions', desc: 'Get help from the community' },
];

export default function CommunityScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { level } = useUserStore();
  const unlocked = level >= 3;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>

        <ThemedText style={styles.title}>Community</ThemedText>
        <ThemedText style={[styles.subtitle, { color: c.icon }]}>
          Connect with others on the journey
        </ThemedText>

        {!unlocked ? (
          <View style={[styles.lockCard, { backgroundColor: c.card, borderColor: c.line }]}>
            <ThemedText style={styles.lockIcon}>🔒</ThemedText>
            <ThemedText style={[styles.lockTitle, { color: c.text }]}>Unlocks at Level 3</ThemedText>
            <ThemedText style={[styles.lockBody, { color: c.icon }]}>
              Keep learning! Community access opens up once you reach Level 3.
              You're at Level {level} right now — you're almost there.
            </ThemedText>
          </View>
        ) : (
          <View style={[styles.lockCard, { backgroundColor: c.card, borderColor: c.line }]}>
            <ThemedText style={styles.lockIcon}>🌱</ThemedText>
            <ThemedText style={[styles.lockTitle, { color: c.text }]}>Coming Soon</ThemedText>
            <ThemedText style={[styles.lockBody, { color: c.icon }]}>
              You've unlocked Community access! We're still building it out.
              Check back soon — it's going to be great.
            </ThemedText>
          </View>
        )}

        <ThemedText style={[styles.featuresLabel, { color: c.icon }]}>WHAT'S COMING</ThemedText>
        <View style={styles.featuresGrid}>
          {COMING_SOON_FEATURES.map((f) => (
            <View key={f.label} style={[styles.featureCard, { backgroundColor: c.card }]}>
              <ThemedText style={styles.featureIcon}>{f.icon}</ThemedText>
              <ThemedText style={[styles.featureLabel, { color: c.text }]}>{f.label}</ThemedText>
              <ThemedText style={[styles.featureDesc, { color: c.icon }]}>{f.desc}</ThemedText>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24 },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 15, marginBottom: 28 },
  lockCard: {
    borderRadius: 18, borderWidth: 1.5, padding: 28,
    alignItems: 'center', gap: 10, marginBottom: 32,
  },
  lockIcon: { fontSize: 44, marginBottom: 4 },
  lockTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center' },
  lockBody: { fontSize: 15, textAlign: 'center', lineHeight: 24 },
  featuresLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 14 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard: {
    width: '47%', borderRadius: 14, padding: 18,
    alignItems: 'center', gap: 6,
  },
  featureIcon: { fontSize: 28 },
  featureLabel: { fontSize: 14, fontWeight: '700' },
  featureDesc: { fontSize: 12, textAlign: 'center' },
});

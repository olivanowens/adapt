import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function CommunityScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const c = Colors[colorScheme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Community</ThemedText>
        <ThemedText style={[styles.subtitle, { color: c.icon }]}>
          Connect with others on the journey
        </ThemedText>
      </ThemedView>

      <View style={[styles.emptyState, { borderColor: c.line }]}>
        <ThemedText style={styles.emptyIcon}>💬</ThemedText>
        <ThemedText style={[styles.emptyTitle, { color: c.text }]}>Coming Soon</ThemedText>
        <ThemedText style={[styles.emptyText, { color: c.icon }]}>
          Community features are on the way. You'll be able to share progress, connect with others, and stay motivated together.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800' },
  subtitle: { fontSize: 16, marginTop: 4 },
  emptyState: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});

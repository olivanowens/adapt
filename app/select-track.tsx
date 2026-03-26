import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { DEVICE_TRACKS, DeviceTrack } from '@/data/curriculum';

export default function SelectTrackScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { setSelectedTrack, selectedTrack } = useUserStore();

  function handleSelect(track: DeviceTrack) {
    setSelectedTrack(track);
    router.back();
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.title}>Choose Your Device</ThemedText>
      <ThemedText style={[styles.subtitle, { color: c.icon }]}>
        Select the device you want to learn about. You can change this later.
      </ThemedText>

      <View style={styles.grid}>
        {DEVICE_TRACKS.map((track) => {
          const isSelected = selectedTrack === track.id;
          return (
            <TouchableOpacity
              key={track.id}
              style={[
                styles.trackCard,
                {
                  backgroundColor: isSelected ? c.tint : c.card,
                  borderColor: isSelected ? c.tint : c.line,
                },
              ]}
              onPress={() => handleSelect(track.id)}>
              <ThemedText style={styles.trackIcon}>{track.icon}</ThemedText>
              <ThemedText style={[styles.trackLabel, { color: isSelected ? '#fff' : c.text }]}>
                {track.label}
              </ThemedText>
              {isSelected && (
                <ThemedText style={styles.checkmark}>✓</ThemedText>
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
  backBtn: { marginBottom: 24 },
  back: { fontSize: 16, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 10 },
  subtitle: { fontSize: 15, lineHeight: 22, marginBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  trackCard: {
    width: '47%',
    borderRadius: 16,
    borderWidth: 2,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  trackIcon: { fontSize: 40 },
  trackLabel: { fontSize: 18, fontWeight: '700' },
  checkmark: { fontSize: 20, color: '#fff' },
});

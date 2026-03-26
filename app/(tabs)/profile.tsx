import { ScrollView, StyleSheet, View, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/store/useUserStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { name, username, xp, level, streak, daysActive, isDarkMode, toggleDarkMode, avatarUri } = useUserStore();
  const { signOut, user } = useAuthStore();

  const displayName = user?.user_metadata?.full_name ?? name;
  const displayEmail = user?.email ?? '';

  const stats = [
    { label: 'Level', value: String(level) },
    { label: 'Streak', value: `${streak}d` },
    { label: 'Total XP', value: String(xp) },
    { label: 'Days Active', value: String(daysActive) },
  ];

  const firstLetter = displayName ? displayName[0].toUpperCase() : 'A';

  function handleSignOut() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}>

      {/* Avatar + Name */}
      <ThemedView style={styles.profileHeader}>
        {avatarUri || user?.user_metadata?.avatar_url ? (
          <Image
            source={{ uri: user?.user_metadata?.avatar_url ?? avatarUri! }}
            style={styles.avatarImg}
          />
        ) : (
          <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.avatarText}>{firstLetter}</ThemedText>
          </View>
        )}
        <ThemedText style={styles.name}>{displayName}</ThemedText>
        <ThemedText style={[styles.username, { color: colors.icon }]}>{displayEmail || username}</ThemedText>
        {user?.user_metadata?.bio ? (
          <ThemedText style={[styles.bio, { color: colors.icon }]}>{user.user_metadata.bio}</ThemedText>
        ) : null}
      </ThemedView>

      {/* Stats Grid */}
      <ThemedView style={styles.statsGrid}>
        {stats.map((stat) => (
          <ThemedView key={stat.label} style={[styles.statCard, { borderColor: colors.icon }]}>
            <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.icon }]}>{stat.label}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Settings */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Settings</ThemedText>

        {/* Dark Mode Toggle */}
        <View style={[styles.settingRow, { borderColor: colors.icon }]}>
          <ThemedText style={styles.settingIcon}>{isDarkMode ? '🌙' : '☀️'}</ThemedText>
          <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#ccc', true: colors.tint }}
            thumbColor="#fff"
          />
        </View>

        {[
          { label: 'Edit Profile', icon: '✏️', onPress: () => router.push('/edit-profile') },
          { label: 'Notifications', icon: '🔔', onPress: undefined },
          { label: 'Privacy', icon: '🔒', onPress: undefined },
          { label: 'Help & Support', icon: '💬', onPress: undefined },
        ].map((item, index, arr) => (
          <TouchableOpacity
            key={item.label}
            onPress={item.onPress}
            style={[
              styles.settingRow,
              { borderColor: colors.icon },
              index === arr.length - 1 && styles.lastRow,
            ]}>
            <ThemedText style={styles.settingIcon}>{item.icon}</ThemedText>
            <ThemedText style={styles.settingLabel}>{item.label}</ThemedText>
            <ThemedText style={[styles.chevron, { color: colors.icon }]}>›</ThemedText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.settingRow, styles.lastRow, { borderColor: colors.icon }]}
          onPress={handleSignOut}>
          <ThemedText style={styles.settingIcon}>🚪</ThemedText>
          <ThemedText style={[styles.settingLabel, { color: '#C0392B' }]}>Sign Out</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  profileHeader: { alignItems: 'center', marginBottom: 28 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  avatarImg: { width: 88, height: 88, borderRadius: 44, marginBottom: 14 },
  avatarText: { fontSize: 36, fontWeight: '700', color: '#fff' },
  name: { fontSize: 24, fontWeight: '700' },
  username: { fontSize: 14, marginTop: 4 },
  bio: { fontSize: 14, marginTop: 6, textAlign: 'center', lineHeight: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  statCard: { width: '47%', borderRadius: 12, borderWidth: 1, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  settingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, gap: 14,
  },
  lastRow: { borderBottomWidth: 0 },
  settingIcon: { fontSize: 20, width: 28 },
  settingLabel: { flex: 1, fontSize: 16 },
  chevron: { fontSize: 22 },
});

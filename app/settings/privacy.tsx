import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PrivacyPolicyScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.title}>Privacy Policy</ThemedText>
      <ThemedText style={[styles.updated, { color: c.icon }]}>Last updated: March 2026</ThemedText>

      {[
        {
          heading: 'What We Collect',
          body: 'ADAPT collects your name, email address, and profile photo when you create an account. We also store your learning progress — including completed lessons, quiz results, XP, level, and streak — so you can pick up where you left off on any device.',
        },
        {
          heading: 'How We Use Your Information',
          body: 'Your information is used only to run the app and personalize your experience. We do not sell your data. We do not share it with advertisers. We do not use it for any purpose other than helping you learn.',
        },
        {
          heading: 'Where Your Data Is Stored',
          body: 'Your account and progress data is stored securely using Supabase, a trusted cloud platform. Your profile photo is stored in a secure private bucket. All data is encrypted in transit and at rest.',
        },
        {
          heading: 'Notifications',
          body: 'If you allow notifications, we send daily reminders to help you stay on track. You can turn notifications off at any time from your Profile screen or from your phone\'s Settings app.',
        },
        {
          heading: 'Your Rights',
          body: 'You can update or delete your account at any time from the Profile screen. Deleting your account permanently removes all of your data from our servers within 30 days.',
        },
        {
          heading: 'Children\'s Privacy',
          body: 'ADAPT is designed for adults. We do not knowingly collect information from anyone under 18 years of age.',
        },
        {
          heading: 'Contact Us',
          body: 'If you have any questions about this Privacy Policy, please reach out through the Help & Support page in the app.',
        },
      ].map((section) => (
        <ScrollView key={section.heading} scrollEnabled={false}>
          <ThemedText style={[styles.heading, { color: c.tint }]}>{section.heading}</ThemedText>
          <ThemedText style={[styles.body, { color: c.text }]}>{section.body}</ThemedText>
        </ScrollView>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 60 },
  backBtn: { marginBottom: 24 },
  back: { fontSize: 16, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 6 },
  updated: { fontSize: 13, marginBottom: 28 },
  heading: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 20 },
  body: { fontSize: 15, lineHeight: 26 },
});

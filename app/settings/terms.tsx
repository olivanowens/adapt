import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TermsScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.title}>Terms of Service</ThemedText>
      <ThemedText style={[styles.updated, { color: c.icon }]}>Last updated: March 2026</ThemedText>

      {[
        {
          heading: 'Acceptance of Terms',
          body: 'By creating an account and using ADAPT, you agree to these Terms of Service. If you do not agree, please do not use the app.',
        },
        {
          heading: 'Your Account',
          body: 'You are responsible for keeping your login information private. Do not share your account with others. You must be 18 years or older to create an account.',
        },
        {
          heading: 'What ADAPT Provides',
          body: 'ADAPT provides educational content to help adults learn how to use technology. The content is for informational and educational purposes only. We make no guarantee that the information is complete or error-free.',
        },
        {
          heading: 'Acceptable Use',
          body: 'You agree to use ADAPT only for its intended purpose — learning. You may not attempt to hack, scrape, reverse-engineer, or misuse the app or its content in any way.',
        },
        {
          heading: 'Content Ownership',
          body: 'All lesson content, quiz questions, and app design are owned by ADAPT. You may not copy or redistribute any content from the app without written permission.',
        },
        {
          heading: 'Limitation of Liability',
          body: 'ADAPT is provided "as is." We are not liable for any damages that result from your use of the app, including loss of data or interruptions in service.',
        },
        {
          heading: 'Changes to These Terms',
          body: 'We may update these Terms from time to time. Continued use of the app after changes means you accept the new terms. We will notify you of significant changes.',
        },
        {
          heading: 'Contact',
          body: 'Questions about these Terms? Reach out through the Help & Support page in the app.',
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

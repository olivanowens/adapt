import { ScrollView, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const FAQS = [
  {
    q: 'How do I move to the next level?',
    a: 'Complete all 3 lessons in a level, then pass the quiz with at least 70% (4 out of 6 questions correct). The next level will unlock automatically.',
  },
  {
    q: 'What happens if I fail the quiz?',
    a: "You have 3 attempts per level. If you don't pass after 3 tries, review the lessons again — there's no penalty for taking your time.",
  },
  {
    q: 'Will the app remember where I left off?',
    a: 'Yes. Your progress is saved automatically every time you complete a lesson or quiz. You can close the app and come back anytime.',
  },
  {
    q: 'How do streaks work?',
    a: 'Complete at least one action (a lesson, quiz, or daily challenge) each day to keep your streak going. Missing a day resets it to zero.',
  },
  {
    q: 'Can I switch device tracks?',
    a: 'Yes. Tap "Switch" on the Levels screen to choose a different device track. Your progress on each track is saved separately.',
  },
  {
    q: 'How do I change my profile photo or name?',
    a: "Tap the 'Edit Profile' option in the Profile tab. You can update your name, bio, and photo from there.",
  },
  {
    q: 'How do I turn off notifications?',
    a: "Toggle notifications off on the Profile tab. You can also go to your phone's Settings app and turn them off there.",
  },
];

export default function HelpScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ThemedText style={[styles.back, { color: c.tint }]}>← Back</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.title}>Help & Support</ThemedText>
      <ThemedText style={[styles.subtitle, { color: c.icon }]}>
        Answers to the most common questions.
      </ThemedText>

      {FAQS.map((faq, i) => (
        <View key={i} style={[styles.faqCard, { backgroundColor: c.card }]}>
          <ThemedText style={[styles.question, { color: c.text }]}>{faq.q}</ThemedText>
          <ThemedText style={[styles.answer, { color: c.icon }]}>{faq.a}</ThemedText>
        </View>
      ))}

      {/* Contact */}
      <View style={[styles.contactCard, { backgroundColor: c.card, borderColor: c.tint }]}>
        <ThemedText style={[styles.contactTitle, { color: c.tint }]}>Still need help?</ThemedText>
        <ThemedText style={[styles.contactBody, { color: c.text }]}>
          Send us a message and we'll get back to you as soon as we can.
        </ThemedText>
        <TouchableOpacity
          style={[styles.emailBtn, { backgroundColor: c.tint }]}
          onPress={() => Linking.openURL('mailto:support@adaptapp.com?subject=ADAPT App Support')}>
          <ThemedText style={styles.emailBtnText}>Email Support</ThemedText>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 60 },
  backBtn: { marginBottom: 24 },
  back: { fontSize: 16, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 6 },
  subtitle: { fontSize: 15, marginBottom: 28 },
  faqCard: { borderRadius: 14, padding: 18, marginBottom: 12 },
  question: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  answer: { fontSize: 14, lineHeight: 22 },
  contactCard: {
    borderRadius: 16, borderWidth: 2,
    padding: 20, marginTop: 8, gap: 12,
  },
  contactTitle: { fontSize: 16, fontWeight: '700' },
  contactBody: { fontSize: 14, lineHeight: 22 },
  emailBtn: { borderRadius: 12, padding: 14, alignItems: 'center' },
  emailBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

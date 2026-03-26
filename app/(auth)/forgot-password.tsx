import { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';

export default function ForgotPasswordScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');

  async function handleReset() {
    if (!email) {
      Alert.alert('Enter your email', 'Please enter the email address for your account.');
      return;
    }
    const success = await resetPassword(email.trim());
    if (success) {
      Alert.alert(
        'Email sent',
        'Check your inbox for a password reset link.',
        [{ text: 'Back to Login', onPress: () => router.replace('/(auth)/login') }]
      );
    } else {
      Alert.alert('Something went wrong', error ?? 'Please check your email and try again.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={styles.inner}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ThemedText style={[styles.backText, { color: c.tint }]}>← Back</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.title}>Reset Password</ThemedText>
        <ThemedText style={[styles.subtitle, { color: c.icon }]}>
          Enter your email and we'll send you a reset link.
        </ThemedText>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Email"
            placeholderTextColor={c.icon}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { clearError(); setEmail(t); }}
          />

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={handleReset}
            disabled={isLoading}>
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <ThemedText style={styles.btnText}>Send Reset Link</ThemedText>}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', padding: 28 },
  backBtn: { position: 'absolute', top: 60, left: 28 },
  backText: { fontSize: 16, fontWeight: '600' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 10 },
  subtitle: { fontSize: 15, lineHeight: 22, marginBottom: 36 },
  form: { gap: 14 },
  input: {
    borderWidth: 1, borderRadius: 14,
    paddingHorizontal: 18, paddingVertical: 16, fontSize: 16,
  },
  btn: {
    borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: 6,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});

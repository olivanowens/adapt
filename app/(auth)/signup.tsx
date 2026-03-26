import { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export default function SignUpScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const { signUp, isLoading, error, clearError } = useAuthStore();
  const { setName } = useUserStore();

  const [name, setNameLocal] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  async function handleSignUp() {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Password mismatch', 'Your passwords do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }
    const success = await signUp(email.trim(), password, name.trim());
    if (success) {
      setName(name.trim());
      router.replace('/(tabs)');
    } else if (error) {
      Alert.alert('Sign up failed', error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        <ThemedText style={styles.appName}>ADAPT</ThemedText>
        <ThemedText style={[styles.tagline, { color: c.icon }]}>Create your account</ThemedText>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Full name"
            placeholderTextColor={c.icon}
            value={name}
            onChangeText={(t) => { clearError(); setNameLocal(t); }}
          />
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Email"
            placeholderTextColor={c.icon}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { clearError(); setEmail(t); }}
          />
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Password (min 6 characters)"
            placeholderTextColor={c.icon}
            secureTextEntry
            value={password}
            onChangeText={(t) => { clearError(); setPassword(t); }}
          />
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Confirm password"
            placeholderTextColor={c.icon}
            secureTextEntry
            value={confirm}
            onChangeText={(t) => { clearError(); setConfirm(t); }}
          />

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={handleSignUp}
            disabled={isLoading}>
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <ThemedText style={styles.btnText}>Create Account</ThemedText>}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: c.icon }]}>Already have an account? </ThemedText>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <ThemedText style={[styles.link, { color: c.tint }]}>Log in</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flexGrow: 1, justifyContent: 'center', padding: 28 },
  appName: { fontSize: 42, fontWeight: '800', letterSpacing: 3, textAlign: 'center', marginBottom: 8 },
  tagline: { fontSize: 16, textAlign: 'center', marginBottom: 40 },
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
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { fontSize: 15 },
  link: { fontSize: 15, fontWeight: '600' },
});

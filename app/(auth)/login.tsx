import { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const { signIn, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    const success = await signIn(email.trim(), password);
    if (success) router.replace('/(tabs)');
    else if (error) Alert.alert('Login failed', error);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={styles.inner}>
        <ThemedText style={styles.appName}>ADAPT</ThemedText>
        <ThemedText style={[styles.tagline, { color: c.icon }]}>Welcome back</ThemedText>

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
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Password"
            placeholderTextColor={c.icon}
            secureTextEntry
            value={password}
            onChangeText={(t) => { clearError(); setPassword(t); }}
          />

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={handleLogin}
            disabled={isLoading}>
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <ThemedText style={styles.btnText}>Log In</ThemedText>}
          </TouchableOpacity>

          <Link href="/(auth)/forgot-password" asChild>
            <TouchableOpacity style={styles.linkRow}>
              <ThemedText style={[styles.link, { color: c.tint }]}>Forgot password?</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: c.icon }]}>Don't have an account? </ThemedText>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <ThemedText style={[styles.link, { color: c.tint }]}>Sign up</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', padding: 28 },
  appName: { fontSize: 42, fontWeight: '800', letterSpacing: 3, textAlign: 'center', marginBottom: 8 },
  tagline: { fontSize: 16, textAlign: 'center', marginBottom: 40 },
  form: { gap: 14 },
  input: {
    borderWidth: 1, borderRadius: 14,
    paddingHorizontal: 18, paddingVertical: 16,
    fontSize: 16,
  },
  btn: {
    borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: 6,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
  linkRow: { alignItems: 'center', paddingVertical: 4 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { fontSize: 15 },
  link: { fontSize: 15, fontWeight: '600' },
});

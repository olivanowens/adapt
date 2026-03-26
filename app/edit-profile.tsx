import { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
  Alert, ScrollView, Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/lib/supabase';

export default function EditProfileScreen() {
  const c = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user, setSession } = useAuthStore();
  const { setAvatarUri, avatarUri } = useUserStore();

  const [name, setName] = useState(user?.user_metadata?.full_name ?? '');
  const [bio, setBio] = useState(user?.user_metadata?.bio ?? '');
  const [photo, setPhoto] = useState<string | null>(user?.user_metadata?.avatar_url ?? avatarUri);
  const [saving, setSaving] = useState(false);

  async function pickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your camera.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  function showPhotoOptions() {
    Alert.alert('Profile Photo', 'Choose a source', [
      { text: 'Camera', onPress: takePhoto },
      { text: 'Photo Library', onPress: pickPhoto },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  async function uploadPhoto(uri: string): Promise<string | null> {
    try {
      const ext = uri.split('.').pop() ?? 'jpg';
      const fileName = `${user!.id}.${ext}`;
      const formData = new FormData();
      formData.append('file', { uri, name: fileName, type: `image/${ext}` } as any);

      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, formData, { upsert: true });

      if (error) throw error;

      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      return data.publicUrl;
    } catch {
      return null;
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter your display name.');
      return;
    }
    setSaving(true);

    let avatarUrl = user?.user_metadata?.avatar_url ?? null;

    // Upload new photo if changed
    if (photo && photo !== user?.user_metadata?.avatar_url) {
      const uploaded = await uploadPhoto(photo);
      if (uploaded) {
        avatarUrl = uploaded;
        setAvatarUri(uploaded);
      } else {
        // Photo upload failed — save locally only
        setAvatarUri(photo);
        avatarUrl = photo;
      }
    }

    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: name.trim(), bio: bio.trim(), avatar_url: avatarUrl },
    });

    setSaving(false);

    if (error) {
      Alert.alert('Save failed', error.message);
    } else {
      if (data.user) setSession((await supabase.auth.getSession()).data.session);
      router.back();
    }
  }

  const firstLetter = name ? name[0].toUpperCase() : 'A';

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText style={[styles.cancel, { color: c.icon }]}>Cancel</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.title}>Edit Profile</ThemedText>
          <TouchableOpacity onPress={handleSave} disabled={saving}>
            {saving
              ? <ActivityIndicator color={c.tint} />
              : <ThemedText style={[styles.save, { color: c.tint }]}>Save</ThemedText>}
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <TouchableOpacity style={styles.avatarWrapper} onPress={showPhotoOptions}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatarImg} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: c.tint }]}>
              <ThemedText style={styles.avatarLetter}>{firstLetter}</ThemedText>
            </View>
          )}
          <View style={[styles.editBadge, { backgroundColor: c.tint }]}>
            <ThemedText style={styles.editBadgeText}>✏️</ThemedText>
          </View>
        </TouchableOpacity>
        <ThemedText style={[styles.changePhotoText, { color: c.tint }]}>
          Tap to change photo
        </ThemedText>

        {/* Fields */}
        <View style={styles.form}>
          <ThemedText style={[styles.label, { color: c.icon }]}>Display Name</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Your name"
            placeholderTextColor={c.icon}
            value={name}
            onChangeText={setName}
          />

          <ThemedText style={[styles.label, { color: c.icon }]}>Bio</ThemedText>
          <TextInput
            style={[styles.input, styles.bioInput, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            placeholder="Tell us about yourself..."
            placeholderTextColor={c.icon}
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 32,
  },
  title: { fontSize: 17, fontWeight: '700' },
  cancel: { fontSize: 16 },
  save: { fontSize: 16, fontWeight: '700' },
  avatarWrapper: { alignSelf: 'center', marginBottom: 8 },
  avatarImg: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarLetter: { fontSize: 40, fontWeight: '700', color: '#fff' },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
  editBadgeText: { fontSize: 14 },
  changePhotoText: { textAlign: 'center', fontSize: 14, marginBottom: 32 },
  form: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 2, marginTop: 14 },
  input: {
    borderWidth: 1, borderRadius: 14,
    paddingHorizontal: 18, paddingVertical: 14, fontSize: 16,
  },
  bioInput: { height: 90, textAlignVertical: 'top' },
});

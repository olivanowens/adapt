import { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { LEVEL_NAMES } from '@/constants/xp';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  newLevel: number;
  onClose: () => void;
}

export function LevelUpModal({ newLevel, onClose }: Props) {
  const c = Colors[useColorScheme() ?? 'light'];
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, bounciness: 14 }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const levelName = LEVEL_NAMES[newLevel - 1] ?? `Level ${newLevel}`;

  return (
    <Modal transparent animationType="none" visible onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { opacity }]}>
        <Animated.View
          style={[styles.card, { backgroundColor: c.background, transform: [{ scale }] }]}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={[styles.title, { color: c.tint }]}>Level Up!</Text>
          <Text style={[styles.level, { color: c.text }]}>Level {newLevel}</Text>
          <Text style={[styles.name, { color: c.icon }]}>{levelName}</Text>
          <Text style={[styles.sub, { color: c.icon }]}>
            You're making real progress. Keep going!
          </Text>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.tint }]}
            onPress={onClose}>
            <Text style={styles.btnText}>Let's Go!</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  emoji: { fontSize: 56, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  level: { fontSize: 42, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  sub: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  btn: {
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 40, marginTop: 8,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});

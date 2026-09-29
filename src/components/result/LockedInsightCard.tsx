import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';
import type { LockedInsight } from '@/types/quiz';

interface Props {
  insight: LockedInsight;
  onPress: () => void;
}

export function LockedInsightCard({ insight, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={['#FFE6F2', '#EFE8FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.imagePlaceholder}
      >
        <Text style={styles.vibeEmoji}>{insight.icon}</Text>
        <View style={styles.lockBadge}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>
      </LinearGradient>

      <View style={styles.copy}>
        <Text numberOfLines={2} style={styles.title}>
          {insight.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    minHeight: 145,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    padding: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    alignItems: 'center',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  imagePlaceholder: {
    width: '100%',
    height: 85,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  vibeEmoji: {
    fontSize: 26,
    opacity: 0.45,
  },
  lockBadge: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  lockIcon: {
    fontSize: 14,
  },
  copy: {
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 16,
  },
});

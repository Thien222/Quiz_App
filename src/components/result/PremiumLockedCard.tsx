import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shadows } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

interface Props {
  title: string;
  onPress?: () => void;
}

export function PremiumLockedCard({ title, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.lock}>
        <Image source={uiAssets.illustrations.premiumLock} resizeMode="contain" style={styles.lockArtwork} />
      </View>
      <View style={styles.copy}>
        <View style={styles.kickerRow}>
          <Text style={styles.kicker}>VIP PASS</Text>
          <Text style={styles.kickerDot}>•</Text>
          <Text style={styles.kickerHighlight}>ĐỘC QUYỀN</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.preview}>Chạm để mở khóa phần phân tích sâu ✨</Text>
      </View>
      <View style={styles.arrowWrap}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#FFFDF7',
    borderWidth: 1.5,
    borderColor: '#FDE9B4',
    shadowColor: colors.gold,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  lock: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: '#FFF4F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  lockArtwork: {
    width: 38,
    height: 38,
  },
  copy: {
    flex: 1,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kicker: {
    color: '#D97706',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  kickerDot: {
    color: '#FBBF24',
    fontSize: 8,
  },
  kickerHighlight: {
    color: colors.primaryDark,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },
  preview: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 3,
  },
  arrowWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: '#D97706',
    fontSize: 18,
    fontWeight: '900',
    marginTop: -2,
  },
});

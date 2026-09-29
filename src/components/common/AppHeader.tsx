import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadows, spacing, typography } from '@/constants/theme';

interface Props {
  title: string;
  eyebrow?: string;
  onBack?: () => void;
  onShare?: () => void;
}

export function AppHeader({ title, eyebrow, onBack, onShare }: Props) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>

      {onShare ? (
        <Pressable
          accessibilityLabel="Chia sẻ"
          accessibilityRole="button"
          onPress={onShare}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Ionicons name="share-social-outline" size={18} color={colors.text} />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xxs,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  pressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.8,
  },
  spacer: {
    width: 40,
  },
  copy: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  eyebrow: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    ...typography.cardTitle,
    textAlign: 'center',
  },
});

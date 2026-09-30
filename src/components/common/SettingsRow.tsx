import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '@/constants/theme';

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  iconBg?: string;
  rightElement?: ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
  style?: ViewStyle;
}

export function SettingsRow({
  title,
  subtitle,
  icon,
  iconBg = '#FFF0F7',
  rightElement,
  onPress,
  showDivider = false,
  style,
}: SettingsRowProps) {
  const content = (
    <>
      <View style={styles.row}>
        {icon ? (
          <View style={[styles.iconBox, { backgroundColor: iconBg }]}>{icon}</View>
        ) : null}

        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {rightElement ? (
          <View style={styles.right}>{rightElement}</View>
        ) : onPress ? (
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        ) : null}
      </View>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.container, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  right: {
    marginLeft: spacing.xs,
    flexShrink: 0,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 58,
  },
  pressed: {
    opacity: 0.78,
    backgroundColor: 'rgba(255, 240, 247, 0.4)',
  },
});

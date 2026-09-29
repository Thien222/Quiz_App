import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '@/constants/theme';

type Props = PropsWithChildren<{ style?: ViewStyle | ViewStyle[] }>;

export function SoftCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: 1.5,
    padding: spacing.md,
    ...shadows.card,
  },
});

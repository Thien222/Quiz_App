import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

export type BadgeVariant = 'pink' | 'purple' | 'green' | 'peach' | 'pearl';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: ReactNode;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'pink', icon, style }: BadgeProps) {
  const variantStyles = (() => {
    switch (variant) {
      case 'purple':
        return {
          container: { backgroundColor: '#F3E8FF', borderColor: '#E9D5FF' },
          text: { color: colors.purple },
        };
      case 'green':
        return {
          container: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },
          text: { color: colors.success },
        };
      case 'peach':
        return {
          container: { backgroundColor: '#FFF7ED', borderColor: '#FFEDD5' },
          text: { color: '#EA580C' },
        };
      case 'pearl':
        return {
          container: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: colors.border },
          text: { color: colors.primaryDark },
        };
      case 'pink':
      default:
        return {
          container: { backgroundColor: '#FFE4E6', borderColor: '#FECDD3' },
          text: { color: colors.primaryDark },
        };
    }
  })();

  return (
    <View style={[styles.badge, variantStyles.container, style]}>
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      <Text style={[styles.text, variantStyles.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  iconWrap: {
    marginRight: 4,
  },
  text: {
    ...typography.badge,
  },
});

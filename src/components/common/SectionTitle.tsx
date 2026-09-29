import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
  style?: ViewStyle;
}

export function SectionTitle({ title, subtitle, rightElement, style }: SectionTitleProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightElement ? <View style={styles.rightWrap}>{rightElement}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    ...typography.sectionTitle,
    fontSize: 20,
    lineHeight: 26,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  rightWrap: {
    marginLeft: spacing.sm,
  },
});

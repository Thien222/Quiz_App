import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors } from '@/constants/theme';
import type { UnlockedInsight } from '@/types/quiz';

interface Props {
  insight: UnlockedInsight;
  onPress?: () => void;
  style?: ViewStyle;
}

export function ResultInsightCard({ insight, onPress, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}
    >
      <View style={styles.iconBubble}>
        <Text style={styles.icon}>{insight.icon}</Text>
      </View>

      <Text numberOfLines={2} style={styles.title}>
        {insight.title}
      </Text>
      <Text numberOfLines={2} style={styles.subtitle}>
        {insight.subtitle}
      </Text>

      <View style={styles.actionWrap}>
        <View style={styles.circleChevron}>
          <Text style={styles.chevron}>›</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 160,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    padding: 12,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    justifyContent: 'space-between',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  actionWrap: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  circleChevron: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF0F6',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '900',
    marginTop: -2,
  },
});

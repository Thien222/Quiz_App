import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import type { DimensionMetric } from '@/types/quiz';
import { colors } from '@/constants/theme';

interface Props {
  metric: DimensionMetric;
  style?: ViewStyle;
}

export function ResultMetricBar({ metric, style }: Props) {
  const clampedScore = Math.min(100, Math.max(0, metric.score));

  return (
    <View style={[styles.card, style]}>
      <View style={styles.row}>
        <View style={styles.iconBubble}>
          <Text style={styles.iconText}>{metric.iconName || '💗'}</Text>
        </View>
        <Text style={styles.score}>{metric.score}</Text>
      </View>
      <Text style={styles.label}>{metric.label}</Text>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={metric.label}
        accessibilityValue={{ min: 0, max: 100, now: clampedScore }}
        style={styles.track}
      >
        <View style={[styles.fill, { width: `${clampedScore}%`, backgroundColor: metric.color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    shadowColor: colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    minHeight: 36,
    lineHeight: 18,
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  score: {
    color: '#3B1C54',
    fontSize: 14,
    fontWeight: '900',
    flexShrink: 0,
  },
  track: {
    height: 6,
    backgroundColor: '#F3EBF7',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});

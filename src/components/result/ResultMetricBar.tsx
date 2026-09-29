import { StyleSheet, Text, View } from 'react-native';
import type { DimensionMetric } from '@/types/quiz';
import { colors } from '@/constants/theme';

interface Props {
  metric: DimensionMetric;
}

export function ResultMetricBar({ metric }: Props) {
  const clampedScore = Math.min(100, Math.max(10, metric.score));

  return (
    <View style={styles.card}>
      <View style={styles.iconBubble}>
        <Text style={styles.iconText}>{metric.iconName || '💗'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>{metric.label}</Text>
          <Text style={styles.score}>{metric.score}</Text>
        </View>

        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${clampedScore}%`, backgroundColor: metric.color },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  label: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  score: {
    color: '#3B1C54',
    fontSize: 14,
    fontWeight: '900',
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

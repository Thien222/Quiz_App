import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';
import { QuizProgressBar } from './QuizProgressBar';

interface Props {
  current: number;
  total: number;
  onBack: () => void;
}

export function QuizHeader({ current, total, onBack }: Props) {
  const progress = total > 0 ? current / total : 0;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          onPress={onBack}
          style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>

        <View style={styles.counterWrap}>
          <Text style={styles.counterText}>
            Câu <Text style={styles.counterHighlight}>{current}/{total}</Text>
          </Text>
        </View>

        <View style={styles.spacer} />
      </View>

      <View style={styles.progressWrap}>
        <QuizProgressBar progress={progress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  backBtnPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.8,
  },
  backChevron: {
    color: '#6B4080',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 28,
    marginTop: -2,
    marginLeft: -2,
  },
  counterWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  counterHighlight: {
    color: '#E11D48',
    fontWeight: '900',
  },
  spacer: {
    width: 42,
  },
  progressWrap: {
    paddingHorizontal: 16,
  },
});

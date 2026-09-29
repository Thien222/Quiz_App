import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { gradients } from '@/constants/theme';

interface Props {
  progress: number; // 0 to 1
}

export function QuizProgressBar({ progress }: Props) {
  const clampedProgress = Math.min(1, Math.max(0.05, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.barWrapper, { width: `${clampedProgress * 100}%` }]}>
        <LinearGradient
          colors={gradients.primaryBtn}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 7,
    backgroundColor: '#F3E8F8',
    borderRadius: 999,
    overflow: 'hidden',
    width: '100%',
  },
  barWrapper: {
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 999,
  },
});

import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, gradients } from '@/constants/theme';
import { characterGenderAssets, uiAssets } from '@/constants/assets';
import { useUserStore } from '@/stores/useUserStore';
import { useQuizStore } from '@/stores/useQuizStore';
import { calculateQuizResult } from '@/features/quiz/scoring';
import { pickGenderAsset } from '@/utils/genderAsset';

const analyzingSteps = [
  'Đang đọc vị trái tim bạn... 💗',
  'Đang tính toán mức độ dính người... ✨',
  'Đang đo lường chỉ số nhõng nhẽo... 🧸',
  'Đang giải mã gu tình yêu tiềm ẩn... 🔮',
  'Gần xong rồi nè, kết quả bất ngờ lắm đó! 🎉',
];

export default function QuizAnalyzingScreen() {
  const router = useRouter();

  const genderTheme = useUserStore((state) => state.genderTheme);
  const { activeQuestions, answers, setResult } = useQuizStore();

  const [stepIndex, setStepIndex] = useState(0);

  // Pulse animation for mascot
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(withTiming(1.08, { duration: 600 }), withTiming(1, { duration: 600 })),
      -1,
      true
    );

    rotate.value = withRepeat(
      withSequence(withTiming(-5, { duration: 700 }), withTiming(5, { duration: 700 })),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  // Step cycling & Result computation
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % analyzingSteps.length);
    }, 700);

    const timer = setTimeout(() => {
      const sessionId = `session-${Date.now()}`;
      const result = calculateQuizResult({
        sessionId,
        quizId: 'love-style',
        questions: activeQuestions,
        answers,
      });

      setResult(result);
      router.replace({
        pathname: '/quiz/result/[sessionId]',
        params: { sessionId },
      });
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const mascotSource = pickGenderAsset(characterGenderAssets, genderTheme);

  return (
    <LinearGradient colors={['#FFF5F8', '#F6EFFE', '#FFF0F5']} style={styles.screen}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          {/* Animated Mascot */}
          <View style={styles.mascotWrapper}>
            <View style={styles.glow} />
            <Animated.View style={[styles.mascotCard, animatedStyle]}>
              <Image source={mascotSource} resizeMode="contain" style={styles.mascotArtwork} />
            </Animated.View>
          </View>

          {/* Title and Rotating Status */}
          <View style={styles.textWrap}>
            <Text style={styles.title}>Nè bạn ơi ✨</Text>
            <Text style={styles.statusText}>{analyzingSteps[stepIndex]}</Text>
          </View>

          {/* Cute Loading Dots */}
          <View style={styles.dots}>
            <View style={[styles.dot, stepIndex % 3 === 0 && styles.dotActive]} />
            <View style={[styles.dot, stepIndex % 3 === 1 && styles.dotActive]} />
            <View style={[styles.dot, stepIndex % 3 === 2 && styles.dotActive]} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  mascotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    height: 240,
  },
  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(244, 114, 182, 0.25)',
  },
  mascotCard: {
    width: 210,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotArtwork: {
    width: '100%',
    height: '100%',
  },
  textWrap: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  statusText: {
    color: '#D81B60',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    minHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5D6EA',
  },
  dotActive: {
    backgroundColor: '#F43F5E',
    width: 24,
  },
});

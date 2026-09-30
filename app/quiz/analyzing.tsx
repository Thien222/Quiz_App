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
import { colors } from '@/constants/theme';
import { characterGenderAssets } from '@/constants/assets';
import { useUserStore } from '@/stores/useUserStore';
import { useQuizStore } from '@/stores/useQuizStore';
import { calculateQuizResult } from '@/features/quiz/scoring';
import { pickGenderAsset } from '@/utils/genderAsset';
import { useResponsiveLayout } from '@/utils/responsive';

const analyzingSteps = [
  'Đang đọc vị trái tim bạn... 💗',
  'Đang tính toán mức độ dính người... ✨',
  'Đang đo lường chỉ số nhõng nhẽo... 🧸',
  'Đang giải mã gu tình yêu tiềm ẩn... 🔮',
  'Gần xong rồi nè, kết quả bất ngờ lắm đó! 🎉',
];

export default function QuizAnalyzingScreen() {
  const router = useRouter();
  const { width, height, isSmallPhone } = useResponsiveLayout();

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
  const mascotSize = Math.min(width * 0.55, height * 0.28, 220);

  return (
    <LinearGradient colors={['#FFF5F8', '#F6EFFE', '#FFF0F5']} style={styles.screen}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
        <View style={styles.content}>
          {/* Animated Mascot */}
          <View style={[styles.mascotWrapper, { width: mascotSize, height: mascotSize }]}>
            <View
              style={[
                styles.glow,
                {
                  width: mascotSize * 0.95,
                  height: mascotSize * 0.95,
                  borderRadius: mascotSize * 0.48,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.mascotCard,
                { width: mascotSize * 0.9, height: mascotSize * 0.9 },
                animatedStyle,
              ]}
            >
              <Image
                source={mascotSource}
                resizeMode="contain"
                style={styles.mascotArtwork}
              />
            </Animated.View>
          </View>

          {/* Title and Rotating Status */}
          <View style={styles.textWrap}>
            <Text style={[styles.title, isSmallPhone && styles.titleSmall]}>Nè bạn ơi ✨</Text>
            <Text style={[styles.statusText, isSmallPhone && styles.statusTextSmall]}>
              {analyzingSteps[stepIndex]}
            </Text>
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
    gap: 18,
  },
  mascotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(244, 114, 182, 0.25)',
  },
  mascotCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotArtwork: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  textWrap: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  titleSmall: {
    fontSize: 22,
  },
  statusText: {
    color: '#D81B60',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    minHeight: 24,
  },
  statusTextSmall: {
    fontSize: 14,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
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

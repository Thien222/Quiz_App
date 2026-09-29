import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizTag } from '@/components/quiz/QuizTag';
import { QuizHeroImage } from '@/components/quiz/QuizHeroImage';
import { QuizOptionCard } from '@/components/quiz/QuizOptionCard';
import { QuizFooterHint } from '@/components/quiz/QuizFooterHint';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { colors } from '@/constants/theme';
import { useQuizStore } from '@/stores/useQuizStore';
import { useUserStore } from '@/stores/useUserStore';

export default function QuizPlayScreen() {
  const router = useRouter();

  const {
    activeQuestions,
    currentIndex,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
  } = useQuizStore();

  const { addSeenQuestionIds } = useUserStore();

  const question = activeQuestions[currentIndex];
  const isLast = currentIndex === activeQuestions.length - 1;
  const currentSelectedOptionId = question ? answers[question.id] : null;

  // Fallback nếu người dùng vào thẳng màn play mà chưa khởi tạo session
  useEffect(() => {
    if (!activeQuestions || activeQuestions.length === 0) {
      router.replace('/quiz/love-style');
    }
  }, [activeQuestions]);

  if (!question) return null;

  const handleNext = () => {
    if (!currentSelectedOptionId) return;

    if (isLast) {
      // Lưu danh sách câu đã gặp để phiên sau ưu tiên câu mới
      const allQuestionIds = activeQuestions.map((q) => q.id);
      addSeenQuestionIds(allQuestionIds);

      router.replace('/quiz/analyzing');
    } else {
      nextQuestion();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      prevQuestion();
    } else {
      Alert.alert(
        'Dừng bài trắc nghiệm?',
        'Tiến trình câu hỏi hiện tại sẽ được lưu lại. Bạn có muốn quay về không?',
        [
          { text: 'Làm tiếp', style: 'cancel' },
          { text: 'Quay về', style: 'destructive', onPress: () => router.back() },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <QuizHeader
        current={currentIndex + 1}
        total={activeQuestions.length}
        onBack={handleBack}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Animated Question Container (Ref: 03_quiz_food_scenario.png) */}
        <Animated.View
          key={question.id}
          entering={FadeInRight.duration(280)}
          exiting={FadeOutLeft.duration(200)}
          style={styles.questionBlock}
        >
          {/* Category Tag */}
          <QuizTag tag={question.tag} />

          {/* Question Title */}
          <View style={styles.titleWrap}>
            <Text style={styles.questionText}>
              {question.question}{' '}
              {question.scenarioHighlight ? (
                <Text style={styles.highlightText}>{question.scenarioHighlight}</Text>
              ) : null}
            </Text>
          </View>

          {/* Large Hero Illustration (Gender-Aware) */}
          <QuizHeroImage heroImage={question.heroImage} />

          {/* Option Cards with Radio Indicator on the left */}
          <View style={styles.optionsWrap}>
            {question.options.map((option) => (
              <QuizOptionCard
                key={option.id}
                optionKey={option.label}
                text={option.text}
                thumbnail={option.thumbnail}
                selected={currentSelectedOptionId === option.id}
                onPress={() => selectAnswer(question.id, option.id)}
              />
            ))}
          </View>

          {/* Helper Footer Hint */}
          <QuizFooterHint text={question.helperHint} />
        </Animated.View>
      </ScrollView>

      {/* Fixed Sticky CTA Button */}
      <View style={styles.footer}>
        <GradientCTAButton
          label={isLast ? 'Xem kết quả' : 'Tiếp tục'}
          rightIcon={<Text style={styles.arrowIcon}>→</Text>}
          disabled={!currentSelectedOptionId}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 24,
  },
  questionBlock: {
    gap: 12,
  },
  titleWrap: {
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  questionText: {
    color: '#2A0D45',
    fontSize: 21,
    lineHeight: 29,
    fontWeight: '900',
    textAlign: 'center',
  },
  highlightText: {
    color: '#D81B60',
    fontWeight: '900',
  },
  optionsWrap: {
    gap: 10,
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(252, 231, 243, 0.6)',
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginTop: -2,
  },
});

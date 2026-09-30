import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppDialog } from '@/components/common/AppDialog';
import { TextButton } from '@/components/common/Buttons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizTag } from '@/components/quiz/QuizTag';
import { QuizHeroImage } from '@/components/quiz/QuizHeroImage';
import { QuizOptionCard } from '@/components/quiz/QuizOptionCard';
import { QuizFooterHint } from '@/components/quiz/QuizFooterHint';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors } from '@/constants/theme';
import { useQuizStore } from '@/stores/useQuizStore';
import { useUserStore } from '@/stores/useUserStore';
import { useResponsiveLayout } from '@/utils/responsive';

export default function QuizPlayScreen() {
  const router = useRouter();
  const [showExit, setShowExit] = useState(false);
  const { isSmallPhone } = useResponsiveLayout();

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
      setShowExit(true);
    }
  };

  return (
    <ScreenContainer
      scrollResetKey={question.id}
      edges={['top', 'bottom']}
      header={
        <QuizHeader
          current={currentIndex + 1}
          total={activeQuestions.length}
          onBack={handleBack}
        />
      }
      footer={
        <View style={styles.footer}>
          <GradientCTAButton
            label={isLast ? 'Xem kết quả' : 'Tiếp tục'}
            rightIcon={<Text style={styles.arrowIcon}>→</Text>}
            disabled={!currentSelectedOptionId}
            onPress={handleNext}
          />
        </View>
      }
      contentContainerStyle={styles.content}
    >
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
          <Text style={[styles.questionText, isSmallPhone && styles.questionTextSmall]}>
            {question.question}{' '}
            {question.scenarioHighlight ? (
              <Text style={styles.highlightText}>{question.scenarioHighlight}</Text>
            ) : null}
          </Text>
        </View>

        {/* Large Hero Illustration (Gender-Aware, with aspectRatio) */}
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
      <AppDialog
        visible={showExit}
        title="Tạm dừng một chút?"
        onClose={() => setShowExit(false)}
        actions={
          <>
            <GradientCTAButton label="Làm tiếp" onPress={() => setShowExit(false)} />
            <TextButton label="Về trang chủ" onPress={() => { setShowExit(false); router.replace('/(tabs)'); }} />
          </>
        }
      >
        <Text style={styles.dialogCopy}>Các lựa chọn hiện tại đã được lưu. Bạn có thể tiếp tục bài đang làm từ trang chủ.</Text>
      </AppDialog>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  dialogCopy: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
  content: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  questionBlock: {
    gap: 10,
  },
  titleWrap: {
    paddingHorizontal: 8,
    alignItems: 'center',
    marginTop: 2,
  },
  questionText: {
    color: '#2A0D45',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  questionTextSmall: {
    fontSize: 18,
    lineHeight: 24,
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
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginTop: -2,
  },
});

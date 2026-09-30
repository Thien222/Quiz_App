import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/common/AppHeader';
import { Badge } from '@/components/common/Badge';
import { PrimaryButton } from '@/components/common/Buttons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors, gradients, radius, shadows, spacing, typography } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useUserStore } from '@/stores/useUserStore';
import { useQuizStore } from '@/stores/useQuizStore';
import { selectQuizQuestions } from '@/features/quiz/questionSelector';
import { useResponsiveLayout } from '@/utils/responsive';
import type { GenderTheme } from '@/types/quiz';

const previewOptions = [
  { text: 'Lo lắng và nghĩ nhiều lắm 🥺' },
  { text: 'Bình tĩnh, mình tin đối phương 😌' },
  { text: 'Tự tìm việc khác để làm 🥰' },
];

const benefitItems = [
  {
    icon: uiAssets.illustrations.glossyHeart,
    title: 'Kiểu yêu của bạn',
    subtitle: 'Bạn thuộc kiểu người yêu ngọt ngào, độc lập hay chu đáo?',
  },
  {
    icon: uiAssets.illustrations.loveFlag,
    title: 'Red flag tiềm ẩn',
    subtitle: 'Những phản xạ cảm xúc bạn dễ bỏ qua khi yêu',
  },
  {
    icon: uiAssets.illustrations.cuteStar,
    title: 'Điểm đáng yêu',
    subtitle: 'Nét tính cách đặc biệt khiến bạn luôn có sức hút',
  },
  {
    icon: uiAssets.illustrations.heartBalloons,
    title: 'Người hợp với bạn',
    subtitle: 'Tần số năng lượng và mẫu người tương thích nhất',
  },
];

export default function QuizIntroScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { genderTheme, setGenderTheme, seenQuestionIds } = useUserStore();
  const startSession = useQuizStore((state) => state.startSession);
  const { isSmallPhone } = useResponsiveLayout();

  const [previewSelected, setPreviewSelected] = useState<number | null>(0);

  const handleStart = () => {
    const questions = selectQuizQuestions({
      count: 20,
      seenQuestionIds,
    });

    startSession(questions);
    router.push('/quiz/play');
  };

  return (
    <ScreenContainer
      edges={['top', 'bottom']}
      header={<AppHeader title="Bạn yêu như thế nào?" onBack={() => router.back()} />}
      footer={
        <View style={styles.footerCTA}>
          <PrimaryButton
            label="Bắt đầu làm quiz"
            icon={<Ionicons name="play" size={16} color="#FFFFFF" />}
            showChevron
            onPress={handleStart}
          />
        </View>
      }
      contentContainerStyle={styles.content}
    >
      {/* 1. Hero Artwork Banner */}
      <LinearGradient
        colors={gradients.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Image
          source={uiAssets.generated.onboardingCouple}
          resizeMode="contain"
          style={styles.heroArtwork}
        />
        <View style={styles.freeBadgeWrap}>
          <Badge label="FREE" variant="green" />
        </View>
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>Yêu là hiểu{`\n`}mình hơn{`\n`}mỗi ngày ♡</Text>
        </View>
      </LinearGradient>

        {/* 2. Lead Summary */}
        <View style={styles.leadCard}>
          <Text style={styles.leadText}>
            <Text style={styles.leadHighlight}>20 câu hỏi siêu thật</Text> về cách bạn yêu, cách
            bạn giận và điều bạn <Text style={styles.leadBold}>cần</Text> trong một mối quan hệ. 💗
          </Text>
        </View>

        {/* 3. Quick Stats (Standardized System Icons) */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="time-outline" size={18} color={colors.primaryDark} />
            </View>
            <Text style={styles.statTitle}>~2 phút</Text>
            <Text style={styles.statSub}>Nhanh gọn</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="sparkles-outline" size={18} color={colors.primaryDark} />
            </View>
            <Text style={styles.statTitle}>20 câu</Text>
            <Text style={styles.statSub}>Đời thực</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="heart-outline" size={18} color={colors.primaryDark} />
            </View>
            <Text style={styles.statTitle}>Cá nhân hóa</Text>
            <Text style={styles.statSub}>Theo bạn</Text>
          </View>
        </View>

        {/* 4. Gender Personalization Chips */}
        <View style={styles.genderCard}>
          <Text style={styles.genderTitle}>Nhân vật bạn muốn hóa thân:</Text>
          <View style={styles.genderRow}>
            {[
              { key: 'female', label: '👩 Bạn Nữ' },
              { key: 'male', label: '👦 Bạn Nam' },
              { key: 'neutral', label: '💑 Cặp đôi' },
            ].map((item) => (
              <Pressable
                key={item.key}
                accessibilityRole="radio"
                accessibilityState={{ checked: genderTheme === item.key }}
                aria-checked={genderTheme === item.key}
                onPress={() => setGenderTheme(item.key as GenderTheme)}
                style={[
                  styles.genderChip,
                  genderTheme === item.key && styles.genderChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.genderChipText,
                    genderTheme === item.key && styles.genderChipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 5. Benefit List (3D Pastel Assets, no raw emoji icons) */}
        <View style={styles.discoverCard}>
          <View style={styles.discoverHeader}>
            <Text style={styles.discoverTitle}>Bạn sẽ khám phá</Text>
            <Badge label="4 MỤC CHUYÊN SÂU" variant="pink" />
          </View>

          <View style={styles.discoverList}>
            {benefitItems.map((item, idx) => (
              <View
                key={item.title}
                style={[
                  styles.discoverRow,
                  idx < benefitItems.length - 1 && styles.discoverRowBorder,
                ]}
              >
                <View style={styles.benefitIconBox}>
                  <Image source={item.icon} resizeMode="contain" style={styles.benefitIcon} />
                </View>
                <View style={styles.benefitCopy}>
                  <Text style={styles.benefitTitle}>{item.title}</Text>
                  <Text style={styles.benefitSub}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 6. Sample Question (Compact footprint) */}
        <View style={styles.exampleCard}>
          <View style={styles.exampleHeader}>
            <Badge label="XEM TRƯỚC CÂU HỎI" variant="pearl" />
            <Text style={styles.exampleBadge}>Câu 1/20</Text>
          </View>
          <Text style={styles.exampleQuestion}>
            Khi người yêu lâu trả lời tin nhắn, bạn thường cảm thấy thế nào?
          </Text>

          <View style={styles.previewGrid}>
            {previewOptions.map((opt, idx) => (
              <Pressable
                key={opt.text}
                accessibilityRole="radio"
                accessibilityState={{ checked: previewSelected === idx }}
                aria-checked={previewSelected === idx}
                onPress={() => setPreviewSelected(idx)}
                style={[
                  styles.previewItem,
                  previewSelected === idx && styles.previewItemActive,
                ]}
              >
                <View
                  style={[
                    styles.radioCircle,
                    previewSelected === idx && styles.radioCircleActive,
                  ]}
                >
                  {previewSelected === idx ? <View style={styles.radioDot} /> : null}
                </View>
                <Text
                  style={[
                    styles.previewText,
                    previewSelected === idx && styles.previewTextActive,
                  ]}
                >
                  {opt.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  hero: {
    width: '100%',
    aspectRatio: 16 / 10,
    maxHeight: 220,
    minHeight: 160,
    borderRadius: radius.hero,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    ...shadows.hero,
  },
  heroArtwork: {
    width: '85%',
    height: '85%',
    aspectRatio: 1,
  },
  freeBadgeWrap: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  speechBubble: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  speechText: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 13,
    textAlign: 'center',
  },
  leadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
  },
  leadText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 23,
    fontWeight: '600',
  },
  leadHighlight: {
    color: colors.primaryDark,
    fontWeight: '900',
  },
  leadBold: {
    fontWeight: '900',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: 2,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statTitle: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.text,
    fontSize: 12,
    textAlign: 'center',
  },
  statSub: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
    textAlign: 'center',
  },
  genderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.soft,
  },
  genderTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  genderChip: {
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: '#FFF5F8',
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    alignItems: 'center',
  },
  genderChipActive: {
    backgroundColor: '#FFE4E6',
    borderColor: colors.primaryDark,
  },
  genderChipText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  genderChipTextActive: {
    color: colors.primaryDark,
    fontWeight: '900',
  },
  discoverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
  },
  discoverHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  discoverTitle: {
    ...typography.cardTitle,
    fontSize: 17,
  },
  discoverList: {
    gap: 0,
  },
  discoverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  discoverRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  benefitIconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  benefitIcon: {
    width: 24,
    height: 24,
  },
  benefitCopy: {
    flex: 1,
  },
  benefitTitle: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  benefitSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  exampleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exampleBadge: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  exampleQuestion: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  previewGrid: {
    gap: 8,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: '#FFF7FA',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  previewItemActive: {
    backgroundColor: '#FFE4E6',
    borderColor: colors.primaryDark,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: colors.primaryDark,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryDark,
  },
  previewText: {
    flex: 1,
    ...typography.caption,
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  previewTextActive: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  footerCTA: {
    paddingVertical: spacing.xs,
    backgroundColor: 'transparent',
  },
});

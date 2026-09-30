import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppDialog } from '@/components/common/AppDialog';
import type { UnlockedInsight } from '@/types/quiz';
import { Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { ResultMetricBar } from '@/components/result/ResultMetricBar';
import { ResultInsightCard } from '@/components/result/ResultInsightCard';
import { LockedInsightCard } from '@/components/result/LockedInsightCard';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors, shadows } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useQuizStore } from '@/stores/useQuizStore';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import { archetypes } from '@/data/archetypes';
import { useResponsiveLayout } from '@/utils/responsive';

export default function ResultScreen() {
  const router = useRouter();
  const [selectedInsight, setSelectedInsight] = useState<UnlockedInsight | null>(null);
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  const currentResult = useQuizStore((state) => state.currentResult);
  const genderTheme = useUserStore((state) => state.genderTheme);
  const {
    isSmallPhone,
    isTablet,
    contentWidth,
    getGridItemWidth,
    getCarouselItemWidth,
  } = useResponsiveLayout();

  // Fallback nếu người dùng F5 hoặc vào thẳng link
  const result = currentResult || {
    sessionId: sessionId || 'demo',
    quizId: 'love-style',
    archetype: archetypes[0],
    dimensionScores: { affection: 82, communication: 75, sensitivity: 56, compromise: 79 },
    metrics: [
      { key: 'affection', label: 'Dính người', score: 82, color: '#F472B6', iconName: '💖' },
      { key: 'communication', label: 'Tinh tế', score: 75, color: '#A78BFA', iconName: '⭐' },
      { key: 'sensitivity', label: 'Hay tủi thân', score: 56, color: '#60A5FA', iconName: '🥺' },
      { key: 'compromise', label: 'Biết chiều người yêu', score: 79, color: '#F43F5E', iconName: '🤲' },
    ],
    completedAt: new Date().toISOString(),
  };

  const heroCharacter = pickGenderAsset(result.archetype.heroImage, genderTheme);

  const handleShare = () => {
    Share.share({
      message: `Mình vừa làm quiz trên Nè Bạn Ơi và là kiểu "${result.archetype.title}" (${result.archetype.subtitle}) nè! Khám phá ngay cùng mình nhé! 💖`,
    });
  };

  // Responsive calculations
  const cardInnerWidth = contentWidth - 35;
  const metricColumns = isSmallPhone ? 1 : 2;
  const metricGap = 8;
  const metricBarWidth = getGridItemWidth(metricColumns, metricGap, cardInnerWidth);

  const carouselGap = 10;
  const visibleCards = isTablet ? 3.15 : 1.8;
  const insightCardWidth = getCarouselItemWidth(visibleCards, carouselGap);
  const characterSize = isSmallPhone ? 95 : 120;

  return (
    <ScreenContainer
      edges={['top', 'bottom']}
      header={
        <AppHeader
          title="Nè Bạn Ơi ♥"
          onBack={() => router.replace('/(tabs)')}
          onShare={handleShare}
        />
      }
      contentContainerStyle={styles.content}
    >
      {/* Title Header with floating hearts */}
      <View style={styles.titleSection}>
        <Text style={[styles.resultMainTitle, isSmallPhone && styles.resultMainTitleSmall]}>
          Kết quả của bạn ✨
        </Text>
        <Text style={styles.resultSubTitle}>
          Đây là kết quả dựa trên những lựa chọn của bạn 💗
        </Text>
      </View>

      {/* Hero Archetype Big Card (Ref: 04_result_kawaii.png) */}
      <View style={styles.archetypeCard}>
        <View style={styles.archetypeHeaderRow}>
          <View style={styles.archetypeTag}>
            <Text style={styles.archetypeTagText}>💗 Bạn là kiểu:</Text>
          </View>
        </View>

        <View style={styles.heroLayoutRow}>
          <View style={styles.heroTextCol}>
            <Text style={[styles.archetypeTitle, isSmallPhone && styles.archetypeTitleSmall]}>
              {result.archetype.title.toUpperCase()}
            </Text>
            <Text style={styles.archetypeSummary}>{result.archetype.summary}</Text>
          </View>

          {heroCharacter ? (
            <View
              style={[
                styles.characterWrap,
                { width: characterSize, height: characterSize },
              ]}
            >
              <Image
                source={heroCharacter}
                resizeMode="contain"
                style={styles.characterImg}
              />
              <View style={styles.speechTag}>
                <Text style={styles.speechTagText} numberOfLines={2}>
                  {result.archetype.quote}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* 4 Dimension Metric Bars Grid */}
        <View style={[styles.metricsGrid, { gap: metricGap }]}>
          {result.metrics.map((metric) => (
            <ResultMetricBar
              key={metric.key}
              metric={metric}
              style={{ width: metricBarWidth }}
            />
          ))}
        </View>
      </View>

      {/* Section 1: Bạn đã mở miễn phí 🎉 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎁 Bạn đã mở miễn phí 🎉</Text>
        <Text style={styles.sectionSub}>Đây là những nội dung bạn có thể xem ngay nè!</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={insightCardWidth + carouselGap}
        decelerationRate="fast"
        contentContainerStyle={[styles.horizontalScroll, { gap: carouselGap }]}
      >
        {result.archetype.freeInsights.map((insight) => (
          <ResultInsightCard
            key={insight.id}
            insight={insight}
            onPress={() => setSelectedInsight(insight)}
            style={{ width: insightCardWidth }}
          />
        ))}
      </ScrollView>

      {/* Section 2: Còn 4 mục nữa đang chờ bạn 💜 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔒 Còn {result.archetype.lockedInsights.length} mục đang chờ bạn</Text>
        <Text style={styles.sectionSub}>
          Mở khóa để khám phá trọn bộ kết quả chi tiết và thú vị hơn!
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={insightCardWidth + carouselGap}
        decelerationRate="fast"
        contentContainerStyle={[styles.horizontalScroll, { gap: carouselGap }]}
      >
        {result.archetype.lockedInsights.map((insight) => (
          <LockedInsightCard
            key={insight.id}
            insight={insight}
            onPress={() => router.push('/premium')}
            style={{ width: insightCardWidth }}
          />
        ))}
      </ScrollView>

      {/* Big Premium CTA Banner (Ref: 04_result_kawaii.png) */}
      <AppDialog visible={selectedInsight !== null} title={selectedInsight?.title ?? ''} onClose={() => setSelectedInsight(null)}>
        <Text style={styles.insightDescription}>{selectedInsight?.description}</Text>
      </AppDialog>
      <View style={styles.actionsWrap}>
        <GradientCTAButton
          label="Mở khóa toàn bộ kết quả"
          icon={
            <Image
              source={uiAssets.illustrations.crown}
              resizeMode="contain"
              style={styles.crownIcon}
            />
          }
          showChevron
          onPress={() => router.push('/premium')}
          style={styles.mainCta}
        />
        <Text style={styles.pricingHint}>Chỉ từ 10.000đ hoặc VIP Pass 49.000đ</Text>

        <GradientCTAButton
          label="Về trang chủ"
          variant="pearl"
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  insightDescription: { color: colors.textSecondary, fontSize: 16, lineHeight: 25 },
  content: {
    paddingTop: 6,
    paddingBottom: 40,
    gap: 16,
  },
  titleSection: {
    alignItems: 'center',
    gap: 4,
  },
  resultMainTitle: {
    color: '#3B1C54',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  resultMainTitleSmall: {
    fontSize: 23,
  },
  resultSubTitle: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  archetypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    padding: 16,
    ...shadows.soft,
    gap: 14,
  },
  archetypeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  archetypeTag: {
    backgroundColor: '#FFE4F0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  archetypeTagText: {
    color: '#D81B60',
    fontSize: 11,
    fontWeight: '800',
  },
  heroLayoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  heroTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  archetypeTitle: {
    color: '#F43F5E',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
  },
  archetypeTitleSmall: {
    fontSize: 20,
    lineHeight: 25,
  },
  archetypeSummary: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  characterWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  characterImg: {
    width: '100%',
    height: '100%',
  },
  speechTag: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    maxWidth: 130,
  },
  speechTagText: {
    color: colors.primaryDark,
    fontSize: 8.5,
    fontWeight: '800',
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  sectionHeader: {
    gap: 3,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  sectionSub: {
    color: colors.textSecondary,
    fontSize: 11.5,
  },
  horizontalScroll: {
    paddingVertical: 4,
  },
  actionsWrap: {
    marginTop: 8,
    gap: 8,
    alignItems: 'center',
    width: '100%',
  },
  mainCta: {
    width: '100%',
  },
  crownIcon: {
    width: 22,
    height: 22,
    marginRight: 4,
  },
  pricingHint: {
    color: colors.primaryDark,
    fontSize: 11.5,
    fontWeight: '800',
    marginBottom: 4,
  },
});

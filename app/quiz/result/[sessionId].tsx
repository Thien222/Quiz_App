import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { ResultMetricBar } from '@/components/result/ResultMetricBar';
import { ResultInsightCard } from '@/components/result/ResultInsightCard';
import { LockedInsightCard } from '@/components/result/LockedInsightCard';
import { colors, gradients, shadows } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useQuizStore } from '@/stores/useQuizStore';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import { archetypes } from '@/data/archetypes';

export default function ResultScreen() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  const currentResult = useQuizStore((state) => state.currentResult);
  const genderTheme = useUserStore((state) => state.genderTheme);

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

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader
        title="Nè Bạn Ơi ♥"
        onBack={() => router.replace('/(tabs)')}
        onShare={handleShare}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Header with floating hearts */}
        <View style={styles.titleSection}>
          <Text style={styles.resultMainTitle}>Kết quả của bạn ✨</Text>
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
              <Text style={styles.archetypeTitle}>{result.archetype.title.toUpperCase()}</Text>
              <Text style={styles.archetypeSummary}>{result.archetype.summary}</Text>
            </View>

            {heroCharacter ? (
              <View style={styles.characterWrap}>
                <Image source={heroCharacter} resizeMode="contain" style={styles.characterImg} />
                <View style={styles.speechTag}>
                  <Text style={styles.speechTagText}>{result.archetype.quote}</Text>
                </View>
              </View>
            ) : null}
          </View>

          {/* 4 Dimension Metric Bars Grid */}
          <View style={styles.metricsGrid}>
            {result.metrics.map((metric) => (
              <ResultMetricBar key={metric.key} metric={metric} />
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
          contentContainerStyle={styles.horizontalScroll}
        >
          {result.archetype.freeInsights.map((insight) => (
            <ResultInsightCard key={insight.id} insight={insight} />
          ))}
        </ScrollView>

        {/* Section 2: Còn 4 mục nữa đang chờ bạn 💜 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🔒 Còn 4 mục nữa đang chờ bạn 💜</Text>
          <Text style={styles.sectionSub}>
            Mở khóa để khám phá trọn bộ kết quả chi tiết và thú vị hơn!
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {result.archetype.lockedInsights.map((insight) => (
            <LockedInsightCard
              key={insight.id}
              insight={insight}
              onPress={() => router.push('/premium')}
            />
          ))}
        </ScrollView>

        {/* Big Premium CTA Banner (Ref: 04_result_kawaii.png) */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 40, gap: 16 },
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
  resultSubTitle: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: '600',
  },
  archetypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
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
    gap: 8,
  },
  archetypeTitle: {
    color: '#F43F5E',
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
  },
  archetypeSummary: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  characterWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: 9,
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
    gap: 10,
    paddingVertical: 4,
  },
  actionsWrap: {
    marginTop: 8,
    gap: 8,
    alignItems: 'center',
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

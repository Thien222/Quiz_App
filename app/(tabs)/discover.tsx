import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Badge, type BadgeVariant } from '@/components/common/Badge';
import { colors, gradients, radius, shadows, spacing, typography } from '@/constants/theme';
import { characterGenderAssets, uiAssets } from '@/constants/assets';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import { useResponsiveLayout } from '@/utils/responsive';

interface QuizItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeVariant: BadgeVariant;
  image: any;
  href: string;
}

export default function Discover() {
  const router = useRouter();
  const genderTheme = useUserStore((state) => state.genderTheme);
  const heroCharacter = pickGenderAsset(characterGenderAssets, genderTheme);
  const { isSmallPhone, getGridItemWidth } = useResponsiveLayout();

  const columns = 2;
  const gridGap = isSmallPhone ? 8 : 12;
  const cardWidth = getGridItemWidth(columns, gridGap);

  const quizzes: QuizItem[] = [
    {
      id: 'love-style',
      title: 'Bạn yêu như thế nào?',
      subtitle: 'Khám phá phong cách yêu và gu người thương',
      badge: 'FREE',
      badgeVariant: 'green',
      image: heroCharacter,
      href: '/quiz/love-style',
    },
    {
      id: 'red-flags',
      title: 'Red flag khi yêu',
      subtitle: 'Những dấu hiệu bạn dễ dàng bỏ qua',
      badge: 'HOT',
      badgeVariant: 'pink',
      image: uiAssets.illustrations.glossyHeart,
      href: '/premium',
    },
    {
      id: 'future-partner',
      title: 'Người yêu tương lai',
      subtitle: 'Người ấy sẽ mang vibe gì đặc biệt?',
      badge: 'AI',
      badgeVariant: 'purple',
      image: uiAssets.generated.futurePartnerPolaroids,
      href: '/future-partner',
    },
    {
      id: 'daily',
      title: 'Thông điệp hôm nay',
      subtitle: 'Một lời nhắn ngọt ngào cho trái tim',
      badge: 'DAILY',
      badgeVariant: 'peach',
      image: uiAssets.illustrations.loveLetter,
      href: '/daily',
    },
  ];

  return (
    <ScreenContainer>
      {/* 1. Compact Heading (Title + subtitle closer together) */}
      <View style={styles.heading}>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>Khám phá</Text>
          <Text style={styles.copy}>Chọn một điều khiến bạn tò mò hôm nay 💗</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="sparkles-outline" size={20} color={colors.primaryDark} />
        </View>
      </View>

      {/* 2. Top Hero Discovery Banner (Flexible text & art, no text overlap) */}
      <Pressable
        onPress={() => router.push('/quiz/love-style')}
        style={({ pressed }) => [styles.bannerWrapper, pressed && styles.cardPressed]}
      >
        <LinearGradient
          colors={gradients.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerTextZone}>
            <Badge
              label="DÀNH CHO BẠN"
              variant="pearl"
              icon={<Ionicons name="heart" size={10} color={colors.primaryDark} />}
            />
            <Text style={[styles.bannerTitle, isSmallPhone && styles.bannerTitleSmall]}>
              Hiểu trái tim mình qua từng câu hỏi nhỏ
            </Text>
            <Text style={styles.bannerSub}>Biên tập riêng cho bạn trẻ Gen-Z</Text>
          </View>
          <View style={styles.bannerArtZone}>
            <Image
              source={uiAssets.generated.quizLoveCards}
              resizeMode="contain"
              style={styles.bannerImage}
            />
          </View>
        </LinearGradient>
      </Pressable>

      {/* 3. Popular Quiz Section Header */}
      <SectionTitle
        title="Quiz đang được yêu thích"
        subtitle="Dành vài phút để thấu hiểu bản thân"
        style={styles.sectionHeader}
      />

      {/* 4. Calculated Dynamic Grid */}
      <View style={[styles.grid, { gap: gridGap }]}>
        {quizzes.map((quiz) => (
          <Pressable
            key={quiz.id}
            accessibilityRole="button"
            accessibilityLabel={quiz.title}
            onPress={() => router.push(quiz.href as any)}
            style={({ pressed }) => [
              styles.card,
              { width: cardWidth },
              pressed && styles.cardPressed,
            ]}
          >
            {/* Standard Image Wrap (aspectRatio contain, top-right badge) */}
            <View style={styles.imageWrap}>
              <Image source={quiz.image} resizeMode="contain" style={styles.cardImage} />
              <View style={styles.badgeWrap}>
                <Badge label={quiz.badge} variant={quiz.badgeVariant} />
              </View>
            </View>

            {/* Standard Title & Subtitle */}
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, isSmallPhone && styles.cardTitleSmall]}>
                {quiz.title}
              </Text>
              <Text style={styles.cardSub}>
                {quiz.subtitle}
              </Text>
            </View>

            {/* Bottom CTA Pill */}
            <View style={styles.cardAction}>
              <View style={styles.cardActionPill}>
                <Text style={styles.cardActionText}>Khám phá</Text>
                <Ionicons name="chevron-forward" size={12} color="#FFFFFF" />
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  headingCopy: {
    flex: 1,
  },
  title: {
    ...typography.display,
    fontSize: 28,
    lineHeight: 34,
  },
  copy: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  bannerWrapper: {
    marginTop: spacing.md,
    borderRadius: radius.hero,
    ...shadows.hero,
  },
  banner: {
    borderRadius: radius.hero,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    minHeight: 145,
    overflow: 'hidden',
  },
  bannerTextZone: {
    flex: 1.3,
    minWidth: 0,
    paddingRight: spacing.xs,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  bannerTitle: {
    ...typography.sectionTitle,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  bannerTitleSmall: {
    fontSize: 15.5,
    lineHeight: 20,
  },
  bannerSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
  },
  bannerArtZone: {
    flex: 0.9,
    aspectRatio: 1,
    maxHeight: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    minHeight: 240,
    borderRadius: radius.card,
    backgroundColor: '#FFFFFF',
    padding: spacing.xs,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
    justifyContent: 'space-between',
  },
  cardTitleSmall: {
    fontSize: 13.5,
    lineHeight: 18,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1.3,
    maxHeight: 125,
    minHeight: 85,
    borderRadius: radius.md,
    backgroundColor: '#FFF0F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '85%',
    height: '85%',
  },
  badgeWrap: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  cardContent: {
    paddingHorizontal: 4,
    paddingTop: spacing.xs,
    flex: 1,
  },
  cardTitle: {
    ...typography.cardTitle,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  cardSub: {
    ...typography.caption,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3,
  },
  cardAction: {
    paddingHorizontal: 4,
    paddingTop: spacing.xs,
  },
  cardActionPill: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryDark,
    paddingVertical: 7,
    borderRadius: radius.pill,
    gap: 4,
    ...shadows.buttonGlow,
  },
  cardActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
});

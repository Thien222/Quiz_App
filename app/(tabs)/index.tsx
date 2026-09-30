import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Badge } from '@/components/common/Badge';
import { SoftCard } from '@/components/common/SoftCard';
import { colors, gradients, radius, shadows, spacing, typography } from '@/constants/theme';
import { characterGenderAssets, uiAssets } from '@/constants/assets';
import { useUserStore } from '@/stores/useUserStore';
import { useQuizStore } from '@/stores/useQuizStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import { useResponsiveLayout } from '@/utils/responsive';

export default function HomeScreen() {
  const router = useRouter();
  const genderTheme = useUserStore((state) => state.genderTheme);
  const heroCharacter = pickGenderAsset(characterGenderAssets, genderTheme);
  const { isSmallPhone, isCompactPhone } = useResponsiveLayout();
  const nickname = useUserStore((state) => state.nickname);
  const canResume = useQuizStore((state) => state.status === 'in_progress' && state.activeQuestions.length > 0);
  const today = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

  return (
    <ScreenContainer>
      {/* 1. Header (Brand left, clean system actions right) */}
      <View style={styles.brandRow}>
        <View style={styles.brandLeft}>
          <Image
            source={uiAssets.illustrations.glossyHeart}
            style={styles.brandArtwork}
            resizeMode="contain"
          />
          <View style={styles.brandCopy}>
            <Text style={styles.brandTitle}>Nè Bạn Ơi</Text>
            <Text style={styles.brandTagline}>Những điều nhỏ xinh cho tình yêu</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            accessibilityLabel="Gói hôm nay"
            onPress={() => router.push('/daily')}
            style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          >
            <Ionicons name="calendar-outline" size={19} color={colors.text} />
          </Pressable>
          <Pressable
            accessibilityLabel="Thông báo"
            onPress={() => router.push('/notifications')}
            style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          >
            <Ionicons name="notifications-outline" size={19} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {/* 2. Compact Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.hello}>Chào {nickname || 'bạn'} ✨</Text>
        <Text style={styles.greetingCopy}>Hôm nay mình cùng khám phá thêm một chút về trái tim nhé.</Text>
      </View>

      {/* 3. Featured Hero Card (Flexible text/art zones, gender-aware, no text overlap) */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={canResume ? 'Tiếp tục quiz đang làm' : 'Bạn yêu như thế nào? Làm quiz ngay'}
        onPress={() => router.push(canResume ? '/quiz/play' : '/quiz/love-style')}
        style={({ pressed }) => [styles.heroWrapper, pressed && styles.cardPressed]}
      >
        <LinearGradient
          colors={gradients.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          {/* Left Text Zone */}
          <View style={styles.heroTextZone}>
            <Badge
              label="BÀI NỔI BẬT"
              variant="pearl"
              icon={<Ionicons name="sparkles" size={11} color={colors.primaryDark} />}
            />
            <Text style={[styles.heroTitle, isSmallPhone && styles.heroTitleSmall]}>
              Bạn yêu như thế nào?
            </Text>
            <Text style={styles.heroSub}>
              Khám phá phong cách yêu, điểm đáng yêu & gu người thương.
            </Text>

            <View style={styles.startPill}>
              <Text style={styles.startText}>{canResume ? 'Làm tiếp' : 'Làm ngay'}</Text>
              <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
            </View>
          </View>

          {/* Right Art Zone */}
          <View style={styles.heroArtZone}>
            <Image
              source={heroCharacter}
              resizeMode="contain"
              style={styles.heroArtwork}
            />
          </View>
        </LinearGradient>
      </Pressable>

      {/* 4. Daily Card Section */}
      <SectionTitle
        title="Gói hôm nay"
        rightElement={<Text style={styles.dateLabel}>{today}</Text>}
        style={styles.sectionHeader}
      />

      <Pressable
        onPress={() => router.push('/daily')}
        style={({ pressed }) => [pressed && styles.cardPressed]}
      >
        <SoftCard style={styles.dailyCard}>
          <View style={styles.dailyIconBox}>
            <Image
              source={uiAssets.illustrations.loveCalendar}
              resizeMode="contain"
              style={styles.dailyIcon}
            />
          </View>
          <View style={styles.dailyTextWrap}>
            <Text style={styles.dailyKicker}>LỜI NHẮN CHO TRÁI TIM</Text>
            <Text style={styles.dailyQuote}>“Rõ ràng cũng là một kiểu dịu dàng.”</Text>
            <Text style={styles.dailyCopy}>Nói điều bạn cần thay vì mong người ấy tự đoán nhé.</Text>
          </View>
        </SoftCard>
      </Pressable>

      {/* 5. Premium Banner */}
      <Pressable
        onPress={() => router.push('/premium')}
        style={({ pressed }) => [styles.premiumWrapper, pressed && styles.cardPressed]}
      >
        <LinearGradient
          colors={gradients.premiumCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.premiumCard, isCompactPhone && styles.premiumCardCompact]}
        >
          <View style={styles.crownBox}>
            <Image
              source={uiAssets.illustrations.crown}
              resizeMode="contain"
              style={styles.crownArtwork}
            />
          </View>
          <View style={[styles.premiumCopy, isCompactPhone && styles.premiumCopyCompact]}>
            <Text style={styles.premiumTitle}>Mở khóa toàn bộ</Text>
            <Text style={styles.premiumSub}>Xem mọi phân tích chuyên sâu</Text>
          </View>
          <View style={[styles.pricePill, isCompactPhone && styles.pricePillCompact]}>
            <Text style={styles.priceText}>49.000đ</Text>
            <Ionicons name="chevron-forward" size={13} color="#FFFFFF" />
          </View>
        </LinearGradient>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  brandArtwork: {
    width: 36,
    height: 36,
  },
  brandCopy: {
    justifyContent: 'center',
    flex: 1,
  },
  brandTitle: {
    ...typography.cardTitle,
    fontSize: 20,
    fontWeight: '900',
  },
  brandTagline: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  greeting: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  hello: {
    ...typography.cardTitle,
    fontSize: 19,
    fontWeight: '900',
  },
  greetingCopy: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  heroWrapper: {
    marginTop: spacing.sm,
    borderRadius: radius.hero,
    ...shadows.hero,
  },
  heroCard: {
    borderRadius: radius.hero,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    minHeight: 175,
    overflow: 'hidden',
  },
  heroTextZone: {
    flex: 1.25,
    minWidth: 0,
    paddingRight: spacing.xs,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  heroTitle: {
    ...typography.sectionTitle,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '900',
  },
  heroTitleSmall: {
    fontSize: 18,
    lineHeight: 23,
  },
  heroSub: {
    ...typography.caption,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  heroArtZone: {
    flex: 0.85,
    aspectRatio: 1,
    maxHeight: 155,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroArtwork: {
    width: '100%',
    height: '100%',
  },
  startPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: 4,
    marginTop: spacing.xxs,
    ...shadows.buttonGlow,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeader: {
    marginTop: spacing.xl,
  },
  dateLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  dailyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  dailyIconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyIcon: {
    width: 28,
    height: 28,
  },
  dailyTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  dailyKicker: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  dailyQuote: {
    ...typography.body,
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  dailyCopy: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  premiumWrapper: {
    marginTop: spacing.md,
    borderRadius: radius.card,
    ...shadows.buttonGlowPurple,
  },
  premiumCard: {
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  crownBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownArtwork: {
    width: 26,
    height: 26,
  },
  premiumCopy: {
    flex: 1,
    minWidth: 0,
  },
  premiumTitle: {
    ...typography.body,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  premiumSub: {
    ...typography.caption,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 1,
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
    gap: 4,
    flexShrink: 0,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  premiumCardCompact: { flexWrap: 'wrap' },
  premiumCopyCompact: { flexBasis: '70%' },
  pricePillCompact: { marginLeft: 52 },
  pressed: {
    opacity: 0.75,
  },
});

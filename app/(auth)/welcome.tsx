import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingDecorations } from '@/components/common/FloatingDecorations';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useResponsiveLayout } from '@/utils/responsive';

const features = [
  {
    title: 'Quiz tình yêu thú vị',
    copy: 'Khám phá cảm xúc, tính cách và chuyện tình duyên của bạn qua những câu hỏi siêu dễ thương.',
    image: uiAssets.generated.quizLoveCards,
    href: '/quiz/love-style',
  },
  {
    title: 'Daily pack mỗi ngày',
    copy: 'Mỗi ngày một chút bất ngờ: vận may, thông điệp, lời khuyên và những điều nhỏ xinh dành riêng cho bạn.',
    image: uiAssets.illustrations.loveCalendar,
    href: '/daily',
  },
  {
    title: 'AI tạo ảnh người thương tương lai',
    copy: 'Khám phá người ấy qua AI với loạt ảnh siêu dễ thương và đúng “gu” của bạn.',
    image: uiAssets.generated.futurePartnerPolaroids,
    href: '/future-partner',
  },
] as const;

export default function WelcomeScreen() {
  const router = useRouter();
  const enterApp = () => router.replace('/(tabs)');

  const {
    isTablet,
    isSmallPhone,
    contentWidth,
    horizontalPadding,
    getGridItemWidth,
    getCarouselItemWidth,
  } = useResponsiveLayout();

  const heroSize = Math.min(contentWidth * 0.8, 280);
  const featureCardWidth = isTablet
    ? getGridItemWidth(3, 10)
    : getCarouselItemWidth(1.28, 10);

  return (
    <LinearGradient colors={['#F1ECFF', '#FFF2F7', '#FFF7FB']} style={styles.screen}>
      <FloatingDecorations />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: horizontalPadding },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.innerContainer, { maxWidth: contentWidth }]}>
            {/* Brand Header */}
            <View style={styles.brandRow}>
              <View style={styles.brandMark}>
                <Image
                  source={uiAssets.illustrations.glossyHeart}
                  style={styles.brandArtwork}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.brand}>
                  Nè Bạn Ơi <Text style={styles.brandHeart}>♥</Text>
                </Text>
                <Text style={styles.tagline}>
                  Những điều nhỏ xinh cho một{`\n`}cuộc sống thú vị hơn
                </Text>
              </View>
            </View>

            {/* Hero Visual Area with aspectRatio */}
            <View style={[styles.heroWrap, { minHeight: heroSize }]}>
              <View
                style={[
                  styles.glow,
                  {
                    width: heroSize * 0.85,
                    height: heroSize * 0.65,
                    borderRadius: heroSize * 0.4,
                  },
                ]}
              />
              <Image
                source={uiAssets.generated.onboardingCouple}
                resizeMode="contain"
                style={[styles.heroArtwork, { width: heroSize, height: heroSize }]}
              />
              <Text style={styles.doodle}>
                Good{`\n`}Things{`\n`}Ahead ♡
              </Text>
            </View>

            {/* Message Card */}
            <View style={styles.messageCard}>
              <Text style={[styles.title, isSmallPhone && styles.titleSmall]}>
                Hiểu bạn hơn,{`\n`}
                <Text style={styles.titleAccent}>vui hơn mỗi ngày</Text> 💖
              </Text>
              <Text style={styles.subtitle}>
                Khám phá tình yêu, tính cách, vận may và những điều nhỏ xinh chỉ dành riêng cho bạn.
              </Text>
              <View style={styles.dots}>
                <View style={styles.dotActive} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>

            {/* Features: Carousel on Phones / Grid on Tablet */}
            <View style={styles.featuresSection}>
              {isTablet ? (
                <View style={styles.featuresGrid}>
                  {features.map((feature) => (
                    <Pressable
                      key={feature.title}
                      style={({ pressed }) => [
                        styles.featureCard,
                        { width: featureCardWidth },
                        pressed && styles.pressed,
                      ]}
                      onPress={() => router.push(feature.href)}
                    >
                      <View style={styles.featureImageWrap}>
                        <Image
                          source={feature.image}
                          resizeMode="contain"
                          style={styles.featureImage}
                        />
                      </View>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureCopy}>{feature.copy}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={featureCardWidth + 10}
                  decelerationRate="fast"
                  contentContainerStyle={styles.featuresCarousel}
                >
                  {features.map((feature) => (
                    <Pressable
                      key={feature.title}
                      style={({ pressed }) => [
                        styles.featureCard,
                        { width: featureCardWidth },
                        pressed && styles.pressed,
                      ]}
                      onPress={() => router.push(feature.href)}
                    >
                      <View style={styles.featureImageWrap}>
                        <Image
                          source={feature.image}
                          resizeMode="contain"
                          style={styles.featureImage}
                        />
                      </View>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureCopy}>{feature.copy}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsWrap}>
              <GradientCTAButton
                label="Bắt đầu ngay"
                icon={<Text style={styles.ctaIcon}>🚀</Text>}
                showChevron
                onPress={enterApp}
              />

              <Pressable
                onPress={enterApp}
                style={({ pressed }) => [styles.signIn, pressed && styles.pressedSubtle]}
              >
                <Text style={styles.signInText}>Tôi đã có tài khoản</Text>
                <Text style={styles.chevron}>›</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.premiumStrip, pressed && styles.pressedSubtle]}
                onPress={() => router.push('/premium')}
              >
                <Image
                  source={uiAssets.illustrations.crown}
                  resizeMode="contain"
                  style={styles.crownArtwork}
                />
                <Text style={styles.premiumText} numberOfLines={2}>
                  Một vài nội dung miễn phí <Text style={styles.premiumDot}>•</Text> Mở full chỉ{' '}
                  <Text style={styles.premiumPrice}>49.000đ</Text>
                </Text>
                <Text style={styles.premiumArrow}>›</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1 },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 28,
    flexGrow: 1,
  },
  innerContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    zIndex: 3,
  },
  brandMark: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  brandArtwork: { width: 44, height: 44 },
  brand: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  brandHeart: { color: colors.primary },
  tagline: { color: colors.textSecondary, fontSize: 11, lineHeight: 15, marginTop: 2 },
  heroWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(255,190,222,.35)',
  },
  heroArtwork: {
    aspectRatio: 1,
  },
  doodle: {
    position: 'absolute',
    left: 8,
    top: 30,
    color: colors.text,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    transform: [{ rotate: '-8deg' }],
  },
  messageCard: {
    zIndex: 2,
    marginTop: -16,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 14,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,.92)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.95)',
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  titleSmall: {
    fontSize: 22,
    lineHeight: 28,
  },
  titleAccent: { color: '#F12B8B' },
  subtitle: {
    maxWidth: 340,
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 8,
  },
  dots: { flexDirection: 'row', gap: 6, marginTop: 12, alignItems: 'center' },
  dotActive: { width: 20, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EADDEA' },
  featuresSection: {
    marginTop: 14,
  },
  featuresGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  featuresCarousel: {
    gap: 10,
    paddingVertical: 2,
  },
  featureCard: {
    minHeight: 210,
    padding: 12,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,.92)',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    justifyContent: 'flex-start',
  },
  featureImageWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  featureTitle: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '900',
    marginTop: 2,
  },
  featureCopy: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },
  pressed: { opacity: 0.86, transform: [{ scale: 0.98 }] },
  pressedSubtle: { opacity: 0.76 },
  actionsWrap: {
    marginTop: 16,
    gap: 10,
    width: '100%',
  },
  ctaIcon: {
    fontSize: 18,
    marginRight: 2,
  },
  signIn: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
  },
  signInText: {
    color: '#6B4080',
    fontSize: 14,
    fontWeight: '700',
  },
  chevron: {
    color: '#6B4080',
    fontSize: 18,
    fontWeight: '800',
    marginTop: -1,
  },
  premiumStrip: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE1EE',
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  crownArtwork: { width: 28, height: 28 },
  premiumText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  premiumDot: { color: colors.peach, fontWeight: '900' },
  premiumPrice: { color: colors.primaryDark, fontWeight: '900', fontSize: 11.5 },
  premiumArrow: { color: colors.primaryDark, fontSize: 18, fontWeight: '800' },
});

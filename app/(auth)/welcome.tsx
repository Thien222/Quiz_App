import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingDecorations } from '@/components/common/FloatingDecorations';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

const features = [
  { title: 'Quiz tình yêu thú vị', copy: 'Khám phá cảm xúc, tính cách và chuyện tình duyên của bạn qua những câu hỏi siêu dễ thương.', image: uiAssets.generated.quizLoveCards, href: '/quiz/love-style' },
  { title: 'Daily pack mỗi ngày', copy: 'Mỗi ngày một chút bất ngờ: vận may, thông điệp, lời khuyên và những điều nhỏ xinh dành riêng cho bạn.', image: uiAssets.illustrations.loveCalendar, href: '/daily' },
  { title: 'AI tạo ảnh người thương tương lai', copy: 'Khám phá người ấy qua AI với loạt ảnh siêu dễ thương và đúng “gu” của bạn.', image: uiAssets.generated.futurePartnerPolaroids, href: '/future-partner' },
] as const;

export default function WelcomeScreen() {
  const router = useRouter();
  const enterApp = () => router.replace('/(tabs)');

  return (
    <LinearGradient colors={['#F1ECFF', '#FFF2F7', '#FFF7FB']} style={styles.screen}>
      <FloatingDecorations />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Image source={uiAssets.illustrations.glossyHeart} style={styles.brandArtwork} />
            </View>
            <View>
              <Text style={styles.brand}>Nè Bạn Ơi <Text style={styles.brandHeart}>♥</Text></Text>
              <Text style={styles.tagline}>Những điều nhỏ xinh cho một{`\n`}cuộc sống thú vị hơn</Text>
            </View>
          </View>

          <View style={styles.heroWrap}>
            <View style={styles.glow} />
            <Image source={uiAssets.generated.onboardingCouple} resizeMode="contain" style={styles.heroArtwork} />
            <Text style={styles.doodle}>Good{`\n`}Things{`\n`}Ahead ♡</Text>
          </View>

          <View style={styles.messageCard}>
            <Text style={styles.title}>Hiểu bạn hơn,{`\n`}<Text style={styles.titleAccent}>vui hơn mỗi ngày</Text> 💖</Text>
            <Text style={styles.subtitle}>Khám phá tình yêu, tính cách, vận may và những điều nhỏ xinh chỉ dành riêng cho bạn.</Text>
            <View style={styles.dots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>

          <View style={styles.features}>
            {features.map((feature) => (
              <Pressable key={feature.title} style={({ pressed }) => [styles.featureCard, pressed && styles.pressed]} onPress={() => router.push(feature.href)}>
                <Image source={feature.image} resizeMode="contain" style={styles.featureImage} />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureCopy}>{feature.copy}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actionsWrap}>
            <GradientCTAButton
              label="Bắt đầu ngay"
              icon={<Text style={styles.ctaIcon}>🚀</Text>}
              showChevron
              onPress={enterApp}
              style={styles.cta}
            />

            <Pressable onPress={enterApp} style={({ pressed }) => [styles.signIn, pressed && styles.pressedSubtle]}>
              <Text style={styles.signInText}>Tôi đã có tài khoản</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.premiumStrip, pressed && styles.pressedSubtle]}
              onPress={() => router.push('/premium')}
            >
              <Image source={uiAssets.illustrations.crown} style={styles.crownArtwork} />
              <Text style={styles.premiumText}>
                Một vài nội dung miễn phí <Text style={styles.premiumDot}>•</Text> Mở full chỉ <Text style={styles.premiumPrice}>49.000đ</Text>
              </Text>
              <Text style={styles.premiumArrow}>›</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 28 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 11, zIndex: 3 },
  brandMark: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  brandArtwork: { width: 54, height: 54 },
  brand: { color: colors.text, fontSize: 28, lineHeight: 30, fontWeight: '900', letterSpacing: -1 },
  brandHeart: { color: colors.primary },
  tagline: { color: colors.textSecondary, fontSize: 11, lineHeight: 15, marginTop: 2 },
  heroWrap: { height: 285, marginTop: -4, alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', width: 310, height: 220, borderRadius: 150, backgroundColor: 'rgba(255,190,222,.35)' },
  heroArtwork: { width: 350, height: 350, marginTop: 24 },
  doodle: { position: 'absolute', left: 12, top: 86, color: colors.text, fontSize: 12, lineHeight: 14, fontWeight: '700', transform: [{ rotate: '-8deg' }] },
  messageCard: {
    zIndex: 2,
    marginTop: -27,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 16,
    borderTopLeftRadius: 54,
    borderTopRightRadius: 54,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: 'rgba(255,255,255,.88)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.95)',
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: { color: colors.text, fontSize: 29, lineHeight: 34, textAlign: 'center', fontWeight: '900', letterSpacing: -1 },
  titleAccent: { color: '#F12B8B' },
  subtitle: { maxWidth: 335, color: colors.textSecondary, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 10 },
  dots: { flexDirection: 'row', gap: 6, marginTop: 14, alignItems: 'center' },
  dotActive: { width: 22, height: 7, borderRadius: 4, backgroundColor: colors.primary },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#EADDEA' },
  features: { flexDirection: 'row', gap: 8, marginTop: 14 },
  featureCard: {
    flex: 1,
    minHeight: 225,
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,.88)',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  featureImage: { width: '100%', height: 86 },
  featureTitle: { color: colors.text, fontSize: 13, lineHeight: 16, fontWeight: '900', marginTop: 4 },
  featureCopy: { color: colors.textSecondary, fontSize: 10, lineHeight: 14, marginTop: 4 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.98 }] },
  pressedSubtle: { opacity: 0.76 },
  actionsWrap: {
    marginTop: 18,
    gap: 12,
  },
  cta: {
    marginHorizontal: 12,
  },
  ctaIcon: {
    fontSize: 20,
    marginRight: 2,
  },
  signIn: {
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
    minHeight: 52,
    marginHorizontal: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE1EE',
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  crownArtwork: { width: 34, height: 34 },
  premiumText: { flex: 1, color: colors.textSecondary, fontSize: 11, fontWeight: '600', textAlign: 'center' },
  premiumDot: { color: colors.peach, fontWeight: '900' },
  premiumPrice: { color: colors.primaryDark, fontWeight: '900', fontSize: 12 },
  premiumArrow: { color: colors.primaryDark, fontSize: 20, fontWeight: '800' },
});

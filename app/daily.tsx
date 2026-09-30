import { Image, Share, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { SoftCard } from '@/components/common/SoftCard';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useResponsiveLayout } from '@/utils/responsive';

export default function DailyScreen() {
  const router = useRouter();
  const { isSmallPhone, getGridItemWidth } = useResponsiveLayout();
  const miniCardWidth = getGridItemWidth(2, 10);

  return (
    <ScreenContainer
      edges={['top', 'bottom']}
      header={
        <AppHeader
          title="Gói hôm nay"
          onBack={() => router.back()}
          onShare={() => Share.share({ message: 'Rõ ràng cũng là một kiểu dịu dàng 💗' })}
        />
      }
      contentContainerStyle={styles.content}
    >
      <LinearGradient colors={['#FFE2EF', '#EEE7FF']} style={styles.hero}>
        <Image
          source={uiAssets.illustrations.loveCalendar}
          resizeMode="contain"
          style={styles.heroArt}
        />
        <Text style={styles.date}>{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</Text>
        <Text style={[styles.heroTitle, isSmallPhone && styles.heroTitleSmall]}>
          Một chút dễ thương dành riêng cho bạn
        </Text>
      </LinearGradient>

      <SoftCard>
        <Text style={styles.kicker}>LỜI NHẮN CHO TRÁI TIM</Text>
        <Text style={[styles.quote, isSmallPhone && styles.quoteSmall]}>
          “Rõ ràng cũng là một kiểu dịu dàng.”
        </Text>
        <Text style={styles.copy}>
          Bạn không cần làm người khác đoán xem mình đang buồn hay cần gì. Nói ra một cách chân
          thành cũng là yêu thương.
        </Text>
      </SoftCard>

      <View style={styles.row}>
        <SoftCard style={[styles.mini, { width: miniCardWidth }]}>
          <Image
            source={uiAssets.illustrations.cuteStar}
            resizeMode="contain"
            style={styles.miniArt}
          />
          <Text style={styles.miniTitle}>Vibe hôm nay</Text>
          <Text style={styles.miniCopy}>Ấm áp và chủ động</Text>
        </SoftCard>

        <SoftCard style={[styles.mini, { width: miniCardWidth }]}>
          <Image
            source={uiAssets.illustrations.loveLetter}
            resizeMode="contain"
            style={styles.miniArt}
          />
          <Text style={styles.miniTitle}>Gợi ý nhỏ</Text>
          <Text style={styles.miniCopy}>Gửi một lời hỏi thăm</Text>
        </SoftCard>
      </View>

      <GradientCTAButton
        label="Khám phá quiz hôm nay  ›"
        onPress={() => router.push('/quiz/love-style')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 6,
    paddingBottom: 36,
    gap: 14,
  },
  hero: {
    minHeight: 220,
    borderRadius: 28,
    padding: 18,
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroArt: {
    width: 140,
    height: 140,
    aspectRatio: 1,
  },
  date: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 4,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 4,
  },
  heroTitleSmall: {
    fontSize: 17,
  },
  kicker: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  quote: {
    color: colors.text,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
    marginTop: 8,
  },
  quoteSmall: {
    fontSize: 18,
    lineHeight: 24,
  },
  copy: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  mini: {
    minHeight: 135,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniArt: {
    width: 60,
    height: 60,
    aspectRatio: 1,
  },
  miniTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 4,
  },
  miniCopy: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
});

import { Image, Share, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { SoftCard } from '@/components/common/SoftCard';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useResponsiveLayout } from '@/utils/responsive';

export default function FuturePartnerScreen() {
  const router = useRouter();
  const { isSmallPhone } = useResponsiveLayout();

  return (
    <ScreenContainer
      edges={['top', 'bottom']}
      header={
        <AppHeader
          title="Người thương tương lai"
          onBack={() => router.back()}
          onShare={() => Share.share({ message: 'Thử khám phá người thương tương lai cùng Nè Bạn Ơi 💞' })}
        />
      }
      contentContainerStyle={styles.content}
    >
      <LinearGradient colors={['#F1E8FF', '#FFE2EF']} style={styles.hero}>
        <Image
          source={uiAssets.generated.futurePartnerPolaroids}
          resizeMode="contain"
          style={styles.heroArt}
        />
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>AI</Text>
        </View>
      </LinearGradient>

      <Text style={[styles.title, isSmallPhone && styles.titleSmall]}>
        Một người hợp vibe với bạn sẽ trông như thế nào?
      </Text>
      <Text style={styles.copy}>
        Trả lời vài câu hỏi về gu, năng lượng và điều bạn trân trọng. Chúng mình sẽ tạo một visual
        profile có cấu trúc dành riêng cho bạn.
      </Text>

      <SoftCard style={styles.card}>
        <Image
          source={uiAssets.illustrations.glossyHeart}
          resizeMode="contain"
          style={styles.icon}
        />
        <View style={styles.cardCopy}>
          <Text style={styles.cardTitle}>Không dùng prompt lưu sẵn</Text>
          <Text style={styles.cardText}>
            Kết quả dựa trên lựa chọn và visual profile của riêng bạn.
          </Text>
        </View>
      </SoftCard>

      <GradientCTAButton
        label="Bắt đầu khám phá  ›"
        onPress={() => router.push('/quiz/love-style')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 6,
    paddingBottom: 36,
  },
  hero: {
    width: '100%',
    aspectRatio: 1.15,
    maxHeight: 280,
    minHeight: 180,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroArt: {
    width: '90%',
    height: '90%',
    aspectRatio: 1,
  },
  aiBadge: {
    position: 'absolute',
    right: 14,
    top: 14,
    borderRadius: 14,
    backgroundColor: colors.purple,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  aiText: { color: 'white', fontSize: 14, fontWeight: '900' },
  title: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 18,
  },
  titleSmall: {
    fontSize: 20,
    lineHeight: 26,
  },
  copy: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 18,
    gap: 12,
  },
  icon: {
    width: 48,
    height: 48,
    aspectRatio: 1,
  },
  cardCopy: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  cardText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
});

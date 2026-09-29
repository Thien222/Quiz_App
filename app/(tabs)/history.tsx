import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { PrimaryButton } from '@/components/common/Buttons';
import { colors, radius, shadows, spacing, typography } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

export default function History() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.heading}>
        <Text style={styles.title}>Kết quả</Text>
        <Text style={styles.copy}>Lịch sử và các phân tích bạn đã khám phá ✨</Text>
      </View>

      <View style={styles.emptyCard}>
        <View style={styles.artBox}>
          <Image
            source={uiAssets.illustrations.cuteStar}
            resizeMode="contain"
            style={styles.art}
          />
        </View>
        <Text style={styles.emptyTitle}>Một kết quả xinh đang chờ</Text>
        <Text style={styles.emptyCopy}>
          Hoàn thành quiz đầu tiên để mở khóa toàn bộ phân tích tính cách và dimension của bạn nhé.
        </Text>
        <View style={styles.ctaWrap}>
          <PrimaryButton
            label="Làm quiz ngay"
            showChevron
            onPress={() => router.push('/quiz/love-style')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
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
  emptyCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: spacing.xl,
    marginVertical: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
  },
  artBox: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  art: {
    width: 90,
    height: 90,
  },
  emptyTitle: {
    ...typography.cardTitle,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyCopy: {
    ...typography.caption,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 260,
    marginTop: spacing.xs,
  },
  ctaWrap: {
    width: '100%',
    maxWidth: 240,
    marginTop: spacing.xl,
  },
});

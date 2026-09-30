import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuizStore } from '@/stores/useQuizStore';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { PrimaryButton } from '@/components/common/Buttons';
import { colors, radius, shadows, spacing, typography } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

export default function History() {
  const router = useRouter();
  const result = useQuizStore((state) => state.currentResult);
  const genderTheme = useUserStore((state) => state.genderTheme);

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <View style={styles.heading}>
        <Text style={styles.title}>Kết quả</Text>
        <Text style={styles.copy}>Lịch sử và các phân tích bạn đã khám phá ✨</Text>
      </View>

      {result ? (
        <View style={styles.savedSection}>
          <Text style={styles.savedLabel}>KẾT QUẢ GẦN NHẤT</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Xem kết quả ${result.archetype.title}`}
            onPress={() => router.push({ pathname: '/quiz/result/[sessionId]', params: { sessionId: result.sessionId } })}
            style={({ pressed }) => [styles.resultCard, pressed && { opacity: 0.8 }]}
          >
            <Image source={pickGenderAsset(result.archetype.heroImage, genderTheme)} resizeMode="contain" style={styles.resultArt} />
            <Text style={styles.resultTitle}>{result.archetype.title}</Text>
            <Text style={styles.resultCopy}>{result.archetype.summary}</Text>
            <Text style={styles.resultDate}>{new Date(result.completedAt).toLocaleDateString('vi-VN')}</Text>
            <View style={styles.resultAction}>
              <Text style={styles.resultActionText}>Xem phân tích của bạn</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.primaryDark} />
            </View>
          </Pressable>
          <PrimaryButton label="Khám phá lại bản thân" onPress={() => router.push('/quiz/love-style')} />
        </View>
      ) : <View style={styles.emptyCard}>
        <View style={styles.artBox}>
          <Image
            source={uiAssets.illustrations.cuteStar}
            resizeMode="contain"
            style={styles.art}
          />
        </View>
        <Text style={styles.emptyTitle}>Một kết quả xinh đang chờ</Text>
        <Text style={styles.emptyCopy}>
          Hoàn thành quiz đầu tiên để khám phá phong cách yêu và những nét tính cách của bạn nhé.
        </Text>
        <View style={styles.ctaWrap}>
          <PrimaryButton
            label="Làm quiz ngay"
            showChevron
            onPress={() => router.push('/quiz/love-style')}
          />
        </View>
      </View>}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  savedSection: { gap: spacing.md, marginTop: spacing.lg },
  savedLabel: { ...typography.badge, color: colors.textSecondary },
  resultCard: { padding: spacing.xl, borderRadius: radius.hero, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  resultArt: { width: 120, height: 120, alignSelf: 'center', marginBottom: spacing.md },
  resultTitle: { ...typography.sectionTitle, color: colors.primaryDark },
  resultCopy: { ...typography.body, marginTop: spacing.xs },
  resultDate: { ...typography.caption, marginTop: spacing.md },
  resultAction: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, alignItems: 'center', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  resultActionText: { ...typography.body, color: colors.primaryDark },
  content: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
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
    minHeight: 320,
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  art: {
    width: 80,
    height: 80,
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
    maxWidth: 260,
    marginTop: spacing.xl,
  },
});

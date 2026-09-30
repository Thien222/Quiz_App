import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppDialog } from '@/components/common/AppDialog';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors, shadows } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useResponsiveLayout } from '@/utils/responsive';

type PlanTier = 'single' | 'vip';

export default function PremiumScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('vip');
  const { isSmallPhone, getGridItemWidth } = useResponsiveLayout();
  const [showPurchaseInfo, setShowPurchaseInfo] = useState(false);

  const handlePurchase = () => {
    setShowPurchaseInfo(true);
  };

  const benefitCols = 2;
  const benefitGap = 10;
  const benefitCardWidth = getGridItemWidth(benefitCols, benefitGap);

  return (
    <ScreenContainer
      edges={['top', 'bottom']}
      header={<AppHeader title="Nè Bạn Ơi Premium" onBack={() => router.back()} />}
      contentContainerStyle={styles.content}
    >
      <LinearGradient
        colors={['#FFF1D7', '#FFE2F0', '#EEE5FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Image source={uiAssets.illustrations.crown} resizeMode="contain" style={styles.crown} />
        <Text style={[styles.heroTitle, isSmallPhone && styles.heroTitleSmall]}>
          Mở khóa mọi điều thú vị
        </Text>
        <Text style={styles.heroCopy}>Xem toàn bộ phân tích, daily pack và visual tương lai.</Text>
      </LinearGradient>

      <View style={[styles.benefits, { gap: benefitGap }]}>
        {[
          [uiAssets.illustrations.glossyHeart, 'Kết quả chuyên sâu', 'Mở toàn bộ red flag & gu tình yêu'],
          [uiAssets.illustrations.cuteStar, 'Mọi quiz cao cấp', 'Không giới hạn bài trắc nghiệm mới'],
          [uiAssets.illustrations.loveCalendar, 'Daily pack trọn bộ', 'Xem trước thông điệp mỗi ngày'],
          [uiAssets.illustrations.giftBox, 'Visual tương lai', 'Dự đoán ảnh vibe người thương'],
        ].map(([icon, label, desc]) => (
          <View
            key={label as string}
            style={[styles.benefit, { width: benefitCardWidth }]}
          >
            <View style={styles.benefitIconWrap}>
              <Image source={icon as any} resizeMode="contain" style={styles.benefitIcon} />
            </View>
            <Text style={styles.benefitText}>{label as string}</Text>
            <Text style={styles.benefitDesc}>{desc as string}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.chooseTitle}>Chọn gói mở khóa</Text>

      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ checked: selectedPlan === 'single' }}
        aria-checked={selectedPlan === 'single'}
        onPress={() => setSelectedPlan('single')}
        style={({ pressed }) => [
          styles.option,
          selectedPlan === 'single' ? styles.optionActive : styles.optionInactive,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.radioRow}>
          <View style={[styles.radioCircle, selectedPlan === 'single' && styles.radioCircleActive]}>
            {selectedPlan === 'single' ? <View style={styles.radioInner} /> : null}
          </View>
          <View style={styles.optionCopy}>
            <Text style={styles.optionTitle}>Mở một kết quả</Text>
            <Text style={styles.optionSub}>Thanh toán 1 lần cho bài này</Text>
          </View>
        </View>
        <Text style={styles.price}>10.000đ</Text>
      </Pressable>

      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ checked: selectedPlan === 'vip' }}
        aria-checked={selectedPlan === 'vip'}
        onPress={() => setSelectedPlan('vip')}
        style={({ pressed }) => [
          styles.option,
          selectedPlan === 'vip' ? styles.optionVipActive : styles.optionInactive,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.bestBadge}>
          <Text style={styles.bestText}>👑 KHÁM PHÁ TRỌN BỘ</Text>
        </View>
        <View style={styles.radioRow}>
          <View style={[styles.radioCircle, selectedPlan === 'vip' && styles.radioCircleActive]}>
            {selectedPlan === 'vip' ? <View style={styles.radioInner} /> : null}
          </View>
          <View style={styles.optionCopy}>
            <Text style={styles.optionTitle}>VIP Pass toàn bộ</Text>
            <Text style={styles.optionSub}>Mở khóa vĩnh viễn tất cả bài trắc nghiệm</Text>
          </View>
        </View>
        <Text style={styles.priceVip}>49.000đ</Text>
      </Pressable>

      <View style={styles.ctaWrap}>
        <GradientCTAButton
          label={`Mở khóa ngay • ${selectedPlan === 'vip' ? '49.000đ' : '10.000đ'}`}
          icon={<Text style={styles.btnIcon}>✨</Text>}
          showChevron
          onPress={handlePurchase}
        />
      </View>

      <Text style={styles.note}>
        Tính năng thanh toán đang được hoàn thiện.
      </Text>
      <AppDialog visible={showPurchaseInfo} title="Premium sắp sẵn sàng" onClose={() => setShowPurchaseInfo(false)}>
        <Text style={styles.purchaseInfo}>Hiện chưa thể thanh toán hoặc kích hoạt gói. Bạn vẫn có thể làm quiz và xem các phân tích miễn phí nhé.</Text>
      </AppDialog>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  purchaseInfo: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
  content: { paddingTop: 6, paddingBottom: 36, gap: 14 },
  hero: {
    borderRadius: 28,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: colors.gold,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  crown: { width: 80, height: 80, aspectRatio: 1 },
  heroTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 6,
  },
  heroTitleSmall: {
    fontSize: 20,
  },
  heroCopy: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 17,
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefit: {
    minHeight: 125,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  benefitIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  benefitIcon: { width: 24, height: 24 },
  benefitText: {
    color: colors.text,
    fontSize: 12.5,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 3,
  },
  benefitDesc: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 17,
  },
  chooseTitle: { color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 4 },
  option: {
    gap: 12,
    minHeight: 80,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FCE7F3',
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF0F7',
    ...shadows.optionGlow,
  },
  optionVipActive: {
    borderColor: '#F43F5E',
    borderWidth: 2,
    backgroundColor: '#FFF1F6',
    ...shadows.buttonGlow,
  },
  bestBadge: {
    position: 'absolute',
    top: -11,
    left: 18,
    backgroundColor: '#F43F5E',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  bestText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E5D4E8',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioCircleActive: {
    borderColor: '#F43F5E',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F43F5E',
  },
  optionCopy: {
    flex: 1,
    minWidth: 0,
  },
  optionTitle: { color: colors.text, fontSize: 15, fontWeight: '900' },
  optionSub: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  price: { color: colors.text, fontWeight: '900', fontSize: 15, flexShrink: 0 },
  priceVip: { color: '#F43F5E', fontWeight: '900', fontSize: 17, flexShrink: 0 },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  ctaWrap: {
    marginTop: 4,
    width: '100%',
  },
  btnIcon: {
    fontSize: 18,
    marginRight: 2,
  },
  note: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 2 },
});

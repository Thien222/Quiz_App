import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import { SettingsRow } from '@/components/common/SettingsRow';
import { Badge } from '@/components/common/Badge';
import { colors, radius, shadows, spacing, typography } from '@/constants/theme';
import { characterGenderAssets, uiAssets } from '@/constants/assets';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import type { GenderTheme } from '@/types/quiz';

export default function ProfileScreen() {
  const router = useRouter();
  const { genderTheme, setGenderTheme, nickname } = useUserStore();
  const avatarSource = pickGenderAsset(characterGenderAssets, genderTheme);

  const genderLabels: Record<GenderTheme, string> = {
    female: '👩 Nữ',
    male: '👦 Nam',
    neutral: '💑 Đôi',
  };

  return (
    <ScreenContainer>
      {/* 1. Header */}
      <View style={styles.heading}>
        <Text style={styles.title}>Cá nhân</Text>
        <Text style={styles.copy}>Không gian thấu hiểu & yêu thương bản thân ✨</Text>
      </View>

      {/* 2. Compact Profile Hero (Normalized avatar area, nickname, vibe) */}
      <View style={styles.profileHeroCard}>
        <View style={styles.avatarWrap}>
          <Image source={avatarSource} resizeMode="contain" style={styles.avatarImage} />
        </View>

        <View style={styles.profileMeta}>
          <View style={styles.nameRow}>
            <Text style={styles.nickname}>{nickname || 'Bạn xinh'}</Text>
            <Badge label={genderLabels[genderTheme]} variant="pink" />
          </View>
          <Text style={styles.statusSubtitle}>Khám phá & yêu thương bản thân mỗi ngày ♡</Text>
        </View>
      </View>

      {/* 3. Section: Hồ sơ của bạn */}
      <SectionTitle title="Hồ sơ của bạn" style={styles.sectionHeader} />
      <View style={styles.cardContainer}>
        <View style={styles.themeSettingBlock}>
          <View style={styles.themeHeaderRow}>
            <View style={styles.themeIconBox}>
              <Ionicons name="color-palette-outline" size={20} color={colors.primaryDark} />
            </View>
            <View style={styles.themeCopy}>
              <Text style={styles.themeTitle}>Chủ đề nhân vật</Text>
              <Text style={styles.themeSubtitle}>Tùy biến hình ảnh hiển thị theo gu</Text>
            </View>
          </View>
          <View style={styles.genderChipsRow}>
            {(['female', 'male', 'neutral'] as GenderTheme[]).map((theme) => (
              <Pressable
                key={theme}
                accessibilityRole="radio"
                accessibilityState={{ checked: genderTheme === theme }}
                aria-checked={genderTheme === theme}
                onPress={() => setGenderTheme(theme)}
                style={[
                  styles.chip,
                  genderTheme === theme && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    genderTheme === theme && styles.chipTextActive,
                  ]}
                >
                  {genderLabels[theme]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.divider} />
        <SettingsRow
          title="Trạng thái tình cảm"
          subtitle="Đang hẹn hò ngọt ngào"
          icon={<Ionicons name="heart-outline" size={20} color={colors.primaryDark} />}
          rightElement={<Badge label="Đang yêu" variant="green" />}
        />
      </View>

      {/* 4. Section: Nội dung & Lịch sử */}
      <SectionTitle title="Nội dung" style={styles.sectionHeader} />
      <View style={styles.cardContainer}>
        <SettingsRow
          title="Kết quả đã lưu"
          subtitle="Xem lại các tính cách & dimension đã mở"
          icon={<Ionicons name="ribbon-outline" size={20} color={colors.purple} />}
          iconBg="#F3E8FF"
          showDivider
          onPress={() => router.push('/(tabs)/history')}
        />
        <SettingsRow
          title="Gói hôm nay"
          subtitle="Xem thông điệp và lời nhắn cho trái tim"
          icon={<Ionicons name="calendar-outline" size={20} color={colors.primaryDark} />}
          onPress={() => router.push('/daily')}
        />
      </View>

      {/* 5. Section: Gói Premium */}
      <SectionTitle title="Premium" style={styles.sectionHeader} />
      <View style={styles.cardContainer}>
        <SettingsRow
          title="VIP Pass"
          subtitle="Mở khóa toàn bộ phân tích & ảnh người thương"
          icon={
            <Image
              source={uiAssets.illustrations.crown}
              resizeMode="contain"
              style={styles.crownIcon}
            />
          }
          iconBg="#FEF3C7"
          showDivider
          rightElement={<Badge label="49.000đ" variant="peach" />}
          onPress={() => router.push('/premium')}
        />
        <SettingsRow
          title="Quyền lợi Premium"
          subtitle="Không giới hạn số lượt trải nghiệm và nội dung mới"
          icon={<Ionicons name="shield-checkmark-outline" size={20} color={colors.purple} />}
          iconBg="#F3E8FF"
          onPress={() => router.push('/premium')}
        />
      </View>

      {/* 6. Section: Cài đặt & Hỗ trợ */}
      <SectionTitle title="Cài đặt" style={styles.sectionHeader} />
      <View style={styles.cardContainer}>
        <SettingsRow
          title="Thông báo"
          subtitle="Cập nhật quiz mới và lời nhắn ngọt ngào"
          icon={<Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />}
          iconBg="#F1F5F9"
          showDivider
          onPress={() => router.push('/notifications')}
        />
        <SettingsRow
          title="Quyền riêng tư & Bảo mật"
          subtitle="Dữ liệu lưu trữ bảo mật trên thiết bị"
          icon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
          iconBg="#F1F5F9"
          showDivider
        />
        <SettingsRow
          title="Hỗ trợ & Góp ý"
          subtitle="Đội ngũ Nè Bạn Ơi luôn sẵn sàng lắng nghe"
          icon={<Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.textSecondary} />}
          iconBg="#F1F5F9"
        />
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
  profileHeroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
    marginTop: spacing.xs,
    gap: spacing.md,
  },
  avatarWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF0F7',
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '90%',
    height: '90%',
  },
  profileMeta: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
  },
  nickname: {
    flexShrink: 1,
    ...typography.cardTitle,
    fontSize: 18,
    fontWeight: '900',
  },
  statusSubtitle: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  sectionHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxs,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  genderChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.xs,
  },
  themeSettingBlock: {
    padding: spacing.md,
  },
  themeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  themeCopy: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  themeTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  themeSubtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 58,
  },
  chip: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderRadius: radius.pill,
    backgroundColor: '#FFF5F8',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#FFE4E6',
    borderColor: colors.primaryDark,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  chipTextActive: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  crownIcon: {
    width: 22,
    height: 22,
  },
});

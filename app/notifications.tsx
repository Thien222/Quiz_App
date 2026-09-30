import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';
import { useResponsiveLayout } from '@/utils/responsive';

export default function NotificationsScreen() {
  const router = useRouter();
  const { isSmallPhone } = useResponsiveLayout();

  return (
    <ScreenContainer
      edges={['top', 'bottom']}
      header={<AppHeader title="Thông báo nhỏ xinh" onBack={() => router.back()} />}
      contentContainerStyle={styles.content}
    >
      <View style={styles.empty}>
        <Image
          source={uiAssets.illustrations.loveLetter}
          resizeMode="contain"
          style={styles.art}
        />
        <Text style={[styles.title, isSmallPhone && styles.titleSmall]}>
          Hộp thư đang thật yên
        </Text>
        <Text style={styles.copy}>
          Khi có quiz mới hoặc daily pack đặc biệt, lời nhắn sẽ xuất hiện ở đây.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  art: {
    width: 150,
    height: 150,
    aspectRatio: 1,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 19,
  },
  copy: {
    color: colors.textSecondary,
    maxWidth: 290,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});

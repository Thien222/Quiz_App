import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

export default function NotificationsScreen() {
  const router = useRouter();
  return <SafeAreaView style={styles.screen}><AppHeader title="Thông báo nhỏ xinh" onBack={() => router.back()} /><View style={styles.empty}><Image source={uiAssets.illustrations.loveLetter} style={styles.art} /><Text style={styles.title}>Hộp thư đang thật yên</Text><Text style={styles.copy}>Khi có quiz mới hoặc daily pack đặc biệt, lời nhắn sẽ xuất hiện ở đây.</Text></View></SafeAreaView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, paddingHorizontal: 18, backgroundColor: colors.background }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center' }, art: { width: 210, height: 210 }, title: { color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 8 }, copy: { color: colors.textSecondary, maxWidth: 290, lineHeight: 20, textAlign: 'center', marginTop: 7 } });

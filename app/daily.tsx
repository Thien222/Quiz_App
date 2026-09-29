import { Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { SoftCard } from '@/components/common/SoftCard';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

export default function DailyScreen() {
  const router = useRouter();
  return <SafeAreaView style={styles.screen}><AppHeader title="Gói hôm nay" onBack={() => router.back()} onShare={() => Share.share({ message: 'Rõ ràng cũng là một kiểu dịu dàng 💗' })} /><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <LinearGradient colors={['#FFE2EF', '#EEE7FF']} style={styles.hero}><Image source={uiAssets.illustrations.loveCalendar} style={styles.heroArt} /><Text style={styles.date}>29 · 09</Text><Text style={styles.heroTitle}>Một chút dễ thương dành riêng cho bạn</Text></LinearGradient>
    <SoftCard><Text style={styles.kicker}>LỜI NHẮN CHO TRÁI TIM</Text><Text style={styles.quote}>“Rõ ràng cũng là một kiểu dịu dàng.”</Text><Text style={styles.copy}>Bạn không cần làm người khác đoán xem mình đang buồn hay cần gì. Nói ra một cách chân thành cũng là yêu thương.</Text></SoftCard>
    <View style={styles.row}><SoftCard style={styles.mini}><Image source={uiAssets.illustrations.cuteStar} style={styles.miniArt} /><Text style={styles.miniTitle}>Vibe hôm nay</Text><Text style={styles.miniCopy}>Ấm áp và chủ động</Text></SoftCard><SoftCard style={styles.mini}><Image source={uiAssets.illustrations.loveLetter} style={styles.miniArt} /><Text style={styles.miniTitle}>Gợi ý nhỏ</Text><Text style={styles.miniCopy}>Gửi một lời hỏi thăm</Text></SoftCard></View>
    <GradientCTAButton label="Khám phá quiz hôm nay  ›" onPress={() => router.push('/quiz/love-style')} />
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, paddingHorizontal: 18, backgroundColor: colors.background }, content: { paddingTop: 12, paddingBottom: 32, gap: 15 }, hero: { minHeight: 270, borderRadius: 30, padding: 20, alignItems: 'center', overflow: 'hidden' }, heroArt: { width: 190, height: 190, marginTop: -8 }, date: { color: colors.primaryDark, fontSize: 12, fontWeight: '900', letterSpacing: 2 }, heroTitle: { color: colors.text, fontSize: 21, fontWeight: '900', textAlign: 'center', marginTop: 5 }, kicker: { color: colors.primaryDark, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, quote: { color: colors.text, fontSize: 22, lineHeight: 29, fontWeight: '900', marginTop: 10 }, copy: { color: colors.textSecondary, lineHeight: 21, marginTop: 9 }, row: { flexDirection: 'row', gap: 10 }, mini: { flex: 1, padding: 13, alignItems: 'center' }, miniArt: { width: 80, height: 80 }, miniTitle: { color: colors.text, fontWeight: '900', marginTop: 4 }, miniCopy: { color: colors.textSecondary, fontSize: 11, textAlign: 'center', marginTop: 3 } });

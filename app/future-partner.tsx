import { Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { GradientCTAButton } from '@/components/common/GradientCTAButton';
import { SoftCard } from '@/components/common/SoftCard';
import { colors } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

export default function FuturePartnerScreen() {
  const router = useRouter();
  return <SafeAreaView style={styles.screen}><AppHeader title="Người thương tương lai" onBack={() => router.back()} onShare={() => Share.share({ message: 'Thử khám phá người thương tương lai cùng Nè Bạn Ơi 💞' })} /><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <LinearGradient colors={['#F1E8FF', '#FFE2EF']} style={styles.hero}><Image source={uiAssets.generated.futurePartnerPolaroids} style={styles.heroArt} /><View style={styles.aiBadge}><Text style={styles.aiText}>AI</Text></View></LinearGradient>
    <Text style={styles.title}>Một người hợp vibe với bạn sẽ trông như thế nào?</Text><Text style={styles.copy}>Trả lời vài câu hỏi về gu, năng lượng và điều bạn trân trọng. Chúng mình sẽ tạo một visual profile có cấu trúc dành riêng cho bạn.</Text>
    <SoftCard style={styles.card}><Image source={uiAssets.illustrations.glossyHeart} style={styles.icon} /><View style={styles.cardCopy}><Text style={styles.cardTitle}>Không dùng prompt lưu sẵn</Text><Text style={styles.cardText}>Kết quả dựa trên lựa chọn và visual profile của riêng bạn.</Text></View></SoftCard>
    <GradientCTAButton label="Bắt đầu khám phá  ›" onPress={() => router.push('/quiz/love-style')} />
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, paddingHorizontal: 18, backgroundColor: colors.background }, content: { paddingTop: 12, paddingBottom: 32 }, hero: { height: 340, borderRadius: 30, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, heroArt: { width: 360, height: 360 }, aiBadge: { position: 'absolute', right: 18, top: 18, borderRadius: 16, backgroundColor: colors.purple, paddingHorizontal: 13, paddingVertical: 9 }, aiText: { color: 'white', fontSize: 16, fontWeight: '900' }, title: { color: colors.text, fontSize: 26, lineHeight: 33, fontWeight: '900', textAlign: 'center', marginTop: 20 }, copy: { color: colors.textSecondary, lineHeight: 21, textAlign: 'center', marginTop: 10, marginBottom: 16 }, card: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 18 }, icon: { width: 75, height: 75 }, cardCopy: { flex: 1, marginLeft: 8 }, cardTitle: { color: colors.text, fontWeight: '900' }, cardText: { color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 4 } });

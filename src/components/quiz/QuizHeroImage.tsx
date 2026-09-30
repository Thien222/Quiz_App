import { Image, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import type { GenderAsset } from '@/types/quiz';
import { colors } from '@/constants/theme';

interface Props {
  heroImage?: GenderAsset;
}

export function QuizHeroImage({ heroImage }: Props) {
  const genderTheme = useUserStore((state) => state.genderTheme);
  const source = pickGenderAsset(heroImage, genderTheme);

  if (!source) return null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 228, 240, 0.65)', 'rgba(237, 233, 254, 0.45)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Image source={source} resizeMode="contain" style={styles.image} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  card: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: 220,
    minHeight: 130,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

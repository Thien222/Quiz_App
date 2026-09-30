import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, shadows } from '@/constants/theme';
import { useUserStore } from '@/stores/useUserStore';
import { pickGenderAsset } from '@/utils/genderAsset';
import type { GenderAsset } from '@/types/quiz';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  optionKey: string;
  text: string;
  selected: boolean;
  thumbnail?: GenderAsset;
  onPress: () => void;
}

export function QuizOptionCard({ text, selected, thumbnail, onPress }: Props) {
  const genderTheme = useUserStore((state) => state.genderTheme);
  const thumbSource = pickGenderAsset(thumbnail, genderTheme);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 14, stiffness: 280 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 14, stiffness: 280 });
  };

  return (
    <AnimatedPressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      aria-checked={selected}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        selected ? styles.selectedCard : styles.defaultCard,
        animatedStyle,
      ]}
    >
      {/* Radio indicator on the left (Ref: 03_quiz_food_scenario.png) */}
      <View style={[styles.radioCircle, selected ? styles.selectedRadio : styles.defaultRadio]}>
        {selected ? <View style={styles.radioInnerDot} /> : null}
      </View>

      {/* Optional thumbnail image */}
      {thumbSource ? (
        <View style={styles.thumbWrapper}>
          <Image source={thumbSource} resizeMode="contain" style={styles.thumbImage} />
        </View>
      ) : null}

      {/* Answer text */}
      <Text style={[styles.text, selected ? styles.selectedText : styles.defaultText]}>
        {text}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1.5,
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FCE7F3',
    shadowColor: colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#FFF0F7',
    borderColor: '#F43F5E',
    borderWidth: 2,
    ...shadows.optionGlow,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultRadio: {
    borderWidth: 2,
    borderColor: '#FDA4AF',
    backgroundColor: '#FFFFFF',
  },
  selectedRadio: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
    borderWidth: 2,
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  thumbWrapper: {
    width: 52,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFF0F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '90%',
    height: '90%',
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  defaultText: {
    color: colors.text,
    fontWeight: '700',
  },
  selectedText: {
    color: '#831843',
    fontWeight: '800',
  },
});

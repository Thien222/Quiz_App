import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, gradients, shadows } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'purple' | 'pearl' | 'gold';
export type ButtonSize = 'lg' | 'md' | 'sm';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  showChevron?: boolean;
}

export function GradientCTAButton({
  label,
  onPress,
  disabled = false,
  style,
  labelStyle,
  variant = 'primary',
  size = 'lg',
  icon,
  rightIcon,
  showChevron = false,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.96, { damping: 14, stiffness: 280 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 14, stiffness: 280 });
  };

  const gradientColors = (() => {
    switch (variant) {
      case 'purple':
        return gradients.purpleBtn;
      case 'pearl':
        return gradients.pearlBtn;
      case 'gold':
        return gradients.goldBtn;
      case 'primary':
      default:
        return gradients.primaryBtn;
    }
  })();

  const isPearl = variant === 'pearl';
  const shadowPreset = (() => {
    if (disabled) return styles.disabledShadow;
    if (variant === 'purple') return shadows.buttonGlowPurple;
    if (variant === 'primary') return shadows.buttonGlow;
    return shadows.soft;
  })();

  const sizeStyle = (() => {
    switch (size) {
      case 'sm':
        return styles.sizeSm;
      case 'md':
        return styles.sizeMd;
      case 'lg':
      default:
        return styles.sizeLg;
    }
  })();

  const fontStyle = (() => {
    switch (size) {
      case 'sm':
        return styles.fontSm;
      case 'md':
        return styles.fontMd;
      case 'lg':
      default:
        return styles.fontLg;
    }
  })();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, shadowPreset, animatedStyle, style, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, sizeStyle, isPearl && styles.pearlBorder]}
      >
        {/* Specular highlight border for glossy candy/gel effect */}
        <View style={styles.topGloss} />

        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
          <Text
            style={[
              styles.label,
              fontStyle,
              isPearl ? styles.pearlLabel : styles.lightLabel,
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {rightIcon ? (
            <View style={styles.rightIconWrap}>{rightIcon}</View>
          ) : showChevron ? (
            <Text style={[styles.chevron, isPearl ? styles.pearlChevron : styles.lightChevron]}>
              ›
            </Text>
          ) : null}
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
  },
  gradient: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    overflow: 'hidden',
  },
  pearlBorder: {
    borderColor: '#FCE7F3',
    borderWidth: 1.5,
  },
  topGloss: {
    position: 'absolute',
    top: 1,
    left: 20,
    right: 20,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: 999,
  },
  sizeLg: {
    minHeight: 62,
    paddingHorizontal: 28,
  },
  sizeMd: {
    minHeight: 52,
    paddingHorizontal: 22,
  },
  sizeSm: {
    minHeight: 42,
    paddingHorizontal: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  fontLg: {
    fontSize: 18,
  },
  fontMd: {
    fontSize: 16,
  },
  fontSm: {
    fontSize: 14,
  },
  lightLabel: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pearlLabel: {
    color: colors.primaryDark,
  },
  chevron: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: -1,
  },
  lightChevron: {
    color: '#FFFFFF',
  },
  pearlChevron: {
    color: colors.primaryDark,
  },
  disabled: {
    opacity: 0.55,
  },
  disabledShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

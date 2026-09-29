import type { ReactNode } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, radius, shadows, spacing } from '@/constants/theme';
import { uiAssets } from '@/constants/assets';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface BaseButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  showChevron?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

function useButtonSpring() {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 14, stiffness: 280 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 14, stiffness: 280 });
  };

  return { animatedStyle, handlePressIn, handlePressOut };
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  icon,
  rightIcon,
  showChevron = false,
  style,
  labelStyle,
  size = 'lg',
}: BaseButtonProps) {
  const { animatedStyle, handlePressIn, handlePressOut } = useButtonSpring();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.baseWrap, animatedStyle, disabled && styles.disabledWrap, style]}
    >
      <LinearGradient
        colors={disabled ? ['#E2E8F0', '#CBD5E1'] : gradients.primaryBtn}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradientButton,
          size === 'sm' && styles.sizeSm,
          size === 'md' && styles.sizeMd,
          size === 'lg' && styles.sizeLg,
          !disabled && shadows.buttonGlow,
        ]}
      >
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconGap}>{icon}</View> : null}
          <Text
            style={[
              styles.primaryText,
              size === 'sm' && styles.textSm,
              size === 'md' && styles.textMd,
              size === 'lg' && styles.textLg,
              disabled && styles.disabledText,
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {rightIcon ? <View style={styles.rightIconGap}>{rightIcon}</View> : null}
          {showChevron && !rightIcon ? (
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" style={styles.chevron} />
          ) : null}
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  disabled = false,
  icon,
  rightIcon,
  showChevron = false,
  style,
  labelStyle,
  size = 'md',
}: BaseButtonProps) {
  const { animatedStyle, handlePressIn, handlePressOut } = useButtonSpring();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.baseWrap,
        styles.secondaryBtn,
        size === 'sm' && styles.sizeSm,
        size === 'md' && styles.sizeMd,
        size === 'lg' && styles.sizeLg,
        animatedStyle,
        disabled && styles.disabledWrap,
        style,
      ]}
    >
      <View style={styles.contentRow}>
        {icon ? <View style={styles.iconGap}>{icon}</View> : null}
        <Text
          style={[
            styles.secondaryText,
            size === 'sm' && styles.textSm,
            size === 'md' && styles.textMd,
            size === 'lg' && styles.textLg,
            labelStyle,
          ]}
        >
          {label}
        </Text>
        {rightIcon ? <View style={styles.rightIconGap}>{rightIcon}</View> : null}
        {showChevron && !rightIcon ? (
          <Ionicons name="chevron-forward" size={16} color={colors.purple} style={styles.chevron} />
        ) : null}
      </View>
    </AnimatedPressable>
  );
}

export function OutlineButton({
  label,
  onPress,
  disabled = false,
  icon,
  rightIcon,
  showChevron = false,
  style,
  labelStyle,
  size = 'md',
}: BaseButtonProps) {
  const { animatedStyle, handlePressIn, handlePressOut } = useButtonSpring();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.baseWrap,
        styles.outlineBtn,
        size === 'sm' && styles.sizeSm,
        size === 'md' && styles.sizeMd,
        size === 'lg' && styles.sizeLg,
        animatedStyle,
        disabled && styles.disabledWrap,
        style,
      ]}
    >
      <View style={styles.contentRow}>
        {icon ? <View style={styles.iconGap}>{icon}</View> : null}
        <Text
          style={[
            styles.outlineText,
            size === 'sm' && styles.textSm,
            size === 'md' && styles.textMd,
            size === 'lg' && styles.textLg,
            labelStyle,
          ]}
        >
          {label}
        </Text>
        {rightIcon ? <View style={styles.rightIconGap}>{rightIcon}</View> : null}
        {showChevron && !rightIcon ? (
          <Ionicons name="chevron-forward" size={16} color={colors.primaryDark} style={styles.chevron} />
        ) : null}
      </View>
    </AnimatedPressable>
  );
}

export function PremiumButton({
  label = 'Mở khóa toàn bộ kết quả',
  onPress,
  disabled = false,
  showChevron = true,
  style,
}: {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  showChevron?: boolean;
  style?: ViewStyle;
}) {
  const { animatedStyle, handlePressIn, handlePressOut } = useButtonSpring();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.baseWrap, animatedStyle, style]}
    >
      <LinearGradient
        colors={gradients.premiumCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientButton, styles.sizeLg, shadows.buttonGlowPurple]}
      >
        <View style={styles.contentRow}>
          <Image source={uiAssets.illustrations.crown} style={styles.crownIcon} />
          <Text style={[styles.primaryText, styles.textLg]}>{label}</Text>
          {showChevron ? (
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" style={styles.chevron} />
          ) : null}
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

export function TextButton({
  label,
  onPress,
  style,
  labelStyle,
}: {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.textBtn, pressed && styles.pressed, style]}
    >
      <Text style={[styles.textBtnLabel, labelStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseWrap: {
    borderRadius: radius.pill,
  },
  gradientButton: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeSm: {
    height: 38,
    paddingHorizontal: spacing.md,
  },
  sizeMd: {
    height: 46,
    paddingHorizontal: spacing.lg,
  },
  sizeLg: {
    height: 52,
    paddingHorizontal: spacing.xl,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  secondaryText: {
    color: colors.purple,
    fontWeight: '700',
  },
  outlineBtn: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.soft,
  },
  outlineText: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  textSm: {
    fontSize: 13,
  },
  textMd: {
    fontSize: 15,
  },
  textLg: {
    fontSize: 16,
  },
  iconGap: {
    marginRight: spacing.xs,
  },
  rightIconGap: {
    marginLeft: spacing.xs,
  },
  chevron: {
    marginLeft: spacing.xs,
  },
  crownIcon: {
    width: 22,
    height: 22,
    marginRight: spacing.xs,
  },
  textBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  textBtnLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  disabledWrap: {
    opacity: 0.55,
  },
  disabledText: {
    color: '#94A3B8',
  },
  pressed: {
    opacity: 0.75,
  },
});

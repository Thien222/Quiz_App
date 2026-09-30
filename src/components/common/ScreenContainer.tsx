import { useEffect, useRef, type PropsWithChildren, type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { useResponsiveLayout } from '@/utils/responsive';

export interface ScreenContainerProps extends PropsWithChildren {
  /**
   * If true (default), wraps content in a ScrollView.
   * If false, renders a static flex: 1 View.
   */
  scrollable?: boolean;
  /**
   * Outer container style (applied to SafeAreaView)
   */
  style?: ViewStyle;
  /**
   * Inner content container style
   */
  contentContainerStyle?: ViewStyle;
  /**
   * Safe area edges to observe. Default is ['top'].
   * For screens with footers outside tabs, you can pass ['top', 'bottom'].
   */
  edges?: Edge[];
  /**
   * Docked bottom footer (e.g. CTA buttons).
   * Renders within bottom safe area without relying on absolute positioning.
   */
  footer?: ReactNode;
  /**
   * Optional custom header element
   */
  header?: ReactNode;
  /**
   * Background color override
   */
  backgroundColor?: string;
  /**
   * Maximum width of content for tablet/large screens.
   * Defaults to layout maxContentWidth (580px).
   */
  maxWidth?: number;
  /**
   * Whether to apply responsive horizontal padding automatically.
   * Defaults to true.
   */
  withHorizontalPadding?: boolean;
  scrollResetKey?: string | number;
}

export function ScreenContainer({
  children,
  scrollable = true,
  style,
  contentContainerStyle,
  edges = ['top'],
  footer,
  header,
  backgroundColor = colors.background,
  maxWidth,
  withHorizontalPadding = true,
  scrollResetKey,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const { horizontalPadding, maxContentWidth } = useResponsiveLayout();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [scrollResetKey]);

  const effectivePadding = withHorizontalPadding ? horizontalPadding : 0;
  // The shared width is the usable content width, excluding the screen gutters.
  const effectiveMaxWidth = (maxWidth ?? maxContentWidth) + effectivePadding * 2;

  const contentMaxWidthStyle: ViewStyle = effectiveMaxWidth
    ? {
        maxWidth: effectiveMaxWidth,
        width: '100%',
        alignSelf: 'center',
      }
    : {
        width: '100%',
      };

  return (
    <SafeAreaView edges={edges} style={[styles.screen, { backgroundColor }, style]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        {header ? (
          <View style={[styles.headerWrap, contentMaxWidthStyle, { paddingHorizontal: effectivePadding }]}>
            {header}
          </View>
        ) : null}

        {scrollable ? (
          <ScrollView
            ref={scrollRef}
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              contentMaxWidthStyle,
              { paddingHorizontal: effectivePadding },
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.staticContent,
              contentMaxWidthStyle,
              { paddingHorizontal: effectivePadding },
              contentContainerStyle,
            ]}
          >
            {children}
          </View>
        )}

        {footer ? (
          <View
            style={[
              styles.footerWrap,
              contentMaxWidthStyle,
              {
                paddingHorizontal: effectivePadding,
                paddingBottom: Math.max(edges.includes('bottom') ? 0 : insets.bottom, spacing.xs),
                backgroundColor,
              },
            ]}
          >
            {footer}
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
    minHeight: 0,
  },
  scrollView: {
    flex: 1,
  },
  headerWrap: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxs,
  },
  scrollContent: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  staticContent: {
    flex: 1,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  footerWrap: {
    paddingTop: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});

import { useWindowDimensions } from 'react-native';

/**
 * Standard breakpoints according to requirement:
 * 320, 360, 375, 390, 412, 430, 768px
 */
export const BREAKPOINTS = {
  xs: 320,  // Small phones (iPhone SE 1st gen, small Androids)
  sm: 360,  // Standard compact Android
  md: 375,  // iPhone SE 2/3, iPhone 11 Pro, etc.
  base: 390,// iPhone 12/13/14/15
  lg: 412,  // Samsung Galaxy S series, Pixel
  xl: 430,  // iPhone Pro Max / Plus
  tablet: 768, // iPad Mini, standard tablet
} as const;

export const MAX_CONTENT_WIDTH = 580; // Prevents overstretched layout on tablets

export interface ResponsiveLayout {
  width: number;
  height: number;
  isSmallPhone: boolean;   // width < 360
  isCompactPhone: boolean; // width < 375
  isStandardPhone: boolean;// 375 <= width < 430
  isLargePhone: boolean;   // 430 <= width < 768
  isTablet: boolean;       // width >= 768
  horizontalPadding: number;
  contentWidth: number;
  maxContentWidth: number;
  /**
   * Calculates the exact pixel width for grid items to prevent 
   * fractional pixel wrapping or clipping bugs.
   */
  getGridItemWidth: (columns: number, gap: number, customAvailableWidth?: number) => number;
  /**
   * Calculates carousel item width derived from viewport width.
   * E.g. visibleCount = 2.2 will cleanly show 2 full items and a 20% peek of the 3rd.
   */
  getCarouselItemWidth: (visibleCount: number, gap: number, customAvailableWidth?: number) => number;
}

export function calculateGridItemWidth(
  availableWidth: number,
  columns: number,
  gap: number
): number {
  if (columns <= 1) return availableWidth;
  const totalGaps = (columns - 1) * gap;
  return Math.floor((availableWidth - totalGaps) / columns);
}

export function calculateCarouselItemWidth(
  availableWidth: number,
  visibleCount: number,
  gap: number
): number {
  if (visibleCount <= 1) return availableWidth;
  const totalGaps = (Math.ceil(visibleCount) - 1) * gap;
  return Math.floor((availableWidth - totalGaps) / visibleCount);
}

export function getResponsiveHorizontalPadding(width: number): number {
  if (width < BREAKPOINTS.sm) {
    return 12; // 320px screens: compact padding saves 8px horizontal space
  }
  if (width >= BREAKPOINTS.tablet) {
    return 24; // Tablets: more generous breathing room
  }
  return 16; // Standard mobile (360 - 430px)
}

/**
 * Primary responsive hook to be used across all screens and components.
 */
export function useResponsiveLayout(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();

  const isSmallPhone = width < BREAKPOINTS.sm;
  const isCompactPhone = width < BREAKPOINTS.md;
  const isStandardPhone = width >= BREAKPOINTS.md && width < BREAKPOINTS.xl;
  const isLargePhone = width >= BREAKPOINTS.xl && width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet;

  const horizontalPadding = getResponsiveHorizontalPadding(width);
  const rawAvailable = width - horizontalPadding * 2;
  const contentWidth = Math.min(rawAvailable, MAX_CONTENT_WIDTH);

  return {
    width,
    height,
    isSmallPhone,
    isCompactPhone,
    isStandardPhone,
    isLargePhone,
    isTablet,
    horizontalPadding,
    contentWidth,
    maxContentWidth: MAX_CONTENT_WIDTH,
    getGridItemWidth: (columns: number, gap: number, customAvailableWidth?: number) =>
      calculateGridItemWidth(customAvailableWidth ?? contentWidth, columns, gap),
    getCarouselItemWidth: (visibleCount: number, gap: number, customAvailableWidth?: number) =>
      calculateCarouselItemWidth(customAvailableWidth ?? contentWidth, visibleCount, gap),
  };
}

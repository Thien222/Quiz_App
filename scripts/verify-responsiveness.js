/**
 * Verification script to audit all primary screens and layout utilities
 * across the required breakpoints: 320, 360, 375, 390, 412, 430, and 768px widths.
 */

const fs = require('fs');
const path = require('path');

const BREAKPOINTS = {
  xs: 320,
  sm: 360,
  md: 375,
  base: 390,
  lg: 412,
  xl: 430,
  tablet: 768,
};

const MAX_CONTENT_WIDTH = 580;

function calculateGridItemWidth(availableWidth, columns, gap) {
  if (columns <= 1) return availableWidth;
  const totalGaps = (columns - 1) * gap;
  return Math.floor((availableWidth - totalGaps) / columns);
}

function calculateCarouselItemWidth(availableWidth, visibleCount, gap) {
  if (visibleCount <= 1) return availableWidth;
  const totalGaps = (Math.ceil(visibleCount) - 1) * gap;
  return Math.floor((availableWidth - totalGaps) / visibleCount);
}

function getResponsiveHorizontalPadding(width) {
  if (width < BREAKPOINTS.sm) {
    return 12;
  }
  if (width >= BREAKPOINTS.tablet) {
    return 24;
  }
  return 16;
}

const REQUIRED_WIDTHS = [320, 360, 375, 390, 412, 430, 768];

console.log('====================================================');
console.log('📐 RESPONSIVE LAYOUT AUDIT & BREAKPOINT VERIFICATION');
console.log('====================================================\n');

let failedTests = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failedTests++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Breakpoint verification for layout utilities
console.log('--- 1. Testing Grid & Carousel Calculations across 7 Breakpoints ---');

REQUIRED_WIDTHS.forEach((width) => {
  const padding = getResponsiveHorizontalPadding(width);
  const rawAvailable = width - padding * 2;
  const contentWidth = Math.min(rawAvailable, MAX_CONTENT_WIDTH);

  console.log(`\nTesting Width: ${width}px | Padding: ${padding}px | ContentWidth: ${contentWidth}px`);

  // Test 2-column grid
  const gap2Col = width < 360 ? 8 : 12;
  const cardWidth2Col = calculateGridItemWidth(contentWidth, 2, gap2Col);
  const total2ColWidth = cardWidth2Col * 2 + gap2Col;

  assert(
    total2ColWidth <= contentWidth,
    `2-column grid at ${width}px: Total width (${total2ColWidth}px) <= contentWidth (${contentWidth}px) [No Overflow]`
  );
  assert(
    contentWidth - total2ColWidth <= 2,
    `2-column grid at ${width}px: Remainder (${contentWidth - total2ColWidth}px) is minimal (no premature wrap)`
  );

  // Test 3-column grid on tablet
  if (width >= BREAKPOINTS.tablet) {
    const cardWidth3Col = calculateGridItemWidth(contentWidth, 3, 12);
    const total3ColWidth = cardWidth3Col * 3 + 24;
    assert(
      total3ColWidth <= contentWidth,
      `Tablet 3-col grid at ${width}px: Total width (${total3ColWidth}px) <= contentWidth (${contentWidth}px)`
    );
  }

  // Test Carousel Width
  const visibleCards = width >= 768 ? 3.8 : width < 360 ? 2.15 : 2.25;
  const carouselGap = 10;
  const insightWidth = calculateCarouselItemWidth(contentWidth, visibleCards, carouselGap);

  assert(
    insightWidth > 0 && insightWidth < contentWidth,
    `Carousel item width at ${width}px: Derived card width (${insightWidth}px) is within available content`
  );

  // Test Tablet Max Content Width Constraint
  if (width >= BREAKPOINTS.tablet) {
    assert(
      contentWidth <= MAX_CONTENT_WIDTH,
      `Tablet at ${width}px: ContentWidth (${contentWidth}px) is constrained to MAX_CONTENT_WIDTH (${MAX_CONTENT_WIDTH}px)`
    );
  }
});

// 2. Codebase static audit for banned patterns
console.log('\n--- 2. Static Codebase Audit for Hardcoded Dimensions & Viewport Traps ---');

const PRIMARY_SCREEN_FILES = [
  'app/(auth)/welcome.tsx',
  'app/(tabs)/index.tsx',
  'app/(tabs)/discover.tsx',
  'app/(tabs)/history.tsx',
  'app/(tabs)/profile.tsx',
  'app/quiz/[id].tsx',
  'app/quiz/play.tsx',
  'app/quiz/analyzing.tsx',
  'app/quiz/result/[sessionId].tsx',
  'app/premium.tsx',
  'app/daily.tsx',
  'app/future-partner.tsx',
  'app/notifications.tsx',
];

const ROOT_DIR = path.resolve(__dirname, '..');

PRIMARY_SCREEN_FILES.forEach((relPath) => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    assert(false, `Screen file not found: ${relPath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');

  // Check 1: No fixed percentage width hack like 48.2% or 48.5%
  const hasPercentageColHack = /width:\s*['"]48\.[0-9]%['"]/.test(content);
  assert(
    !hasPercentageColHack,
    `${relPath}: No hardcoded fragile column percentage hacks (e.g. 48.2% or 48.5%)`
  );

  // Check 2: No position: 'absolute' for footer CTA
  const hasAbsoluteFooter = /footerCTA:\s*\{[^}]*position:\s*['"]absolute['"]/s.test(content);
  assert(
    !hasAbsoluteFooter,
    `${relPath}: No position: 'absolute' used for footer CTA layout`
  );

  // Check 3: Uses ScreenContainer or SafeAreaView
  const usesScreenContainer = content.includes('ScreenContainer');
  const usesSafeAreaView = content.includes('SafeAreaView');
  assert(
    usesScreenContainer || usesSafeAreaView,
    `${relPath}: Uses ScreenContainer or SafeAreaView for safe boundary enforcement`
  );
});

console.log('\n====================================================');
if (failedTests === 0) {
  console.log('🎉 ALL RESPONSIVENESS AUDITS & BREAKPOINT TESTS PASSED!');
} else {
  console.error(`⚠️ ${failedTests} TEST(S) FAILED!`);
  process.exit(1);
}
console.log('====================================================\n');

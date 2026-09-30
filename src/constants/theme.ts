export const colors = {
  background: '#FFF7F9',
  surface: '#FFFFFF',
  primary: '#F472B6',
  primaryDark: '#DB2777',
  accentPink: '#EC4899',
  lavender: '#A78BFA',
  purple: '#8B5CF6',
  peach: '#FDBA74',
  text: '#3B1C54',
  textSecondary: '#7E638D',
  textMuted: '#806F8B',
  border: '#FCE7F3',
  lavenderBorder: '#F3E8FF',
  gold: '#F59E0B',
  success: '#10B981',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radius = {
  sm: 14,
  md: 16,
  card: 22,
  hero: 28,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900' as const,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800' as const,
    color: colors.text,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as const,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
    color: colors.textMuted,
  },
  badge: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800' as const,
    letterSpacing: 0.6,
  },
} as const;

export const gradients = {
  primaryBtn: ['#FF5E9B', '#F1267E', '#D61366'] as const,
  purpleBtn: ['#A855F7', '#7C3AED'] as const,
  pearlBtn: ['#FFFFFF', '#FFF0F6'] as const,
  goldBtn: ['#FDE68A', '#F59E0B'] as const,
  peachBtn: ['#FDBA74', '#FB923C'] as const,
  heroCard: ['#FFE2F0', '#E7E3FF'] as const,
  premiumCard: ['#4B1767', '#8E3BA6', '#EC4899'] as const,
} as const;

export const shadows = {
  soft: {
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  card: {
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  hero: {
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  buttonGlow: {
    shadowColor: '#EC4899',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonGlowPurple: {
    shadowColor: '#7C3AED',
    shadowOpacity: 0.26,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  optionGlow: {
    shadowColor: colors.primary,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;

const FONT_SIZE_BASE = 16

export const fontSizeTokens = {
  xs: 12,
  sm: 14,
  base: FONT_SIZE_BASE,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128
} as const

export const lineHeightTokens = {
  none: 16,
  tight: 20,
  snug: 22,
  normal: 24,
  relaxed: 26,
  loose: 32,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40
} as const

export const fontWeightTokens = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
} as const

export const letterSpacingTokens = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6
} as const

export type FontSizeAlias = keyof typeof fontSizeTokens
export type LineHeightAlias = keyof typeof lineHeightTokens
export type FontWeightAlias = keyof typeof fontWeightTokens
export type LetterSpacingAlias = keyof typeof letterSpacingTokens

export { FONT_SIZE_BASE }

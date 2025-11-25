const SPACING_BASE_UNIT = 4

export const spacingAliases = {
  xs: SPACING_BASE_UNIT * 1,
  sm: SPACING_BASE_UNIT * 2,
  md: SPACING_BASE_UNIT * 4,
  lg: SPACING_BASE_UNIT * 6,
  xl: SPACING_BASE_UNIT * 8,
  "2xl": SPACING_BASE_UNIT * 12,
  "3xl": SPACING_BASE_UNIT * 16,
  "4xl": SPACING_BASE_UNIT * 24
} as const

export const sizeTokens = {
  xs: 80,
  sm: 160,
  md: 240,
  lg: 320,
  xl: 400,
  "2xl": 480,
  "3xl": 640,
  full: "100%",
  screen: "100%",
  auto: "auto"
} as const

export type SpacingAlias = keyof typeof spacingAliases
export type SizeAlias = keyof typeof sizeTokens

export { SPACING_BASE_UNIT }

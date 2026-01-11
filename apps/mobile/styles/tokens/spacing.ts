/**
 * Base unit for spacing calculations.
 */
const SPACING_BASE_UNIT = 4
/**
 * Base unit for size calculations.
 */
const SIZE_BASE_UNIT = 4

/**
 * Defines standard spacing values.
 */
export const spacingTokens = {
  xs: SPACING_BASE_UNIT * 1,
  sm: SPACING_BASE_UNIT * 2,
  md: SPACING_BASE_UNIT * 4,
  lg: SPACING_BASE_UNIT * 6,
  xl: SPACING_BASE_UNIT * 8,
  "2xl": SPACING_BASE_UNIT * 12,
  "3xl": SPACING_BASE_UNIT * 16,
  "4xl": SPACING_BASE_UNIT * 24
} as const

/**
 * Defines standard size values.
 */
export const sizeTokens = {
  xs: SIZE_BASE_UNIT * 1,
  sm: SIZE_BASE_UNIT * 2,
  md: SIZE_BASE_UNIT * 4,
  lg: SIZE_BASE_UNIT * 6,
  xl: SIZE_BASE_UNIT * 8,
  "2xl": SIZE_BASE_UNIT * 12,
  "3xl": SIZE_BASE_UNIT * 16,
  "4xl": SIZE_BASE_UNIT * 24,
  full: "100%",
  screen: "100%",
  auto: "auto"
} as const

/**
 * Type alias for spacing tokens.
 */
export type SpacingAlias = keyof typeof spacingTokens
/**
 * Type alias for size tokens.
 */
export type SizeAlias = keyof typeof sizeTokens

export { SPACING_BASE_UNIT, SIZE_BASE_UNIT }

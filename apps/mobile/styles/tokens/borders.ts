/**
 * Base unit for border-radius calculations.
 */
const RADIUS_BASE = 8

/**
 * Defines standard border-radius values.
 */
export const borderRadiusTokens = {
  none: 0,
  sm: Math.round(RADIUS_BASE * 0.5),
  md: Math.round(RADIUS_BASE * 0.75),
  lg: RADIUS_BASE,
  xl: Math.round(RADIUS_BASE * 1.5),
  "2xl": RADIUS_BASE * 2,
  "3xl": RADIUS_BASE * 3,
  full: 9999
} as const

/**
 * Defines standard border-width values.
 */
export const borderWidthTokens = {
  none: 0,
  hairline: 0.5,
  default: 1,
  2: 2,
  4: 4,
  8: 8
} as const

/**
 * Type alias for border-radius tokens.
 */
export type BorderRadiusAlias = keyof typeof borderRadiusTokens
/**
 * Type alias for border-width tokens.
 */
export type BorderWidthAlias = keyof typeof borderWidthTokens

export { RADIUS_BASE }

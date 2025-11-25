const RADIUS_BASE = 8

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

export const borderWidthTokens = {
  none: 0,
  hairline: 0.5,
  default: 1,
  2: 2,
  4: 4,
  8: 8
} as const

export type BorderRadiusAlias = keyof typeof borderRadiusTokens
export type BorderWidthAlias = keyof typeof borderWidthTokens

export { RADIUS_BASE }

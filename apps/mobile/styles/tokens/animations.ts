/**
 * Defines standard animation duration values.
 */
export const durationTokens = {
  0: 0,
  75: 75,
  100: 100,
  150: 150,
  200: 200,
  300: 300,
  500: 500,
  700: 700,
  1000: 1000
} as const

/**
 * Defines standard animation easing functions.
 */
export const easingTokens = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out"
} as const

/**
 * Type alias for animation duration tokens.
 */
export type DurationAlias = keyof typeof durationTokens
/**
 * Type alias for animation easing tokens.
 */
export type EasingAlias = keyof typeof easingTokens

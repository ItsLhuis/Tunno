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

export const easingTokens = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out"
} as const

export type DurationAlias = keyof typeof durationTokens
export type EasingAlias = keyof typeof easingTokens

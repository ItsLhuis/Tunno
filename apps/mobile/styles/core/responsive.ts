import { type Breakpoint } from "../tokens/breakpoints"

/**
 * Selects a value based on the current breakpoint
 *
 * Returns the value for the largest breakpoint that is smaller than or equal
 * to the current breakpoint. Falls back to undefined if no matching breakpoint.
 *
 * @param values - Partial record of breakpoint values
 * @param currentBreakpoint - Current active breakpoint
 * @returns Selected value or undefined
 *
 * @example
 * ```ts
 * const fontSize = responsive(
 *   { xs: 12, md: 16, lg: 20 },
 *   runtime.breakpoint
 * )
 * // On md screen: returns 16
 * // On xl screen: returns 20 (falls back to lg)
 * ```
 */
export function responsive<T>(
  values: Partial<Record<Breakpoint, T>>,
  currentBreakpoint: Breakpoint
): T | undefined {
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint)

  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i]

    if (bp in values && values[bp] !== undefined) {
      return values[bp]
    }
  }

  return undefined
}

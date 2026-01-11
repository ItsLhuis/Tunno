import { useEffect, useState } from "react"

/**
 * Defines the possible responsive breakpoints for the application.
 */
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

/**
 * Defines the pixel widths for various responsive breakpoints.
 */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
} as const

/**
 * Determines the current responsive breakpoint based on the given window width.
 *
 * @param width - The current window width in pixels.
 * @returns The corresponding `Breakpoint` string.
 */
const getBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS["2xl"]) return "2xl"
  if (width >= BREAKPOINTS.xl) return "xl"
  if (width >= BREAKPOINTS.lg) return "lg"
  if (width >= BREAKPOINTS.md) return "md"
  if (width >= BREAKPOINTS.sm) return "sm"
  return "xs"
}

/**
 * Custom hook to determine and track the current responsive breakpoint of the window.
 *
 * This hook listens to window resize events and returns an object containing the
 * current breakpoint as a string, along with boolean flags and helper functions
 * to easily check if the current breakpoint is at, below, or above a specific size.
 *
 * @returns An object with the current `breakpoint` string, boolean flags (`isXs`, `isSm`, etc.),
 *          and utility functions (`isBelow`, `isAbove`).
 *
 * @example
 * ```tsx
 * function MyResponsiveComponent() {
 *   const { breakpoint, isMd, isAbove } = useBreakpoint();
 *
 *   if (isMd) {
 *     return <p>Currently on a medium screen or larger.</p>;
 *   }
 *
 *   if (isAbove("lg")) {
 *     return <p>Currently on a large screen or larger.</p>;
 *   }
 *
 *   return <p>Current breakpoint: {breakpoint}</p>;
 * }
 * ```
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint(window.innerWidth))

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    breakpoint,
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2xl: breakpoint === "2xl",
    isBelow: (bp: Breakpoint) => {
      const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]
      return order.indexOf(breakpoint) < order.indexOf(bp)
    },
    isAbove: (bp: Breakpoint) => {
      const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]
      return order.indexOf(breakpoint) > order.indexOf(bp)
    }
  }
}

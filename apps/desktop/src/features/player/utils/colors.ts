import { clampChroma, converter, formatCss } from "culori"

const toOklch = converter("oklch")

/**
 * Creates a CSS linear gradient string based on a single input color,
 * applying subtle variations in lightness, chroma, and hue to generate a rich,
 * perceptually smooth gradient. This function uses the Oklch color space for
 * more consistent color manipulation.
 *
 * The gradient is designed to provide depth and visual interest from a single base color.
 *
 * @param color - The base color string (e.g., "#RRGGBB", "rgb(R,G,B)", "hsl(H,S,L)").
 * @returns A CSS `linear-gradient` string, or the original color string if an error occurs
 *          during color conversion or processing.
 */
export function createGradient(color: string): string {
  try {
    const oklch = toOklch(color)
    if (!oklch || oklch.mode !== "oklch") {
      return color
    }

    const { l, c, h } = oklch
    const baseH = h ?? 0

    const adjustColor = (lightnessDelta: number, chromaDelta: number, hueDelta: number) => {
      const newL = Math.max(0, Math.min(1, (l ?? 0.5) + lightnessDelta))
      const newC = Math.max(0, Math.min(0.4, (c ?? 0) + chromaDelta))
      const newH = h !== undefined ? (baseH + hueDelta + 360) % 360 : undefined

      const adjusted = clampChroma({ mode: "oklch", l: newL, c: newC, h: newH }, "oklch")

      return formatCss(adjusted) ?? color
    }

    const bottom = adjustColor(0.12, 0.08, 8)
    const lowerMid = adjustColor(0.06, 0.05, 5)
    const midLower = adjustColor(-0.02, 0.02, 2)
    const center = adjustColor(-0.03, 0, 1)
    const midUpper = adjustColor(-0.08, -0.03, -3)
    const upperMid = adjustColor(-0.16, -0.06, -6)
    const top = adjustColor(-0.28, -0.09, -9)

    return `linear-gradient(to top,
      ${bottom} 0%,
      ${lowerMid} 16%,
      ${midLower} 30%,
      ${center} 46%,
      ${midUpper} 60%,
      ${upperMid} 76%,
      ${top} 100%)`
  } catch {
    return color
  }
}

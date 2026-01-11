import { useMemo } from "react"

import { paletteToCssVariables } from "../utils/colors"

import { type Palette } from "@repo/utils"

/**
 * Custom hook that converts a {@link Palette} object into a string of CSS variables.
 *
 * This hook is useful for applying dynamic styling to a component or subtree
 * based on a generated color palette, often extracted from an image. The returned
 * string can be applied directly to a `style` attribute.
 *
 * @param palette - The color `Palette` object to convert, or `null`.
 * @returns A string containing CSS variable declarations (e.g., "--bg-color: #RRGGBB;").
 *
 * @example
 * ```tsx
 * function DynamicThemedComponent({ imageSrc }) {
 *   const { palette } = useImagePalette({ imageSrc });
 *   const cssVariables = usePaletteCssVariables(palette);
 *
 *   return (
 *     <div style={{ ...cssVariables, backgroundColor: 'var(--bg-color)' }}>
 *       <p style={{ color: 'var(--fg-color)' }}>Dynamically themed content</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePaletteCssVariables(palette: Palette | null) {
  return useMemo(() => paletteToCssVariables(palette), [palette])
}

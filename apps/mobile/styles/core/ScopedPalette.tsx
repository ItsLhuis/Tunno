import { createContext, useContext, useMemo, type ReactNode } from "react"

import { ThemeContext, useTheme } from "./context"

import { type Theme, type ThemeColorKey } from "./types"

import { type Palette } from "@repo/utils"

type ScopedPaletteContextValue = {
  palette: Partial<Palette> | null
}

const ScopedPaletteContext = createContext<ScopedPaletteContextValue | null>(null)

type ScopedPaletteProps = {
  children: ReactNode
  palette: Partial<Palette> | null | undefined
}

/**
 * Provides a scoped color palette to a subtree of components
 *
 * All child components using useTheme() or useStyles() will receive
 * the overridden colors from the palette instead of the default theme colors.
 *
 * @param children - React children
 * @param palette - Palette object with color overrides (from generateColorPalette)
 *
 * @example
 * ```tsx
 * const { palette } = useImageColorAndPalette({ imageUri })
 *
 * <ScopedPalette palette={palette}>
 *   <Header>
 *     <Text>This uses dynamic colors from the image</Text>
 *   </Header>
 * </ScopedPalette>
 * ```
 */
export function ScopedPalette({ children, palette }: ScopedPaletteProps) {
  const { theme, runtime, themeMode, setThemeMode } = useTheme()

  const scopedTheme = useMemo<Theme>(() => {
    if (!palette) return theme

    const paletteColorOverrides: Partial<Record<ThemeColorKey, string>> = {}

    if (palette.background) paletteColorOverrides.background = palette.background
    if (palette.foreground) paletteColorOverrides.foreground = palette.foreground
    if (palette.muted) paletteColorOverrides.muted = palette.muted
    if (palette.mutedForeground) paletteColorOverrides.mutedForeground = palette.mutedForeground
    if (palette.primary) paletteColorOverrides.primary = palette.primary
    if (palette.primaryForeground)
      paletteColorOverrides.primaryForeground = palette.primaryForeground
    if (palette.accent) paletteColorOverrides.accent = palette.accent
    if (palette.accentForeground) paletteColorOverrides.accentForeground = palette.accentForeground

    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...paletteColorOverrides
      }
    }
  }, [theme, palette])

  const themeContextValue = useMemo(
    () => ({
      theme: scopedTheme,
      runtime,
      themeMode,
      setThemeMode
    }),
    [scopedTheme, runtime, themeMode, setThemeMode]
  )

  const scopedContextValue = useMemo<ScopedPaletteContextValue>(
    () => ({
      palette: palette ?? null
    }),
    [palette]
  )

  return (
    <ScopedPaletteContext.Provider value={scopedContextValue}>
      <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
    </ScopedPaletteContext.Provider>
  )
}

/**
 * Hook to check if currently inside a ScopedPalette
 *
 * @returns The scoped palette if inside a ScopedPalette, null otherwise
 *
 * @example
 * ```tsx
 * const palette = useScopedPalette()
 * if (palette) {
 *   // Inside a scoped palette context
 * }
 * ```
 */
export function useScopedPalette(): Partial<Palette> | null {
  const context = useContext(ScopedPaletteContext)

  return context?.palette ?? null
}

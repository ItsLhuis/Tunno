import { createContext, useContext, useMemo, type ReactNode } from "react"

import { ThemeContext, useTheme } from "./context"

import { darkTheme } from "../themes/dark"
import { lightTheme } from "../themes/light"

import { type Theme } from "./types"

type ScopedThemeMode = "light" | "dark"

type ScopedThemeContextValue = {
  scopedTheme: ScopedThemeMode
}

const ScopedThemeContext = createContext<ScopedThemeContextValue | null>(null)

type ScopedThemeProps = {
  children: ReactNode
  theme: ScopedThemeMode
}

/**
 * Provides a scoped theme context to a subtree of components
 *
 * All child components using useTheme() or useStyles() will receive
 * the scoped theme instead of the global theme.
 *
 * @param children - React children
 * @param theme - Theme mode to apply ("light" | "dark")
 * @param style - Optional styles for the container View
 *
 * @example
 * ```tsx
 * <ScopedTheme theme="dark">
 *   <Card>
 *     <Text>This uses dark theme colors</Text>
 *   </Card>
 * </ScopedTheme>
 * ```
 */
export function ScopedTheme({ children, theme: scopedMode }: ScopedThemeProps) {
  const { runtime, themeMode, setThemeMode } = useTheme()

  const scopedTheme = useMemo<Theme>(() => {
    return scopedMode === "dark" ? darkTheme : lightTheme
  }, [scopedMode])

  const themeContextValue = useMemo(
    () => ({
      theme: scopedTheme,
      runtime,
      themeMode,
      setThemeMode
    }),
    [scopedTheme, runtime, themeMode, setThemeMode]
  )

  const scopedContextValue = useMemo<ScopedThemeContextValue>(
    () => ({
      scopedTheme: scopedMode
    }),
    [scopedMode]
  )

  return (
    <ScopedThemeContext.Provider value={scopedContextValue}>
      <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
    </ScopedThemeContext.Provider>
  )
}

/**
 * Hook to check if currently inside a ScopedTheme
 *
 * @returns The scoped theme mode if inside a ScopedTheme, null otherwise
 *
 * @example
 * ```tsx
 * const scopedTheme = useScopedTheme()
 * if (scopedTheme === "dark") {
 *   // Inside a dark scoped theme
 * }
 * ```
 */
export function useScopedTheme(): ScopedThemeMode | null {
  const context = useContext(ScopedThemeContext)

  return context?.scopedTheme ?? null
}

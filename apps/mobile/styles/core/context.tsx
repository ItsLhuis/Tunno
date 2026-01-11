import { createContext, useContext, useMemo, type ReactNode } from "react"

import { useColorScheme } from "react-native"

import { useRuntime } from "./runtime"

import { darkTheme } from "../themes/dark"
import { lightTheme } from "../themes/light"

import { type RuntimeValues, type Theme, type ThemeMode } from "./types"

/**
 * Theme context value containing theme, runtime values, and mode controls
 */
type ThemeContextValue = {
  theme: Theme
  runtime: RuntimeValues
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}

/**
 * React Context for providing theme-related state across the component tree.
 * Use `useTheme` to access this context in components.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Base theme context that is never overridden by scoped palettes
 * Used to reset theme in components like BottomSheet
 */
export const BaseThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Props for ThemeProvider component
 */
type ThemeProviderProps = {
  children: ReactNode
  themeMode: ThemeMode
  onThemeModeChange: (mode: ThemeMode) => void
  lightTheme?: Theme
  darkTheme?: Theme
}

/**
 * Provides theme context to the component tree
 *
 * Manages theme mode (light/dark/system) and provides theme/runtime values
 * to child components via useTheme hook.
 *
 * @param children - React children
 * @param themeMode - Current theme mode (controlled)
 * @param onThemeModeChange - Callback when theme mode changes
 * @param lightTheme - Custom light theme (optional)
 * @param darkTheme - Custom dark theme (optional)
 *
 * @example
 * ```tsx
 * <ThemeProvider themeMode={themeMode} onThemeModeChange={setThemeMode}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  themeMode,
  onThemeModeChange,
  lightTheme: customLightTheme,
  darkTheme: customDarkTheme
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme()

  const runtime = useRuntime()

  const light = customLightTheme ?? lightTheme
  const dark = customDarkTheme ?? darkTheme

  const theme = useMemo(() => {
    if (themeMode === "system") {
      return systemColorScheme === "dark" ? dark : light
    }

    return themeMode === "dark" ? dark : light
  }, [themeMode, systemColorScheme, light, dark])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      runtime,
      themeMode,
      setThemeMode: onThemeModeChange
    }),
    [theme, runtime, themeMode, onThemeModeChange]
  )

  return (
    <BaseThemeContext.Provider value={value}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </BaseThemeContext.Provider>
  )
}

/**
 * Hook to access theme context
 *
 * Returns current theme, runtime values, theme mode, and setter function.
 * Must be used within a ThemeProvider.
 *
 * @returns Theme context value
 * @throws {Error} If used outside ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, setThemeMode } = useTheme()
 * const primaryColor = theme.colors.primary
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

/**
 * Hook to access the base theme context (unaffected by scoped palettes)
 *
 * Returns the original theme without any palette overrides.
 * Useful for components like BottomSheet that should use the base theme.
 *
 * @returns Base theme context value
 * @throws {Error} If used outside ThemeProvider
 */
export function useBaseTheme(): ThemeContextValue {
  const context = useContext(BaseThemeContext)

  if (!context) throw new Error("useBaseTheme must be used within a ThemeProvider")

  return context
}

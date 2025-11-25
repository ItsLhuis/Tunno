import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

import { useColorScheme } from "react-native"

import { useRuntimeValues } from "./runtime"

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

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Props for ThemeProvider component
 */
type ThemeProviderProps = {
  children: ReactNode
  initialThemeMode?: ThemeMode
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
 * @param initialThemeMode - Initial theme mode (defaults to "system")
 * @param lightTheme - Custom light theme (optional)
 * @param darkTheme - Custom dark theme (optional)
 *
 * @example
 * ```tsx
 * <ThemeProvider initialThemeMode="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  initialThemeMode = "system",
  lightTheme: customLightTheme,
  darkTheme: customDarkTheme
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode)

  const systemColorScheme = useColorScheme()

  const runtime = useRuntimeValues()

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
      setThemeMode
    }),
    [theme, runtime, themeMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
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

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

import { createContext, useContext, useEffect } from "react"

import { useSettingsStore } from "@stores/useSettingsStore"

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useSettingsStore()

  useEffect(() => {
    const root = window.document.documentElement
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")

    const applySystemTheme = () => {
      const systemTheme = matchMedia.matches ? "dark" : "light"
      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
    }

    if (theme === "system") {
      applySystemTheme()
      matchMedia.addEventListener("change", applySystemTheme)
      return () => {
        matchMedia.removeEventListener("change", applySystemTheme)
      }
    }

    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
